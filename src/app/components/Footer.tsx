import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-16 mt-12 border-t-8 border-orange-600">
            <div className="container mx-auto px-4 text-center">
                {/* Brand Logo - Enhanced for Visibility */}
                <div className="mb-8">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight font-serif inline-block">
                        <span className="text-white">Bantu</span>
                        <span className="text-orange-500">Pilih</span>
                        <span className="text-orange-500 text-5xl">.</span>
                    </h2>
                    <p className="text-gray-400 text-sm mt-2 tracking-wider uppercase font-medium">
                        Panduan Belanja Independen
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold text-gray-300 mb-10 tracking-wide uppercase">
                    <Link href="/about" className="hover:text-orange-500 transition-colors">Tentang Kami</Link>
                    <Link href="/contact" className="hover:text-orange-500 transition-colors">Kontak</Link>
                    <Link href="/privacy-policy" className="hover:text-orange-500 transition-colors">Privasi</Link>
                    <Link href="/disclaimer" className="hover:text-orange-500 transition-colors">Disclaimer</Link>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 pt-8 flex flex-col gap-2">
                    <p className="text-xs text-gray-400 font-medium">
                        © {new Date().getFullYear()} BantuPilih. All rights reserved.
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                        Independently Reviewed & Tested
                    </p>
                </div>
            </div>
        </footer>
    );
}
