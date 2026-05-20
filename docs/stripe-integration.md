# Stripe Integration

The whole point of the back end. Stripe runs billing; Postgres mirrors enough state to power the dashboard.

---

## Stripe setup (one-time, in the dashboard)

1. Create the Stripe account. Use **test mode** for development.
2. **Products → Add product** — create **two** products:
   - "Repz Membership" → **recurring** price (monthly, USD). Copy the `price_…` id to `STRIPE_PRICE_ID_MONTHLY`.
   - "Repz Day Pass" → **one-time** price (USD). Copy the `price_…` id to `STRIPE_PRICE_ID_DAY_PASS`.
3. **Customer Portal** → enable. Configure:
   - Allow customers to update payment method ✅
   - Allow customers to cancel subscriptions ✅ (immediate cancel **off**; cancel at period end **on**)
   - Allow customers to update billing info ✅
   - Show invoice history ✅
4. **Webhooks → Add endpoint** → URL: `https://repzgym.com/api/stripe/webhook` (and a separate one to your dev tunnel during build).
   Subscribe to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `charge.refunded`
   - `payment_intent.succeeded` *(day-pass purchases)*
   Copy the signing secret to `STRIPE_WEBHOOK_SECRET`.
5. **Customer emails:** turn **off** Stripe's default "successful payment" emails — we send our own via Resend so they match the brand.

---

## Signup → Checkout flow

```
/pricing  →  /signup  →  /signup/checkout  →  Stripe Checkout  →  /signup/welcome
   (CTA)      (form)        (server action)       (hosted)            (poll)
```

### `/signup` — form

Collect:
- Email (required)
- Password (required, min 10 chars)
- First name, last name (required)
- Phone (required, masked input, validated to E.164)
- Date of birth (optional)
- Emergency contact name + phone (optional)

On submit (Server Action):
1. `supabase.auth.signUp` with email + password
2. The `handle_new_user` trigger creates a `members` row with `status = 'prospect'`
3. Server Action calls `supabase.from("members").update(...)` to fill in name, phone, etc.
4. Redirect to `/signup/checkout`

### `/signup/checkout` — server-side Stripe Checkout

```ts
// app/(public)/signup/checkout/route.ts
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: member } = await supabase
    .from("members")
    .select("*")
    .eq("id", user.id)
    .single();

  let customerId = member?.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: member!.email,
      name: `${member!.first_name} ${member!.last_name}`.trim(),
      phone: member!.phone ?? undefined,
      metadata: { member_id: member!.id },
    });
    customerId = customer.id;
    await supabase
      .from("members")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: process.env.STRIPE_PRICE_ID_MONTHLY!, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/signup/welcome?cs={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?canceled=1`,
    subscription_data: { metadata: { member_id: member!.id } },
    allow_promotion_codes: true,
  });

  redirect(session.url!);
}
```

### `/signup/welcome` — poll, then redirect

The webhook may race with the redirect back from Stripe. Poll the `subscriptions` table for up to 10s, then redirect to `/account`. If the poll times out, show: "Your payment went through — we're finishing setup. Click here to go to your account."

---

## Day Pass flow (one-off purchase)

Day passes don't need an account. A walk-in enters their name + email, pays, and gets a confirmation email they can show at the front desk. No password, no portal.

```
/day-pass  →  Stripe Checkout (payment mode)  →  /day-pass/welcome
  (form)         (hosted)                          (confirmation)
