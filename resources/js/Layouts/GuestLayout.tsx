'use client'
import { PropsWithChildren } from 'react';
import FooterSection from '@/Components/Footer';
import { HeroHeader } from '@/Components/HeroHeader';
import ScrollToTopButton from '@/Components/ScrollTopButton';

interface GuestProps extends PropsWithChildren {
    headerVariant?: 'default' | 'light';
}

export default function Guest({ children, headerVariant = 'default' }: GuestProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <HeroHeader variant={headerVariant} />
            <main className="flex-grow">{children}</main>
            <ScrollToTopButton />
            <FooterSection />
        </div>
    );
}
