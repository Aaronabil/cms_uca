<?php

namespace App\Filament\Resources\Faculties\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class FacultyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                FileUpload::make('image_url')
                    ->image()
                    ->required(),
                TextInput::make('slug')
                    ->required(),
            ]);
    }
}
