import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="flex">
        <aside className="w-64 border-r border-brand-alt bg-surface p-6">
          <h2 className="font-display text-xl font-bold uppercase text-brand mb-6">Admin</h2>
          <nav className="space-y-2">
            <div className="pl-4 border-l-4 border-brand-alt py-2 px-3 bg-bg/50 rounded text-sm uppercase font-display text-brand-alt">
              Dashboard
            </div>
            <div className="py-2 px-3 text-sm uppercase font-display text-ink-muted hover:text-brand-alt cursor-pointer">
              Members
            </div>
            <div className="py-2 px-3 text-sm uppercase font-display text-ink-muted hover:text-brand-alt cursor-pointer">
              Classes
            </div>
            <div className="py-2 px-3 text-sm uppercase font-display text-ink-muted hover:text-brand-alt cursor-pointer">
              Settings
            </div>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <SectionTitle title="Dashboard" eyebrow="Welcome Back" align="left" />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-md border border-line bg-surface p-6">
              <div className="text-xs font-display uppercase tracking-eyebrow text-brand">Active Members</div>
              <div className="mt-4 text-4xl font-display font-bold text-brand">1,247</div>
              <p className="mt-2 text-sm text-ink-muted">+12 this week</p>
            </div>
            <div className="rounded-md border border-line bg-surface p-6">
              <div className="text-xs font-display uppercase tracking-eyebrow text-brand-alt">Classes This Week</div>
              <div className="mt-4 text-4xl font-display font-bold text-brand-alt">24</div>
              <p className="mt-2 text-sm text-ink-muted">4 per day</p>
            </div>
            <div className="rounded-md border border-line bg-surface p-6">
              <div className="text-xs font-display uppercase tracking-eyebrow text-brand-alt">Revenue</div>
              <div className="mt-4 text-4xl font-display font-bold text-ink">$8,340</div>
              <p className="mt-2 text-sm text-ink-muted">This month</p>
            </div>
          </div>

          <div className="mt-12 rounded-md border border-line bg-surface p-6">
            <h3 className="font-display text-lg font-bold uppercase text-ink mb-4">Recent Activity</h3>
            <ul className="space-y-3">
              <li className="text-sm text-ink-muted border-l-4 border-brand-alt pl-3">New member signup: Sarah M.</li>
              <li className="text-sm text-ink-muted border-l-4 border-brand pl-3">Class scheduled: Boxing at 6pm</li>
              <li className="text-sm text-ink-muted border-l-4 border-brand-alt pl-3">Payment received: $30 membership</li>
            </ul>
          </div>

          <div className="mt-12 flex gap-4">
            <Button variant="primary">Create Member</Button>
            <Button variant="secondary">View Reports</Button>
          </div>
        </main>
      </div>
    </div>
  );
}
