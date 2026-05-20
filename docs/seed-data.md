# Seed Data

The demo needs to *look* like a real business on day one. Empty charts kill the pitch.

This document specifies a deterministic seed script that produces:

- 1 admin (the owner) + 50 fake members
- 12 months of payment history with realistic distribution
- 6 classes, 4 trainers, 25+ weekly class sessions
- ~300 check-ins across the last 30 days
- 3 unread contact form messages

Run via `pnpm seed` → executes `supabase/seed/run.ts`.

---

## Determinism

Use `@faker-js/faker` with a **fixed seed** so the demo is identical every time the script runs:

```ts
import { faker } from "@faker-js/faker";
faker.seed(48910); // Plainwell zip
```

The script wipes the seeded tables first (everything except `auth.users` — those are handled separately via Supabase admin auth) and re-inserts. Idempotent.

---

## Connection

Seed uses the **service-role** Supabase client. Never the anon key.

```ts
// supabase/seed/run.ts
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);
```

---

## What to seed, in order

### 1. The owner

Create the admin first so the demo viewer can log in immediately.

```ts
const ownerEmail = "owner@repzgym.com";
const ownerPassword = "RepzDemo2026!"; // shown in the README

const { data: { user: owner } } = await supabase.auth.admin.createUser({
  email: ownerEmail,
  password: ownerPassword,
  email_confirm: true,
});

await supabase.from("members").update({
  first_name: "Owner",
  last_name: "Repz",
  phone: "+12696851493",
  is_admin: true,
  status: "active",
  joined_at: "2005-01-01T00:00:00Z",
}).eq("id", owner!.id);
```

Owner login credentials printed at the end of the seed run.

### 2. Trainers

Four trainers. Katherine Perez is real (MAD FITNEZ); the others are placeholders the owner can edit.

| Name              | Tagline                        | Sort | Notes                                  |
| ----------------- | ------------------------------ | ---- | -------------------------------------- |
| Katherine Perez   | MAD FITNEZ instructor          | 1    | Real — keep                             |
| Master Daniel Cho | Taekwondo head instructor      | 2    | Placeholder — owner to confirm name     |
| Mike Reynolds     | Strength coach                 | 3    | Placeholder                             |
| Sara Brennan      | Functional fitness coach       | 4    | Placeholder                             |

Photos: warm-orange initial avatars until real photos arrive.

### 3. Classes

Six classes. Active classes are the ones really running.

| Slug              | Name                  | Instructor          | Active |
| ----------------- | --------------------- | ------------------- | ------ |
| `mad-fitnez`      | MAD FITNEZ            | Katherine Perez     | ✅      |
| `taekwondo-kids`  | Taekwondo — Kids      | Master Daniel Cho   | ✅      |
| `taekwondo-adult` | Taekwondo — Adults    | Master Daniel Cho   | ✅      |
| `iron-club`       | The Iron Club         | Mike Reynolds       | ✅      |
| `functional-fit`  | Functional Fit        | Sara Brennan        | ✅      |
| `open-floor`      | Open floor / no class | (none)              | ❌      |

### 4. Class sessions (weekly schedule)

About 25 sessions across the week. Skeleton:

- **MAD FITNEZ** — Tue/Thu 9:30am, 60 min (matches the real Facebook post)
- **Taekwondo Kids** — Mon/Wed/Fri 5:30pm, 45 min
- **Taekwondo Adults** — Mon/Wed/Fri 6:30pm, 60 min
- **Iron Club** — Tue/Thu 6:00pm, 75 min
- **Functional Fit** — Sat 9:00am, 60 min

Set the `notes` field on the MAD FITNEZ Tue session to `"Starting next week!"` so we can demo that callout on the public site.

### 5. Members (50)

Generate with faker, but bias toward realistic West Michigan demographics:

```ts
const FIRST_NAMES = ["Sarah", "Mike", "Jenny", "Dave", "Amanda", "Kyle", "Maria",
  "Brian", "Heather", "Tom", "Lisa", "Mark", "Emily", "Jason", "Crystal", ...];
const LAST_NAMES = ["Vandenberg", "Stevens", "Miller", "Jansen", "Brown", "Perez",
  "Hoffman", "Smith", "Wilson", "DeVries", "Reynolds", "Lopez", ...];
```

For each of the 50 members:

- Random first + last from the pools above
- `email`: `firstname.lastname[NN]@example.com`
- `phone`: `+1269` + 7 random digits (Plainwell area code)
- `joined_at`: a random date within the last 24 months, weighted toward the most recent 6 (so the growth chart curves up)
- `status` distribution:
  - 38 `active`
  - 4 `past_due` (one with multiple failed payments — useful for the dashboard demo)
  - 2 `paused`
  - 4 `canceled` (with `canceled_at` 1–6 months ago, gives churn chart data)
  - 2 `prospect` (signed up, no payment yet)
- `stripe_customer_id`: `cus_seed_<uuid>` — clearly identifiable as fake
- 30% have a `photo_url` (use DiceBear initials API or local avatar generator)
- 1 member has a long owner-note: `"Cash member since 2018, migrated to card March 2026."` — gives the owner something to point at during the demo

