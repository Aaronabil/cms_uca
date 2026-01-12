<?php

namespace App\Filament\Resources\StudyPrograms\Schemas;

use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class StudyProgramForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Schemas\Components\Section::make()
                    ->columns(2)
                    ->schema([
                        \Filament\Forms\Components\Select::make('faculty_id')
                            ->relationship('faculty', 'name')
                            ->label('Fakultas')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->columnSpanFull(),

                        \Filament\Forms\Components\TextInput::make('name')
                            ->label('Nama Program Studi')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($set, ?string $state) => $set('slug', Str::slug($state))),

                        \Filament\Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),
                    ]),

                \Filament\Schemas\Components\Section::make('Visi & Misi')
                    ->schema([
                        \Filament\Forms\Components\Textarea::make('visi')
                            ->label('Visi')
                            ->rows(3)
                            ->columnSpanFull(),
                            
                        \Filament\Forms\Components\Repeater::make('misi')
                            ->label('Misi')
                            ->schema([
                                \Filament\Forms\Components\TextInput::make('text')
                                    ->label('Misi Point')
                                    ->required(),
                            ])
                            ->itemLabel(fn (array $state): ?string => \Illuminate\Support\Str::limit($state['text'] ?? null, 50))
                            ->columnSpanFull(),
                    ])
                    ->collapsible(),
            ]);
    }
}
