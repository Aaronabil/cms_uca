'use client'
import { Link } from '@inertiajs/react'
import ApplicationLogo from '@/Components/ApplicationLogo'
import { Menu, X, CircleHelpIcon, CircleIcon, CircleCheckIcon, Plus, Minus, ChevronRight } from 'lucide-react'
import { Button } from '@/Components/ui/button'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu"
import { ListItem } from '@/Components/ListItem'
import { AnimatePresence, motion } from 'framer-motion'

type NavItem = {
    title: string;
    href?: string;
    items?: NavItem[];
    description?: string;
    icon?: React.ReactNode;
}

const navItems: NavItem[] = [
    { title: "Beranda", href: "/" },
    {
        title: "Tentang UCA",
        items: [
            { title: "Sejarah UCA", href: "/sejarah-uca" },
            { title: "Pimpinan Universitas", href: "/sambutan-rektor" },
            { title: "Visi, Misi dan Tujuan", href: "/visi-misi-dan-tujuan" },
        ]
    },
    {
        title: "Akademik",
        items: [
            { title: "Kalender Akademik", href: "/kalender-akademik" },
            { title: "Data Dosen", href: "/data-dosen" },
            {
                title: "Fakultas & Prodi",
                items: [
                    {
                        title: "Fakultas Ekonomi dan Bisnis Islam",
                        href: "/fakultas/ekonomi-dan-bisnis-islam",
                        items: [
                            { title: "Akuntansi", href: "/prodi/akuntansi" },
                            { title: "Bisnis Digital", href: "/prodi/bisnis-digital" },
                            { title: "Perbankan Syariah", href: "/prodi/perbankan-syariah" },
                            { title: "Ekonomi Syariah", href: "/prodi/ekonomi-syariah" },
                        ]
                    },
                    {
                        title: "Fakultas Ilmu Keperawatan",
                        href: "/fakultas/ilmu-keperawatan",
                        items: [
                            { title: "Keperawatan", href: "/prodi/keperawatan" },
                        ]
                    },
                    {
                        title: "Fakultas Tarbiyah dan Ilmu Keguruan",
                        href: "/fakultas/tarbiyah-dan-ilmu-keguruan",
                        items: [
                            { title: "Pendidikan Agama Islam", href: "/prodi/pendidikan-agama-islam" },
                            { title: "Pendidikan Islam Anak Usia Dini", href: "/prodi/pendidikan-islam-anak-usia-dini" },
                            { title: "Manajemen Pendidikan Islam", href: "/prodi/manajemen-pendidikan-islam" },
                        ]
                    },
                    {
                        title: "Fakultas Teknik",
                        href: "/fakultas/teknik",
                        items: [
                            { title: "Teknik Informatika", href: "/prodi/teknik-informatika" },
                            { title: "Teknik Elektro", href: "/prodi/teknik-elektro" },
                        ]
                    }
                ]
            }
        ]
    },
    { title: "Fasilitas Kampus", href: "/fasilitas-kampus" },
    {
        title: "List",
        items: [
            { title: "Components", href: "#", description: "Browse all components in the library." },
            { title: "Documentation", href: "#", description: "Learn how to use the library." },
            { title: "Blog", href: "#", description: "Read our latest blog posts." },
        ]
    },
    {
        title: "Simple",
        items: [
            { title: "Components", href: "#" },
            { title: "Documentation", href: "#" },
            { title: "Blocks", href: "#" },
        ]
    },
    {
        title: "With Icon",
        items: [
            { title: "Backlog", href: "#", icon: <CircleHelpIcon className="w-4 h-4" /> },
            { title: "To Do", href: "#", icon: <CircleIcon className="w-4 h-4" /> },
            { title: "Done", href: "#", icon: <CircleCheckIcon className="w-4 h-4" /> },
        ]
    }
]

