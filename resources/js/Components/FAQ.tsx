'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion'
import { Link } from '@inertiajs/react'

type FAQItem = {
    question: string
    answer: string
}

type FAQSeputarUCAProps = {
    faqs: FAQItem[]
}

export default function FAQSeputarUCA({ faqs }: FAQSeputarUCAProps) {
    return (
        <section className="bg-white dark:bg-background py-20">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-start">
                    {/* Left Column: Image */}
                    <div className="relative">
                        <div className="sticky top-24">
                            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
                                <img
                                    src="/ucanew3.JPG"
                                    alt="Kampus UCA"
                                    className="h-[600px] w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/10" />
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-[2.5rem] bg-primary/10" />
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-10">
                            <h2 className="text-4xl font-bold tracking-tight text-primary md:text-5xl mb-6">
                                Pertanyaan Seputar <br /> Pendaftaran
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Masih bingung mengenai pendaftaran? Temukan jawaban untuk pertanyaan yang sering diajukan oleh calon mahasiswa baru di sini.
                            </p>
                            <p className="mt-4 text-muted-foreground">
                                Butuh bantuan lebih lanjut? Hubungi tim{' '}
                                <Link
                                    href="#"
                                    className="text-primary font-medium hover:underline decoration-2 underline-offset-4">
                                    Penerimaan Mahasiswa Baru
                                </Link>
                            </p>
                        </div>

                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-4">
                            {faqs.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border-none bg-gray-50 dark:bg-zinc-900/50 rounded-2xl px-6 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-zinc-900">
                                    <AccordionTrigger className="text-left text-lg text-primary font-medium py-6 hover:no-underline [&[data-state=open]]:text-primary">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-6 text-secondary-foreground text-base leading-relaxed">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}