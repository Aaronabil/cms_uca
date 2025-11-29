import GuestLayout from '@/Layouts/GuestLayout';
import AnimatedSection from '@/Components/AnimatedSection';
import { motion } from 'framer-motion';
import { Head } from '@inertiajs/react';

export default function Sejarah() {
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
                        <div className="prose prose-lg prose-slate prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-loose text-justify">
                            <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis fugit dolores, aspernatur velit sed iusto nihil, natus dicta impedit quod illo quo consectetur? Maiores dolorum qui rem. Itaque, fuga iusto?
                            </p>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio ducimus eaque natus iusto at consequatur fugit! Quia eius, voluptatibus beatae quam et voluptas provident vero, dolor consequuntur eveniet, vitae tempora? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos obcaecati sunt illo assumenda ratione officia aliquid facere nostrum recusandae id quas maxime, voluptatem ex sit delectus soluta reprehenderit dolores dolor.
                            </p>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio ducimus eaque natus iusto at consequatur fugit! Quia eius, voluptatibus beatae quam et voluptas provident vero, dolor consequuntur eveniet, vitae tempora? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos obcaecati sunt illo assumenda ratione officia aliquid facere nostrum recusandae id quas maxime, voluptatem ex sit delectus soluta reprehenderit dolores dolor.
                            </p>
                            <div className="my-12 border-l-4 border-primary pl-6 py-2 italic text-xl text-slate-700 bg-slate-50 rounded-r-lg">
                               "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                            </div>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio ducimus eaque natus iusto at consequatur fugit! Quia eius, voluptatibus beatae quam et voluptas provident vero, dolor consequuntur eveniet, vitae tempora? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos obcaecati sunt illo assumenda ratione officia aliquid facere nostrum recusandae id quas maxime, voluptatem ex sit delectus soluta reprehenderit dolores dolor.
                            </p>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio ducimus eaque natus iusto at consequatur fugit! Quia eius, voluptatibus beatae quam et voluptas provident vero, dolor consequuntur eveniet, vitae tempora? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos obcaecati sunt illo assumenda ratione officia aliquid facere nostrum recusandae id quas maxime, voluptatem ex sit delectus soluta reprehenderit dolores dolor.
                            </p>
                        </div>
                    </AnimatedSection>
                </section>
            </div>
        </GuestLayout>
    );
}