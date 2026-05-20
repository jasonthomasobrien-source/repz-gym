# Public Site

Five pages. Mobile-first. Visual reference: the **GymLife / "BE STRONG TRAINING HARD"** template — black background, sharp orange CTAs, condensed all-caps display type, dark high-contrast photography, generous section padding.

The home page does most of the selling — it's a long scroll of dense, dark bands. The other four pages are deeper dives.

Every page shares a header and footer (defined at the end of this file). Copy lives in `content/site.ts` as typed constants — never inline strings in components.

---

## Page 1 — Home (`/`)

The job of this page: a Plainwell resident lands here from a phone and within five seconds understands *what this place is, where it is, and how much it costs* — and feels the energy.

Each band has the same rhythm: small orange **eyebrow** label on top, big white **display headline** below it, content underneath. Tons of vertical breathing room between bands.

### Sections, in order

**1. Hero — Slider**
- Full-bleed photo of the actual gym floor with a dark gradient overlay on the right (or left, alternating per slide). Subject occupies one half, headline the other.
- 3 slides, 6 s per slide, auto-advance, pause on hover. Each slide same structure, different photo + headline pair:
  - Slide 1: eyebrow "SHAPE YOUR BODY" / headline "BE **STRONG**. TRAIN HARD."
  - Slide 2: eyebrow "PLAINWELL'S GYM" / headline "NO GLAMOUR. JUST WORK."
  - Slide 3: eyebrow "OPEN 24/7" / headline "TRAIN ON YOUR SCHEDULE."
- Primary CTA: **GET INFO** → `/pricing`
- Secondary CTA (outlined, white border): **SEE THE SCHEDULE** → `/classes`
- Below the fold: a thin strip with `★ 4.8 · 107+ Google reviews · LOCALLY OWNED · OPEN 24/7 FOR MEMBERS`

**2. Why Choose Us — feature row**
- Eyebrow: "WHY CHOOSE US"
- Headline: "PUSH YOUR LIMITS FORWARD."
- Sub: one-line lead, centered.
- 4-up icon grid (collapses to 2-up on tablet, stacked on mobile). Each cell: orange circular icon · title · one-line description.
  - 🏋️ **MODERN EQUIPMENT** — "Full free-weight floor, top-shelf machines, more iron than you can use in a week."
  - 🧠 **PROVEN PROGRAMS** — "MAD FITNEZ, Taekwondo, and trainers who know your name."
  - 🔓 **24/7 KEY-FOB ACCESS** — "Lift at 5am. Lift at midnight. The door's open when you need it."
  - 🎯 **MADE FOR YOU** — "Beginner, lifer, in-between. Everyone trains here."

**3. Our Classes — class grid**
- Eyebrow: "OUR CLASSES"
- Headline: "WHAT WE OFFER."
- Sub: "Walk in, sign in at the front, jump in."
- 4-card grid (2-up on mobile). Each card: action photo with dark gradient overlay, eyebrow category in orange ("CARDIO" / "STRENGTH" / "MARTIAL ARTS" / "STRENGTH") pinned bottom-left, class name in big white display below it, small chevron on the right side that grows on hover.
  - **MAD FITNEZ** — category: CARDIO
  - **TAEKWONDO** — category: MARTIAL ARTS
  - **THE IRON CLUB** — category: STRENGTH
  - **FUNCTIONAL FIT** — category: STRENGTH
- Click → `/classes` (anchor to that class).

**4. Registration CTA — full-bleed banner**
- Full-bleed dark band, faded gym-action photo behind it, ~25% opacity.
- Eyebrow: "REGISTRATION OPEN"
- Headline (huge): "JOIN NOW. GET TO WORK."
- Sub: "One simple monthly membership. Cancel anytime. Day passes available."
- Single CTA: **GET STARTED** → `/pricing`

