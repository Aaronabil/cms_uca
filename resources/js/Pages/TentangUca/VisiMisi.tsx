import { Button } from "@/Components/ui/button";
import { ArrowDown, Eye, Sparkles } from "lucide-react";
import GuestLayout from "@/Layouts/GuestLayout"

const loading = false;
const data = {
    mission: [
        "Menyelenggarakan pendidikan tinggi berkualitas yang berorientasi pada pengembangan ilmu pengetahuan dan teknologi.",
        "Melaksanakan penelitian inovatif yang berkontribusi pada pemecahan masalah di tingkat nasional maupun global.",
        "Mengembangkan pengabdian kepada masyarakat yang relevan, berkelanjutan, dan berdampak positif.",
        "Mewujudkan tata kelola perguruan tinggi yang profesional, transparan, dan berlandaskan nilai-nilai Islam."
    ]
};

export default function VisiMisi() {
    return (
        <GuestLayout>
            <div className="w-full bg-white py-16 mt-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
                        <h1 className="max-w-xl text-4xl font-medium leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                            Visi dan Misi
                        </h1>
                        <p className="max-w-md text-lg leading-relaxed text-gray-600">
                            Learn about our commitment to excellence, innovation, and the principles that guide our work every day.
                        </p>
                    </div>

                    {/* Image Section */}
                    <div className="relative mt-16">
                        <div className="overflow-hidden rounded-[2.5rem] bg-gray-100">
                            {/* Placeholder for the abstract spiral image */}
                            <img
                                src="https://plus.unsplash.com/premium_photo-1691962725044-d80a7145f7ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Abstract spiral architecture"
                                className="h-[400px] w-full object-cover md:h-[500px] lg:h-[600px]"
                            />
                        </div>

                        {/* Floating Action Button */}
                        <div className="absolute -bottom-6 right-8 md:-bottom-8 md:right-12">
                            <Button
                                size="icon"
                                className="h-16 w-16 rounded-full bg-[#00C995] shadow-lg transition-transform hover:scale-105 hover:bg-[#00b585] md:h-20 md:w-20"
                            >
                                <ArrowDown className="h-15 w-15 text-white md:h-10 md:w-10" />
                            </Button>
                        </div>
                    </div>
                    <div className="mt-10 gap-8 lg:gap-12">
                        {/* Vision Card */}
                        <div id="vision" className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-t-8 border-green-900 overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Eye className="w-32 h-32 text-green-600" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="bg-green-100 p-3 rounded-xl">
                                        <Eye className="w-8 h-8 text-green-700" />
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
                                        <Sparkles className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900">Misi</h2>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {loading ? (
                                    Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                                ) : (
                                    data.mission.map((item, index) => (
                                        <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-orange-500 flex items-start space-x-4">
                                            <span className="text-4xl font-black text-orange-200 leading-none">{index + 1}</span>
                                            <p className="text-slate-700 text-lg leading-relaxed font-medium">{item}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>
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
