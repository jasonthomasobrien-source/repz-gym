import { MEMBERS } from "@/lib/mock/data";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = MEMBERS.find(m => m.is_admin);

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Sidebar */}
      <aside className="w-64 border-r border-line bg-surface p-6">
        <h1 className="font-display text-lg font-bold uppercase text-ink">REPZ ADMIN</h1>
        <nav className="mt-8 space-y-2">
          {[
            { href: "/admin", label: "Overview", icon: "📊" },
            { href: "/admin/members", label: "Members", icon: "👥" },
            { href: "/admin/revenue", label: "Revenue", icon: "💰" },
            { href: "/admin/classes", label: "Classes", icon: "📅" },
            { href: "/admin/messages", label: "Messages", icon: "📬" },
            { href: "/admin/settings", label: "Settings", icon: "⚙️" },
          ].map(item => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded px-3 py-2 text-sm text-ink-muted hover:bg-surface-2 hover:text-brand"
            >
              {item.icon} {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-bold uppercase text-ink">Dashboard</h2>
          <div className="text-sm text-ink-muted">
            {admin && `${admin.first_name} ${admin.last_name}`}
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
