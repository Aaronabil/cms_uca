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
            // Academic Section
            ['setting_key' => 'academic_section_title', 'setting_value' => 'Akademik'],
            ['setting_key' => 'academic_section_description', 'setting_value' => 'Mempersiapkan mahasiswa untuk memberikan kontribusi yang berarti pada masyarakat, bangsa dan dunia'],
            
            ['setting_key' => 'academic_card_1_title', 'setting_value' => 'Mengapa UCA'],
            ['setting_key' => 'academic_card_1_content', 'setting_value' => 'Universitas Cendekia Abditama unggul dalam integrasi nilai-nilai Islam dengan sains dan teknologi, didukung fasilitas modern dan kurikulum yang relevan dengan kebutuhan industri masa kini.'],
            
            ['setting_key' => 'academic_card_2_title', 'setting_value' => 'Tentang Fakultas'],
            ['setting_key' => 'academic_card_2_content', 'setting_value' => 'Fakultas kami memiliki tenaga pengajar yang kompeten dan berpengalaman, siap membimbing mahasiswa menjadi profesional yang berintegritas dan berdaya saing tinggi.'],
            
            ['setting_key' => 'academic_card_3_title', 'setting_value' => 'Berkuliah di UCA'],
            ['setting_key' => 'academic_card_3_content', 'setting_value' => 'Nikmati lingkungan belajar yang kondusif, strategis, dan asri. Kami berkomitmen mencetak generasi pemimpin yang cerdas secara intelektual, emosional, dan spiritual.'],

            // Facts Section
            ['setting_key' => 'facts_title', 'setting_value' => 'Fakta Universitas Cendekia Abditama'],
            ['setting_key' => 'facts_description', 'setting_value' => 'Kami terus berkembang bersama mahasiswa dan civitas akademika untuk menciptakan solusi inovatif dan meningkatkan produktivitas.'],
            
            ['setting_key' => 'facts_count_mahasiswa', 'setting_value' => '3000'],
            ['setting_key' => 'facts_label_mahasiswa', 'setting_value' => 'Mahasiswa'],
            
            ['setting_key' => 'facts_count_dosen', 'setting_value' => '200'],
            ['setting_key' => 'facts_label_dosen', 'setting_value' => 'Dosen'],
            
            ['setting_key' => 'facts_count_prodi', 'setting_value' => '50'],
            ['setting_key' => 'facts_label_prodi', 'setting_value' => 'Program Studi'],
            
            ['setting_key' => 'facts_count_alumni', 'setting_value' => '5000'],
            ['setting_key' => 'facts_label_alumni', 'setting_value' => 'Alumni'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['setting_key' => $setting['setting_key']],
                $setting
            );
        }
    }
}