import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';

interface PageData {
    title: string;
    content: string;
    slug: string;
}

interface ShowProps extends PageProps {
    page: PageData;
}

export default function Show({ page }: ShowProps) {
    return (
        <GuestLayout>
            <Head title={page.title} />
            
            <div className="pt-24 pb-12 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8 md:p-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 border-b pb-4">
                            {page.title}
                        </h1>
                        
                        <div 
                            className="prose prose-lg max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: page.content }} 
                        />
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