**5. Our Plan — pricing preview**
- Eyebrow: "OUR PLAN"
- Headline: "CHOOSE YOUR ENTRY POINT."
- Two pricing cards, centered (full breakdown lives on `/pricing`):
  - **MONTHLY MEMBERSHIP** — `$XX / month` — features list — "JOIN NOW" → `/signup`
  - **DAY PASS** — `$XX / day` — features list — "BUY A DAY PASS" → `/day-pass`
- Use the design-system `PricingCard` component. Monthly card has a small orange "MOST POPULAR" ribbon.

**6. Photo Mosaic — "Train With Experts" wall**
- No section title; just a full-bleed varied-size photo grid (5–6 images of training shots, mix of free-weight, classes, free-floor scenes).
- One short orange-on-black overlay tag on the largest image: "MEMBERS, MID-WORKOUT."

**7. Our Team — trainer row**
- Eyebrow: "OUR TEAM"
- Headline: "TRAIN WITH EXPERTS."
- Sub: "Real trainers, real members, knowing your goals."
- Carousel/grid of `TrainerCard`s (4 across desktop, 1.5-up scroll on mobile). Each card: 4:5 dark portrait, name in display, tagline in body-sm orange. Hover deepens overlay and reveals "VIEW BIO" link → `/about#trainers`.
- Secondary CTA below: **MAKE AN APPOINTMENT** → `/contact`

**8. Contact strip — footer prelude**
- Thin orange-icon bar with 3 columns (stacks on mobile):
  - 📍 **ADDRESS** — 585 10th St A, Plainwell, MI 49080
  - 📞 **PHONE** — (269) 685-1493 (tel:)
  - ✉️ **EMAIL** — [placeholder — owner to provide]
- Background: `--surface`, icons in `--brand`, divider lines between columns on desktop.

### Components used
`Hero` (with slider), `FeatureRow`, `ClassCard`, `CtaBanner`, `PricingCard`, `PhotoMosaic`, `TrainerCard`, `ContactStrip`

---

## Page 2 — Pricing (`/pricing`)

Single monthly membership is the primary offer; day pass is the secondary. Don't over-design — let the cards do the work.

### Layout

- **Section header:** eyebrow "OUR PLAN" / headline "ONE MEMBERSHIP. EVERYTHING IN."
- Sub-headline (centered, body-lg): "No contract. Cancel anytime. Walk-in day passes when you can't commit."

- **Pricing row** — two `PricingCard`s, centered:

  **Card 1 — MONTHLY MEMBERSHIP** (primary, with orange ribbon "MOST POPULAR")
  - Big orange price `$XX` (placeholder)
  - `/ MONTH` in small caps below
  - Checklist (use a `Check` icon, not a bullet):
    - Full gym floor — free weights & machines
    - All group classes (MAD FITNEZ, Taekwondo, etc.)
    - 24/7 key-fob access
    - Tanning beds
    - No contract, no signup fee
  - CTA (full-width orange): **JOIN NOW** → `/signup`

  **Card 2 — DAY PASS** (secondary, no ribbon)
  - Big orange price `$XX`
  - `/ DAY` in small caps below
  - Checklist:
    - Full gym floor for one day
    - Drop in on any group class
    - No commitment
    - Apply to membership within 7 days
  - CTA (outlined white): **BUY A DAY PASS** → `/day-pass`

- **Trust strip** below the cards (3 short lines, centered):
  - 🔒 Powered by Stripe — your card details never touch us.
  - ⏯ Pause or cancel from your account at any time.
  - 📞 Questions? Call (269) 685-1493.

- **FAQ accordion** (5 items):
  - *Is there a contract?* No — month-to-month, cancel anytime.
  - *How does the 24/7 key fob work?* Pick yours up at the front desk after your first payment.
  - *Can I freeze my membership?* Yes — pause it from your account, or email us.
  - *Do day passes count toward joining?* Yes — if you sign up within 7 days, we credit it.
  - *Family discount?* Call us. We work with the locals we know.

