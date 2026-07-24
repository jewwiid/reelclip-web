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
  title: "ReelClip: prep long footage for your next edit",
  description:
    "Cut long footage into smaller clips, export to Photos, then create with CapCut, YouTube Shorts, or any editor you like.",
  applicationName: "ReelClip",
  keywords: [
    "video cutter",
    "video splitter",
    "video clip preparation",
    "reels maker",
    "tiktok editor",
    "shorts",
    "highlights",
    "creator tools",
  ],
  authors: [{ name: "ReelClip" }],
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
    title: "ReelClip: prep long footage for your next edit",
    description: "Cut long footage into smaller clips, export to Photos, then create in the editor you already use.",
    url: "https://reelclips.app",
    siteName: "ReelClip",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ReelClip: make good clips, really",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReelClip: prep long footage for your next edit",
    description: "Cut long footage into smaller clips, export to Photos, then create in the editor you already use.",
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
