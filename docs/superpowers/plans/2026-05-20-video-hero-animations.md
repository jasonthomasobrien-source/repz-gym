# Video Hero + Alternating Sections + Scroll Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the home page hero slider with a full-bleed video background, introduce subtle alternating section backgrounds, and implement scroll-triggered animations (parallax on video, staggered fades/slides on content).

**Architecture:** Three layers — (1) video asset and CSS animations, (2) reusable hooks and utilities for IntersectionObserver and parallax, (3) updated components that use data attributes to opt into animations. All animations respect `prefers-reduced-motion` and are triggered once when scrolled into view.

**Tech Stack:** Next.js 15 (App Router), React Server Components, Tailwind v4, IntersectionObserver API, CSS animations, requestAnimationFrame for parallax.

---

## File Structure

**New Files:**
- `public/videos/weightlifting.mp4` — move from `Website Photos & Videos/`
- `components/public/HeroVideo.tsx` — replaces slider, replaces Hero.tsx
- `components/AnimationWrapper.tsx` — IntersectionObserver wrapper component
- `components/ParallaxScroll.tsx` — parallax scroll effect hook
- `lib/animations.ts` — animation utilities, stagger calculations, constants

**Modified Files:**
- `app/(public)/page.tsx` — import HeroVideo instead of Hero, wrap sections with AnimationWrapper
- `components/public/WhyChooseUs.tsx` — add data-animate attributes
- `components/public/ClassCard.tsx` — add data-animate to card
- `components/public/PhotoMosaic.tsx` — add data-animate to container
- `components/public/TrainerCard.tsx` — add data-animate to card
- `components/public/RegistrationCTA.tsx` — add data-animate for slide-up
- `components/public/PricingCard.tsx` — add data-animate to card
- `globals.css` — add keyframes, animation styles, data-animate selectors, prefers-reduced-motion overrides

**Deleted/Replaced:**
- `components/public/Hero.tsx` — no longer needed (replaced by HeroVideo)

---

## Task Breakdown

### Task 1: Prepare video asset

**Files:**
- `public/videos/weightlifting.mp4` (create)

- [ ] **Step 1: Verify video exists at source**

```bash
ls -lh "/Users/jasonobrien/Documents/repz-gym/Website Photos & Videos/Weightlifting.mp4"
```

Expected: File exists, ~2.9MB

- [ ] **Step 2: Create videos directory**

```bash
mkdir -p public/videos
```

- [ ] **Step 3: Copy video to public/**

```bash
cp "/Users/jasonobrien/Documents/repz-gym/Website Photos & Videos/Weightlifting.mp4" public/videos/weightlifting.mp4
```

- [ ] **Step 4: Verify copy**

```bash
ls -lh public/videos/weightlifting.mp4
```

Expected: File present, same size as original

- [ ] **Step 5: Commit**

```bash
git add public/videos/weightlifting.mp4
git commit -m "chore: add weightlifting video asset"
```

---

### Task 2: Create animation utilities and constants

**Files:**
- Create: `lib/animations.ts`

- [ ] **Step 1: Write animations.ts with utilities**

```typescript
// lib/animations.ts

/**
 * Calculate stagger delay for nth item in a series.
 * Used for cascading animations on cards, icons, etc.
 */
export const getStaggerDelay = (index: number, baseDelayMs: number = 80): number => {
  return baseDelayMs * index;
};

/**
 * Animation configuration constants matching design spec.
 */
export const ANIMATION_CONFIG = {
  duration: 400, // milliseconds
  easing: 'ease-out',
  staggerGap: 80, // milliseconds between items
  parallaxSpeed: 0.4, // 40% of scroll speed
  slideDistance: 16, // pixels for slide-up animations
};

/**
 * Get CSS animation-delay value for an element.
 * Usage: <div style={{ animationDelay: getAnimationDelay(2) }}>
 */
export const getAnimationDelay = (index: number): string => {
  const delayMs = getStaggerDelay(index, ANIMATION_CONFIG.staggerGap);
  return `${delayMs}ms`;
};

