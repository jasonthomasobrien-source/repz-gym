import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CreditCard, MessageSquare, PauseCircle, XCircle, Activity } from 'lucide-react';
import { Avatar } from '@/components/demo/Avatar';
import { StatusBadge } from '@/components/demo/StatusBadge';
import { getMockMembers, getMockPayments } from '@/lib/demo/mock-data';

export const metadata = {
  title: 'Member Detail | Admin Dashboard Demo | Repz Gym',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

function parseAmount(s: string): number {
  return Number(s.replace(/[^0-9.]/g, '')) || 0;
}

function monthsSince(joined: string): number {
  const t = Date.parse(joined);
  if (!Number.isFinite(t)) return 0;
  const diff = Date.now() - t;
  return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24 * 30)));
}

export default async function MemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  const members = getMockMembers();
  const member = members.find((m) => m.id === id);
  if (!member) notFound();

  const allPayments = getMockPayments();
  const memberPayments = allPayments
    .filter((p) => p.member === member.name || p.member === `Day Pass - ${member.name}`)
    .slice(0, 12);

  const totalPaid = memberPayments
    .filter((p) => p.status === 'succeeded')
    .reduce((sum, p) => sum + parseAmount(p.amount), 0);
  const months = monthsSince(member.joined);
  const avgMonthly = months > 0 ? totalPaid / months : 0;

  const fmtMoney = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

  return (
    <div className="space-y-6">
      <Link
        href="/admin-demo/members"
        className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-brand transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to members
      </Link>

      {/* Header */}
      <div className="bg-surface border border-line rounded-md p-6 flex flex-wrap items-start gap-6">
        <Avatar name={member.name} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl lg:text-4xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              {member.name}
            </h1>
            <StatusBadge status={member.status} />
          </div>
          <p className="text-sm text-ink-muted mt-2">{member.email}</p>
          <p className="text-sm text-ink-muted">{member.phone}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-sm border border-line text-xs uppercase font-display font-semibold tracking-[0.08em] text-ink hover:bg-surface-2 transition-colors">
            <MessageSquare className="w-4 h-4 text-brand-alt" /> Message
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-sm border border-line text-xs uppercase font-display font-semibold tracking-[0.08em] text-ink hover:bg-surface-2 transition-colors">
            <PauseCircle className="w-4 h-4 text-warning" /> Pause
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-sm border border-line text-xs uppercase font-display font-semibold tracking-[0.08em] text-danger hover:bg-surface-2 transition-colors">
            <XCircle className="w-4 h-4" /> Cancel
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Member Since', value: `${months} mo` },
          { label: 'Total Paid', value: fmtMoney(totalPaid) },
          { label: 'Avg Monthly', value: fmtMoney(avgMonthly) },
          { label: 'Visits This Month', value: '12' },
        ].map((s) => (
          <div key={s.label} className="bg-surface border border-line rounded-md p-4">
            <p className="text-xs text-ink-muted uppercase font-display tracking-[0.12em] font-semibold mb-2">
              {s.label}
            </p>
            <p className="text-2xl font-display font-bold text-ink">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Card on file */}
      <section className="bg-surface border border-line rounded-md p-6">
        <h2 className="text-lg font-display uppercase text-ink tracking-[0.02em] font-bold mb-4">
          Card On File
        </h2>
        <div className="flex items-center gap-4 bg-surface-2 border border-line rounded-md p-4">
          <div className="w-12 h-12 rounded-md bg-gradient-to-br from-brand to-brand-hot flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-ink" />
          </div>
          <div>
            <p className="text-ink font-medium">Visa ending in 4242</p>
            <p className="text-xs text-ink-muted">Expires 12/27 · Default</p>
          </div>
        </div>
      </section>

      {/* Payment history */}
      <section className="bg-surface border border-line rounded-md p-6">
        <h2 className="text-lg font-display uppercase text-ink tracking-[0.02em] font-bold mb-4">
          Payment History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase font-display tracking-[0.08em] text-ink-muted border-b border-line">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Description</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {memberPayments.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-ink-muted">
                    No payments on record yet.
                  </td>
                </tr>
              )}
              {memberPayments.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 pr-4 text-ink-muted">{p.date}</td>
                  <td className="py-3 pr-4 text-ink">
                    {p.kind === 'day_pass' ? 'Day Pass' : 'Monthly Membership'}
                  </td>
                  <td className="py-3 pr-4 text-ink font-display font-semibold">{p.amount}</td>
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-sm border text-xs uppercase font-display font-semibold tracking-[0.08em] ${
                        p.status === 'succeeded'
                          ? 'bg-success/15 text-success border-success/30'
                          : 'bg-danger/15 text-danger border-danger/30'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Activity */}
      <section className="bg-surface border border-line rounded-md p-6">
        <h2 className="text-lg font-display uppercase text-ink tracking-[0.02em] font-bold mb-4">
          Activity
        </h2>
        <div className="flex items-center gap-4">
          <Activity className="w-8 h-8 text-brand-alt" />
          <div>
            <p className="text-ink">Last check-in: <span className="text-brand-alt font-semibold">2 days ago</span></p>
            <p className="text-sm text-ink-muted">Visited 8 times this month · 38 visits last 90 days</p>
          </div>
        </div>
      </section>
    </div>
  );
}
