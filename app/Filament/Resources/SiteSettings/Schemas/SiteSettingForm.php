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
    const TEXT_KEYS = [
        'site_name', 'facebook_url', 'instagram_url', 'twitter_url', 'youtube_url',
        'academic_section_title', 
        'academic_card_1_title', 'academic_card_2_title', 'academic_card_3_title',
        'facts_title',
        'facts_count_mahasiswa', 'facts_label_mahasiswa',
        'facts_count_dosen', 'facts_label_dosen',
        'facts_count_prodi', 'facts_label_prodi',
        'facts_count_alumni', 'facts_label_alumni',
    ];
    const EDITOR_KEYS = [
        'vision', 'mission', 'site_description',
        'academic_section_description',
        'academic_card_1_content', 'academic_card_2_content', 'academic_card_3_content',
        'facts_description'
    ];
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
                            return null;
                        }
                        
                        $url = str_starts_with($record->setting_value, '/') 
                            ? $record->setting_value 
                            : Storage::url($record->setting_value);
                            
                        return new HtmlString("<img src=\"{$url}\" style=\"height: 80px; width: auto;\" class=\"rounded-lg border shadow-sm bg-gray-100 p-2\" />");
                    })
                    ->hidden(fn ($get, $record) => !self::isFileKey($get('setting_key')) || empty($record?->setting_value)),

                FileUpload::make('setting_value')
                    ->label('Upload Gambar')
                    ->image()
                    ->disk('public')
                    ->directory('settings')
                    ->visibility('public')
                    ->hidden(fn ($get) => !self::isFileKey($get('setting_key'))),

                Placeholder::make('text_preview')
                    ->label('Data Saat Ini')
                    ->content(fn ($record) => $record?->setting_value)
                    ->visible(fn ($get) => in_array($get('setting_key'), self::TEXT_KEYS) || str_ends_with($get('setting_key') ?? '', '_name'))
                    ->columnSpanFull(),

                TextInput::make('text_value')
                    ->label('Value')
                    ->hidden(fn ($get) => !in_array($get('setting_key'), self::TEXT_KEYS) && !str_ends_with($get('setting_key') ?? '', '_name'))
                    ->afterStateHydrated(fn ($set, $get) => $set('text_value', $get('setting_value'))),

                Placeholder::make('editor_preview')
                    ->label('Tampilan Konten Saat Ini')
                    ->content(fn ($record) => new HtmlString("<div class='prose dark:prose-invert max-w-none p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm'>" . ($record?->setting_value ?? '-') . "</div>"))
                    ->visible(fn ($get) => in_array($get('setting_key'), self::EDITOR_KEYS) || str_ends_with($get('setting_key') ?? '', '_message'))
                    ->columnSpanFull(),

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
                    ->afterStateHydrated(function (Repeater $component, $state) {
                        $record = $component->getRecord();
                        if ($record && $record->setting_key === 'faqs' && !empty($record->setting_value)) {
                            $component->state(json_decode($record->setting_value, true));
                        }
                    })
                    ->saveRelationshipsUsing(function (Repeater $component, $state) {
                        // handled in EditSiteSetting mutation
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
