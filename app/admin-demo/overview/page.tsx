import { AlertTriangle, Mail, Download, BarChart3 } from 'lucide-react';
import { StatCard } from '@/components/demo/StatCard';
import { RevenueChart, GrowthChart } from '@/components/demo/RevenueChart';
import { Avatar } from '@/components/demo/Avatar';
import {
  getAtRiskMembers,
  getMemberGrowth,
  getNewestMembers,
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

      {/* Top metrics */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="MRR"
          value="$4,799"
          trend={{ value: '+12.3% vs last month', direction: 'up' }}
          accent="brand-alt"
        />
        <StatCard
          label="Active Members"
          value="48"
          trend={{ value: '+5 this month', direction: 'up' }}
          accent="brand"
        />
        <StatCard
          label="At-Risk Payments"
          value="2"
          trend={{ value: '-1 from last week', direction: 'down' }}
          accent="danger"
        />
        <StatCard
          label="Day Passes (30d)"
          value="$287"
          trend={{ value: '+3 vs last month', direction: 'up' }}
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
            35 → 48 (+37%)
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
