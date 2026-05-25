'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowLeft,
  Sparkles,
  LayoutDashboard,
  Users,
  DollarSign,
  Calendar,
  ScanLine,
  MessageSquare,
  Settings,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: typeof Sparkles;
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '/admin-demo/overview', icon: LayoutDashboard },
  { label: 'Members', href: '/admin-demo/members', icon: Users },
  { label: 'Revenue', href: '/admin-demo/revenue', icon: DollarSign },
  { label: 'Classes', href: '/admin-demo/classes', icon: Calendar },
  { label: 'Check-Ins', href: '/admin-demo/check-ins', icon: ScanLine },
  { label: 'Messages', href: '/admin-demo/messages', icon: MessageSquare },
  { label: 'Settings', href: '/admin-demo/settings', icon: Settings },
  { label: 'Why You Need This', href: '/admin-demo/why-you-need-this', icon: Sparkles },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <nav
        aria-label="Admin sidebar"
        className="hidden lg:flex flex-col w-64 bg-gradient-to-b from-bg via-bg to-surface/40 border-r border-line min-h-screen p-6 gap-1 sticky top-0"
      >
        <div className="mb-8 pb-6 border-b border-line relative">
          <div className="absolute top-0 left-0 w-12 h-1 rounded-full bg-gradient-to-r from-brand to-brand-alt" />
          <h2 className="mt-3 text-h3 font-display uppercase text-brand tracking-display font-semibold">Repz</h2>
          <p className="text-body-sm text-ink-muted uppercase font-display tracking-button font-semibold">Admin Dashboard</p>
        </div>
        <div className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const isFeatured = item.href === '/admin-demo/why-you-need-this';
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-body-sm uppercase font-display font-semibold tracking-button transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-brand to-brand-hot text-ink shadow-lg shadow-brand/30'
                    : isFeatured
                      ? 'text-brand-alt hover:bg-brand-alt/10'
                      : 'text-ink hover:bg-brand/10 hover:text-brand'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-ink' : isFeatured ? 'text-brand-alt' : 'text-ink-muted group-hover:text-brand'
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
        <div className="mt-auto pt-6 border-t border-line">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-body-sm uppercase font-display font-semibold tracking-button text-ink-muted hover:text-brand-alt hover:bg-brand-alt/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </Link>
        </div>
      </nav>

      {/* Mobile Top Bar with Back Link */}
      <div className="lg:hidden sticky top-0 z-30 bg-gradient-to-b from-bg to-bg/95 backdrop-blur border-b border-line px-4 py-3 flex items-center justify-between">
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
      <nav
        aria-label="Admin mobile tabs"
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-bg via-bg to-bg/95 backdrop-blur border-t border-line z-40"
      >
        <div className="flex justify-around">
          {navItems.map((item) => {
            const mobileLabel =
              item.href === '/admin-demo/why-you-need-this'
                ? 'Why'
                : item.href === '/admin-demo/check-ins'
                  ? 'Scan'
                  : item.label;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 px-2 py-4 text-center text-body-xs uppercase font-display font-semibold tracking-button transition-colors border-t-2 ${
                  isActive
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
