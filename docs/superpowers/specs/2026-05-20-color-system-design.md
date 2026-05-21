# Repz Gym Color System Design
**Date:** May 20, 2026  
**Status:** Design Specification  
**Author:** Claude Code

## Overview

Repz Gym adopts an energetic three-color system to establish visual hierarchy and guide user attention across the site. The palette—Black, Teal, and Orange—creates high contrast while maintaining the gym's no-nonsense brand voice.

**Design Goal:** Integrate color tastefully across all pages and the admin dashboard without overwhelming the minimalist design.

**Scope:** Applies to homepage, all subpages (Classes, Pricing, About, Contact, Signup), and admin dashboard.

---

## Color Palette

| Color | Hex | Purpose | Usage |
|-------|-----|---------|-------|
| **Black** | `#0a0a0a` | Background, primary text | Page backgrounds, deep surfaces |
| **Teal** | `#20b2aa` | Secondary accent, hover states | Navigation, underlines, secondary buttons, focus states |
| **Orange** | `#f26522` | Primary accent, warm energy | Logo (REPZ), primary buttons, key CTAs, featured badges |

---

## Design Tokens

### CSS Custom Properties

Define these in `app/globals.css` or Tailwind config:

```css
:root {
  --color-primary: #f26522;      /* Orange */
  --color-secondary: #20b2aa;    /* Teal */
  --color-bg: #0a0a0a;           /* Black */
  
  --color-primary-dark: #d94816; /* Orange darkened for hover */
  --color-secondary-light: #28ccc0; /* Teal lightened for hover */
}
```

### Tailwind Integration

Extend Tailwind config to include custom colors:
```js
colors: {
  brand: '#f26522',        // Orange
  'brand-alt': '#20b2aa',  // Teal
  'brand-hot': '#d94816',  // Orange dark (hover)
}
```

---

## Component Integration

### Typography & Headers

- **Eyebrow labels** (e.g., "SHAPE YOUR BODY", "WHY CHOOSE US"): Teal uppercase text, letter-spaced
- **Section titles**: White text with 2–3px teal underline beneath
- **Hero headline accent**: "STRONG" and "TRAIN HARD" highlighted in teal within white headline

### Navigation

- **Header logo**: "Repz" in orange; full split logo shows "REPZ" (orange) + "GYM" (teal)
- **Nav links**: White by default, teal on hover and active state
- **Mobile menu toggle**: Orange background or border

### Buttons & CTAs

