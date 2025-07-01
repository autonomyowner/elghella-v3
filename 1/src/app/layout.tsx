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
  title: "الغلة | منتجات طبيعية وخدمات زراعية واستشارية",
  description: "منصة الغلة تقدم منتجات طبيعية وخدمات زراعية واستشارات من خبراء في المجال الزراعي. اكتشف أفضل المنتجات والخدمات الزراعية في الجزائر.",
  openGraph: {
    title: "الغلة | منتجات طبيعية وخدمات زراعية واستشارية",
    description: "منصة الغلة تقدم منتجات طبيعية وخدمات زراعية واستشارات من خبراء في المجال الزراعي. اكتشف أفضل المنتجات والخدمات الزراعية في الجزائر.",
    url: "https://elghella.com/",
    siteName: "الغلة",
    images: [
      {
        url: "/assets/Homepage/hero.webp",
        width: 1200,
        height: 630,
        alt: "منتجات طبيعية وخدمات زراعية واستشارية"
      }
    ],
    locale: "ar_DZ",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "الغلة | منتجات طبيعية وخدمات زراعية واستشارية",
    description: "منصة الغلة تقدم منتجات طبيعية وخدمات زراعية واستشارات من خبراء في المجال الزراعي. اكتشف أفضل المنتجات والخدمات الزراعية في الجزائر.",
    images: ["/assets/Homepage/hero.webp"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <head>
        <meta name="google-site-verification" content="hEE9X_WrwQiLQ2ipXt6dfjIBvVyLqwfq6lf7t6JlSI0" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "الغلة",
          "url": "https://elghella.com/",
          "logo": "/assets/Homepage/logo.svg",
          "description": "منصة الغلة تقدم منتجات طبيعية وخدمات زراعية واستشارات من خبراء في المجال الزراعي."
        }) }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
