import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black !text-white py-12 border-t border-gray-800">
            <div className="container mx-auto px-4">

                {/* Top Section: Columns */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Column 1: Brand & Mission */}
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <Link href="/" className="inline-block">
                            <h2 className="text-3xl font-black font-serif tracking-tight !text-white mb-2">
                                Bantu<span className="!text-orange-500">Pilih</span>.
                            </h2>
                        </Link>
                        <p className="text-base leading-relaxed max-w-md !text-white">
                            BantuPilih adalah layanan rekomendasi produk independen dari Indonesia.
                            Tim riset kami melakukan pengujian mandiri (dan kadang berlebihan) agar Anda bisa mengambil keputusan belanja dengan cepat dan percaya diri.
                            Entah itu mencari barang terbaik atau sekadar tips hemat, kami siap membantu Anda memilih dengan tepat.
                        </p>
                        <Link href="/about" className="!text-white text-sm font-bold underline decoration-white hover:decoration-orange-500 underline-offset-4 transition-all">
                            Langganan Gratis Sekarang →
                        </Link>
                    </div>

                    {/* Column 2: About Selection */}
                    <div className="space-y-4">
                        <h4 className="!text-white font-bold text-lg mb-2 border-b !border-white pb-2 inline-block">Tentang Kami</h4>
                        <ul className="space-y-3 text-sm font-medium">
                            <li><Link href="/about" className="!text-white hover:!text-orange-500 hover:underline transition-all">Misi BantuPilih</Link></li>
                            <li><Link href="/team" className="!text-white hover:!text-orange-500 hover:underline transition-all">Tim Riset Kami</Link></li>
                            <li><Link href="/jobs" className="!text-white hover:!text-orange-500 hover:underline transition-all">Karir</Link></li>
                            <li><Link href="/contact" className="!text-white hover:!text-orange-500 hover:underline transition-all">Hubungi Kami</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Socials & Support */}
                    <div className="space-y-4">
                        <h4 className="!text-white font-bold text-lg mb-2 border-b !border-white pb-2 inline-block">Ikuti Kami</h4>
                        <div className="flex gap-3">
                            {/* Social Icons (Brighter & Bordered) */}
                            {['tw', 'ig', 'tt', 'yt'].map((social) => (
                                <div key={social} className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center !text-white hover:bg-white hover:!text-black transition-all cursor-pointer border !border-white hover:!border-white">
                                    <span className="text-xs uppercase font-black">{social}</span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-6 space-y-3 text-sm font-medium">
                            <h4 className="!text-white font-bold text-lg mb-2 border-b !border-white pb-2 inline-block">Bantuan</h4>
                            <ul className="space-y-2">
                                <li><Link href="/privacy-policy" className="!text-white hover:!text-orange-500 hover:underline transition-all">Kebijakan Privasi</Link></li>
                                <li><Link href="/terms" className="!text-white hover:!text-orange-500 hover:underline transition-all">Syarat & Ketentuan</Link></li>
                                <li><Link href="/disclaimer" className="!text-white hover:!text-orange-500 hover:underline transition-all">Disclaimer Afiliasi</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Legal */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs !text-gray-400 font-medium">
                    <p>
                        © {new Date().getFullYear()} BantuPilih Media. Independently Reviewed & Tested.
                        {/* v1.0.3 - Forced White Footer with Important */}
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy-policy" className="hover:!text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:!text-white transition-colors">Terms of Use</Link>
                        <Link href="/sitemap" className="hover:!text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
