'use client'
import { Link, usePage } from '@inertiajs/react'
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
import { PageProps, FacultyData } from '@/types'

type NavItem = {
    title: string;
    href?: string;
    items?: NavItem[];
    description?: string;
    icon?: React.ReactNode;
}

const createSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

export const HeroHeader = ({ variant = 'default', faculties = [] }: { variant?: 'default' | 'light', faculties?: FacultyData[] }) => {
    const { site_settings, menus, faculties_global } = usePage<PageProps>().props;

    // Prioritize props (from Home), fallback to global (from other pages)
    const activeFaculties = faculties.length > 0 ? faculties : faculties_global;

    // Konstruksi menu dinamis berdasarkan props menus dari DB
    const navItems: NavItem[] = menus.map(menu => ({
        title: menu.name,
        href: menu.url === '#' ? undefined : menu.url,
        items: menu.children?.length ? menu.children.map(child => ({
            title: child.name,
            href: child.url === '#' ? undefined : child.url,
        })) : undefined
    }));

    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    
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

    const textColor = isScrolled || variant === 'default' ? "text-black" : "text-white";
    const hoverColor = isScrolled || variant === 'default' ? "hover:text-green-900" : "hover:text-green-200";

    return (
        <header>
            <nav
                className={cn('fixed z-40 w-full transition-all duration-300', isScrolled && 'bg-background/75 border-b border-black/5 backdrop-blur-lg')}>
                <div className="mx-auto max-w-7xl px-6">
                    <div className="relative flex flex-nowrap items-center justify-between gap-6 lg:gap-0">
                        <Link
                            href="/"
                            aria-label="home"
                            className="flex items-center space-x-2 py-3">
                            <img src={site_settings.logo_url || '/logo-uca-website.png'} className={cn("h-auto w-40 fill-current", isScrolled ? "text-gray-800" : "text-gray-500")} />
                        </Link>

                        <button
                            onClick={() => setMenuState(true)}
                            aria-label="Open Menu"
                            className={cn("relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden", textColor)}>
                            <Menu className="size-6" />
                        </button>

                        <div className="hidden size-fit lg:block ml-auto">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    {navItems.map((item, index) => (
                                        <NavigationMenuItem key={index}>
                                            {item.items ? (
                                                <>
                                                    <NavigationMenuTrigger className={cn(hoverColor, textColor)}>{item.title}</NavigationMenuTrigger>
                                                    <NavigationMenuContent>
                                                        {/* SPECIAL CASE: AKADEMIK (Mega Menu) */}
                                                        {item.title === 'Akademik' ? (
                                                            <div className="flex w-max" onMouseLeave={() => { setShowFaculties(false); setActiveFaculty(null); }}>
                                                                {/* Column 1: Menu Items from DB */}
                                                                <ul className="w-[200px] gap-4 px-3 py-3">
                                                                    {item.items.map((subItem, subIndex) => (
                                                                        <li key={subIndex}>
                                                                            {subItem.title === 'Fakultas & Prodi' ? (
                                                                                <div
                                                                                    onMouseEnter={() => setShowFaculties(true)}
                                                                                    className="flex items-center justify-between w-full p-2 text-sm font-medium leading-none no-underline rounded-md outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                                                                                >
                                                                                    <span>{subItem.title}</span>
                                                                                    <ChevronRight className="w-4 h-4 ml-2" />
                                                                                </div>
                                                                            ) : (
                                                                                <NavigationMenuLink asChild>
                                                                                    <Link href={subItem.href || '#'}>
                                                                                        <ListItem title={subItem.title}></ListItem>
                                                                                    </Link>
                                                                                </NavigationMenuLink>
                                                                            )}
                                                                        </li>
                                                                    ))}
                                                                </ul>

                                                                {/* Column 2: Faculties List (Dynamic from activeFaculties) */}
                                                                {showFaculties && (
                                                                    <ul className="w-[300px] border-l border-gray-100 bg-gray-50/50 px-3 py-3 animate-in fade-in slide-in-from-left-2 duration-200">
                                                                        {activeFaculties.map((faculty) => (
                                                                            <li key={faculty.id}>
                                                                                <NavigationMenuLink asChild>
                                                                                    <Link
                                                                                        href={`/fakultas/${faculty.slug}`}
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

                                                                {/* Column 3: Study Programs (Dynamic from activeFaculties) */}
                                                                {activeFaculty && (
                                                                    <ul className="w-[250px] border-l border-gray-100 bg-white px-3 py-3 animate-in fade-in slide-in-from-left-2 duration-200">
                                                                        <li className="mb-2 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                                            Program Studi
                                                                        </li>
                                                                        {activeFaculties.find(f => f.name === activeFaculty)?.study_programs.map((prodi) => (
                                                                            <li key={prodi.name}>
                                                                                <NavigationMenuLink asChild>
                                                                                    <Link
                                                                                        href={`/prodi/${createSlug(prodi.name)}`}
                                                                                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                                                    >
                                                                                        <div className="text-sm font-medium leading-none">{prodi.name}</div>
                                                                                    </Link>
                                                                                </NavigationMenuLink>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            /* GENERAL DROPDOWN */
                                                            <ul className="grid w-[200px] gap-4 px-3 py-3">
                                                                {item.items.map((subItem, subIndex) => (
                                                                    <li key={subIndex}>
                                                                        <NavigationMenuLink asChild>
                                                                            <Link href={subItem.href || '#'}>
                                                                                <ListItem title={subItem.title}></ListItem>
                                                                            </Link>
                                                                        </NavigationMenuLink>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </NavigationMenuContent>
                                                </>
                                            ) : (
                                                /* SINGLE LINK */
                                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                                    <Link href={item.href || '#'} className={cn(hoverColor, textColor)}>{item.title}</Link>
                                                </NavigationMenuLink>
                                            )}
                                        </NavigationMenuItem>
                                    ))}
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
                                    <Link
                                        href="/"
                                        aria-label="home"
                                        className="flex items-center space-x-2 py-3">
                                        <img src={site_settings.logo_url || '/logo-uca-website.png'} className={cn("h-auto w-40 fill-current", isScrolled ? "text-gray-800" : "text-gray-500")} />
                                    </Link>
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