# Admin Dashboard

The back-end the owner uses to run his gym. Gated behind `members.is_admin = true`. Mounted under `/admin`.

The bar: the owner should be able to answer "how much money came in last month and who didn't pay?" in under thirty seconds, on his phone, with one hand.

---

## Layout

A persistent left rail on desktop, a bottom tab bar on mobile:

| Section       | Route             | Icon         |
| ------------- | ----------------- | ------------ |
| Overview      | `/admin`          | `LayoutGrid` |
| Members       | `/admin/members`  | `Users`      |
| Revenue       | `/admin/revenue`  | `DollarSign` |
| Classes       | `/admin/classes`  | `Calendar`   |
| Messages      | `/admin/messages` | `Inbox`      |
| Settings      | `/admin/settings` | `Settings`   |

Top bar shows: gym name, current date, owner's avatar (with logout in the dropdown).

---

## Page — Overview (`/admin`)

The morning glance. Four big number cards across the top, three charts below, three live lists at the bottom.

### Number cards (top row, 4 cols → 2x2 on mobile)

1. **Monthly recurring revenue** — current month membership revenue (excludes day passes). Trend arrow vs prior month.
2. **Active members** — count where `members.status = 'active'`. Trend vs 30 days ago.
3. **Day passes (last 30 days)** — count + total dollars from `payments` where `kind = 'day_pass'` and `status = 'succeeded'`. Trend vs prior 30 days.
4. **Failed payments (last 7 days)** — count + total dollar amount at risk. Red badge if > 0.

*Note:* "New members this month" used to be card 3 — it's still surfaced in the Live Lists row below. Day-pass volume is more demo-worthy on the dashboard top line because it's tangible cash flow the owner currently has zero visibility into.

Each card is clickable — drills into the relevant page with the right filter pre-applied.

### Charts row

1. **Revenue by month** (12 months) — stacked bar chart from `mrr_by_month` view. Two segments per bar: membership (orange) + day passes (ember red). Hover shows the breakdown.
2. **Member growth** (12 months) — line chart of active member count at the end of each month.
3. **Churn by month** (12 months) — bar chart from `churn_by_month` view.

Charts use `recharts`. Keep them simple: no legends if a chart has one series, no grid lines on the dark theme, currency formatted in dollars (no cents).

### Live lists row

1. **Newest members** — 5 most recent joins, name + plan + joined date.
2. **At-risk** — members with most recent payment `failed`. Name, amount, retry date (from Stripe), "View" link.
3. **Recent check-ins** — last 10 rows from `check_ins`. (Seed-data driven for the demo.)

---

## Page — Members (`/admin/members`)

The roster. This is where the owner spends most of his admin time.

### Top bar

- Search input (debounced, searches name + email + phone)
- Filter chips: `Active` · `Past due` · `Paused` · `Canceled` · `Prospect` · `All`
- "Add member" button (opens a slide-over to manually create a member — useful for legacy cash members the owner is migrating)
- "Export CSV" button (current filter, all visible columns)

### Table

Columns:

| Column       | Notes                                                       |
| ------------ | ----------------------------------------------------------- |
| Member       | Photo + name + email                                        |
| Status       | Pill: `Active` / `Past due` / `Paused` / `Canceled`         |
| Joined       | Formatted date, e.g. "Mar 14, 2024"                         |
| Plan         | "$XX/mo" — pulled from `subscriptions.amount_cents`         |
| Last payment | Date + status badge (succeeded / failed / refunded)         |
| Next bill    | Date from `subscriptions.current_period_end`                |
| Phone        | Tappable `tel:` link                                        |
| Actions      | Kebab menu → View · Email · Pause · Cancel                  |

- Rows are clickable → opens the member detail page
- Sortable: Joined, Last payment, Next bill
- Sticky header on scroll
- Mobile: collapses to a card view with the same data

### Member detail (`/admin/members/[id]`)

