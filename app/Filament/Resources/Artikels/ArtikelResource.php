<?php

namespace App\Filament\Resources\Artikels;

use App\Filament\Resources\Artikels\Pages\CreateArtikel;
use App\Filament\Resources\Artikels\Pages\EditArtikel;
use App\Filament\Resources\Artikels\Pages\ListArtikels;
use App\Filament\Resources\Artikels\Pages\ViewArtikel;
use App\Filament\Resources\Artikels\Schemas\ArtikelForm;
use App\Filament\Resources\Artikels\Schemas\ArtikelInfolist;
use App\Filament\Resources\Artikels\Tables\ArtikelsTable;
use App\Models\Artikel;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ArtikelResource extends Resource
{
    protected static ?string $model = Artikel::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return ArtikelForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return ArtikelInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ArtikelsTable::configure($table);
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
            'index' => ListArtikels::route('/'),
            'create' => CreateArtikel::route('/create'),
            'view' => ViewArtikel::route('/{record}'),
            'edit' => EditArtikel::route('/{record}/edit'),
        ];
    }
}
