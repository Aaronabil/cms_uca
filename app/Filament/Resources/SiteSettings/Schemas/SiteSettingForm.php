<?php

namespace App\Filament\Resources\SiteSettings\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class SiteSettingForm
{
    const TEXT_KEYS = ['site_name', 'facebook_url', 'instagram_url', 'twitter_url', 'youtube_url'];
    const EDITOR_KEYS = ['vision', 'mission', 'site_description'];
    const FILE_KEYS = ['logo_url'];
    const CUSTOM_KEYS = ['faqs', 'footer_settings'];

    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('setting_key')
                    ->required()
                    ->live(onBlur: true)
                    ->hidden(fn ($record) => $record !== null),
                    
                FileUpload::make('setting_value')
                    ->label('Upload Logo')
                    ->image()
                    ->disk('public')
                    ->directory('settings')
                    ->visibility('public')
                    ->hidden(fn ($get) => !in_array($get('setting_key'), self::FILE_KEYS)),

                TextInput::make('text_value')
                    ->label('Value')
                    ->hidden(fn ($get) => !in_array($get('setting_key'), self::TEXT_KEYS))
                    ->afterStateHydrated(fn ($set, $get) => $set('text_value', $get('setting_value'))),

                Textarea::make('editor_value')
                    ->label('Content')
                    ->rows(5)
                    ->hidden(fn ($get) => !in_array($get('setting_key'), self::EDITOR_KEYS))
                    ->afterStateHydrated(fn ($set, $get) => $set('editor_value', $get('setting_value'))),

                Textarea::make('default_value')
                    ->columnSpanFull()
                    ->hidden(fn ($get) => in_array($get('setting_key'), [
                        ...self::TEXT_KEYS,
                        ...self::EDITOR_KEYS,
                        ...self::FILE_KEYS,
                        ...self::CUSTOM_KEYS,
                    ]))
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
