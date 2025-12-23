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
            [
                'setting_key' => 'vision',
                'setting_value' => 'Menjadi pusat unggulan pendidikan dan penelitian di bidang informatika yang berbasis nilai-nilai Islam pada tahun 2030.'
            ],
            [
                'setting_key' => 'mission',
                'setting_value' => "Menyelenggarakan pendidikan tinggi berkualitas yang berorientasi pada pengembangan ilmu pengetahuan dan teknologi.\nMelaksanakan penelitian inovatif yang berkontribusi pada pemecahan masalah di tingkat nasional maupun global.\nMengembangkan pengabdian kepada masyarakat yang relevan, berkelanjutan, dan berdampak positif.\nMewujudkan tata kelola perguruan tinggi yang profesional, transparan, dan berlandaskan nilai-nilai Islam."
            ],
            [
                'setting_key' => 'faqs',
                'setting_value' => json_encode([
                    [
                        "question" => "Kapan pendaftaran mahasiswa baru dibuka?",
                        "answer" => "Pendaftaran mahasiswa baru dibuka dalam 3 gelombang. Gelombang 1: Januari - Maret, Gelombang 2: April - Juni, dan Gelombang 3: Juli - Agustus. Pendaftaran dapat dilakukan secara online maupun offline di kampus UCA."
                    ],
                    [
                        "question" => "Apa saja syarat pendaftaran yang harus dipenuhi?",
                        "answer" => "Syarat umum meliputi: Lulusan SMA/SMK/MA sederajat, scan Ijazah/SKL, scan Kartu Keluarga, Pas Foto terbaru, dan membayar biaya pendaftaran. Beberapa program studi mungkin memiliki persyaratan khusus tambahan."
                    ],
                    [
                        "question" => "Bagaimana cara mendaftar secara online?",
                        "answer" => "Kunjungi laman pendaftaran kami, buat akun pendaftar, isi formulir biodata diri, pilih program studi yang diminati, unggah berkas persyaratan, dan lakukan pembayaran biaya pendaftaran melalui transfer bank."
                    ],
                    [
                        "question" => "Apakah tersedia beasiswa di UCA?",
                        "answer" => "Ya, UCA menyediakan berbagai jalur beasiswa, antara lain: Beasiswa Prestasi Akademik, Beasiswa Hafiz Qur'an, Beasiswa KIP-Kuliah, dan Beasiswa Yayasan. Informasi lengkap mengenai beasiswa dapat dilihat pada menu Beasiswa."
                    ],
                    [
                        "question" => "Berapa biaya kuliah di UCA?",
                        "answer" => "Biaya kuliah di UCA sangat terjangkau dan dapat diangsur. Biaya bervariasi tergantung pada Program Studi yang diambil. Untuk rincian lengkap biaya pendidikan, silakan unduh brosur PMB terbaru kami."
                    ]
                ])
            ],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['setting_key' => $setting['setting_key']],
                $setting
            );
        }
    }
}