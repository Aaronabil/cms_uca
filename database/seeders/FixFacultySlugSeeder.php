<?php

namespace Database\Seeders;

use App\Models\Faculty;
use Illuminate\Database\Seeder;

class FixFacultySlugSeeder extends Seeder
{
    public function run(): void
    {
        $mapping = [
            'Fakultas Ekonomi dan Bisnis Islam' => 'ekonomi-dan-bisnis-islam',
            'Fakultas Ilmu Keperawatan' => 'ilmu-keperawatan',
            'Fakultas Tarbiyah dan Ilmu Keguruan' => 'tarbiyah-dan-ilmu-keguruan',
            'Fakultas Teknik' => 'teknik',
        ];

        foreach ($mapping as $name => $slug) {
            Faculty::where('name', 'like', "%$name%")->update(['slug' => $slug]);
        }
    }
}
