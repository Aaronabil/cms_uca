import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// --- DATA KONTEN YANG AKAN "TERBANG" KELUAR ---
// Anda bisa ganti image dengan foto fasilitas, fakultas, atau icon
const UCA_CONTENTS = [
    { 
        id: 1, 
        text: "Fakultas Teknik", 
        img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop", 
        direction: { x: -800, y: -500 }, // Terbang ke Kiri Atas
        start: 0.15, // Muncul di 15% scroll
        end: 0.5 
    },
    { 
        id: 2, 
        text: "Perpustakaan Digital", 
        img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=400&auto=format&fit=crop", 
        direction: { x: 800, y: -300 }, // Terbang ke Kanan Atas
        start: 0.25, 
        end: 0.6 
    },
    { 
        id: 3, 
        text: "UKM Robotik", 
        img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&auto=format&fit=crop", 
        direction: { x: -600, y: 400 }, // Terbang ke Kiri Bawah
        start: 0.35, 
        end: 0.7 
    },
    { 
        id: 4, 
        text: "Laboratorium AI", 
        img: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=400&auto=format&fit=crop", 
        direction: { x: 600, y: 600 }, // Terbang ke Kanan Bawah
        start: 0.45, 
        end: 0.8 
    },
    { 
        id: 5, 
        text: "Auditorium Grand", 
        img: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=400&auto=format&fit=crop", 
        direction: { x: 0, y: -900 }, // Terbang Lurus ke Atas
        start: 0.55, 
        end: 0.9 
    },
];

// --- KOMPONEN ITEM TERBANG ---
const FlyingItem = ({ item, scrollYProgress }: { item: typeof UCA_CONTENTS[0], scrollYProgress: MotionValue<number> }) => {
    // Logika Transformasi:
    // Scale: Dari 0 (kecil di tengah) ke 1.5 (besar di depan muka)
    const scale = useTransform(scrollYProgress, [item.start, item.end], [0, 2]);
    
    // Opacity: Muncul (0->1) lalu hilang saat lewat (1->0)
    const opacity = useTransform(scrollYProgress, [item.start, item.start + 0.1, item.end - 0.1, item.end], [0, 1, 1, 0]);
    
    // Posisi X dan Y: Bergerak dari 0 (tengah) ke arah tujuan
    const x = useTransform(scrollYProgress, [item.start, item.end], [0, item.direction.x]);
    const y = useTransform(scrollYProgress, [item.start, item.end], [0, item.direction.y]);

    return (
        <motion.div
            style={{ scale, opacity, x, y }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-20 pointer-events-none"
        >
            <div className="relative w-48 h-32 md:w-64 md:h-40 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
                <img src={item.img} alt={item.text} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-white font-bold text-lg md:text-xl text-center px-2">{item.text}</h3>
                </div>
            </div>
        </motion.div>
    );
};

export default function WarpSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Tracking scroll progress container ini (0 sampai 1)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- ANIMASI TEXT UTAMA ("ADA APA SAJA...") ---
    // Text ini akan membesar (zoom in) sampai user seolah-olah masuk ke dalam hurufnya
    const textScale = useTransform(scrollYProgress, [0, 0.25], [1, 40]); 
    const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);

    // --- ANIMASI BACKGROUND STARFIELD (BINTANG) ---
    // Membuat efek bintang bergerak cepat saat scroll
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        // Container Tinggi (Scroll Space) - Semakin tinggi, semakin lama animasinya
        <div ref={containerRef} className="relative h-[400vh] bg-black">
            
            {/* Sticky Wrapper - Layar yang dilihat user */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-1000">
                
                {/* Background Space / Stars */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black z-0" />
                
                {/* Efek Bintang/Debu (Optional CSS Pattern) */}
                <motion.div 
                    style={{ backgroundPositionY: bgY }}
                    className="absolute inset-0 opacity-30 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" 
                />

                {/* --- 1. TEXT UTAMA (PINTU MASUK) --- */}
                <motion.div 
                    style={{ scale: textScale, opacity: textOpacity }}
                    className="relative z-10 text-center origin-center"
                >
                    <h2 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 tracking-tighter">
                        Ada apa saja <br /> di <span className="text-primary">UCA?</span>
                    </h2>
                    <p className="text-white/60 mt-4 text-sm md:text-lg">Scroll untuk menjelajah</p>
                </motion.div>

                {/* --- 2. FLYING OBJECTS (ISI DALAM) --- */}
                {UCA_CONTENTS.map((item) => (
                    <FlyingItem key={item.id} item={item} scrollYProgress={scrollYProgress} />
                ))}

                {/* Overlay Vignette untuk kesan deep space */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,black_120%)] z-30" />
                
            </div>
        </div>
    );
}