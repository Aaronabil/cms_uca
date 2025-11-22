'use client'
import { PropsWithChildren } from 'react';
import FooterSection from '@/Components/Footer';
import { HeroHeader } from '@/Components/HeroHeader';
import ScrollToTopButton from '@/Components/ScrollTopButton';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col">
            <HeroHeader />
            <main className="flex-grow">{children}</main>
            <ScrollToTopButton/>
            <FooterSection />
        </div>
    );
}
