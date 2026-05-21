# Repz Gym Color System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate an energetic three-color palette (Black, Teal, Orange) across the Repz Gym site with design tokens, component updates, and page styling that maintains tasteful aesthetic.

**Architecture:** Add Tailwind custom colors and CSS variables as the single source of truth. Update component variants (Button, SectionTitle, eyebrow labels) to consume tokens. Apply color accents to pages systematically: eyebrow labels in teal, section underlines in teal, primary buttons in orange, secondary buttons in teal, nav hover in teal, card accents in teal/orange. Admin dashboard uses the same palette for at-a-glance data scanning.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4 with custom properties, React Server Components

---

## File Structure

| File | Responsibility |
|------|-----------------|
| `tailwind.config.ts` | Define custom color tokens |
| `app/globals.css` | CSS custom properties and utility classes |
| `components/ui/Button.tsx` | Color-aware button variants |
| `components/ui/SectionTitle.tsx` | Add teal underline styling |
| `components/ui/Eyebrow.tsx` | Teal uppercase label component |
| `components/layout/Header.tsx` | Teal nav hover states |
| `components/layout/Footer.tsx` | Teal dividers and hover accents |
| `app/page.tsx` | Hero and section color application |
| `app/classes/page.tsx` | Class card teal accents |
| `app/pricing/page.tsx` | Pricing card orange/teal styling |
| `app/admin/dashboard/page.tsx` | Admin dashboard color scheme |

---

## Tasks

### Task 1: Update Tailwind Config with Custom Colors

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Open tailwind.config.ts and locate the `theme.extend` section**

- [ ] **Step 2: Add custom colors to the extend object**

