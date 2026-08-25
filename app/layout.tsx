import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Providers } from "@/components/providers";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
} from "@/components/structured-data";
import { LOCALES, localeLanguageTag } from "@/i18n/config";
import { localizedPath } from "@/i18n/routing";
import { getDictionary, getRequestLocale } from "@/i18n/server";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://reelclips.app";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { metadata } = await getDictionary(locale);
  const canonical = localizedPath(locale);
  const languages = Object.fromEntries(
    LOCALES.map(({ code }) => [localeLanguageTag(code), localizedPath(code)]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: metadata.title,
    description: metadata.description,
    applicationName: "ReelClip",
    keywords: ["video cutter", "video splitter", "video clip preparation", "reels maker", "tiktok editor", "shorts", "highlights", "creator tools"],
    authors: [{ name: "ReelClip" }],
    icons: {
      icon: [{ url: "/favicon.ico", sizes: "32x32" }, { url: "/icon.png", type: "image/png", sizes: "180x180" }],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      title: metadata.title,
      description: metadata.openGraphDescription,
      url: canonical,
      siteName: "ReelClip",
      type: "website",
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "ReelClip: make good clips, really" }],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.openGraphDescription,
      images: ["/opengraph-image.png"],
    },
    alternates: { canonical, languages },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  return (
    <html lang={localeLanguageTag(locale)} className={`${inter.variable} h-full antialiased`}>
      <head>
        <Script
          data-website-id="dfid_ftGSKdpvLUh6r1l4TP9qs"
          data-domain="www.reelclips.app"
          src="https://datafa.st/js/script.js"
          strategy="afterInteractive"
        />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
