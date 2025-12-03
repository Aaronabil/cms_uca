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
        $febi = Faculty::updateOrCreate(
            ['slug' => Str::slug('Fakultas Ekonomi dan Bisnis Islam')],
            [
                'name' => 'Ekonomi dan Bisnis Islam',
                'image_url' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1740',
                'color' => 'yellow',
                'description' => "Fakultas Ekonomi dan Bisnis Islam (FEBI) berdedikasi untuk mencetak pemimpin masa depan yang tidak hanya unggul dalam ilmu ekonomi dan bisnis, tetapi juga menjunjung tinggi nilai-nilai keislaman.\n\nDengan kurikulum yang terintegrasi dan fasilitas modern, kami mempersiapkan mahasiswa untuk menghadapi tantangan global dengan integritas dan inovasi.",
                'visi' => "Menjadi universitas terkemuka di tingkat nasional pada tahun 2030 dalam pengembangan ilmu pengetahuan dan teknologi berdasarkan nilai-nilai Islam",
                'misi' => [
                    "Menyelenggarakan pendidikan tinggi berkualitas yang berorientasi pada pengembangan ilmu pengetahuan dan teknologi.",
                    "Melaksanakan penelitian inovatif yang berkontribusi pada pemecahan masalah di tingkat nasional maupun global.",
                    "Mengembangkan pengabdian kepada masyarakat yang relevan, berkelanjutan, dan berdampak positif.",
                    "Mewujudkan tata kelola perguruan tinggi yang profesional, transparan, dan berlandaskan nilai-nilai Islam."
                ],
            ]
        );
        
        $programs = [
            ['name' => 'Akuntansi', 'slug' => Str::slug('Akuntansi')],
            ['name' => 'Bisnis Digital', 'slug' => Str::slug('Bisnis Digital')],
            ['name' => 'Perbankan Syariah', 'slug' => Str::slug('Perbankan Syariah')],
            ['name' => 'Ekonomi Syariah', 'slug' => Str::slug('Ekonomi Syariah')],
        ];

        foreach ($programs as $program) {
            $febi->studyPrograms()->updateOrCreate(
                ['slug' => $program['slug']],
                ['name' => $program['name']]
            );
        }

        // Data for Fakultas Ilmu Keperawatan (FIK)
        $fik = Faculty::updateOrCreate(
            ['slug' => Str::slug('Fakultas Ilmu Keperawatan')],
            [
                'name' => 'Ilmu Keperawatan',
                'image_url' => 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1686',
                'color' => 'green',
                'description' => "Fakultas Ilmu Keperawatan berkomitmen menghasilkan perawat profesional yang kompeten, beretika, dan berwawasan global.",
                'visi' => "Menjadi pusat pendidikan keperawatan unggulan yang berlandaskan nilai-nilai Islam.",
                'misi' => [
                    "Menyelenggarakan pendidikan keperawatan yang berkualitas.",
                    "Melakukan penelitian di bidang keperawatan.",
                    "Melaksanakan pengabdian kepada masyarakat."
                ],
            ]
        );
        
        $fik->studyPrograms()->updateOrCreate(
            ['slug' => Str::slug('Keperawatan')],
            ['name' => 'Keperawatan']
        );

        // Data for Fakultas Tarbiyah dan Ilmu Keguruan (FTIK)
        $ftik = Faculty::updateOrCreate(
            ['slug' => Str::slug('Fakultas Tarbiyah dan Ilmu Keguruan')],
            [
                'name' => 'Tarbiyah dan Ilmu Keguruan',
                'image_url' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1740',
                'color' => 'red',
                'description' => "Fakultas Tarbiyah dan Ilmu Keguruan mencetak pendidik yang profesional, inovatif, dan berkarakter Islami.",
                'visi' => "Menjadi fakultas tarbiyah yang unggul dan inovatif.",
                'misi' => [
                    "Menyelenggarakan pendidikan keguruan yang bermutu.",
                    "Mengembangkan ilmu pendidikan Islam.",
                    "Meningkatkan kualitas sumber daya manusia di bidang pendidikan."
                ],
            ]
        );
        
        $programs = [
            ['name' => 'Pendidikan Agama Islam', 'slug' => Str::slug('Pendidikan Agama Islam')],
            ['name' => 'Pendidikan Islam Anak Usia Dini', 'slug' => Str::slug('Pendidikan Islam Anak Usia Dini')],
            ['name' => 'Manajemen Pendidikan Islam', 'slug' => Str::slug('Manajemen Pendidikan Islam')],
        ];

        foreach ($programs as $program) {
            $ftik->studyPrograms()->updateOrCreate(
                ['slug' => $program['slug']],
                ['name' => $program['name']]
            );
        }

        // Data for Fakultas Teknik (FT)
        $ft = Faculty::updateOrCreate(
            ['slug' => Str::slug('Fakultas Teknik')],
            [
                'name' => 'Teknik',
                'image_url' => 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1686',
                'color' => 'orange',
                'description' => "Fakultas Teknik menyiapkan insinyur masa depan yang handal dan mampu bersaing di era teknologi informasi.",
                'visi' => "Menjadi fakultas teknik yang terdepan dalam inovasi teknologi.",
                'misi' => [
                    "Menyelenggarakan pendidikan teknik yang adaptif terhadap perkembangan teknologi.",
                    "Melakukan riset teknologi terapan.",
                    "Memberikan solusi teknologi bagi masyarakat."
                ],
            ]
        );
        
        $programs = [
            ['name' => 'Teknik Informatika', 'slug' => Str::slug('Teknik Informatika')],
            ['name' => 'Teknik Elektro', 'slug' => Str::slug('Teknik Elektro')],
        ];

        foreach ($programs as $program) {
            $ft->studyPrograms()->updateOrCreate(
                ['slug' => $program['slug']],
                ['name' => $program['name']]
            );
        }
    }
}