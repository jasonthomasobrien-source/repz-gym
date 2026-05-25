import Link from 'next/link';
import { AlertTriangle, Mail, Download, BarChart3, TrendingUp, UserCheck, Clock, ArrowRight, Sparkles } from 'lucide-react';
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
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs text-brand uppercase font-display tracking-[0.12em] font-semibold mb-2">Dashboard</p>
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
      <section className="relative bg-gradient-to-br from-brand/15 via-bg to-brand-alt/15 border border-brand/20 rounded-3xl p-8 lg:p-10 overflow-hidden shadow-2xl shadow-black/40">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand via-brand-alt to-success" />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand/10 blur-3xl" aria-hidden />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-brand-alt/10 blur-3xl" aria-hidden />
        <div className="relative">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/20 text-brand text-xs uppercase font-display tracking-[0.12em] font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                The Pitch, In 3 Numbers
              </div>
              <h2 className="text-2xl lg:text-4xl font-display uppercase text-ink tracking-[0.02em] font-bold leading-tight">
                Why This Dashboard Matters
              </h2>
              <p className="text-sm text-ink-muted mt-2 max-w-2xl">
                More than a spreadsheet — your business made visible.
              </p>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
            <span className="relative flex h-2.5 w-2.5" aria-hidden>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
            </span>
            <span>
              <span className="text-ink font-semibold">12 members in the building right now</span>
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

          <div className="grid gap-5 grid-cols-1 lg:grid-cols-3">
            {/* Sellable Business */}
            <div className="relative bg-gradient-to-br from-brand-alt/15 via-surface to-surface border border-brand-alt/30 rounded-2xl p-6 shadow-xl shadow-brand-alt/10 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-alt to-brand-alt-light" />
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-brand-alt/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-brand-alt" />
                </div>
                <p className="text-xs text-brand-alt uppercase font-display tracking-[0.12em] font-semibold">
                  Sellable Business
                </p>
              </div>
              <p className="text-5xl lg:text-6xl font-display font-bold text-brand-alt leading-none tracking-tight mb-2">5×</p>
              <p className="text-sm text-ink font-semibold mb-2">More valuable with records</p>
              <p className="text-sm text-ink-muted leading-relaxed">
                Buyers pay for what they can verify. Documented gyms sell for ~$85K–$170K. Cash-only gyms sell for ~$30K–$60K.
              </p>
              <p className="text-xs text-ink-subtle mt-2 italic">
                Estimate — see full math on the Why page.
              </p>
            </div>

            {/* Member Retention */}
            <div className="relative bg-gradient-to-br from-brand/15 via-surface to-surface border border-brand/30 rounded-2xl p-6 shadow-xl shadow-brand/10 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand to-brand-hot" />
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-brand/20 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-brand" />
                </div>
                <p className="text-xs text-brand uppercase font-display tracking-[0.12em] font-semibold">
                  Member Retention
                </p>
              </div>
              <p className="text-5xl lg:text-6xl font-display font-bold text-brand leading-none tracking-tight mb-2">9</p>
              <p className="text-sm text-ink font-semibold mb-2">At-risk members caught this month</p>
              <p className="text-sm text-ink-muted leading-relaxed">
                Spreadsheets can&apos;t text someone whose card failed. We can. Save 10 members/year = $3,600 back in your pocket.
              </p>
            </div>

            {/* Hours Back */}
            <div className="relative bg-gradient-to-br from-success/15 via-surface to-surface border border-success/30 rounded-2xl p-6 shadow-xl shadow-success/10 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success to-success/60" />
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-success/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-success" />
                </div>
                <p className="text-xs text-success uppercase font-display tracking-[0.12em] font-semibold">
                  Hours Back
                </p>
              </div>
              <p className="text-5xl lg:text-6xl font-display font-bold text-success leading-none tracking-tight mb-2">5 hrs/wk</p>
              <p className="text-sm text-ink font-semibold mb-2">Stop manually tracking payments</p>
              <p className="text-sm text-ink-muted leading-relaxed">
                No more &ldquo;did Sarah pay this month?&rdquo; No spreadsheet rows. Automatic billing, automatic receipts, automatic reports.
              </p>
            </div>
          </div>

          <div className="mt-7 pt-5 border-t border-brand/20">
            <Link
              href="/admin-demo/why-you-need-this"
              className="inline-flex items-center gap-2 text-sm text-brand-alt uppercase font-display tracking-[0.08em] font-semibold hover:text-brand transition-colors"
            >
              See the full case
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Top metrics */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="MRR"
          value={metrics.mrr.value}
          trend={{ value: '+8.2% vs last month', direction: 'up' }}
          accent="brand-alt"
        />
        <StatCard
          label="Active Members"
          value={metrics.activeMembers.value}
          trend={{ value: '+12 this month', direction: 'up' }}
          accent="brand"
        />
        <StatCard
          label="At-Risk Payments"
          value="9"
          trend={{ value: '-2 from last week', direction: 'down' }}
          accent="danger"
        />
        <StatCard
          label="Day Passes (30d)"
          value="$420"
          trend={{ value: '+20 vs last month', direction: 'up' }}
          accent="success"
        />
      </div>

      {/* Revenue chart */}
      <section className="relative bg-gradient-to-b from-surface to-surface-2/60 border border-line rounded-2xl p-8 shadow-2xl shadow-black/40 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-alt to-brand" />
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <p className="text-xs text-brand-alt uppercase font-display tracking-[0.12em] font-semibold mb-1">Financial Performance</p>
            <h2 className="text-2xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              Monthly Revenue
            </h2>
            <p className="text-sm text-ink-muted mt-1">12-month trend across all products</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/20 text-success text-xs uppercase font-display tracking-[0.08em] font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            14% YoY
          </span>
        </div>
        <RevenueChart data={revenueData} />
      </section>

      {/* Recent + At Risk */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent signups */}
        <section className="relative bg-gradient-to-b from-surface to-surface-2/40 border border-line rounded-2xl p-8 shadow-2xl shadow-black/40 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success to-brand-alt" />
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs text-success uppercase font-display tracking-[0.12em] font-semibold mb-1">New This Month</p>
              <h2 className="text-xl font-display uppercase text-ink tracking-[0.02em] font-bold">
                Recent Signups
              </h2>
            </div>
            <span className="text-xs text-ink-muted uppercase font-display tracking-[0.12em] px-2.5 py-1 rounded-full bg-surface-2 border border-line">
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
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-brand/15 text-brand text-[10px] uppercase font-display tracking-[0.08em] font-semibold">
                    Monthly
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* At-risk */}
        <section className="relative bg-gradient-to-b from-surface to-surface-2/40 border border-line rounded-2xl p-8 shadow-2xl shadow-black/40 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-danger to-warning" />
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs text-danger uppercase font-display tracking-[0.12em] font-semibold mb-1">Needs Attention</p>
              <h2 className="text-xl font-display uppercase text-ink tracking-[0.02em] font-bold">
                At-Risk Members
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-danger/20 text-danger text-xs uppercase font-display tracking-[0.08em] font-semibold">
              <AlertTriangle className="w-3 h-3" />
              Action
            </span>
          </div>
          {atRisk.length === 0 ? (
            <p className="text-sm text-ink-muted py-8 text-center">No failed payments — nice.</p>
          ) : (
            <ul className="divide-y divide-line">
              {atRisk.map((p) => (
                <li key={p.id} className="py-3 flex items-center gap-3">
                  <span className="w-1 h-10 bg-danger rounded-full shrink-0" aria-hidden />
                  <Avatar name={p.member} />
                  <div className="flex-1 min-w-0">
                    <p className="text-ink font-medium truncate">{p.member}</p>
                    <p className="text-xs text-ink-muted">Last attempt {p.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-danger font-display font-bold">{p.amount}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-danger/15 text-danger text-[10px] uppercase font-display tracking-[0.08em] font-semibold">
                      Failed
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Member growth */}
      <section className="relative bg-gradient-to-b from-surface to-surface-2/60 border border-line rounded-2xl p-8 shadow-2xl shadow-black/40 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand to-brand-alt" />
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <p className="text-xs text-brand uppercase font-display tracking-[0.12em] font-semibold mb-1">Growth Trajectory</p>
            <h2 className="text-2xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              Member Growth
            </h2>
            <p className="text-sm text-ink-muted mt-1">Net active members over the last year</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-alt/20 text-brand-alt text-xs uppercase font-display tracking-[0.08em] font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            348 → 380 (+9.2%)
          </span>
        </div>
        <GrowthChart data={growthData} />
      </section>

      {/* Quick actions */}
      <section className="relative bg-gradient-to-r from-brand/10 via-surface-2 to-brand-alt/10 border border-line rounded-2xl p-7 shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-brand-alt to-success" />
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <p className="text-xs text-brand uppercase font-display tracking-[0.12em] font-semibold">
            Quick Actions
          </p>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-line bg-surface text-ink text-sm uppercase font-display font-semibold tracking-[0.06em] hover:bg-brand/10 hover:border-brand/40 hover:-translate-y-0.5 transition-all">
              <Mail className="w-4 h-4 text-brand" />
              Send Payment Reminder
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-line bg-surface text-ink text-sm uppercase font-display font-semibold tracking-[0.06em] hover:bg-brand-alt/10 hover:border-brand-alt/40 hover:-translate-y-0.5 transition-all">
              <Download className="w-4 h-4 text-brand-alt" />
              Export Member List
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-line bg-surface text-ink text-sm uppercase font-display font-semibold tracking-[0.06em] hover:bg-success/10 hover:border-success/40 hover:-translate-y-0.5 transition-all">
              <BarChart3 className="w-4 h-4 text-success" />
              View Reports
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
