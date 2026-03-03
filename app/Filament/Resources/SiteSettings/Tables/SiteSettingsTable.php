<?php

namespace App\Filament\Resources\SiteSettings\Tables;

use App\Models\Faculty;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
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
                        if (str_ends_with($record->setting_key, '_misi')) {
                            $count = count(json_decode($state, true) ?? []);

                            return "{$count} Items";
                        }
                        if ($record->setting_key === 'footer_settings') {
                            $data = json_decode($state, true);

                            return sprintf(
                                'Telepon: %s | Email: %s',
                                $data['telephone'] ?? '-',
                                $data['email'] ?? '-'
                            );
                        }
                        // Handle images preview in table if needed, or just text
                        if (str_starts_with($record->setting_key, 'kaprodi_') && str_ends_with($record->setting_key, '_image')) {
                            return '(Image Uploaded)';
                        }

                        return $state;
                    })
                    ->color(fn ($record) => $record->setting_key === 'faqs' || str_ends_with($record->setting_key, '_misi') ? 'primary' : null),
                TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('faculty')
                    ->label('Filter per Fakultas')
                    ->options(fn () => Faculty::pluck('name', 'id')->toArray())
                    ->query(function (Builder $query, array $data) {
                        if (empty($data['value'])) {
                            return $query;
                        }

                        $facultyId = $data['value'];
                        $faculty = Faculty::with('studyPrograms')->find($facultyId);

                        if (! $faculty) {
                            return $query;
                        }

                        $keys = [];
                        // Add Faculty keys
                        $keys[] = "faculty_{$faculty->slug}_%";

                        // Add Prodi keys for each study program
                        foreach ($faculty->studyPrograms as $prodi) {
                            $keys[] = "prodi_{$prodi->slug}_%";
                        }

                        return $query->where(function (Builder $q) use ($keys) {
                            foreach ($keys as $key) {
                                $q->orWhere('setting_key', 'like', $key);
                            }
                        });
                    }),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
            ]);
    }
}
