import {
  AlertTriangle,
  Clock,
  Activity,
  QrCode,
  ScanLine,
  BarChart3,
  Mail,
} from 'lucide-react';
import { StatCard } from '@/components/demo/StatCard';
import { Avatar } from '@/components/demo/Avatar';
import { HourlyCheckInChart } from '@/components/demo/HourlyCheckInChart';
import {
  getCurrentlyCheckedIn,
  getRecentCheckIns,
  getInactiveMembers,
  getHourlyCheckIns,
} from '@/lib/demo/mock-data';

export const metadata = {
  title: 'Check-Ins | Admin Dashboard Demo | Repz Gym',
};

const methodBadge: Record<string, string> = {
  QR: 'bg-brand-alt/20 text-brand-alt border-brand-alt/40',
  Fob: 'bg-ink-subtle/15 text-ink-muted border-ink-subtle/30',
  'Day Pass': 'bg-success/20 text-success border-success/40',
};

export default function CheckInsPage() {
  const currentlyIn = getCurrentlyCheckedIn();
  const recent = getRecentCheckIns();
  const inactive = getInactiveMembers();
  const hourly = getHourlyCheckIns();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs text-brand-alt uppercase font-display tracking-[0.12em] font-semibold mb-2">Attendance</p>
          <h1 className="text-4xl lg:text-5xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            Check-Ins
          </h1>
          <p className="text-base text-ink-muted mt-2">
            Live attendance tracking from the front-desk scanner
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/20 text-success text-xs uppercase font-display tracking-[0.12em] font-semibold">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
          </span>
          Live · last scan 2 min ago
        </div>
      </div>

      {/* Stat row */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="In The Gym Right Now" value={currentlyIn.length.toString()} accent="brand-alt" />
        <StatCard
          label="Check-Ins Today"
          value="108"
          trend={{ value: '+9 vs daily avg', direction: 'up' }}
          accent="brand"
        />
        <StatCard
          label="Peak Hour Today"
          value="5:30 PM"
          trend={{ value: '15 check-ins', direction: 'neutral' }}
          accent="success"
        />
        <StatCard
          label="Inactive (14+ Days)"
          value={inactive.length.toString()}
          trend={{ value: 'Review needed', direction: 'down' }}
          accent="danger"
        />
      </div>

      {/* In the building right now */}
      <section className="relative bg-gradient-to-br from-success/10 via-surface to-surface border border-success/30 rounded-2xl p-8 shadow-2xl shadow-success/10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success to-brand-alt" />
        <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-success/10 blur-3xl" aria-hidden />
        <div className="relative">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3" aria-hidden>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-success" />
              </span>
              <h2 className="text-xl lg:text-2xl font-display uppercase text-ink tracking-[0.02em] font-bold">
                {currentlyIn.length} Members Currently Checked In
              </h2>
            </div>
            <span className="text-xs text-ink-muted uppercase font-display tracking-[0.12em] px-2.5 py-1 rounded-full bg-surface-2 border border-line">
              Updated continuously
            </span>
          </div>

          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {currentlyIn.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 bg-surface border border-line hover:border-success/40 rounded-xl p-3 transition-colors"
                title={`${c.memberName} — checked in ${c.time}`}
              >
                <Avatar name={c.memberName} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-ink font-medium truncate">{c.memberName}</p>
                  <p className="text-xs text-ink-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {c.minutesAgo} min ago
                    {c.type === 'Day Pass' && (
                      <span className="ml-1 px-1.5 py-0.5 bg-success/20 text-success rounded-full text-[10px] uppercase tracking-wider font-display font-semibold">
                        Day Pass
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hourly chart */}
      <section className="relative bg-gradient-to-b from-surface to-surface-2/60 border border-line rounded-2xl p-8 shadow-2xl shadow-black/40 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand to-brand-alt" />
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <p className="text-xs text-brand uppercase font-display tracking-[0.12em] font-semibold mb-1">Traffic Pattern</p>
            <h2 className="text-2xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              Hourly Check-Ins Today
            </h2>
            <p className="text-sm text-ink-muted mt-1">When the gym is actually busy</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand/15 text-brand text-xs uppercase font-display tracking-[0.08em] font-semibold">
            Peak 6pm · 31 check-ins
          </span>
        </div>
        <HourlyCheckInChart data={hourly} />
      </section>

      {/* Recent check-ins log */}
      <section className="relative bg-gradient-to-b from-surface to-surface-2/40 border border-line rounded-2xl p-8 shadow-2xl shadow-black/40 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-alt to-brand" />
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <div>
            <p className="text-xs text-brand-alt uppercase font-display tracking-[0.12em] font-semibold mb-1">Activity Log</p>
            <h2 className="text-2xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              Recent Check-Ins
            </h2>
          </div>
          <span className="text-xs text-ink-muted uppercase font-display tracking-[0.12em] px-2.5 py-1 rounded-full bg-surface-2 border border-line">
            Last 30 · newest first
          </span>
        </div>

        <div className="rounded-2xl border border-line overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-surface-2 border-b-2 border-brand/30">
                  <th className="text-left py-4 px-5 text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold">Time</th>
                  <th className="text-left py-4 px-5 text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold">Member</th>
                  <th className="text-left py-4 px-5 text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold">Method</th>
                  <th className="text-left py-4 px-5 text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold">Type</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((c) => (
                  <tr key={c.id} className="even:bg-surface-2/40 hover:bg-brand/5 transition-colors border-b border-line/50 last:border-0">
                    <td className="py-4 px-5 text-sm text-ink font-display tabular-nums">{c.time}</td>
                    <td className="py-4 px-5 text-sm text-ink">{c.memberName}</td>
                    <td className="py-4 px-5 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs uppercase font-display font-semibold tracking-[0.08em] ${methodBadge[c.method]}`}>
                        {c.method}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-sm text-ink-muted">{c.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Inactive members */}
      <section className="relative bg-gradient-to-br from-danger/10 via-surface to-surface border border-danger/30 rounded-3xl p-6 lg:p-10 shadow-2xl shadow-danger/10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-danger to-warning" />
        <header className="mb-8 flex items-start gap-4">
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-danger/20 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-danger" />
          </div>
          <div>
            <p className="text-xs text-danger uppercase font-display tracking-[0.12em] font-semibold mb-1.5">Churn Risk</p>
            <h2 className="text-2xl lg:text-3xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              Members At Risk — No Check-In In 14+ Days
            </h2>
            <p className="text-sm text-ink-muted mt-2 max-w-3xl">
              Members who haven&apos;t scanned in 14+ days are 4× more likely to cancel. Auto-outreach catches most before they&apos;re gone.
            </p>
          </div>
        </header>

        <ul className="space-y-3">
          {inactive.map((m) => (
            <li
              key={m.id}
              className="flex items-center gap-4 bg-surface border border-line hover:border-danger/40 rounded-2xl p-4 flex-wrap shadow-lg shadow-black/20 transition-colors"
            >
              <Avatar name={m.name} />
              <div className="flex-1 min-w-0">
                <p className="text-ink font-medium truncate">{m.name}</p>
                <p className="text-xs text-ink-muted truncate">
                  Last seen: {m.lastSeen} ({m.daysAgo} days ago)
                </p>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-danger/20 text-danger border border-danger/30 text-xs uppercase font-display tracking-[0.08em] font-semibold">
                Likely to cancel
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 border border-line text-ink text-xs uppercase font-display font-semibold tracking-[0.06em] hover:bg-brand/10 hover:border-brand/40 transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-brand" />
                Send &ldquo;We Miss You&rdquo; Email
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="relative bg-gradient-to-b from-surface to-surface-2/40 border border-line rounded-3xl p-6 lg:p-10 shadow-2xl shadow-black/40 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-alt via-brand to-success" />
        <header className="mb-8 flex items-start gap-4">
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-brand-alt/20 flex items-center justify-center">
            <QrCode className="w-6 h-6 text-brand-alt" />
          </div>
          <div>
            <p className="text-xs text-brand-alt uppercase font-display tracking-[0.12em] font-semibold mb-1.5">Setup</p>
            <h2 className="text-2xl lg:text-3xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              How It Works
            </h2>
            <p className="text-sm text-ink-muted mt-2">Three steps. One $30 scanner.</p>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          {[
            {
              icon: QrCode,
              accent: 'brand-alt',
              title: 'Members Get A QR',
              body: 'Sent via email at signup. Saves to Apple Wallet or Google Wallet. Can be printed as a card.',
            },
            {
              icon: ScanLine,
              accent: 'brand',
              title: 'Scan At The Front Desk',
              body: 'Tablet or USB scanner. Auto-checks them in, logs time, verifies membership active.',
            },
            {
              icon: BarChart3,
              accent: 'success',
              title: 'Data Feeds The Dashboard',
              body: 'Every scan updates the live view, attendance reports, and churn predictions. No manual tracking.',
            },
          ].map((step) => {
            const Icon = step.icon;
            const tintMap: Record<string, string> = {
              brand: 'from-brand/10 via-surface to-surface border-brand/30',
              'brand-alt': 'from-brand-alt/10 via-surface to-surface border-brand-alt/30',
              success: 'from-success/10 via-surface to-surface border-success/30',
            };
            const colorMap: Record<string, string> = {
              brand: 'text-brand bg-brand/20',
              'brand-alt': 'text-brand-alt bg-brand-alt/20',
              success: 'text-success bg-success/20',
            };
            return (
              <div key={step.title} className={`bg-gradient-to-br ${tintMap[step.accent]} border rounded-2xl p-6 shadow-lg shadow-black/30`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[step.accent]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-display uppercase text-ink tracking-[0.02em] font-bold">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">{step.body}</p>
              </div>
            );
          })}
        </div>

        <div className="relative bg-gradient-to-r from-brand/15 via-surface-2 to-surface-2 border border-brand/30 rounded-2xl p-6 flex items-start gap-3 shadow-xl shadow-brand/10 overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-brand" />
          <Activity className="w-5 h-5 text-brand mt-0.5 shrink-0" />
          <div>
            <p className="text-base text-ink font-display font-bold">
              Hardware cost: ~$30 one-time for a USB scanner, or use any tablet camera.
            </p>
            <p className="text-sm text-ink-muted mt-1">
              Setup is plug-and-play. The scanner sends the QR code to the dashboard automatically.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
