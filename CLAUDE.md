# Repz Gym — Website & Member Management Platform

> Master spec. Read this first, then the linked docs in `/docs`. Build in the order under **Build Order** below.

---

## 1. About the business

**Repz Gym** is a long-running, locally-owned co-ed gym in Plainwell, Michigan (Allegan County). It has a loyal local following (4.8 / 5 across 107+ Google reviews) and is known for "no glamour, just a great selection of workout machines and free weight options," a tons-of-equipment, old-school workout feel.

**Real-world details to bake into the site:**

- Name: **Repz Gym** (also branded as "Repz Co-Ed Gym" and "Repz Gym of Plainwell")
- Address: **585 10th St A, Plainwell, MI 49080**
- Phone: **(269) 685-1493**
- Hours: open daily, closes 8:30 PM (confirm on Contact page)
- After-hours access: **24/7 key-fob entry** for members
- Services offered:
  - Free weights and full machine floor
  - Group classes — currently **MAD FITNEZ** with Katherine Perez (Tues/Thurs 9:30am) and **Taekwondo** classes
  - Tanning beds
  - Knowledgeable on-site staff
- Existing social: Facebook ("Repz Gym of Plainwell" 530+ followers, "Repz Co-Ed Gym" 1,179 likes), Yelp (5.0)

**Current state of the business:**
The owner takes **cash only** and has no membership management system. Members pay in person; there is no roster, no recurring billing, no revenue reporting. This project is the demo we are building to show the owner what's possible — a modern public-facing website **plus** a back-end that runs his membership business on Stripe.

---

## 2. Goals

The site has to do three jobs:

1. **Attract new members.** A bold, modern public site (black + orange, gritty photography, condensed all-caps display type — see `docs/design-system.md`) that ranks for "gym in Plainwell MI," hits hard on a phone, and converts visitors into signups or day-pass purchases.
2. **Run the business.** Replace the cash-only system with Stripe-backed monthly memberships, card on file, automatic retries on failed payments, and a real member roster.
3. **Give the owner visibility.** A simple admin dashboard where he can see active members, monthly recurring revenue, churn, new signups, and look up any individual member's payment history in two clicks.

---

## 3. Tech stack

Locked in:

- **Framework:** Next.js 15 (App Router), TypeScript, React Server Components by default
- **Styling:** Tailwind CSS v4 + shadcn/ui components
- **Database + Auth:** Supabase (Postgres, Auth, Row Level Security, Storage for member photos)
- **Payments:** Stripe (Subscriptions, Customer Portal, Webhooks)
- **Hosting:** Vercel (front end + API routes), Supabase managed Postgres
- **Email:** Resend (transactional — welcome, receipt, payment-failed, cancellation)
- **Analytics:** Vercel Analytics + a lightweight admin-only event log in Postgres
- **Forms:** React Hook Form + Zod
- **Dates:** `date-fns`
- **Icons:** `lucide-react`

**Do not** introduce a separate ORM (Prisma, Drizzle) — use the Supabase JS client and typed generated types. Keep the dependency graph small.

---

## 4. Repository layout

```
repz-gym-website/
├── CLAUDE.md                  ← you are here
├── docs/
│   ├── architecture.md        ← how the pieces fit together
│   ├── data-model.md          ← Postgres schema + RLS
│   ├── public-site.md         ← page-by-page front-end spec
│   ├── admin-dashboard.md     ← owner back-end spec
│   ├── stripe-integration.md  ← billing, webhooks, portal
│   ├── design-system.md       ← tokens, components, photo direction
│   └── seed-data.md           ← fake members + payment history
├── app/
│   ├── (public)/              ← marketing site
│   ├── (member)/              ← logged-in member portal
│   ├── (admin)/               ← owner dashboard
│   └── api/
│       ├── stripe/webhook/route.ts
│       └── checkout/route.ts
├── components/
│   ├── ui/                    ← shadcn primitives
│   ├── public/                ← Hero, PricingCard, ClassSchedule…
│   ├── member/                ← BillingPanel, MembershipCard…
│   └── admin/                 ← MemberTable, RevenueChart…
├── lib/
│   ├── supabase/              ← server + browser clients
│   ├── stripe/                ← stripe client + helpers
│   └── utils/
├── supabase/
│   ├── migrations/            ← SQL migrations
│   └── seed/                  ← seed script + faker data
├── public/                    ← static assets, photos
└── .env.example
```

---

## 5. Build order

Follow this order. Don't jump ahead — later steps assume earlier ones are working.

