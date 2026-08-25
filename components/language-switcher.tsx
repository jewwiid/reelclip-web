"use client";

import { useState } from "react";
import { LOCALES, type Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/routing";

export function LanguageSwitcher({
  locale,
  label,
  selectLabel
}: {
  locale: Locale;
  label: string;
  selectLabel: string;
}) {
  const [isChanging, setIsChanging] = useState(false);

  function changeLanguage(nextLocale: Locale) {
    if (nextLocale === locale) return;
    setIsChanging(true);
    const path = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    window.location.assign(switchLocalePath(path, nextLocale));
  }

  return (
    <label className="relative flex items-center">
      <span className="sr-only">{label}</span>
      <select
        aria-label={selectLabel}
        value={locale}
        disabled={isChanging}
        onChange={(event) => changeLanguage(event.target.value as Locale)}
        className="h-9 max-w-36 cursor-pointer appearance-none rounded-full border border-hairline bg-surface py-1 pl-3 pr-8 text-xs font-semibold text-text transition hover:border-accent/50 focus:border-accent focus:outline-none disabled:cursor-wait disabled:opacity-70"
      >
        {LOCALES.map((option) => (
          <option key={option.code} value={option.code}>
            {option.nativeName}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-text-muted"
      >
        <path d="m5 7 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </label>
  );
}
