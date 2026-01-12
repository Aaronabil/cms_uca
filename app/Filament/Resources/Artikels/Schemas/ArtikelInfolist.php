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
            ->columns(3)
            ->components([
                TextEntry::make('user.name')
                    ->label('Author')
                    ->columnSpan(1),
                TextEntry::make('title')
                    ->columnSpan(2),
                TextEntry::make('slug')
                    ->columnSpan(3),
                ImageEntry::make('featuredImage.image_url')
                    ->label('Featured Image')
                    ->disk('public')
                    ->height(200)
                    ->columnSpanFull(),
                TextEntry::make('status')
                    ->badge()
                    ->columnSpan(1),
                TextEntry::make('published_at')
                    ->dateTime()
                    ->columnSpan(1),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->columnSpan(1),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->columnSpan(1),
                TextEntry::make('content')
                    ->html()
                    ->columnSpanFull(),
            ]);
    }
}