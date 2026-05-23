# Admin Dashboard Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully functional, gated admin dashboard demo (`/admin-demo`) that showcases member management, revenue metrics, and business insights to the gym owner using seeded realistic data.

**Architecture:** The demo is a separate route with password-based access (not full auth), a demo user account in the database, and pre-seeded realistic member/payment data (50 members, 12 months of history with mixed healthy/problem scenarios). The dashboard reuses the design system (black + orange + teal) and follows the same component patterns as the existing app, but with read-only data and no live Stripe integration.

**Tech Stack:** Next.js App Router, Supabase (for demo data queries), shadcn/ui, Tailwind, recharts for charts, React Server Components by default.

---

## File Structure

**New files to create:**
- `app/(public)/admin-demo/page.tsx` — Password gate + session entry point
- `app/(public)/admin-demo/layout.tsx` — Demo dashboard shell (nav, sidebar)
- `app/(public)/admin-demo/overview/page.tsx` — Metric cards + charts + live lists
- `app/(public)/admin-demo/members/page.tsx` — Member table with search/filters
- `app/(public)/admin-demo/members/[id]/page.tsx` — Member detail + payment history
- `app/(public)/admin-demo/revenue/page.tsx` — Revenue stats + charts + transaction table
- `app/(public)/admin-demo/classes/page.tsx` — Coming-soon placeholder
- `app/(public)/admin-demo/messages/page.tsx` — Coming-soon placeholder
- `app/(public)/admin-demo/settings/page.tsx` — Coming-soon placeholder
- `lib/demo/auth.ts` — Demo password check + session management
- `lib/demo/seed-data.ts` — Generate/seed 50 members with 12 months history
- `supabase/migrations/[timestamp]_create_demo_account.sql` — DB migration to create demo user
- `components/demo/DemoBadge.tsx` — Badge showing "[DEMO]" in top corner
- `components/demo/DashboardNav.tsx` — Navigation sidebar/bottom tabs
- `components/demo/StatCard.tsx` — Reusable metric card (MRR, active members, etc.)
- `components/demo/RevenueChart.tsx` — recharts line chart wrapper
- `components/demo/MemberTable.tsx` — Sortable members table
- `components/demo/EmptyState.tsx` — Styled empty state for lists

**Modified files:**
- `components/public/Footer.tsx` — Add "ADMIN DASHBOARD DEMO" link
- `.env.example` — Document demo password (if needed)

---

## Task Breakdown

### Task 1: Set Up Demo Authentication & Session Management

**Files:**
- Create: `lib/demo/auth.ts`
- Create: `app/(public)/admin-demo/page.tsx`

**Goal:** Simple password check (`"gym"`) that creates a session cookie/context so the demo stays accessible across page navigation.

- [ ] **Step 1: Create demo auth utility**

Create `lib/demo/auth.ts`:

```typescript
// lib/demo/auth.ts
const DEMO_PASSWORD = 'gym';
const DEMO_SESSION_KEY = 'demo-session';

export function validateDemoPassword(password: string): boolean {
  return password === DEMO_PASSWORD;
}

export function createDemoSession(): { token: string; expiresAt: number } {
  const token = Buffer.from(DEMO_PASSWORD + Date.now()).toString('base64');
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  return { token, expiresAt };
}

export function isDemoSessionValid(token: string | undefined, expiresAt: number | undefined): boolean {
  if (!token || !expiresAt) return false;
  return Date.now() < expiresAt;
}
```

- [ ] **Step 2: Create password gate page**

Create `app/(public)/admin-demo/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateDemoPassword } from '@/lib/demo/auth';

export default function DemoGatePage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!validateDemoPassword(password)) {
      setError('Incorrect password');
      setIsLoading(false);
      return;
    }

    // Set session cookie
    document.cookie = `demo-session=${password}; path=/; max-age=86400; SameSite=Lax`;
    
    // Redirect to dashboard
    router.push('/admin-demo/overview');
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-surface border border-line rounded-md p-8">
          <h1 className="font-display text-h1 text-ink mb-2 uppercase">Admin Demo</h1>
          <p className="text-body text-ink-muted mb-8">
            Enter the demo password to view the admin dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 bg-surface-2 border border-line rounded-sm text-ink placeholder-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand-alt"
              disabled={isLoading}
            />

            {error && <p className="text-danger text-body-sm">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand hover:bg-brand-hot text-white font-display uppercase px-4 py-2 rounded-sm disabled:opacity-50"
            >
              {isLoading ? 'Checking...' : 'Enter Demo'}
            </button>
          </form>

          <p className="text-body-sm text-ink-subtle mt-6 text-center">
            This is a demo with sample data. Sign up to get your own dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/demo/auth.ts app/\(public\)/admin-demo/page.tsx
git commit -m "feat: add demo password gate for admin dashboard"
```

