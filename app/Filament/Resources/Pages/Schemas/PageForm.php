<?php

namespace App\Filament\Resources\Pages\Schemas;

use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Forms\Components\TextInput::make('title')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn ($set, ?string $state) => $set('slug', Str::slug($state))),
                \Filament\Forms\Components\TextInput::make('slug')
                    ->hidden()
                    ->required()
                    ->unique(ignoreRecord: true),
                \Filament\Forms\Components\Select::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                    ])
                    ->default('draft')
                    ->required(),
                \Filament\Forms\Components\Hidden::make('users_id')
                    ->default(fn () => auth()->id())
                    ->required(),
                \Filament\Forms\Components\RichEditor::make('content')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }
}
