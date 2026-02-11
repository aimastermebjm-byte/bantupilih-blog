import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import Link from 'next/link';

// ISR: Revalidate every 60 seconds (good balance of freshness vs performance)
export const revalidate = 60;


// Types
interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  bannerUrl?: string;
  excerpt?: string;
  createdAt: Date;
  status: string;
}

// Fetch published articles from Firebase
async function getPublishedArticles(): Promise<Article[]> {
  try {
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const snapshot = await getDocs(q);
    const allArticles = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Article[];

    return allArticles.filter(a => a.status === 'published');
  } catch (error) {
    console.error('[Blog] Error fetching articles:', error);
    return [];
  }
}

export default async function HomePage() {
  const articles = await getPublishedArticles();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pb-20 pt-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Glowing Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-500/30 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-soft delay-1000"></div>

        <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
          <div className="max-w-4xl mx-auto md:mx-0">
            <span className="inline-block py-1 px-3 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6 animate-fade-in-up">
              Solusi Belanja Cerdas
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight animate-fade-in-up [animation-delay:200ms]">
              Pilih Produk Terbaik <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Tanpa Ragu.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl animate-fade-in-up [animation-delay:400ms] text-balance">
              Riset independen, review jujur, dan perbandingan harga termurah untuk keputusan belanja yang tepat.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-fade-in-up [animation-delay:600ms]">
              <a href="#artikels" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-1">
                Mulai Membaca
              </a>
              <a href="/about" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white font-medium py-3.5 px-8 rounded-full transition-all">
                Tentang Kami
              </a>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <svg viewBox="0 0 1440 100" className="w-full -mb-1">
          <path
            fill="#f8fafc"
            d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
          />
        </svg>
      </header>

      {/* Content */}
      <div id="artikels" className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            <span className="gradient-text">Artikel Terbaru</span>
          </h2>
          <span className="text-gray-500 text-sm">
            {articles.length} artikel
          </span>
        </div>

        {articles.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4 text-gray-300">—</div>
            <p className="text-gray-500 text-lg">Belum ada artikel yang dipublish.</p>
            <p className="text-gray-400 text-sm mt-2">
              Publish artikel dari dashboard untuk menampilkannya di sini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Link
                key={article.id}
                href={`/artikel/${article.slug || article.id}`}
                className="group"
              >
                <article className="article-card h-full">
                  {/* Banner Image */}
                  <div className="article-card-image">
                    {article.bannerUrl ? (
                      <img
                        src={article.bannerUrl}
                        alt={article.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-orange-400">
                        <span className="text-gray-300 text-sm">Artikel Review</span>
                        <span className="text-sm opacity-60">Artikel Review</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {article.category || 'Artikel'}
                      </span>
                      {index === 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Terbaru
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-orange-600 transition-colors line-clamp-2 mb-3">
                      {article.title}
                    </h3>

                    <div className="flex items-center justify-between text-sm">
                      <p className="text-gray-400">
                        {article.createdAt.toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                      <span className="text-orange-500 font-medium group-hover:translate-x-1 transition-transform inline-block">
                        Baca →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Butuh Rekomendasi Produk?</h2>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            Kami review produk secara independen untuk membantu Anda menemukan produk terbaik sesuai budget.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">Review Jujur</span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">Data Akurat</span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">Update Terbaru</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold gradient-text mb-2">BantuPilih</h3>
              <p className="text-gray-400 text-sm">Rekomendasi produk terbaik berdasarkan riset independen.</p>
            </div>

            <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-400">
              <Link href="/about" className="hover:text-white transition-colors">Tentang Kami</Link>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
              <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Kontak</Link>
            </div>

            <div className="text-gray-500 text-sm">
              © 2026 BantuPilih. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main >
  );
}
