<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use App\Models\StudyProgram;
use Illuminate\Database\Seeder;

class StudyProgramSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programs = StudyProgram::with('faculty')->get();

        foreach ($programs as $program) {
            $name = $program->name;
            $slug = $program->slug;

            // Default Visi
            SiteSetting::updateOrCreate(
                ['setting_key' => "prodi_{$slug}_visi"],
                [
                    'setting_value' => "Menjadi Program Studi $name yang unggul, inovatif, dan berlandaskan nilai-nilai Islam pada tahun 2030.",
                ]
            );

            // Default Misi (Format must be array of objects for Filament Repeater)
            $misi = [
                ['text' => "Menyelenggarakan pendidikan $name yang berkualitas dan relevan dengan kebutuhan industri."],
                ['text' => "Melaksanakan penelitian di bidang $name yang kontributif bagi masyarakat."],
                ['text' => "Melakukan pengabdian kepada masyarakat berbasis keilmuan $name."],
                ['text' => 'Mengembangkan kerjasama dengan mitra dalam dan luar negeri.'],
            ];

            SiteSetting::updateOrCreate(
                ['setting_key' => "prodi_{$slug}_misi"],
                [
                    'setting_value' => json_encode($misi),
                ]
            );
        }
    }
}
