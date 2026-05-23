'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Overview', href: '/admin-demo/overview' },
  { label: 'Members', href: '/admin-demo/members' },
  { label: 'Revenue', href: '/admin-demo/revenue' },
  { label: 'Classes', href: '/admin-demo/classes' },
  { label: 'Messages', href: '/admin-demo/messages' },
  { label: 'Settings', href: '/admin-demo/settings' },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex flex-col w-64 bg-bg border-r border-line min-h-screen p-6 gap-1 sticky top-0">
        <div className="mb-8">
          <h2 className="text-h3 font-display uppercase text-brand tracking-display font-semibold">Admin</h2>
          <p className="text-body-sm text-ink-muted uppercase font-display tracking-button font-semibold">Dashboard</p>
        </div>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 rounded-sm text-body-sm uppercase font-display font-semibold tracking-button transition-colors ${
                pathname === item.href
                  ? 'bg-brand text-ink'
                  : 'text-ink hover:bg-surface'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Bottom Tab Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-bg border-t border-line z-40">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 px-2 py-4 text-center text-body-xs uppercase font-display font-semibold tracking-button transition-colors border-t-2 ${
                pathname === item.href
                  ? 'border-brand text-brand'
                  : 'border-transparent text-ink-muted hover:text-ink'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
