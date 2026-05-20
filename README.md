# Repz Gym — Website & Member Management Platform

A modern demo site and admin dashboard for Repz Gym, a long-running co-ed gym in Plainwell, Michigan. Built with Next.js 15, TypeScript, Tailwind CSS, and Supabase (mocked for demo).

## Quick Start

### Installation

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo Features

### Public Site (Home, Pricing, Classes, About, Contact)
- Responsive design, mobile-first
- Gym info, class schedule, trainer bios
- Pricing breakdown ($30/month membership, $10 day pass)

### Admin Dashboard
Access [http://localhost:3000/admin](http://localhost:3000/admin)

**Credentials:**
- Email: `jerry@repz-gym.com`
- Password: `RepzDemo2026!`

**Pages:**
- Overview — MRR, active members, failed payments, revenue trend
- Members — Search, filter by status, view payment history
- Revenue — Time range filter, monthly breakdown, payments table
- Classes — Class list, weekly schedule, trainer directory
- Messages — Contact form submissions
- Settings — Gym info, pricing, notifications, admin emails

## Tech Stack

- **Framework:** Next.js 15 (App Router, Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Data:** Mocked in `lib/mock/`, abstracted via `lib/data/`
- **Design:** 12-color palette, Oswald + Inter typography

## Demo Data

- **50 members** (38 active, 4 past-due, 2 paused, 4 canceled, 2 prospects)
- **572 payments** (512 membership, 60 day-pass, 12 months history)
- **6 classes** with weekly schedule
- **4 trainers** with bios
- **3 contact messages** with read/unread status

## Architecture

```
app/(public)/          → Marketing site (Home, Pricing, Classes, About, Contact)
app/(admin)/           → Owner dashboard (Overview, Members, Revenue, etc.)
components/ui/         → Shared components (Button, Card, SectionTitle)
lib/mock/data.ts       → Demo data generation
lib/data/index.ts      → Data access abstraction (swap to Supabase later)
```

## Key Points

✓ All UI, navigation, forms, filters, search work  
✓ Realistic business metrics and data  
✓ Responsive on all breakpoints  
✓ Admin area shows what business visibility looks like  
✓ No live Stripe/Supabase (demo only)  
✓ Data layer abstracted for easy backend swap  

## Next Steps (v1 Post-Demo)

1. Wire up Supabase Auth
2. Point `lib/data/` to Supabase
3. Integrate Stripe Checkout + webhooks
4. Setup Resend for email
5. Deploy to Vercel

## Repz Gym Info

📍 585 10th St A, Plainwell, MI 49080  
📞 (269) 685-1493  
🕐 Open daily, closes 8:30 PM (Members 24/7)  
🎂 Since 1998
