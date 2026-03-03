<?php

namespace Database\Seeders;

use App\Models\Artikel;
use App\Models\ArtikelImage;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ArtikelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure we have a user to assign articles to
        $user = User::first() ?? User::factory()->create([
            'name' => 'Admin Content',
            'username' => 'admincontent',
        ]);

        // Ensure we have categories 'Berita' and 'Artikel'
        $categoryBerita = Category::firstOrCreate(
            ['slug' => 'berita'],
            ['category_name' => 'Berita']
        );

        $categoryArtikel = Category::firstOrCreate(
            ['slug' => 'artikel'],
            ['category_name' => 'Artikel']
        );

        // Clean up 'Beasiswa' if it exists
        Category::where('slug', 'beasiswa')->delete();

        $articlesData = [
            // BERITA
            [
                'title' => 'Pendaftaran KIP Kuliah Merdeka 2025 Segera Dibuka',
                'category_slug' => 'berita',
                'content' => '<p>Kabar gembira bagi calon mahasiswa baru! Pemerintah melalui Kemendikbudristek akan segera membuka pendaftaran Program Kartu Indonesia Pintar (KIP) Kuliah Merdeka tahun 2025.</p><p>KIP Kuliah adalah bantuan biaya pendidikan dari pemerintah bagi lulusan Sekolah Menengah Atas (SMA) atau sederajat yang memiliki potensi akademik baik tetapi memiliki keterbatasan ekonomi. Berbeda dari beasiswa biasa yang berfokus pada prestasi semata, KIP Kuliah menyasar mereka yang membutuhkan dukungan finansial untuk melanjutkan studi ke jenjang perguruan tinggi.</p><p><strong>Jadwal Penting:</strong><br>Pendaftaran akun siswa KIP Kuliah diperkirakan akan dimulai pada awal Februari 2025. Calon mahasiswa diharapkan mempersiapkan dokumen seperti NIK, NISN, NPSN, dan alamat email aktif.</p>',
                'image_url' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'title' => 'Syarat dan Cara Daftar KIP Kuliah untuk Mahasiswa Baru',
                'category_slug' => 'berita',
                'content' => '<p>Bagi Anda yang ingin mendaftar KIP Kuliah, berikut adalah persyaratan utama yang harus dipenuhi:</p><ul><li>Penerima KIP Kuliah adalah siswa SMA atau sederajat yang lulus atau akan lulus pada tahun berjalan atau telah dinyatakan lulus maksimal 2 tahun sebelumnya.</li><li>Memiliki potensi akademik baik tetapi memiliki keterbatasan ekonomi yang didukung bukti dokumen yang sah.</li><li>Lulus seleksi penerimaan mahasiswa baru, dan diterima di PTN atau PTS pada prodi dengan Akreditasi A atau B, dan dimungkinkan dengan pertimbangan tertentu pada prodi dengan Akreditasi C.</li></ul><p><strong>Langkah Pendaftaran:</strong><br>1. Daftar secara mandiri di web Sistem KIP Kuliah.<br>2. Masukkan NIK, NISN, NPSN dan alamat email.<br>3. Validasi sistem.<br>4. Siswa mendapat Nomor Pendaftaran dan Kode Akses.<br>5. Selesaikan proses pendaftaran di portal KIP Kuliah.</p>',
                'image_url' => 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'title' => 'Manfaat KIP Kuliah: Bebas Biaya Pendidikan dan Uang Saku',
                'category_slug' => 'berita',
                'content' => '<p>Program KIP Kuliah Merdeka memberikan jaminan biaya pendidikan yang dibayarkan langsung ke Perguruan Tinggi berdasarkan Akreditasi Program Studi (Prodi). Mahasiswa penerima KIP Kuliah tidak perlu membayar UKT/SPP lagi.</p><p>Selain biaya pendidikan, mahasiswa penerima KIP Kuliah juga akan mendapatkan bantuan biaya hidup (uang saku) yang besarannya disesuaikan dengan indeks harga daerah dimana kampus berada. Bantuan biaya hidup ini ditransfer langsung ke rekening mahasiswa setiap semester.</p><p>Ini adalah kesempatan emas untuk mengubah masa depan. Jangan biarkan kendala ekonomi menghalangi mimpi Anda untuk meraih gelar sarjana!</p>',
                'image_url' => 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'title' => 'Universitas Gelar Wisuda Periode I Tahun 2025 dengan Khidmat',
                'category_slug' => 'berita',
                'content' => '<p>Suasana haru dan bangga menyelimuti kampus Universitas hari ini saat ribuan wisudawan dan wisudawati mengikuti prosesi Wisuda Periode I Tahun 2025. Acara yang digelar di Auditorium Utama ini dihadiri oleh jajaran rektorat, senat, serta orang tua wisudawan.</p><p>Rektor dalam sambutannya berpesan agar para lulusan tidak hanya mengandalkan ijazah semata, tetapi juga terus mengasah soft skill dan adaptabilitas di era digital yang serba cepat ini. "Kalian adalah agen perubahan. Tunjukkan integritas dan inovasi kalian di masyarakat," ujar Rektor.</p><p>Lulusan terbaik tahun ini diraih oleh Mahasiswa dari Fakultas Teknik dengan IPK sempurna 4.00. Ia menyampaikan pidato perpisahan yang menginspirasi rekan-rekannya untuk terus bermimpi dan berkarya.</p>',
                'image_url' => 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'title' => 'Kunjungan Industri Mahasiswa Teknik Informatika ke Jakarta',
                'category_slug' => 'berita',
                'content' => '<p>Sebanyak 50 mahasiswa Program Studi Teknik Informatika didampingi 3 dosen pembimbing melaksanakan Kunjungan Industri ke beberapa perusahaan teknologi terkemuka di Jakarta. Kegiatan ini bertujuan untuk memberikan wawasan langsung mengenai dunia kerja dan penerapan teknologi di industri.</p><p>Perusahaan yang dikunjungi antara lain adalah startup unicorn di bidang e-commerce dan perusahaan penyedia layanan cloud computing. Para mahasiswa berkesempatan melihat ruang server, berdiskusi dengan engineer, dan mendapatkan tips karir di bidang IT.</p><p>Ketua Prodi TI berharap kegiatan ini dapat memotivasi mahasiswa untuk belajar lebih giat dan mempersiapkan kompetensi yang dibutuhkan industri saat ini.</p>',
                'image_url' => 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
            ],

            // ARTIKEL
            [
                'title' => 'Peran Kecerdasan Buatan dalam Dunia Pendidikan Modern',
                'category_slug' => 'artikel',
                'content' => '<p>Kecerdasan Buatan atau Artificial Intelligence (AI) telah merambah berbagai sektor, tidak terkecuali dunia pendidikan. Integrasi AI dalam pembelajaran menawarkan berbagai potensi untuk meningkatkan efektivitas dan personalisasi pendidikan.</p><p>Salah satu penerapan AI adalah dalam bentuk tutor virtual yang dapat membantu siswa memahami materi pelajaran secara mandiri. Selain itu, AI juga dapat digunakan untuk menganalisis pola belajar siswa, sehingga guru dapat memberikan metode pengajaran yang lebih tepat sasaran.</p><p>Namun, penggunaan AI juga menghadirkan tantangan, seperti isu etika dan privasi data. Oleh karena itu, diperlukan regulasi yang jelas dan pemahaman yang bijak dalam memanfaatkan teknologi ini agar memberikan manfaat maksimal bagi kemajuan pendidikan.</p>',
                'image_url' => 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'title' => 'Tips Mengatur Waktu Belajar yang Efektif bagi Mahasiswa',
                'category_slug' => 'artikel',
                'content' => '<p>Menjadi mahasiswa seringkali dihadapkan pada padatnya jadwal kuliah, tugas, dan kegiatan organisasi. Tanpa manajemen waktu yang baik, mahasiswa rentan mengalami stres dan keteteran dalam akademik. Berikut adalah beberapa tips mengatur waktu belajar yang efektif:</p><ul><li><strong>Buat Skala Prioritas:</strong> Urutkan tugas berdasarkan tingkat urgensi dan kepentingannya. Kerjakan yang mendesak terlebih dahulu.</li><li><strong>Gunakan Teknik Podomoro:</strong> Belajar fokus selama 25 menit, lalu istirahat 5 menit. Ulangi siklus ini untuk menjaga konsentrasi.</li><li><strong>Hindari Penundaan (Procrastination):</strong> Segera kerjakan tugas saat diberikan. Menumpuk tugas hanya akan menambah beban di kemudian hari.</li><li><strong>Jaga Kesehatan:</strong> Istirahat yang cukup dan pola makan sehat sangat berpengaruh pada daya tangkap otak.</li></ul>',
                'image_url' => 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'title' => 'Pentingnya Soft Skill di Dunia Kerja Era Digital',
                'category_slug' => 'artikel',
                'content' => '<p>Di era digital saat ini, kemampuan teknis (hard skill) saja tidak cukup untuk bersaing di dunia kerja. Perusahaan semakin mementingkan kemampuan non-teknis atau soft skill dalam merekrut karyawan.</p><p>Beberapa soft skill yang paling dicari antara lain adalah kemampuan komunikasi yang baik, kerja sama tim (teamwork), pemecahan masalah (problem solving), dan berpikir kritis (critical thinking). Selain itu, kemampuan beradaptasi dengan perubahan teknologi yang cepat juga menjadi nilai tambah yang sangat krusial.</p><p>Mahasiswa disarankan untuk aktif mengikuti kegiatan organisasi, kepanitiaan, atau magang selama kuliah untuk mengasah soft skill ini sejak dini.</p>',
                'image_url' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'title' => 'Strategi Menulis Skripsi agar Cepat Lulus',
                'category_slug' => 'artikel',
                'content' => '<p>Skripsi seringkali menjadi momok bagi mahasiswa tingkat akhir. Banyak yang tertunda kelulusannya karena kesulitan dalam menyelesaikan tugas akhir ini. Berikut strategi yang bisa diterapkan:</p><p>Pertama, pilihlah topik yang benar-benar Anda minati dan kuasai. Ini akan menjaga motivasi Anda tetap tinggi selama proses pengerjaan. Kedua, rajinlah berkonsultasi dengan dosen pembimbing. Jangan takut untuk bertanya dan meminta masukan.</p><p>Ketiga, buat target harian atau mingguan yang realistis. Misalnya, targetkan menulis satu sub-bab dalam sehari. Terakhir, cari lingkungan yang kondusif untuk menulis dan hindari distraksi.</p>',
                'image_url' => 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'title' => 'Mengenal Cloud Computing dan Manfaatnya bagi Bisnis',
                'category_slug' => 'artikel',
                'content' => '<p>Cloud Computing atau komputasi awan telah merevolusi cara bisnis mengelola data dan infrastruktur IT mereka. Secara sederhana, cloud computing adalah penyediaan layanan komputasi (server, storage, database, networking, software) melalui internet.</p><p>Manfaat utama bagi bisnis adalah efisiensi biaya. Perusahaan tidak perlu lagi berinvestasi besar untuk membeli dan merawat server fisik sendiri. Skalabilitas juga menjadi keunggulan, dimana kapasitas penyimpanan bisa dinaikkan atau diturunkan sesuai kebutuhan dengan mudah.</p><p>Selain itu, cloud computing memungkinkan akses data dari mana saja dan kapan saja, mendukung sistem kerja remote yang semakin populer saat ini.</p>',
                'image_url' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
            ],
        ];

        foreach ($articlesData as $data) {
            $slug = Str::slug($data['title']);

            // Check existing article
            $artikel = Artikel::where('slug', $slug)->first();

            $dataToUpdate = [
                'users_id' => $user->id,
                'title' => $data['title'],
                'slug' => $slug,
                'content' => $data['content'],
                'status' => 'published',
                'published_at' => now(),
            ];

            if ($artikel) {
                // Update existing
                $artikel->update($dataToUpdate);
            } else {
                // Create new
                $artikel = Artikel::create($dataToUpdate);
            }

            // Handle Image
            if ($artikel->featuredImage) {
                $artikel->featuredImage->update(['image_url' => $data['image_url']]);
            } else {
                $image = ArtikelImage::create([
                    'artikel_id' => $artikel->id,
                    'image_url' => $data['image_url'],
                    'caption' => $data['title'],
                ]);
                $artikel->update(['featured_image_id' => $image->id]);
            }

            // Determine Category
            $targetCategoryId = ($data['category_slug'] === 'berita') ? $categoryBerita->id : $categoryArtikel->id;

            // Attach category
            $artikel->categories()->sync([$targetCategoryId]);
        }
    }
}
