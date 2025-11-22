import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout'
import { Tag } from 'lucide-react'
import AnimatedTitle from '@/Components/Underline'
import AnimatedSection from '@/Components/AnimatedSection'

// --- Types ---
interface Article {
    title: string;
    author: string;
    date: string;
    category: string;
    lead: string;
    content: string[];
    image: string;
}

// --- Dummy Data (Sesuai gambar) ---
const MAIN_ARTICLE: Article = {
    title: "Mahasiswa Teknik Informatika Menangkan Kompetisi Hackathon Nasional 2025",
    author: "Nicholas Economides",
    date: "September 2, 2025",
    category: "Kemahasiswaan",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop",
    lead: "Nicola Hensch '26 has reaped many rewards from the sport of swimming, so he went looking for a way to reciprocate.",
    content: [
        "The rising senior on the Harvard men's swimming and diving team found the perfect outlet two years ago in reviving Project Swim, which invites children with Down's syndrome, Rett syndrome, and autism spectrum disorder to enjoy Harvard's world-class pool facilities. Hensch now acts as co-president of the volunteer organization.",
        "\"It's not just a great opportunity for the children,\" Hensch observed of the club's impact. \"It's a great opportunity for us and the volunteers.\"",
        "Hensch's volunteer work consists of coordinating pool time for local families, with Project Swim becoming a steady presence for some 100 children from Cambridge and Boston. In the pool, Project Swim provides the children both access to the pool and the opportunity to enjoy the water.",
        "About 45 volunteers provide instruction, and Hensch leans heavily on the wider Harvard swimming and diving community to help coordinate efforts."
    ]
};

const CATEGORIES = [
    "Traditions",
    "Community Features",
    "Announcements",
    "Academics & Research",
    "Beyond the Classroom",
    "Stories of Excellence"
];

// --- Components ---

export default function NewsPage() {
    return (
        <GuestLayout>
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
                                src={MAIN_ARTICLE.image}
                                alt={MAIN_ARTICLE.title}
                                className="w-full h-full object-cover object-center opacity-80"
                            />
                            <div className="absolute inset-0 bg-white/20 lg:bg-black/20"></div>
                        </div>

                        {/* THE RED BOX OVERLAY */}
                        <div className="relative md:absolute -bottom-10 left-0 right-0 w-full md:w-[70%] lg:w-[60%] bg-green-900 p-6 md:p-10 lg:p-12 shadow-lg">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                {MAIN_ARTICLE.title}
                            </h2>
                        </div>
                    </div>
                </section>

                {/* 3. ARTICLE CONTENT SECTION */}
                <section className="max-w-4xl mx-auto px-4 py-12 md:py-16 mt-12">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16">

                        {/* Sidebar / Meta Data */}
                        <div className="md:w-1/4 flex flex-col gap-2 text-xs md:text-sm font-bold uppercase tracking-wide text-slate-500 pt-2">
                            <div className="text-green-900 flex flex-col-2">
                                <Tag
                                    className="w-5 h-5 mr-1"
                                />
                                {MAIN_ARTICLE.category}
                            </div>
                            <div className="text-slate-900 mt-2">{MAIN_ARTICLE.author}</div>
                            <div>{MAIN_ARTICLE.date}</div>
                        </div>

                        {/* Main Text */}
                        <div className="md:w-3/4">
                            {/* Lead Paragraph (Red Text) */}
                            {/* <p className="text-xl md:text-2xl font-serif text-orange-400 leading-relaxed mb-8">
                                {MAIN_ARTICLE.lead}
                            </p> */}

                            {/* Content Paragraphs */}
                            <div className="text-lg text-slate-800 leading-loose space-y-6">
                                {MAIN_ARTICLE.content.map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. MORE NEWS GRID (Optional / Tambahan biar tidak sepi) */}
                <section className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-200">
                    <h3 className="text-2xl font-bold mb-8">Lebih banyak berita</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="aspect-video bg-slate-200 mb-4 overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop"
                                        alt="Thumbnail"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="text-xs font-bold text-green-900 uppercase mb-2">Academics</div>
                                <div className="text-xs font-bold uppercase mb-2">{MAIN_ARTICLE.date}</div>
                                <h4 className="text-xl font-bold leading-tight group-hover:underline decoration-green-900 decoration-2 underline-offset-4">
                                    <AnimatedTitle title={MAIN_ARTICLE.title}/>
                                </h4>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
}
