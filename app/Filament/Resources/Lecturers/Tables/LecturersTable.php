<?php

namespace App\Filament\Resources\Lecturers\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class LecturersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('photo_url')
                    ->label('')
                    ->circular()
                    ->defaultImageUrl(url('/images/placeholder-user.png')),
                TextColumn::make('name')
                    ->label('Nama Dosen')
                    ->description(fn ($record) => $record->title)
                    ->searchable()
                    ->sortable(),
                TextColumn::make('nidn')
                    ->label('NIDN')
                    ->copyable()
                    ->searchable(),
                TextColumn::make('studyProgram.name')
                    ->label('Program Studi')
                    ->badge()
                    ->sortable(),
                TextColumn::make('email')
                    ->icon('heroicon-m-envelope')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('study_program_id')
                    ->label('Filter Prodi')
                    ->relationship('studyProgram', 'name'),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
