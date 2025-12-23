<?php

namespace App\Filament\Resources\SiteSettings\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Schema;

class SiteSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('setting_key')
                    ->required()
                    ->live(onBlur: true)
                    ->hidden(fn ($record) => $record !== null),
                Textarea::make('setting_value')
                    ->columnSpanFull()
                    ->hidden(fn ($get) => $get('setting_key') === 'faqs')
                    ->dehydrated(fn ($get) => $get('setting_key') !== 'faqs'),
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
                    ->afterStateHydrated(function (Repeater $component, $get, $set, ?string $state) {
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
}
