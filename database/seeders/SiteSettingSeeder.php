<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            ['setting_key' => 'site_name', 'setting_value' => 'Universitas Cendekia Abditama'],
            ['setting_key' => 'site_description', 'setting_value' => 'Mempersiapkan mahasiswa untuk memberikan kontribusi yang berarti pada masyarakat, bangsa dan dunia.'],
            ['setting_key' => 'logo_url', 'setting_value' => '/logo-uca-website.png'],
            ['setting_key' => 'facebook_url', 'setting_value' => '#'],
            ['setting_key' => 'instagram_url', 'setting_value' => '#'],
            ['setting_key' => 'twitter_url', 'setting_value' => '#'],
            ['setting_key' => 'telepon', 'setting_value' => '021-123456'],
            ['setting_key' => 'email', 'setting_value' => 'info@uca.ac.id'],
            ['setting_key' => 'alamat', 'setting_value' => 'Jl. Pendidikan No. 1, Jakarta'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['setting_key' => $setting['setting_key']],
                $setting
            );
        }
    }
}