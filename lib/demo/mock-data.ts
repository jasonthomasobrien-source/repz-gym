// lib/demo/mock-data.ts

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'past_due' | 'paused' | 'canceled';
  joined: string;
  plan: string;
}

interface Payment {
  id: string;
  member: string;
  amount: string;
  status: 'succeeded' | 'failed';
  date: string;
  kind: 'subscription' | 'day_pass';
}

interface OverviewMetrics {
  mrr: { value: string; trend: 'up' | 'down'; percent: number };
  activeMembers: { value: string; trend: 'up' | 'down'; percent: number };
  dayPasses: { value: string; trend: 'up' | 'down' | null; percent: number | null };
  failedPayments: { value: string; trend: null; percent: null };
}

const MONTHLY_PRICE = 30;
const DAY_PASS_PRICE = 15;
const TOTAL_MEMBERS = 550;
const ACTIVE_TARGET = 523;

// Deterministic pseudo-random (seeded) so SSR + client match
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateMembers(): Member[] {
  const rand = seededRandom(42);
  const firstNames = [
    'Sarah', 'Mike', 'Chris', 'Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Ashley',
    'James', 'Emma', 'David', 'Olivia', 'Noah', 'Sophia', 'Liam', 'Ava', 'Lucas', 'Mia',
    'Ethan', 'Isabella', 'Mason', 'Charlotte', 'Logan', 'Amelia', 'Daniel', 'Harper', 'Henry', 'Evelyn',
    'Jackson', 'Abigail', 'Sebastian', 'Emily', 'Aiden', 'Elizabeth', 'Matthew', 'Sofia', 'Samuel', 'Madison',
    'Joseph', 'Avery', 'Carter', 'Ella', 'Wyatt', 'Scarlett', 'Owen', 'Grace', 'Dylan', 'Chloe',
    'Luke', 'Lily', 'Gabriel', 'Hannah', 'Anthony', 'Aria', 'Isaac', 'Zoe', 'Grayson', 'Layla',
  ];
  const lastNames = [
    'Johnson', 'Chen', 'Martinez', 'Rivera', 'Lee', 'Smith', 'Williams', 'Brown', 'Jones', 'Garcia',
    'Miller', 'Davis', 'Rodriguez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'White',
    'Harris', 'Clark', 'Lewis', 'Walker', 'Hall', 'Allen', 'Young', 'King', 'Wright', 'Lopez',
    'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts',
  ];
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'icloud.com', 'hotmail.com'];

  // Status distribution out of 550: 523 active, 12 past_due, 8 paused, 7 canceled
  const members: Member[] = [];

  for (let i = 0; i < TOTAL_MEMBERS; i++) {
    let status: Member['status'];
    if (i < ACTIVE_TARGET) status = 'active';
    else if (i < ACTIVE_TARGET + 12) status = 'past_due';
    else if (i < ACTIVE_TARGET + 12 + 8) status = 'paused';
    else status = 'canceled';

    const firstName = firstNames[Math.floor(rand() * firstNames.length)];
    const lastName = lastNames[Math.floor(rand() * lastNames.length)];

    const monthsAgo = Math.floor(rand() * 36);
    const joinDate = new Date(2026, 4, 23);
    joinDate.setMonth(joinDate.getMonth() - monthsAgo);
    const joinedStr = joinDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const phoneSuffix = (1000 + Math.floor(rand() * 9000)).toString();

    members.push({
      id: `member-${i.toString().padStart(3, '0')}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@${domains[i % domains.length]}`,
      phone: `(269) 555-${phoneSuffix}`,
      status,
      joined: joinedStr,
      plan: `$${MONTHLY_PRICE.toFixed(2)}/mo`,
    });
  }

  return members;
}

