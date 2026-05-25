'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full backdrop-blur transition-all duration-200 ${
        scrolled ? 'bg-bg/80' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center">
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight whitespace-nowrap">
            <span style={{ color: 'rgb(242, 101, 34)' }}>REPZ</span>
            <span style={{ color: 'rgb(32, 178, 170)' }}>GYM</span>
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-xs font-display uppercase text-ink-muted transition hover:text-ink">
            Home
          </Link>
          <Link href="/classes" className="text-xs font-display uppercase text-ink-muted transition hover:text-ink">
            Classes
          </Link>
          <Link href="/pricing" className="text-xs font-display uppercase text-ink-muted transition hover:text-ink">
            Pricing
          </Link>
          <Link href="/about" className="text-xs font-display uppercase text-ink-muted transition hover:text-ink">
            About
          </Link>
          <Link href="/contact" className="text-xs font-display uppercase text-ink-muted transition hover:text-ink">
            Contact
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/join"
            className="bg-brand px-4 py-2 text-sm font-display uppercase text-white transition hover:bg-brand-hot rounded-sm"
          >
            BOOK A TOUR
          </Link>
        </div>
      </div>
    </header>
  );
}
