export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-bg/95 backdrop-blur transition-all duration-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-display font-bold uppercase text-ink">REPZ</h1>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="/" className="text-xs uppercase text-ink-muted hover:text-brand">Home</a>
          <a href="/classes" className="text-xs uppercase text-ink-muted hover:text-brand">Classes</a>
          <a href="/pricing" className="text-xs uppercase text-ink-muted hover:text-brand">Pricing</a>
          <a href="/about" className="text-xs uppercase text-ink-muted hover:text-brand">About</a>
          <a href="/contact" className="text-xs uppercase text-ink-muted hover:text-brand">Contact</a>
        </nav>
        <button className="bg-brand px-4 py-2 text-sm font-display uppercase text-white hover:bg-brand-hot rounded-sm">
          JOIN
        </button>
      </div>
    </header>
  );
}
