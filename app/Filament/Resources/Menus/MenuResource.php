<?php

namespace App\Filament\Resources\Menus;

use App\Filament\Resources\Menus\Pages\CreateMenu;
use App\Filament\Resources\Menus\Pages\EditMenu;
use App\Filament\Resources\Menus\Pages\ListMenus;
use App\Filament\Resources\Menus\Tables\MenusTable;
use App\Models\Menu;
use App\Models\Page;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class MenuResource extends Resource
{
    protected static ?string $model = Menu::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Manajemen Konten';

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-bars-3';

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Schemas\Components\Section::make()
                    ->columns(2)
                    ->schema([
                        \Filament\Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(100)
                            ->columnSpan(1),

                        \Filament\Forms\Components\TextInput::make('order')
                            ->required()
                            ->numeric()
                            ->default(0)
                            ->columnSpan(1),

                        \Filament\Forms\Components\Radio::make('type')
                            ->label('Tipe Menu')
                            ->options([
                                'page' => 'Halaman Statis (Page)',
                                'custom' => 'URL Custom (Eksternal)',
                            ])
                            ->default('custom')
                            ->live()
                            ->dehydrated(false)
                            ->columnSpanFull()
                            ->afterStateUpdated(function ($set) {
                                $set('url', null);
                            }),

                        \Filament\Forms\Components\Select::make('page_id')
                            ->label('Pilih Halaman')
                            ->options(Page::where('status', 'published')->pluck('title', 'id'))
                            ->searchable()
                            ->visible(fn ($get) => $get('type') === 'page')
                            ->live()
                            ->dehydrated(false)
                            ->afterStateUpdated(function ($set, $state) {
                                $page = Page::find($state);
                                if ($page) {
                                    $set('url', '/page/' . $page->slug);
                                    $set('name', $page->title);
                                }
                            })
                            ->columnSpanFull(),

                        \Filament\Forms\Components\TextInput::make('url')
                            ->label('URL Tujuan')
                            ->required()
                            ->prefix(fn ($get) => $get('type') === 'custom' ? null : env('APP_URL'))
                            ->readOnly(fn ($get) => $get('type') === 'page')
                            ->columnSpanFull(),

                        \Filament\Forms\Components\Select::make('parent_id')
                            ->label('Induk Menu (Parent)')
                            ->relationship('parent', 'name', fn ($query) => $query->whereNull('parent_id'))
                            ->searchable()
                            ->placeholder('Jadikan Menu Utama (Root)')
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return MenusTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListMenus::route('/'),
            'create' => CreateMenu::route('/create'),
            'edit' => EditMenu::route('/{record}/edit'),
        ];
    }
}