"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const APP_STORE_URL = "https://apps.apple.com/app/reelclip/id6787742864";

const NAV_LINKS = [
  { href: "/#modes", label: "Modes" },
  { href: "/#safety", label: "Why ReelClip" },
  { href: "/#for", label: "For creators" },
  { href: "/competitors", label: "Compare" },
  { href: "/pricing", label: "Pricing" },
  { href: "/account", label: "Account" },
] as const;

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <nav className="relative z-20 border-b border-hairline bg-bg/95 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10 lg:py-5">
        <Link href="/" onClick={closeMenu} className="flex shrink-0 items-center group">
          <Image
            src="/wordmark.png"
            alt="ReelClip"
            width={140}
            height={40}
            priority
            className="h-8 w-auto transition-opacity group-hover:opacity-90 lg:h-9"
          />
        </Link>

        <div className="hidden items-center gap-5 text-[13px] text-text-muted lg:flex xl:gap-7 xl:text-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap transition hover:text-text"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            data-event-name="download_click_nav"
            className="whitespace-nowrap rounded-full bg-accent px-4 py-2 font-semibold text-bg transition hover:bg-accent-deep"
          >
            Download
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            data-event-name="download_click_nav_mobile"
            className="rounded-full bg-accent px-3.5 py-2 text-sm font-semibold text-bg transition hover:bg-accent-deep"
          >
            Get app
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-text transition hover:border-accent/50 hover:text-accent"
          >
            <span className="sr-only">Menu</span>
            <span
              aria-hidden="true"
              className={`absolute h-0.5 w-4 rounded-full bg-current transition-transform ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-0.5 w-4 rounded-full bg-current transition-opacity ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-0.5 w-4 rounded-full bg-current transition-transform ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`}
            />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-b border-hairline bg-bg/98 px-5 py-5 shadow-2xl backdrop-blur-md lg:hidden"
        >
          <div className="mx-auto grid max-w-lg grid-cols-2 gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-xl border border-hairline bg-surface px-4 py-3 text-sm font-semibold text-text transition hover:border-accent/50 hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
            data-event-name="download_click_nav_menu"
            className="mx-auto mt-4 flex max-w-lg items-center justify-center rounded-xl bg-accent px-4 py-3 font-semibold text-bg transition hover:bg-accent-deep"
          >
            Download ReelClip
          </a>
        </div>
      )}
    </nav>
  );
}
