<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdmin = User::where('username', 'superadmin')->first();

        // Page "Visi"
        Page::updateOrCreate(
            ['slug' => 'visi-uca'],
            [
                'users_id' => $superAdmin->id,
                'title' => 'Visi Universitas Cendekia Abditama',
                'content' => '<p>Menjadi pusat unggulan pendidikan dan penelitian di bidang informatika yang berbasis nilai-nilai Islam pada tahun 2030.</p>',
                'status' => 'published',
            ]
        );

        // Page "Misi"
        Page::updateOrCreate(
            ['slug' => 'misi-uca'],
            [
                'users_id' => $superAdmin->id,
                'title' => 'Misi Universitas Cendekia Abditama',
                'content' => '<ul><li>Menyelenggarakan pendidikan tinggi berkualitas yang berorientasi pada pengembangan ilmu pengetahuan dan teknologi.</li><li>Melaksanakan penelitian inovatif yang berkontribusi pada pemecahan masalah di tingkat nasional maupun global.</li><li>Mengembangkan pengabdian kepada masyarakat yang relevan, berkelanjutan, dan berdampak positif.</li><li>Mewujudkan tata kelola perguruan tinggi yang profesional, transparan, dan berlandaskan nilai-nilai Islam.</li></ul>',
                'status' => 'published',
            ]
        );

        // Contoh Page "Sejarah Kampus"
        Page::updateOrCreate(
            ['slug' => 'sejarah-uca'],
            [
                'users_id' => $superAdmin->id,
                'title' => 'Sejarah Kampus Universitas Cendekia Abditama',
                'content' => '<p>Universitas Cendekia Abditama (UCA) didirikan pada tahun 1999 dengan visi mulia untuk menjadi mercusuar pendidikan tinggi yang berorientasi pada integritas, inovasi, dan kontribusi nyata bagi masyarakat. Bermula dari sebuah gagasan visioner para pendiri yang peduli akan masa depan bangsa, UCA tumbuh dari sekolah tinggi menjadi universitas yang disegani.</p><p>Perjalanan UCA tidak lepas dari berbagai tantangan dan rintangan. Namun, dengan semangat kebersamaan dan dedikasi tinggi dari seluruh civitas akademika—dosen, staf, dan mahasiswa—UCA terus melangkah maju. Kurikulum yang adaptif, fasilitas modern, serta lingkungan belajar yang kondusif menjadi pilar utama dalam mencetak lulusan berkualitas.</p><blockquote>"Pendidikan adalah senjata paling ampuh yang bisa Anda gunakan untuk mengubah dunia." – Nelson Mandela. Semangat inilah yang selalu memotivasi setiap langkah Universitas Cendekia Abditama dalam mendidik generasi penerus.</blockquote><p>Dalam dua dekade terakhir, UCA telah menghasilkan ribuan alumni yang tersebar di berbagai sektor, baik nasional maupun internasional. Mereka adalah agen perubahan yang membawa dampak positif di bidang masing-masing, membuktikan kualitas pendidikan yang diberikan UCA. Prestasi di bidang akademik, riset, hingga pengabdian masyarakat terus diukir, memperkuat posisi UCA sebagai institusi pendidikan unggulan.</p><p>Ke depan, Universitas Cendekia Abditama berkomitmen untuk terus berinovasi, memperluas jangkauan kolaborasi, dan beradaptasi dengan perkembangan zaman. Dengan tetap berpegang teguh pada nilai-nilai luhur dan integritas, UCA siap menghadapi tantangan masa depan dan terus berkontribusi dalam membangun peradaban yang lebih baik.</p>',
                'status' => 'published',
            ]
        );

        // Contoh Page "Sambutan Rektor"
        Page::updateOrCreate(
            ['slug' => 'sambutan-rektor'],
            [
                'users_id' => $superAdmin->id,
                'title' => 'Sambutan Rektor',
                'content' => "<p>Assalamu'alaikum Warahmatullahi Wabarakatuh.</p><p>Dengan bangat kami menyambut Anda di situs resmi Universitas Cendekia Abditama. Sebagai Rektor, saya sangat bangga dengan capaian dan dedikasi seluruh civitas akademika kami dalam menciptakan lingkungan belajar yang inspiratif dan inovatif.</p><p>Mari bersama-sama membangun masa depan yang cerah!</p><p>Hormat kami,</p><p><strong>Dr. Muhammad Subali, S.Si., M.T.</strong><br/>Rektor Universitas Cendekia Abditama</p>",
                'status' => 'published',
            ]
        );

        // Contoh Page "Peta Kampus" (Draft)
        Page::updateOrCreate(
            ['slug' => Str::slug('Peta Kampus')],
            [
                'users_id' => $superAdmin->id,
                'title' => 'Peta Kampus',
                'content' => '<p>Peta kampus akan segera tersedia. Mohon bersabar.</p>',
                'status' => 'draft',
            ]
        );
    }
}
