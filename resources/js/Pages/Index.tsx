import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
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
import { Building2, GraduationCap, CircleQuestionMark, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { ReactNode } from 'react'
import FAQSeputarUCA from '@/Components/FAQ';
import NewsSection from '@/Components/News';
import AnimatedSection from '@/Components/AnimatedSection';
import { NumberTicker } from '@/Components/ui/number-ticker';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function Index() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <>
            <Head title="Universitas Cendekia Abditama" />
            <GuestLayout>
                <main className="[--color-primary:var(--color-indigo-500)]">
                    <AnimatedSection delay={200}>
                        <section ref={containerRef} className="relative w-full h-screen px-4 py-4 md:px-6 md:py-6 mt-12">
                            <div className="relative w-full h-full overflow-hidden rounded-[2rem] md:rounded-[3rem]">
                                {/* Background Image */}
                                <motion.img
                                    style={{ y, scale: 1.1 }}
                                    src="/uca.jpg"
                                    alt="UCA Campus"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/20" />

                                {/* Watermark Text */}

                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <AnimatedSection delay={400}>
                                        <h1 className="text-[20vw] font-bold text-green-900 opacity-70 select-none tracking-tighter">
                                            UCA
                                        </h1>
                                    </AnimatedSection>
                                </div>


                                {/* Bottom Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
                                    <AnimatedSection delay={600}>
                                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                        {/* Year */}
                                        <div className="text-lg md:text-xl font-medium">
                                            2025
                                        </div>

                                        {/* Description */}
                                        <div className="max-w-md">
                                            <h2 className="text-xl md:text-2xl font-semibold mb-2">
                                                Universitas Cendekia Abditama
                                            </h2>
                                            <p className="text-white/80 text-sm md:text-base">
                                                Check our selection of studentship accepting applications now
                                            </p>
                                        </div>

                                        {/* Navigation Buttons */}
                                        <div className="flex gap-3">
                                            <button className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                                                <ChevronLeft className="w-6 h-6 text-white" />
                                            </button>
                                            <button className="p-3 rounded-full bg-white text-black hover:bg-gray-100 transition-colors">
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                    </AnimatedSection>
                                </div>
                            </div>
                        </section>
                    </AnimatedSection>
                    <section className="bg-green-900 py-20">
                        <div className="mx-auto max-w-5xl px-6">
                            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                                <div>
                                    <AnimatedSection delay={400}>
                                        <p className="text-white">Sambutan Rektor</p>
                                    </AnimatedSection>
                                    <AnimatedSection delay={500}>
                                        <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
                                            Dr. Muhammad Subali, S.Si., M.T..
                                        </h2>
                                    </AnimatedSection>
                                    <AnimatedSection delay={600}>
                                        <p className="mt-6 text-white">
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore sequi iure aliquam exercitationem, inventore debitis iusto, ipsa a ipsum id quasi? Impedit itaque officia beatae consequatur quisquam, nobis velit optio.
                                        </p>
                                        <Link href="/sambutan-rektor">
                                            <Button className="mt-8 bg-white text-green-900 hover:bg-orange-300 hover:text-white">
                                                Sambutan Rektor &rarr;
                                            </Button>
                                        </Link>
                                    </AnimatedSection>
                                </div>
                                <AnimatedSection delay={800}>
                                    <div>
                                        <img
                                            src="https://i1.rgstatic.net/ii/profile.image/660888327569408-1534579464650_Q512/Muhammad-Subali.jpg"
                                            alt="Rektor"
                                            className="rounded-lg"
                                            width=""
                                            height=""
                                        />
                                    </div>
                                </AnimatedSection>
                            </div>
                        </div>
                    </section>

                    <section className="bg-gradient-to-br from-green-200 to-orange-200 py-16 md:py-32 dark:bg-transparent">
                        <div className="@container mx-auto max-w-5xl px-6">
                            <AnimatedSection delay={200}>
                                <div className="text-center">
                                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl text-green-900">Akademik</h2>
                                    <p className="mt-4">Mempersiapkan mahasiswa untuk memberikan kontribusi yang berarti pada masyarakat, bangsa dan dunia</p>
                                </div>
                            </AnimatedSection>
                            <AnimatedSection delay={400}>
                                <Card className="mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16 md:max-w-full md:grid-cols-3 md:divide-x md:divide-y-0 gap-8">
                                    <div className="group shadow-zinc-950/5 ">
                                        <CardHeader className="pb-3">
                                            <CardDecorator>
                                                <CircleQuestionMark
                                                    className="size-6 text-green-900"
                                                    aria-hidden
                                                />
                                            </CardDecorator>
                                            <h3 className="mt-6 font-medium text-green-900">Mengapa UCA</h3>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ipsum dolore inventore molestias natus fugiat cumque illum consequatur quisquam. Expedita, itaque corrupti voluptates repellendus quae totam nesciunt architecto aperiam quia!</p>
                                        </CardContent>
                                    </div>
                                    <div className="group shadow-zinc-950/5">
                                        <CardHeader className="pb-3">
                                            <CardDecorator>
                                                <Building2
                                                    className="size-6 text-green-900"
                                                    aria-hidden
                                                />
                                            </CardDecorator>
                                            <h3 className="mt-6 font-medium text-green-900">Tentang Fakultas</h3>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="mt-3 text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis placeat culpa atque alias ratione voluptatibus rem natus tenetur animi sapiente! Dolorem quasi maxime officiis enim magni eveniet necessitatibus eligendi. Tempore.</p>
                                        </CardContent>
                                    </div>
                                    <div className="group shadow-zinc-950/5">
                                        <CardHeader className="pb-3">
                                            <CardDecorator>
                                                <GraduationCap
                                                    className="size-6 text-green-900"
                                                    aria-hidden
                                                />
                                            </CardDecorator>
                                            <h3 className="mt-6 font-medium text-green-900">Berkuliah di UCA</h3>
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
                        <div className="bg-green-900 py-24">
                            <div className="mx-auto max-w-5xl px-6">
                                <AnimatedSection delay={200}>
                                    <div>
                                        <h2 className="text-4xl text-white font-semibold lg:text-5xl">Fakta Universitas Cendekia Abditama</h2>
                                        <p className="text-orange-200 mt-4 text-balance text-lg">Our platform continues to grow with developers and businesses using our tools to create innovative solutions and enhance productivity.</p>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={400}>
                                    <div className="mt-8 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-4">
                                        <div>
                                            <NumberTicker value={3000} className="text-white text-4xl font-bold" /><span className="text-white text-4xl font-bold">+</span>
                                            <p className="text-orange-200">Mahasiswa</p>
                                        </div>
                                        <div>
                                            <NumberTicker value={200} className="text-white text-4xl font-bold" /><span className="text-white text-4xl font-bold">+</span>
                                            <p className="text-orange-200">Dosen</p>
                                        </div>
                                        <div>
                                            <NumberTicker value={50} className="text-white text-4xl font-bold" /><span className="text-white text-4xl font-bold">+</span>
                                            <p className="text-orange-200">Program Studi</p>
                                        </div>
                                        <div>
                                            <NumberTicker value={5000} className="text-white text-4xl font-bold" /><span className="text-white text-4xl font-bold">+</span>
                                            <p className="text-orange-200">Alumni</p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </div>
                    </section>

                    {/* Faculty Section */}
                    <section className="bg-orange-200 py-20 text-white">
                        <div className="mx-auto max-w-6xl px-6">
                            {/* Header */}
                            <div className="mb-16">
                                <AnimatedSection delay={200}>
                                    <p className="text-sm font-medium tracking-wider text-green-900 uppercase mb-4">Fakultas</p>
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
                                    {/* Item 1: Image */}
                                    <div className="relative overflow-hidden rounded-3xl h-[400px]">
                                        <img
                                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1740"
                                            alt="Students studying"
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Item 2: Text Card */}
                                    <div className="bg-green-800 rounded-3xl p-8 md:p-12 flex flex-col justify-between h-[400px] group hover:bg-green-900 transition-colors">
                                        <div>
                                            <span className="inline-block bg-white text-[#153d3d] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                                                Sarjana
                                            </span>
                                            <h3 className="text-3xl font-medium leading-snug mb-4">
                                                Fakultas Ekonomi dan Bisnis Islam
                                            </h3>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            Saat Ini, Terdapat 4 Program Studi Di Fakultas Ekonomi Dan Bisnis Islam Yaitu, Program Studi Akuntansi, Bisnis Digital, Perbankan Syariah, Dan Ekonomi Syariah.
                                        </p>
                                    </div>

                                    {/* Item 3: Text Card */}
                                    <div className="bg-green-800 rounded-3xl p-8 md:p-12 flex flex-col justify-between h-[400px] group hover:bg-green-900 transition-colors">
                                        <div>
                                            <span className="inline-block bg-white text-[#153d3d] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                                                Diploma dan Sarjana
                                            </span>
                                            <h3 className="text-3xl font-medium leading-snug mb-4">
                                                Fakultas Ilmu Keperawatan
                                            </h3>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            Saat Ini, Terdapat 1 Program Studi Di Fakultas Ilmu Keperawatan Yaitu, Program Studi Keperawatan.
                                        </p>
                                    </div>

                                    {/* Item 4: Image */}
                                    <div className="relative overflow-hidden rounded-3xl h-[400px]">
                                        <img
                                            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1686"
                                            alt="University building"
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    {/* Item 1: Image */}
                                    <div className="relative overflow-hidden rounded-3xl h-[400px]">
                                        <img
                                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1740"
                                            alt="Students studying"
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Item 2: Text Card */}
                                    <div className="bg-green-800 rounded-3xl p-8 md:p-12 flex flex-col justify-between h-[400px] group hover:bg-green-900 transition-colors">
                                        <div>
                                            <span className="inline-block bg-white text-[#153d3d] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                                                Sarjana
                                            </span>
                                            <h3 className="text-3xl font-medium leading-snug mb-4">
                                                Fakultas Tarbiyah dan Ilmu Keguruan
                                            </h3>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            Saat Ini, Terdapat 3 Program Studi Di Fakultas Tarbiyah dan Ilmu Keguruan Yaitu, Program Studi Pendidikan Agama Islam, Pendidikan Islam Anak Usia Dini, dan Manajemen Pendidikan Islam.
                                        </p>
                                    </div>

                                    {/* Item 3: Text Card */}
                                    <div className="bg-green-800 rounded-3xl p-8 md:p-12 flex flex-col justify-between h-[400px] group hover:bg-green-900 transition-colors">
                                        <div>
                                            <span className="inline-block bg-white text-[#153d3d] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                                                Sarjana
                                            </span>
                                            <h3 className="text-3xl font-medium leading-snug mb-4">
                                                Fakultas Teknik
                                            </h3>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            Saat Ini, Terdapat 2 Program Studi Di Fakultas Teknik Yaitu, Program Studi Teknik Informatika Dan Teknik Elektro.
                                        </p>
                                    </div>

                                    {/* Item 4: Image */}
                                    <div className="relative overflow-hidden rounded-3xl h-[400px]">
                                        <img
                                            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1686"
                                            alt="University building"
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </section>
                    <AnimatedSection delay={800}>
                        <NewsSection />
                    </AnimatedSection>
                    <AnimatedSection delay={1000}>
                        <FAQSeputarUCA />
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