### Notes
- Pricing cards are Server Components reading the matching prices from Stripe at build time (cached). One source of truth.
- "JOIN NOW" sends the visitor to `/signup` (collects name/phone) before Stripe Checkout. "BUY A DAY PASS" goes to `/day-pass` (one-tap email + Stripe Checkout for a one-off charge).

---

## Page 3 — Classes & Schedule (`/classes`)

Informational. No booking in v1.

### Sections

**1. Page header (dark hero, smaller than home)**
- Eyebrow "OUR CLASSES" / headline "WHAT WE OFFER."
- Sub: "Walk in, sign in at the front, jump in. Members included; drop-ins welcome — call ahead."

**2. Active class grid**
- Reuse `ClassCard` from home — bigger here, 3 across on desktop, all active classes from `classes` table.
- Each card opens a detail panel below (or anchor-jumps) with: class photo, longer description, instructor name + small headshot, days/times this week, "QUESTIONS? CALL (269) 685-1493".

**3. Weekly schedule grid**
- Eyebrow "THIS WEEK" / headline "SCHEDULE."
- Mon–Sun table on desktop, time slots on the left, classes filling the cells. Class names use the orange eyebrow color when there's a session.
- Mobile: collapses to a day-by-day vertical list.
- Server-rendered, ISR every 60s.
- Notes from `class_sessions.notes` render as a small orange flag next to the session ("STARTING NEXT WEEK!").

**4. Trainer spotlight**
- Eyebrow "OUR TEAM" / headline "MEET YOUR COACHES."
- Carousel/grid of `TrainerCard`s for active trainers.

**5. Photo strip and CTA**
- Thin photo mosaic
- `CtaBanner`: "READY TO TRAIN? JOIN NOW." → `/pricing`

---

## Page 4 — About (`/about`)

The story page. Where trust-shoppers convert.

### Sections

**1. Page header**
- Eyebrow "ABOUT REPZ" / headline "WE'RE NOT FOR EVERYONE. THAT'S THE POINT."
- Sub: "[N] years in Plainwell. Family-owned. Family-feeling."

**2. The story** (longform prose, 3–4 paragraphs)
- Body copy in sentence case, not uppercase. Wide reading column (max-w-prose).
- Themes:
  - Long-running local gym in Plainwell since [year]
  - Co-ed, all-ages, all-levels
  - Old-school: serious about training, no posing, no chrome
  - Member-first: knowledgeable staff who know your name
  - Strong on classes (MAD FITNEZ, Taekwondo) for people who want community workouts
- One pull-quote in big orange display in the middle of the prose: "**NO GLAMOUR. JUST A GREAT WORKOUT.**" — credited to a real Google review.

**3. Trainers & staff**
- Anchor: `#trainers`
- Eyebrow "OUR TEAM" / headline "TRAIN WITH EXPERTS."
- Full grid of `TrainerCard`s — photo, name, tagline, short bio expanding on hover/tap.

**4. Photo mosaic**
- Full-bleed varied-size photo grid (6–8 images): the floor, the free-weight rack, classes in progress, the front of the building, locker rooms, candid member shots.

**5. Reviews wall**
- Eyebrow "FROM OUR MEMBERS" / headline "REAL REVIEWS, REAL PEOPLE."
- 6+ Google review quotes (full text, name initial only), each in a dark card with a 5-star row on top in orange.
- CTA below: **READ ALL 107+ ON GOOGLE** (opens in new tab)

**6. Visit panel**
- Eyebrow "FIND US" / headline "STOP BY."
- Map embed (dark style) + address/phone/hours card.
- CTA: **GET DIRECTIONS** → Google Maps

---

## Page 5 — Contact (`/contact`)

Two columns on desktop, stacked on mobile.

### Header
- Eyebrow "GET IN TOUCH" / headline "QUESTIONS? WE'RE HERE."

### Left column — the form

`<ContactForm>` with React Hook Form + Zod. Fields:
- Name (required)
- Email (required)
- Phone (optional)
- "What can we help with?" (required, textarea, min 10 chars)
- Submit button (primary, full-width on mobile): **SEND MESSAGE**

