'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function CategoryNav() {
    const [categories, setCategories] = useState<{ name: string; slug: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const q = query(collection(db, 'categories'), orderBy('name', 'asc'));
                const snapshot = await getDocs(q);

                const loadedCategories = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const name = data.name;
                    // Simple slug generation
                    const slug = name.toLowerCase().replace(/\s+/g, '-');
                    return { name, slug };
                });

                if (loadedCategories.length > 0) {
                    setCategories(loadedCategories);
                } else {
                    // Fallback defaults if empty
                    setCategories([
                        { name: 'Elektronik', slug: 'elektronik' },
                        { name: 'Rumah Tangga', slug: 'rumah-tangga' },
                        { name: 'Kesehatan', slug: 'kesehatan' },
                        { name: 'Hobi', slug: 'hobi' },
                        { name: 'Travel', slug: 'travel' },
                        { name: 'Otomotif', slug: 'otomotif' },
                    ]);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                // Fallback on error
                setCategories([
                    { name: 'Elektronik', slug: 'elektronik' },
                    { name: 'Rumah Tangga', slug: 'rumah-tangga' },
                    { name: 'Kesehatan', slug: 'kesehatan' },
                    { name: 'Hobi', slug: 'hobi' },
                    { name: 'Travel', slug: 'travel' },
                    { name: 'Otomotif', slug: 'otomotif' },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <nav className="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm overflow-x-auto">
            <div className="container mx-auto px-4">
                <ul className="flex items-center gap-6 md:gap-8 whitespace-nowrap overflow-x-auto no-scrollbar py-3 md:justify-center text-sm font-medium text-gray-600">
                    {/* Home Icon */}
                    <li>
                        <Link href="/" className="hover:text-orange-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                                <path d="m8 3.293 6 6V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V9.293l6-6Z" />
                            </svg>
                        </Link>
                    </li>

                    {/* Populer Link (Static) */}
                    <li>
                        <Link href="/#populer" className="hover:text-orange-600 transition-colors uppercase tracking-wide text-xs md:text-sm font-bold">
                            Populer
                        </Link>
                    </li>

                    {/* Dynamic Categories */}
                    {loading ? (
                        // Skeleton / Loading State
                        [1, 2, 3, 4, 5].map(i => (
                            <li key={i} className="animate-pulse bg-gray-200 h-4 w-16 rounded"></li>
                        ))
                    ) : (
                        categories.map((cat) => (
                            <li key={cat.slug}>
                                <Link
                                    href={`/kategori/${cat.slug}`}
                                    className="hover:text-orange-600 transition-colors uppercase tracking-wide text-xs md:text-sm font-bold"
                                >
                                    {cat.name}
                                </Link>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </nav>
    );
}