function generatePayments(members: Member[]): Payment[] {
  const rand = seededRandom(99);
  const payments: Payment[] = [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const amountStr = `$${MONTHLY_PRICE.toFixed(2)}`;

  for (let month = 0; month < 12; month++) {
    const monthStr = monthNames[month];
    const year = 2025;

    for (const member of members) {
      if (member.status === 'canceled' || member.status === 'paused') continue;

      const dayOfMonth = 1 + Math.floor(rand() * 27);
      const dateStr = `${monthStr} ${dayOfMonth}, ${year}`;

      const shouldFail = member.status === 'past_due' || rand() < 0.04;

      payments.push({
        id: `payment-${member.id}-${month}`,
        member: member.name,
        amount: amountStr,
        status: shouldFail ? 'failed' : 'succeeded',
        date: dateStr,
        kind: 'subscription',
      });
    }

    // Day passes per month: ~25-40 scattered
    const dayPassCount = 25 + Math.floor(rand() * 15);
    for (let dp = 0; dp < dayPassCount; dp++) {
      const memberIdx = Math.floor(rand() * members.length);
      const day = 1 + Math.floor(rand() * 27);
      payments.push({
        id: `daypass-${month}-${dp}`,
        member: `Walk-in Guest`,
        amount: `$${DAY_PASS_PRICE.toFixed(2)}`,
        status: rand() < 0.97 ? 'succeeded' : 'failed',
        date: `${monthStr} ${day}, ${year}`,
        kind: 'day_pass',
      });
    }
  }

  return payments;
}

// Cache to keep deterministic data stable across calls
let _members: Member[] | null = null;
let _payments: Payment[] | null = null;

export function getMockMembers(): Member[] {
  if (!_members) _members = generateMembers();
  return _members;
}

export function getMockPayments(): Payment[] {
  if (!_payments) _payments = generatePayments(getMockMembers());
  return _payments;
}

export function getOverviewMetrics(): OverviewMetrics {
  const mrr = ACTIVE_TARGET * MONTHLY_PRICE; // 15,690
  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return {
    mrr: { value: fmt.format(mrr), trend: 'up', percent: 8 },
    activeMembers: { value: ACTIVE_TARGET.toString(), trend: 'up', percent: 4 },
    dayPasses: { value: `$555 (37 passes)`, trend: 'up', percent: 12 },
    failedPayments: { value: `$360 (12)`, trend: null, percent: null },
  };
}

export function getRevenueByMonth() {
  // 12 months trending up: 480 active → 523, plus day pass revenue
  const baseCounts = [482, 488, 491, 496, 502, 507, 511, 515, 517, 520, 521, 523];
  const dayPasses = [380, 410, 360, 425, 470, 510, 540, 520, 480, 495, 525, 555];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return monthNames.map((month, i) => ({
    month,
    membership: baseCounts[i] * MONTHLY_PRICE,
    daypass: dayPasses[i],
  }));
}

export function getMemberGrowth() {
  const counts = [482, 488, 491, 496, 502, 507, 511, 515, 517, 520, 521, 523];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return monthNames.map((month, i) => ({ month, count: counts[i] }));
}

export function getChurnByMonth() {
  return [
    { month: 'Jan', churn: 4 },
    { month: 'Feb', churn: 3 },
    { month: 'Mar', churn: 5 },
    { month: 'Apr', churn: 2 },
    { month: 'May', churn: 3 },
    { month: 'Jun', churn: 1 },
    { month: 'Jul', churn: 2 },
    { month: 'Aug', churn: 4 },
    { month: 'Sep', churn: 3 },
    { month: 'Oct', churn: 2 },
    { month: 'Nov', churn: 3 },
    { month: 'Dec', churn: 2 },
  ];
}

export function getNewestMembers(): Member[] {
  const members = getMockMembers();
  return members.slice(0, 5);
}

export function getAtRiskMembers(): Payment[] {
  const payments = getMockPayments();
  return payments.filter((p) => p.status === 'failed' && p.kind === 'subscription').slice(0, 5);
}

export { MONTHLY_PRICE, DAY_PASS_PRICE, ACTIVE_TARGET, TOTAL_MEMBERS };
