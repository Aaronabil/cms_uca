<?php

namespace App\Filament\Resources\Artikels\Pages;

use App\Filament\Resources\Artikels\ArtikelResource;
use App\Models\ArtikelImage;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class EditArtikel extends EditRecord
{
    protected static string $resource = ArtikelResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }

    protected function getFormActions(): array
    {
        return [];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        if ($this->record->featuredImage) {
            $data['featured_image_upload'] = $this->record->featuredImage->image_url;
        } else {
            $data['featured_image_upload'] = null;
        }
        return $data;
    }

    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        $imagePath = null;
        if (isset($data['featured_image_upload'])) {
            $imagePath = is_array($data['featured_image_upload']) ? ($data['featured_image_upload'][0] ?? null) : $data['featured_image_upload'];
            unset($data['featured_image_upload']);
        }

        return DB::transaction(function () use ($record, $data, $imagePath) {
            $record->update($data);

            if ($imagePath) {
                if ($record->featuredImage) {
                    Storage::disk('public')->delete($record->featuredImage->image_url);
                    $record->featuredImage->delete();
                }

                $artikelImage = ArtikelImage::create([
                    'artikel_id' => $record->id,
                    'image_url' => $imagePath,
                ]);

                $record->featured_image_id = $artikelImage->id;
                $record->save();

            } elseif ($imagePath === null && $record->featuredImage) {
                Storage::disk('public')->delete($record->featuredImage->image_url);
                $record->featuredImage->delete();
                $record->featured_image_id = null;
                $record->save();
            }

            return $record;
        });
    }
}