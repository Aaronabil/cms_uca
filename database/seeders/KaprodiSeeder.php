<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use App\Models\StudyProgram;
use Illuminate\Database\Seeder;

class KaprodiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $prodis = StudyProgram::all();

        foreach ($prodis as $prodi) {
            // Key untuk foto kaprodi
            SiteSetting::updateOrCreate(
                ['setting_key' => "kaprodi_{$prodi->slug}_image"],
                ['setting_value' => '/kaprodi_ti.JPG'] // Default placeholder
            );

            // Key untuk nama kaprodi (opsional tapi membantu)
            SiteSetting::updateOrCreate(
                ['setting_key' => "kaprodi_{$prodi->slug}_name"],
                ['setting_value' => "Ketua Program Studi {$prodi->name}"]
            );

            // Key untuk pesan sambutan
            SiteSetting::updateOrCreate(
                ['setting_key' => "kaprodi_{$prodi->slug}_message"],
                ['setting_value' => "Selamat datang di Program Studi {$prodi->name}. Kami berkomitmen untuk mencetak lulusan yang kompeten dan inovatif."]
            );
        }
    }
}
