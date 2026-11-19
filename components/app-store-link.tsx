"use client";

import type { ComponentProps } from "react";
import { usePathname } from "next/navigation";
import { appStoreCampaign, appStoreUrl } from "@/lib/app-store";

/** Keep header, article and footer downloads attributed to the current page. */
export function AppStoreLink(props: Omit<ComponentProps<"a">, "href">) {
  const pathname = usePathname();
  const campaign = appStoreCampaign(pathname);
  return <a {...props} href={appStoreUrl(campaign)} data-analytics-campaign={campaign} />;
}
