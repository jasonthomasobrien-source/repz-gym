import { Card } from "@/components/ui/Card";
import {
  getActiveMembers,
  getMonthlyRecurringRevenue,
  getFailedPaymentsLastNDays,
  getNewMembersThisMonth,
  getDayPassesSoldLastNDays,
  getRevenueByMonth,
} from "@/lib/data";

export default async function AdminOverview() {
  const [activeMembersCount, mrr, failedPayments, newMembers, dayPasses, revenueByMonth] = await Promise.all([
    getActiveMembers().then(m => m.length),
    getMonthlyRecurringRevenue(),
    getFailedPaymentsLastNDays(7),
    getNewMembersThisMonth(),
    getDayPassesSoldLastNDays(30),
    getRevenueByMonth(),
  ]);

  const dayPassRevenue = dayPasses.reduce((sum, p) => sum + p.amount_cents, 0);
  const failedAmount = failedPayments.reduce((sum, p) => sum + p.amount_cents, 0);

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card variant="dark">
          <div className="text-xs font-display uppercase tracking-eyebrow text-brand">MRR</div>
          <p className="mt-2 text-3xl font-bold text-ink">${(mrr / 100).toFixed(0)}</p>
          <p className="text-xs text-ink-subtle">Monthly recurring revenue</p>
        </Card>
        <Card variant="dark">
          <div className="text-xs font-display uppercase tracking-eyebrow text-brand">Active Members</div>
          <p className="mt-2 text-3xl font-bold text-ink">{activeMembersCount}</p>
          <p className="text-xs text-ink-subtle">Currently subscribed</p>
        </Card>
        <Card variant="dark">
          <div className="text-xs font-display uppercase tracking-eyebrow text-brand">Day Passes (30d)</div>
          <p className="mt-2 text-3xl font-bold text-ink">${(dayPassRevenue / 100).toFixed(0)}</p>
          <p className="text-xs text-ink-subtle">{dayPasses.length} passes</p>
        </Card>
        <Card variant="dark">
          <div className="text-xs font-display uppercase tracking-eyebrow text-danger">Failed (7d)</div>
          <p className="mt-2 text-3xl font-bold text-danger">${(failedAmount / 100).toFixed(0)}</p>
          <p className="text-xs text-ink-subtle">{failedPayments.length} payments</p>
        </Card>
      </div>

      {/* Charts section */}
      <div>
        <h3 className="mb-6 font-display font-bold uppercase text-ink">Revenue Trend (12 months)</h3>
        <Card variant="dark">
          <div className="h-64 rounded bg-surface-2 p-4">
            <table className="w-full text-xs">
              <tbody>
                {revenueByMonth.slice(-12).map(month => (
                  <tr key={month.month} className="border-b border-line">
                    <td className="py-2 text-ink-muted">{month.month}</td>
                    <td className="py-2 text-right text-ink">${(month.revenue_cents / 100).toFixed(0)}</td>
                    <td className="py-2 text-right text-xs text-ink-subtle">
                      {month.successful_payments} payments
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Live lists */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-4 font-display font-bold uppercase text-ink">New Members (This Month)</h3>
          <Card variant="dark">
            {newMembers.length === 0 ? (
              <p className="text-sm text-ink-subtle">No new signups this month. Share your join link on Facebook.</p>
            ) : (
              <div className="space-y-2">
                {newMembers.slice(0, 5).map(m => (
                  <div key={m.id} className="border-b border-line pb-2 text-sm">
                    <p className="font-semibold text-ink">{m.first_name} {m.last_name}</p>
                    <p className="text-xs text-ink-subtle">{new Date(m.joined_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div>
          <h3 className="mb-4 font-display font-bold uppercase text-ink">At Risk</h3>
          <Card variant="dark">
            {failedPayments.length === 0 ? (
              <p className="text-sm text-ink-subtle">🎯 No failed payments in the last 7 days. Everything's clean.</p>
            ) : (
              <div className="space-y-2">
                {failedPayments.slice(0, 5).map(p => (
                  <div key={p.id} className="border-b border-line pb-2 text-sm">
                    <p className="font-semibold text-danger">${(p.amount_cents / 100).toFixed(0)}</p>
                    <p className="text-xs text-ink-subtle">{p.failure_reason || "Payment failed"}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
