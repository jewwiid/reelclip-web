import { appStoreCampaign } from "@/lib/app-store";

// Public ingest identifier, separate from the native iOS app's analytics.
export const TELEMETRYDECK_WEBSITE_ID = "16925097-703F-4E97-BD7F-5E32AEB57E7C";
const ENDPOINT = "https://nom.telemetrydeck.com/v3/w/";
const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign"];

/** Never send account-form values, arbitrary query strings, or URL fragments. */
function publicUrl(value: string, campaign = false) {
  try {
    const source = new URL(value);
    if (!/^https?:$/.test(source.protocol)) return "";
    const clean = new URL(source.origin + source.pathname);
    if (campaign) {
      for (const key of CAMPAIGN_KEYS) {
        const value = source.searchParams.get(key);
        if (value && /^[a-zA-Z0-9_. -]{1,80}$/.test(value)) clean.searchParams.set(key, value);
      }
    }
    return clean.href;
  } catch {
    return "";
  }
}

export function trackWebsiteEvent(type: string, parameters: Record<string, string | number> = {}, referrer?: string) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  const test = !["www.reelclips.app", "reelclips.app"].includes(url.hostname)
    || url.searchParams.get("td_test") === "true";
  const payload = {
    appID: TELEMETRYDECK_WEBSITE_ID,
    type,
    url: publicUrl(url.href, true),
    referrer: publicUrl(referrer ?? document.referrer),
    locale: document.documentElement.lang || "en",
    isTestMode: String(test),
    "TelemetryDeck.SDK.name": "ReelClipWeb",
    "TelemetryDeck.SDK.version": "1.0.0",
    "TelemetryDeck.SDK.nameAndVersion": "ReelClipWeb 1.0.0",
    campaign: appStoreCampaign(url.pathname),
    ...parameters,
  };
  // keepalive lets outbound App Store clicks finish without delaying navigation.
  void fetch(ENDPOINT, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload), keepalive: true, credentials: "omit",
  }).catch(() => { /* Analytics never blocks using the website. */ });
}
