"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackWebsiteEvent } from "@/lib/site-analytics";

/** Route-aware tracking also covers links inside translated article HTML. */
export function SiteAnalytics() {
  const pathname = usePathname();
  const previousPage = useRef("");

  useEffect(() => {
    const page = window.location.origin + window.location.pathname;
    if (previousPage.current === page) return;
    trackWebsiteEvent("pageview", {}, previousPage.current || document.referrer);
    previousPage.current = page;
  }, [pathname]);

  useEffect(() => {
    const click = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest<HTMLAnchorElement>("a[data-analytics-event]");
      if (!link || !link.href.startsWith("https://apps.apple.com/")) return;
      trackWebsiteEvent("ReelClip.Web.downloadClicked", {
        placement: link.dataset.analyticsEvent || "download_click",
      });
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);

  return null;
}
