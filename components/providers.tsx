"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { I18nProvider } from "@/i18n/client";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/server";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

export function Providers({
  children,
  dictionary,
  locale,
}: {
  children: ReactNode;
  dictionary: Dictionary;
  locale: Locale;
}) {
  return (
    <ConvexProvider client={convex}>
      <I18nProvider dictionary={dictionary} locale={locale}>{children}</I18nProvider>
    </ConvexProvider>
  );
}
