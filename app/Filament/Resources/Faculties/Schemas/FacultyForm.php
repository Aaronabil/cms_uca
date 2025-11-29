<?php

namespace App\Filament\Resources\Faculties\Schemas;

use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class FacultyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Schemas\Components\Section::make()
                    ->columns(2)
                    ->schema([
                        \Filament\Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($set, ?string $state) => $set('slug', Str::slug($state))),

                        \Filament\Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),

                        \Filament\Forms\Components\FileUpload::make('image_url')
                            ->label('Logo / Foto Fakultas')
                            ->image()
                            ->directory('faculties')
                            ->required()
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
