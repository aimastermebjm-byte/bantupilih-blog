import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore';
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
    // Reverting to application-level filtering to fix "Missing Index" error immediately
    // Query specifically for published articles using publishedAt
    // This implicitly filters out drafts that don't have this field
    const q = query(
      articlesRef,
      orderBy('publishedAt', 'desc'),
      limit(50)
    );

    const snapshot = await getDocs(q);
    const allArticles = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Fallback for types
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        publishedAt: data.publishedAt?.toDate ? data.publishedAt.toDate() : null,
      } as unknown as Article;
    });

    // Strict filtering: Only show articles with status 'published'
    // This handles cases where drafts still have a publishedAt date
    return allArticles.filter(a => a.status === 'published');
  } catch (error) {
    console.error('[Blog] Error fetching articles (Check Indexes!):', error);
    return [];
  }
}

import CategoryNav from './components/CategoryNav';

// ... (previous imports and helpers) ...

export default async function HomePage() {
  const articles = await getPublishedArticles();

  // Separate Featured Article (First one) & Recent Articles
  const featuredArticle = articles[0];
  const recentArticles = articles.slice(1);

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Brand Header (Logo Only - Minimalist) */}
      <header className="bg-white py-6 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 font-serif">
              <span className="text-gray-900">Bantu</span><span className="text-orange-600">Pilih</span>
              <span className="text-orange-600 text-5xl">.</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1 font-sans font-medium tracking-wider uppercase">Panduan Belanja Independen & Terpercaya</p>
          </Link>
        </div>
      </header>

      {/* 2. Category Navigation (Sticky) */}
      <CategoryNav />

      {/* 3. Hero Featured Article (Magazine Style) */}
      {featuredArticle && (
        <section className="bg-gray-50 py-12 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Image (Left) */}
              <div className="w-full md:w-2/3">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-sm group">
                  {featuredArticle.bannerUrl ? (
                    <Link href={`/artikel/${featuredArticle.slug || featuredArticle.id}`}>
                      <img
                        src={featuredArticle.bannerUrl}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">Featured Image</div>
                  )}
                </div>
              </div>

              {/* Content (Right) */}
              <div className="w-full md:w-1/3 text-center md:text-left">
                <Link href={`/artikel/${featuredArticle.slug || featuredArticle.id}`} className="group">
                  <span className="inline-block mb-4 text-orange-600 font-bold tracking-wider text-xs uppercase border-b-2 border-orange-200 pb-1">
                    {featuredArticle.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif leading-tight mb-4 group-hover:text-orange-700 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-600 mb-6 font-sans text-lg leading-relaxed line-clamp-3">
                    {featuredArticle.excerpt || "Baca review lengkap kami untuk menemukan rekomendasi produk terbaik tahun ini..."}
                  </p>
                  <span className="inline-flex items-center font-bold text-orange-600 border border-orange-200 bg-orange-50 px-6 py-3 rounded-lg hover:bg-orange-600 hover:text-white transition-all">
                    Baca Review Lengkap →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Main Content Area (Sidebar Layout) */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left Column: Latest Reviews */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-2">
              <h3 className="text-2xl font-bold font-serif">Review Terbaru</h3>
              <Link href="/kategori/semua" className="text-orange-600 text-sm font-bold hover:underline">Lihat Semua →</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {recentArticles.map((article) => (
                <Link key={article.id} href={`/artikel/${article.slug || article.id}`} className="group flex flex-col h-full">
                  {/* Image */}
                  <div className="relative aspect-[3/2] mb-4 overflow-hidden rounded-lg bg-gray-100">
                    {article.bannerUrl ? (
                      <img src={article.bannerUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex flex-col flex-grow">
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-2">{article.category}</span>
                    <h4 className="text-xl font-bold text-gray-900 font-serif leading-snug mb-3 group-hover:text-orange-700">
                      {article.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                      {article.excerpt || "Review komprehensif, independen, dan terpercaya..."}
                    </p>
                    <div className="mt-auto text-xs text-gray-400 font-medium">
                      {article.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Sidebar (Sticky) */}
          <aside className="lg:w-1/4 space-y-8">

            {/* About Widget */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h4 className="text-lg font-bold font-serif mb-4">Tentang Kami</h4>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                BantuPilih adalah situs review independen. Kami melakukan riset mendalam agar Anda bisa belanja tanpa ragu.
              </p>
              <Link href="/about" className="text-orange-600 text-sm font-bold hover:underline">Pelajari Misi Kami →</Link>
            </div>

            {/* Trending / Popular (Hardcoded for now / Placeholder) */}
            <div>
              <h4 className="text-lg font-bold font-serif mb-4 border-b border-gray-200 pb-2">Populer Minggu Ini</h4>
              <ul className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex gap-4 group">
                    <span className="text-3xl font-black text-gray-200 font-serif group-hover:text-orange-200">{i}</span>
                    <div className="h-4 bg-gray-100 w-full rounded animate-pulse"></div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter / CTA */}
            <div className="bg-orange-600 text-white p-6 rounded-xl text-center">
              <h4 className="text-lg font-bold font-serif mb-2">Jangan Salah Pilih!</h4>
              <p className="text-sm text-orange-100 mb-4">Dapatkan rekomendasi produk terbaik langsung ke email Anda.</p>
              <button className="w-full bg-white text-orange-600 font-bold py-2 rounded shadow-sm hover:bg-gray-50 transition-colors">
                Langganan Gratis
              </button>
            </div>

          </aside>
        </div>
      </div>

      {/* Simplified Footer */}
      <footer className="bg-black text-white py-12 mt-12 border-t-4 border-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif font-bold mb-6 text-white">BantuPilih.</h2>
          <div className="flex justify-center gap-6 text-sm text-gray-300 mb-8 font-medium">
            <Link href="/about" className="hover:text-white transition-colors">Tentang Kami</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Kontak</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privasi</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
          <p className="text-xs text-gray-500">© 2026 BantuPilih. Independently reviewed.</p>
        </div>
      </footer>
    </main>
  );
}
