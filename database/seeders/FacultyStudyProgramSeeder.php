<?php

namespace Database\Seeders;

use App\Models\Faculty;
use App\Models\StudyProgram;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class FacultyStudyProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data for Faculty Ekonomi dan Bisnis Islam (FEBI)
        $febi = Faculty::create([
            'name' => 'Fakultas Ekonomi dan Bisnis Islam',
            'image_url' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1740',
            'slug' => Str::slug('Fakultas Ekonomi dan Bisnis Islam'),
        ]);
        $febi->studyPrograms()->createMany([
            ['name' => 'Akuntansi', 'slug' => Str::slug('Akuntansi')],
            ['name' => 'Bisnis Digital', 'slug' => Str::slug('Bisnis Digital')],
            ['name' => 'Perbankan Syariah', 'slug' => Str::slug('Perbankan Syariah')],
            ['name' => 'Ekonomi Syariah', 'slug' => Str::slug('Ekonomi Syariah')],
        ]);

        // Data for Fakultas Ilmu Keperawatan (FIK)
        $fik = Faculty::create([
            'name' => 'Fakultas Ilmu Keperawatan',
            'image_url' => 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1686',
            'slug' => Str::slug('Fakultas Ilmu Keperawatan'),
        ]);
        $fik->studyPrograms()->createMany([
            ['name' => 'Keperawatan', 'slug' => Str::slug('Keperawatan')],
        ]);

        // Data for Fakultas Tarbiyah dan Ilmu Keguruan (FTIK)
        $ftik = Faculty::create([
            'name' => 'Fakultas Tarbiyah dan Ilmu Keguruan',
            'image_url' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1740',
            'slug' => Str::slug('Fakultas Tarbiyah dan Ilmu Keguruan'),
        ]);
        $ftik->studyPrograms()->createMany([
            ['name' => 'Pendidikan Agama Islam', 'slug' => Str::slug('Pendidikan Agama Islam')],
            ['name' => 'Pendidikan Islam Anak Usia Dini', 'slug' => Str::slug('Pendidikan Islam Anak Usia Dini')],
            ['name' => 'Manajemen Pendidikan Islam', 'slug' => Str::slug('Manajemen Pendidikan Islam')],
        ]);

        // Data for Fakultas Teknik (FT)
        $ft = Faculty::create([
            'name' => 'Fakultas Teknik',
            'image_url' => 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1686',
            'slug' => Str::slug('Fakultas Teknik'),
        ]);
        $ft->studyPrograms()->createMany([
            ['name' => 'Teknik Informatika', 'slug' => Str::slug('Teknik Informatika')],
            ['name' => 'Teknik Elektro', 'slug' => Str::slug('Teknik Elektro')],
        ]);
    }
}