Replace the current `tailwind.config.ts` with:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#f26522',           // Orange primary
        'brand-dark': '#d94816',    // Orange darker for hover
        'brand-alt': '#20b2aa',     // Teal secondary
        'brand-alt-light': '#28ccc0', // Teal lighter for hover
        bg: '#0a0a0a',              // Black background
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
      },
      letterSpacing: {
        eyebrow: '0.1em',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Verify the file has no syntax errors**

Run: `npx tsc --noEmit tailwind.config.ts`
Expected: No errors (or only type-checker notes about config format, which are fine)

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: add brand color tokens to Tailwind config"
```

---

### Task 2: Add CSS Custom Properties and Utility Classes to globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Open `app/globals.css` and locate the `:root` selector or create one at the top**

- [ ] **Step 2: Add CSS custom properties for colors and add utility classes**

Add this after any existing `@tailwind` directives (or at the top if starting fresh):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Brand Colors */
  --color-brand: #f26522;           /* Orange */
  --color-brand-dark: #d94816;      /* Orange dark */
  --color-brand-alt: #20b2aa;       /* Teal */
  --color-brand-alt-light: #28ccc0; /* Teal light */
  --color-bg: #0a0a0a;              /* Black */
  
  /* Spacing & Typography */
  --space-section: clamp(4rem, 3rem + 5vw, 10rem);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
}

/* Utility: Section title underline in teal */
@layer components {
  .eyebrow {
    @apply text-xs font-display uppercase tracking-eyebrow text-brand-alt;
  }
  
  /* Teal underline for section titles */
  .section-title-underline {
    @apply border-b-3 border-brand-alt w-full sm:w-3/5 my-4;
  }
  
  /* Focus ring in brand color */
  .focus-ring {
    @apply focus:outline-none focus:ring-2 focus:ring-brand-alt focus:ring-offset-2 focus:ring-offset-bg;
  }
}
```

- [ ] **Step 3: Verify globals.css has correct syntax (no unclosed braces)**

Check the file in your editor for matching braces.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat: add CSS custom properties and utility classes for color system"
```

---

### Task 3: Update Button Component to Support Brand Colors

**Files:**
- Modify: `components/ui/Button.tsx`

- [ ] **Step 1: Read the current Button component**

- [ ] **Step 2: Update the variant styles to use brand colors**

Replace `components/ui/Button.tsx` with:

```typescript
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantStyles = {
  primary: "bg-brand text-black border border-brand hover:bg-brand-dark transition-colors",
  secondary: "bg-transparent text-brand-alt border border-brand-alt hover:bg-brand-alt/10 transition-colors",
  ghost: "bg-transparent text-brand-alt hover:text-brand hover:underline",
  danger: "bg-red-600 text-white border border-red-600 hover:bg-red-700 transition-colors",
};

const sizeStyles = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-sm font-display font-bold uppercase tracking-wide transition-colors duration-150";
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const combinedClassName = `${baseStyles} ${variantStyle} ${sizeStyle} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 3: Verify the component exports properly**

Check that TypeScript has no errors: `npx tsc --noEmit components/ui/Button.tsx`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add components/ui/Button.tsx
git commit -m "feat: update Button component with brand color variants"
```

---

### Task 4: Update SectionTitle Component with Teal Underline

**Files:**
- Modify: `components/ui/SectionTitle.tsx`

- [ ] **Step 1: Read the current SectionTitle component**

- [ ] **Step 2: Add teal underline styling below the title**

Replace `components/ui/SectionTitle.tsx` with:

```typescript
interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function SectionTitle({ eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <div>
      {eyebrow && (
        <div className="eyebrow mb-4">
          {eyebrow}
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-ink">
        {title}
      </h2>
      {/* Teal underline accent */}
      <div className="section-title-underline" />
      {subtitle && (
        <p className="mt-4 text-lg text-ink-muted max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify component renders correctly**

Check TypeScript: `npx tsc --noEmit components/ui/SectionTitle.tsx`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add components/ui/SectionTitle.tsx
git commit -m "feat: add teal underline accent to SectionTitle component"
```

---

### Task 5: Create Eyebrow Component (If Not Exists)

**Files:**
- Create: `components/ui/Eyebrow.tsx` (only if it doesn't exist)

- [ ] **Step 1: Check if `components/ui/Eyebrow.tsx` exists**

Run: `ls -la components/ui/Eyebrow.tsx 2>/dev/null || echo "File does not exist"`

- [ ] **Step 2: If file doesn't exist, create it**

```typescript
interface EyebrowProps {
  children: string;
}

export function Eyebrow({ children }: EyebrowProps) {
  return (
    <div className="eyebrow">
      {children}
    </div>
  );
}
```

- [ ] **Step 3: If file already exists, verify it outputs teal text using the `.eyebrow` class**

Open the file and check that it includes `className="eyebrow"` or equivalent teal styling.

- [ ] **Step 4: Commit (only if created)**

```bash
git add components/ui/Eyebrow.tsx
git commit -m "feat: create Eyebrow component with teal styling"
```

---

### Task 6: Update Header Component with Teal Hover States

**Files:**
- Modify: `components/layout/Header.tsx`

- [ ] **Step 1: Read the current Header component**

- [ ] **Step 2: Update navigation link hover state to use teal**

Replace the nav link className in `components/layout/Header.tsx`:

Look for lines like:
```typescript
<Link href="/" className="text-sm font-display uppercase text-ink-muted transition hover:text-brand">
```

Change `hover:text-brand` to `hover:text-brand-alt`:

```typescript
<Link href="/" className="text-sm font-display uppercase text-ink-muted transition hover:text-brand-alt">
```

Apply this to ALL nav links (Home, Classes, Pricing, About, Contact).

Complete updated Header.tsx:

```typescript
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-display text-2xl font-bold text-brand uppercase tracking-wide">
            Repz
          </Link>

          {/* Navigation */}
          <nav className="hidden gap-8 md:flex">
            <Link href="/" className="text-sm font-display uppercase text-ink-muted transition hover:text-brand-alt">
              Home
            </Link>
            <Link href="/classes" className="text-sm font-display uppercase text-ink-muted transition hover:text-brand-alt">
              Classes
            </Link>
            <Link href="/pricing" className="text-sm font-display uppercase text-ink-muted transition hover:text-brand-alt">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-display uppercase text-ink-muted transition hover:text-brand-alt">
              About
            </Link>
            <Link href="/contact" className="text-sm font-display uppercase text-ink-muted transition hover:text-brand-alt">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <Button size="sm" variant="primary" href="/signup">
            Join Now
          </Button>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Verify no TypeScript errors**

Run: `npx tsc --noEmit components/layout/Header.tsx`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add components/layout/Header.tsx
git commit -m "feat: update Header nav links to teal hover state"
```

---

### Task 7: Update Footer Component with Teal Dividers and Hover Accents

**Files:**
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Read the current Footer component**

- [ ] **Step 2: Add teal borders between footer columns and teal link hover state**

Replace `components/layout/Footer.tsx` with:

```typescript
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-brand-alt bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="border-b md:border-b-0 md:border-r border-brand-alt pb-8 md:pb-0 md:pr-8">
            <div className="font-display text-xl font-bold text-brand uppercase">Repz Gym</div>
            <p className="mt-2 text-sm text-ink-muted">No glamour. Just a great workout.</p>
            <p className="mt-1 text-xs text-ink-subtle">Plainwell, Michigan • Since 1998</p>
          </div>

          {/* Quick Links */}
          <div className="border-b md:border-b-0 md:border-r border-brand-alt pb-8 md:pb-0 md:pr-8">
            <h4 className="font-display text-sm font-bold uppercase text-ink">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-ink-muted transition hover:text-brand-alt">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-sm text-ink-muted transition hover:text-brand-alt">
                  Classes
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-ink-muted transition hover:text-brand-alt">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-ink-muted transition hover:text-brand-alt">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="border-b md:border-b-0 md:border-r border-brand-alt pb-8 md:pb-0 md:pr-8">
            <h4 className="font-display text-sm font-bold uppercase text-ink">Contact</h4>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-ink-muted">(269) 685-1493</li>
              <li className="text-sm text-ink-muted">585 10th St A</li>
              <li className="text-sm text-ink-muted">Plainwell, MI 49080</li>
              <li>
                <a href="mailto:jerry@repz-gym.com" className="text-sm text-brand transition hover:text-brand-dark">
                  jerry@repz-gym.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase text-ink">Hours</h4>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-ink-muted">Mon–Fri: 6am–8:30pm</li>
              <li className="text-sm text-ink-muted">Sat: 7am–7pm</li>
              <li className="text-sm text-ink-muted">Sun: 8am–6pm</li>
              <li className="text-xs text-ink-subtle mt-4">24/7 key-fob access for members</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-brand-alt pt-8 flex items-center justify-between text-xs text-ink-subtle">
          <p>&copy; 2024 Repz Gym. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://facebook.com/repzgym" target="_blank" rel="noopener noreferrer" className="transition hover:text-brand-alt">
              Facebook
            </a>
            <a href="https://yelp.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-brand-alt">
              Yelp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verify no TypeScript errors**

Run: `npx tsc --noEmit components/layout/Footer.tsx`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add teal dividers and hover accents to Footer"
```

---

### Task 8: Apply Colors to Hero Section (app/page.tsx)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Read the current `app/page.tsx` hero section**

- [ ] **Step 2: Update hero section to include eyebrow in teal and title accent in teal**

Replace the hero section in `app/page.tsx` (lines ~12-29):

```typescript
      {/* Hero */}
      <section className="relative min-h-screen bg-gradient-to-br from-bg via-surface to-bg px-6 py-32 pt-32">
        <div className="mx-auto max-w-5xl text-center">
          <div className="eyebrow mb-6">SHAPE YOUR BODY</div>
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase leading-tight text-ink">
            BE <span className="text-brand-alt">STRONG</span>. TRAIN HARD.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-ink-muted">
            Plainwell's gym since 1998. No glamour. Just a great workout.
          </p>
          <div className="mt-12 flex flex-col justify-center gap-4 md:flex-row">
            <Button size="lg" variant="primary" href="/signup">
              JOIN NOW
            </Button>
            <Button size="lg" variant="secondary" href="/classes">
              SEE THE SCHEDULE
            </Button>
          </div>
        </div>
      </section>
```

Key changes:
- Changed eyebrow div to use `.eyebrow` class
- Changed `<span className="text-brand">STRONG</span>` to `<span className="text-brand-alt">STRONG</span>` (teal)

- [ ] **Step 3: Verify no TypeScript errors**

Run: `npx tsc --noEmit app/page.tsx`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: apply teal accents to hero section eyebrow and title"
```

---

### Task 9: Apply Colors to Section Titles on Home Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Locate all SectionTitle components in the home page (should be around lines 35, 60, 81, 114)**

- [ ] **Step 2: Ensure eyebrow text is passed to SectionTitle component**

The SectionTitle component already handles the eyebrow in teal via the `.eyebrow` class, so verify calls look like:

```typescript
<SectionTitle
  eyebrow="WHY CHOOSE US"
  title="PUSH YOUR LIMITS FORWARD"
  subtitle="Full floor. Full community. Full commitment."
/>
```

If eyebrow is missing, add it.

- [ ] **Step 3: Verify the sections render with teal underlines**

Check that the component renders the section-title-underline div (defined in globals.css).

- [ ] **Step 4: No changes needed if already correct; otherwise update and commit**

```bash
git add app/page.tsx
git commit -m "feat: ensure all home page sections have teal eyebrows and underlines"
```

---

### Task 10: Apply Colors to Class Cards

**Files:**
- Modify: `app/page.tsx` (Classes Preview section, ~lines 57-76)

- [ ] **Step 1: Locate the Classes Preview section in app/page.tsx**

- [ ] **Step 2: Add teal top border and teal class label to class cards**

Replace the Classes Preview section with:

```typescript
      {/* Classes Preview */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="OUR CLASSES" title="WHAT WE OFFER" subtitle="Walk in, sign in, get to work." />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {classes.filter(c => c.is_active).map((cls) => (
              <div key={cls.id} className="group cursor-pointer overflow-hidden rounded-md bg-surface border-t-3 border-brand-alt">
                <div className="relative h-48 bg-gradient-to-b from-brand-alt/20 to-bg">
                  <div className="absolute inset-0 flex items-end p-4">
                    <div>
                      <div className="eyebrow">CLASS</div>
                      <h3 className="text-xl font-display font-bold uppercase text-ink">{cls.name}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
```

Key changes:
- Added `border-t-3 border-brand-alt` to card (teal top border)
- Changed class label div to use `.eyebrow` class
- Updated gradient to use `from-brand-alt/20` (teal tint)

- [ ] **Step 3: Verify no TypeScript errors**

Run: `npx tsc --noEmit app/page.tsx`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add teal accents to class cards"
```

---

### Task 11: Apply Colors to Pricing Cards

**Files:**
- Modify: `app/page.tsx` (Pricing Preview section, ~lines 78-109)

- [ ] **Step 1: Locate the Pricing Preview section in app/page.tsx**

- [ ] **Step 2: Add orange "MOST POPULAR" badge and teal border to secondary card**

Replace the Pricing Preview section with:

```typescript
      {/* Pricing Preview */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="OUR PLAN" title="CHOOSE YOUR ENTRY POINT" />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-md border border-line bg-surface p-8">
              <div className="text-xs font-display uppercase tracking-eyebrow text-brand">MOST POPULAR</div>
              <h3 className="mt-4 text-3xl font-display font-bold uppercase text-ink">$30</h3>
              <p className="text-xs uppercase text-ink-muted">/ MONTH</p>
              <ul className="mt-8 space-y-3 text-sm text-ink-muted">
                <li>✓ Full gym floor</li>
                <li>✓ All group classes</li>
                <li>✓ 24/7 key-fob access</li>
                <li>✓ No contract</li>
              </ul>
              <Button size="lg" variant="primary" className="mt-8 w-full">JOIN NOW</Button>
            </div>
            <div className="rounded-md border-2 border-brand-alt bg-surface p-8">
              <div className="text-xs font-display uppercase tracking-eyebrow text-ink-muted">ONE-TIME</div>
              <h3 className="mt-4 text-3xl font-display font-bold uppercase text-ink">$10</h3>
              <p className="text-xs uppercase text-ink-muted">/ DAY</p>
              <ul className="mt-8 space-y-3 text-sm text-ink-muted">
                <li>✓ Full gym floor</li>
                <li>✓ Drop in on classes</li>
                <li>✓ No commitment</li>
                <li>✓ Apply to membership</li>
              </ul>
              <Button size="lg" variant="secondary" className="mt-8 w-full">BUY A DAY PASS</Button>
            </div>
          </div>
        </div>
      </section>
```

Key changes:
- "MOST POPULAR" label in orange (explicit `text-brand`)
- Secondary card border changed from `border` to `border-2 border-brand-alt` (teal 2px border)
- Secondary button already uses `variant="secondary"` which is teal

- [ ] **Step 3: Verify no TypeScript errors**

Run: `npx tsc --noEmit app/page.tsx`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add orange and teal accents to pricing cards"
```

---

### Task 12: Update Trainer Section with Teal Accents

**Files:**
- Modify: `app/page.tsx` (Trainers section, ~lines 111-125)

- [ ] **Step 1: Locate the Trainers section in app/page.tsx**

- [ ] **Step 2: Add alternating orange/teal dot accents to trainer cards**

Replace the Trainers section with:

```typescript
      {/* Trainers */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="OUR TEAM" title="TRAIN WITH EXPERTS" />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {trainers.map((trainer, idx) => (
              <div key={trainer.id} className="text-center">
                <div className="mx-auto h-40 w-32 rounded-md bg-gradient-to-b from-brand/10 to-surface relative">
                  {/* Alternating accent dot */}
                  <div className={`absolute -top-2 -right-2 h-4 w-4 rounded-full ${idx % 2 === 0 ? 'bg-brand' : 'bg-brand-alt'}`} />
                </div>
                <h3 className="mt-4 font-display font-bold uppercase text-ink">{trainer.name}</h3>
                <p className="text-xs text-brand-alt">{trainer.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
```

Key changes:
- Added alternating orange/teal dot accent on each trainer card
- Changed tagline color from `text-brand` to `text-brand-alt`

- [ ] **Step 3: Verify no TypeScript errors**

Run: `npx tsc --noEmit app/page.tsx`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add alternating orange/teal accents to trainer cards"
```

---

### Task 13: Create Admin Dashboard Page with Color Scheme Foundation

**Files:**
- Create: `app/admin/dashboard/page.tsx`

- [ ] **Step 1: Create the directory structure**

Run: `mkdir -p app/admin/dashboard`
Expected: Directories created

- [ ] **Step 2: Create the admin dashboard page with color scheme**

```typescript
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* Sidebar placeholder */}
      <div className="flex">
        <aside className="w-64 border-r border-brand-alt bg-surface p-6">
          <h2 className="font-display text-xl font-bold uppercase text-brand mb-6">Admin</h2>
          <nav className="space-y-2">
            <div className="pl-4 border-l-4 border-brand-alt py-2 px-3 bg-bg/50 rounded text-sm uppercase font-display text-brand-alt">
              Dashboard
            </div>
            <div className="py-2 px-3 text-sm uppercase font-display text-ink-muted hover:text-brand-alt cursor-pointer">
              Members
            </div>
            <div className="py-2 px-3 text-sm uppercase font-display text-ink-muted hover:text-brand-alt cursor-pointer">
              Classes
            </div>
            <div className="py-2 px-3 text-sm uppercase font-display text-ink-muted hover:text-brand-alt cursor-pointer">
              Settings
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <SectionTitle title="Dashboard" eyebrow="Welcome Back" />

          {/* Key Metrics */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-md border border-line bg-surface p-6">
              <div className="text-xs font-display uppercase tracking-eyebrow text-brand">Active Members</div>
              <div className="mt-4 text-4xl font-display font-bold text-brand">1,247</div>
              <p className="mt-2 text-sm text-ink-muted">+12 this week</p>
            </div>
            <div className="rounded-md border border-line bg-surface p-6">
              <div className="text-xs font-display uppercase tracking-eyebrow text-brand-alt">Classes This Week</div>
              <div className="mt-4 text-4xl font-display font-bold text-brand-alt">24</div>
              <p className="mt-2 text-sm text-ink-muted">4 per day</p>
            </div>
            <div className="rounded-md border border-line bg-surface p-6">
              <div className="text-xs font-display uppercase tracking-eyebrow text-brand-alt">Revenue</div>
              <div className="mt-4 text-4xl font-display font-bold text-ink">$8,340</div>
              <p className="mt-2 text-sm text-ink-muted">This month</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-12 rounded-md border border-line bg-surface p-6">
            <h3 className="font-display text-lg font-bold uppercase text-ink mb-4">Recent Activity</h3>
            <ul className="space-y-3">
              <li className="text-sm text-ink-muted border-l-4 border-brand-alt pl-3">New member signup: Sarah M.</li>
              <li className="text-sm text-ink-muted border-l-4 border-brand pl-3">Class scheduled: Boxing at 6pm</li>
              <li className="text-sm text-ink-muted border-l-4 border-brand-alt pl-3">Payment received: $30 membership</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-12 flex gap-4">
            <Button variant="primary">Create Member</Button>
            <Button variant="secondary">View Reports</Button>
          </div>
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify no TypeScript errors**

Run: `npx tsc --noEmit app/admin/dashboard/page.tsx`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add app/admin/dashboard/page.tsx
git commit -m "feat: create admin dashboard page with brand color scheme"
```

---

### Task 14: Visual Testing and Final Review

**Files:**
- Test: All pages

- [ ] **Step 1: Start the dev server**

Run: `npm run dev` or `yarn dev`
Expected: Server running on http://localhost:3000

- [ ] **Step 2: Test home page colors in browser**

Navigate to http://localhost:3000

Visual checks:
- ✓ Hero section has teal "SHAPE YOUR BODY" eyebrow
- ✓ "STRONG" is teal in headline
- ✓ Primary button is orange, secondary is teal
- ✓ Section titles have teal underlines
- ✓ Section eyebrows are teal
- ✓ Class cards have teal top border and teal "CLASS" label
- ✓ Pricing "MOST POPULAR" is orange
- ✓ Secondary pricing card has teal border
- ✓ Trainer cards have alternating orange/teal dots
- ✓ Navigation links turn teal on hover
- ✓ Footer has teal dividers

- [ ] **Step 3: Test responsive behavior at 375px, 768px, 1440px**

Use browser dev tools to test at different viewport widths:
- 375px (mobile)
- 768px (tablet)
- 1440px (desktop)

Expected: Colors and accents remain visible and tasteful at all widths

- [ ] **Step 4: Test admin dashboard**

Navigate to http://localhost:3000/admin/dashboard

Visual checks:
- ✓ Sidebar has teal active nav indicator
- ✓ Key metrics use orange and teal accents
- ✓ Recent activity has colored borders
- ✓ Buttons match site colors

- [ ] **Step 5: Test color contrast with accessibility tools**

Install WAVE or axe DevTools browser extension and run on home page:

Expected: No contrast errors; WCAG AA compliance for all text

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "feat: complete color system integration across all pages"
```
