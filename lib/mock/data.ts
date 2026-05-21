import { v4 as uuidv4 } from "uuid";
import type {
  Member,
  Subscription,
  Payment,
  Class,
  ClassSession,
  Trainer,
  CheckIn,
  ContactMessage,
} from "./types";

// Trainer data
export const TRAINERS: Trainer[] = [
  {
    id: "trainer-1",
    name: "Ethan Johnson",
    tagline: "Strength & conditioning coach",
    bio: "Ethan specializes in powerlifting and functional training. He's dedicated to helping you reach your goals.",
    photo_url: "/trainers/Ethan Johnson.png",
    is_active: true,
    sort_order: 1,
  },
  {
    id: "trainer-2",
    name: "Marcus Reed",
    tagline: "High-intensity training specialist",
    bio: "Marcus brings energy and intensity to every session. His classes blend cardio and strength for maximum results.",
    photo_url: "/trainers/Marcus Reed.png",
    is_active: true,
    sort_order: 2,
  },
  {
    id: "trainer-3",
    name: "Sofia Ramirez",
    tagline: "Functional fitness coach",
    bio: "Sofia specializes in movement patterns and conditioning. She focuses on real-world strength and performance.",
    photo_url: "/trainers/Sofia Ramirez.png",
    is_active: true,
    sort_order: 3,
  },
  {
    id: "trainer-4",
    name: "Tyler Brooks",
    tagline: "Martial arts & conditioning trainer",
    bio: "Tyler brings discipline and technique to every class. He's passionate about helping members reach their potential.",
    photo_url: "/trainers/Tyler Brooks.png",
    is_active: true,
    sort_order: 4,
  },
];

// Classes
export const CLASSES: Class[] = [
  {
    id: "class-1",
    slug: "mad-fitnez",
    name: "MAD FITNEZ",
    description: "High-intensity cardio and strength. Mixed modality. Always moving.",
    instructor_id: "trainer-1",
    image_url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=600&fit=crop",
    is_active: true,
  },
  {
    id: "class-2",
    slug: "taekwondo-kids",
    name: "Taekwondo — Kids",
    description: "Martial arts for kids ages 6–12. Discipline, focus, and fun.",
    instructor_id: "trainer-2",
    image_url: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=500&h=600&fit=crop",
    is_active: true,
  },
  {
    id: "class-3",
    slug: "taekwondo-adult",
    name: "Taekwondo — Adults",
    description: "Martial arts for adults. Conditioning and technique.",
    instructor_id: "trainer-2",
    image_url: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=500&h=600&fit=crop",
    is_active: true,
  },
  {
    id: "class-4",
    slug: "iron-club",
    name: "The Iron Club",
    description: "Barbell focus. Squat, bench, deadlift. Progressive strength.",
    instructor_id: "trainer-3",
    image_url: "/images/placeholders/class-iron-club.svg",
    is_active: true,
  },
  {
    id: "class-5",
    slug: "functional-fit",
    name: "Functional Fit",
    description: "Real-world movement patterns. Strength and conditioning.",
    instructor_id: "trainer-4",
    image_url: "/images/placeholders/class-functional-fit.svg",
    is_active: true,
  },
  {
    id: "class-6",
    slug: "open-floor",
    name: "Open Floor",
    description: "No class. Just you and the equipment.",
    instructor_id: undefined,
    image_url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=600&fit=crop",
    is_active: false,
  },
];

// Class sessions (weekly schedule)
export const CLASS_SESSIONS: ClassSession[] = [
  { id: uuidv4(), class_id: "class-1", day_of_week: 2, start_time: "09:30", duration_min: 60, notes: "Starting next week!" },
  { id: uuidv4(), class_id: "class-1", day_of_week: 4, start_time: "09:30", duration_min: 60 },
  { id: uuidv4(), class_id: "class-2", day_of_week: 1, start_time: "17:30", duration_min: 45 },
  { id: uuidv4(), class_id: "class-2", day_of_week: 3, start_time: "17:30", duration_min: 45 },
  { id: uuidv4(), class_id: "class-2", day_of_week: 5, start_time: "17:30", duration_min: 45 },
  { id: uuidv4(), class_id: "class-3", day_of_week: 1, start_time: "18:30", duration_min: 60 },
  { id: uuidv4(), class_id: "class-3", day_of_week: 3, start_time: "18:30", duration_min: 60 },
  { id: uuidv4(), class_id: "class-3", day_of_week: 5, start_time: "18:30", duration_min: 60 },
  { id: uuidv4(), class_id: "class-4", day_of_week: 2, start_time: "18:00", duration_min: 75 },
  { id: uuidv4(), class_id: "class-4", day_of_week: 4, start_time: "18:00", duration_min: 75 },
  { id: uuidv4(), class_id: "class-5", day_of_week: 6, start_time: "09:00", duration_min: 60 },
];

