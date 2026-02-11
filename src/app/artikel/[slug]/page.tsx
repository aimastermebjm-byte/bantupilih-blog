import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { marked } from 'marked';
import { cache } from 'react';
import StickyCTA from '@/app/components/StickyCTA';
import VerifiedBy from '@/app/components/VerifiedBy';

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

// Types
interface Article {
    id: string;
    title: string;
    slug: string;
    category: string;
    content: string;
    bannerUrl?: string;
    createdAt: Date;
    status: string;
}

// Cached data fetch: Dedupes requests between generateMetadata and ArticlePage
const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
    try {
        // 1. Try to find by 'slug' field
        const articlesRef = collection(db, 'articles');
        const q = query(
            articlesRef,
            where('slug', '==', slug),
            where('status', '==', 'published')
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const docData = snapshot.docs[0];
            const data = docData.data();
            return {
                id: docData.id,
                ...data,
                // SAFETY: Fallback for missing fields to prevent crashes
                content: data.content || '',
                bannerUrl: data.bannerUrl || '',
                createdAt: data.createdAt?.toDate() || new Date(),
            } as Article;
        }

        // 2. If not found by slug, try by document ID (legacy URLs)
        const docRef = doc(db, 'articles', slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().status === 'published') {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                ...data,
                // SAFETY: Fallback for missing fields
                content: data.content || '',
                bannerUrl: data.bannerUrl || '',
                createdAt: data.createdAt?.toDate() || new Date(),
            } as Article;
        }

        return null;
    } catch (error) {
        console.error('[Blog] Error fetching article:', error);
        return null;
    }
});

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        return { title: 'Artikel Tidak Ditemukan | BantuPilih' };
    }

    // Generate description safe handling
    const safeContent = article.content || '';
    const cleanContent = safeContent
        .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, '')
        .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gm, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/<[^>]*>/g, '')
        .split('\n')
        .map(line => line.trim())
        .filter(line =>
            line.length > 50 &&
            !line.startsWith('{') &&
            !line.startsWith('[') &&
            !line.startsWith('"') &&
            !line.includes('{"') &&
            !line.startsWith('#')
        )
        .join(' ');

    const plainText = (cleanContent || article.title).substring(0, 160) + '...';

    return {
        title: article.title,
        description: plainText,
        openGraph: {
            title: article.title,
            description: plainText,
            url: `https://blog-bice-three-80.vercel.app/artikel/${slug}`,
            siteName: 'BantuPilih',
            locale: 'id_ID',
            type: 'article',
            publishedTime: article.createdAt.toISOString(),
            images: article.bannerUrl ? [
                {
                    url: article.bannerUrl,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                }
            ] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: plainText,
            images: article.bannerUrl ? [article.bannerUrl] : [],
        },
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    // Parse Markdown to HTML (HANDLE EMPTY CONTENT SAFELY)
    const htmlContent = await marked.parse(article.content || '');

    // Article JSON-LD schema for SEO
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        datePublished: article.createdAt.toISOString(),
        author: {
            '@type': 'Organization',
            name: 'BantuPilih',
            url: 'https://blog-bice-three-80.vercel.app',
        },
        publisher: {
            '@type': 'Organization',
            name: 'BantuPilih',
            url: 'https://blog-bice-three-80.vercel.app',
        },
        description: (article.content || '').replace(/<[^>]*>/g, '').replace(/[#*`]/g, '').substring(0, 160),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://blog-bice-three-80.vercel.app/artikel/${slug}`,
        },
        ...(article.bannerUrl && {
            image: {
                '@type': 'ImageObject',
                url: article.bannerUrl,
                width: 1200,
                height: 630,
            },
        }),
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Article JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            {/* Header */}
            <header className="hero-gradient text-white py-4">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold hover:text-orange-100 transition-colors">
                        BantuPilih
                    </Link>
                    <Link
                        href="/"
                        className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors"
                    >
                        ← Beranda
                    </Link>
                </div>
            </header>

            {/* Article Hero */}
            <div className="bg-gradient-to-b from-orange-50 to-white py-8">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Breadcrumb */}
                    <nav className="mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Link href="/" className="hover:text-orange-600">Home</Link>
                            <span>/</span>
                            <span className="text-orange-600">{article.category || 'Artikel'}</span>
                        </div>
                    </nav>

                    {/* Article Meta */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm px-4 py-1.5 rounded-full font-medium">
                            {article.category || 'Artikel'}
                        </span>
                        <span className="text-gray-500 text-sm">
                            {article.createdAt.toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </span>
                    </div>

                    {/* Verification Badge */}
                    <VerifiedBy />
                </div>
            </div>

            {/* Article Content */}
            <article className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
                    {/* Article HTML Content */}
                    <div
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </div>

                {/* Share & Actions */}
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all"
                    >
                        ← Lihat Artikel Lainnya
                    </Link>
                </div>
            </article>

            {/* Related Section */}
            <section className="bg-orange-50 py-12 mt-8">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Suka artikel ini?</h2>
                    <p className="text-gray-600 mb-6">Bagikan ke teman atau keluarga Anda!</p>

                    {/* Social Share Buttons */}
                    <div className="flex justify-center gap-4 mb-8">
                        <a
                            href={`https://wa.me/?text=Rekomendasi terbaik: ${article.title} %0A%0A ${`https://blog-bice-three-80.vercel.app/artikel/${slug}`}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 text-white px-6 py-2 rounded-full font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
                        >
                            <span>WhatsApp</span>
                        </a>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${`https://blog-bice-three-80.vercel.app/artikel/${slug}`}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <span>Facebook</span>
                        </a>
                    </div>

                    <Link
                        href="/"
                        className="inline-block border-2 border-orange-500 text-orange-600 px-8 py-2.5 rounded-full font-medium hover:bg-orange-50 transition-all"
                    >
                        Jelajahi Artikel Lain →
                    </Link>
                </div>
            </section>

            {/* Sticky Bottom CTA for Mobile (Only if article has offers) */}
            {/* Sticky Bottom CTA for Mobile (Client Component) */}
            <StickyCTA />

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-center md:text-left">
                            <p className="font-bold text-lg mb-1">BantuPilih</p>
                            <p className="text-gray-400 text-sm">Rekomendasi produk terbaik.</p>
                        </div>

                        <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-400">
                            <Link href="/about" className="hover:text-white transition-colors">Tentang Kami</Link>
                            <Link href="/privacy-policy" className="hover:text-white transition-colors">Provasi</Link>
                            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
                            <Link href="/contact" className="hover:text-white transition-colors">Kontak</Link>
                        </div>

                        <div className="text-gray-500 text-sm">
                            © 2026 BantuPilih
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
