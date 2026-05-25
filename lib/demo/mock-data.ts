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
const TOTAL_MEMBERS = 410;
const ACTIVE_TARGET = 380;

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

  // Status distribution out of 410: 380 active, 9 past_due, 6 paused, 15 canceled
  const members: Member[] = [];

  for (let i = 0; i < TOTAL_MEMBERS; i++) {
    let status: Member['status'];
    if (i < ACTIVE_TARGET) status = 'active';
    else if (i < ACTIVE_TARGET + 9) status = 'past_due';
    else if (i < ACTIVE_TARGET + 9 + 6) status = 'paused';
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
  const mrr = ACTIVE_TARGET * MONTHLY_PRICE; // 11,400
  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return {
    mrr: { value: fmt.format(mrr), trend: 'up', percent: 7 },
    activeMembers: { value: ACTIVE_TARGET.toString(), trend: 'up', percent: 4 },
    dayPasses: { value: `$420 (28 passes)`, trend: 'up', percent: 10 },
    failedPayments: { value: `$270 (9)`, trend: null, percent: null },
  };
}

export function getRevenueByMonth() {
  // 12 months trending up: 348 active → 380, plus day pass revenue
  const baseCounts = [348, 352, 355, 360, 364, 367, 370, 373, 375, 377, 379, 380];
  const dayPasses = [290, 320, 270, 335, 365, 395, 410, 390, 360, 375, 400, 420];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return monthNames.map((month, i) => ({
    month,
    membership: baseCounts[i] * MONTHLY_PRICE,
    daypass: dayPasses[i],
  }));
}

export function getMemberGrowth() {
  const counts = [348, 352, 355, 360, 364, 367, 370, 373, 375, 377, 379, 380];
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

// ============================================================================
// Check-In System
// ============================================================================

interface CheckIn {
  id: string;
  memberName: string;
  memberId: string;
  time: string; // "12:42 PM"
  minutesAgo: number;
  method: 'QR' | 'Fob' | 'Day Pass';
  type: 'Member' | 'Day Pass';
}

interface InactiveMember {
  id: string;
  name: string;
  email: string;
  lastSeen: string; // "April 28, 2026"
  daysAgo: number;
}

interface HourlyCount {
  hour: string; // "6am", "5pm" etc
  count: number;
}

const DAY_PASS_GUEST_NAMES = [
  'Marcus Reed', 'Tina Vargas', 'Devon Park', 'Rachel Doyle',
  'Brian Foster', 'Jenna Cole', 'Marcus Reed', 'Eli Brooks',
];

function formatClockTime(date: Date): string {
  let h = date.getHours();
  const m = date.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
}

export function getCurrentlyCheckedIn(): CheckIn[] {
  const members = getMockMembers().filter((m) => m.status === 'active');
  const rand = seededRandom(7777);
  // 12 currently checked in: ~10 members + 2 day passes
  const result: CheckIn[] = [];
  // Anchor "now" to a deterministic 12:42 PM
  const now = new Date(2026, 4, 24, 12, 42);

  for (let i = 0; i < 10; i++) {
    const idx = Math.floor(rand() * members.length);
    const member = members[idx];
    const minutesAgo = Math.floor(rand() * 110) + 2;
    const t = new Date(now.getTime() - minutesAgo * 60000);
    result.push({
      id: `current-${i}`,
      memberName: member.name,
      memberId: member.id,
      time: formatClockTime(t),
      minutesAgo,
      method: rand() < 0.55 ? 'QR' : 'Fob',
      type: 'Member',
    });
  }

  for (let i = 0; i < 2; i++) {
    const minutesAgo = Math.floor(rand() * 90) + 5;
    const t = new Date(now.getTime() - minutesAgo * 60000);
    result.push({
      id: `current-dp-${i}`,
      memberName: DAY_PASS_GUEST_NAMES[i],
      memberId: `dp-${i}`,
      time: formatClockTime(t),
      minutesAgo,
      method: 'Day Pass',
      type: 'Day Pass',
    });
  }

  return result.sort((a, b) => a.minutesAgo - b.minutesAgo);
}

export function getRecentCheckIns(): CheckIn[] {
  const members = getMockMembers().filter((m) => m.status === 'active');
  const rand = seededRandom(4242);
  const result: CheckIn[] = [];
  const now = new Date(2026, 4, 24, 12, 42);

  // 30 most recent, stepping back by 1-6 minutes
  let elapsed = 0;
  for (let i = 0; i < 30; i++) {
    elapsed += 1 + Math.floor(rand() * 6);
    const t = new Date(now.getTime() - elapsed * 60000);
    const isDayPass = rand() < 0.12;

    if (isDayPass) {
      result.push({
        id: `recent-${i}`,
        memberName: DAY_PASS_GUEST_NAMES[Math.floor(rand() * DAY_PASS_GUEST_NAMES.length)],
        memberId: `dp-r-${i}`,
        time: formatClockTime(t),
        minutesAgo: elapsed,
        method: 'Day Pass',
        type: 'Day Pass',
      });
    } else {
      const idx = Math.floor(rand() * members.length);
      const member = members[idx];
      result.push({
        id: `recent-${i}`,
        memberName: member.name,
        memberId: member.id,
        time: formatClockTime(t),
        minutesAgo: elapsed,
        method: rand() < 0.6 ? 'QR' : 'Fob',
        type: 'Member',
      });
    }
  }

  return result;
}

export function getInactiveMembers(): InactiveMember[] {
  const members = getMockMembers().filter((m) => m.status === 'active');
  const rand = seededRandom(1234);
  const result: InactiveMember[] = [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // "today" = May 24, 2026
  const today = new Date(2026, 4, 24);

  for (let i = 0; i < 10; i++) {
    const idx = Math.floor(rand() * members.length);
    const member = members[idx];
    const daysAgo = 14 + Math.floor(rand() * 35);
    const lastDate = new Date(today.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    const lastSeenStr = `${monthNames[lastDate.getMonth()]} ${lastDate.getDate()}, ${lastDate.getFullYear()}`;
    result.push({
      id: `inactive-${i}`,
      name: member.name,
      email: member.email,
      lastSeen: lastSeenStr,
      daysAgo,
    });
  }

  return result.sort((a, b) => b.daysAgo - a.daysAgo);
}

export function getHourlyCheckIns(): HourlyCount[] {
  // 6am to 9pm = 16 hours
  // Realistic: morning rush at 6:30am (~22), light midday, lunch dip ~5,
  // afternoon climb, peak at 5:30pm (~31), evening tail off
  const data: HourlyCount[] = [
    { hour: '6am', count: 8 },
    { hour: '7am', count: 11 },
    { hour: '8am', count: 7 },
    { hour: '9am', count: 4 },
    { hour: '10am', count: 3 },
    { hour: '11am', count: 4 },
    { hour: '12pm', count: 5 },
    { hour: '1pm', count: 2 },
    { hour: '2pm', count: 3 },
    { hour: '3pm', count: 4 },
    { hour: '4pm', count: 8 },
    { hour: '5pm', count: 14 },
    { hour: '6pm', count: 15 },
    { hour: '7pm', count: 11 },
    { hour: '8pm', count: 7 },
    { hour: '9pm', count: 3 },
  ];
  return data;
}

export { MONTHLY_PRICE, DAY_PASS_PRICE, ACTIVE_TARGET, TOTAL_MEMBERS };
export type { CheckIn, InactiveMember, HourlyCount };