// Members and subscriptions
const FIRST_NAMES = ["Sarah", "Mike", "Jenny", "Dave", "Amanda", "Kyle", "Maria", "Brian", "Heather", "Tom"];
const LAST_NAMES = ["Vandenberg", "Stevens", "Miller", "Jansen", "Brown", "Perez", "Hoffman", "Smith", "Wilson", "DeVries"];

function generateMembers(): [Member[], Subscription[]] {
  const members: Member[] = [];
  const subscriptions: Subscription[] = [];

  // Admin
  const admin: Member = {
    id: "member-admin",
    email: "jerry@repz-gym.com",
    first_name: "Jerry",
    last_name: "Bierema",
    phone: "+12696851493",
    is_admin: true,
    stripe_customer_id: "cus_admin_jerry",
    status: "active",
    joined_at: "2005-01-01T00:00:00Z",
    created_at: "2005-01-01T00:00:00Z",
    updated_at: new Date().toISOString(),
  };
  members.push(admin);
  subscriptions.push({
    id: "sub_admin_jerry",
    member_id: "member-admin",
    status: "active",
    current_period_start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    cancel_at_period_end: false,
    price_id: "price_monthly_demo",
    amount_cents: 3000,
    created_at: "2005-01-01T00:00:00Z",
    updated_at: new Date().toISOString(),
  });

  // 50 regular members
  for (let i = 0; i < 50; i++) {
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
    const lastName = LAST_NAMES[i % LAST_NAMES.length];
    const memberId = `member-${i}`;
    const joinedDaysAgo = Math.floor(Math.random() * 730) + 30; // 1-24 months ago, biased recent
    const joinedAt = new Date(Date.now() - joinedDaysAgo * 24 * 60 * 60 * 1000).toISOString();

    const statuses: Array<"active" | "past_due" | "paused" | "canceled" | "prospect"> = [];
    for (let j = 0; j < 38; j++) statuses.push("active");
    for (let j = 0; j < 4; j++) statuses.push("past_due");
    for (let j = 0; j < 2; j++) statuses.push("paused");
    for (let j = 0; j < 4; j++) statuses.push("canceled");
    for (let j = 0; j < 2; j++) statuses.push("prospect");

    const status = statuses[i] || "active";

    const member: Member = {
      id: memberId,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
      first_name: firstName,
      last_name: lastName,
      phone: `+1269${Math.floor(Math.random() * 9000000)
        .toString()
        .padStart(7, "0")}`,
      is_admin: false,
      stripe_customer_id: `cus_demo_${i}`,
      status,
      joined_at: joinedAt,
      created_at: joinedAt,
      updated_at: new Date().toISOString(),
      notes: i === 10 ? "Cash member since 2018, migrated to card March 2026." : undefined,
    };

    members.push(member);

    if (status === "active" || status === "past_due" || status === "paused") {
      const periodStart = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      subscriptions.push({
        id: `sub_demo_${i}`,
        member_id: memberId,
        status: status === "paused" ? "active" : status,
        current_period_start: periodStart.toISOString(),
        current_period_end: new Date(periodStart.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancel_at_period_end: false,
        price_id: "price_monthly_demo",
        amount_cents: 3000,
        created_at: joinedAt,
        updated_at: new Date().toISOString(),
      });
    }

    if (status === "canceled") {
      subscriptions.push({
        id: `sub_demo_${i}_canceled`,
        member_id: memberId,
        status: "canceled",
        current_period_start: new Date(joinedAt).toISOString(),
        current_period_end: new Date(joinedDaysAgo * 24 * 60 * 60 * 1000).toISOString(),
        cancel_at_period_end: false,
        canceled_at: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
        price_id: "price_monthly_demo",
        amount_cents: 3000,
        created_at: joinedAt,
        updated_at: new Date().toISOString(),
      });
    }
  }

  return [members, subscriptions];
}

const [MEMBERS, SUBSCRIPTIONS] = generateMembers();

// Payments - mix of membership and day-pass
export function generatePayments(): Payment[] {
  const payments: Payment[] = [];
  let id = 1;

  // Membership payments (12 months)
  for (const member of MEMBERS) {
    if (
      member.status === "active" ||
      member.status === "past_due" ||
      member.status === "paused" ||
      member.status === "canceled"
    ) {
      const joinedDate = new Date(member.joined_at);
      const monthsAsMember = Math.floor((Date.now() - joinedDate.getTime()) / (30 * 24 * 60 * 60 * 1000));

      for (let m = 0; m < monthsAsMember && m < 12; m++) {
        const paidDate = new Date(joinedDate.getTime() + m * 30 * 24 * 60 * 60 * 1000);
        const rand = Math.random();
        let status: "succeeded" | "failed" | "refunded" = "succeeded";

        if (rand > 0.96) status = "refunded";
        else if (rand > 0.92) status = "failed";

        payments.push({
          id: `pi_demo_${id++}`,
          member_id: member.id,
          subscription_id: `sub_demo_${member.id.split("-")[1]}`,
          kind: "membership",
          amount_cents: 3000,
          currency: "usd",
          status,
          failure_reason: status === "failed" ? ["card_declined", "insufficient_funds"][Math.floor(Math.random() * 2)] : undefined,
          paid_at: paidDate.toISOString(),
          created_at: paidDate.toISOString(),
        });
      }
    }
  }

  // Day-pass payments (~60 total)
  const dayPassBuyers = [...MEMBERS.slice(0, 40), ...MEMBERS.filter((m) => m.status === "active").slice(0, 15), ...MEMBERS.slice(45, 50)];
  for (let i = 0; i < 60; i++) {
    const buyer = dayPassBuyers[i % dayPassBuyers.length];
    const daysAgo = Math.floor(Math.random() * 365);
    const paidDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    payments.push({
      id: `ch_demo_daypass_${i}`,
      member_id: buyer.id,
      kind: "day_pass",
      amount_cents: 1000,
      currency: "usd",
      status: Math.random() > 0.98 ? "refunded" : "succeeded",
      paid_at: paidDate.toISOString(),
      created_at: paidDate.toISOString(),
    });
  }

  return payments;
}

// Check-ins
export function generateCheckIns(): CheckIn[] {
  const checkIns: CheckIn[] = [];
  const activeMembers = MEMBERS.filter((m) => m.status === "active");

  for (const member of activeMembers) {
    const numCheckIns = Math.floor(Math.random() * 15);
    for (let i = 0; i < numCheckIns; i++) {
      const daysAgo = Math.floor(Math.random() * 30);
      const hour = Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 17 : Math.floor(Math.random() * 3) + 9; // 5-10pm or 9-12am
      checkIns.push({
        id: checkIns.length + 1,
        member_id: member.id,
        checked_in_at: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000 + hour * 60 * 60 * 1000).toISOString(),
        source: "seed",
      });
    }
  }

  return checkIns;
}

// Contact messages
export const CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 1,
    name: "Tony G.",
    email: "tony.g@example.com",
    phone: "+12695551122",
    message: "Hey — what time does MAD FITNEZ start next week? Is it ok to bring my daughter (16)?",
    status: "new",
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    name: "Pam K.",
    email: "pam.k@example.com",
    message: "Visiting Plainwell for the week — can I just buy a couple day passes for me and my husband? Looking to lift Tues/Thurs.",
    status: "new",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    name: "Derrick W.",
    email: "derrick.w@example.com",
    phone: "+12695553344",
    message: "Hi — I'm a personal trainer interested in renting space a few hours a week. Who do I talk to?",
    status: "new",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export { MEMBERS, SUBSCRIPTIONS };