/**
 * Check if user prefers reduced motion.
 * Used by JS scroll effects to disable expensive animations.
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
```

- [ ] **Step 2: Verify file created and imports work**

```bash
cat lib/animations.ts | head -5
```

Expected: File contains utilities

- [ ] **Step 3: Commit**

```bash
git add lib/animations.ts
git commit -m "feat: add animation utilities and constants"
```

---

### Task 3: Create CSS keyframes and animation styles in globals.css

**Files:**
- Modify: `globals.css`

Append to end of `globals.css`:

```css
/* ====================================
   ANIMATIONS & SCROLL EFFECTS
   ==================================== */

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Section background alternation */
[data-bg="dark"] {
  background-color: rgb(var(--bg) / 1);
}

[data-bg="light"] {
  background-color: rgb(var(--surface) / 1);
}

/* Animation triggers via data-animate attribute */
[data-animate="fade-in"] {
  opacity: 0;
  animation: fade-in 400ms ease-out forwards;
}

[data-animate="slide-up"] {
  opacity: 0;
  animation: slide-up 400ms ease-out forwards;
}

/* Stagger delays */
[data-index="0"] { animation-delay: 0ms; }
[data-index="1"] { animation-delay: 80ms; }
[data-index="2"] { animation-delay: 160ms; }
[data-index="3"] { animation-delay: 240ms; }
[data-index="4"] { animation-delay: 320ms; }
[data-index="5"] { animation-delay: 400ms; }

/* Parallax element styling */
[data-parallax] {
  will-change: transform;
}

/* ====================================
   REDUCED MOTION OVERRIDES
   ==================================== */

@media (prefers-reduced-motion: reduce) {
  [data-parallax] {
    transform: none !important;
    will-change: auto !important;
  }

  [data-animate="fade-in"],
  [data-animate="slide-up"] {
    animation: fade-in 400ms ease-out forwards !important;
    animation-delay: 0 !important;
  }
}
```

- [ ] **Step 1: Append CSS to globals.css**

Use Edit tool or Write tool to append

- [ ] **Step 2: Verify CSS syntax**

```bash
tail -30 globals.css
```

Expected: Shows new keyframes and selectors

- [ ] **Step 3: Commit**

```bash
git add globals.css
git commit -m "feat: add animation keyframes and section background styles"
```

---

### Task 4: Create AnimationWrapper component

**Files:**
- Create: `components/AnimationWrapper.tsx`

Complete code:

```typescript
'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface AnimationWrapperProps {
  children: ReactNode;
  animationType: 'fade-in' | 'slide-up';
  threshold?: number;
  className?: string;
  index?: number;
}

