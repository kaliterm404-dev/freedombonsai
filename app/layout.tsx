import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreedomBonsai — Movimento di Liberazione dei Bonsai",
  description: "FreedomBonsai è un movimento di liberazione. Acquistiamo bonsai e li restituiamo alla terra, dove potranno crescere liberi e spontanei. Adotta un bonsai.",
  keywords: ["freedombonsai", "freedom bonsai", "liberazione bonsai", "adotta bonsai", "bonsai liberi", "salvare bonsai", "bonsai tortura", "piccolo principe bonsai"],
  authors: [{ name: "FreedomBonsai" }],
  openGraph: {
    title: "FreedomBonsai — Movimento di Liberazione dei Bonsai",
    description: "Insieme possiamo cambiare la realtà dei bonsai. Adotta un bonsai e restituiscilo alla terra.",
    url: "https://freedombonsai.com",
    siteName: "FreedomBonsai",
    type: "website",
    locale: "it_IT",
    images: [{ url: "https://freedombonsai.com/bonsai-hero.png", width: 1024, height: 1024, alt: "FreedomBonsai — Bonsai che si libera dalle catene dorate" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FreedomBonsai — Movimento di Liberazione",
    description: "Acquistiamo bonsai e li restituiamo alla terra. Adotta un bonsai.",
    images: ["https://freedombonsai.com/bonsai-hero.png"],
  },
  verification: {
    google: "7Y0_k7UFF7zb1nZFJYjpVFtozexRqVCdtTYMeqIExD8",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://freedombonsai.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full w-full bg-[#0a0a0a] text-white">{children}<Analytics /></body>
    </html>
  );
}