Server Action inserts to `contact_messages`, sends Resend email to the owner, swaps the form for a success card on submit.

### Right column — the basics

`ContactStrip` repeated vertically:
- 📍 **ADDRESS** — 585 10th St A, Plainwell, MI 49080 (map embed below)
- 📞 **PHONE** — (269) 685-1493 (tel:)
- ✉️ **EMAIL** — [placeholder — owner to provide]
- 🕒 **HOURS** — Open daily, closes 8:30 PM (members 24/7 with key fob)
- **Social** — Facebook icon (orange) → Repz Gym of Plainwell page

---

## Header (shared)

Fixed top bar. Default state transparent over the hero; once the user scrolls past 80 px it solidifies to `bg-bg/95` with a 1 px `--line` bottom border and backdrop blur.

- **Left:** Repz wordmark in display font + small orange triangle/play mark (mirrors the template's "GYM ▸" identity).
- **Center (desktop):** nav — `HOME · ABOUT · CLASSES · PRICING · CONTACT`. Uppercase, body-sm, letter-spacing eyebrow. Hover underlines in orange.
- **Right:**
  - Search icon (placeholder for v2 — disabled tooltip "Coming soon" in demo mode)
  - Social icons (Facebook, Instagram, Google)
  - **JOIN** button (primary orange, `md` size) → `/signup`
- **Mobile:** hamburger → full-screen slide-in menu (black background, big uppercase links, orange JOIN at the bottom).

When the user is signed in, the **JOIN** button is replaced by **MY ACCOUNT** linking to `/account`. The owner (`is_admin`) sees an extra **ADMIN** link in the mobile menu.

---

## Footer (shared)

Four columns on desktop, stacked on mobile. Background `--bg`, top border 1 px `--line`. Generous padding.

- **Column 1 — Brand**
  - Repz wordmark
  - One-line description: "Plainwell's gym since [year]. Open 24/7 for members."
  - Address + phone
  - Social icons row

- **Column 2 — Useful links**
  - Home · About · Classes · Pricing · Contact

- **Column 3 — Support**
  - Login / My account · Cancel membership · Day pass · FAQ

- **Column 4 — Stay in touch**
  - Newsletter signup: single email field with orange arrow-button.
  - Saved to `contact_messages` with a `newsletter` flag for v1; swap to a real ESP later.
  - Hours, in body-sm

Bottom strip (full-width, separated by a hairline): `© Repz Gym · Privacy · Terms` — left-aligned, body-sm, `--ink-subtle`. Mobile: stacked center.

---

## SEO

Each page exports `metadata`:

```ts
export const metadata = {
  title: "PRICING — Repz Gym, Plainwell MI",
  description: "One simple monthly membership and walk-in day passes. Free weights, machines, group classes, tanning, and 24/7 access. No contracts.",
  openGraph: { images: ["/og/pricing.png"] },
};
```

Generate OG images at build time using `@vercel/og` — use the gritty dark/orange template treatment (centered Oswald headline on dark photo).

Add to root layout:
- `<link rel="canonical" href="https://repzgym.com/...">` on each page
- JSON-LD `LocalBusiness` schema in the root layout: `name`, `address`, `telephone`, `geo`, `openingHoursSpecification`, `aggregateRating` (4.8 / 107)
- `sitemap.ts` and `robots.ts` at the root of `app/`

---

## Accessibility & performance targets

- Lighthouse **mobile**: Performance ≥ 90, Accessibility = 100, SEO = 100, Best Practices ≥ 95
- Largest Contentful Paint ≤ 2.0 s on a throttled 4G phone
- All images `next/image` with explicit width/height, `priority` on hero only
- Forms have associated labels and visible error messages — not just red borders
- Color contrast AA minimum. **Important:** the all-caps display headlines are large enough to meet AA at orange-on-black, but never use orange small text on black — small body copy stays white or `--ink-muted`.
