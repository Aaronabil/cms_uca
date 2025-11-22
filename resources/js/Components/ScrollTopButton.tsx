import React, { useState, useEffect, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollPercentage, setScrollPercentage] = useState(0);

    const handleScroll = useCallback(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const percentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

        setIsVisible(scrollTop > 200); // Tampil jika sudah scroll 200px
        setScrollPercentage(percentage);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Animasi scroll halus
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Clean up event listener saat komponen dilepas
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Hitung dash offset untuk SVG circle (semakin kecil, semakin terisi)
    // Lingkaran SVG punya keliling (circumference) 2 * PI * radius.
    // Radius circle = 20, jadi keliling = 2 * Math.PI * 20 = 125.66
    const circumference = 2 * Math.PI * 20; // 2 * PI * r (radius 20 dari viewBox)
    const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

    return (
        <div 
            className={`
                fixed bottom-8 right-8 z-50 
                transition-all duration-300 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
            `}
        >
            <button
                onClick={scrollToTop}
                className="
                    relative w-14 h-14 rounded-full flex items-center justify-center 
                    bg-white shadow-xl hover:shadow-2xl 
                    transition-all duration-300 ease-in-out
                    border border-green-100
                    group focus:outline-none focus:ring-4 focus:ring-green-200/50
                "
                aria-label="Scroll to top"
            >
                {/* SVG Progress Circle */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 44 44">
                    <circle
                        className="text-green-100"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="transparent"
                        r="20"
                        cx="22"
                        cy="22"
                    />
                    <circle
                        className="text-green-500 transition-all duration-100 ease-out"
                        strokeWidth="4"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round" // Membuat ujung garis membulat
                        stroke="currentColor"
                        fill="transparent"
                        r="20"
                        cx="22"
                        cy="22"
                    />
                </svg>

                {/* Icon Chevron */}
                <ChevronUp className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform duration-200" />
            </button>
        </div>
    );
}