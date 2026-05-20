"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getMembers, getPaymentsByMemberId } from "@/lib/data";
import { useEffect } from "react";

type Member = Awaited<ReturnType<typeof getMembers>>[0];
type Payment = Awaited<ReturnType<typeof getPaymentsByMemberId>>[0];

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Record<string, Payment[]>>({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [expandedMemberId, setExpandedMemberId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const m = await getMembers();
      setMembers(m.filter((mb) => !mb.is_admin));

      // Load payments for all members
      const paymentMap: Record<string, Payment[]> = {};
      for (const member of m) {
        if (!member.is_admin) {
          paymentMap[member.id] = await getPaymentsByMemberId(member.id);
        }
      }
      setPayments(paymentMap);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    let result = members;
    if (statusFilter) {
      result = result.filter((m) => m.status === statusFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.first_name.toLowerCase().includes(q) ||
          m.last_name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => a.first_name.localeCompare(b.first_name));
  }, [members, search, statusFilter]);

  if (loading) {
    return <div className="text-ink-muted">Loading members...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex-1">
          <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 rounded text-sm border border-line bg-surface text-ink placeholder-ink-muted focus:outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-eyebrow text-brand mb-2">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded text-sm border border-line bg-surface text-ink focus:outline-none focus:border-brand"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="past_due">Past due</option>
            <option value="paused">Paused</option>
            <option value="canceled">Canceled</option>
            <option value="prospect">Prospect</option>
          </select>
        </div>
      </div>

      {/* Members table */}
      <Card variant="dark">
        {filtered.length === 0 ? (
          <p className="text-sm text-ink-subtle">No members match your search.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="px-4 py-3 text-left font-semibold text-ink-muted">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-muted">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-muted">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-muted">Joined</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-muted">Payments</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((member) => {
                  const isExpanded = expandedMemberId === member.id;
                  const memberPayments = payments[member.id] || [];
                  const recentPayments = memberPayments.slice(0, 5);

                  return (
                    <tbody key={member.id}>
                      <tr
                        className="border-b border-line hover:bg-surface-2 cursor-pointer"
                        onClick={() =>
                          setExpandedMemberId(isExpanded ? null : member.id)
                        }
                      >
                        <td className="px-4 py-3 font-semibold text-ink">{member.first_name} {member.last_name}</td>
                        <td className="px-4 py-3 text-ink-muted text-xs">{member.email}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-semibold uppercase ${
                              member.status === "active"
                                ? "bg-success/20 text-success"
                                : member.status === "past_due"
                                ? "bg-danger/20 text-danger"
                                : member.status === "paused"
                                ? "bg-warning/20 text-warning"
                                : "bg-ink-subtle/20 text-ink-subtle"
                            }`}
                          >
                            {member.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-ink-muted text-xs">
                          {new Date(member.joined_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right text-ink-muted">
                          {memberPayments.length}
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="bg-surface-2">
                          <td colSpan={5} className="px-4 py-4">
                            <div className="space-y-4">
                              <div className="grid gap-4 md:grid-cols-3">
                                <div>
                                  <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-1">
                                    Email
                                  </p>
                                  <p className="text-sm text-ink">{member.email}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-1">
                                    Phone
                                  </p>
                                  <p className="text-sm text-ink">
                                    {member.phone_number
                                      ? member.phone_number.replace(/(\+\d{1,2})(\d{3})(\d{3})(\d{4})/, "$1 ($2) $3-$4")
                                      : "—"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-1">
                                    Status
                                  </p>
                                  <p className="text-sm text-ink capitalize">{member.status}</p>
                                </div>
                              </div>

                              <div>
                                <p className="text-xs font-display uppercase tracking-eyebrow text-brand mb-3">
                                  Recent Payments
                                </p>
                                {recentPayments.length === 0 ? (
                                  <p className="text-xs text-ink-subtle">No payments</p>
                                ) : (
                                  <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {recentPayments.map((payment) => (
                                      <div
                                        key={payment.id}
                                        className="flex items-center justify-between rounded bg-surface p-2 text-xs border border-line"
                                      >
                                        <div>
                                          <p className="font-semibold text-ink">
                                            ${(payment.amount_cents / 100).toFixed(2)}
                                          </p>
                                          <p className="text-ink-muted capitalize">
                                            {payment.kind === "membership" ? "Monthly" : "Day pass"}
                                          </p>
                                        </div>
                                        <div className="text-right">
                                          <p
                                            className={`font-semibold uppercase ${
                                              payment.status === "succeeded"
                                                ? "text-success"
                                                : payment.status === "failed"
                                                ? "text-danger"
                                                : "text-ink-muted"
                                            }`}
                                          >
                                            {payment.status}
                                          </p>
                                          <p className="text-ink-muted">
                                            {payment.paid_at
                                              ? new Date(payment.paid_at).toLocaleDateString()
                                              : "—"}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <p className="mt-4 text-xs text-ink-subtle">
          {filtered.length} member{filtered.length !== 1 ? "s" : ""}
        </p>
      </Card>
    </div>
  );
}
