# Video Hero + Alternating Sections + Scroll Animations Design

**Date:** 2026-05-20  
**Scope:** Home page visual redesign — video hero, alternating section backgrounds, scroll-triggered animations  
**Status:** Approved

---

## Overview

Replace the 3-slide hero carousel with a full-bleed weightlifting video background. Introduce subtle alternating section backgrounds for visual separation. Layer in scroll-triggered animations using a hybrid approach: bold animations on key moments (hero parallax, registration CTA), subtle fades and slides elsewhere.

**Goal:** Increase visual energy and depth without overwhelming the content or breaking the gritty gym aesthetic.

---

## 1. Hero Section

### Current State
- 3-slide carousel (Oswald headline + eyebrow, dark gradient overlay, action photos)
- Auto-advances every 6s, pause on hover
- CTAs: "GET INFO" → `/pricing`, "SEE THE SCHEDULE" → `/classes`
- Google review strip below: `★ 4.8 · 107+ reviews · LOCALLY OWNED · OPEN 24/7`

### Proposed Change
- **Replace carousel with single video background:** Weightlifting.mp4 (2.9MB, ~10-15 sec duration recommended or looped)
- **Video treatment:** Full-bleed, muted, auto-play, looped, `playsinline` for mobile
- **Overlay:** 25% opacity dark overlay (`rgba(10, 10, 10, 0.75)`), gradient fade on right side (transparent right edge for text legibility)
- **Headline & CTAs:** Center-right overlay, same eyebrow + display headline structure as before
  - Eyebrow: "SHAPE YOUR BODY"
  - Headline: "BE **STRONG**. TRAIN HARD."
  - Primary CTA: "GET INFO" → `/pricing`
  - Secondary CTA (outline): "SEE THE SCHEDULE" → `/classes`
- **Review strip:** Unchanged, below video

### Animation
- **Video parallax:** 40% of scroll speed (moves slower than user scroll, creating depth)
- **Headline + CTAs:** Fade in on page load (opacity 0→1, 600ms ease-out)
- **Controls:** No play/pause controls visible (autoplay muted video); consider adding mute toggle or info icon if needed

### Accessibility
- Alt text for video: "Weightlifter performing a barbell lift"
- Captions (optional): Consider a brief overlay text or transcript for context
- `prefers-reduced-motion`: Disable parallax, keep fade-in as subtle opacity change only

---

## 2. Alternating Section Backgrounds