Create each via `supabase.auth.admin.createUser` so they have a real auth row (no password — they can't log in unless the demo flow magic-links them).

### 6. Subscriptions

One row per `active`, `past_due`, or `paused` member. `canceled` and `prospect` members have *no* active subscription (they're testing the dashboard's filtering).

```ts
{
  id: `sub_seed_${faker.string.alphanumeric(14)}`,
  member_id: member.id,
  status: member.status === "past_due" ? "past_due" : "active",
  price_id: process.env.STRIPE_PRICE_ID_MONTHLY ?? "price_seed_mock",
  amount_cents: 4900, // $49 placeholder; sync to real price when owner confirms
  current_period_start: lastBillDate,
  current_period_end: nextBillDate,
  cancel_at_period_end: false,
}
```

For the 4 `canceled` members, insert a row with `status: "canceled"` and `canceled_at` set, so the churn view picks them up.

### 7. Payments (the meaty part)

Two flavors of payment rows: **membership invoices** (recurring) and **day-pass purchases** (one-off).

#### 7a. Membership payments

For every member with subscription history:

- One payment row per month they've been a member, `kind = 'membership'`
- `status` distribution per payment:
  - 94% `succeeded`
  - 4% `failed`, with `failure_reason` from a pool: `"card_declined"`, `"insufficient_funds"`, `"expired_card"`
  - 2% `refunded` (one-off, simulates a goodwill refund)
- `paid_at` jittered ±2 days around the member's billing day
- `subscription_id` set to the member's subscription

#### 7b. Day-pass payments

- Across the last 12 months, generate **~60 day-pass purchases** with `kind = 'day_pass'`, `subscription_id = null`, `status = 'succeeded'`.
- Buyers split into:
  - **40** as `prospect` members the seed creates (with first name, last name, email, no subscription) — never converted
  - **15** as existing active members who tried a day pass before joining (set `paid_at` to before their `joined_at`)
  - **5** as walk-ins with only an email on the `members` row, no name (mimics a hasty checkout)
- Weight the date distribution toward weekends (Sat/Sun get ~2× the purchases) and toward the most recent 3 months (~50% of purchases).
- One day-pass refund in the set (status `refunded`) — the owner can demo the refund flow.

This gives the revenue chart 12 months of growing-but-not-flat-line data, a non-zero "Failed payments" count, and a visible day-pass revenue line in the admin dashboard.

**Calibration target:**

| Metric                                | Target (±10%)        |
| ------------------------------------- | -------------------- |
| Membership revenue, last 12 months    | $24,000 – $28,000    |
| Day-pass revenue, last 12 months      | $1,000 – $1,500      |
| Total succeeded revenue               | $25,000 – $29,500    |
| MRR today                             | ≈ $1,900             |
| Day passes sold last 30 days          | 8 – 14               |
| Active member count                   | ≈ 38                 |

These numbers should land within ±10 % on every seed run because of the fixed seed.

### 8. Check-ins

For each active member, 0–15 random check-ins over the last 30 days. Power-users (the top 10) get 12–15; casual users get 0–4. Distribution biased toward 5–7pm weekdays and 9–11am weekends.

`source: 'seed'` for all so they're filterable later.

### 9. Contact messages

Three unread messages so the admin inbox demo lights up:

```ts
[
  { name: "Tony G.", email: "tony.g@example.com", phone: "+12695551122",
    message: "Hey — what time does MAD FITNEZ start next week? Is it ok to bring my daughter (16)?",
    status: "new", created_at: minus(4, "hours") },
  { name: "Pam K.", email: "pam.k@example.com",
    message: "Visiting Plainwell for the week — can I just buy a couple day passes for me and my husband? Looking to lift Tues/Thurs.",
    status: "new", created_at: minus(2, "days") },
  { name: "Derrick W.", email: "derrick.w@example.com", phone: "+12695553344",
    message: "Hi — I'm a personal trainer interested in renting space a few hours a week. Who do I talk to?",
    status: "new", created_at: minus(5, "days") },
]
```

---

## CLI

```bash
pnpm seed              # full reset + seed
pnpm seed --only=payments   # re-seed payments only (rarely useful)
pnpm seed --dry-run    # print what would happen, write nothing
```

At the end the script prints:

```
✓ Seed complete.
   Members:        90  (38 active, 4 past_due, 2 paused, 4 canceled, 42 prospect)
   Subscriptions:  44
   Payments:      572  (512 membership, 60 day-pass)
   Classes:         6  (5 active)
   Class sessions: 25
   Check-ins:     287
   Messages:        3 unread

  Admin login:  owner@repzgym.com  /  RepzDemo2026!
  Site URL:     http://localhost:3000
```

Note: the prospect count grows because day-pass buyers without an existing membership become `prospect` rows. That's intentional — the admin's "Prospects" filter then surfaces a real upsell list.

---

## Resetting in production

The seed script must **refuse to run** if `NEXT_PUBLIC_SUPABASE_URL` points at the production project. First lines of `run.ts`:

```ts
if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("prod") ||
    process.env.SEED_ALLOW_PROD !== "yes-i-know") {
  throw new Error("Refusing to run seed against what looks like prod.");
}
```

Production data never gets seeded. The demo project is a separate Supabase instance.
