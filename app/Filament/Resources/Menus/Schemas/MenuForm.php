<?php

namespace App\Filament\Resources\Menus\Schemas;

use App\Models\Page;
use Filament\Forms\Components\Radio;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Schemas\Schema;

class MenuForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make()
                    ->columns(2)
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(100)
                            ->columnSpan(1),

                        TextInput::make('order')
                            ->required()
                            ->numeric()
                            ->default(0)
                            ->columnSpan(1),

                        Radio::make('type')
                            ->label('Tipe Menu')
                            ->options([
                                'page' => 'Halaman Statis (Page)',
                                'custom' => 'URL Custom (Eksternal)',
                            ])
                            ->default('custom')
                            ->live()
                            ->columnSpanFull()
                            ->afterStateUpdated(function (Set $set) {
                                $set('url', null);
                            }),

                        Select::make('page_id')
                            ->label('Pilih Halaman')
                            ->options(Page::where('status', 'published')->pluck('title', 'id'))
                            ->searchable()
                            ->visible(fn (Get $get) => $get('type') === 'page')
                            ->live()
                            ->afterStateUpdated(function (Set $set, $state) {
                                $page = Page::find($state);
                                if ($page) {
                                    $set('url', '/page/' . $page->slug);
                                    // Auto-fill nama menu jika masih kosong
                                    $set('name', $page->title); 
                                }
                            })
                            ->columnSpanFull(),

                        TextInput::make('url')
                            ->label('URL Tujuan')
                            ->required()
                            ->prefix(fn (Get $get) => $get('type') === 'custom' ? null : env('APP_URL'))
                            ->readOnly(fn (Get $get) => $get('type') === 'page')
                            ->columnSpanFull(),

                        Select::make('parent_id')
                            ->label('Induk Menu (Parent)')
                            ->relationship('parent', 'name', fn ($query) => $query->whereNull('parent_id'))
                            ->searchable()
                            ->placeholder('Jadikan Menu Utama (Root)')
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
