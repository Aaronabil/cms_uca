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
            $url = $this->record->featuredImage->image_url;

            if (str_starts_with($url, 'http')) {
                $data['image_source'] = 'url';
                $data['featured_image_url'] = $url;
                $data['featured_image_upload'] = null;
            } else {
                $data['image_source'] = 'upload';
                $data['featured_image_upload'] = $url;
                $data['featured_image_url'] = null;
            }
        } else {
            $data['image_source'] = 'upload';
            $data['featured_image_upload'] = null;
        }

        return $data;
    }

    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        $imagePath = null;
        $source = $data['image_source'] ?? 'upload';

        if ($source === 'upload') {
            if (isset($data['featured_image_upload'])) {
                $imagePath = is_array($data['featured_image_upload']) ? ($data['featured_image_upload'][0] ?? null) : $data['featured_image_upload'];
            }
        } else {
            $imagePath = $data['featured_image_url'] ?? null;
        }

        // Clean up temp fields
        unset($data['featured_image_upload']);
        unset($data['featured_image_url']);
        unset($data['image_source']);

        return DB::transaction(function () use ($record, $data, $imagePath) {
            $record->update($data);

            if ($imagePath) {
                // If there's an old image AND it was a local file (not URL), delete it
                if ($record->featuredImage && ! str_starts_with($record->featuredImage->image_url, 'http')) {
                    Storage::disk('public')->delete($record->featuredImage->image_url);
                }

                // Also delete the record itself if replacing
                if ($record->featuredImage) {
                    $record->featuredImage->delete();
                }

                $artikelImage = ArtikelImage::create([
                    'artikel_id' => $record->id,
                    'image_url' => $imagePath,
                ]);

                $record->featured_image_id = $artikelImage->id;
                $record->save();

            } elseif ($imagePath === null && $record->featuredImage) {
                // Deleting image explicitly (if UI supports clearing both inputs)
                if (! str_starts_with($record->featuredImage->image_url, 'http')) {
                    Storage::disk('public')->delete($record->featuredImage->image_url);
                }
                $record->featuredImage->delete();
                $record->featured_image_id = null;
                $record->save();
            }

            return $record;
        });
    }
}
