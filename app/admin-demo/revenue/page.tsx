import { AlertTriangle, DollarSign } from 'lucide-react';
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
    <div className="space-y-10">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs text-brand-alt uppercase font-display tracking-[0.12em] font-semibold mb-2">Financials</p>
          <h1 className="text-4xl lg:text-5xl font-display uppercase text-ink tracking-[0.02em] font-bold">
            Revenue
          </h1>
          <p className="text-base text-ink-muted mt-2">Track your gym&rsquo;s financial health</p>
        </div>
        <div className="flex gap-1 bg-surface border border-line rounded-xl p-1 shadow-lg shadow-black/30">
          {['30d', '90d', '12mo'].map((r) => (
            <button
              key={r}
              className={`px-4 py-2 text-xs uppercase font-display font-semibold tracking-[0.08em] rounded-lg transition-all ${
                r === '12mo'
                  ? 'bg-gradient-to-r from-brand to-brand-hot text-ink shadow-lg shadow-brand/30'
                  : 'text-ink-muted hover:text-ink hover:bg-surface-2'
              }`}
            >
              Last {r === '12mo' ? '12 months' : r === '30d' ? '30 days' : '90 days'}
            </button>
          ))}
        </div>
      </div>

      {/* Failed payments alert */}
      {failedPayments.length > 0 && (
        <div className="relative bg-gradient-to-r from-danger/15 via-surface to-surface border border-danger/40 rounded-2xl p-5 flex items-center gap-3 shadow-xl shadow-danger/10 overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-danger" />
          <div className="w-10 h-10 rounded-xl bg-danger/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-danger" />
          </div>
          <p className="text-sm text-ink">
            <span className="text-danger font-display font-bold uppercase tracking-[0.08em]">
              {failedPayments.length} payments
            </span>{' '}
            need attention — <span className="font-display font-bold">{fmt.format(failedAmt)}</span> outstanding across active members.
          </p>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
      <section className="relative bg-gradient-to-b from-surface to-surface-2/60 border border-line rounded-2xl p-8 shadow-2xl shadow-black/40 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-alt via-brand to-success" />
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <p className="text-xs text-brand uppercase font-display tracking-[0.12em] font-semibold mb-1">Product Mix</p>
            <h2 className="text-2xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              Revenue Breakdown
            </h2>
            <p className="text-sm text-ink-muted mt-1">Memberships vs Day Passes by month</p>
          </div>
        </div>
        <RevenueChart data={revenue} stacked />
      </section>

      {/* Recent transactions */}
      <section className="relative bg-gradient-to-b from-surface to-surface-2/40 border border-line rounded-2xl p-8 shadow-2xl shadow-black/40 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success to-brand" />
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <div>
            <p className="text-xs text-success uppercase font-display tracking-[0.12em] font-semibold mb-1">Transaction Log</p>
            <h2 className="text-2xl font-display uppercase text-ink tracking-[0.02em] font-bold">
              Recent Transactions
            </h2>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/15 text-success text-xs uppercase font-display tracking-[0.08em] font-semibold">
            <DollarSign className="w-3.5 h-3.5" />
            Last 20
          </div>
        </div>
        <div className="rounded-2xl border border-line overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-2 text-left text-xs uppercase font-display tracking-[0.08em] text-ink-muted border-b-2 border-brand/30">
                  <th className="py-4 px-5">Date</th>
                  <th className="py-4 px-5">Member</th>
                  <th className="py-4 px-5">Type</th>
                  <th className="py-4 px-5">Amount</th>
                  <th className="py-4 px-5">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((p) => (
                  <tr key={p.id} className="even:bg-surface-2/40 hover:bg-brand/5 transition-colors border-b border-line/50 last:border-0">
                    <td className="py-4 px-5 text-ink-muted whitespace-nowrap font-display tabular-nums">{p.date}</td>
                    <td className="py-4 px-5 text-ink">{p.member}</td>
                    <td className="py-4 px-5 text-ink-muted">
                      {p.kind === 'day_pass' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-success/15 text-success text-[10px] uppercase font-display tracking-[0.08em] font-semibold">
                          Day Pass
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-brand-alt/15 text-brand-alt text-[10px] uppercase font-display tracking-[0.08em] font-semibold">
                          Subscription
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-ink font-display font-semibold tabular-nums">{p.amount}</td>
                    <td className="py-4 px-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs uppercase font-display font-semibold tracking-[0.08em] ${
                          p.status === 'succeeded'
                            ? 'bg-success/20 text-success border-success/40'
                            : 'bg-danger/20 text-danger border-danger/40'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'succeeded' ? 'bg-success' : 'bg-danger'}`} aria-hidden />
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
