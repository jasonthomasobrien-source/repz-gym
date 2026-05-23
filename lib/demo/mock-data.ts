// lib/demo/mock-data.ts

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'past_due' | 'paused' | 'canceled';
  joined: string; // "Mar 14, 2025"
  plan: string; // "$99.99/mo"
}

interface Payment {
  id: string;
  member: string; // name
  amount: string; // "$99.99"
  status: 'succeeded' | 'failed';
  date: string; // "Dec 14, 2025"
  kind: 'subscription' | 'day_pass';
}

interface OverviewMetrics {
  mrr: { value: string; trend: 'up' | 'down'; percent: number };
  activeMembers: { value: string; trend: 'up' | 'down'; percent: number };
  dayPasses: { value: string; trend: 'up' | 'down' | null; percent: number | null };
  failedPayments: { value: string; trend: null; percent: null };
}

// Generate 50 members with realistic distribution
function generateMembers(): Member[] {
  const firstNames = ['Sarah', 'Mike', 'Chris', 'Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Ashley'];
  const lastNames = ['Johnson', 'Chen', 'Martinez', 'Rivera', 'Lee', 'Smith', 'Williams', 'Brown', 'Jones', 'Garcia'];
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com'];

  const statuses: Array<'active' | 'past_due' | 'paused' | 'canceled'> = ['active', 'active', 'active', 'active', 'active', 'active', 'active', 'past_due', 'paused', 'canceled'];

  const members: Member[] = [];

  for (let i = 0; i < 50; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
    const status = statuses[i % statuses.length];

    // Joined dates spread over past 2 years
    const monthsAgo = Math.floor(Math.random() * 24);
    const joinDate = new Date();
    joinDate.setMonth(joinDate.getMonth() - monthsAgo);
    const joinedStr = joinDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    members.push({
      id: `member-${i.toString().padStart(3, '0')}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[i % domains.length]}`,
      phone: `(269) 555-${String(100 + i).slice(-4)}`,
      status,
      joined: joinedStr,
      plan: '$99.99/mo',
    });
  }

  return members;
}

// Generate 12 months of payments
function generatePayments(members: Member[]): Payment[] {
  const payments: Payment[] = [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // For each month (Jan-Dec 2025)
  for (let month = 0; month < 12; month++) {
    const monthStr = monthNames[month];
    const year = 2025;

    // Each active/past_due member generates a payment
    for (const member of members) {
      if (member.status === 'canceled' || member.status === 'paused') continue; // Skip inactive

      const dayOfMonth = 5 + (Math.random() < 0.5 ? 0 : 10); // Day 5-15
      const dateStr = `${monthStr} ${dayOfMonth}, ${year}`;

      // Active: 90% success, 10% fail
      // Past due: fail
      const shouldFail = member.status === 'past_due' || Math.random() < 0.1;

      payments.push({
        id: `payment-${member.id}-${month}`,
        member: member.name,
        amount: '$99.99',
        status: shouldFail ? 'failed' : 'succeeded',
        date: dateStr,
        kind: 'subscription',
      });
    }
  }

  // Add some day passes (random, scattered)
  for (const member of members) {
    if (Math.random() < 0.3) {
      for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
        const randomMonth = Math.floor(Math.random() * 12);
        const monthStr = monthNames[randomMonth];
        const day = Math.floor(Math.random() * 28) + 1;

        payments.push({
          id: `daypass-${member.id}-${i}`,
          member: `Day Pass - ${member.name}`,
          amount: '$19.99',
          status: Math.random() < 0.95 ? 'succeeded' : 'failed',
          date: `${monthStr} ${day}, 2025`,
          kind: 'day_pass',
        });
      }
    }
  }

  return payments;
}

// Export data getters
export function getMockMembers(): Member[] {
  return generateMembers();
}

export function getMockPayments(): Payment[] {
  const members = generateMembers();
  return generatePayments(members);
}

export function getOverviewMetrics(): OverviewMetrics {
  return {
    mrr: { value: '$4,799', trend: 'up', percent: 12 },
    activeMembers: { value: '48', trend: 'up', percent: 8 },
    dayPasses: { value: '$287 (15 passes)', trend: 'down', percent: -5 },
    failedPayments: { value: '$197 (2)', trend: null, percent: null },
  };
}

export function getRevenueByMonth() {
  return [
    { month: 'Jan', membership: 4200, daypass: 280 },
    { month: 'Feb', membership: 4400, daypass: 320 },
    { month: 'Mar', membership: 3900, daypass: 210 },
    { month: 'Apr', membership: 4100, daypass: 290 },
    { month: 'May', membership: 4500, daypass: 340 },
    { month: 'Jun', membership: 4700, daypass: 380 },
    { month: 'Jul', membership: 4800, daypass: 320 },
    { month: 'Aug', membership: 4600, daypass: 350 },
    { month: 'Sep', membership: 4400, daypass: 300 },
    { month: 'Oct', membership: 4550, daypass: 310 },
    { month: 'Nov', membership: 4700, daypass: 370 },
    { month: 'Dec', membership: 4799, daypass: 287 },
  ];
}

export function getMemberGrowth() {
  return [
    { month: 'Jan', count: 35 },
    { month: 'Feb', count: 37 },
    { month: 'Mar', count: 40 },
    { month: 'Apr', count: 42 },
    { month: 'May', count: 44 },
    { month: 'Jun', count: 45 },
    { month: 'Jul', count: 46 },
    { month: 'Aug', count: 47 },
    { month: 'Sep', count: 47 },
    { month: 'Oct', count: 48 },
    { month: 'Nov', count: 48 },
    { month: 'Dec', count: 48 },
  ];
}

export function getChurnByMonth() {
  return [
    { month: 'Jan', churn: 2 },
    { month: 'Feb', churn: 1 },
    { month: 'Mar', churn: 2 },
    { month: 'Apr', churn: 1 },
    { month: 'May', churn: 0 },
    { month: 'Jun', churn: 1 },
    { month: 'Jul', churn: 0 },
    { month: 'Aug', churn: 1 },
    { month: 'Sep', churn: 2 },
    { month: 'Oct', churn: 1 },
    { month: 'Nov', churn: 0 },
    { month: 'Dec', churn: 1 },
  ];
}

export function getNewestMembers(): Member[] {
  const members = getMockMembers();
  // Return last 5 members (most recently joined)
  return members.slice(-5).reverse();
}

export function getAtRiskMembers(): Payment[] {
  const payments = getMockPayments();
  // Return last 2 failed payments
  return payments.filter(p => p.status === 'failed').slice(-2);
}
