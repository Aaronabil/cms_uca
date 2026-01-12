<?php

namespace App\Filament\Resources\StudyPrograms\Pages;

use App\Filament\Resources\StudyPrograms\StudyProgramResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Database\Eloquent\Model;

class EditStudyProgram extends EditRecord
{
    protected static string $resource = StudyProgramResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $slug = $data['slug'];

        $visi = \App\Models\SiteSetting::where('setting_key', "prodi_{$slug}_visi")->value('setting_value');
        $misiJson = \App\Models\SiteSetting::where('setting_key', "prodi_{$slug}_misi")->value('setting_value');
        
        $data['visi'] = $visi;
        $data['misi'] = $misiJson ? json_decode($misiJson, true) : [];
        return $data;
    }

    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        $slug = $data['slug'] ?? $record->slug;

        if (isset($data['visi'])) {
            \App\Models\SiteSetting::updateOrCreate(
                ['setting_key' => "prodi_{$slug}_visi"],
                ['setting_value' => $data['visi']]
            );
            unset($data['visi']);
        }
        
        if (isset($data['misi'])) {
             $misiValue = json_encode(array_values($data['misi']));
             \App\Models\SiteSetting::updateOrCreate(
                ['setting_key' => "prodi_{$slug}_misi"],
                ['setting_value' => $misiValue]
            );
            unset($data['misi']);
        }

        $record->update($data);
        return $record;
    }
}
