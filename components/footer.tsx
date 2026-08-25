import Link from "next/link";
import Image from "next/image";
import { localizedPath } from "@/i18n/routing";
import { getDictionary, getRequestLocale } from "@/i18n/server";

export async function Footer() {
  const locale = await getRequestLocale();
  const { footer } = await getDictionary(locale);
  const href = (path: string) => localizedPath(locale, path);

  return <footer className="border-t border-hairline px-6 py-12 sm:px-10"><div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-[1fr_auto] sm:items-start"><div className="flex flex-col gap-6"><div className="relative h-9 w-32 shrink-0"><Image src="/wordmark.png" alt="ReelClip" fill sizes="8rem" className="object-contain object-left" /></div><p className="max-w-md text-sm leading-relaxed text-text-muted">{footer.description}</p><p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">{footer.tagline}</p></div><div className="grid grid-cols-2 gap-x-10 gap-y-6 text-sm sm:grid-cols-4"><FooterCol title={footer.product}><Link href={href("/#modes")} className="hover:text-text transition">{footer.modes}</Link><Link href={href("/#safety")} className="hover:text-text transition">{footer.why}</Link><Link href={href("/#ai-notes")} className="hover:text-text transition">{footer.howAI}</Link><Link href={href("/#for")} className="hover:text-text transition">{footer.creators}</Link><Link href={href("/competitors")} className="hover:text-text transition">{footer.compare}</Link><Link href={href("/pricing")} className="hover:text-text transition">{footer.pricing}</Link><Link href={href("/blog")} className="hover:text-text transition">{footer.blog}</Link></FooterCol><FooterCol title={footer.account}><Link href={href("/account")} className="hover:text-text transition">{footer.manage}</Link><a href="https://apps.apple.com/account/subscriptions" target="_blank" rel="noreferrer" className="hover:text-text transition">{footer.appStoreSubscription}</a><a href="https://apps.apple.com/app/reelclip/id6787742864" target="_blank" rel="noreferrer" data-event-name="download_click_footer" className="hover:text-text transition">{footer.download}</a></FooterCol><FooterCol title={footer.legal}><Link href={href("/brand")} className="hover:text-text transition">{footer.brandAssets}</Link><Link href={href("/privacy")} className="hover:text-text transition">{footer.privacy}</Link><Link href={href("/terms")} className="hover:text-text transition">{footer.terms}</Link><Link href={href("/support")} className="hover:text-text transition">{footer.support}</Link><Link href={href("/about")} className="hover:text-text transition">{footer.about}</Link></FooterCol><FooterCol title={footer.follow}><a href="https://www.instagram.com/reelclipapp/" target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 transition hover:text-text"><InstagramIcon />Instagram <span aria-hidden="true">↗</span></a><a href="https://www.tiktok.com/@reelclipapp" target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 transition hover:text-text"><TikTokIcon />TikTok <span aria-hidden="true">↗</span></a><span className="text-text-faint">@reelclipapp</span></FooterCol></div></div><div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-hairline pt-6 text-xs text-text-faint sm:flex-row"><div>© {new Date().getFullYear()} ReelClip. {footer.rights}</div><div>{footer.devicePromise}</div></div></footer>;
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><div className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-text-faint">{title}</div><div className="flex flex-col gap-2 text-text-muted">{children}</div></div>;
}

function InstagramIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 shrink-0"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
}

function TikTokIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0"><path d="M14.2 3c.45 2.55 1.88 4.1 4.3 4.65v3.05a8.12 8.12 0 0 1-4.3-1.22v5.98a5.42 5.42 0 1 1-4.7-5.38v3.12a2.42 2.42 0 1 0 1.7 2.31V3h3Z" /></svg>;
}
