import Link from "next/link";
import Image from "next/image";

export function Nav() {
  return (
    <nav className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-5 border-b border-hairline">
      <Link href="/" className="flex items-center gap-2.5 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          src="/wordmark.png"
          alt="ReelClips"
          width={140}
          height={40}
          priority
          className="h-8 sm:h-9 w-auto group-hover:opacity-90 transition-opacity"
        />
      </Link>

      <div className="hidden sm:flex items-center gap-8 text-sm text-text-muted">
        <Link href="#modes" className="hover:text-text transition">Modes</Link>
        <Link href="#safety" className="hover:text-text transition">Why ReelClips</Link>
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