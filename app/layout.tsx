import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteAnalytics } from "@/components/site-analytics";
import { Providers } from "@/components/providers";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
} from "@/components/structured-data";
import { localeLanguageTag } from "@/i18n/config";
import { localizedMetadata, SITE_URL } from "@/i18n/seo";
import { getDictionary, getRequestLocale } from "@/i18n/server";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { metadata } = await getDictionary(locale);

  return localizedMetadata(locale, "/", {
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
      url: "/",
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
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const dictionary = await getDictionary(locale);
  return (
    <html lang={localeLanguageTag(locale)} className={`${inter.variable} h-full antialiased`}>
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <SiteAnalytics />
        <Providers dictionary={dictionary} locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
