import Link from 'next/link';

export const metadata = {
    title: 'Disclaimer | BantuPilih',
    description: 'Disclaimer afiliasi dan penggunaan informasi di BantuPilih.',
};

export default function DisclaimerPage() {
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
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Disclaimer</h1>

                <div className="prose prose-orange max-w-none bg-white p-8 rounded-2xl shadow-sm">

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                        <h3 className="text-lg font-bold text-yellow-800 mb-2">Pernyataan Afiliasi (Penting)</h3>
                        <p className="text-yellow-700">
                            Beberapa tautan (link) di situs ini adalah <strong>tautan afiliasi</strong>. Artinya, jika Anda mengklik tautan tersebut dan melakukan pembelian, kami mungkin menerima komisi kecil dari penjual <strong>tanpa biaya tambahan bagi Anda</strong>.
                        </p>
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-3">Independensi Redaksional</h2>
                    <p className="mb-4">
                        Komisi afiliasi membantu kami mempertahankan operasional situs ini, namun hal tersebut <strong>tidak mempengaruhi</strong> penilaian, ulasan, atau rekomendasi kami. Kami tetap berkomitmen untuk memberikan ulasan yang jujur, objektif, dan bermanfaat bagi pembaca. Produk yang kami rekomendasikan adalah produk yang kami yakini berkualitas, terlepas dari potensi komisi.
                    </p>

                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-3">Akurasi Informasi</h2>
                    <p className="mb-4">
                        Semua informasi di situs web ini diterbitkan dengan itikad baik dan untuk tujuan informasi umum saja. BantuPilih tidak memberikan jaminan apa pun tentang kelengkapan, keandalan, dan keakuratan informasi ini. Segala tindakan yang Anda ambil atas informasi yang Anda temukan di situs web ini (BantuPilih), sepenuhnya merupakan risiko Anda sendiri.
                    </p>
                    <p className="mb-4">
                        Harga dan ketersediaan produk dapat berubah sewaktu-waktu sesuai kebijakan penjual di marketplace terkait (Shopee, Tokopedia, dll). Kami selalu berusaha menyajikan data terupdate, namun perbedaan harga mungkin terjadi.
                    </p>

                </div>
            </div>
        </main>
    );
}
