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

        // Contoh Page "Visi & Misi"
        Page::updateOrCreate(
            ['slug' => Str::slug('Visi & Misi Universitas Cendekia Abditama')],
            [
                'users_id' => $superAdmin->id,
                'title' => 'Visi & Misi Universitas Cendekia Abditama',
                'content' => '<h2>Visi Kami</h2><p>Menjadi perguruan tinggi unggulan yang menghasilkan lulusan berintegritas, kompeten, dan berdaya saing global.</p><h2>Misi Kami</h2><ol><li>Menyelenggarakan pendidikan berkualitas.</li><li>Melaksanakan penelitian inovatif.</li><li>Mengabdi kepada masyarakat.</li></ol>',
                'status' => 'published',
            ]
        );

        // Contoh Page "Sejarah Kampus"
        Page::updateOrCreate(
            ['slug' => Str::slug('Sejarah Kampus Universitas Cendekia Abditama')],
            [
                'users_id' => $superAdmin->id,
                'title' => 'Sejarah Kampus Universitas Cendekia Abditama',
                'content' => '<p>Universitas Cendekia Abditama didirikan pada tahun 1999 dengan semangat untuk memajukan pendidikan di Indonesia. Berawal dari sebuah sekolah tinggi, kini telah berkembang menjadi universitas yang memiliki berbagai fakultas dan program studi.</p><p>Selama perjalanannya, UCA telah banyak berkontribusi dalam mencetak generasi penerus bangsa yang berkualitas.</p>',
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