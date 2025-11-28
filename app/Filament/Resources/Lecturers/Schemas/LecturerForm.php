<?php

namespace App\Filament\Resources\Lecturers\Schemas;

use Filament\Schemas\Schema;

class LecturerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Schemas\Components\Section::make()
                    ->columns(3)
                    ->schema([
                        \Filament\Schemas\Components\Section::make('Informasi Pribadi')
                            ->columnSpan(2)
                            ->schema([
                                \Filament\Schemas\Components\Section::make()
                                    ->columns(2)
                                    ->schema([
                                        \Filament\Forms\Components\TextInput::make('name')
                                            ->label('Nama Lengkap')
                                            ->required()
                                            ->maxLength(255),
                                        \Filament\Forms\Components\TextInput::make('title')
                                            ->label('Gelar Akademik')
                                            ->placeholder('Contoh: S.T., M.Kom.')
                                            ->maxLength(100),
                                        \Filament\Forms\Components\TextInput::make('nidn')
                                            ->label('NIDN / NIDK')
                                            ->unique(ignoreRecord: true)
                                            ->numeric(),
                                        \Filament\Forms\Components\TextInput::make('email')
                                            ->label('Email Kampus')
                                            ->email()
                                            ->maxLength(255),
                                        \Filament\Forms\Components\Select::make('study_program_id')
                                            ->label('Program Studi')
                                            ->relationship('studyProgram', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->columnSpanFull(),
                                        \Filament\Forms\Components\TextInput::make('expertise')
                                            ->label('Bidang Keahlian')
                                            ->placeholder('Contoh: AI, IoT, Data Science')
                                            ->columnSpanFull(),
                                    ]),
                            ]),

                        \Filament\Schemas\Components\Section::make('Foto Profil')
                            ->columnSpan(1)
                            ->schema([
                                \Filament\Forms\Components\FileUpload::make('photo_url')
                                    ->label('Foto Dosen')
                                    ->image()
                                    ->directory('lecturers')
                                    ->avatar()
                                    ->imageEditor()
                                    ->circleCropper(),
                            ]),
                    ]),
            ]);
    }
}
