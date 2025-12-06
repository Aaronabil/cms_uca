import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout'
import { Tag } from 'lucide-react'
import AnimatedTitle from '@/Components/Underline'
import AnimatedSection from '@/Components/AnimatedSection'

// --- Types ---
interface Article {
    id: number;
    title: string;
    slug: string;
    author: string;
    date: string;
    category: string;
    content: string;
    image: string | null;
}

interface RelatedArticle {
    id: number;
    title: string;
    slug: string;
    date: string;
    image: string | null;
    category: string;
}

interface NewsPageProps {
    article: Article;
    relatedArticles: RelatedArticle[];
}

// --- Components ---

export default function NewsPage({ article, relatedArticles }: NewsPageProps) {
    if (!article) return null;

    const getImage = (url: string | null) => {
        return url || "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop";
    }

    return (
        <GuestLayout>
            <Head title={article.title} />
            <div className="min-h-screen mt-20 bg-white font-sans text-slate-900">

                {/* 1. HEADER SECTION */}
                <header className="pt-12 pb-6 px-4 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto">
                        {/* Title */}
                        <h1 className="text-5xl md:text-6xl font-bold text-center text-slate-900 mb-10 tracking-tight">
                            Berita Kampus
                        </h1>
                    </div>
                </header>

                {/* 2. HERO SECTION (The Swimmer Image) */}
                <section className="w-full max-w-7xl mx-auto mt-8 md:mt-1 px-4">
                    <div className="relative w-full">
                        {/* Image Container */}
                        <div className="w-full h-[400px] md:h-[600px] overflow-hidden bg-slate-100">
                            <img
                                src={getImage(article.image)}
                                alt={article.title}
                                className="w-full h-full object-cover object-center opacity-80"
                            />
                            <div className="absolute inset-0 bg-white/20 lg:bg-black/20"></div>
                        </div>

                        {/* THE RED BOX OVERLAY */}
                        <div className="relative md:absolute -bottom-10 left-0 right-0 w-full md:w-[70%] lg:w-[60%] bg-primary p-6 md:p-10 lg:p-12 shadow-lg">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                {article.title}
                            </h2>
                        </div>
                    </div>
                </section>

                {/* 3. ARTICLE CONTENT SECTION */}
                <section className="max-w-4xl mx-auto px-4 py-12 md:py-16 mt-12">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16">

                        {/* Sidebar / Meta Data */}
                        <div className="md:w-1/4 flex flex-col gap-2 text-xs md:text-sm font-bold uppercase tracking-wide text-slate-500 pt-2">
                            <div className="text-primary flex flex-col-2 items-center">
                                <Tag
                                    className="w-5 h-5 mr-1"
                                />
                                {article.category}
                            </div>
                            <div className="text-slate-900 mt-2">{article.author}</div>
                            <div>{article.date}</div>
                        </div>

                        {/* Main Text */}
                        <div className="md:w-3/4">
                            {/* Content Paragraphs */}
                            {/* Menggunakan dangerouslySetInnerHTML karena konten dari DB berupa HTML */}
                            <div 
                                className="text-lg text-slate-800 leading-loose space-y-6 prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />
                        </div>
                    </div>
                </section>
                <section className="max-w-4xl mx-auto px-4 py-12 border-t border-slate-200">
                    <h3 className="text-2xl font-bold mb-8">Komentar (0)</h3>

                    {/* Comment List Placeholder */}
                    <div className="space-y-8 mb-12 text-slate-500 italic">
                        Belum ada komentar. Jadilah yang pertama berkomentar!
                    </div>

                    {/* Comment Form */}
                    <div className="bg-slate-50 p-6 md:p-8 rounded-2xl">
                        <h4 className="text-xl font-bold mb-6">Tinggalkan Komentar</h4>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-slate-700">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="Nama Anda"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="email@contoh.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="comment" className="text-sm font-medium text-slate-700">Komentar</label>
                                <textarea
                                    id="comment"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                    placeholder="Tulis komentar Anda di sini..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors"
                            >
                                Kirim Komentar
                            </button>
                        </form>
                    </div>
                </section>

                {/* 4. MORE NEWS GRID */}
                <section className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-200">
                    <h3 className="text-2xl font-bold mb-8">Lebih banyak berita</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedArticles.map((item) => (
                            <Link key={item.id} href={`/news/${item.slug}`} className="group cursor-pointer">
                                <div className="aspect-video bg-slate-200 mb-4 overflow-hidden">
                                    <img
                                        src={getImage(item.image)}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="text-xs font-bold text-primary uppercase mb-2">{item.category}</div>
                                <div className="text-xs font-bold uppercase mb-2">{item.date}</div>
                                <h4 className="text-xl font-bold leading-tight group-hover:underline decoration-primary decoration-2 underline-offset-4">
                                    <AnimatedTitle title={item.title} />
                                </h4>
                            </Link>
                        ))}
                    </div>
                </section>
            </div >
        </GuestLayout >
    );
}