import Link from 'next/link';

export const metadata = {
    title: 'Kontak Kami | BantuPilih',
    description: 'Hubungi tim BantuPilih untuk kerjasama, saran, atau pertanyaan.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-orange-600">
                        BantuPilih
                    </Link>
                    <Link href="/" className="text-sm font-medium text-gray-600 hover:text-orange-600">
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12 max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Hubungi Kami</h1>

                <div className="prose prose-orange max-w-none bg-white p-8 rounded-2xl shadow-sm">
                    <p className="text-lg text-gray-600 mb-6">
                        Punya pertanyaan, saran, kritik, atau tawaran kerjasama? Kami senang mendengar dari Anda!
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                        <div className="bg-orange-50 p-6 rounded-xl">
                            <h3 className="text-xl font-bold text-orange-800 mb-2">📧 Email</h3>
                            <p className="text-gray-600 mb-4">Untuk pertanyaan umum dan kerjasama:</p>
                            <a href="mailto:halo@bantupilih.com" className="text-orange-600 font-bold hover:underline">
                                halo@bantupilih.com
                            </a>
                            <p className="text-xs text-gray-500 mt-2">(Contoh email, silakan disesuaikan)</p>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-xl">
                            <h3 className="text-xl font-bold text-blue-800 mb-2">📱 Media Sosial</h3>
                            <p className="text-gray-600 mb-4">Ikuti kami untuk update terbaru:</p>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-blue-600 hover:underline flex items-center gap-2">
                                        <span>Instagram</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-blue-600 hover:underline flex items-center gap-2">
                                        <span>Twitter / X</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 border-t pt-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Alamat</h3>
                        <p className="text-gray-600">
                            BantuPilih HQ<br />
                            Indonesia
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
