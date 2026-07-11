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
  title: "Reelclip - make good clips, Really",
  description:
    "Cut any video into share-ready clips. On-device by default. Built for creators who publish to Reels, TikTok, and Shorts. Reelclip - make good clips, Really.",
  applicationName: "Reelclip",
  keywords: [
    "video cutter",
    "video splitter",
    "reels maker",
    "tiktok editor",
    "shorts",
    "highlights",
    "creator tools",
  ],
  authors: [{ name: "Reelclip" }],
  openGraph: {
    title: "Reelclip - make good clips, Really",
    description:
      "Cut any video into share-ready clips. On-device by default. Built for creators who publish to Reels, TikTok, and Shorts.",
    url: "https://reelclip.app",
    siteName: "Reelclip",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reelclip - make good clips, Really",
    description:
      "Cut any video into share-ready clips. On-device by default. Built for creators who publish to Reels, TikTok, and Shorts.",
  },
  icons: {
    icon: "/logomark.png",
    apple: "/logomark.png",
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