import GuestLayout from "@/Layouts/GuestLayout"
import { Cpu, Zap } from "lucide-react"

export default function SambutanRektor() {
    return (
        <GuestLayout>
            <section className="py-16 md:py-32 bg-green-900">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="flex flex-col-reverse gap-6 md:gap-12 lg:flex-row lg:gap-24">
                        <div className="relative space-y-8 md:space-y-16">
                            <h2 className="relative z-10 text-white max-w-xl text-4xl font-medium lg:text-5xl">Sambutan Rektor Universitas Cendekia Abditama</h2>
                            <div className="relative space-y-4">
                                <h2 className="text-white text-3xl font-medium lg:text-4xl"> Dr. Muhammad Subali, S.Si., M.T..</h2>
                                <p className="text-white">
                                    Selamat Datang di Official Website Universitas Cendekia Abditama
                                </p>
                                <p className="text-white"> Website ini bertujuan untuk memberikan berbagai informasi bagi pemangku kepentingan mengenai informasi layanan akademik, kerjasama, pengembangan bidang pendidikan, riset dan inovasi, fasilitas kampus, layanan informasi dan kehidupan kampus di Universitas Cendekia Abditama.
                                </p>

                                {/* <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Zap className="size-4" />
                                            <h3 className="text-sm font-medium">Faaast</h3>
                                        </div>
                                        <p className="text-muted-foreground text-sm">It supports an entire helping developers and innovate.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Cpu className="size-4" />
                                            <h3 className="text-sm font-medium">Powerful</h3>
                                        </div>
                                        <p className="text-muted-foreground text-sm">It supports an entire helping developers and businesses.</p>
                                    </div>
                                </div> */}
                                <p className="text-white">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique sit ab inventore et, magnam pariatur provident laboriosam aperiam odio laudantium consectetur fugiat, accusantium magni temporibus cum cupiditate nihil recusandae assumenda.
                                </p>
                                <p className="text-white">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique sit ab inventore et, magnam pariatur provident laboriosam aperiam odio laudantium consectetur fugiat, accusantium magni temporibus cum cupiditate nihil recusandae assumenda.
                                </p>
                                <p className="text-white">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique sit ab inventore et, magnam pariatur provident laboriosam aperiam odio laudantium consectetur fugiat, accusantium magni temporibus cum cupiditate nihil recusandae assumenda.
                                </p>
                                <p className="text-white">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique sit ab inventore et, magnam pariatur provident laboriosam aperiam odio laudantium consectetur fugiat, accusantium magni temporibus cum cupiditate nihil recusandae assumenda.
                                </p>
                                <br />

                                <p className="text-white">
                                    Dr. Muhammad Subali
                                    <br />
                                    <span className="font-bold">Rektor Universitas Cendekia Abditama</span>
                                </p>
                            </div>
                        </div>
                        <div className="relative mt-6 sm:mt-0 lg:mt-44">
                            <div className="bg-linear-to-b aspect-67/34 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                                <img src="https://i1.rgstatic.net/ii/profile.image/660888327569408-1534579464650_Q512/Muhammad-Subali.jpg" className="rounded-[15px] shadow dark:hidden" alt="payments illustration light" width={1206} height={612} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
