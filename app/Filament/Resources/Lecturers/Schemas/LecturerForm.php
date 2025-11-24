<?php

namespace App\Filament\Resources\Lecturers\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class LecturerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('study_program_id')
                    ->numeric(),
                TextInput::make('nidn'),
                TextInput::make('name')
                    ->required(),
                TextInput::make('title'),
                TextInput::make('email')
                    ->label('Email address')
                    ->email(),
                TextInput::make('expertise'),
                TextInput::make('photo_url'),
            ]);
    }
}
