import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

interface ArticleDoc {
    slug?: string;
    status: string;
    createdAt?: { toDate: () => Date };
    updatedAt?: { toDate: () => Date };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://blog-bice-three-80.vercel.app';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
    ];

    // Dynamic article pages from Firebase
    try {
        const articlesRef = collection(db, 'articles');
        const q = query(articlesRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        const articlePages: MetadataRoute.Sitemap = snapshot.docs
            .filter(doc => {
                const data = doc.data() as ArticleDoc;
                return data.status === 'published';
            })
            .map(doc => {
                const data = doc.data() as ArticleDoc;
                const slug = data.slug || doc.id;
                const lastMod = data.updatedAt?.toDate() || data.createdAt?.toDate() || new Date();

                return {
                    url: `${baseUrl}/artikel/${slug}`,
                    lastModified: lastMod,
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                };
            });

        return [...staticPages, ...articlePages];
    } catch (error) {
        console.error('[Sitemap] Error fetching articles:', error);
        return staticPages;
    }
}
