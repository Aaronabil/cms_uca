<?php

namespace App\Filament\Resources\StudyPrograms\Pages;

use App\Filament\Resources\StudyPrograms\StudyProgramResource;
use Filament\Resources\Pages\CreateRecord;

class CreateStudyProgram extends CreateRecord
{
    protected static string $resource = StudyProgramResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $slug = $data['slug'];

        if (isset($data['visi'])) {
            \App\Models\SiteSetting::updateOrCreate(
                ['setting_key' => "prodi_{$slug}_visi"],
                ['setting_value' => $data['visi']]
            );
            unset($data['visi']);
        }

        if (isset($data['misi'])) {
            \App\Models\SiteSetting::updateOrCreate(
                ['setting_key' => "prodi_{$slug}_misi"],
                ['setting_value' => json_encode(array_values($data['misi']))]
            );
            unset($data['misi']);
        }

        return $data;
    }
}