Two-column on desktop.

**Left column — Profile**
- Photo
- Name, status pill
- Email, phone (both tappable)
- Joined date
- Emergency contact
- Owner-only notes (textarea, autosaves)
- Action buttons: **Pause membership** · **Cancel membership** · **Send email**

**Right column — Billing**
- Current subscription card: plan name, amount, status, next bill date, "View in Stripe" link
- Payment history table — every row from `payments` for this member, newest first:
  - Date, amount, status, "View in Stripe" link
  - Failed payments are highlighted; clicking shows the failure reason
- "Retry charge" button when in `past_due` (calls Stripe's retry endpoint)

**Below — Activity**
- Recent check-ins (last 30 days)
- Class attendance (placeholder for v2 — show empty state with "Class attendance coming soon")

---

## Page — Revenue (`/admin/revenue`)

The money page.

### Top filter bar

- Time range: `This month` · `Last month` · `Last 3 months` · `Last 12 months` · `All time` · custom date range

### Stat cards

- Revenue (sum of `succeeded` payments in range)
- Payments (count succeeded)
- Failed (count + amount)
- Refunded (count + amount)
- Net (revenue − refunds)

### Charts

- Revenue over time (line) — daily for ≤ 31 days, weekly for ≤ 12 weeks, monthly otherwise
- Payment status mix (donut) — succeeded vs failed vs refunded

### Payments table

Every payment in range, sortable. Same shape as the member detail table but with the member name as a clickable column. Export CSV.

---

## Page — Classes (`/admin/classes`)

Manage the catalog and weekly schedule.

### Tab 1 — Classes
- Table of all `classes` rows
- Add / edit / archive
- Fields per the data model — name, slug, description, instructor (select from `trainers`), photo upload (Supabase Storage)

### Tab 2 — Schedule
- Weekly grid editor
- Drag a class onto a day/time → creates a `class_session` row
- Edit a session → time, duration, notes
- The notes field is what surfaces "Starting next week!" on the public site

### Tab 3 — Trainers
- Table of `trainers`
- Add / edit / sort

---

## Page — Messages (`/admin/messages`)

The contact form inbox.

- List of `contact_messages` rows, newest first
- Status filter: `New` · `Read` · `Replied` · `All`
- Click a message → opens detail with "Mark as read" / "Mark as replied" / "Reply via email" (opens `mailto:` with prefilled subject)
- Badge in the nav rail when there are unread messages

---

## Page — Settings (`/admin/settings`)

### Sections

**Gym info**
- Name, address, phone, hours
- Social URLs
- This is what populates the public site footer / contact page — single source of truth

**Pricing**
- Current monthly price (read-only, links to Stripe Dashboard with note: "Change the price in Stripe; the site picks it up on next deploy.")

**Notifications**
- Toggle: daily digest email (default on)
- Toggle: per-event email on failed payment (default off — digest is enough)

**Team**
- Other admin emails (for v1, this just lets the owner add a manager who needs admin access)

**Danger zone**
- Export all data (CSV bundle)
- *No* delete-everything button. If the owner wants to wipe, that's a support ticket.

---

## Empty states

Every list has a designed empty state. Examples:

- **Members list, no filter matches:** "No members match that search. Try a different name, or clear the filter."
- **Newest members on overview, when there are none:** "No new signups in the last 30 days. Share your join link on Facebook to get going."
- **Failed payments card, when there are none:** "🎯 No failed payments in the last 7 days. Everything's clean."

These are the cases the seed data will deliberately *not* cover, so the owner sees them during the demo walkthrough.

---

## Mobile-specific notes

- The Overview page is the mobile default — the owner is going to check it from the front desk
- The Member detail and Payment table both reflow to vertical cards
- The bottom tab bar replaces the sidebar; 5 tabs max
- A "Quick add member" floating action button on the Members page so the owner can add a cash-converting walk-in without three taps
