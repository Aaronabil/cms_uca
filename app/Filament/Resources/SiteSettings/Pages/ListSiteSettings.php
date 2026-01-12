<?php

namespace App\Filament\Resources\SiteSettings\Pages;

use App\Filament\Resources\SiteSettings\Pages\ManageSiteSettings;
use App\Filament\Resources\SiteSettings\SiteSettingResource;
use App\Models\Faculty;
use App\Models\SiteSetting;
use App\Models\StudyProgram;
use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Tabs; // Changed from Forms\Components\Tabs
use Filament\Schemas\Components\Section; // Changed from Forms\Components\Section
use Filament\Schemas\Components\Tabs\Tab; // Use Schema Tab for everything
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListSiteSettings extends ListRecords
{
    protected static string $resource = SiteSettingResource::class;

    public function getTabs(): array
    {
        return [
            'all' => Tab::make('All'),
            'general' => Tab::make('General')
                ->modifyQueryUsing(fn (Builder $query) => $query->whereIn('setting_key', [
                    'site_name', 'site_description', 'logo_url'
                ])),
            'social' => Tab::make('Social Media')
                ->modifyQueryUsing(fn (Builder $query) => $query->whereIn('setting_key', [
                    'facebook_url', 'instagram_url', 'twitter_url', 'youtube_url'
                ])),
            'contact' => Tab::make('Contact')
                ->modifyQueryUsing(fn (Builder $query) => $query->whereIn('setting_key', [
                    'footer_settings'
                ])),
            'academic' => Tab::make('Academic')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('setting_key', 'like', 'academic_%')),
            'facts' => Tab::make('Facts')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('setting_key', 'like', 'facts_%')),
            'vision_mission' => Tab::make('Vision & Mission')
                ->modifyQueryUsing(fn (Builder $query) => $query->whereIn('setting_key', [
                    'vision', 'mission'
                ])),
            'faqs' => Tab::make('FAQs')
                ->modifyQueryUsing(fn (Builder $query) => $query->whereIn('setting_key', [
                    'faqs'
                ])),
            'faculties' => Tab::make('Faculties')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('setting_key', 'like', 'faculty_%')),
            'study_programs' => Tab::make('Study Programs')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('setting_key', 'like', 'prodi_%')),
        ];
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('view_form')
                ->label('View as Form')
                ->url(ManageSiteSettings::getUrl())
                ->outlined(),
        ];
    }


}
