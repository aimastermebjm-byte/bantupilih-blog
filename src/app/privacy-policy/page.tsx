import Link from 'next/link';

export const metadata = {
    title: 'Kebijakan Privasi | BantuPilih',
    description: 'Kebijakan privasi BantuPilih mengenai penggunaan data pengunjung.',
};

export default function PrivacyPolicyPage() {
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
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Kebijakan Privasi</h1>

                <div className="prose prose-orange max-w-none bg-white p-8 rounded-2xl shadow-sm">
                    <p className="text-sm text-gray-500 mb-6">Terakhir diperbarui: 10 Februari 2026</p>

                    <p className="mb-4">
                        Di BantuPilih, privasi pengunjung adalah prioritas yang sangat penting bagi kami. Dokumen Kebijakan Privasi ini menguraikan jenis informasi pribadi yang diterima dan dikumpulkan oleh BantuPilih dan bagaimana informasi tersebut digunakan.
                    </p>

                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-3">Log Files</h2>
                    <p className="mb-4">
                        Seperti banyak situs Web lain, BantuPilih menggunakan file log. Informasi dalam file log meliputi alamat protokol internet (IP), jenis browser, Penyedia Layanan Internet (ISP), stempel tanggal/waktu, halaman rujukan/keluar, dan jumlah klik untuk menganalisis tren, mengelola situs, melacak pergerakan pengguna di sekitar lokasi, dan mengumpulkan informasi demografis. Alamat IP dan informasi lain tersebut tidak terkait dengan informasi apa pun yang dapat diidentifikasi secara pribadi.
                    </p>

                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-3">Cookies dan Web Beacon</h2>
                    <p className="mb-4">
                        BantuPilih menggunakan cookies untuk menyimpan informasi tentang preferensi pengunjung, merekam informasi pengguna tertentu pada halaman mana yang diakses atau dikunjungi pengguna, menyesuaikan konten halaman Web berdasarkan jenis browser pengunjung atau informasi lain yang dikirimkan pengunjung melalui browser mereka.
                    </p>

                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-3">Mitra Iklan & Afiliasi</h2>
                    <p className="mb-4">
                        Beberapa mitra iklan atau afiliasi kami mungkin menggunakan cookies dan web beacon di situs kami. Mitra iklan kami meliputi Shopee, Tokopedia, dan platform e-commerce lainnya.
                    </p>
                    <p className="mb-4">
                        Server-server iklan atau jaringan iklan pihak ketiga ini menggunakan teknologi untuk iklan dan tautan masing-masing yang muncul di BantuPilih dikirim langsung ke browser Anda. Mereka secara otomatis menerima alamat IP Anda saat ini terjadi. Teknologi lain (seperti cookies, JavaScript, atau Web Beacon) juga dapat digunakan oleh jaringan iklan pihak ketiga situs kami untuk mengukur efektivitas kampanye iklan mereka dan/atau untuk mempersonalisasi konten iklan yang Anda lihat di situs.
                    </p>
                    <p className="mb-4">
                        BantuPilih tidak memiliki akses otorisasi atau kontrol terhadap cookies yang digunakan oleh pengiklan pihak ketiga.
                    </p>

                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-3">Persetujuan</h2>
                    <p className="mb-4">
                        Dengan menggunakan situs web kami, Anda dengan ini menyetujui kebijakan privasi kami dan menyetujui ketentuan-ketentuannya.
                    </p>
                </div>
            </div>
        </main>
    );
}