1. **Scaffold.** `pnpm create next-app`, Tailwind, shadcn init, Supabase project, env file. Get `pnpm dev` rendering an empty home page.
2. **Database.** Implement `docs/data-model.md` as migrations under `supabase/migrations/`. Apply with `supabase db push`. Generate TS types into `lib/supabase/types.ts`.
3. **Design system.** Implement tokens from `docs/design-system.md` in `tailwind.config.ts` and `globals.css`. Build the core shared components (Button, Card, Section, etc.) before any pages.
4. **Public site.** Build pages per `docs/public-site.md` in this order: Home → Pricing → Classes & Schedule → About → Contact. Use placeholder photography from `/public/photos/placeholders/`.
5. **Auth.** Supabase Auth with email + password and magic-link backup. Sign-up flow ends in Stripe Checkout (see step 6).
6. **Stripe.** Implement `docs/stripe-integration.md` end-to-end — Checkout, webhook handler, Customer Portal, all four lifecycle events (created, paid, failed, canceled).
7. **Member portal.** The logged-in `/account` area: see plan, update card via Stripe Portal, view payment history, cancel.
8. **Admin dashboard.** Build per `docs/admin-dashboard.md`. Gate behind an `is_admin` flag.
9. **Seed data.** Run `docs/seed-data.md` script so the demo has ~50 fake members, a year of payment history, and a populated class schedule. The owner needs to *see* MRR on the chart on day one.
10. **Polish.** Lighthouse 95+ on mobile, OpenGraph images, sitemap, robots, favicon. Test the failed-payment flow end to end with a Stripe test card.

---

## 6. Conventions (non-negotiable)

- **Server-first.** Default to Server Components. Add `"use client"` only when you need state, effects, or browser APIs. Forms can be Server Actions.
- **Auth on every server query.** Use the **Supabase server client with the request's cookie** — never the service-role key from a route the user can reach. Service role is only for the Stripe webhook and seed scripts.
- **Row Level Security is on for every table.** No exceptions. Tests in `docs/data-model.md` show the policies that gate each table.
- **Money is integers.** Cents. Never floats. Format at the edge.
- **Dates are UTC in the DB, displayed in `America/Detroit`** on the site.
- **Phone numbers** stored as E.164 (`+12696851493`), displayed `(269) 685-1493`.
- **No marketing copy in components.** Copy lives in `content/` as TypeScript constants so the owner can edit one file.
- **Error states and empty states are part of every screen.** A blank "no members yet" panel in the admin is a designed view, not an oversight.
- **Accessibility:** semantic HTML, focus rings on every interactive element, alt text on every image, color contrast AA minimum.
- **Mobile-first.** The majority of traffic is a phone in someone's hand in the parking lot.

---

## 7. Environment variables

Document every variable in `.env.example`. Required:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=         # webhook + seed only
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_PRICE_ID_MONTHLY=           # the recurring $XX/mo membership price
STRIPE_PRICE_ID_DAY_PASS=          # the one-off $XX day-pass price
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=https://repzgym.com
ADMIN_EMAIL=                       # gets all owner notifications
```

Never commit `.env.local`. Confirm `.gitignore` covers it.

---

## 8. Definition of done

The demo is shippable when, on a fresh laptop with the env file:

- `pnpm install && pnpm dev` brings the site up
- The public site renders all five pages with real Repz Gym content (address, phone, classes)
- A visitor can sign up, enter a test card, and land in a "welcome" state
- The Stripe webhook creates a row in `members` and `subscriptions`
- Failing a Stripe test card surfaces a clear retry UX on the member portal
- The admin dashboard shows MRR, active member count, churn, and a searchable member table with payment history per member
- The seed script populates 50 fake members and 12 months of payment history with a single command

---

## 9. In scope, briefly

The two products on offer:

- **Repz Monthly Membership** — recurring monthly subscription. Stripe Subscriptions. Card on file, cancel anytime, pause supported. The primary offer.
- **Repz Day Pass** — one-off $XX charge for a single visit. Stripe Checkout in `payment` mode (no subscription). Sold from `/day-pass`. Documented alongside the monthly flow in `docs/stripe-integration.md`.

Both are products in Stripe with their own `price_…` IDs.

## 9b. Out of scope (for the demo)

Be disciplined. The following are deliberately **not** in v1:

- Class booking / capacity limits (the schedule is informational only — the MD spec calls this out)
- Mobile app
- Personal trainer scheduling
- Point-of-sale for merch
- Multi-location support
- SMS notifications (email only for now)

If the owner says yes to the demo, these become a v2 conversation.

---

## 10. The pitch this site has to make

Every design decision should answer this question: **"Does this look like a place where someone gets serious work done?"**

The look is **GymLife / "BE STRONG TRAINING HARD"** — black background, sharp orange accents, condensed all-caps display type, gritty dark photography. Bold, declarative copy ("PUSH YOUR LIMITS FORWARD"). No chrome, no pastels, no smiling stock fitness models. We're a real gym in a real town, and the website should hit like a hand-painted sign on a brick wall.

The brand truth — "no glamour, just a great workout" — is from a real Google review. Lean on it. See `docs/design-system.md` for the visual system and `docs/public-site.md` for the page-by-page treatment.
