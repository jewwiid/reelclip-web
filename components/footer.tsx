import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-hairline px-6 sm:px-10 py-12">
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-bg" fill="currentColor">
                <circle cx="19" cy="11" r="2.2" />
                <circle cx="19" cy="17" r="2.2" />
                <rect x="3" y="6" width="13" height="2.5" />
                <rect x="3" y="10" width="13" height="2.5" />
                <rect x="3" y="14" width="13" height="2.5" />
                <rect x="3" y="18" width="13" height="2.5" />
              </svg>
            </div>
            <span className="font-bold">ReelClip</span>
          </div>

          <p className="text-sm text-text-muted max-w-md leading-relaxed">
            Cut any video into share-ready clips. On-device by default.
            Four cut modes. Bring-your-own AI. Built for Reels, TikTok, and Shorts.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-6 text-sm">
          <FooterCol title="Product">
            <Link href="/#modes" className="hover:text-text transition">Modes</Link>
            <Link href="/#safety" className="hover:text-text transition">Why ReelClip</Link>
            <Link href="/#for" className="hover:text-text transition">For creators</Link>
            <Link href="/competitors" className="hover:text-text transition">Compare</Link>
            <Link href="/pricing" className="hover:text-text transition">Pricing</Link>
          </FooterCol>

          <FooterCol title="Account">
            <Link href="/account" className="hover:text-text transition">Manage</Link>
            <a
              href="https://apps.apple.com/account/subscriptions"
              target="_blank"
              rel="noreferrer"
              className="hover:text-text transition"
            >
              App Store subscription
            </a>
            <Link href="/#waitlist" className="hover:text-text transition">Join beta</Link>
          </FooterCol>

          <FooterCol title="Legal">
            <Link href="/privacy" className="hover:text-text transition">Privacy</Link>
            <Link href="/terms" className="hover:text-text transition">Terms</Link>
            <a href="mailto:support@reelclip.app" className="hover:text-text transition">Support</a>
            <a href="mailto:legal@reelclip.app" className="hover:text-text transition">Legal</a>
          </FooterCol>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-faint">
        <div>© {new Date().getFullYear()} ReelClip. All rights reserved.</div>
        <div>
          Made with care for creators who publish to Reels, TikTok, and Shorts.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-text-faint mb-3">
        {title}
      </div>
      <div className="flex flex-col gap-2 text-text-muted">{children}</div>
    </div>
  );
}