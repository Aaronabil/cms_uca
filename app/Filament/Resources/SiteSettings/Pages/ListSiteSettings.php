<?php

namespace App\Filament\Resources\SiteSettings\Pages;

use App\Filament\Resources\SiteSettings\SiteSettingResource;
use Filament\Resources\Pages\ListRecords;
use Filament\Schemas\Components\Tabs\Tab;
use Illuminate\Database\Eloquent\Builder;

class ListSiteSettings extends ListRecords
{
    protected static string $resource = SiteSettingResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }

    public function getTabs(): array
    {
        return [
            'identitas' => Tab::make('Identitas / Beranda')
                ->icon('heroicon-m-home')
                ->query(fn (Builder $query) => $query->whereIn('setting_key', [
                    'site_name', 
                    'site_description', 
                    'logo_url', 
                    'vision', 
                    'mission',
                    'faqs'
                ])),

            'kontak' => Tab::make('Kontak & Footer')
                ->icon('heroicon-m-phone')
                ->query(fn (Builder $query) => $query->whereIn('setting_key', [
                    'email', 
                    'telephone', 
                    'address', 
                    'facebook_url', 
                    'instagram_url', 
                    'twitter_url', 
                    'youtube_url', 
                    'footer_settings'
                ])),

            'akademik' => Tab::make('Akademik (Fakultas/Prodi)')
                ->icon('heroicon-m-academic-cap')
                ->query(fn (Builder $query) => $query->where(function ($q) {
                    $q->where('setting_key', 'like', 'kaprodi_%')
                      ->orWhere('setting_key', 'like', 'dean_%');
                })),

            'others' => Tab::make('Lainnya')
                ->icon('heroicon-m-cog')
                ->query(fn (Builder $query) => $query->whereNotIn('setting_key', [
                    'site_name', 'site_description', 'logo_url', 'vision', 'mission', 'faqs',
                    'email', 'telephone', 'address', 'facebook_url', 'instagram_url', 'twitter_url', 'youtube_url', 'footer_settings'
                ])->where('setting_key', 'not like', 'kaprodi_%')
                  ->where('setting_key', 'not like', 'dean_%')),
        ];
    }

    public function getDefaultActiveTab(): string | int | null
    {
        return 'identitas';
    }
}
