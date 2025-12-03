import GuestLayout from '@/Layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import {
    BookOpen,
    Target,
    Award,
    Users,
    Briefcase,
    CheckCircle2,
    ArrowRight,
    Quote,
    UserCircle
} from 'lucide-react';

interface StudyProgramData {
    name: string;
    faculty_name: string;
    faculty_image_url?: string;
    degree: string;
    description: string;
}

export default function Prodi({ studyProgram }: { studyProgram: StudyProgramData }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    // Data gabungan: Props dari DB + Placeholder Dinamis
    const prodiData = {
        name: studyProgram.name,
        degree: studyProgram.degree,
        description: studyProgram.description,
        kaprodi: {
            // Gunakan jabatan generic karena data spesifik belum ada di DB
            name: `Ketua Prodi ${studyProgram.name}`,
            message: `Selamat datang di Program Studi ${studyProgram.name}. Kami berkomitmen untuk mencetak lulusan yang kompeten, inovatif, dan berakhlak mulia, siap bersaing di era global.`
        },
        visi: `Menjadi pusat unggulan pendidikan dan penelitian di bidang ${studyProgram.name} yang berbasis nilai-nilai Islam.`,
        misi: [
            `Menyelenggarakan pendidikan berkualitas di bidang ${studyProgram.name}.`,
            "Melaksanakan penelitian yang berkontribusi pada kemajuan ilmu pengetahuan.",
            "Melakukan pengabdian kepada masyarakat melalui penerapan ilmu."
        ],
        keunggulan: [
            { title: "Kurikulum Terkini", description: "Kurikulum berbasis industri yang selalu diperbarui sesuai perkembangan zaman." },
            { title: "Fasilitas Lengkap", description: "Laboratorium modern, akses internet cepat, dan ruang belajar nyaman." },
            { title: "Dosen Ahli", description: "Didukung oleh staf pengajar berkualifikasi S2 dan S3 serta praktisi industri." },
            { title: "Pengembangan Karir", description: "Program bimbingan karir untuk mempersiapkan mahasiswa memasuki dunia kerja." }
        ],
        karir: [
            "Praktisi Profesional",
            "Peneliti / Akademisi",
            "Wirausahawan",
            "Konsultan",
            "Manajer",
            "Pegawai Negeri Sipil"
        ]
    };


    return (
        <GuestLayout>
            {/* Hero Section */}
            <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-slate-900 text-white">
                <motion.img
                    style={{ y, scale: 1.1 }}
                    src="/prodi.jpg"
                    alt={studyProgram.faculty_name}
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/60 to-slate-900/90" />

                <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
                    <div className="flex items-center space-x-2 text-sm text-emerald-400 font-medium mb-4 uppercase tracking-wider">
                        <span>{studyProgram.faculty_name}</span>
                        <span>/</span>
                        <span>{prodiData.degree}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        {prodiData.name}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                        {prodiData.description}
                    </p>
                </div>
            </div>

            {/* Sambutan Kaprodi */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="w-full lg:w-1/3">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 shadow-xl flex items-center justify-center">
                                {/* Placeholder for Kaprodi Image - Menggunakan Icon Generic */}
                                <UserCircle className="w-32 h-32 text-slate-300" />
                            </div>
                        </div>
                        <div className="w-full lg:w-2/3">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                                    <Quote className="w-8 h-8" />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900">Sambutan Kaprodi</h2>
                            </div>
                            <blockquote className="text-2xl font-medium leading-relaxed text-slate-700 mb-8">
                                "{prodiData.kaprodi.message}"
                            </blockquote>
                            <div>
                                <div className="text-xl font-bold text-slate-900">{prodiData.kaprodi.name}</div>
                                <div className="text-slate-500">Universitas Cendekia Abditama</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visi & Misi */}
            <section className="py-20 bg-slate-50">
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
                                {prodiData.visi}
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
                                {prodiData.misi.map((item, index) => (
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

            {/* Keunggulan */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Mengapa Memilih Kami?</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Keunggulan yang kami tawarkan untuk mendukung kesuksesan akademik dan karir Anda.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {prodiData.keunggulan.map((item, index) => (
                            <div key={index} className="group p-8 rounded-3xl bg-slate-50 hover:bg-emerald-50 transition-colors duration-300">
                                <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm w-fit group-hover:scale-110 transition-transform duration-300">
                                    <Award className="w-8 h-8 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Prospek Karir */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
                    <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[80%] rounded-full bg-primary blur-[120px]" />
                    <div className="absolute -bottom-[50%] -right-[20%] w-[80%] h-[80%] rounded-full bg-secondary-foreground blur-[120px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Prospek Karir</h2>
                            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                                Lulusan program studi {prodiData.name} memiliki peluang karir yang luas di berbagai sektor industri.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                {prodiData.karir.map((job, index) => (
                                    <div key={index} className="px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-lg font-medium hover:bg-white/20 transition-colors">
                                        {job}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-secondary to-primary rounded-3xl p-10 shadow-2xl">
                                <Briefcase className="w-16 h-16 text-white mb-6" />
                                <h3 className="text-3xl font-bold mb-4">Siap Berkarir?</h3>
                                <p className="text-white/90 text-lg mb-8">
                                    Bergabunglah bersama kami dan wujudkan impian karir masa depan Anda.
                                </p>
                                <Link
                                    href="/pendaftaran"
                                    className="inline-flex items-center px-8 py-4 rounded-xl bg-white text-slate-900 font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg"
                                >
                                    Daftar Sekarang
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
