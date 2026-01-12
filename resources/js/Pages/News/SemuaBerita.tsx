import GuestLayout from '@/Layouts/GuestLayout';
import { Calendar, User, MessageCircle, ArrowRight } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import AnimatedTitle from '@/Components/Underline';
import React, { useState } from 'react';
import { PageProps } from '@/types';

interface ArticleItem {
    id: number;
    title: string;
    slug: string;
    category: string;
    author: string;
    date: string;
    image: string | null;
    comments?: number; // Comments is optional, still placeholder in controller
}

interface AllArticlesProps extends PageProps {
    articles: {
        data: ArticleItem[];
        links: { url: string | null; label: string; active: boolean; }[];
        current_page: number;
        last_page: number;
    };
}

const getImage = (url: string | null) => {
    return url || "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop";
}

export default function SemuaBerita({ articles: initialArticles }: AllArticlesProps) {
    const [activeCategory, setActiveCategory] = useState<string>('Semua');

    // Extract unique categories from all articles
    const uniqueCategories = ['Semua', ...new Set(initialArticles.data.map(item => item.category))];

    const filteredArticles = activeCategory === 'Semua'
        ? initialArticles.data
        : initialArticles.data.filter(item => item.category === activeCategory);

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

                {/* 2. CATEGORY FILTER */}
                <div className="max-w-7xl mx-auto px-4 mt-16 mb-8 flex flex-wrap gap-4 text-sm font-medium border-b md:border-none pb-2 md:pb-0 overflow-x-auto">
                    {uniqueCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`uppercase tracking-wider transition-colors duration-200 whitespace-nowrap ${activeCategory === cat
                                ? 'text-primary font-bold border-b-2 border-primary md:border-none'
                                : 'text-slate-400 hover:text-slate-900'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* 3. ARTICLES GRID */}
                <div className="max-w-7xl mx-auto px-4">
                    {filteredArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredArticles.map((news) => (
                                <Link key={news.id} href={`/news/${news.slug}`} className="group flex flex-col h-full bg-white rounded-xl border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300 overflow-hidden">
                                    {/* Image */}
                                    <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                                        <img
                                            src={getImage(news.image)}
                                            alt={news.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {/* Badge Kategori Floating */}
                                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur shadow-sm px-3 py-1 rounded text-xs font-bold text-slate-700 border border-slate-200/50 flex items-center gap-1.5">
                                            {news.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col p-6">
                                        <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 flex-1">
                                            <AnimatedTitle
                                                title={news.title}
                                                className="decoration-primary"
                                            />
                                        </h3>

                                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                            <span className="flex items-center hover:text-slate-800 transition-colors">
                                                <User className="w-3 h-3 mr-1.5" /> {news.author}
                                            </span>
                                            <span className="flex items-center">
                                                <Calendar className="w-3 h-3 mr-1.5" /> {news.date}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center text-slate-500 text-lg">
                            Tidak ada artikel di kategori ini.
                        </div>
                    )}

                    {/* Pagination Links */}
                    {initialArticles.links.length > 3 && ( // Only show pagination if more than "Previous", "1", "Next"
                        <div className="mt-12 flex justify-center">
                            <nav className="flex space-x-2" aria-label="Pagination">
                                {initialArticles.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'} // Use '#' for disabled links if no URL
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 leading-5 rounded-md transition duration-150 ease-in-out
                                            ${link.active
                                                ? 'bg-primary text-white border-primary'
                                                : 'bg-white text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700'
                                            }
                                            ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}
                                        `}
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                </div>

                {/* Footer Call to Action (Optional) */}
                <div className="max-w-7xl mx-auto px-4 mt-24">
                    <div className="bg-slate-900 rounded-2xl p-12 text-center text-white overflow-hidden relative">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-4">Tidak menemukan yang Anda cari?</h2>
                            <p className="text-slate-300 mb-8">Coba gunakan fitur pencarian atau lihat arsip tahunan kami.</p>
                            <div className="flex justify-center gap-4">
                                <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-bold transition-colors">
                                    Pencarian Lanjut
                                </button>
                                <button className="bg-transparent border border-slate-600 hover:bg-slate-800 text-white px-6 py-3 rounded-full font-bold transition-colors">
                                    Arsip Tahunan
                                </button>
                            </div>
                        </div>

                        {/* Decorative blob */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                            <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-primary rounded-full blur-3xl opacity-20"></div>
                            <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] bg-orange-600 rounded-full blur-3xl opacity-20"></div>
                        </div>
                    </div>
                </div>

            </div>
        </GuestLayout>
    );
}