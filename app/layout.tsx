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
  title: "ReelClip — Cut any video into share-ready clips",
  description:
    "Built for creators who publish to Reels, TikTok, Shorts, and beyond. Four cut modes, on-device analysis, review-before-export safety. Free to start.",
  applicationName: "ReelClip",
  keywords: [
    "video cutter",
    "video splitter",
    "reels maker",
    "tiktok editor",
    "shorts",
    "highlights",
    "creator tools",
  ],
  authors: [{ name: "ReelClip" }],
  openGraph: {
    title: "ReelClip — Cut any video into share-ready clips",
    description:
      "Built for creators. Four cut modes. On-device analysis. Review-before-export safety.",
    url: "https://reelclip.app",
    siteName: "ReelClip",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReelClip — Cut any video into share-ready clips",
    description:
      "Built for creators. Four cut modes. On-device analysis. Review-before-export safety.",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
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