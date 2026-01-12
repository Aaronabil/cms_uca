<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('role_id')
                    ->relationship('role', 'name')
                    ->required(),
                TextInput::make('username')
                    ->required(),
                TextInput::make('name')
                    ->required(),
                TextInput::make('password')
                    ->password()
                    ->required(),
            ]);
    }
}
