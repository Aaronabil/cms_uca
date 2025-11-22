'use client'
import { Link } from '@inertiajs/react'
import ApplicationLogo from '@/Components/ApplicationLogo'
import { Menu, X, CircleHelpIcon, CircleIcon, CircleCheckIcon, Plus, Minus } from 'lucide-react'
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
    items?: {
        title: string;
        href: string;
        description?: string;
        icon?: React.ReactNode;
    }[];
}

const navItems: NavItem[] = [
    { title: "Beranda", href: "/" },
    {
        title: "Tentang UCA",
        items: [
            { title: "Sejarah UCA", href: "/sejarah-uca" },
            { title: "Sambutan Rektor", href: "/sambutan-rektor" },
            { title: "Visi, Misi dan Tujuan", href: "/visi-misi-dan-tujuan" },
        ]
    },
    { title: "Docs", href: "/docs" },
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

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [expandedItem, setExpandedItem] = useState<string | null>(null)

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
                                                        <ListItem href="/sejarah-uca" title="Sejarah UCA"></ListItem>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="/sambutan-rektor">
                                                            <ListItem title="Sambutan Rektor"></ListItem>
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
                                        <li key={index} className="border-b border-gray-100 pb-4 last:border-0">
                                            {item.items ? (
                                                <div>
                                                    <button
                                                        onClick={() => toggleExpand(item.title)}
                                                        className="flex w-full items-center justify-between font-semibold text-gray-900"
                                                    >
                                                        <span>{item.title}</span>
                                                        {expandedItem === item.title ? (
                                                            <Minus className="size-4 text-gray-500" />
                                                        ) : (
                                                            <Plus className="size-4 text-gray-500" />
                                                        )}
                                                    </button>
                                                    <AnimatePresence>
                                                        {expandedItem === item.title && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <ul className="mt-4 space-y-3 pl-4">
                                                                    {item.items.map((subItem, subIndex) => (
                                                                        <li key={subIndex}>
                                                                            <Link
                                                                                href={subItem.href}
                                                                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-900"
                                                                            >
                                                                                {subItem.icon && <span>{subItem.icon}</span>}
                                                                                <span>{subItem.title}</span>
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ) : (
                                                <Link
                                                    href={item.href || '#'}
                                                    className="block font-semibold text-gray-900 hover:text-green-900"
                                                >
                                                    {item.title}
                                                </Link>
                                            )}
                                        </li>
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
