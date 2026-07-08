import Link from "next/link";

export function Nav() {
  return (
    <nav className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-5 border-b border-hairline">
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center accent-glow group-hover:scale-105 transition-transform">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-bg" fill="currentColor">
            <path d="M4 5h16v3H4zM4 9h10v3H4zM4 13h16v3H4zM4 17h10v3H4z" opacity="0.25" />
            <circle cx="19" cy="11" r="2.2" />
            <circle cx="19" cy="17" r="2.2" />
          </svg>
        </div>
        <span className="text-lg font-bold tracking-tight">ReelClip</span>
      </Link>

      <div className="hidden sm:flex items-center gap-8 text-sm text-text-muted">
        <Link href="#modes" className="hover:text-text transition">Modes</Link>
        <Link href="#safety" className="hover:text-text transition">Why ReelClip</Link>
        <Link href="#for" className="hover:text-text transition">For creators</Link>
        <Link href="/competitors" className="hover:text-text transition">Compare</Link>
        <Link href="/pricing" className="hover:text-text transition">Pricing</Link>
        <Link href="/account" className="hover:text-text transition">Account</Link>
        <Link
          href="#waitlist"
          className="px-4 py-2 rounded-full bg-accent text-bg font-semibold hover:bg-accent-deep transition"
        >
          Join TestFlight
        </Link>
      </div>

      <Link
        href="#waitlist"
        className="sm:hidden px-3.5 py-1.5 rounded-full bg-accent text-bg text-sm font-semibold"
      >
        Join
      </Link>
    </nav>
  );
}