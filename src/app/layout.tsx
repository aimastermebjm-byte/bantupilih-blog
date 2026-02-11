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
  const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
  const merriweather = Merriweather({
    weight: ['300', '400', '700', '900'],
    subsets: ["latin"],
    variable: '--font-serif'
  });

  export const metadata = {
    title: "BantuPilih - Panduan Belanja & Review Produk Terbaik",
    description: "Website review independen yang membantu Anda memilih produk terbaik. Gadget, Elektronik, dan Kebutuhan Rumah Tangga.",
  };

  export default function RootLayout({
    children,
  }) {
    return (
      <html lang="id" className="scroll-smooth">
        <body className={`${inter.variable} ${merriweather.variable} font-sans antialiased text-gray-900 bg-white`}>
          {children}
        </body>
      </html>
    );
}