| Button Type | Background | Text | Border | Hover |
|-------------|-----------|------|--------|-------|
| Primary | Orange | Black | Orange | Orange dark (#d94816) |
| Secondary | Transparent | Teal | Teal border | Teal glow, light teal bg |
| Ghost | Transparent | Teal | None | Teal underline + orange accent below |

### Cards & Sections

- **Class cards**: 2–3px teal accent bar at top; teal "CLASS" label
- **Pricing cards**: "MOST POPULAR" badge in orange; alternate card has teal border accent
- **Trainer cards**: Small rotating teal/orange dot accent (alternates per card)
- **Feature list items**: Checkmark in teal; "✓" symbol before text

### Interactive States

- **Form inputs**: Teal border on focus (3–4px outline)
- **Checkboxes/radio buttons**: Teal checked state
- **Loading indicators**: Animated gradient orange → teal
- **Badges**: 
  - Status (active, featured): Teal background, white text
  - Alert or urgent: Orange background, white text
  - Secondary tag: Teal text on dark background

### Footer

- **Divider lines**: Teal borders between column sections
- **Link hover**: Teal color on Quick Links, Contact links, and social links
- **Emphasis text**: "Since 1998" or key info in subtle orange

### Admin Dashboard

- **Sidebar active state**: Left teal border (3–4px) on active nav item
- **Key metrics**: Orange text or orange accent bar above primary metrics
- **Secondary data**: Teal accent or border
- **Chart colors**: 
  - Primary series: Orange
  - Secondary series: Teal
  - Tertiary: Light gray
- **Action buttons**: Orange primary, teal secondary (matching main site)
- **Status indicators**: Green (success), Orange (warning), Red (error)

---

## Application Rules

### When to Use Orange
- Primary call-to-action buttons ("JOIN NOW", "BUY A DAY PASS")
- Logo text (REPZ in split logo)
- Featured or urgent highlights
- Primary metrics in admin dashboard
- Hover darkening for visual feedback

### When to Use Teal
- Navigation hover/active states
- Section title underlines
- Secondary buttons and links
- Form focus states
- Secondary metrics and data
- Accent bars on cards
- Icon accents
- Badge backgrounds for status/active states

### When to Use Black
- Page backgrounds
- Primary text
- Deep surfaces
- Borders and dividers (use dark gray `#333` for subtle separation)

---

## Layout Examples

### Hero Section
```
┌─────────────────────────────────────┐
│ SHAPE YOUR BODY (teal eyebrow)      │
│                                     │
│ BE STRONG. TRAIN HARD. (white with  │
│ STRONG in teal)                     │
│ ─────────────────────────────────── │ (teal underline)
│                                     │
│ [Orange Button] [Teal Button]       │
└─────────────────────────────────────┘
```

### Section Title with Underline
```
WHY CHOOSE US
──────────
(Teal 2–3px line extends full width or 60% width)
```

### Pricing Card (Featured)
```
┌───────────────────────────────────┐
│ ▓▓▓ (teal 3px top bar)            │
│ MOST POPULAR (orange label)       │
│ $30 / MONTH                       │
│ ✓ Full gym floor (teal checkmark) │
│ ✓ All group classes               │
│ ✓ 24/7 key-fob access             │
│ [Orange Button - Full Width]      │
└───────────────────────────────────┘
```

---

## Responsive & Accessibility

- **Color contrast**: Orange (#f26522) on black (#0a0a0a) passes WCAG AA
- **Teal on black**: (#20b2aa) on (#0a0a0a) passes WCAG AA
- **Text alternatives**: Do not rely on color alone to convey status; use icons, labels, or text
- **Hover/focus states**: Always provide visible focus indicators (outline or background shift)
- **Dark mode**: Color palette is dark-native; no light mode planned

---

## Implementation Notes

1. **Tailwind Configuration**: Add custom colors to `tailwind.config.ts` under the `extend.colors` section
2. **CSS Variables**: Define in `app/globals.css` for use in non-Tailwind contexts (animations, gradients)
3. **Component Defaults**: Update Button component to support `variant="primary" | "secondary" | "ghost"` with proper color mapping
4. **Consistency**: Use design tokens everywhere; avoid hardcoding hex values in components
5. **Testing**: Verify color contrast with WCAG tools; test all interactive states in Chrome, Firefox, Safari

---

## Files to Update

1. `tailwind.config.ts` — Add custom color tokens
2. `app/globals.css` — Add CSS custom properties
3. `components/ui/Button.tsx` — Ensure variant colors map correctly
4. `components/ui/SectionTitle.tsx` — Add teal underline styling
5. `components/layout/Header.tsx` — Update nav hover states to teal
6. `components/layout/Footer.tsx` — Add teal dividers and hover states
7. `app/page.tsx` — Add teal accents to hero and section titles
8. `app/classes/page.tsx` — Apply teal to card accents and labels
9. `app/pricing/page.tsx` — Apply orange to "MOST POPULAR", teal borders to secondary card
10. `admin/dashboard/page.tsx` — Apply admin-specific color scheme (when built)

---

## Success Criteria

- ✅ All pages use consistent color tokens (no hardcoded hex values)
- ✅ Eyebrow labels and section underlines are teal across all pages
- ✅ Primary buttons are orange, secondary buttons are teal
- ✅ Navigation links hover in teal
- ✅ Form focus states are teal
- ✅ Color integration feels tasteful (not overwhelming)
- ✅ WCAG AA contrast requirements met
- ✅ Admin dashboard color scheme supports at-a-glance data scanning
