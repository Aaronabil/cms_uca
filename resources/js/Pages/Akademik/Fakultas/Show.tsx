import GuestLayout from '@/Layouts/GuestLayout'
import { Link, Head } from '@inertiajs/react'
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Target, BookOpen, CheckCircle2 } from 'lucide-react';

interface StudyProgram {
    id: number;
    name: string;
    slug: string;
}

interface Faculty {
    id: number;
    name: string;
    slug: string;
    image_url: string;
    color: string;
    description: string;
    visi: string;
    misi: string[];
    study_programs: StudyProgram[];
}

interface Props {
    faculty: Faculty;
}

export default function Show({ faculty }: Props) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    // Color mapping for dynamic styles
    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string, text: string, accent: string, border: string, lightBg: string, overlay: string }> = {
            yellow: { // FEBI
                bg: 'bg-yellow-400',
                text: 'text-yellow-400',
                accent: 'bg-yellow-300',
                border: 'border-yellow-400',
                lightBg: 'bg-yellow-50',
                overlay: 'from-yellow-300/60'
            },
            emerald: { // FIK
                bg: 'bg-emerald-400',
                text: 'text-emerald-600',
                accent: 'bg-emerald-300',
                border: 'border-emerald-400',
                lightBg: 'bg-emerald-50',
                overlay: 'from-emerald-300/60'
            },
            green: { // Fallback for FIK if db has 'green'
                bg: 'bg-emerald-400',
                text: 'text-emerald-600',
                accent: 'bg-emerald-300',
                border: 'border-emerald-400',
                lightBg: 'bg-emerald-50',
                overlay: 'from-emerald-300/60'
            },
            red: { // FTIK
                bg: 'bg-red-800',
                text: 'text-red-700',
                accent: 'bg-red-700',
                border: 'border-red-800',
                lightBg: 'bg-red-50',
                overlay: 'from-red-800/60'
            },
            orange: { // FT
                bg: 'bg-orange-600',
                text: 'text-orange-600',
                accent: 'bg-orange-500',
                border: 'border-orange-600',
                lightBg: 'bg-orange-50',
                overlay: 'from-orange-600/80'
            },
        };
        return colors[color] || colors.yellow; // Default to yellow
    };

    const theme = getColorClasses(faculty.color || 'yellow');

    return (
        <GuestLayout>
            <Head title={faculty.name} />
            <div ref={containerRef} className={`relative h-screen w-full overflow-hidden ${theme.bg} text-white`}>
                {/* Background Image */}
                <motion.img
                    style={{ y, scale: 1.1, translateY: "30px" }}
                    src="/ucanew.jpg"
                    alt={faculty.name}
                    className="absolute inset-0 w-full h-full object-cover object-[center_-60px]"
                />

                {/* Overlay */}
                <div className={`absolute inset-0 z-0 bg-gradient-to-t ${theme.overlay} to-transparent`} />
                {/* Fallback overlay if dynamic class fails */}
                <div className="absolute inset-0 z-0 bg-black/30" />


                {/* Content Container */}
                <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12 lg:p-16">
                    {/* Top Navigation / Breadcrumbs */}
                    <div className="flex w-full items-start justify-between ">
                    </div>

                    {/* Main Title */}
                    <div className="mb-12 max-w-4xl">
                        <h1 className="flex flex-col text-6xl font-bold leading-tight tracking-tighter md:text-8xl lg:text-9xl">
                            <span>Fakultas</span>
                            <span className="font-light">{faculty.name}</span>
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
                            <h2 className={`text-3xl font-bold tracking-tight ${theme.text} sm:text-4xl mb-6`}>
                                Tentang Fakultas
                            </h2>
                            <div className="text-lg leading-8 text-gray-600 mb-6 whitespace-pre-line">
                                {faculty.description}
                            </div>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={faculty.image_url || "/images/febi_overview.png"}
                                alt={`Suasana Belajar di ${faculty.name}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <section className="py-20 bg-slate-50 mt-12 rounded-3xl">
                        <div className="max-w-7xl mx-auto px-6 lg:px-8">
                            <div className="grid md:grid-cols-2 gap-12">
                                {/* Visi */}
                                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                                            <Target className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900">Visi</h2>
                                    </div>
                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {faculty.visi}
                                    </p>
                                </div>

                                {/* Misi */}
                                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
                                            <BookOpen className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900">Misi</h2>
                                    </div>
                                    <ul className="space-y-4">
                                        {faculty.misi && faculty.misi.map((item, index) => (
                                            <li key={index} className="flex items-start space-x-3">
                                                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-lg text-slate-600">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            {/* Academic Programs Section */}
            <section className={`${theme.bg} py-24 text-white`}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-16">
                        <h2 className="text-5xl font-bold tracking-tight mb-6">Academic Programs</h2>
                        <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
                            Program studi kami dirancang untuk memberikan landasan akademis yang kuat sekaligus keterampilan praktis yang relevan dengan kebutuhan industri modern.
                        </p>
                    </div>

                    <div className="flex gap-8 mb-12 text-2xl font-light text-white/80">
                        <span className="text-white">Sarjana</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {faculty.study_programs && faculty.study_programs.map((program, index) => (
                            <Link key={program.id} href={`/prodi/${program.slug}`}>
                                <div className={`group relative h-60 rounded-3xl border border-white/20 ${theme.accent} p-8 transition-colors hover:border-white/90 flex flex-col justify-between`}>
                                    <div className="flex justify-between items-start">
                                        <div className="rounded-full border border-white px-4 py-1 text-sm">
                                            Sarjana
                                        </div>
                                        <div className="rounded-full border border-white p-2 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-medium leading-tight">
                                        {program.name}
                                    </h3>
                                </div>
                            </Link>
                        ))}
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
        </GuestLayout>
    )
}
