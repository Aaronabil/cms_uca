<?php

namespace App\Filament\Resources\StudyPrograms\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use App\Models\StudyProgram;

class StudyProgramsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Program Studi')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('faculty.name')
                    ->label('Fakultas')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('slug')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('visi')
                    ->label('Visi')
                    ->state(fn (StudyProgram $record) => \App\Models\SiteSetting::where('setting_key', "prodi_{$record->slug}_visi")->value('setting_value'))
                    ->limit(50)
                    ->toggleable(),
                TextColumn::make('misi')
                    ->label('Misi')
                    ->state(function (StudyProgram $record) {
                         $json = \App\Models\SiteSetting::where('setting_key', "prodi_{$record->slug}_misi")->value('setting_value');
                         $arr = json_decode($json, true);
                         if (is_array($arr) && count($arr) > 0) {
                             $first = $arr[0]['text'] ?? $arr[0] ?? '';
                             return $first . (count($arr) > 1 ? '...' : '');
                         }
                         return '-';
                    })
                    ->limit(50)
                    ->toggleable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
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
