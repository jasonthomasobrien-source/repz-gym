// Data access layer — swap the source without touching pages
// For demo: reads from lib/mock
// For production: swap to lib/supabase

import {
  TRAINERS,
  CLASSES,
  CLASS_SESSIONS,
  MEMBERS,
  SUBSCRIPTIONS,
  generatePayments,
  generateCheckIns,
  CONTACT_MESSAGES,
} from "@/lib/mock/data";

// Cache for generated data
let cachedPayments: any[] | null = null;
let cachedCheckIns: any[] | null = null;

export async function getTrainers() {
  return TRAINERS;
}

export async function getClasses() {
  return CLASSES;
}

export async function getClassSessions() {
  return CLASS_SESSIONS;
}

export async function getMembers() {
  return MEMBERS;
}

export async function getMemberById(id: string) {
  return MEMBERS.find((m) => m.id === id);
}

export async function getSubscriptions() {
  return SUBSCRIPTIONS;
}

export async function getPayments() {
  if (!cachedPayments) {
    cachedPayments = generatePayments();
  }
  return cachedPayments;
}

export async function getCheckIns() {
  if (!cachedCheckIns) {
    cachedCheckIns = generateCheckIns();
  }
  return cachedCheckIns;
}

export async function getContactMessages() {
  return CONTACT_MESSAGES;
}

// Dashboard helpers
export async function getActiveMembers() {
  return MEMBERS.filter((m) => m.status === "active");
}

export async function getMonthlyRecurringRevenue() {
  const subscriptions = await getSubscriptions();
  const active = subscriptions.filter((s) => s.status === "active");
  return active.reduce((sum, s) => sum + s.amount_cents, 0);
}

export async function getRevenueByMonth() {
  const payments = await getPayments();
  const byMonth: Record<string, any> = {};

  for (const payment of payments) {
    if (!payment.paid_at) continue;
    const date = new Date(payment.paid_at);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    if (!byMonth[month]) {
      byMonth[month] = {
        month,
        revenue_cents: 0,
        membership_revenue_cents: 0,
        day_pass_revenue_cents: 0,
        successful_payments: 0,
        failed_payments: 0,
        day_passes_sold: 0,
      };
    }

    if (payment.status === "succeeded") {
      byMonth[month].revenue_cents += payment.amount_cents;
      byMonth[month].successful_payments++;
      if (payment.kind === "membership") {
        byMonth[month].membership_revenue_cents += payment.amount_cents;
      } else {
        byMonth[month].day_pass_revenue_cents += payment.amount_cents;
        byMonth[month].day_passes_sold++;
      }
    } else if (payment.status === "failed") {
      byMonth[month].failed_payments++;
    }
  }

  return Object.values(byMonth).sort((a, b) => a.month.localeCompare(b.month));
}

export async function getFailedPaymentsLastNDays(days: number) {
  const payments = await getPayments();
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return payments.filter((p) => p.status === "failed" && new Date(p.paid_at) > since);
}

export async function getNewMembersThisMonth() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  return MEMBERS.filter((m) => new Date(m.joined_at) >= monthStart && !m.is_admin);
}

export async function getDayPassesSoldLastNDays(days: number) {
  const payments = await getPayments();
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return payments.filter(
    (p) => p.kind === "day_pass" && p.status === "succeeded" && new Date(p.paid_at) > since
  );
}

export async function getPaymentsByMemberId(memberId: string) {
  const payments = await getPayments();
  return payments.filter((p) => p.member_id === memberId).sort((a, b) => {
    if (!a.paid_at || !b.paid_at) return 0;
    return new Date(b.paid_at).getTime() - new Date(a.paid_at).getTime();
  });
}

export async function getMemberWithPaymentHistory(id: string) {
  const member = await getMemberById(id);
  if (!member) return null;
  const payments = await getPaymentsByMemberId(id);
  return { ...member, payments };
}

export async function searchMembers(query: string) {
  if (!query.trim()) return MEMBERS.filter((m) => !m.is_admin);
  const q = query.toLowerCase();
  return MEMBERS.filter(
    (m) =>
      !m.is_admin &&
      (m.first_name.toLowerCase().includes(q) ||
        m.last_name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q))
  );
}
