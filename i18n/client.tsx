"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/server";

type I18nContextValue = {
  dictionary: Dictionary;
  locale: Locale;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children, dictionary, locale }: I18nContextValue & { children: React.ReactNode }) {
  return <I18nContext.Provider value={{ dictionary, locale }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider.");
  return value;
}
