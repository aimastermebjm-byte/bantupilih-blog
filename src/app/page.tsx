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
import Footer from './components/Footer';

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

      {/* 4. Main Content Area (Wirecutter Style Grid) */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* LEFT COLUMN: THE LATEST (25%) */}
          <div className="lg:col-span-1 border-r border-gray-100 pr-0 lg:pr-8">
            <div className="sticky top-24">
              <h3 className="text-xl font-bold font-serif mb-6 border-b-2 border-black pb-2">Terbaru</h3>
              <div className="flex flex-col gap-6">
                {recentArticles.slice(0, 5).map((article) => (
                  <Link key={article.id} href={`/artikel/${article.slug || article.id}`} className="group block">
                    <span className="text-xs text-gray-400 block mb-1">
                      {article.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                    <h4 className="text-base font-medium text-gray-900 leading-snug group-hover:text-orange-600 transition-colors">
                      {article.title}
                    </h4>
                  </Link>
                ))}
                <Link href="/kategori/semua" className="text-sm font-bold text-orange-600 hover:underline mt-2 inline-block">
                  Lihat Semua Terbaru →
                </Link>
              </div>
            </div>
          </div>

          {/* CENTER COOLUMN: FEATURED / POPULAR CATEGORIES (50%) */}
          <div className="lg:col-span-2">
            {/* Big Hero Featured (If valid) */}
            {featuredArticle && (
              <div className="mb-12">
                <Link href={`/artikel/${featuredArticle.slug || featuredArticle.id}`} className="group block mb-4">
                  <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden mb-4">
                    {featuredArticle.bannerUrl && (
                      <img src={featuredArticle.bannerUrl} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <span className="text-orange-600 font-bold text-xs uppercase tracking-wider mb-2 block">{featuredArticle.category}</span>
                  <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 leading-tight mb-3 group-hover:text-orange-600 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {featuredArticle.excerpt || "Baca review lengkap dan mendalam kami..."}
                  </p>
                </Link>
              </div>
            )}

            {/* Category Sections (Stacked) */}
            <div className="space-y-12 pt-8 border-t border-gray-200">

              {/* 1. ELEKTRONIK SECTION */}
              <section>
                <div className="flex items-center justify-between mb-6 border-b-4 border-black pb-2">
                  <h3 className="text-2xl font-black font-serif tracking-tight">Elektronik</h3>
                  <Link href="/kategori/elektronik" className="text-sm font-bold text-gray-500 hover:text-orange-600">Lihat Semua →</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {articles.filter(a => a.category?.toLowerCase() === 'elektronik').slice(0, 4).map((article) => (
                    <Link key={article.id} href={`/artikel/${article.slug || article.id}`} className="group">
                      <div className="aspect-[3/2] bg-gray-100 rounded mb-3 overflow-hidden">
                        {article.bannerUrl && <img src={article.bannerUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />}
                      </div>
                      <h4 className="font-bold text-lg leading-snug text-gray-900 group-hover:text-orange-600 font-serif">
                        {article.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{article.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </section>

              {/* 2. FASHION / LIFESTYLE SECTION */}
              <section>
                <div className="flex items-center justify-between mb-6 border-b-4 border-black pb-2">
                  <h3 className="text-2xl font-black font-serif tracking-tight">Fashion & Lifestyle</h3>
                  <Link href="/kategori/fashion" className="text-sm font-bold text-gray-500 hover:text-orange-600">Lihat Semua →</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {articles.filter(a => a.category?.toLowerCase() === 'fashion' || a.category?.toLowerCase() === 'lifestyle').slice(0, 4).map((article) => (
                    <Link key={article.id} href={`/artikel/${article.slug || article.id}`} className="group">
                      <div className="aspect-[3/2] bg-gray-100 rounded mb-3 overflow-hidden">
                        {article.bannerUrl && <img src={article.bannerUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />}
                      </div>
                      <h4 className="font-bold text-lg leading-snug text-gray-900 group-hover:text-orange-600 font-serif">
                        {article.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </section>

              {/* 3. HOME & LIVING SECTION */}
              <section>
                <div className="flex items-center justify-between mb-6 border-b-4 border-black pb-2">
                  <h3 className="text-2xl font-black font-serif tracking-tight">Rumah Tangga</h3>
                  <Link href="/kategori/rumah-tangga" className="text-sm font-bold text-gray-500 hover:text-orange-600">Lihat Semua →</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {articles.filter(a => a.category?.toLowerCase() === 'rumah tangga' || a.category?.toLowerCase() === 'home').slice(0, 4).map((article) => (
                    <Link key={article.id} href={`/artikel/${article.slug || article.id}`} className="group">
                      <div className="aspect-[3/2] bg-gray-100 rounded mb-3 overflow-hidden">
                        {article.bannerUrl && <img src={article.bannerUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />}
                      </div>
                      <h4 className="font-bold text-lg leading-snug text-gray-900 group-hover:text-orange-600 font-serif">
                        {article.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </section>

            </div>
          </div>

          {/* RIGHT COLUMN: POPULAR / DEALS (25%) */}
          <aside className="lg:col-span-1 border-l border-gray-100 pl-0 lg:pl-8">
            <div className="sticky top-24 space-y-10">
              {/* Popular Widget */}
              <div>
                <h4 className="text-lg font-bold font-serif mb-4 border-b border-gray-200 pb-2">Populer</h4>
                <ul className="space-y-4">
                  {/* Placeholder for popular items (using recent for now to fill) */}
                  {articles.slice(0, 4).map((article, i) => (
                    <li key={article.id} className="group">
                      <Link href={`/artikel/${article.slug || article.id}`} className="flex gap-4 items-start">
                        <span className="text-3xl font-black text-gray-200 font-serif -mt-2 group-hover:text-orange-200">{i + 1}</span>
                        <h5 className="text-sm font-medium text-gray-700 leading-snug group-hover:text-orange-600">
                          {article.title}
                        </h5>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter Box */}
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 text-center">
                <h4 className="font-bold text-gray-900 mb-2">Jangan Sampai Salah Beli!</h4>
                <p className="text-xs text-gray-600 mb-4">Dapatkan panduan belanja terpilih setiap minggu.</p>
                <button className="w-full bg-orange-600 text-white text-sm font-bold py-2 rounded hover:bg-orange-700 transition">
                  Langganan Gratis
                </button>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Shared Footer */}
      <Footer />
    </main>
  );
}
