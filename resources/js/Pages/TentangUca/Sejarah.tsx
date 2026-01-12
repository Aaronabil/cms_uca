import GuestLayout from '@/Layouts/GuestLayout';
import AnimatedSection from '@/Components/AnimatedSection';
import { motion } from 'framer-motion';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

interface SejarahProps extends PageProps {
    page: {
        title: string;
        content: string;
    };
}

export default function Sejarah({ page }: SejarahProps) {
    return (
        <GuestLayout>
            <Head title="Sejarah UCA" />

            <div className="bg-white min-h-screen">
                {/* Hero Section with Title & Image */}
                <section className="relative pt-32 pb-12 md:pt-40 md:pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="flex flex-col items-center text-center mb-16">
                        <AnimatedSection>
                            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">
                                Tentang Kami
                            </span>
                            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6">
                                Sejarah UCA
                            </h1>
                            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                                Perjalanan panjang Universitas Cendekia Abditama dalam mencerdaskan kehidupan bangsa dan membangun peradaban.
                            </p>
                        </AnimatedSection>
                    </div>

                    <AnimatedSection delay={200}>
                        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-3xl shadow-2xl">
                            <motion.img
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                src="/ucanew.jpg"
                                alt="Kampus UCA"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>
                    </AnimatedSection>
                </section>

                {/* Content Section */}
                <section className="max-w-3xl mx-auto px-6 pb-24">
                    <AnimatedSection delay={400}>
                        <div 
                            className="prose prose-lg prose-slate prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-loose text-justify 
                            [&>p:first-of-type]:first-letter:text-7xl [&>p:first-of-type]:first-letter:font-bold [&>p:first-of-type]:first-letter:text-primary [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:float-left
                            prose-blockquote:not-italic prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:text-xl prose-blockquote:text-slate-700 prose-blockquote:bg-slate-50 prose-blockquote:rounded-r-lg"
                            dangerouslySetInnerHTML={{ __html: page.content }}>
                        </div>
                    </AnimatedSection>
                </section>
            </div>
        </GuestLayout>
    );
}