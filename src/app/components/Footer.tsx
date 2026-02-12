import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
            <div className="container mx-auto px-4">

                {/* Top Section: Columns */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Column 1: Brand & Mission */}
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <Link href="/" className="inline-block">
                            <h2 className="text-3xl font-black font-serif tracking-tight text-white mb-2">
                                Bantu<span className="text-gray-500">Pilih</span>.
                            </h2>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-md">
                            BantuPilih adalah layanan rekomendasi produk independen dari Indonesia.
                            Tim riset kami melakukan pengujian mandiri (dan kadang berlebihan) agar Anda bisa mengambil keputusan belanja dengan cepat dan percaya diri.
                            Entah itu mencari barang terbaik atau sekadar tips hemat, kami siap membantu Anda memilih dengan tepat.
                        </p>
                        <Link href="/about" className="text-white text-sm font-bold underline decoration-gray-600 hover:decoration-white underline-offset-4 transition-all">
                            Langganan Gratis Sekarang →
                        </Link>
                    </div>

                    {/* Column 2: About Selection */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold mb-2">Tentang Kami</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-white transition-colors">Misi BantuPilih</Link></li>
                            <li><Link href="/team" className="hover:text-white transition-colors">Tim Riset Kami</Link></li>
                            <li><Link href="/jobs" className="hover:text-white transition-colors">Karir</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Hubungi Kami</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Socials & Support */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold mb-2">Ikuti Kami</h4>
                        <div className="flex gap-4">
                            {/* Social Icons (Simple Circle) */}
                            {['tw', 'ig', 'tt', 'yt'].map((social) => (
                                <div key={social} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                                    <span className="text-xs uppercase font-bold">{social}</span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4 space-y-2 text-sm">
                            <h4 className="text-white font-bold mb-1">Bantuan</h4>
                            <ul className="space-y-2">
                                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
                                <li><Link href="/terms" className="hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
                                <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer Afiliasi</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Legal */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>
                        © {new Date().getFullYear()} BantuPilih Media. Independently Reviewed & Tested.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white">Terms of Use</Link>
                        <Link href="/sitemap" className="hover:text-white">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
