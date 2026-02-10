import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | BantuPilih',
    default: 'BantuPilih - Rekomendasi Produk Terbaik',
  },
  description: 'Temukan rekomendasi produk terbaik berdasarkan riset independen. Review jujur, perbandingan harga, dan spesifikasi lengkap untuk membantu Anda memilih produk yang tepat.',
  metadataBase: new URL('https://blog-bice-three-80.vercel.app'),
  keywords: ['rekomendasi produk', 'review produk', 'perbandingan harga', 'produk terbaik', 'BantuPilih'],
  authors: [{ name: 'BantuPilih' }],
  creator: 'BantuPilih',
  publisher: 'BantuPilih',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'BantuPilih',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
