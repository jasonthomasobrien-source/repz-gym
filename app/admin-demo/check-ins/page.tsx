import {
  Users,
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

const methodColor: Record<string, string> = {
  QR: 'text-brand-alt',
  Fob: 'text-ink-muted',
  'Day Pass': 'text-success',
};

export default function CheckInsPage() {
  const currentlyIn = getCurrentlyCheckedIn();
  const recent = getRecentCheckIns();
  const inactive = getInactiveMembers();
  const hourly = getHourlyCheckIns();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl lg:text-5xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            Check-Ins
          </h1>
          <p className="text-base text-ink-muted mt-2">
            Live attendance tracking from the front-desk scanner
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-xs text-ink-muted">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden />
          <span className="uppercase font-display tracking-[0.12em] font-semibold">Live · last scan 2 min ago</span>
        </div>
      </div>

      {/* Stat row */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="In The Gym Right Now" value={currentlyIn.length.toString()} accent="brand-alt" />
        <StatCard
          label="Check-Ins Today"
          value="147"
          trend={{ value: '+12 vs daily avg', direction: 'up' }}
          accent="brand"
        />
        <StatCard
          label="Peak Hour Today"
          value="5:30 PM"
          trend={{ value: '31 check-ins', direction: 'neutral' }}
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
      <section className="bg-surface border border-line rounded-md p-6">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3" aria-hidden>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-success" />
            </span>
            <h2 className="text-xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              {currentlyIn.length} Members Currently Checked In
            </h2>
          </div>
          <span className="text-xs text-ink-muted uppercase font-display tracking-[0.12em]">
            Updated continuously
          </span>
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {currentlyIn.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-3 bg-surface-2 border border-line rounded-sm p-3"
              title={`${c.memberName} — checked in ${c.time}`}
            >
              <Avatar name={c.memberName} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-ink font-medium truncate">{c.memberName}</p>
                <p className="text-xs text-ink-muted flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {c.minutesAgo} min ago
                  {c.type === 'Day Pass' && (
                    <span className="ml-1 px-1.5 py-0.5 bg-success/15 text-success rounded-sm text-[10px] uppercase tracking-wider font-display font-semibold">
                      Day Pass
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hourly chart */}
      <section className="bg-surface border border-line rounded-md p-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <h2 className="text-xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              Hourly Check-Ins Today
            </h2>
            <p className="text-sm text-ink-muted mt-1">When the gym is actually busy</p>
          </div>
          <span className="text-xs text-brand uppercase font-display tracking-[0.12em] font-semibold">
            Peak 6pm · 31 check-ins
          </span>
        </div>
        <HourlyCheckInChart data={hourly} />
      </section>

      {/* Recent check-ins log */}
      <section className="bg-surface border border-line rounded-md p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            Recent Check-Ins
          </h2>
          <span className="text-xs text-ink-muted uppercase font-display tracking-[0.12em]">
            Last 30 · newest first
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[560px]">
            <thead>
              <tr className="border-b border-line">
                <th className="text-left py-3 pr-4 text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold">Time</th>
                <th className="text-left py-3 px-4 text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold">Member</th>
                <th className="text-left py-3 px-4 text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold">Method</th>
                <th className="text-left py-3 pl-4 text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold">Type</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((c, i) => (
                <tr key={c.id} className={i % 2 === 0 ? 'bg-surface-2' : ''}>
                  <td className="py-3 pr-4 text-sm text-ink font-display tabular-nums">{c.time}</td>
                  <td className="py-3 px-4 text-sm text-ink">{c.memberName}</td>
                  <td className={`py-3 px-4 text-sm font-display font-semibold uppercase tracking-[0.08em] ${methodColor[c.method]}`}>
                    {c.method}
                  </td>
                  <td className="py-3 pl-4 text-sm text-ink-muted">{c.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Inactive members */}
      <section className="bg-surface-2 border border-line rounded-md p-6 lg:p-8">
        <header className="mb-6 flex items-start gap-3">
          <AlertTriangle className="w-7 h-7 text-danger shrink-0 mt-1" />
          <div>
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
              className="flex items-center gap-4 bg-surface border border-line rounded-md p-4 flex-wrap"
            >
              <Avatar name={m.name} />
              <div className="flex-1 min-w-0">
                <p className="text-ink font-medium truncate">{m.name}</p>
                <p className="text-xs text-ink-muted truncate">
                  Last seen: {m.lastSeen} ({m.daysAgo} days ago)
                </p>
              </div>
              <span className="text-xs px-2 py-1 rounded-sm bg-danger/15 text-danger uppercase font-display tracking-[0.08em] font-semibold">
                Likely to cancel
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-sm border border-line text-ink text-xs uppercase font-display font-semibold tracking-[0.06em] hover:bg-surface-2 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-brand" />
                Send &ldquo;We Miss You&rdquo; Email
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="bg-surface border border-line rounded-md p-6 lg:p-8">
        <header className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            How It Works
          </h2>
          <p className="text-sm text-ink-muted mt-2">Three steps. One $30 scanner.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: QrCode,
              color: 'text-brand-alt',
              title: 'Members Get A QR',
              body: 'Sent via email at signup. Saves to Apple Wallet or Google Wallet. Can be printed as a card.',
            },
            {
              icon: ScanLine,
              color: 'text-brand',
              title: 'Scan At The Front Desk',
              body: 'Tablet or USB scanner. Auto-checks them in, logs time, verifies membership active.',
            },
            {
              icon: BarChart3,
              color: 'text-success',
              title: 'Data Feeds The Dashboard',
              body: 'Every scan updates the live view, attendance reports, and churn predictions. No manual tracking.',
            },
          ].map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="bg-surface-2 border border-line rounded-md p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className={`w-7 h-7 ${step.color}`} />
                  <h3 className="text-lg font-display uppercase text-ink tracking-[0.02em] font-bold">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">{step.body}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-surface-2 border-l-4 border-brand rounded-sm p-5 flex items-start gap-3">
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
