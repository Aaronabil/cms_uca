import { useState } from 'react';
import { Phone, ExternalLink, X, MessageCircle } from 'lucide-react';

import { usePage } from '@inertiajs/react';

export default function WhatsAppFloatingButton() {
    const [isOpen, setIsOpen] = useState(false);
    const { site_settings } = usePage().props;

    const whatsappNumber = site_settings?.whatsapp_number || "6281234567890"; 
    const registrationLink = site_settings?.registration_url || "https://pmb.uca.ac.id";

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
            {/* Dropdown Menu */}
            <div
                className={`
                    flex flex-col gap-2 
                    transition-all duration-300 ease-in-out origin-bottom-right
                    ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none absolute bottom-16 right-0'}
                `}
            >
                <a
                    href={registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        flex items-center gap-3 bg-white text-gray-800 px-4 py-3 rounded-xl shadow-lg 
                        hover:bg-gray-50 hover:shadow-xl transition-all border border-gray-100 min-w-[200px]
                    "
                >
                    <div className="bg-orange-100 p-2 rounded-full text-secondary">
                        <ExternalLink size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm">Web Pendaftaran</span>
                        <span className="text-xs text-gray-500">Mahasiswa Baru</span>
                    </div>
                </a>

                <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        flex items-center gap-3 bg-white text-gray-800 px-4 py-3 rounded-xl shadow-lg 
                        hover:bg-gray-50 hover:shadow-xl transition-all border border-gray-100 min-w-[200px]
                    "
                >
                    <div className="bg-green-100 p-2 rounded-full text-primary">
                        <Phone size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm">WhatsApp Center</span>
                        <span className="text-xs text-gray-500">Hubungi Kami</span>
                    </div>
                </a>
            </div>

            {/* Main Toggle Button */}
            <button
                onClick={toggleMenu}
                className={`
                    relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl 
                    transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none
                    ${isOpen ? 'bg-gray-800 text-white rotate-90' : 'bg-secondary text-white'}
                `}
                aria-label={isOpen ? "Close menu" : "Open contact menu"}
            >
                {isOpen ? (
                    <X size={24} />
                ) : (
                    <MessageCircle size={28} fill="currentColor" className="text-white" />
                )}

                {/* Ping animation effect when closed */}
                {!isOpen && (
                    <span className="absolute -inset-1 rounded-full bg-secondary opacity-30 animate-ping pointer-events-none"></span>
                )}
            </button>
        </div>
    );
}