### Current State
All sections use `--bg` (#0a0a0a).

### Proposed Pattern
Alternate between dark and light backgrounds to create visual rhythm:

| Section | Background | Notes |
|---------|------------|-------|
| Hero | `--bg` (#0a0a0a) | Dark, video background |
| Why Choose Us | `--bg` | Dark |
| Our Classes | `--surface` (#141414) | Light (subtle contrast) |
| Photo Mosaic | `--bg` | Dark |
| Our Team | `--surface` | Light |
| Registration CTA | `--bg` | Dark |
| Pricing Preview | `--surface` | Light |
| Contact Strip | `--surface` | Light (existing admin-style) |

### Visual Effect
- Sections slightly lift as background lightens
- Content on `--surface` sections gets subtle `--line` (#262626) border top/bottom for definition
- Maintains dark, gritty aesthetic while providing breathing room
- No color shift—all backgrounds remain in the dark/grayscale family

### Implementation
- Wrap each section in a `<section>` with `data-bg="dark"` or `data-bg="light"`
- Use CSS custom properties: `background-color: var(--section-bg)`
- Set `--section-bg` via data attribute: `[data-bg="dark"] { --section-bg: var(--bg); }` etc.

---

## 3. Scroll-Triggered Animations

### Animation Philosophy
**Hybrid approach:** Bold animations on high-impact moments (hero, conversion CTA), subtle everywhere else. All animations are entrance-only (triggered when scrolled into view), not continuous or exit-based. All respect `prefers-reduced-motion`.

### By Section

#### **Hero Video** (Bold)
- **Parallax:** Video background moves at 40% of user scroll speed
- **Implementation:** JS scroll listener or CSS `background-attachment: fixed` (with mobile fallback)
- **Timing:** Continuous during scroll (not triggered, always active)
- **Reduced motion:** Disable parallax, video stays static

#### **Why Choose Us**
- **Headline:** Fade in (opacity 0→1, 400ms ease-out) when section scrolls into view
- **Icons:** Fade in, staggered 80ms apart (first icon starts at 400ms, second at 480ms, etc.)
- **Reduced motion:** All elements fade in at the same time, no stagger

#### **Our Classes**
- **Headline:** Fade in (opacity 0→1, 400ms ease-out)
- **Cards:** Fade in + slide up 16px, staggered 80ms apart
  - Card 1: starts at 400ms
  - Card 2: starts at 480ms
  - Card 3: starts at 560ms
  - Card 4: starts at 640ms
- **Existing hover:** Card image scales 1.04 on hover (unchanged)
- **Reduced motion:** All cards fade in at once, no slide, no stagger

#### **Photo Mosaic**
- **Animation:** Fade in (opacity 0→1, 400ms ease-out), all images together
- **No parallax on mosaic images** (keep it subtle)
- **Reduced motion:** Already subtle, no change

#### **Our Team**
- **Headline:** Fade in (opacity 0→1, 400ms ease-out)
- **Trainer cards:** Fade in + slide up 16px, staggered 80ms apart
- **Existing hover:** Overlay deepens + "VIEW BIO" link reveals (unchanged)
- **Reduced motion:** All cards fade in at once, no slide, no stagger

#### **Registration CTA** (Bold)
- **Banner slides up:** 20px slide-up + fade in (opacity 0→1, 400ms ease-out) when scrolled into view
- **Headline & subheading:** Already included in banner animation
- **CTA button:** Inherits fade-in from banner, then standard button hover effects apply
- **Reduced motion:** Fade in only, no slide

#### **Pricing Preview**
- **Headline:** Fade in (opacity 0→1, 400ms ease-out)
- **Cards:** Fade in + slide up 16px, staggered 80ms apart
- **Reduced motion:** All cards fade in at once, no slide

#### **Contact Strip**
- **Fade in:** Opacity 0→1, 400ms ease-out (subtle)

### Animation Triggers
- Use **IntersectionObserver** to detect when a section enters the viewport
- Trigger animations once (not repeatedly on scroll up/down)
- Fire animation when top 25% of section is visible

### Timing & Easing
- **Fade-in duration:** 400ms
- **Slide distance:** 16px (Y-axis only)
- **Easing:** `ease-out` (decelerating curve, feels snappy)
- **Stagger:** 80ms between items (smooth cascade, not overwhelming)
- **Parallax speed:** 40% of scroll (noticeable but not jarring)

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  /* Disable parallax */
  [data-parallax] {
    background-attachment: scroll;
  }
  
  /* Disable slides, keep fades only */
  [data-animate="slide-up"] {
    animation: fade-in 400ms ease-out forwards !important;
  }
  
  /* Remove stagger */
  [data-animate] {
    animation-delay: 0 !important;
  }
}
```

---

## 4. Implementation Notes

### Video Asset
- **File:** `Website Photos & Videos/Weightlifting.mp4` (2.9MB)
- **Placement:** Move to `public/videos/weightlifting.mp4` for serving
- **Duration:** Ensure loop is seamless (~8-12s recommended)
- **Format:** H.264 MP4 for broad browser support
- **Mobile:** Use `playsinline` attribute so video plays inline on iOS instead of fullscreen

### Code Structure
```
app/(public)/page.tsx
├── components/
│   ├── public/
│   │   ├── HeroVideo.tsx (replaces Hero.tsx)
│   │   ├── WhyChooseUs.tsx (updated with animations)
│   │   ├── ClassGrid.tsx (updated with staggered animation)
│   │   ├── PhotoMosaic.tsx (updated with fade)
│   │   ├── TeamRow.tsx (updated with staggered animation)
│   │   ├── RegistrationCTA.tsx (updated with slide-up animation)
│   │   └── PricingPreview.tsx (updated with staggered animation)
│   ├── AnimationWrapper.tsx (new: IntersectionObserver logic)
│   └── ParallaxScroll.tsx (new: parallax calculation)
└── lib/
    └── animations.ts (new: keyframes, stagger utilities)
```

### CSS Animations
```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
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
```

Animations applied via `[data-animate="fade-in"]`, `[data-animate="slide-up"]`, etc.

### Parallax Implementation
Two options:
1. **CSS `background-attachment: fixed`** — simpler, but janky on mobile
2. **JS scroll listener with `transform: translateY()`** — smoother, requires JS

Recommend option 2 for production. Use `window.requestAnimationFrame()` to avoid layout thrashing.

### Testing Checklist
- [ ] Video plays muted, auto-loops seamlessly on all browsers
- [ ] Parallax smooth at 60fps (use DevTools Performance tab)
- [ ] Animations trigger once when scrolled into view
- [ ] Stagger timing feels natural (80ms intervals readable)
- [ ] `prefers-reduced-motion` disables animations correctly
- [ ] Mobile: video plays inline, no fullscreen interruption
- [ ] Mobile: animations run at 60fps (no jank)
- [ ] Lighthouse performance >90 (video optimization critical)

---

## 5. Design Decisions & Tradeoffs

| Decision | Rationale | Tradeoff |
|----------|-----------|----------|
| Video as hero | Immediate energy, real gym action | Less editorial control (video is continuous) |
| 40% parallax speed | Noticeable depth without disorientation | Adds complexity, needs JS |
| Subtle alternating backgrounds | Visual separation while keeping dark aesthetic | Minimal contrast (could go lighter if needed) |
| Hybrid animations | Bold on key moments, subtle elsewhere | More complex logic, more code |
| Stagger 80ms | Smooth cascade, readable as separate items | Longer animation total time (multi-card sections take 400ms + 320ms) |

---

## 6. Success Criteria

- ✓ Video hero loads without blocking page render
- ✓ Parallax effect smooth at 60fps on desktop and mobile
- ✓ All scroll animations trigger correctly on first scroll into view
- ✓ Lighthouse Performance score ≥90 (video optimization)
- ✓ No layout shift (CLS <0.1)
- ✓ Keyboard navigation and screen readers unaffected
- ✓ `prefers-reduced-motion` respected on all animations
- ✓ Video controls accessible (mute option or visual indicator)

---

## 7. Scope Boundaries (Not Included)

- No changes to other pages (Pricing, Classes, About, Contact)
- No changes to member portal or admin dashboard
- No changes to existing button or card hover states
- No new components beyond `AnimationWrapper` and `ParallaxScroll`
- No SEO/meta changes in this phase

---

## 8. Next Steps

1. Implement `HeroVideo` component (replaces slider)
2. Add `AnimationWrapper` hook for IntersectionObserver logic
3. Add `ParallaxScroll` for video parallax
4. Update each section component with `data-animate` attributes
5. Add CSS keyframes to `globals.css`
6. Test animations, parallax, and performance
7. Verify `prefers-reduced-motion` compliance
8. Optimize video asset for web (compression, format)