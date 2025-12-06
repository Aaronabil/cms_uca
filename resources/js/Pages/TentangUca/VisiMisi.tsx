import { Target, BookOpen } from "lucide-react";
import GuestLayout from "@/Layouts/GuestLayout";
import { usePage } from "@inertiajs/react";
import { PageProps } from '@/types';

interface PageData {
    title: string;
    content: string;
}

interface VisiMisiProps extends PageProps {
    visiPage: PageData;
    misiPage: PageData;
}

export default function VisiMisi() {
    const { visiPage, misiPage } = usePage<VisiMisiProps>().props;

    return (
        <GuestLayout>
            <div className="w-full bg-white py-16 mt-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
                        <h1 className="max-w-xl text-4xl font-medium leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                            Visi & Misi
                        </h1>
                        <p className="max-w-md text-lg leading-relaxed text-gray-600">
                            Mempersiapkan mahasiswa untuk memberikan kontribusi yang berarti pada masyarakat, bangsa dan dunia.
                        </p>
                    </div>

                    <section className="py-20 bg-slate-50 mt-16 rounded-3xl">
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
                                    <div 
                                        className="text-lg text-slate-600 leading-relaxed prose prose-slate max-w-none prose-p:my-0" 
                                        dangerouslySetInnerHTML={{ __html: visiPage.content }} 
                                    />
                                </div>

                                {/* Misi */}
                                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
                                            <BookOpen className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900">Misi</h2>
                                    </div>
                                    <div 
                                        className="text-lg text-slate-600 leading-relaxed prose prose-slate max-w-none prose-li:marker:text-emerald-500 prose-ul:space-y-2" 
                                        dangerouslySetInnerHTML={{ __html: misiPage.content }} 
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </GuestLayout>
    );
};
