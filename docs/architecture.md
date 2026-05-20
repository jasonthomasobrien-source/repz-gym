# Architecture

How the pieces fit together. Read after `CLAUDE.md`.

---

## High-level diagram

```
┌────────────────────────────────────────────────────────────────┐
│                          Visitor / Member / Owner              │
└──────────────┬───────────────────────────────────────┬─────────┘
               │                                       │
       (public marketing,                       (admin dashboard,
        signup, account)                         gated by is_admin)
               │                                       │
        ┌──────▼──────────────────────────────────────▼──────┐
        │              Next.js 15 on Vercel                  │
        │  • App Router, Server Components by default        │
        │  • Server Actions for forms                        │
        │  • Route Handlers in /api for Stripe webhook       │
        └──────┬────────────────┬───────────────────┬────────┘
               │                │                   │
        Supabase JS         Stripe SDK         Resend SDK
        (cookie-scoped)     (server only)      (server only)
               │                │                   │
        ┌──────▼──────┐  ┌──────▼──────┐    ┌──────▼──────┐
        │  Supabase   │  │   Stripe    │    │   Resend    │
        │  Postgres   │  │ Subs + Cust │    │ Transac.    │
        │  Auth + RLS │  │  Portal     │    │ email       │
        │  Storage    │  │  Webhooks ──┼────► /api/stripe/webhook
        └─────────────┘  └─────────────┘    └─────────────┘
```

Stripe is the **source of truth for billing state**. Postgres is the source of truth for everything else (member profile, classes, check-ins). The webhook keeps Postgres in sync with Stripe.

---

## Route groups

Three top-level route groups under `app/`, each with its own layout:

| Group         | Path prefix | Layout                  | Who can see       |
| ------------- | ----------- | ----------------------- | ----------------- |
| `(public)`    | `/`         | Marketing layout        | Anyone            |
| `(member)`    | `/account`  | Member portal layout    | Authenticated     |
| `(admin)`     | `/admin`    | Admin shell layout      | `is_admin = true` |

Each layout calls `getSession()` from `lib/supabase/server.ts` and redirects appropriately. The admin layout *additionally* checks the `members.is_admin` flag and 404s (not 403 — don't advertise the existence of admin) if not set.

---

## Supabase clients

Three flavors. Pick the right one for the context:

| Client                | File                                | Used in                                  | Auth context                  |
| --------------------- | ----------------------------------- | ---------------------------------------- | ----------------------------- |
| **Server (cookie)**   | `lib/supabase/server.ts`            | Server Components, Server Actions, RSC   | The signed-in user's session  |
| **Browser**           | `lib/supabase/client.ts`            | Client Components only                   | The signed-in user's session  |
| **Service role**      | `lib/supabase/admin.ts`             | Stripe webhook, seed script ONLY         | Bypasses RLS — be careful     |

The service-role client must never be imported from a Server Component or Server Action that a regular user can trigger. Lint rule: import of `lib/supabase/admin.ts` is forbidden outside `app/api/stripe/webhook/route.ts` and `supabase/seed/`.

---

## Auth flow

1. Visitor clicks **Join Now** on `/pricing` → `/signup`
2. Email + password form → Supabase `signUp()` → email verification link
3. On verify, redirect to `/signup/checkout` → server creates Stripe Checkout Session → redirect to Stripe
4. Stripe Checkout collects payment → success returns to `/signup/welcome`
5. **Stripe webhook** fires `checkout.session.completed` → webhook handler inserts/updates `members` and `subscriptions` rows
6. `/signup/welcome` polls `subscriptions` for active status (max 10s) then redirects to `/account`

Existing members log in at `/login` → `/account`.

The owner logs in the same way; the `is_admin` flag on his row unlocks `/admin`. We do not have a separate admin login surface.

---

## Server Action pattern

All form submissions are Server Actions, not API routes. Example:

```ts
// app/(public)/contact/actions.ts
"use server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
});

export async function submitContact(formData: FormData) {
  const parsed = ContactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Please check your entries." };

  const supabase = createClient();
  const { error } = await supabase.from("contact_messages").insert(parsed.data);
  if (error) return { error: "Couldn't send. Try again or call us." };

  // Fire-and-forget owner notification via Resend
  return { ok: true };
}
```

API routes are reserved for **webhooks and external callbacks** only (Stripe, future Plaid, etc.).

---

## Caching strategy

- Public marketing pages: **static** (`force-static`) with ISR every 60s where they read from the DB (e.g. Classes & Schedule pulls from `classes` table)
- Member portal: **dynamic** (every request), `noStore()` at the top of every page that reads user data
- Admin dashboard: **dynamic**, but use `revalidatePath` after mutations rather than disabling cache wholesale

---

## Email

Resend with four templates in `lib/email/templates/`:

| Trigger                                       | Subject                              | Template              |
| --------------------------------------------- | ------------------------------------ | --------------------- |
| `checkout.session.completed` (subscription)   | Welcome to Repz Gym                  | `welcome.tsx`         |
| `checkout.session.completed` (day pass)       | Your Repz day pass — show this at the door | `day_pass.tsx`  |
| `invoice.payment_failed`                      | Heads up — your Repz payment         | `payment_failed.tsx`  |
| Member-initiated cancellation                 | We'll miss you at Repz               | `cancellation.tsx`    |

Each template is a React Email component. Plain text fallback included.

The owner gets a **daily digest** at 7am (Vercel Cron) summarizing yesterday's signups, cancellations, and failed payments. One email a day, not one per event.

---

## Deployment

- **Vercel** for the Next.js app. Environment variables set in the Vercel dashboard; never `.env.production`.
- **Supabase** project lives in the `us-east-2` region (closest to West Michigan).
- **Stripe** is live mode from day one — the demo uses test mode keys. Document the switch in `docs/stripe-integration.md`.
- **Custom domain:** `repzgym.com` (assume the owner will buy it; instructions in deploy README).

Preview deploys from every PR are fine. Branch `main` deploys to production.

---

## Observability

- Vercel Analytics for page traffic
- Vercel logs for server-side errors
- Sentry is **out of scope** for v1 — revisit if the owner signs on
- Webhook events are **logged into a `webhook_events` Postgres table** for replay and audit (see `data-model.md`). This is non-negotiable: if Stripe and the DB ever disagree, the audit log is how we figure out why.

---

## Security checklist

- All tables have RLS on
- Service role key never reaches a client component
- Stripe webhook signature verified on every request (drop unsigned ones with 400)
- CSRF: Next Server Actions include built-in protection; double-check origin in webhook handler
- Rate-limit `/api/checkout` and `/contact` Server Action (Upstash later — for v1, a simple in-memory limiter per IP is acceptable)
- Sanitize anything that goes into an email body
- No PII in console.log
