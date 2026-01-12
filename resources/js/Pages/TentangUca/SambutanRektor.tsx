import GuestLayout from "@/Layouts/GuestLayout"
import { Cpu, Zap } from "lucide-react"
import { Link, Head, usePage } from "@inertiajs/react"
import AnimatedSection from "@/Components/AnimatedSection"

export default function SambutanRektor({ page }: { page?: any }) {
    const { site_settings } = usePage<any>().props;

    const members = [1, 2, 3].map(i => ({
        name: site_settings[`vice_rector_${i}_name`] || `Wakil Rektor ${i}`,
        role: `Wakil Rektor ${i}`,
        avatar: site_settings[`vice_rector_${i}_image`] ? (site_settings[`vice_rector_${i}_image`].startsWith('http') ? site_settings[`vice_rector_${i}_image`] : '/storage/' + site_settings[`vice_rector_${i}_image`]) : `/warek${i}.jpg`,
        expertise: site_settings[`vice_rector_${i}_expertise`],
        education: site_settings[`vice_rector_${i}_education`],
        position: i === 3 ? 'object-top' : 'object-center'
    }));

    return (
        <GuestLayout headerVariant="light">
            <Head title="Pimpinan Universitas Cendekia Abditama" />
            <section className="py-16 md:py-32 bg-green-900">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="flex flex-col-reverse gap-6 md:gap-12 lg:flex-row lg:gap-24">
                        <div className="relative space-y-8 md:space-y-16 lg:w-1/2">
                            <AnimatedSection delay={200}>
                                <h2 className="relative z-10 text-white max-w-xl text-4xl font-medium lg:text-5xl">Sambutan Rektor Universitas Cendekia Abditama</h2>
                            </AnimatedSection>
                            <div className="relative space-y-4">
                                <AnimatedSection delay={400}>
                                    <h2 className="text-white text-3xl font-medium lg:text-4xl"> {page?.title || 'Dr. Muhammad Subali, S.Si., M.T..'}</h2>
                                </AnimatedSection>
                                <AnimatedSection delay={600}>
                                    {page ? (
                                        <div className="text-white text-justify space-y-4" dangerouslySetInnerHTML={{ __html: page.content }} />
                                    ) : (
                                        <>
                                            <p className="text-white">
                                                Selamat Datang di Official Website Universitas Cendekia Abditama
                                            </p>
                                            <p className="text-white text-justify"> Website ini bertujuan untuk memberikan berbagai informasi bagi pemangku kepentingan mengenai informasi layanan akademik, kerjasama, pengembangan bidang pendidikan, riset dan inovasi, fasilitas kampus, layanan informasi dan kehidupan kampus di Universitas Cendekia Abditama.
                                            </p>
                                        </>
                                    )}
                                </AnimatedSection>
                                <br />

                                <p className="text-white">
                                    {page?.title || 'Dr. Muhammad Subali'}
                                    <br />
                                    <span className="font-bold">Rektor Universitas Cendekia Abditama</span>
                                </p>
                            </div>
                        </div>
                        <div className="relative mt-6 sm:mt-0 lg:mt-44">
                            <AnimatedSection delay={300}>
                                <div className="relative mx-auto w-full max-w-md pt-4 pr-4">
                                    <div className="absolute top-0 right-0 bottom-4 left-4 rounded-[2.5rem] border-2 border-secondary-foreground" />
                                    <div className="relative rounded-[2.5rem] border-[6px] border-secondary bg-secondary overflow-hidden shadow-2xl">
                                        <img
                                            src="/rektor.jpg"
                                            alt="Rektor"
                                            className="w-full h-[500px] object-cover scale-110 object-[center_20%]"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary to-transparent" />
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
                <div className="mx-auto max-w-5xl border-t px-6">
                    <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
                        <div className="sm:w-4/5">
                            <AnimatedSection delay={300}>
                                <h2 className="text-3xl font-bold sm:text-4xl text-primary">Wakil Rektor Universitas Cendekia Abditama</h2>
                            </AnimatedSection>
                        </div>
                        <div className="mt-6 sm:mt-0">
                            <AnimatedSection delay={300}>
                                <p>Jajaran Wakil Rektor kami berdedikasi penuh untuk membantu Rektor dalam mewujudkan visi universitas. Dengan keahlian di bidang akademik, keuangan, hingga kemahasiswaan, mereka bersinergi menciptakan lingkungan pendidikan yang unggul, inovatif, dan berdaya saing global.</p>
                            </AnimatedSection>
                        </div>
                    </div>
                    <div className="mt-12 md:mt-24">
                        <AnimatedSection delay={400}>
                            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                                {members.map((member, index) => (
                                    <div
                                        key={index}
                                        className="group overflow-hidden">
                                        <img
                                            className={`h-96 w-full rounded-xl object-cover ${member.position}`}
                                            src={member.avatar}
                                            alt="team member"
                                            width="826"
                                            height="1239"
                                        />
                                        <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-base font-medium">{member.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                                </div>
                                                <span className="text-xs text-muted-foreground">_0{index + 1}</span>
                                            </div>

                                            <div className="mt-4 space-y-3">
                                                {/* Jabatan Fungsional Removed as per request */}

                                                {member.expertise && (
                                                    <div className="text-xs">
                                                        <span className="font-semibold text-primary block mb-0.5">Bidang Keahlian</span>
                                                        <span className="text-muted-foreground whitespace-pre-line">{member.expertise}</span>
                                                    </div>
                                                )}

                                                {member.education && (
                                                    <div className="text-xs">
                                                        <span className="font-semibold text-primary block mb-0.5">Pendidikan</span>
                                                        <span className="text-muted-foreground whitespace-pre-line">{member.education}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
