import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '../../components/Footer';

// ISR: Revalidate every 60 seconds
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
    publishedAt?: Date | null;
}

// Helper to normalize category strings for comparison
// e.g. "Kipas Angin" -> "kipas-angin"
const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
};

// Fetch published articles (Reusing robust logic from HomePage)
async function getPublishedArticles(): Promise<Article[]> {
    try {
        const articlesRef = collection(db, 'articles');
        const q = query(
            articlesRef,
            orderBy('publishedAt', 'desc'),
            limit(100) // Increased limit to ensure we find category items
        );

        const snapshot = await getDocs(q);
        const allArticles = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
                publishedAt: data.publishedAt?.toDate ? data.publishedAt.toDate() : null,
            } as unknown as Article;
        });

        return allArticles.filter(a => a.status === 'published');
    } catch (error) {
        console.error('[Category] Error fetching articles:', error);
        return [];
    }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const articles = await getPublishedArticles();

    // Filter articles matching the category slug
    const categoryArticles = articles.filter(article =>
        slugify(article.category) === slug
    );

    // Get readable category name from the first found article, or format the slug
    const categoryName = categoryArticles.length > 0
        ? categoryArticles[0].category
        : slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    if (categoryArticles.length === 0) {
        // Optionally return 404 or show empty state
        // notFound(); 
        // For now showing empty state is better UX than 404
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 overflow-hidden relative pt-24 pb-12">
                <div className="absolute inset-0 bg-grid-pattern opacity-60 z-0 pointer-events-none" />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-4">
                        Kategori
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        {categoryName}
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Kumpulan artikel dan rekomendasi terbaik seputar {categoryName}.
                    </p>
                </div>
            </header>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-orange-600 font-medium">{categoryName}</span>
                </nav>

                {categoryArticles.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                        <div className="text-6xl mb-4">📂</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada artikel</h3>
                        <p className="text-gray-500 mb-6">Artikel untuk kategori ini belum tersedia atau belum dipublish.</p>
                        <Link href="/" className="inline-flex bg-orange-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-orange-700 transition-colors">
                            Kembali ke Home
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categoryArticles.map((article, index) => (
                            <Link
                                key={article.id}
                                href={`/artikel/${article.slug || article.id}`}
                                className="group"
                            >
                                <article className="article-card h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    {/* Banner Image - Reusing the Premium Blur Style */}
                                    <div className="article-card-image relative overflow-hidden bg-gray-100 aspect-video">
                                        {/* Backdrop Blur */}
                                        {article.bannerUrl && (
                                            <div
                                                className="absolute inset-0 bg-cover bg-center blur-2xl opacity-50 scale-125 transition-transform duration-700 group-hover:scale-150"
                                                style={{ backgroundImage: `url("${article.bannerUrl}")` }}
                                            />
                                        )}

                                        {/* Main Image */}
                                        {article.bannerUrl ? (
                                            <img
                                                src={article.bannerUrl}
                                                alt={article.title}
                                                loading="lazy"
                                                className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-orange-400 w-full h-full relative z-10">
                                                <span className="text-4xl mb-2">🖼️</span>
                                                <span className="text-sm opacity-60">No Image</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="bg-orange-50 text-orange-600 text-xs px-2.5 py-1 rounded-full font-bold border border-orange-100">
                                                {article.category}
                                            </span>
                                            <span className="text-gray-400 text-xs">
                                                {article.createdAt.toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>

                                        <h3 className="font-bold text-gray-800 text-lg mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                            {article.title}
                                        </h3>

                                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                                            <span className="text-sm text-gray-400">
                                                Oleh <strong>BantuPilih</strong>
                                            </span>
                                            <span className="text-orange-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                                                Baca Review →
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
