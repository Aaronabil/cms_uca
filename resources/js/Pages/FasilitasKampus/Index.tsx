import GuestLayout from "@/Layouts/GuestLayout"
import { Head } from "@inertiajs/react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const facilities = [
    {
        id: 1,
        name: "Library",
        description: "One of the largest and oldest research libraries in Europe, offering access to millions of resources.",
        image: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2000&auto=format&fit=crop",
        category: "AVAILABLE FACILITY"
    },
    {
        id: 2,
        name: "Laboratory",
        description: "State-of-the-art laboratories equipped with the latest technology for groundbreaking research.",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2000&auto=format&fit=crop",
        category: "AVAILABLE FACILITY"
    },
    {
        id: 3,
        name: "Sports Center",
        description: "Comprehensive sports facilities including a gym, swimming pool, and indoor courts.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop",
        category: "AVAILABLE FACILITY"
    },
    {
        id: 4,
        name: "Auditorium",
        description: "A grand venue for conferences, performances, and university-wide events.",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2000&auto=format&fit=crop",
        category: "AVAILABLE FACILITY"
    },
    {
        id: 5,
        name: "Dormitory",
        description: "Comfortable and secure on-campus housing fostering a vibrant student community.",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2000&auto=format&fit=crop",
        category: "AVAILABLE FACILITY"
    },
    {
        id: 6,
        name: "Cafeteria",
        description: "A variety of dining options serving healthy and delicious meals for students and staff.",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop",
        category: "AVAILABLE FACILITY"
    },
    {
        id: 7,
        name: "Computer Lab",
        description: "High-performance computing centers available 24/7 for student projects and research.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000&auto=format&fit=crop",
        category: "AVAILABLE FACILITY"
    },
    {
        id: 8,
        name: "Study Hall",
        description: "Quiet and dedicated spaces designed for focused individual and group study.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
        category: "AVAILABLE FACILITY"
    }
]

export default function FasilitasKampus() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    }

    const swipeConfidenceThreshold = 10000
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity
    }

    const paginate = (newDirection: number) => {
        setDirection(newDirection)
        setCurrentIndex((prevIndex) => {
            const nextIndex = (prevIndex + newDirection + facilities.length) % facilities.length
            return nextIndex
        })
    }

    return (
        <GuestLayout>
            <Head title="Fasilitas Kampus" />
            <div className="relative w-full h-screen px-4 py-4 md:px-6 md:py-6 mt-12">
                <div className="relative w-full h-full overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-black text-white">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            variants={slideVariants}
                            custom={direction}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x)

                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1)
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1)
                                }
                            }}
                            className="absolute inset-0 h-full w-full"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={facilities[currentIndex].image}
                                    alt={facilities[currentIndex].name}
                                    className="h-full w-full object-cover opacity-60"
                                />
                                 <div className="absolute inset-0 bg-white/20 lg:bg-black/20"></div>
                            </div>

                            {/* Content Container */}
                            <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-12 lg:p-20">
                                {/* Top Section */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-medium tracking-wider text-yellow-500 mb-2">Our Facilities</p>
                                        <h1 className="max-w-2xl text-3xl md:text-5xl font-medium leading-tight">
                                            Exceptional Facilities Designed to Support Learning, Research, and Discovery
                                        </h1>
                                    </div>
                                    <div className="hidden md:block text-right">
                                        <p className="text-sm font-medium tracking-widest uppercase text-white/80">
                                            {facilities[currentIndex].category}
                                        </p>
                                    </div>
                                </div>

                                {/* Middle/Bottom Section */}
                                <div className="flex flex-col gap-8">
                                    {/* Counter & Large Text */}
                                    <div className="relative">
                                        <div className="flex items-baseline gap-2 mb-[-2vw] md:mb-[-4vw] relative z-20">
                                            <span className="text-4xl md:text-6xl font-light text-orange-200">
                                                {String(currentIndex + 1).padStart(2, '0')}
                                            </span>
                                            <span className="text-xl md:text-2xl text-white/50">
                                                /{String(facilities.length).padStart(2, '0')}
                                            </span>
                                        </div>
                                        <h2 className="text-[18vw] font-bold leading-none tracking-tighter text-transparent stroke-text select-none mix-blend-overlay opacity-50">
                                            {facilities[currentIndex].name}
                                        </h2>
                                        <h2 className="absolute bottom-0 left-0 text-[18vw] font-bold leading-none tracking-tighter text-white select-none overflow-hidden h-[30%] flex items-end">
                                            {facilities[currentIndex].name}
                                        </h2>
                                    </div>

                                    {/* Description & Navigation */}
                                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-t border-white/20 pt-8">
                                        <div className="max-w-md">
                                            <h3 className="text-xl font-semibold mb-2">{facilities[currentIndex].name}</h3>
                                            <p className="text-white/80 text-sm leading-relaxed">
                                                {facilities[currentIndex].description}
                                            </p>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="flex-1 max-w-md hidden md:flex gap-1 h-1">
                                            {facilities.map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={cn(
                                                        "h-full flex-1 rounded-full transition-colors duration-300",
                                                        index === currentIndex ? "bg-white" : "bg-white/20"
                                                    )}
                                                />
                                            ))}
                                        </div>

                                        {/* Navigation Buttons */}
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => paginate(-1)}
                                                className="p-4 rounded-full border border-white/20 hover:bg-orange-200 hover:text-black transition-colors duration-300"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button
                                                onClick={() => paginate(1)}
                                                className="p-4 rounded-full border border-white/20 hover:bg-green-900 hover:text-black transition-colors duration-300"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* CSS for stroke text effect if not in global css */}
                    <style>{`
                        .stroke-text {
                            -webkit-text-stroke: 2px white;
                        }
                    `}</style>
                </div>
            </div>
        </GuestLayout>
    )
}