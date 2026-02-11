'use client';

import { useEffect, useState } from 'react';

export default function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show if there are affiliate links
        const hasLinks = document.querySelector('.article-content a[href*="shopee"], .article-content a[href*="tokopedia"]');
        if (hasLinks) {
            setIsVisible(true);
        }
    }, []);

    if (!isVisible) return null;

    const scrollToProduct = (e: React.MouseEvent) => {
        e.preventDefault();
        const firstLink = document.querySelector('.article-content a[href*="shopee"], .article-content a[href*="tokopedia"]');
        if (firstLink) {
            firstLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <>
            {/* Mobile Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:hidden flex items-center justify-between z-50">
                <div className="text-sm font-medium text-gray-600">
                    Tertarik produk ini?
                </div>
                <button
                    onClick={scrollToProduct}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse"
                >
                    Lihat Harga Termurah
                </button>
            </div>

            {/* Desktop Floating CTA (Bottom Right) */}
            <div className="hidden md:flex fixed bottom-8 right-8 z-50 flex-col gap-2">
                <div className="bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 max-w-xs animate-fade-in-up">
                    <p className="text-gray-800 font-bold mb-1">Lagi nyari produk ini?</p>
                    <p className="text-gray-500 text-xs mb-3">Kami bantu carikan harga terbaik di marketplace.</p>
                    <button
                        onClick={scrollToProduct}
                        className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm"
                    >
                        Cek Harga Termurah →
                    </button>
                </div>
            </div>
        </>
    );

}
