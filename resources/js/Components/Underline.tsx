import React from 'react';
import { Link } from '@inertiajs/react'; 

interface AnimatedTitleProps {
    title: string;
    href?: string;          // Link tujuan (opsional, default ke #)
    className?: string;     // Untuk styling tambahan (font-size, margin, dll)
    underlineColor?: string;// Warna garis (opsional)
}

export default function AnimatedTitle({ 
    title, 
    href = '/newscoba', 
    className = "", 
    underlineColor = "bg-orange-200" 
}: AnimatedTitleProps) {

    const words = title.split(' ');
    return (
        <Link
            href={href} 
            className={`group inline-block cursor-pointer leading-snug ${className}`}
        >
            {words.map((word, index) => (
                <span key={index} className="relative inline-block whitespace-pre">
                    
                    {/* Layer Teks */}
                    <span className="relative z-10">{word}&nbsp;</span>
                    
                    {/* Layer Garis Bawah */}
                    <span
                        className={`
                            absolute bottom-0 left-0 h-[2px] w-full origin-bottom-left scale-x-0 
                            transition-transform duration-300 ease-out 
                            ${underlineColor} 
                            group-hover:scale-x-100
                        `}
                        style={{
                            transitionDuration: '200ms',
                            // Delay bertingkat agar efeknya "mengalir" dari kata ke kata
                            transitionDelay: `${index * 150}ms`
                        }}
                    />
                </span>
            ))}
        </Link>
    );
}