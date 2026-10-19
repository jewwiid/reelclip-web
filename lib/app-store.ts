export const APP_STORE_APP_ID = "6787742864";
// Generated in ReelClip's App Store Connect campaign-link dialog, 2026-10-19.
// This public attribution identifier is not an API credential.
export const APP_STORE_PROVIDER_TOKEN = "129072536";
export type AppStoreCampaign = "website_main" | "website_guides";

export function appStoreCampaign(pathname: string): AppStoreCampaign {
  // Locale rewrites preserve the /blog route family on server and client.
  return /\/blog(?:\/|$)/.test(pathname) ? "website_guides" : "website_main";
}

export function appStoreUrl(campaign: AppStoreCampaign) {
  const url = new URL(`https://apps.apple.com/app/apple-store/id${APP_STORE_APP_ID}`);
  url.searchParams.set("pt", APP_STORE_PROVIDER_TOKEN);
  url.searchParams.set("ct", campaign);
  url.searchParams.set("mt", "8");
  return url.href;
}
