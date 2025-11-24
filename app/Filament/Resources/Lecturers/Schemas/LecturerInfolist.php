<?php

namespace App\Filament\Resources\Lecturers\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class LecturerInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('study_program_id')
                    ->numeric(),
                TextEntry::make('nidn'),
                TextEntry::make('name'),
                TextEntry::make('title'),
                TextEntry::make('email')
                    ->label('Email address'),
                TextEntry::make('expertise'),
                TextEntry::make('photo_url'),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
