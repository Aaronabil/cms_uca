import React, { useState } from 'react';
import { Calendar, User, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from '@inertiajs/react'
import AnimatedTitle from './Underline';

type Category = 'Terbaru' | 'Akademik' | 'Kemahasiswaan' | 'Riset' | 'Pengumuman';

interface NewsItem {
    id: number;
    title: string;
    category: Category;
    author: string;
    date: string;
    image: string;
    isFeatured?: boolean;
    comments?: number;
}

const NEWS_DATA: NewsItem[] = [
    {
        id: 1,
        title: "Mahasiswa Teknik Informatika Menangkan Kompetisi Hackathon Nasional 2025",
        category: "Kemahasiswaan",
        author: "Humas FT",
        date: "12 Nov 2025",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop",
        isFeatured: true,
        comments: 45
    },
    {
        id: 2,
        title: "Jadwal Pengisian KRS Semester Genap Tahun Ajaran 2025/2026",
        category: "Akademik",
        author: "BAAK",
        date: "10 Nov 2025",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2940&auto=format&fit=crop",
        comments: 12
    },
    {
        id: 3,
        title: "Kuliah Umum: Tantangan AI di Era Industri 5.0 bersama Pakar Google",
        category: "Akademik",
        author: "Prodi TI",
        date: "08 Nov 2025",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2940&auto=format&fit=crop",
        comments: 28
    },
    {
        id: 4,
        title: "Tim Robotik Kampus Melaju ke Tahap Final Kontes Robot Indonesia",
        category: "Riset",
        author: "Unit Kegiatan Mahasiswa",
        date: "05 Nov 2025",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2940&auto=format&fit=crop",
        comments: 5
    },
    {
        id: 5,
        title: "Pendaftaran Beasiswa KIP Kuliah Jalur Mandiri Telah Dibuka",
        category: "Pengumuman",
        author: "Biro Kemahasiswaan",
        date: "01 Nov 2025",
        image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D",
        comments: 99
    },
];

const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <span className={`px-2 py-1 text-xs font-semibold tracking-wide uppercase rounded-sm ${className}`}>
        {children}
    </span>
);

export default function NewsSection() {
    const [activeCategory, setActiveCategory] = useState<Category>('Terbaru');

    const filteredNews = activeCategory === 'Terbaru'
        ? NEWS_DATA
        : NEWS_DATA.filter(item => item.category === activeCategory);

    const featuredNews = filteredNews[0];
    const otherNews = filteredNews.slice(1, 5);

    const categories: Category[] = ['Terbaru', 'Akademik', 'Kemahasiswaan', 'Riset', 'Pengumuman'];

    if (!featuredNews) return <div className="py-20 text-center">Belum ada berita di kategori ini.</div>;

    return (
        <section className="py-16 px-4 max-w-7xl mx-auto font-sans text-slate-800 bg-white">

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900">Berita Terkini</h1>
                    <p className="text-slate-500 text-lg mt-1">Informasi terkini terkait Universitas Cendekia Abditama</p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm font-medium border-b md:border-none pb-2 md:pb-0 overflow-x-auto">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`uppercase tracking-wider transition-colors duration-200 whitespace-nowrap ${activeCategory === cat
                                ? 'text-green-900 font-bold border-b-2 border-green-900 md:border-none'
                                : 'text-slate-400 hover:text-slate-900'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <div className="lg:col-span-6 group cursor-pointer">
                    <div className="relative h-[400px] lg:h-[700px] w-full overflow-hidden rounded-xl shadow-sm">
                        <img
                            src={featuredNews.image}
                            alt={featuredNews.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />

                        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full text-white">
                            <Badge className="bg-green-900 text-white mb-3 inline-block">
                                {featuredNews.category}
                            </Badge>

                            <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
                                <AnimatedTitle title={featuredNews.title} className="text-white decoration-green-500" />
                            </h3>

                            <div className="flex items-center space-x-4 text-xs md:text-sm text-slate-300 font-medium">
                                <div className="flex items-center">
                                    <User className="w-4 h-4 mr-1" />
                                    {featuredNews.author}
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {featuredNews.date}
                                </div>
                                <div className="flex items-center">
                                    <MessageCircle className="w-4 h-4 mr-1" />
                                    {featuredNews.comments}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Grid of Smaller News (2x2) */}
                <div className="lg:col-span-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                        {otherNews.map((news) => (
                            <div key={news.id} className="flex flex-col h-full group">
                                {/* Image Wrapper */}
                                <div className="relative h-48 w-full overflow-hidden rounded-lg mb-4">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 right-3">
                                        {/* Kategori Label kecil di atas gambar */}
                                        <Badge className="bg-white/90 text-slate-800 backdrop-blur-sm shadow-sm">
                                            {news.category}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col">
                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between text-xs text-green-900 font-semibold uppercase tracking-wider mb-2">
                                        <span>{news.category}</span>
                                        <span className="text-slate-400 font-normal flex items-center normal-case">
                                            <MessageCircle className="w-3 h-3 mr-1" /> {news.comments}
                                        </span>
                                    </div>

                                    {/* Title with Animation */}
                                    <h4 className="text-lg font-bold text-slate-900 leading-snug mb-2    flex-1">
                                        <AnimatedTitle title={news.title} />
                                    </h4>

                                    {/* Footer Info */}
                                    <div className="flex items-center text-slate-500 text-xs mt-2 pt-3 border-t border-slate-100">
                                        <span className="flex items-center mr-4">
                                            <User className="w-3 h-3 mr-1" /> {news.author}
                                        </span>
                                        <span className="flex items-center">
                                            <Calendar className="w-3 h-3 mr-1" /> {news.date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Button (Optional) */}
                    {otherNews.length > 0 && (
                        <div className="mt-8 text-right">
                            <Link href="/semua-berita" className="inline-flex items-center text-sm font-bold text-green-900 hover:underline">
                                Lihat Semua Berita <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}