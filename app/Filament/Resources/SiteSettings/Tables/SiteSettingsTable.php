<?php

namespace App\Filament\Resources\SiteSettings\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class SiteSettingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('setting_key')
                    ->label('Setting Name')
                    ->formatStateUsing(fn (string $state): string => Str::title(str_replace('_', ' ', $state)))
                    ->weight('bold')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('setting_value')
                    ->label('Value')
                    ->searchable()
                    ->limit(50)
                    ->formatStateUsing(function (string $state, $record): string {
                        if ($record->setting_key === 'faqs') {
                            $count = count(json_decode($state, true) ?? []);
                            return "{$count} Questions Configured";
                        }
                        return $state;
                    })
                    ->color(fn ($record) => $record->setting_key === 'faqs' ? 'primary' : null),
                TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                // Removed BulkActionGroup to prevent accidental deletion of important settings
            ]);
    }
}
