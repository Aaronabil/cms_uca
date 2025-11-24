<?php

namespace App\Filament\Resources\Artikels\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ArtikelInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('users_id')
                    ->numeric(),
                ImageEntry::make('featured_image_id')
                    ->numeric(),
                TextEntry::make('title'),
                TextEntry::make('slug'),
                TextEntry::make('status'),
                TextEntry::make('published_at')
                    ->dateTime(),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
