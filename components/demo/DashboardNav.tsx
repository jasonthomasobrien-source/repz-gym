'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon?: typeof Sparkles;
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '/admin-demo/overview' },
  { label: 'Members', href: '/admin-demo/members' },
  { label: 'Revenue', href: '/admin-demo/revenue' },
  { label: 'Classes', href: '/admin-demo/classes' },
  { label: 'Messages', href: '/admin-demo/messages' },
  { label: 'Settings', href: '/admin-demo/settings' },
  { label: 'Why You Need This', href: '/admin-demo/why-you-need-this', icon: Sparkles },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <nav aria-label="Admin sidebar" className="hidden lg:flex flex-col w-64 bg-bg border-r border-line min-h-screen p-6 gap-1 sticky top-0">
        <div className="mb-8">
          <h2 className="text-h3 font-display uppercase text-brand tracking-display font-semibold">Admin</h2>
          <p className="text-body-sm text-ink-muted uppercase font-display tracking-button font-semibold">Dashboard</p>
        </div>
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-3 rounded-sm text-body-sm uppercase font-display font-semibold tracking-button transition-colors ${
                  pathname === item.href
                    ? 'bg-brand text-ink'
                    : 'text-ink hover:bg-surface'
                }`}
              >
                {Icon ? <Icon className="w-4 h-4 text-brand-alt" /> : null}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
        <div className="mt-auto pt-6 border-t border-line">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-3 rounded-sm text-body-sm uppercase font-display font-semibold tracking-button text-ink-muted hover:text-brand-alt hover:bg-surface transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </Link>
        </div>
      </nav>

      {/* Mobile Top Bar with Back Link */}
      <div className="lg:hidden sticky top-0 z-30 bg-bg border-b border-line px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-body-sm uppercase font-display font-semibold tracking-button text-ink-muted hover:text-brand-alt transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Website
        </Link>
        <span className="text-body-sm uppercase font-display font-semibold tracking-button text-brand">Admin</span>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <nav aria-label="Admin mobile tabs" className="lg:hidden fixed bottom-0 left-0 right-0 bg-bg border-t border-line z-40">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const mobileLabel = item.href === '/admin-demo/why-you-need-this' ? 'Why' : item.label;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 px-2 py-4 text-center text-body-xs uppercase font-display font-semibold tracking-button transition-colors border-t-2 ${
                  pathname === item.href
                    ? 'border-brand text-brand'
                    : 'border-transparent text-ink-muted hover:text-ink'
                }`}
              >
                {mobileLabel}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
