'use client'
import { PropsWithChildren } from 'react';
import FooterSection from '@/Components/Footer';
import { HeroHeader } from '@/Components/HeroHeader';
// import ScrollToTopButton from '@/Components/ScrollTopButton';
import WhatsAppFloatingButton from '@/Components/WhatsAppFloatingButton';

type FacultyData = {
    id: number;
    name: string;
    image_url: string;
    slug: string;
    study_programs: Array<{ name: string }>;
};

interface GuestProps extends PropsWithChildren {
    headerVariant?: 'default' | 'light';
    faculties?: FacultyData[];
}

export default function Guest({ children, headerVariant = 'default', faculties = [] }: GuestProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <HeroHeader variant={headerVariant} faculties={faculties} />
            <main className="flex-grow">{children}</main>
            <WhatsAppFloatingButton />
            <FooterSection />
        </div>
    );
}

