<?php

namespace App\Filament\Widgets;

use App\Models\Artikel;
use App\Models\Category;
use App\Models\Lecturer;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        return [
            Stat::make('Total Pengguna', User::count())
                ->description('Jumlah total pengguna terdaftar')
                ->icon('heroicon-o-users')
                ->color('success'),
            Stat::make('Total Artikel', Artikel::count())
                ->description('Jumlah total artikel dan berita')
                ->icon('heroicon-o-document-text')
                ->color('info'),
            Stat::make('Total Kategori', Category::count())
                ->description('Jumlah total kategori artikel')
                ->icon('heroicon-o-tag')
                ->color('warning'),
            Stat::make('Total Dosen', Lecturer::count())
                ->description('Jumlah total dosen terdaftar')
                ->icon('heroicon-o-academic-cap')
                ->color('primary'),
        ];
    }
}