export function AnimationWrapper({
  children,
  animationType,
  threshold = 0.25,
  className = '',
  index,
}: AnimationWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.setAttribute('data-animate', animationType);
          if (index !== undefined) {
            element.setAttribute('data-index', String(index));
          }
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [animationType, threshold, index]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 1: Create file with code above**

- [ ] **Step 2: Verify syntax**

```bash
head -20 components/AnimationWrapper.tsx
```

- [ ] **Step 3: Commit**

```bash
git add components/AnimationWrapper.tsx
git commit -m "feat: add AnimationWrapper component"
```

---

### Task 5: Create ParallaxScroll hook

**Files:**
- Create: `components/ParallaxScroll.tsx`

Complete code:

```typescript
'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/animations';

interface UseParallaxProps {
  speed?: number;
}

export function useParallax({ speed = 0.4 }: UseParallaxProps = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = scrollY * speed;
      element.style.transform = `translateY(${offset}px)`;
    };

    let rafId: number;
    const scheduleScroll = () => {
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', scheduleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', scheduleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return ref;
}

interface ParallaxScrollProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxScroll({
  children,
  speed = 0.4,
  className = '',
}: ParallaxScrollProps) {
  const ref = useParallax({ speed });

  return (
    <div ref={ref} className={className} data-parallax>
      {children}
    </div>
  );
}
```

- [ ] **Step 1: Create file with code above**

- [ ] **Step 2: Verify syntax**

```bash
grep -n "useParallax\|ParallaxScroll" components/ParallaxScroll.tsx
```

- [ ] **Step 3: Commit**

```bash
git add components/ParallaxScroll.tsx
git commit -m "feat: add ParallaxScroll hook and component"
```

---

### Task 6: Create HeroVideo component

**Files:**
- Create: `components/public/HeroVideo.tsx`

Complete code:

```typescript
'use client';

import { Button } from '@/components/ui/Button';
import { ParallaxScroll } from '@/components/ParallaxScroll';
import Link from 'next/link';

export function HeroVideo() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background with parallax */}
      <ParallaxScroll speed={0.4} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/weightlifting.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </ParallaxScroll>

      {/* Dark overlay (25% opacity) */}
      <div className="absolute inset-0 bg-black opacity-25" />

      {/* Gradient overlay on right side for text legibility */}
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-r from-transparent to-black opacity-40" />

      {/* Content overlay */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-right">
        <div>
          {/* Eyebrow */}
          <div className="text-sm font-display tracking-eyebrow text-brand uppercase mb-4">
            Shape Your Body
          </div>

          {/* Headline */}
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-tight text-white uppercase font-black mb-6">
            Be <span className="text-brand">Strong</span>. Train Hard.
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-end">
            <Button asChild size="lg" variant="primary">
              <Link href="/pricing">Get Info</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/classes">See the Schedule</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Google review strip below hero */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-center py-4">
        <p className="text-white text-sm font-sans">
          ★ 4.8 · 107+ Google reviews · Locally Owned · Open 24/7 for Members
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 1: Create file with code above**

- [ ] **Step 2: Verify syntax**

```bash
head -20 components/public/HeroVideo.tsx
```

- [ ] **Step 3: Commit**

```bash
git add components/public/HeroVideo.tsx
git commit -m "feat: create HeroVideo component with parallax"
```

---

### Task 7: Update home page with HeroVideo and section data-bg attributes

**Files:**
- Modify: `app/(public)/page.tsx`
- Modify: section components with data-bg attributes

- [ ] **Step 1: Update imports in app/(public)/page.tsx**

Replace `import { Hero }` with `import { HeroVideo }`

- [ ] **Step 2: Replace `<Hero />` with `<HeroVideo />`**

- [ ] **Step 3: Add data-bg attributes to section wrappers**

WhyChooseUs: `<section data-bg="dark" ...>`
ClassGrid: `<section data-bg="light" ...>`
PhotoMosaic: `<section data-bg="dark" ...>`
TeamRow: `<section data-bg="light" ...>`
RegistrationCTA: `<section data-bg="dark" ...>`
PricingPreview: `<section data-bg="light" ...>`

- [ ] **Step 4: Commit**

```bash
git add app/\(public\)/page.tsx components/public/*.tsx
git commit -m "feat: update home page with HeroVideo and section backgrounds"
```

---

### Task 8–14: Add animations to each section

Tasks 8–14 follow the same pattern: wrap section headlines/cards with AnimationWrapper, add data-index for staggered items.

**Task 8: WhyChooseUs (fade-in on headline + icons)**
**Task 9: ClassGrid (staggered slide-up on cards)**
**Task 10: PhotoMosaic (fade-in all together)**
**Task 11: TeamRow (staggered slide-up on trainer cards)**
**Task 12: RegistrationCTA (slide-up on banner)**
**Task 13: PricingPreview (staggered slide-up on cards)**
**Task 14: ContactStrip (fade-in)**

Each task:
- Add `'use client'` and import AnimationWrapper
- Wrap elements with `<AnimationWrapper animationType="..." index={...}>`
- Commit

---

### Task 15: Delete old Hero.tsx

- [ ] **Step 1: Verify no imports remain**

```bash
grep -r "import.*Hero[^V]" components/ app/
```

Expected: No results

- [ ] **Step 2: Delete Hero.tsx**

```bash
rm components/public/Hero.tsx
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old Hero.tsx"
```

---

### Task 16: Test animations locally

- [ ] **Step 1: Start dev server**

```bash
pnpm dev
```

- [ ] **Step 2: Test hero video parallax**
- [ ] **Step 3: Test section background alternation**
- [ ] **Step 4: Test fade-in animations**
- [ ] **Step 5: Test staggered slide-up animations**
- [ ] **Step 6: Test prefers-reduced-motion**
- [ ] **Step 7: Test on mobile (DevTools)**

---

### Task 17: Lighthouse performance check

- [ ] **Step 1: Run Lighthouse**

Expected: Performance ≥90, Accessibility ≥95

- [ ] **Step 2: Fix any CLS issues if present**

---

### Task 18: Final commit

All changes committed per task. Final status check.

---

## Success Criteria

✅ Video hero replaces slider
✅ Alternating section backgrounds
✅ Hybrid animations (bold on hero + registration, subtle elsewhere)
✅ Parallax at 40% scroll speed
✅ Staggered animations with 80ms gaps
✅ All animations respect prefers-reduced-motion
✅ No layout shifts, Lighthouse >90