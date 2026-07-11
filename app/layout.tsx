import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReelClips — make good clips, Really",
  description:
    "Cut any video into share-ready clips. On-device by default. Built for creators who publish to Reels, TikTok, and Shorts. ReelClips — make good clips, Really.",
  applicationName: "ReelClips",
  keywords: [
    "video cutter",
    "video splitter",
    "reels maker",
    "tiktok editor",
    "shorts",
    "highlights",
    "creator tools",
  ],
  authors: [{ name: "ReelClips" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "180x180" }
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" }
    ],
  },
  openGraph: {
    title: "ReelClips — make good clips, Really",
    description: "Cut any video into share-ready clips. On-device by default. Built for creators who publish to Reels, TikTok, and Shorts.",
    url: "https://reelclips.app",
    siteName: "ReelClips",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ReelClips — make good clips, Really",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReelClips — make good clips, Really",
    description: "Cut any video into share-ready clips. On-device by default. Built for creators who publish to Reels, TikTok, and Shorts.",
    images: ["/opengraph-image.png"],
  },
  // Canonical URL — also referenced when setting the App Store Connect
  // privacy policy URL (App → App Information → Privacy Policy) to
  // https://reelclips.app/privacy.
  alternates: {
    canonical: "https://reelclips.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}