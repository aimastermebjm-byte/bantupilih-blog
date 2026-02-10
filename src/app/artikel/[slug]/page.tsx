import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { marked } from 'marked';

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

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        return { title: 'Artikel Tidak Ditemukan | BantuPilih' };
    }

    // Generate description: Find first paragraph that is NOT json/code
    // Generate description: Find first paragraph that is NOT json/code
    const cleanContent = article.content
        .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, '') // Remove script blocks completely
        .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gm, '') // Remove style blocks completely
        .replace(/```[\s\S]*?```/g, '') // remove code blocks
        .replace(/<[^>]*>/g, '') // remove remaining html tags
        .split('\n') // split by lines
        .map(line => line.trim())
        .filter(line =>
            line.length > 50 && // Must be substantive
            !line.startsWith('{') && // Not JSON
            !line.startsWith('[') && // Not Array
            !line.startsWith('"') && // Not quoted string
            !line.includes('{"') &&  // Not inline JSON
            !line.startsWith('#') // Not heading
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

// Fetch article by slug
async function getArticleBySlug(slug: string): Promise<Article | null> {
    try {
        // Try to find by slug field first
        const articlesRef = collection(db, 'articles');
        const q = query(
            articlesRef,
            where('slug', '==', slug),
            where('status', '==', 'published')
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const docData = snapshot.docs[0];
            return {
                id: docData.id,
                ...docData.data(),
                createdAt: docData.data().createdAt?.toDate() || new Date(),
            } as Article;
        }

        // If not found by slug, try by document ID
        const docRef = doc(db, 'articles', slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().status === 'published') {
            return {
                id: docSnap.id,
                ...docSnap.data(),
                createdAt: docSnap.data().createdAt?.toDate() || new Date(),
            } as Article;
        }

        return null;
    } catch (error) {
        console.error('Error fetching article:', error);
        return null;
    }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    // Parse Markdown to HTML
    const htmlContent = await marked.parse(article.content);

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
        description: article.content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '').substring(0, 160),
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
                            📅 {article.createdAt.toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </span>
                    </div>
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
                    <p className="text-gray-600 mb-6">Temukan rekomendasi produk terbaik lainnya di BantuPilih</p>
                    <Link
                        href="/"
                        className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all"
                    >
                        Jelajahi Semua Artikel →
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-400">© 2026 BantuPilih. All rights reserved.</p>
                    <p className="text-gray-500 text-sm mt-2">Rekomendasi produk terbaik berdasarkan riset independen.</p>
                </div>
            </footer>
        </main>
    );
}
