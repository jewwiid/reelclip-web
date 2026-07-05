import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-hairline px-6 sm:px-10 py-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
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

        <div className="flex items-center gap-6 text-sm text-text-muted">
          <Link href="#modes" className="hover:text-text transition">Modes</Link>
          <Link href="#safety" className="hover:text-text transition">Why</Link>
          <Link href="/privacy" className="hover:text-text transition">Privacy</Link>
          <a href="mailto:hello@reelclip.app" className="hover:text-text transition">Contact</a>
        </div>

        <div className="text-xs text-text-faint">
          © {new Date().getFullYear()} ReelClip
        </div>
      </div>
    </footer>
  );
}