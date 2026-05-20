# Data Model

Postgres schema (Supabase). All money is integer cents. All timestamps are `timestamptz` (UTC).

Every table has RLS enabled. The policies at the bottom of this file are part of the spec — implement them.

---

## Tables

### `members`

The roster. One row per real human, created when Supabase Auth creates an account.

| Column                  | Type           | Notes                                                   |
| ----------------------- | -------------- | ------------------------------------------------------- |
| `id`                    | `uuid` PK      | Matches `auth.users.id` exactly                         |
| `email`                 | `text` UNIQUE  | Mirrored from auth.users for query convenience          |
| `first_name`            | `text`         |                                                         |
| `last_name`             | `text`         |                                                         |
| `phone`                 | `text`         | E.164 format                                            |
| `date_of_birth`         | `date`         | Optional                                                |
| `emergency_contact_name`| `text`         | Optional                                                |
| `emergency_contact_phone`| `text`        | Optional, E.164                                         |
| `photo_url`             | `text`         | Supabase Storage URL                                    |
| `joined_at`             | `timestamptz`  | Default `now()`                                         |
| `notes`                 | `text`         | Owner-only notes (RLS hides from member)                |
| `is_admin`              | `boolean`      | Default `false`. The owner's row is `true`.             |
| `stripe_customer_id`    | `text` UNIQUE  | Populated by webhook                                    |
| `status`                | `text`         | enum: `active`, `paused`, `canceled`, `prospect`        |
| `created_at`            | `timestamptz`  |                                                         |
| `updated_at`            | `timestamptz`  |                                                         |

Index: `(status)`, `(stripe_customer_id)`, `(last_name, first_name)`.

### `subscriptions`

Mirror of Stripe Subscriptions. The webhook is the only thing that writes here.

| Column                  | Type           | Notes                                                  |
| ----------------------- | -------------- | ------------------------------------------------------ |
| `id`                    | `text` PK      | Stripe subscription id (`sub_…`)                       |
| `member_id`             | `uuid` FK→members |                                                     |
| `status`                | `text`         | Stripe status: `active`, `past_due`, `canceled`, etc.  |
| `current_period_start`  | `timestamptz`  |                                                        |
| `current_period_end`    | `timestamptz`  |                                                        |
| `cancel_at_period_end`  | `boolean`      |                                                        |
| `canceled_at`           | `timestamptz`  | Nullable                                               |
| `price_id`              | `text`         | Stripe price id                                        |
| `amount_cents`          | `integer`      | Convenience copy of the price amount                   |
| `created_at`            | `timestamptz`  |                                                        |
| `updated_at`            | `timestamptz`  |                                                        |

Index: `(member_id)`, `(status)`.

### `payments`

Every charge attempt — successful or failed. Drives the revenue dashboard. Includes both **recurring** subscription invoices and **one-off** day-pass purchases. The `subscription_id` column distinguishes them: null = day pass, non-null = membership invoice.

| Column                  | Type           | Notes                                                   |
| ----------------------- | -------------- | ------------------------------------------------------- |
| `id`                    | `text` PK      | Stripe charge or payment_intent id                      |
| `member_id`             | `uuid` FK→members |                                                      |
| `subscription_id`       | `text` FK→subscriptions | Nullable. Null = day pass; non-null = sub      |
| `kind`                  | `text`         | `membership` or `day_pass`. Convenience for queries.    |
| `amount_cents`          | `integer`      |                                                         |
| `currency`              | `text`         | `usd`                                                   |
| `status`                | `text`         | `succeeded`, `failed`, `refunded`, `pending`            |
| `failure_reason`        | `text`         | Nullable                                                |
| `paid_at`               | `timestamptz`  | Nullable until succeeded                                |
| `created_at`            | `timestamptz`  |                                                         |

Index: `(member_id, paid_at DESC)`, `(status, paid_at DESC)`.

### `classes`

The class catalog (MAD FITNEZ, Taekwondo, etc.). Public-readable.

| Column         | Type        | Notes                                              |
| -------------- | ----------- | -------------------------------------------------- |
| `id`           | `uuid` PK   |                                                    |
| `slug`         | `text` UNIQUE | `mad-fitnez`, `taekwondo-kids`, …                |
| `name`         | `text`      |                                                    |
| `description`  | `text`      |                                                    |
| `instructor_id`| `uuid` FK→trainers | Nullable                                    |
| `image_url`    | `text`      |                                                    |
| `is_active`    | `boolean`   |                                                    |

### `class_sessions`

Recurring schedule entries. v1 is informational only — no booking.

| Column        | Type        | Notes                                               |
| ------------- | ----------- | --------------------------------------------------- |
| `id`          | `uuid` PK   |                                                     |
| `class_id`    | `uuid` FK   |                                                     |
| `day_of_week` | `smallint`  | 0=Sunday … 6=Saturday                               |
| `start_time`  | `time`      | Local time (America/Detroit)                        |
| `duration_min`| `integer`   |                                                     |
| `notes`       | `text`      | "Starting next week!", "No class July 4," etc.      |

### `trainers`

Public-facing bios.

| Column       | Type        | Notes                                                  |
| ------------ | ----------- | ------------------------------------------------------ |
| `id`         | `uuid` PK   |                                                        |
| `name`       | `text`      | "Katherine Perez"                                      |
| `tagline`    | `text`      | "MAD FITNEZ instructor"                                |
| `bio`        | `text`      | A paragraph or two                                     |
| `photo_url`  | `text`      |                                                        |
| `is_active`  | `boolean`   |                                                        |
| `sort_order` | `integer`   |                                                        |

### `check_ins`

Future-proofing for the key-fob system. v1 we don't integrate the fob hardware, but the table is here so the dashboard has a place to surface activity later.

