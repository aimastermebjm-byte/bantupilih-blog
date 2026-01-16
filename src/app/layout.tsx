import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | BantuPilih',
    default: 'BantuPilih - Rekomendasi Produk Terbaik',
  },
  description: 'Temukan rekomendasi produk terbaik berdasarkan riset independen. Review jujur, perbandingan harga, dan spesifikasi lengkap.',
  metadataBase: new URL('https://blog-bice-three-80.vercel.app'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
