<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Beranda
        Menu::create(['name' => 'Beranda', 'url' => '/', 'order' => 0]);

        // 2. Tentang UCA
        $tentang = Menu::create(['name' => 'Tentang UCA', 'url' => '#', 'order' => 1]);
        Menu::create(['name' => 'Sejarah UCA', 'url' => '/sejarah-uca', 'parent_id' => $tentang->id, 'order' => 0]);
        Menu::create(['name' => 'Pimpinan Universitas', 'url' => '/sambutan-rektor', 'parent_id' => $tentang->id, 'order' => 1]);
        Menu::create(['name' => 'Visi, Misi dan Tujuan', 'url' => '/visi-misi-dan-tujuan', 'parent_id' => $tentang->id, 'order' => 2]);

        // 3. Akademik
        $akademik = Menu::create(['name' => 'Akademik', 'url' => '#', 'order' => 2]);
        Menu::create(['name' => 'Kalender Akademik', 'url' => '/kalender-akademik', 'parent_id' => $akademik->id, 'order' => 0]);
        Menu::create(['name' => 'Data Dosen', 'url' => '/data-dosen', 'parent_id' => $akademik->id, 'order' => 1]);
        // Menu ini akan menjadi penanda untuk merender komponen Mega Menu Fakultas
        Menu::create(['name' => 'Fakultas & Prodi', 'url' => '#', 'parent_id' => $akademik->id, 'order' => 2]);

        // 4. Fasilitas Kampus
        Menu::create(['name' => 'Fasilitas Kampus', 'url' => '/fasilitas-kampus', 'order' => 3]);
    }
}