| Column        | Type          | Notes                                                |
| ------------- | ------------- | ---------------------------------------------------- |
| `id`          | `bigserial` PK |                                                     |
| `member_id`   | `uuid` FK     |                                                      |
| `checked_in_at`| `timestamptz`|                                                      |
| `source`      | `text`        | `keyfob`, `manual`, `seed`                           |

Seed script will populate this so the admin's "Recent activity" widget has content.

### `contact_messages`

From the public contact form.

| Column        | Type          | Notes                                                |
| ------------- | ------------- | ---------------------------------------------------- |
| `id`          | `bigserial` PK|                                                      |
| `name`        | `text`        |                                                      |
| `email`       | `text`        |                                                      |
| `phone`       | `text`        | Optional                                             |
| `message`     | `text`        |                                                      |
| `status`      | `text`        | `new`, `read`, `replied`                             |
| `created_at`  | `timestamptz` |                                                      |

### `webhook_events`

Audit log of every Stripe webhook we receive. Keep forever.

| Column        | Type          | Notes                                                |
| ------------- | ------------- | ---------------------------------------------------- |
| `id`          | `text` PK     | Stripe event id (`evt_…`) — natural idempotency key  |
| `type`        | `text`        | `customer.subscription.updated`, etc.                |
| `payload`     | `jsonb`       | Full event body                                      |
| `processed_at`| `timestamptz` | Nullable until we finish handling                    |
| `error`       | `text`        | Nullable                                             |
| `received_at` | `timestamptz` | Default `now()`                                      |

The PK is the Stripe event id — `INSERT ... ON CONFLICT DO NOTHING` gives us idempotency for free.

---

## Row Level Security policies

Enable RLS on every table the moment you create it.

### `members`

```sql
-- Members see their own row
create policy "self_select" on members
  for select using (auth.uid() = id);

-- Members update their own profile (but not is_admin, status, stripe_customer_id, notes)
create policy "self_update" on members
  for update using (auth.uid() = id)
  with check (
    auth.uid() = id
    and is_admin = (select is_admin from members where id = auth.uid())
    and status   = (select status   from members where id = auth.uid())
  );

-- Admins see and update everyone
create policy "admin_all" on members
  for all using (
    exists (select 1 from members m where m.id = auth.uid() and m.is_admin)
  );
```

### `subscriptions`, `payments`

```sql
-- Member sees only their own
create policy "self_select" on subscriptions
  for select using (member_id = auth.uid());

create policy "self_select" on payments
  for select using (member_id = auth.uid());

-- Admin sees all
create policy "admin_all" on subscriptions
  for all using (
    exists (select 1 from members m where m.id = auth.uid() and m.is_admin)
  );

create policy "admin_all" on payments
  for all using (
    exists (select 1 from members m where m.id = auth.uid() and m.is_admin)
  );
```

No `INSERT`/`UPDATE` from regular users — the webhook (service role) writes these.

### `classes`, `class_sessions`, `trainers`

```sql
-- Public read
create policy "public_read" on classes
  for select using (is_active);

create policy "public_read" on class_sessions for select using (true);

create policy "public_read" on trainers
  for select using (is_active);

-- Admin write
create policy "admin_write" on classes for all using (
  exists (select 1 from members m where m.id = auth.uid() and m.is_admin)
);
-- (same pattern for class_sessions and trainers)
```

### `contact_messages`

```sql
-- Anyone can insert (it's a public form)
create policy "public_insert" on contact_messages
  for insert with check (true);

-- Only admin reads
create policy "admin_read" on contact_messages
  for select using (
    exists (select 1 from members m where m.id = auth.uid() and m.is_admin)
  );
```

### `webhook_events`

No policies — only the service-role key writes here, and the admin reads via a server query that uses the service role explicitly.

---

## Triggers

1. **`handle_new_user`** (auth → public.members)
   ```sql
   create function public.handle_new_user() returns trigger as $$
   begin
     insert into public.members (id, email, status, created_at)
     values (new.id, new.email, 'prospect', now());
     return new;
   end;
   $$ language plpgsql security definer;

   create trigger on_auth_user_created
     after insert on auth.users
     for each row execute function public.handle_new_user();
   ```
   New auth users get a `prospect` row. Stripe webhook flips them to `active` after first successful payment.

2. **`updated_at` autostamp** on `members`, `subscriptions`, `classes`, `trainers`. Standard `before update` trigger.

---

## Useful views

For the admin dashboard. Materialize if performance is ever an issue; for v1 plain views are fine.

```sql
create view active_members as
  select m.*, s.current_period_end, s.amount_cents
  from members m
  join subscriptions s on s.member_id = m.id
  where m.status = 'active' and s.status = 'active';

create view mrr_by_month as
  select
    date_trunc('month', paid_at) as month,
    sum(amount_cents) filter (where status = 'succeeded')                                 as revenue_cents,
    sum(amount_cents) filter (where status = 'succeeded' and kind = 'membership')         as membership_revenue_cents,
    sum(amount_cents) filter (where status = 'succeeded' and kind = 'day_pass')           as day_pass_revenue_cents,
    count(*) filter (where status = 'succeeded')                                          as successful_payments,
    count(*) filter (where status = 'failed')                                             as failed_payments,
    count(*) filter (where status = 'succeeded' and kind = 'day_pass')                    as day_passes_sold
  from payments
  where paid_at >= now() - interval '24 months'
  group by 1
  order by 1;

create view churn_by_month as
  select
    date_trunc('month', canceled_at) as month,
    count(*) as canceled
  from subscriptions
  where canceled_at is not null
  group by 1;
```

These three views feed the dashboard's three primary charts.
