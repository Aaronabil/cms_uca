import GuestLayout from '@/Layouts/GuestLayout'
import { Link } from '@inertiajs/react'
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import { Eye, Sparkles, ArrowRight } from 'lucide-react';

const loading = false;
const data = {
    mission: [
        "Menyelenggarakan pendidikan tinggi berkualitas yang berorientasi pada pengembangan ilmu pengetahuan dan teknologi.",
        "Melaksanakan penelitian inovatif yang berkontribusi pada pemecahan masalah di tingkat nasional maupun global.",
        "Mengembangkan pengabdian kepada masyarakat yang relevan, berkelanjutan, dan berdampak positif.",
        "Mewujudkan tata kelola perguruan tinggi yang profesional, transparan, dan berlandaskan nilai-nilai Islam."
    ]
};

export default function FakultasIlmuKeperawatan() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    return (
        <GuestLayout>
            <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-green-800 text-white">
                {/* Background Image */}
                <motion.img
                    style={{ y, scale: 1.1, translateY: "30px" }}
                    src="/ucanew.jpg"
                    alt="UCA Campus"
                    className="absolute inset-0 w-full h-full object-cover object-[center_-60px]"
                />

                {/* Overlay for better text readability if needed, though image is green */}
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-emerald-300/60 to-transparent" />

                {/* Content Container */}
                <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12 lg:p-16">
                    {/* Top Navigation / Breadcrumbs */}
                    <div className="flex w-full items-start justify-between ">
                        {/* <div className="text-lg font-medium tracking-wide">UCA</div>
                        <div className="hidden space-x-6 text-sm font-light tracking-wider md:flex opacity-80">
                            <Link href="#" className="hover:opacity-100">/ Fakultas</Link>
                            <Link href="#" className="hover:opacity-100">/ Program Studi</Link>
                            <Link href="#" className="hover:opacity-100">/ Universitas</Link>
                            <Link href="#" className="hover:opacity-100">/ Layanan</Link>
                        </div> */}
                    </div>

                    {/* Main Title */}
                    <div className="mb-12 max-w-4xl">
                        <h1 className="flex flex-col text-6xl font-bold leading-tight tracking-tighter md:text-8xl lg:text-9xl">
                            <span>Fakultas</span>
                            <span className="font-light">Ilmu Keperawatan</span>
                        </h1>
                    </div>

                    {/* Decorative Lines */}
                    <div className="absolute right-16 top-1/4 h-1/2 w-px bg-white/90 hidden lg:block"></div>
                    <div className="absolute bottom-16 right-16 h-px w-1/3 bg-white/90 hidden lg:block"></div>
                </div>
            </div>

            {/* Overview Section */}
            <section className="bg-white py-24 text-gray-900">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-emerald-300/80 sm:text-4xl mb-6">
                                Tentang Fakultas
                            </h2>
                            <p className="text-lg leading-8 text-gray-600 mb-6">
                                Fakultas Ekonomi dan Bisnis Islam (FEBI) berdedikasi untuk mencetak pemimpin masa depan yang tidak hanya unggul dalam ilmu ekonomi dan bisnis, tetapi juga menjunjung tinggi nilai-nilai keislaman.
                            </p>
                            <p className="text-lg leading-8 text-gray-600">
                                Dengan kurikulum yang terintegrasi dan fasilitas modern, kami mempersiapkan mahasiswa untuk menghadapi tantangan global dengan integritas dan inovasi.
                            </p>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src="/images/febi_overview.png"
                                alt="Suasana Belajar di FEBI"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="mt-10 gap-8 lg:gap-12">
                        {/* Vision Card */}
                        <div id="vision" className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-t-8 border-primary overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Eye className="w-32 h-32 text-primary" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="bg-green-100 p-3 rounded-xl">
                                        <Eye className="w-8 h-8 text-primary" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900">Visi</h2>
                                </div>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    "Menjadi universitas terkemuka di tingkat nasional pada tahun 2030 dalam pengembangan ilmu pengetahuan dan teknologi berdasarkan nilai-nilai Islam"
                                </p>
                            </div>
                        </div>
                        <section id="mission" className="mt-10">
                            <div className="flex items-center justify-between mb-8 px-2">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-orange-100 rounded-lg shadow-sm">
                                        <Sparkles className="w-6 h-6 text-secondary" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900">Misi</h2>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {loading ? (
                                    Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                                ) : (
                                    data.mission.map((item, index) => (
                                        <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-secondary-foreground flex items-start space-x-4">
                                            <span className="text-4xl font-black text-secondary leading-none">{index + 1}</span>
                                            <p className="text-slate-700 text-lg leading-relaxed font-medium">{item}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </section>

            {/* Academic Programs Section */}
            <section className="bg-emerald-400 py-24 text-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-16">
                        <h2 className="text-5xl font-bold tracking-tight mb-6">Academic Programs</h2>
                        <p className="text-xl text-primary max-w-2xl leading-relaxed">
                            Program studi kami dirancang untuk memberikan landasan akademis yang kuat sekaligus keterampilan praktis yang relevan dengan kebutuhan industri modern.
                        </p>
                    </div>

                    <div className="flex gap-8 mb-12 text-2xl font-light text-gray-500">
                        <span className="text-white">Diploma dan Sarjana</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card Style A - Black */}
                        <Link href="/akademik/fakultas/febi/sarjana">
                            <div className="group relative h-60 rounded-3xl border border-white/20 bg-emerald-300 p-8 transition-colors hover:border-white/90 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="rounded-full border border-white px-4 py-1 text-sm">
                                        Diploma dan Sarjana
                                    </div>
                                    <div className="rounded-full border border-white p-2 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                                <h3 className="text-3xl font-medium leading-tight">
                                    Keperawatan
                                </h3>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="bg-background py-16">
                <div className="mx-auto max-w-5xl px-6">
                    <h1 className="text-center text-4xl font-bold tracking-tight">Kerja Sama</h1>
                    <div className="mx-auto mt-20 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
                        <img className="h-5 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/nvidia.svg" alt="Nvidia Logo" height="20" width="auto" />
                        <img className="h-4 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/column.svg" alt="Column Logo" height="16" width="auto" />
                        <img className="h-4 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/github.svg" alt="GitHub Logo" height="16" width="auto" />
                        <img className="h-5 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/nike.svg" alt="Nike Logo" height="20" width="auto" />
                        <img className="h-4 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/laravel.svg" alt="Laravel Logo" height="16" width="auto" />
                        <img className="h-7 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/lilly.svg" alt="Lilly Logo" height="28" width="auto" />
                        <img className="h-5 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg" alt="Lemon Squeezy Logo" height="20" width="auto" />
                        <img className="h-6 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/openai.svg" alt="OpenAI Logo" height="24" width="auto" />
                        <img className="h-4 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/tailwindcss.svg" alt="Tailwind CSS Logo" height="16" width="auto" />
                        <img className="h-5 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/vercel.svg" alt="Vercel Logo" height="20" width="auto" />
                        <img className="h-5 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/zapier.svg" alt="Zapier Logo" height="20" width="auto" />
                    </div>
                </div>
            </section>
            <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
                {/* Background Image */}
                <motion.img
                    style={{ y, scale: 1.1, translateY: "30px" }}
                    src="/ucanew.jpg"
                    alt="UCA Campus"
                    className="absolute inset-0 w-full h-full object-cover object-[center_-60px]"
                />

                {/* Overlay for better text readability if needed, though image is green */}
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-emerald-300/60 to-transparent" />
            </div>
        </GuestLayout>
    )
}

const SkeletonCard: React.FC = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-slate-200 animate-pulse flex items-start space-x-4">
        <div className="h-8 w-8 bg-slate-200 rounded"></div>
        <div className="space-y-2 w-full">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        </div>
    </div>
);
