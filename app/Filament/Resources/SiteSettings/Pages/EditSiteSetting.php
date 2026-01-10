<?php

namespace App\Filament\Resources\SiteSettings\Pages;

use App\Filament\Resources\SiteSettings\SiteSettingResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditSiteSetting extends EditRecord
{
    protected static string $resource = SiteSettingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        if (isset($data['file_upload'])) {
            $data['setting_value'] = $data['file_upload'];
            unset($data['file_upload']);
        }

        if (isset($data['faqs_data'])) {
            $data['setting_value'] = json_encode($data['faqs_data']);
            unset($data['faqs_data']);
        }

        if (isset($data['default_value'])) {
            $data['setting_value'] = $data['default_value'];
            unset($data['default_value']);
        }

        if (isset($data['text_value'])) {
            $data['setting_value'] = $data['text_value'];
            unset($data['text_value']);
        }
        
        if (isset($data['editor_value'])) {
            $data['setting_value'] = $data['editor_value'];
            unset($data['editor_value']);
        }

        return $data;
    }
}
