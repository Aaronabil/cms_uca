import React, { useState } from 'react';
import { Calendar, User, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from '@inertiajs/react'
import AnimatedTitle from './Underline';

interface NewsItem {
    id: number;
    title: string;
    category: string;
    author: string;
    date: string;
    image: string | null;
    isFeatured?: boolean;
    comments?: number;
    slug: string;
}

const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <span className={`px-2 py-1 text-xs font-semibold tracking-wide uppercase rounded-sm ${className}`}>
        {children}
    </span>
);

export default function NewsSection({ articles = [] }: { articles?: NewsItem[] }) {
    // Use all articles directly
    const filteredNews = articles;

    const featuredNews = filteredNews[0];
    const otherNews = filteredNews.slice(1, 5);

    if (!featuredNews) {
        return (
            <section className="py-16 px-4 max-w-7xl mx-auto font-sans text-slate-800 bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900">Berita Terkini</h1>
                        <p className="text-slate-500 text-lg mt-1">Informasi terkini terkait Universitas Cendekia Abditama</p>
                    </div>
                </div>
                <div className="py-20 text-center">Belum ada berita di kategori ini.</div>
            </section>
        );
    }

    const getImage = (url: string | null) => {
        return url || "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop";
    }

    return (
        <section className="py-16 px-4 max-w-7xl mx-auto font-sans text-slate-800 bg-gray-50">

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900">Berita Terkini</h1>
                    <p className="text-slate-500 text-lg mt-1">Informasi terkini terkait Universitas Cendekia Abditama</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <div className="lg:col-span-6 group cursor-pointer">
                    <Link href={`/news/${featuredNews.slug}`}>
                        <div className="relative h-[400px] lg:h-[700px] w-full overflow-hidden rounded-xl shadow-sm">
                            <img
                                src={getImage(featuredNews.image)}
                                alt={featuredNews.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />

                            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full text-white">
                                <Badge className="bg-primary text-white mb-3 inline-block">
                                    {featuredNews.category}
                                </Badge>

                                <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
                                    <AnimatedTitle title={featuredNews.title} className="text-white decoration-green-500" disableLink={true} />
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
                                        {featuredNews.comments || 0}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* RIGHT COLUMN: Grid of Smaller News (2x2) */}
                <div className="lg:col-span-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                        {otherNews.map((news) => (
                            <div key={news.id} className="flex flex-col h-full group">
                                <Link href={`/news/${news.slug}`} className="flex flex-col h-full">
                                    {/* Image Wrapper */}
                                    <div className="relative h-48 w-full overflow-hidden rounded-lg mb-4">
                                        <img
                                            src={getImage(news.image)}
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
                                        <div className="flex items-center justify-between text-xs text-primary font-semibold uppercase tracking-wider mb-2">
                                            <span>{news.category}</span>
                                            <span className="text-slate-400 font-normal flex items-center normal-case">
                                                <MessageCircle className="w-3 h-3 mr-1" /> {news.comments || 0}
                                            </span>
                                        </div>

                                        {/* Title with Animation */}
                                        <h4 className="text-lg font-bold text-slate-900 leading-snug mb-2 flex-1">
                                            <AnimatedTitle title={news.title} disableLink={true} />
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
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* View All Button (Optional) */}
                    <div className="mt-8 text-right">
                        <Link href="/semua-berita" className="inline-flex items-center text-sm font-bold text-primary hover:underline">
                            Lihat Semua Berita <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
