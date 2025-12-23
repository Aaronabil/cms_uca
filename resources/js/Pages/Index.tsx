import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Button } from '@/Components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/Components/ui/carousel';
import { Card, CardContent, CardHeader } from '@/Components/ui/card'
import { Building2, GraduationCap, CircleQuestionMark, ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight, Star, Sparkles } from 'lucide-react'
import React, { ReactNode } from 'react'
import FAQSeputarUCA from '@/Components/FAQ';
import NewsSection from '@/Components/News';
import AnimatedSection from '@/Components/AnimatedSection';
import { NumberTicker } from '@/Components/ui/number-ticker';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import WarpSection from '@/Components/Warp';

interface HomeProps extends PageProps {
    sambutanRektor: {
        title: string;
        content: string;
    } | null;
    faculties: Array<{
        id: number;
        name: string;
        image_url: string;
        slug: string;
        study_programs: Array<{ name: string }>;
    }>;
    articles: Array<{
        id: number;
        title: string;
        slug: string;
        category: string;
        author: string;
        date: string;
        image: string | null;
        comments: number;
    }>;
    faqs: Array<{
        question: string;
        answer: string;
    }>;
}

export default function Index({ sambutanRektor, faculties, articles, faqs }: HomeProps) {
    const { site_settings } = usePage<HomeProps>().props;
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    const generateStudyProgramDescription = (facultyName: string, studyPrograms: Array<{ name: string }>) => {
        const count = studyPrograms.length;
        if (count === 0) return `Saat ini belum ada program studi di ${facultyName}.`;
        
        const programNames = studyPrograms.map(p => p.name).join(', ');
        return `Saat Ini, Terdapat ${count} Program Studi Di ${facultyName} Yaitu, ${programNames}.`;
    };

    return (
        <>
            <Head title={site_settings.site_name || "Universitas Cendekia Abditama"} />
            <GuestLayout faculties={faculties}>
                <main className="[--color-primary:var(--color-indigo-500)]">
                    <AnimatedSection delay={200}>
                        <section ref={containerRef} className="relative w-full h-screen">
                            <div className="relative w-full h-full overflow-hidden">
                                {/* Background Image */}
                                <motion.img
                                    style={{ y, scale: 1.1, translateY: "30px" }}
                                    src="/ucanew2-min.jpg"
                                    alt="UCA Campus"
                                    className="absolute inset-0 w-full h-full object-cover object-[center_-60px]"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-primary/30" />

                                {/* Watermark Text */}

                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
                                    <AnimatedSection delay={400}>
                                        {/* Pill Badge */}
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm mb-8 hover:bg-white/20 transition-colors cursor-pointer group">
                                            <span className="font-medium">Penerimaan Mahasiswa Baru 2025</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                        </div>

                                        {/* Heading */}
                                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 max-w-5xl text-balance drop-shadow-sm">
                                            {site_settings.site_name || "Universitas Cendekia Abditama"}
                                        </h1>

                                        {/* Subtext */}
                                        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 text-balance drop-shadow-sm">
                                            {site_settings.site_description || "Mempersiapkan mahasiswa untuk memberikan kontribusi yang berarti pada masyarakat, bangsa dan dunia."}
                                        </p>

                                        {/* Buttons */}
                                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                            <Button size="lg" className="bg-white text-primary hover:bg-primary hover:text-white font-semibold rounded-full px-8 h-12 text-base">
                                                Daftar Sekarang
                                            </Button>
                                            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white font-semibold rounded-full px-8 h-12 text-base">
                                                Tentang Kami
                                            </Button>
                                        </div>
                                    </AnimatedSection>
                                </div>
                            </div>
                        </section>
                    </AnimatedSection>
                    <section className="bg-primary py-20 relative overflow-hidden">
                        {/* Decorative Background Elements */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                            <div className="absolute top-1/2 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                            <Star className="absolute top-12 left-12 text-white/10 w-8 h-8 animate-pulse" />
                            <Star className="absolute bottom-20 right-10 text-white/5 w-12 h-12 rotate-12" />
                            <div className="absolute top-20 right-1/4 w-2 h-2 bg-white/20 rounded-full" />
                            <div className="absolute bottom-10 left-1/3 w-3 h-3 bg-white/10 rounded-full" />
                        </div>

                        <div className="mx-auto max-w-5xl px-6 relative z-10">
                            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                                <div>
                                    <AnimatedSection delay={400}>
                                        <p className="text-white">Sambutan Rektor</p>
                                    </AnimatedSection>
                                    <AnimatedSection delay={500}>
                                        {sambutanRektor && (
                                            <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
                                                {sambutanRektor.title}
                                            </h2>
                                        )}
                                        {!sambutanRektor && (
                                            <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
                                                Dr. Muhammad Subali, S.Si., M.T..
                                            </h2>
                                        )}
                                    </AnimatedSection>
                                    <AnimatedSection delay={600}>
                                        {sambutanRektor && (
                                            <p className="mt-6 text-white" dangerouslySetInnerHTML={{ __html: sambutanRektor.content }}>
                                            </p>
                                        )}
                                        {!sambutanRektor && (
                                            <p className="mt-6 text-white">
                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore sequi iure aliquam exercitationem, inventore debitis iusto, ipsa a ipsum id quasi? Impedit itaque officia beatae consequatur quisquam, nobis velit optio.
                                            </p>
                                        )}
                                        <Link href="/sambutan-rektor">
                                            <Button className="mt-8 bg-white text-primary hover:bg-secondary hover:text-white">
                                                Sambutan Rektor &rarr;
                                            </Button>
                                        </Link>
                                    </AnimatedSection>
                                </div>
                                <AnimatedSection delay={800}>
                                    <div className="relative mx-auto w-full max-w-sm pt-4 pr-4">
                                        {/* Offset Border */}
                                        <div className="absolute top-0 right-0 bottom-4 left-4 rounded-[2.5rem] border-2 border-secondary-foreground" />

                                        {/* Image Container */}
                                        <div className="relative rounded-[2.5rem] border-[6px] border-secondary bg-secondary overflow-hidden shadow-2xl">
                                            <img
                                                src="/rektor.jpg"
                                                alt="Rektor"
                                                className="w-full h-[400px] object-cover scale-110  object-[center_20%]"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary to-transparent" />
                                        </div>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </div>
                    </section>

                    <section className=" py-16 md:py-32 dark:bg-transparent bg-gray-50">
                        <div className="@container mx-auto max-w-5xl px-6">
                            <AnimatedSection delay={200}>
                                <div className="text-center">
                                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl text-primary">Akademik</h2>
                                    <p className="mt-4">Mempersiapkan mahasiswa untuk memberikan kontribusi yang berarti pada masyarakat, bangsa dan dunia</p>
                                </div>
                            </AnimatedSection>
                            <AnimatedSection delay={400}>
                                <Card className="mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16 md:max-w-full md:grid-cols-3 md:divide-x md:divide-y-0 gap-8">
                                    <div className="group shadow-zinc-950/5 ">
                                        <CardHeader className="pb-3">
                                            <CardDecorator>
                                                <CircleQuestionMark
                                                    className="size-6 text-primary"
                                                    aria-hidden
                                                />
                                            </CardDecorator>
                                            <h3 className="mt-6 font-medium text-primary">Mengapa UCA</h3>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ipsum dolore inventore molestias natus fugiat cumque illum consequatur quisquam. Expedita, itaque corrupti voluptates repellendus quae totam nesciunt architecto aperiam quia!</p>
                                        </CardContent>
                                    </div>
                                    <div className="group shadow-zinc-950/5">
                                        <CardHeader className="pb-3">
                                            <CardDecorator>
                                                <Building2
                                                    className="size-6 text-primary"
                                                    aria-hidden
                                                />
                                            </CardDecorator>
                                            <h3 className="mt-6 font-medium text-primary">Tentang Fakultas</h3>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="mt-3 text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis placeat culpa atque alias ratione voluptatibus rem natus tenetur animi sapiente! Dolorem quasi maxime officiis enim magni eveniet necessitatibus eligendi. Tempore.</p>
                                        </CardContent>
                                    </div>
                                    <div className="group shadow-zinc-950/5">
                                        <CardHeader className="pb-3">
                                            <CardDecorator>
                                                <GraduationCap
                                                    className="size-6 text-primary"
                                                    aria-hidden
                                                />
                                            </CardDecorator>
                                            <h3 className="mt-6 font-medium text-primary">Berkuliah di UCA</h3>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="mt-3 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque distinctio tempore, similique expedita cupiditate ab laudantium neque sit iste nihil! Suscipit, vitae. Aspernatur laborum optio dolores. Deserunt incidunt aspernatur quis.</p>
                                        </CardContent>
                                    </div>
                                </Card>
                            </AnimatedSection>
                        </div>
                    </section>
                    <section>
                        <div className="bg-primary py-24 relative overflow-hidden">
                            {/* Decorative Background Elements */}
                            <div className="absolute inset-0 pointer-events-none">
                                <Sparkles className="absolute top-10 right-10 text-white/10 w-16 h-16" />
                                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                <div className="absolute -bottom-1/2 -left-20 w-[500px] h-[500px] border border-white/10 rounded-full" />
                                <div className="absolute top-20 left-10 grid grid-cols-3 gap-2 opacity-10">
                                    {[...Array(9)].map((_, i) => (
                                        <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
                                    ))}
                                </div>
                            </div>

                            <div className="mx-auto max-w-5xl px-6 relative z-10">
                                <AnimatedSection delay={200}>
                                    <div>
                                        <h2 className="text-4xl text-white font-semibold lg:text-5xl">Fakta Universitas Cendekia Abditama</h2>
                                        <p className="text-secondary-foreground mt-4 text-balance text-lg">Our platform continues to grow with developers and businesses using our tools to create innovative solutions and enhance productivity.</p>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={400}>
                                    <div className="mt-8 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-4">
                                        <div>
                                            <NumberTicker value={3000} className="text-white text-4xl font-bold" /><span className="text-white text-4xl font-bold">+</span>
                                            <p className="text-secondary-foreground">Mahasiswa</p>
                                        </div>
                                        <div>
                                            <NumberTicker value={200} className="text-white text-4xl font-bold" /><span className="text-white text-4xl font-bold">+</span>
                                            <p className="text-secondary-foreground">Dosen</p>
                                        </div>
                                        <div>
                                            <NumberTicker value={50} className="text-white text-4xl font-bold" /><span className="text-white text-4xl font-bold">+</span>
                                            <p className="text-secondary-foreground">Program Studi</p>
                                        </div>
                                        <div>
                                            <NumberTicker value={5000} className="text-white text-4xl font-bold" /><span className="text-white text-4xl font-bold">+</span>
                                            <p className="text-secondary-foreground">Alumni</p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </div>
                    </section>

                    {/* Faculty Section */}
                    <section className="bg-secondary-foreground py-20 text-white">
                        <div className="mx-auto max-w-6xl px-6">
                            {/* Header */}
                            <div className="mb-16">
                                <AnimatedSection delay={200}>
                                    <p className="text-sm font-medium tracking-wider text-primary uppercase mb-4">Fakultas</p>
                                </AnimatedSection>
                                <AnimatedSection delay={250}>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight max-w-4xl">
                                        FAKULTAS KAMI YANG TERAMPIL MEMBANTU MAHASISWA DALAM BANYAK DISIPLIN
                                    </h2>
                                </AnimatedSection>
                            </div>
                            <AnimatedSection delay={200}>
                                {/* Grid Layout */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {faculties.map((faculty, index) => (
                                        <React.Fragment key={faculty.id}>
                                            {/* Pola Genap: Gambar Kiri, Teks Kanan (Index 0, 2, dst) */}
                                            {index % 2 === 0 ? (
                                                <>
                                                    <div className="relative overflow-hidden rounded-3xl h-[400px]">
                                                        <img
                                                            src={faculty.image_url || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1740"}
                                                            alt={faculty.name}
                                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                                        />
                                                    </div>
                                                    <div className="bg-primary rounded-3xl p-8 md:p-12 flex flex-col justify-between h-[400px] group hover:bg-green-900 transition-colors">
                                                        <div>
                                                            <span className="inline-block bg-white text-[#153d3d] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                                                                Fakultas
                                                            </span>
                                                            <h3 className="text-3xl font-medium leading-snug mb-4">
                                                                {faculty.name}
                                                            </h3>
                                                        </div>
                                                        <p className="text-gray-300 text-sm leading-relaxed">
                                                            {generateStudyProgramDescription(faculty.name, faculty.study_programs)}
                                                        </p>
                                                    </div>
                                                </>
                                            ) : (
                                                /* Pola Ganjil: Teks Kiri, Gambar Kanan (Index 1, 3, dst) */
                                                <>
                                                    <div className="bg-primary rounded-3xl p-8 md:p-12 flex flex-col justify-between h-[400px] group hover:bg-green-900 transition-colors">
                                                        <div>
                                                            <span className="inline-block bg-white text-[#153d3d] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                                                                Fakultas
                                                            </span>
                                                            <h3 className="text-3xl font-medium leading-snug mb-4">
                                                                {faculty.name}
                                                            </h3>
                                                        </div>
                                                        <p className="text-gray-300 text-sm leading-relaxed">
                                                            {generateStudyProgramDescription(faculty.name, faculty.study_programs)}
                                                        </p>
                                                    </div>
                                                    <div className="relative overflow-hidden rounded-3xl h-[400px]">
                                                        <img
                                                            src={faculty.image_url || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1686"}
                                                            alt={faculty.name}
                                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </AnimatedSection>
                        </div>
                    </section>
                    <AnimatedSection delay={200}>
                        <NewsSection articles={articles} />
                    </AnimatedSection>
                    <WarpSection />
                    <AnimatedSection delay={200}>
                        <FAQSeputarUCA faqs={faqs} />
                    </AnimatedSection>
                </main>
            </GuestLayout >
        </>
    );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
        />
        <div
            aria-hidden
            className="bg-radial to-background absolute inset-0 from-transparent to-75%"
        />
        <div className="dark:bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t bg-white">{children}</div>
    </div>
)
