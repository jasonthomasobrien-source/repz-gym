import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-display text-2xl font-bold text-brand uppercase tracking-wide">
            Repz
          </Link>

          {/* Navigation */}
          <nav className="hidden gap-8 md:flex">
            <Link href="/" className="text-sm font-display uppercase text-ink-muted transition hover:text-brand">
              Home
            </Link>
            <Link href="/classes" className="text-sm font-display uppercase text-ink-muted transition hover:text-brand">
              Classes
            </Link>
            <Link href="/pricing" className="text-sm font-display uppercase text-ink-muted transition hover:text-brand">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-display uppercase text-ink-muted transition hover:text-brand">
              About
            </Link>
            <Link href="/contact" className="text-sm font-display uppercase text-ink-muted transition hover:text-brand">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <Button size="sm" variant="primary" href="/signup">
            Join Now
          </Button>
        </div>
      </div>
    </header>
  );
}
