import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google"; // Import fonts correctly
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ["latin"],
  variable: '--font-serif'
});

export const metadata: Metadata = {
  title: "BantuPilih - Panduan Belanja & Review Produk Terbaik",
  description: "Website review independen yang membantu Anda memilih produk terbaik. Gadget, Elektronik, dan Kebutuhan Rumah Tangga.",
  metadataBase: new URL('https://blog-bice-three-80.vercel.app'),
  keywords: ['rekomendasi produk', 'review produk', 'perbandingan harga', 'produk terbaik', 'BantuPilih'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} ${merriweather.variable} font-sans antialiased text-gray-900 bg-white`}>
        {children}
      </body>
    </html>
  );
}
