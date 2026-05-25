import Link from 'next/link';
import { AlertTriangle, Mail, Download, BarChart3, TrendingUp, UserCheck, Clock, ArrowRight } from 'lucide-react';
import { StatCard } from '@/components/demo/StatCard';
import { RevenueChart, GrowthChart } from '@/components/demo/RevenueChart';
import { Avatar } from '@/components/demo/Avatar';
import {
  getAtRiskMembers,
  getMemberGrowth,
  getNewestMembers,
  getOverviewMetrics,
  getRevenueByMonth,
} from '@/lib/demo/mock-data';

export const metadata = {
  title: 'Overview | Admin Dashboard Demo | Repz Gym',
};

export default function OverviewPage() {
  const revenueData = getRevenueByMonth();
  const growthData = getMemberGrowth();
  const newest = getNewestMembers();
  const atRisk = getAtRiskMembers();
  const metrics = getOverviewMetrics();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl lg:text-5xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            Overview
          </h1>
          <p className="text-base text-ink-muted mt-2">
            Snapshot of your gym — May 2026
          </p>
        </div>
        <p className="text-xs text-ink-subtle uppercase font-display tracking-[0.12em]">
          Last updated 2 min ago
        </p>
      </div>

      {/* Pitch banner */}
      <section className="relative bg-surface border border-line rounded-md p-6 lg:p-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-brand-alt to-success" />
        <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
          <div>
            <h2 className="text-2xl lg:text-3xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              Why This Dashboard Matters
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              More than a spreadsheet — your business made visible.
            </p>
          </div>
          <span className="text-xs text-brand-alt uppercase font-display tracking-[0.12em] font-semibold">
            The pitch, in 3 numbers
          </span>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
          <span className="relative flex h-2.5 w-2.5" aria-hidden>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
          </span>
          <span>
            <span className="text-ink font-semibold">23 members in the building right now</span>
            <span className="mx-2 text-ink-subtle">·</span>
            last scan 2 min ago
          </span>
          <Link
            href="/admin-demo/check-ins"
            className="ml-1 inline-flex items-center gap-1 text-brand-alt uppercase font-display text-xs tracking-[0.08em] font-semibold hover:text-brand transition-colors"
          >
            View check-ins
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          {/* Sellable Business */}
          <div className="bg-surface-2 border border-line rounded-md p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-brand-alt" />
              <p className="text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold">
                Sellable Business
              </p>
            </div>
            <p className="text-5xl font-display font-bold text-brand-alt leading-none mb-2">5×</p>
            <p className="text-sm text-ink font-semibold mb-2">More valuable with records</p>
            <p className="text-sm text-ink-muted leading-relaxed">
              Buyers pay for what they can verify. Documented gyms sell for ~$140K–$280K. Cash-only gyms sell for ~$30K–$60K.
            </p>
            <p className="text-xs text-ink-subtle mt-2 italic">
              Estimate — see full math on the Why page.
            </p>
          </div>

          {/* Member Retention */}
          <div className="bg-surface-2 border border-line rounded-md p-5">
            <div className="flex items-center gap-2 mb-4">
              <UserCheck className="w-5 h-5 text-brand" />
              <p className="text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold">
                Member Retention
              </p>
            </div>
            <p className="text-5xl font-display font-bold text-brand leading-none mb-2">12</p>
            <p className="text-sm text-ink font-semibold mb-2">At-risk members caught this month</p>
            <p className="text-sm text-ink-muted leading-relaxed">
              Spreadsheets can&apos;t text someone whose card failed. We can. Save 10 members/year = $3,600 back in your pocket.
            </p>
          </div>

          {/* Hours Back */}
          <div className="bg-surface-2 border border-line rounded-md p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-success" />
              <p className="text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold">
                Hours Back
              </p>
            </div>
            <p className="text-5xl font-display font-bold text-success leading-none mb-2">5 hrs/wk</p>
            <p className="text-sm text-ink font-semibold mb-2">Stop manually tracking payments</p>
            <p className="text-sm text-ink-muted leading-relaxed">
              No more &ldquo;did Sarah pay this month?&rdquo; No spreadsheet rows. Automatic billing, automatic receipts, automatic reports.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-line">
          <Link
            href="/admin-demo/why-you-need-this"
            className="inline-flex items-center gap-2 text-sm text-brand-alt uppercase font-display tracking-[0.08em] font-semibold hover:text-brand transition-colors"
          >
            See the full case
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Top metrics */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="MRR"
          value={metrics.mrr.value}
          trend={{ value: '+8.2% vs last month', direction: 'up' }}
          accent="brand-alt"
        />
        <StatCard
          label="Active Members"
          value={metrics.activeMembers.value}
          trend={{ value: '+18 this month', direction: 'up' }}
          accent="brand"
        />
        <StatCard
          label="At-Risk Payments"
          value="12"
          trend={{ value: '-3 from last week', direction: 'down' }}
          accent="danger"
        />
        <StatCard
          label="Day Passes (30d)"
          value="$555"
          trend={{ value: '+30 vs last month', direction: 'up' }}
          accent="success"
        />
      </div>

      {/* Revenue chart */}
      <section className="bg-surface border border-line rounded-md p-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <h2 className="text-xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              Monthly Revenue
            </h2>
            <p className="text-sm text-ink-muted mt-1">12-month trend across all products</p>
          </div>
          <span className="text-xs text-brand-alt uppercase font-display tracking-[0.12em] font-semibold">
            ↑ 14% YoY
          </span>
        </div>
        <RevenueChart data={revenueData} />
      </section>

      {/* Recent + At Risk */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent signups */}
        <section className="bg-surface border border-line rounded-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              Recent Signups
            </h2>
            <span className="text-xs text-ink-muted uppercase font-display tracking-[0.12em]">
              Last 5
            </span>
          </div>
          <ul className="divide-y divide-line">
            {newest.map((m) => (
              <li key={m.id} className="py-3 flex items-center gap-3">
                <Avatar name={m.name} />
                <div className="flex-1 min-w-0">
                  <p className="text-ink font-medium truncate">{m.name}</p>
                  <p className="text-xs text-ink-muted truncate">{m.email}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-ink-muted">{m.joined}</p>
                  <p className="text-xs text-brand font-display uppercase tracking-[0.08em] font-semibold">
                    Monthly
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* At-risk */}
        <section className="bg-surface border border-line rounded-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              At-Risk Members
            </h2>
            <span className="inline-flex items-center gap-1 text-xs text-danger uppercase font-display tracking-[0.12em] font-semibold">
              <AlertTriangle className="w-3 h-3" />
              Action needed
            </span>
          </div>
          {atRisk.length === 0 ? (
            <p className="text-sm text-ink-muted py-8 text-center">No failed payments — nice.</p>
          ) : (
            <ul className="divide-y divide-line">
              {atRisk.map((p) => (
                <li key={p.id} className="py-3 flex items-center gap-3">
                  <span className="w-2 h-10 bg-danger rounded-sm shrink-0" aria-hidden />
                  <Avatar name={p.member} />
                  <div className="flex-1 min-w-0">
                    <p className="text-ink font-medium truncate">{p.member}</p>
                    <p className="text-xs text-ink-muted">Last attempt {p.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-danger font-display font-bold">{p.amount}</p>
                    <p className="text-xs text-ink-muted uppercase tracking-[0.08em]">Failed</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Member growth */}
      <section className="bg-surface border border-line rounded-md p-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <h2 className="text-xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              Member Growth
            </h2>
            <p className="text-sm text-ink-muted mt-1">Net active members over the last year</p>
          </div>
          <span className="text-xs text-brand-alt uppercase font-display tracking-[0.12em] font-semibold">
            482 → 523 (+8.5%)
          </span>
        </div>
        <GrowthChart data={growthData} />
      </section>

      {/* Quick actions */}
      <section className="bg-surface-2 border border-line rounded-md p-6">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <p className="text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold">
            Quick Actions
          </p>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-line text-ink text-sm uppercase font-display font-semibold tracking-[0.06em] hover:bg-surface transition-colors">
              <Mail className="w-4 h-4 text-brand" />
              Send Payment Reminder
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-line text-ink text-sm uppercase font-display font-semibold tracking-[0.06em] hover:bg-surface transition-colors">
              <Download className="w-4 h-4 text-brand-alt" />
              Export Member List
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-line text-ink text-sm uppercase font-display font-semibold tracking-[0.06em] hover:bg-surface transition-colors">
              <BarChart3 className="w-4 h-4 text-success" />
              View Reports
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
