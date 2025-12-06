import { Button } from "@/Components/ui/button";
import { Target, BookOpen, CheckCircle2 } from "lucide-react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout"
import AnimatedSection from "@/Components/AnimatedSection";

const loading = false;
const data = {
    visi: "Menjadi pusat unggulan pendidikan dan penelitian di bidang informatika yang berbasis nilai-nilai Islam pada tahun 2030.",
    misi: [
        "Menyelenggarakan pendidikan tinggi berkualitas yang berorientasi pada pengembangan ilmu pengetahuan dan teknologi.",
        "Melaksanakan penelitian inovatif yang berkontribusi pada pemecahan masalah di tingkat nasional maupun global.",
        "Mengembangkan pengabdian kepada masyarakat yang relevan, berkelanjutan, dan berdampak positif.",
        "Mewujudkan tata kelola perguruan tinggi yang profesional, transparan, dan berlandaskan nilai-nilai Islam."
    ]
};

export default function VisiMisi() {
    return (
        <GuestLayout>
            <Head title="Visi dan Misi" />
            <div className="w-full bg-white py-16 mt-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
                        <AnimatedSection delay={200}>
                            <h1 className="max-w-xl text-4xl font-medium leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                                Visi dan Misi
                            </h1>
                        </AnimatedSection>
                    </div>

                    {/* Image Section */}
                    <div className="relative mt-16">
                        {/* <div className="overflow-hidden rounded-[2.5rem] bg-gray-100">
                            <img
                                src="/ucanew3.jpg"
                                className="h-[400px] w-full object-cover md:h-[500px] lg:h-[600px]"
                            />
                        </div>

                        
                        <div className="absolute -bottom-6 right-8 md:-bottom-8 md:right-12">
                            <Button
                                size="icon"
                                className="h-16 w-16 rounded-full bg-primary shadow-lg transition-transform hover:scale-105 hover:bg-secondary md:h-20 md:w-20"
                            >
                                <ArrowDown className="h-15 w-15 text-white md:h-10 md:w-10" />
                            </Button>
                        </div> */}
                    </div>
                    <section className="py-20 bg-slate-50">
                        <div className="max-w-7xl mx-auto px-6 lg:px-8">
                            <div className="grid md:grid-cols-2 gap-12">
                                {/* Visi */}
                                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                                    <AnimatedSection delay={400}>
                                        <div className="flex items-center space-x-4 mb-6">
                                            <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                                                <Target className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-900">Visi</h2>
                                        </div>
                                        <p className="text-lg text-slate-600 leading-relaxed">
                                            {data.visi}
                                        </p>
                                    </AnimatedSection>
                                </div>

                                {/* Misi */}
                                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                                    <AnimatedSection delay={500}>
                                        <div className="flex items-center space-x-4 mb-6">
                                            <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
                                                <BookOpen className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-900">Misi</h2>
                                        </div>
                                        <ul className="space-y-4">
                                            {data.misi.map((item, index) => (
                                                <li key={index} className="flex items-start space-x-3">
                                                    <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                    <span className="text-lg text-slate-600">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </AnimatedSection>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </GuestLayout>
    );
};

const SkeletonCard: React.FC = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-slate-200 animate-pulse flex items-start space-x-4">
        <div className="h-8 w-8 bg-slate-200 rounded"></div>
        <div className="space-y-2 w-full">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        </div>
    </div>
);
