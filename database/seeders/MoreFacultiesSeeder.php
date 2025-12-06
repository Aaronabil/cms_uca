<?php

namespace Database\Seeders;

use App\Models\Faculty;
use App\Models\StudyProgram;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class MoreFacultiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faculties = [
            [
                'name' => 'Fakultas Kedokteran',
                'description' => 'Mencetak dokter profesional yang berintegritas dan berjiwa sosial tinggi.',
                'image_url' => 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1600',
                'programs' => ['Pendidikan Dokter', 'Profesi Dokter', 'Farmasi']
            ],
            [
                'name' => 'Fakultas Pertanian',
                'description' => 'Mengembangkan inovasi di bidang pertanian modern dan agribisnis berkelanjutan.',
                'image_url' => 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&q=80&w=1600',
                'programs' => ['Agroteknologi', 'Agribisnis', 'Teknologi Pangan']
            ],
            [
                'name' => 'Fakultas Hukum',
                'description' => 'Menegakkan keadilan melalui pendidikan hukum yang komprehensif dan kritis.',
                'image_url' => 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1600',
                'programs' => ['Ilmu Hukum']
            ],
            [
                'name' => 'Fakultas Psikologi',
                'description' => 'Memahami perilaku manusia dan kesehatan mental di era digital.',
                'image_url' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600',
                'programs' => ['Psikologi']
            ],
            [
                'name' => 'Fakultas Seni dan Desain',
                'description' => 'Wadah kreativitas dan ekspresi seni untuk industri kreatif masa depan.',
                'image_url' => 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1600',
                'programs' => ['Desain Komunikasi Visual', 'Seni Rupa Murni', 'Desain Interior']
            ],
            [
                'name' => 'Fakultas Ilmu Sosial dan Politik',
                'description' => 'Mengkaji fenomena sosial dan dinamika politik global.',
                'image_url' => 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1600',
                'programs' => ['Ilmu Komunikasi', 'Hubungan Internasional', 'Administrasi Publik']
            ],
        ];

        foreach ($faculties as $data) {
            $slug = Str::slug($data['name']);

            // Create Faculty
            $faculty = Faculty::firstOrCreate(
                ['slug' => $slug],
                [
                    'name' => $data['name'],
                    'description' => $data['description'],
                    'image_url' => $data['image_url'],
                ]
            );

            // Create Study Programs
            foreach ($data['programs'] as $programName) {
                StudyProgram::firstOrCreate(
                    ['name' => $programName, 'faculty_id' => $faculty->id],
                    [
                        'slug' => Str::slug($programName),
                        'description' => "Program Studi $programName di " . $data['name'],
                    ]
                );
            }
        }
    }
}
