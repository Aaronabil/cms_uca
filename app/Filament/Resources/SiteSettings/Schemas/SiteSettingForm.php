<?php

namespace App\Filament\Resources\SiteSettings\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Placeholder;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\HtmlString;

class SiteSettingForm
{
    const TEXT_KEYS = ['site_name', 'facebook_url', 'instagram_url', 'twitter_url', 'youtube_url'];
    const EDITOR_KEYS = ['vision', 'mission', 'site_description'];
    const FILE_KEYS = ['logo_url'];
    const CUSTOM_KEYS = ['faqs', 'footer_settings'];

    protected static function isFileKey(?string $key): bool
    {
        if (!$key) return false;
        return in_array($key, self::FILE_KEYS) || str_ends_with($key, '_image') || str_ends_with($key, '_photo');
    }

    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('setting_key')
                    ->required()
                    ->live(onBlur: true)
                    ->hidden(fn ($record) => $record !== null),
                    
                Placeholder::make('current_image_preview')
                    ->label('Preview Gambar Saat Ini')
                    ->content(function ($record, $get) {
                        $key = $record?->setting_key ?? $get('setting_key');
                        if (!$record || !self::isFileKey($key) || !$record->setting_value) {
                            return new HtmlString('<div class="text-sm text-gray-500 italic">Belum ada gambar yang diunggah.</div>');
                        }
                        
                        $url = str_starts_with($record->setting_value, '/') 
                            ? $record->setting_value 
                            : Storage::url($record->setting_value);
                            
                        // Checkerboard pattern for transparency
                        $checkerboard = 'background-image: linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0px;';

                        return new HtmlString("
                            <div class='flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl dark:bg-gray-900 dark:border-gray-700 shadow-sm'>
                                <div class='relative overflow-hidden rounded-lg shadow-inner border border-gray-300 dark:border-gray-600' style='{$checkerboard}'>
                                    <img src='{$url}' alt='Preview' class='h-32 w-auto object-contain p-2' />
                                </div>
                                <div class='mt-2 text-xs text-gray-500 dark:text-gray-400'>
                                    Lokasi: " . e($record->setting_value) . "
                                </div>
                            </div>
                        ");
                    })
                    ->hidden(fn ($get) => !self::isFileKey($get('setting_key'))),

                FileUpload::make('setting_value')
                    ->label('Upload Gambar')
                    ->image()
                    ->disk('public')
                    ->directory('settings')
                    ->visibility('public')
                    ->hidden(fn ($get) => !self::isFileKey($get('setting_key'))),

                TextInput::make('text_value')
                    ->label('Value')
                    ->hidden(fn ($get) => !in_array($get('setting_key'), self::TEXT_KEYS) && !str_ends_with($get('setting_key') ?? '', '_name'))
                    ->afterStateHydrated(fn ($set, $get) => $set('text_value', $get('setting_value'))),

                Textarea::make('editor_value')
                    ->label('Content')
                    ->rows(5)
                    ->hidden(fn ($get) => !in_array($get('setting_key'), self::EDITOR_KEYS) && !str_ends_with($get('setting_key') ?? '', '_message'))
                    ->afterStateHydrated(fn ($set, $get) => $set('editor_value', $get('setting_value'))),

                Textarea::make('default_value')
                    ->columnSpanFull()
                    ->hidden(fn ($get) => 
                        self::isFileKey($get('setting_key')) ||
                        in_array($get('setting_key'), self::TEXT_KEYS) ||
                        str_ends_with($get('setting_key') ?? '', '_name') ||
                        in_array($get('setting_key'), self::EDITOR_KEYS) ||
                        str_ends_with($get('setting_key') ?? '', '_message') ||
                        in_array($get('setting_key'), self::CUSTOM_KEYS)
                    )
                    ->afterStateHydrated(fn ($set, $get) => $set('default_value', $get('setting_value'))),
                Section::make('Contact Information')
                    ->schema([
                        TextInput::make('telephone')
                            ->label('Telepon')
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($set, $get) => self::updateFooterSettings($set, $get)),
                        TextInput::make('email')
                            ->label('Email')
                            ->email()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($set, $get) => self::updateFooterSettings($set, $get)),
                        Textarea::make('address')
                            ->label('Alamat')
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($set, $get) => self::updateFooterSettings($set, $get)),
                    ])
                    ->hidden(fn ($get) => $get('setting_key') !== 'footer_settings')
                    ->afterStateHydrated(function ($component, $get, $set) {
                        if ($get('setting_key') === 'footer_settings') {
                            $data = json_decode($get('setting_value'), true) ?? [];
                            $set('telephone', $data['telephone'] ?? null);
                            $set('email', $data['email'] ?? null);
                            $set('address', $data['address'] ?? null);
                        }
                    }),
                Repeater::make('faqs_data')
                    ->label('FAQs')
                    ->schema([
                        TextInput::make('question')
                            ->required(),
                        Textarea::make('answer')
                            ->required(),
                    ])
                    ->itemLabel(fn (array $state): ?string => $state['question'] ?? null)
                    ->minItems(1)
                    ->columnSpanFull()
                    ->hidden(fn ($get) => $get('setting_key') !== 'faqs')
                    ->dehydrated(false)
                    ->live()
                    ->afterStateHydrated(function (Repeater $component, $get, $set, $state) {
                        if ($get('setting_key') === 'faqs' && !empty($get('setting_value'))) {
                            $set('faqs_data', json_decode($get('setting_value'), true));
                        }
                    })
                    ->saveRelationshipsUsing(function (Repeater $component, $get, $set, ?array $state) {
                        if ($get('setting_key') === 'faqs') {
                            $set('setting_value', json_encode($state));
                        }
                    }),
            ]);
    }

    protected static function updateFooterSettings($set, $get): void
    {
        $data = [
            'telephone' => $get('telephone'),
            'email' => $get('email'),
            'address' => $get('address'),
        ];
        $set('setting_value', json_encode($data));
    }
}