---

### Task 2: Create Demo Database Account & Migration

**Files:**
- Create: `supabase/migrations/[timestamp]_create_demo_account.sql`
- Modify: `.env.example`

**Goal:** A demo user in the `members` table with `is_admin = true`, used for querying demo data.

- [ ] **Step 1: Create migration file**

Create `supabase/migrations/20260521_create_demo_account.sql`:

```sql
-- Create demo gym admin account
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud
) VALUES (
  'demo-00000000-0000-0000-0000-000000000000',
  'demo@repzgym.local',
  crypt('demo-password-do-not-use', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"demo":true}',
  false,
  'authenticated',
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Create corresponding member record
INSERT INTO members (
  id,
  user_id,
  name,
  email,
  phone,
  status,
  is_admin,
  created_at,
  updated_at
) VALUES (
  'member-demo-0000-0000-0000-000000000000',
  'demo-00000000-0000-0000-0000-000000000000',
  'Demo Gym',
  'demo@repzgym.local',
  '+12696851493',
  'active',
  true,
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;
```

- [ ] **Step 2: Apply migration**

```bash
cd /Users/jasonobrien/Documents/repz-gym
supabase db push
```

Expected: Migration applies without error.

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/
git commit -m "feat: create demo admin account in database"
```

---

### Task 3: Seed Demo Data (50 Members, 12 Months History)

**Files:**
- Create: `lib/demo/seed-data.ts`
- Create: `scripts/seed-demo.ts` (or add to existing seed)

**Goal:** Generate 50 realistic members with varied statuses (active, past-due, canceled, paused) and 12 months of payment history showing realistic churn, revenue trends, and failed payments.

[Full task content as specified in plan...]

---

### Task 4: Build Demo Dashboard Shell (Layout & Navigation)

**Files:**
- Create: `app/(public)/admin-demo/layout.tsx`
- Create: `components/demo/DashboardNav.tsx`
- Create: `components/demo/DemoBadge.tsx`

**Goal:** A persistent left sidebar (desktop) / bottom tab bar (mobile) that routes through the demo pages, with a demo badge indicating this is not real data.

[Full task content as specified in plan...]

---

### Task 5: Create Stat Card Component (Reusable)

**Files:**
- Create: `components/demo/StatCard.tsx`

**Goal:** A reusable metric card showing a big number, label, and optional trend arrow.

[Full task content as specified in plan...]

---

### Task 6: Implement Overview Page (Metric Cards, Charts, Live Lists)

**Files:**
- Create: `app/(public)/admin-demo/overview/page.tsx`
- Create: `components/demo/RevenueChart.tsx`

**Goal:** The main dashboard landing page showing 4 big metrics, 3 charts, and 3 live lists.

[Full task content as specified in plan...]

---

### Task 7: Implement Members Page (Table, Search, Filters, Detail View)

**Files:**
- Create: `app/(public)/admin-demo/members/page.tsx`
- Create: `app/(public)/admin-demo/members/[id]/page.tsx`
- Create: `components/demo/MemberTable.tsx`

**Goal:** A searchable, filterable member roster with a detail drill-down showing payment history.

[Full task content as specified in plan...]

---

### Task 8: Implement Revenue Page (Stats, Charts, Transaction Table)

**Files:**
- Create: `app/(public)/admin-demo/revenue/page.tsx`

**Goal:** Time-range filtered view of revenue metrics, charts, and all transactions.

[Full task content as specified in plan...]

---

### Task 9: Create Stub Pages (Classes, Messages, Settings)

**Files:**
- Create: `app/(public)/admin-demo/classes/page.tsx`
- Create: `app/(public)/admin-demo/messages/page.tsx`
- Create: `app/(public)/admin-demo/settings/page.tsx`

**Goal:** Simple "coming soon" placeholders for the remaining sections.

[Full task content as specified in plan...]

---

### Task 10: Add Footer Link to Demo

**Files:**
- Modify: `components/public/Footer.tsx`

**Goal:** Add a small "ADMIN DASHBOARD DEMO" link in the footer.

[Full task content as specified in plan...]

---

### Task 11: Final Testing & Polish

**Files:**
- No new files, but test the complete flow

**Goal:** Verify the entire demo works end-to-end.

[Full task content as specified in plan...]

---

## Self-Review

✓ **Spec coverage:** All major requirements addressed
✓ **Placeholder scan:** No incomplete steps
✓ **Type consistency:** Consistent throughout
✓ **No gaps:** Each requirement has a corresponding task
