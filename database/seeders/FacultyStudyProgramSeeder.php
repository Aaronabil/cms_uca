<?php

namespace Database\Seeders;

use App\Models\Faculty;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class FacultyStudyProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. FEBI (Kuning)
        $febi = Faculty::updateOrCreate(
            ['slug' => Str::slug('Fakultas Ekonomi dan Bisnis Islam')],
            [
                'name' => 'Ekonomi dan Bisnis Islam',
                'image_url' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1740',
                'color' => 'yellow',
                'description' => 'Fakultas Ekonomi dan Bisnis Islam (FEBI) berdedikasi untuk mencetak pemimpin masa depan.',
                'visi' => 'Menjadi universitas terkemuka di tingkat nasional.',
                'misi' => ['Menyelenggarakan pendidikan tinggi berkualitas.', 'Melaksanakan penelitian inovatif.'],
            ]
        );
        $programs = [['name' => 'Akuntansi', 'slug' => 'akuntansi'], ['name' => 'Bisnis Digital', 'slug' => 'bisnis-digital'], ['name' => 'Perbankan Syariah', 'slug' => 'perbankan-syariah'], ['name' => 'Ekonomi Syariah', 'slug' => 'ekonomi-syariah']];
        foreach ($programs as $p) {
            $febi->studyPrograms()->updateOrCreate(['slug' => $p['slug']], ['name' => $p['name']]);
        }

        // 2. FIK (Hijau)
        $fik = Faculty::updateOrCreate(
            ['slug' => Str::slug('Fakultas Ilmu Keperawatan')],
            [
                'name' => 'Ilmu Keperawatan',
                'image_url' => 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1686',
                'color' => 'green',
                'description' => 'Fakultas Ilmu Keperawatan berkomitmen menghasilkan perawat profesional.',
                'visi' => 'Menjadi pusat pendidikan keperawatan unggulan.',
                'misi' => ['Menyelenggarakan pendidikan keperawatan.', 'Melakukan penelitian.'],
            ]
        );
        $fik->studyPrograms()->updateOrCreate(['slug' => 'keperawatan'], ['name' => 'Keperawatan']);

        // 3. FTIK (Merah)
        $ftik = Faculty::updateOrCreate(
            ['slug' => Str::slug('Fakultas Tarbiyah dan Ilmu Keguruan')],
            [
                'name' => 'Tarbiyah dan Ilmu Keguruan',
                'image_url' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1740',
                'color' => 'red',
                'description' => 'Fakultas Tarbiyah dan Ilmu Keguruan mencetak pendidik profesional.',
                'visi' => 'Menjadi fakultas tarbiyah yang unggul.',
                'misi' => ['Menyelenggarakan pendidikan keguruan.', 'Mengembangkan ilmu pendidikan.'],
            ]
        );
        $programs = [['name' => 'Pendidikan Agama Islam', 'slug' => 'pai'], ['name' => 'Pendidikan Islam Anak Usia Dini', 'slug' => 'piAUD'], ['name' => 'Manajemen Pendidikan Islam', 'slug' => 'mpi']];
        foreach ($programs as $p) {
            $ftik->studyPrograms()->updateOrCreate(['slug' => $p['slug']], ['name' => $p['name']]);
        }

        // 4. FT (Oranye)
        $ft = Faculty::updateOrCreate(
            ['slug' => Str::slug('Fakultas Teknik')],
            [
                'name' => 'Teknik',
                'image_url' => 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1686',
                'color' => 'orange',
                'description' => 'Fakultas Teknik menyiapkan insinyur masa depan.',
                'visi' => 'Menjadi fakultas teknik terdepan.',
                'misi' => ['Menyelenggarakan pendidikan teknik.', 'Melakukan riset teknologi.'],
            ]
        );
        $programs = [['name' => 'Teknik Informatika', 'slug' => 'ti'], ['name' => 'Teknik Elektro', 'slug' => 'te']];
        foreach ($programs as $p) {
            $ft->studyPrograms()->updateOrCreate(['slug' => $p['slug']], ['name' => $p['name']]);
        }

        // --- TAMBAHAN (Menggunakan gambar yang SAMA biar aman) ---

        // 5. Kedokteran (Biru) -> Pakai gambar FEBI
        $fk = Faculty::updateOrCreate(
            ['slug' => Str::slug('Fakultas Kedokteran')],
            [
                'name' => 'Kedokteran',
                'image_url' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1740',
                'color' => 'blue',
                'description' => 'Mencetak dokter profesional.',
                'visi' => 'Menjadi Fakultas Kedokteran unggulan.',
                'misi' => ['Pendidikan berkualitas.', 'Penelitian kedokteran.'],
            ]
        );
        $fk->studyPrograms()->updateOrCreate(['slug' => 'pendidikan-dokter'], ['name' => 'Pendidikan Dokter']);
        $fk->studyPrograms()->updateOrCreate(['slug' => 'profesi-dokter'], ['name' => 'Profesi Dokter']);

        // 6. Pertanian (Coklat) -> Pakai gambar Teknik
        $fp = Faculty::updateOrCreate(
            ['slug' => Str::slug('Fakultas Pertanian')],
            [
                'name' => 'Pertanian',
                'image_url' => 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1686',
                'color' => 'brown',
                'description' => 'Mengembangkan inovasi pertanian.',
                'visi' => 'Pusat unggulan agroteknologi.',
                'misi' => ['Pendidikan pertanian.', 'Riset inovatif.'],
            ]
        );
        $fp->studyPrograms()->updateOrCreate(['slug' => 'agroteknologi'], ['name' => 'Agroteknologi']);
        $fp->studyPrograms()->updateOrCreate(['slug' => 'agribisnis'], ['name' => 'Agribisnis']);

        // 7. Hukum (Ungu) -> Pakai gambar FEBI
        $fh = Faculty::updateOrCreate(
            ['slug' => Str::slug('Fakultas Hukum')],
            [
                'name' => 'Hukum',
                'image_url' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1740',
                'color' => 'purple',
                'description' => 'Menegakkan keadilan hukum.',
                'visi' => 'Fakultas hukum terkemuka.',
                'misi' => ['Pendidikan hukum.', 'Mencetak sarjana hukum.'],
            ]
        );
        $fh->studyPrograms()->updateOrCreate(['slug' => 'ilmu-hukum'], ['name' => 'Ilmu Hukum']);

        // 8. Psikologi (Pink) -> Pakai gambar Teknik
        $fpk = Faculty::updateOrCreate(
            ['slug' => Str::slug('Fakultas Psikologi')],
            [
                'name' => 'Psikologi',
                'image_url' => 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1686',
                'color' => 'pink',
                'description' => 'Memahami perilaku manusia.',
                'visi' => 'Fakultas psikologi responsif.',
                'misi' => ['Pendidikan psikologi.', 'Penelitian psikologi.'],
            ]
        );
        $fpk->studyPrograms()->updateOrCreate(['slug' => 'psikologi'], ['name' => 'Psikologi']);

        // 9. Seni & Desain (Gray) -> Pakai gambar FEBI
        $fsd = Faculty::updateOrCreate(
            ['slug' => Str::slug('Fakultas Seni dan Desain')],
            [
                'name' => 'Seni dan Desain',
                'image_url' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1740',
                'color' => 'gray',
                'description' => 'Wadah kreativitas seni.',
                'visi' => 'Fakultas seni inovatif.',
                'misi' => ['Pendidikan seni.', 'Eksplorasi desain.'],
            ]
        );
        $fsd->studyPrograms()->updateOrCreate(['slug' => 'dkv'], ['name' => 'Desain Komunikasi Visual']);

        // 10. FISIP (Teal) -> Pakai gambar Teknik
        $fisp = Faculty::updateOrCreate(
            ['slug' => Str::slug('Fakultas Ilmu Sosial dan Politik')],
            [
                'name' => 'Ilmu Sosial dan Politik',
                'image_url' => 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1686',
                'color' => 'teal',
                'description' => 'Mengkaji fenomena sosial.',
                'visi' => 'Fakultas sosial relevan.',
                'misi' => ['Pendidikan sosial.', 'Analisis politik.'],
            ]
        );
        $fisp->studyPrograms()->updateOrCreate(['slug' => 'ilkom'], ['name' => 'Ilmu Komunikasi']);
    }
}
