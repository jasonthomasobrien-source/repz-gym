"use client";

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { getPayments, getRevenueByMonth, getMonthlyRecurringRevenue } from "@/lib/data";

type Payment = Awaited<ReturnType<typeof getPayments>>[0];

export default function RevenuePage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [revenueByMonth, setRevenueByMonth] = useState<any[]>([]);
  const [mrr, setMrr] = useState(0);
  const [timeRange, setTimeRange] = useState<"month" | "quarter" | "year" | "all">("year");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [p, r, m] = await Promise.all([
        getPayments(),
        getRevenueByMonth(),
        getMonthlyRecurringRevenue(),
      ]);
      setPayments(p);
      setRevenueByMonth(r);
      setMrr(m);
      setLoading(false);
    }
    load();
  }, []);

  const filteredRevenue = useMemo(() => {
    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "quarter":
        const quarter = Math.floor(now.getMonth() / 3);
        startDate = new Date(now.getFullYear(), quarter * 3, 1);
        break;
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0);
    }

    return revenueByMonth.filter((m) => new Date(m.month + "-01") >= startDate);
  }, [revenueByMonth, timeRange]);

  const stats = useMemo(() => {
    const succeeded = payments.filter((p) => p.status === "succeeded");
    const failed = payments.filter((p) => p.status === "failed");
    const dayPasses = succeeded.filter((p) => p.kind === "day_pass");
    const memberships = succeeded.filter((p) => p.kind === "membership");

    const totalRevenue = succeeded.reduce((sum, p) => sum + p.amount_cents, 0);
    const membershipRevenue = memberships.reduce((sum, p) => sum + p.amount_cents, 0);
    const dayPassRevenue = dayPasses.reduce((sum, p) => sum + p.amount_cents, 0);
    const failedRevenue = failed.reduce((sum, p) => sum + p.amount_cents, 0);

    return {
      totalRevenue,
      membershipRevenue,
      dayPassRevenue,
      failedRevenue,
      successRate: succeeded.length + failed.length > 0
        ? (succeeded.length / (succeeded.length + failed.length)) * 100
        : 0,
      totalPayments: succeeded.length,
      failedPayments: failed.length,
    };
  }, [payments]);

  if (loading) {
    return <div className="text-ink-muted">Loading revenue data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Time range filter */}
      <div>
        <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
          Time Range
        </label>
        <div className="flex gap-2 flex-wrap">
          {(["month", "quarter", "year", "all"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-2 rounded text-xs font-semibold uppercase ${
                timeRange === range
                  ? "bg-brand text-surface"
                  : "border border-line bg-surface text-ink hover:bg-surface-2"
              }`}
            >
              {range === "month"
                ? "This Month"
                : range === "quarter"
                ? "This Quarter"
                : range === "year"
                ? "This Year"
                : "All Time"}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card variant="dark">
          <div className="text-xs font-display uppercase tracking-eyebrow text-brand">Total Revenue</div>
          <p className="mt-2 text-3xl font-bold text-ink">${(stats.totalRevenue / 100).toFixed(0)}</p>
          <p className="text-xs text-ink-subtle">{stats.totalPayments} payments</p>
        </Card>
        <Card variant="dark">
          <div className="text-xs font-display uppercase tracking-eyebrow text-brand">Membership Revenue</div>
          <p className="mt-2 text-3xl font-bold text-ink">${(stats.membershipRevenue / 100).toFixed(0)}</p>
          <p className="text-xs text-ink-subtle">${(mrr / 100).toFixed(0)} MRR</p>
        </Card>
        <Card variant="dark">
          <div className="text-xs font-display uppercase tracking-eyebrow text-brand">Day Passes</div>
          <p className="mt-2 text-3xl font-bold text-ink">${(stats.dayPassRevenue / 100).toFixed(0)}</p>
          <p className="text-xs text-ink-subtle">One-time revenue</p>
        </Card>
        <Card variant="dark">
          <div className="text-xs font-display uppercase tracking-eyebrow text-danger">Failed Charges</div>
          <p className="mt-2 text-3xl font-bold text-danger">${(stats.failedRevenue / 100).toFixed(0)}</p>
          <p className="text-xs text-ink-subtle">{stats.failedPayments} failed</p>
        </Card>
      </div>

      {/* Revenue by month table */}
      <div>
        <h3 className="mb-6 font-display font-bold uppercase text-ink">Revenue by Month</h3>
        <Card variant="dark">
          {filteredRevenue.length === 0 ? (
            <p className="text-sm text-ink-subtle">No data for this period.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th className="px-4 py-3 text-left font-semibold text-ink-muted">Month</th>
                    <th className="px-4 py-3 text-right font-semibold text-ink-muted">Revenue</th>
                    <th className="px-4 py-3 text-right font-semibold text-ink-muted">Membership</th>
                    <th className="px-4 py-3 text-right font-semibold text-ink-muted">Day Passes</th>
                    <th className="px-4 py-3 text-right font-semibold text-ink-muted">Successful</th>
                    <th className="px-4 py-3 text-right font-semibold text-ink-muted">Failed</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRevenue.map((month) => (
                    <tr key={month.month} className="border-b border-line hover:bg-surface-2">
                      <td className="px-4 py-3 font-semibold text-ink">{month.month}</td>
                      <td className="px-4 py-3 text-right font-bold text-brand">
                        ${(month.revenue_cents / 100).toFixed(0)}
                      </td>
                      <td className="px-4 py-3 text-right text-ink">
                        ${(month.membership_revenue_cents / 100).toFixed(0)}
                      </td>
                      <td className="px-4 py-3 text-right text-ink">
                        ${(month.day_pass_revenue_cents / 100).toFixed(0)}
                      </td>
                      <td className="px-4 py-3 text-right text-success">{month.successful_payments}</td>
                      <td className="px-4 py-3 text-right text-danger">{month.failed_payments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* All payments table */}
      <div>
        <h3 className="mb-6 font-display font-bold uppercase text-ink">All Payments</h3>
        <Card variant="dark">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="px-4 py-3 text-left font-semibold text-ink-muted">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-muted">Member</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-muted">Type</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-muted">Amount</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-muted">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments
                  .slice()
                  .sort((a, b) => {
                    if (!a.paid_at || !b.paid_at) return 0;
                    return new Date(b.paid_at).getTime() - new Date(a.paid_at).getTime();
                  })
                  .slice(0, 50)
                  .map((payment) => (
                    <tr key={payment.id} className="border-b border-line hover:bg-surface-2">
                      <td className="px-4 py-3 text-ink-muted text-xs">
                        {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-4 py-3 text-ink text-xs">{payment.member_id.slice(0, 8)}</td>
                      <td className="px-4 py-3 capitalize text-ink-muted">
                        {payment.kind === "membership" ? "Monthly" : "Day pass"}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-ink">
                        ${(payment.amount_cents / 100).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold uppercase ${
                            payment.status === "succeeded"
                              ? "bg-success/20 text-success"
                              : payment.status === "failed"
                              ? "bg-danger/20 text-danger"
                              : "bg-warning/20 text-warning"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
