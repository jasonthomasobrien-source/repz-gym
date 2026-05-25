import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-brand-alt bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="border-b md:border-b-0 md:border-r border-brand-alt pb-8 md:pb-0 md:pr-8">
            <div className="font-display text-xl font-bold text-brand uppercase">Repz Gym</div>
            <p className="mt-2 text-sm text-ink-muted">No glamour. Just a great workout.</p>
            <p className="mt-1 text-xs text-ink-subtle">Plainwell, Michigan • Since 1998</p>
          </div>

          {/* Quick Links */}
          <div className="border-b md:border-b-0 md:border-r border-brand-alt pb-8 md:pb-0 md:pr-8">
            <h4 className="font-display text-sm font-bold uppercase text-ink">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="text-sm text-ink-muted transition hover:text-brand-alt">Home</Link></li>
              <li><Link href="/classes" className="text-sm text-ink-muted transition hover:text-brand-alt">Classes</Link></li>
              <li><Link href="/pricing" className="text-sm text-ink-muted transition hover:text-brand-alt">Pricing</Link></li>
              <li><Link href="/about" className="text-sm text-ink-muted transition hover:text-brand-alt">About</Link></li>
              <li><Link href="/admin-demo" className="text-sm text-ink-muted transition hover:text-brand-alt">Admin Dashboard Demo</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="border-b md:border-b-0 md:border-r border-brand-alt pb-8 md:pb-0 md:pr-8">
            <h4 className="font-display text-sm font-bold uppercase text-ink">Contact</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="tel:+12696851493" className="text-sm text-ink-muted transition hover:text-brand-alt">(269) 685-1493</a></li>
              <li className="text-sm text-ink-muted">585 10th St A</li>
              <li className="text-sm text-ink-muted">Plainwell, MI 49080</li>
              <li><a href="mailto:jerry@repz-gym.com" className="text-sm text-brand transition hover:text-brand-dark">jerry@repz-gym.com</a></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase text-ink">Hours</h4>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-ink-muted">Mon–Sun: 6 AM – 8:30 PM</li>
              <li className="text-xs text-ink-subtle mt-4">24/7 key-fob access for members</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-brand-alt pt-8 flex items-center justify-between text-xs text-ink-subtle">
          <p>&copy; {new Date().getFullYear()} Repz Gym. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://www.facebook.com/RepzGym/" target="_blank" rel="noopener noreferrer" className="transition hover:text-brand-alt">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
