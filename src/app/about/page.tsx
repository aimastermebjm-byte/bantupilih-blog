import Link from 'next/link';

export const metadata = {
    title: 'Tentang Kami | BantuPilih',
    description: 'Misi BantuPilih dalam membantu Anda menemukan produk terbaik dengan review jujur dan independen.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
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
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Tentang Kami</h1>

                <div className="prose prose-orange max-w-none bg-white p-8 rounded-2xl shadow-sm">
                    <p className="lead text-xl text-gray-600 mb-6">
                        Selamat datang di <strong>BantuPilih</strong>, sahabat belanja cerdas Anda.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Misi Kami</h2>
                    <p className="mb-4">
                        Di era digital ini, pilihan produk begitu melimpah hingga seringkali membuat bingung. Misi kami sederhana: <strong>Membantu Anda memilih produk terbaik tanpa pusing.</strong>
                    </p>
                    <p className="mb-6">
                        Kami melakukan riset mendalam, membandingkan spesifikasi, membaca ribuan review pengguna, dan merangkumnya menjadi rekomendasi yang mudah dipahami.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Kenapa Memilih Kami?</h2>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Independen:</strong> Review kami objektif dan tidak dibayar oleh brand tertentu untuk berbohong.</li>
                        <li><strong>Hemat Waktu:</strong> Anda tidak perlu menghabiskan berjam-jam riset sendiri.</li>
                        <li><strong>Terpercaya:</strong> Kami hanya merekomendasikan produk yang benar-benar layak beli.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Bagaimana Kami Bekerja?</h2>
                    <p className="mb-6">
                        Tim kami memantau tren pasar, menganalisis produk populer, dan mencari "hidden gem" yang mungkin terlewatkan. Kami memprioritaskan kualitas, daya tahan, dan <em>value for money</em>.
                    </p>

                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mt-8">
                        <p className="text-gray-700 italic">
                            "BantuPilih hadir karena kami percaya setiap orang berhak mendapatkan produk terbaik untuk uang yang mereka keluarkan."
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-400">© 2026 BantuPilih. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
