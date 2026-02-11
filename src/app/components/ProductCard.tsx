import Link from 'next/link';

interface ProductCardProps {
    title: string;
    image?: string;
    rating?: number;
    price?: string;
    storeName?: string;
    link: string;
    pros?: string[];
    cons?: string[];
}

export default function ProductCard({
    title,
    image,
    rating = 4.5,
    price,
    storeName = 'Shopee',
    link,
    pros = [],
    cons = []
}: ProductCardProps) {
    return (
        <div className="my-8 bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
            {/* Header / Badge */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-2 text-center uppercase tracking-wider">
                Rekomendasi Terbaik
            </div>

            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Image Section */}
                <div className="w-full md:w-1/3 shrink-0">
                    <div className="aspect-square bg-white rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center p-4">
                        {image ? (
                            <img
                                src={image}
                                alt={title}
                                className="object-contain w-full h-full hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <div className="text-gray-300 text-sm">No Image</div>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 w-full">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 leading-tight">
                        {title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-yellow-100 text-yellow-800 text-sm font-bold px-2.5 py-0.5 rounded">{rating}/5</span>
                        <span className="text-gray-400 text-sm">Rating</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                        {/* Pros */}
                        {pros.length > 0 && (
                            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                <span className="font-bold text-green-700 block mb-2">Kelebihan</span>
                                <ul className="space-y-1">
                                    {pros.map((pro, idx) => (
                                        <li key={idx} className="text-green-800 flex items-start gap-2">
                                            <span>•</span> {pro}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Cons */}
                        {cons.length > 0 && (
                            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                <span className="font-bold text-red-700 block mb-2">Kekurangan</span>
                                <ul className="space-y-1">
                                    {cons.map((con, idx) => (
                                        <li key={idx} className="text-red-800 flex items-start gap-2">
                                            <span>•</span> {con}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                        <div>
                            <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Harga Mulai</p>
                            <p className="text-2xl font-bold text-gray-900">{price || 'Cek Link'}</p>
                        </div>
                        <Link
                            href={link}
                            target="_blank"
                            className="w-full sm:w-auto text-center bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Beli di {storeName} →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
