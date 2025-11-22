import GuestLayout from '@/Layouts/GuestLayout'
import { Calendar, User, MessageCircle, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AnimatedTitle from '@/Components/Underline';

type Category = 'Berita Terkini' | 'Akademik' | 'Kemahasiswaan' | 'Riset' | 'Pengumuman';

const CATEGORIES: Category[] = ['Berita Terkini', 'Akademik', 'Kemahasiswaan', 'Riset', 'Pengumuman'];

const generateNews = (category: Category) => {
    const titles = {
        'Berita Terkini': [
            "Jadwal Pengisian KRS Semester Genap 2025/2026",
            "Kuliah Umum: Tantangan AI di Era Industri 5.0",
            "Panduan Wisuda Periode I Tahun 2025"
        ],
        'Akademik': [
            "Jadwal Pengisian KRS Semester Genap 2025/2026",
            "Kuliah Umum: Tantangan AI di Era Industri 5.0",
            "Panduan Wisuda Periode I Tahun 2025"
        ],
        'Kemahasiswaan': [
            "Mahasiswa FT Menangkan Hackathon Nasional",
            "Pendaftaran UKM Robotik Dibuka Kembali",
            "Lomba Debat Bahasa Inggris Tingkat Universitas"
        ],
        'Riset': [
            "Dosen TI Publikasi Jurnal Q1 Scopus",
            "Workshop Metodologi Penelitian Kuantitatif",
            "Hibah Penelitian Dikti 2025 Diumumkan"
        ],
        'Pengumuman': [
            "Libur Perkuliahan Hari Raya Idul Fitri",
            "Perubahan Jam Layanan Perpustakaan",
            "Beasiswa KIP Kuliah Jalur Mandiri"
        ]
    };

    return titles[category].map((title, i) => ({
        id: Math.random(),
        title: title,
        category: category,
        author: "Admin Kampus",
        date: `${10 + i} Nov 2025`,
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop",
        comments: Math.floor(Math.random() * 50)
    }));
};


export default function SemuaBerita() {
    return (
        <GuestLayout>
            <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">

                {/* 1. PAGE HEADER */}
                <header className="pt-20 pb-12 px-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                            Indeks Berita Kampus
                        </h1>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                            Arsip lengkap informasi terkini seputar kegiatan akademik, kemahasiswaan, dan riset di Universitas Cendekia Abditama.
                        </p>
                    </div>
                </header>

                {/* 2. LOOPING KATEGORI */}
                <div className="max-w-7xl mx-auto px-4 space-y-20 mt-16">
                    {CATEGORIES.map((category) => {
                        const newsList = generateNews(category); // Ambil 3 berita untuk kategori ini

                        return (
                            <section key={category} className="relative">

                                {/* Section Header with Link */}
                                <div className="flex items-end justify-between mb-8 border-b border-slate-200 pb-4">
                                    <div>
                                        <span className="text-xs font-bold text-green-900 uppercase tracking-widest mb-1 block">
                                            Kategori
                                        </span>
                                        <h2 className="text-3xl  font-bold text-slate-900">
                                            {category}
                                        </h2>
                                    </div>
                                    <a
                                        href={`/news/category/${category.toLowerCase()}`}
                                        className="hidden md:flex items-center text-sm font-bold text-slate-500 hover:text-green-900 transition-colors group"
                                    >
                                        Arsip {category}
                                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                    </a>
                                </div>

                                {/* Grid 3 Kolom */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {newsList.map((news) => (
                                        <div key={news.id} className="group flex flex-col h-full bg-white rounded-xl border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300 overflow-hidden">

                                            {/* Image */}
                                            <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                                                <img
                                                    src={news.image}
                                                    alt={news.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

                                                {/* Badge Tanggal Floating */}
                                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur shadow-sm px-3 py-1 rounded text-xs font-bold text-slate-700 border border-slate-200/50 flex items-center gap-1.5">
                                                    <Calendar className="w-3 h-3 text-green-900" />
                                                    {news.date}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 flex flex-col p-6">
                                                <h3 className="text-lg  font-bold text-slate-900 leading-snug mb-3 flex-1">
                                                    <AnimatedTitle
                                                        title={news.title}
                                                        className="decoration-green-900"
                                                    />
                                                </h3>

                                                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                                    <span className="flex items-center hover:text-slate-800 transition-colors">
                                                        <User className="w-3 h-3 mr-1.5" /> {news.author}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <MessageCircle className="w-3 h-3 mr-1.5" /> {news.comments}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Mobile View All Button (Hanya muncul di HP) */}
                                <div className="mt-6 md:hidden">
                                    <a
                                        href={`/news/category/${category.toLowerCase()}`}
                                        className="flex items-center justify-center w-full py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100 hover:text-green-900 transition-colors"
                                    >
                                        Lihat Semua Berita {category}
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </a>
                                </div>

                            </section>
                        );
                    })}
                </div>

                {/* Footer Call to Action (Optional) */}
                <div className="max-w-7xl mx-auto px-4 mt-24">
                    <div className="bg-slate-900 rounded-2xl p-12 text-center text-white overflow-hidden relative">
                        <div className="relative z-10">
                            <h2 className="text-3xl  font-bold mb-4">Tidak menemukan yang Anda cari?</h2>
                            <p className="text-slate-300 mb-8">Coba gunakan fitur pencarian atau lihat arsip tahunan kami.</p>
                            <div className="flex justify-center gap-4">
                                <button className="bg-green-900 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition-colors">
                                    Pencarian Lanjut
                                </button>
                                <button className="bg-transparent border border-slate-600 hover:bg-slate-800 text-white px-6 py-3 rounded-full font-bold transition-colors">
                                    Arsip Tahunan
                                </button>
                            </div>
                        </div>

                        {/* Decorative blob */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                            <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-green-900 rounded-full blur-3xl opacity-20"></div>
                            <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-3xl opacity-20"></div>
                        </div>
                    </div>
                </div>

            </div>
        </GuestLayout>
    )
}