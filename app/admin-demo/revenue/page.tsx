import { AlertTriangle } from 'lucide-react';
import { StatCard } from '@/components/demo/StatCard';
import { RevenueChart } from '@/components/demo/RevenueChart';
import { getMockPayments, getRevenueByMonth } from '@/lib/demo/mock-data';

export const metadata = {
  title: 'Revenue | Admin Dashboard Demo | Repz Gym',
};

export default function RevenuePage() {
  const revenue = getRevenueByMonth();
  const payments = getMockPayments();
  const recent = payments.slice(0, 20);

  const totalYear = revenue.reduce((s, m) => s + (m.membership ?? 0) + (m.daypass ?? 0), 0);
  const failedPayments = payments.filter((p) => p.status === 'failed');
  const failedAmt = failedPayments.reduce(
    (s, p) => s + (Number(p.amount.replace(/[^0-9.]/g, '')) || 0),
    0,
  );
  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl lg:text-5xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            Revenue
          </h1>
          <p className="text-base text-ink-muted mt-2">Track your gym&rsquo;s financial health</p>
        </div>
        <div className="flex gap-1 bg-surface border border-line rounded-sm p-1">
          {['30d', '90d', '12mo'].map((r) => (
            <button
              key={r}
              className={`px-3 py-1.5 text-xs uppercase font-display font-semibold tracking-[0.08em] rounded-sm transition-colors ${
                r === '12mo' ? 'bg-brand text-ink' : 'text-ink-muted hover:text-ink'
              }`}
            >
              Last {r === '12mo' ? '12 months' : r === '30d' ? '30 days' : '90 days'}
            </button>
          ))}
        </div>
      </div>

      {/* Failed payments alert */}
      {failedPayments.length > 0 && (
        <div className="bg-danger/10 border border-danger/40 rounded-md p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-danger shrink-0" />
          <p className="text-sm text-ink">
            <span className="text-danger font-display font-bold uppercase tracking-[0.08em]">
              {failedPayments.length} payments
            </span>{' '}
            need attention — {fmt.format(failedAmt)} outstanding across active members.
          </p>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue (12mo)" value={fmt.format(totalYear)} accent="brand-alt" />
        <StatCard label="MRR" value="$11,400" trend={{ value: '+7.1%', direction: 'up' }} accent="brand" />
        <StatCard label="Avg Revenue / Member" value="$30.85" accent="success" />
        <StatCard
          label="Failed Payments"
          value={fmt.format(failedAmt)}
          trend={{ value: `${failedPayments.length} total`, direction: 'down' }}
          accent="danger"
        />
      </div>

      {/* Stacked revenue chart */}
      <section className="bg-surface border border-line rounded-md p-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <h2 className="text-xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              Revenue Breakdown
            </h2>
            <p className="text-sm text-ink-muted mt-1">Memberships vs Day Passes by month</p>
          </div>
        </div>
        <RevenueChart data={revenue} stacked />
      </section>

      {/* Recent transactions */}
      <section className="bg-surface border border-line rounded-md p-6">
        <h2 className="text-xl font-display uppercase text-ink tracking-[0.02em] font-bold mb-4">
          Recent Transactions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase font-display tracking-[0.08em] text-ink-muted border-b border-line">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Member</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {recent.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 pr-4 text-ink-muted whitespace-nowrap">{p.date}</td>
                  <td className="py-3 pr-4 text-ink">{p.member}</td>
                  <td className="py-3 pr-4 text-ink-muted">
                    {p.kind === 'day_pass' ? 'Day Pass' : 'Subscription'}
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
    </div>
  );
}
