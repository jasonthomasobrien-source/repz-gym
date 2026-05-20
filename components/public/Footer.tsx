export function Footer() {
  return (
    <footer className="border-t border-line bg-bg py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <h3 className="font-display font-bold uppercase text-ink">Repz Gym</h3>
            <p className="mt-2 text-sm text-ink-muted">Plainwell's gym since 1998. Open 24/7 for members.</p>
            <p className="mt-4 text-xs text-ink-subtle">585 10th St A, Plainwell, MI 49080</p>
            <p className="text-xs text-ink-subtle">(269) 685-1493</p>
          </div>
          <div>
            <h4 className="font-display font-bold uppercase text-ink">Links</h4>
            <nav className="mt-4 space-y-2">
              <a href="/" className="block text-sm text-ink-muted hover:text-brand">Home</a>
              <a href="/about" className="block text-sm text-ink-muted hover:text-brand">About</a>
              <a href="/classes" className="block text-sm text-ink-muted hover:text-brand">Classes</a>
              <a href="/pricing" className="block text-sm text-ink-muted hover:text-brand">Pricing</a>
              <a href="/contact" className="block text-sm text-ink-muted hover:text-brand">Contact</a>
            </nav>
          </div>
          <div>
            <h4 className="font-display font-bold uppercase text-ink">Support</h4>
            <nav className="mt-4 space-y-2">
              <a href="#" className="block text-sm text-ink-muted hover:text-brand">Login</a>
              <a href="#" className="block text-sm text-ink-muted hover:text-brand">My Account</a>
              <a href="#" className="block text-sm text-ink-muted hover:text-brand">FAQ</a>
            </nav>
          </div>
          <div>
            <h4 className="font-display font-bold uppercase text-ink">Hours</h4>
            <p className="mt-4 text-sm text-ink-muted">Open daily, closes 8:30 PM</p>
            <p className="text-sm text-ink-muted">Members 24/7 with key fob</p>
          </div>
        </div>
        <div className="mt-12 border-t border-line pt-8 text-center text-xs text-ink-subtle">
          © 1998–{new Date().getFullYear()} Repz Gym. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