const faculties = [
    {
        name: "Fakultas Ekonomi dan Bisnis Islam",
        href: "/fakultas/ekonomi-dan-bisnis-islam",
        prodi: ["Akuntansi", "Bisnis Digital", "Perbankan Syariah", "Ekonomi Syariah"]
    },
    {
        name: "Fakultas Ilmu Keperawatan",
        href: "/fakultas/ilmu-keperawatan",
        prodi: ["Keperawatan"]
    },
    {
        name: "Fakultas Tarbiyah dan Ilmu Keguruan",
        href: "/fakultas/tarbiyah-dan-ilmu-keguruan",
        prodi: ["Pendidikan Agama Islam", "Pendidikan Islam Anak Usia Dini", "Manajemen Pendidikan Islam"]
    },
    {
        name: "Fakultas Teknik",
        href: "/fakultas/teknik",
        prodi: ["Teknik Informatika", "Teknik Elektro"]
    }
];

const createSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [expandedItem, setExpandedItem] = useState<string | null>(null)

    // State for the nested Mega Menu
    const [showFaculties, setShowFaculties] = useState(false);
    const [activeFaculty, setActiveFaculty] = useState<string | null>(null);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleExpand = (title: string) => {
        setExpandedItem(expandedItem === title ? null : title)
    }

    return (
        <header>
            <nav
                className={cn('fixed z-40 w-full transition-all duration-300', isScrolled && 'bg-background/75 border-b border-black/5 backdrop-blur-lg')}>
                <div className="mx-auto max-w-5xl px-6">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 lg:gap-0">
                        <Link
                            href="/"
                            aria-label="home"
                            className="flex items-center space-x-2 py-3">
                            <ApplicationLogo className={cn("h-10 w-10 fill-current", isScrolled ? "text-gray-800" : "text-gray-500")} />
                        </Link>

                        <button
                            onClick={() => setMenuState(true)}
                            aria-label="Open Menu"
                            className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                            <Menu className="size-6" />
                        </button>

                        <div className="hidden size-fit lg:block ml-auto">
                            <NavigationMenu>
                                <NavigationMenuList className="flex-wrap">
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                            <Link href="/" className="hover:text-green-900 text-black">Beranda</Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem className="hidden md:block">
                                        <NavigationMenuTrigger className="hover:text-green-900 text-black">Tentang UCA</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[200px] gap-4 px-3 py-3">
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="/sejarah-uca">
                                                            <ListItem title="Sejarah UCA"></ListItem>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="/sambutan-rektor">
                                                            <ListItem title="Pimpinan Universitas"></ListItem>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="/visi-misi-dan-tujuan">
                                                            <ListItem title="Visi, Misi dan Tujuan"></ListItem>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem className="hidden md:block">
                                        <NavigationMenuTrigger className="hover:text-green-900 text-black">Akademik</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <div className="flex w-max" onMouseLeave={() => { setShowFaculties(false); setActiveFaculty(null); }}>
                                                {/* Column 1: Main Menu */}
                                                <ul className="w-[200px] gap-4 px-3 py-3">
                                                    <li>
                                                        <div
                                                            onMouseEnter={() => setShowFaculties(true)}
                                                            className="flex items-center justify-between w-full p-2 text-sm font-medium leading-none no-underline rounded-md outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                                                        >
                                                            <span>Fakultas & Prodi</span>
                                                            <ChevronRight className="w-4 h-4 ml-2" />
                                                        </div>
                                                        <NavigationMenuLink asChild>
                                                            <Link href="/kalender-akademik">
                                                                <ListItem title="Kalender Akademik"></ListItem>
                                                            </Link>
                                                        </NavigationMenuLink>
                                                        <NavigationMenuLink asChild>
                                                            <Link href="/data-dosen">
                                                                <ListItem title="Data Dosen"></ListItem>
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    </li>
                                                </ul>

                                                {/* Column 2: Faculties */}
                                                {showFaculties && (
                                                    <ul className="w-[300px] border-l border-gray-100 bg-gray-50/50 px-3 py-3 animate-in fade-in slide-in-from-left-2 duration-200">
                                                        {faculties.map((faculty) => (
                                                            <li key={faculty.name}>
                                                                <NavigationMenuLink asChild>
                                                                    <Link
                                                                        href={faculty.href}
                                                                        onMouseEnter={() => setActiveFaculty(faculty.name)}
                                                                        className={cn(
                                                                            "flex items-center justify-between w-full p-2 text-sm font-medium leading-none no-underline rounded-md outline-none transition-colors hover:bg-white hover:text-green-900 cursor-pointer",
                                                                            activeFaculty === faculty.name && "bg-white text-green-900 shadow-sm"
                                                                        )}
                                                                    >
                                                                        <span>{faculty.name}</span>
                                                                        <ChevronRight className="w-4 h-4 ml-2" />
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}

                                                {/* Column 3: Prodi */}
                                                {activeFaculty && (
                                                    <ul className="w-[250px] border-l border-gray-100 bg-white px-3 py-3 animate-in fade-in slide-in-from-left-2 duration-200">
                                                        <li className="mb-2 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                            Program Studi
                                                        </li>
                                                        {faculties.find(f => f.name === activeFaculty)?.prodi.map((prodi) => (
                                                            <li key={prodi}>
                                                                <NavigationMenuLink asChild>
                                                                    <Link
                                                                        href={`/prodi/${createSlug(prodi)}`}
                                                                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                                    >
                                                                        <div className="text-sm font-medium leading-none">{prodi}</div>
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                            <Link href="/fasilitas-kampus" className="hover:text-green-900 text-black">Fasilitas Kampus</Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem className="hidden md:block">
                                        <NavigationMenuTrigger className="hover:text-green-900 text-black">List</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[300px] gap-4 px-3">
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="#">
                                                            <div className="font-medium">Components</div>
                                                            <div className="text-muted-foreground">
                                                                Browse all components in the library.
                                                            </div>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="#">
                                                            <div className="font-medium">Documentation</div>
                                                            <div className="text-muted-foreground">
                                                                Learn how to use the library.
                                                            </div>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="#">
                                                            <div className="font-medium">Blog</div>
                                                            <div className="text-muted-foreground">
                                                                Read our latest blog posts.
                                                            </div>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>

                                    </NavigationMenuItem>
                                    <NavigationMenuItem className="hidden md:block">
                                        <NavigationMenuTrigger className="hover:text-green-900 text-black">Simple</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[200px] gap-4">
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="#">Components</Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="#">Documentation</Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="#">Blocks</Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem className="hidden md:block">
                                        <NavigationMenuTrigger className="hover:text-green-900 text-black">With Icon</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[200px] gap-4">
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="#" className="flex-row items-center gap-2">
                                                            <CircleHelpIcon />
                                                            Backlog
                                                        </Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="#" className="flex-row items-center gap-2">
                                                            <CircleIcon />
                                                            To Do
                                                        </Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="#" className="flex-row items-center gap-2">
                                                            <CircleCheckIcon />
                                                            Done
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay & Sidebar */}
            <AnimatePresence>
                {menuState && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuState(false)}
                            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-50 w-[300px] bg-white shadow-xl lg:hidden overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <ApplicationLogo className="h-8 w-8 fill-current text-gray-800" />
                                    <button
                                        onClick={() => setMenuState(false)}
                                        className="p-2 -mr-2 text-gray-500 hover:text-gray-700"
                                    >
                                        <X className="size-6" />
                                    </button>
                                </div>

                                <ul className="space-y-4">
                                    {navItems.map((item, index) => (
                                        <MobileMenuItem key={index} item={item} />
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    )
}

const MobileMenuItem = ({ item }: { item: NavItem }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (item.items) {
        return (
            <li className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center justify-between">
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="font-semibold text-gray-900 hover:text-green-900 flex-1"
                        >
                            {item.title}
                        </Link>
                    ) : (
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="font-semibold text-gray-900 flex-1 text-left"
                        >
                            {item.title}
                        </button>
                    )}

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 -mr-2 text-gray-500"
                    >
                        {isOpen ? (
                            <Minus className="size-4" />
                        ) : (
                            <Plus className="size-4" />
                        )}
                    </button>
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <ul className="mt-4 space-y-3 pl-4">
                                {item.items.map((subItem, subIndex) => (
                                    <MobileMenuItem key={subIndex} item={subItem} />
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </li>
        );
    }

    return (
        <li className="border-b border-gray-100 pb-4 last:border-0">
            <Link
                href={item.href || '#'}
                className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-green-900"
            >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.title}</span>
            </Link>
        </li>
    );
};