```

### `/day-pass` — form

Collect:
- First name, last name (required)
- Email (required)
- Phone (optional)
- Date the pass is for (default: today; can be up to 7 days in advance)

On submit (Server Action):
1. Look up or create a `members` row keyed on email. If new, status = `prospect`.
2. Create a Stripe `Customer` if the member doesn't have one yet (so day-pass buyers we eventually upsell into membership reuse the same customer).
3. Create a Stripe Checkout Session in `payment` mode:

```ts
const session = await stripe.checkout.sessions.create({
  mode: "payment",
  customer: customerId,
  line_items: [{ price: process.env.STRIPE_PRICE_ID_DAY_PASS!, quantity: 1 }],
  success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/day-pass/welcome?cs={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/day-pass?canceled=1`,
  metadata: {
    member_id: member!.id,
    pass_date: passDateIso,           // ISO date string
    kind: "day_pass",
  },
  payment_intent_data: {
    metadata: {
      member_id: member!.id,
      pass_date: passDateIso,
      kind: "day_pass",
    },
  },
});
```

Redirect to `session.url`.

### `/day-pass/welcome`

After Stripe redirects back, the webhook fires `checkout.session.completed` (mode=payment) and we send the confirmation email via Resend. The page shows: "You're in. Show this email at the front desk on [pass_date]."

### Webhook handling

`checkout.session.completed` checks `session.mode`:
- `subscription` → existing membership flow (see below)
- `payment` → day-pass flow: insert `payments` row with `kind = 'day_pass'`, send confirmation email

Day-pass payments are never `past_due` and never `refunded` from a retry — they're one-off. They show in the dashboard as a separate revenue stream.

---

## Webhook handler

`app/api/stripe/webhook/route.ts`. The hot path. Get this right.

```ts
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { admin } from "@/lib/supabase/admin"; // service role

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return new Response("bad sig", { status: 400 });
  }

  // Idempotency via Stripe event id
  const { error: dupErr } = await admin
    .from("webhook_events")
    .insert({ id: event.id, type: event.type, payload: event });
  if (dupErr?.code === "23505") return new Response("ok"); // already processed

  try {
    switch (event.type) {
      case "checkout.session.completed":         await handleCheckoutCompleted(event); break;
      case "customer.subscription.created":      await upsertSubscription(event); break;
      case "customer.subscription.updated":      await upsertSubscription(event); break;
      case "customer.subscription.deleted":      await markSubscriptionCanceled(event); break;
      case "invoice.payment_succeeded":          await recordPayment(event, "succeeded"); break;
      case "invoice.payment_failed":             await recordPayment(event, "failed"); break;
      case "charge.refunded":                    await recordRefund(event); break;
    }
    await admin.from("webhook_events").update({ processed_at: new Date().toISOString() }).eq("id", event.id);
    return new Response("ok");
  } catch (err) {
    await admin.from("webhook_events").update({ error: String(err) }).eq("id", event.id);
    return new Response("handler error", { status: 500 }); // Stripe will retry
  }
}
```

### Per-event behavior

**`checkout.session.completed`**
- Branch on `session.mode`:
  - **`subscription`** (membership flow):
    - Look up member by `stripe_customer_id`
    - Update `members.status = 'active'`
    - Send welcome email via Resend
  - **`payment`** (day-pass flow):
    - Insert `payments` row with `kind = 'day_pass'`, `amount_cents` from the session, `paid_at = now()`, `subscription_id = null`
    - Send day-pass confirmation email with the `pass_date` from metadata
    - Don't change the member's `status` — day-pass buyers are still `prospect` until they sign up for a real membership

**`customer.subscription.created` / `customer.subscription.updated`**
- Upsert into `subscriptions` keyed on `id`
- Copy `status`, `current_period_start`, `current_period_end`, `cancel_at_period_end`, `canceled_at`, `price.id`, `price.unit_amount`
- If `status` transitions to `past_due`: set `members.status = 'past_due'` (note: this is a UI status, not in the SQL enum — we render it in the dashboard but in the DB the member stays `active`; the *subscription* is what's `past_due`)

**`customer.subscription.deleted`**
- Set `subscriptions.status = 'canceled'`, `canceled_at = now()`
- Set `members.status = 'canceled'`
- Send cancellation email

**`invoice.payment_succeeded`**
- Insert `payments` row with `status = 'succeeded'`, `paid_at = invoice.status_transitions.paid_at`
- If member was `past_due`, return them to `active`

**`invoice.payment_failed`**
- Insert `payments` row with `status = 'failed'`, `failure_reason = invoice.last_finalization_error.message ?? attempt count`
- Send "payment failed" email with a link to the Customer Portal to update card
- Set `members.status = 'past_due'` for dashboard visibility

**`charge.refunded`**
- Update existing `payments` row to `status = 'refunded'`

---

## Customer Portal

Members manage their own card and cancellation through Stripe's Customer Portal — we don't build that UI.

`app/(member)/account/portal/route.ts`:

```ts
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: member } = await supabase
    .from("members").select("stripe_customer_id").eq("id", user.id).single();

  const session = await stripe.billingPortal.sessions.create({
    customer: member!.stripe_customer_id!,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account`,
  });
  redirect(session.url);
}
```

The member portal `/account` shows:
- Plan name, price, next bill date (from `subscriptions`)
- Payment history table (last 12 from `payments`)
- **Update card / Cancel** button → `/account/portal`
- Status banner if `past_due`: "Your last payment failed — please update your card."

---

## Failed payment UX

Three layers, in order:

1. **Stripe retry schedule.** Use Stripe's Smart Retries (3 attempts over 2 weeks). Don't replace this — it just works.
2. **Our email** on the first failure: friendly, one-tap link to the Customer Portal.
3. **Banner** on `/account` while `past_due`.

If after 3 attempts Stripe cancels the subscription, `customer.subscription.deleted` fires and we send the cancellation email. The owner sees this in the Failed payments / At-risk card on the dashboard the whole way through.

---

## Refunds

The owner initiates refunds in the Stripe Dashboard (we don't expose this in v1 to avoid foot-guns). The `charge.refunded` webhook syncs the state back to `payments`.

---

## Test plan (do this before declaring done)

Use Stripe test cards. Walk through every path:

| Scenario                    | Card                                       | Expected outcome                                                     |
| --------------------------- | ------------------------------------------ | -------------------------------------------------------------------- |
| Happy path (membership)     | `4242 4242 4242 4242`                      | Member becomes `active`, sub `active`, welcome email                 |
| Happy path (day pass)       | `4242 4242 4242 4242`                      | `payments` row with `kind='day_pass'`, confirmation email             |
| Requires authentication     | `4000 0025 0000 3155`                      | Checkout completes after 3DS, same outcome                           |
| Declined at checkout        | `4000 0000 0000 0002`                      | Stripe shows error, no member created, returned to `/pricing`        |
| Successful then fails next renewal | `4000 0000 0000 0341`               | Renewal `invoice.payment_failed` → past_due → email → portal updates |
| Cancel from portal          | n/a                                         | sub goes `cancel_at_period_end=true`, then `deleted` at period end   |
| Refund from dashboard       | n/a                                         | `payments` row flips to `refunded`                                   |

All six must pass in the dev tunnel before deploying.

---

## Going live

1. Switch keys: `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` to **live mode** in Vercel
2. Recreate the product + price in live mode; update `STRIPE_PRICE_ID_MONTHLY`
3. Recreate the webhook endpoint pointed at `https://repzgym.com/api/stripe/webhook`
4. Verify with a real card — owner charges himself a dollar via a test promo code, refunds it
5. Update the bank account on the Stripe payouts page to the gym's checking account
