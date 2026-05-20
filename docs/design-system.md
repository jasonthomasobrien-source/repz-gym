# Design System

A black-and-orange, gym-poster aesthetic. Heavy, condensed, all-caps display type. Dark, high-contrast action photography. Sharp orange CTAs that pop off a near-black background.

**Reference:** the GymLife / "BE STRONG TRAINING HARD" template look — gritty, no-nonsense, training-focused. Picture a hand-painted boxing gym sign, not an Instagram fitness influencer.

**Not:** soft, warm, community-pastel, REI-catalog, Equinox-chrome.

---

## Voice and tone

Bold, declarative, slogan-energy. Short sentences. Verbs in the imperative. The headlines are the kind of thing you'd paint on a brick wall.

- **Slogan voice for headlines.** "BE STRONG. TRAIN HARD." "PUSH YOUR LIMITS." "NO EXCUSES."
- **All-caps for display copy.** Section titles, hero, CTAs.
- **Sentence case for body copy.** All-caps for paragraphs is illegible; we only shout in headlines.
- **First person plural for ownership.** "We're open at 5am." Not "The facility opens at 5am."
- **Lean on the location.** Plainwell. Allegan County. West Michigan. The owner's name when we have it.

A few phrases that fit the brand:

> "BE STRONG. TRAIN HARD."
> "PUSH YOUR LIMITS FORWARD."
> "PLAINWELL'S GYM."
> "NO GLAMOUR. JUST A GREAT WORKOUT."
> "WALK IN. SIGN IN. GET TO WORK."

We can lift "no glamour, just a great workout" straight from the Google reviews — it's the gym's own line.

---

## Color palette

Near-black background, sharp orange primary, deep ember red for accents and dividers. Everything else is grayscale on the way down.

| Token            | Hex      | Use                                          |
| ---------------- | -------- | -------------------------------------------- |
| `--bg`           | `#0A0A0A`| Page background — near-black                 |
| `--surface`      | `#141414`| Cards, elevated panels                       |
| `--surface-2`    | `#1F1F1F`| Hover / nested surfaces                      |
| `--ink`          | `#FFFFFF`| Primary text on dark                         |
| `--ink-muted`    | `#A8A8A8`| Secondary text                               |
| `--ink-subtle`   | `#6F6F6F`| Captions, disabled                           |
| `--brand`        | `#F26522`| Repz orange — primary CTA, accents           |
| `--brand-hot`    | `#D34E0F`| Hover / pressed state on brand               |
| `--ember`        | `#8C1F0E`| Deep red — section dividers, secondary chip  |
| `--success`      | `#3DBA6B`| Paid, active                                 |
| `--danger`       | `#E84A4A`| Failed, past due                             |
| `--warning`      | `#E8B53A`| Attention                                    |
| `--line`         | `#262626`| Borders, hairlines                           |

For light surfaces on the admin (some tables read better on a light card against the dark shell):

| Token         | Hex      | Use                       |
| ------------- | -------- | ------------------------- |
| `--paper`     | `#F5F1EA`| Card backgrounds on light |
| `--paper-2`   | `#E9E2D5`| Hover                     |
| `--paper-ink` | `#141414`| Text on paper             |

Contrast: every text-on-background pair clears WCAG AA. Pure white on `--bg` is the default; reserve `--ink-subtle` for things that should fade back.

**Use orange sparingly.** It's the loudest element on the page. One primary CTA per viewport. Headlines can use orange to emphasize a single word (e.g. "BE **STRONG** TRAIN HARD"), but never the whole line.

---

## Typography

Two-family system. Heavy condensed display face for everything that shouts. Clean humanist sans for body.

- **Display:** `Oswald` (700–800) — condensed, slightly squared, gym-poster energy. Used for hero headlines, section titles, CTAs, pricing. **Always uppercase.** Letter-spacing +1 to +2 % depending on size.
- Acceptable alternates if Oswald is missing: `Bebas Neue`, `Anton`, `Teko`.
- **Body & UI:** `Inter` (400 / 500 / 600). Sentence case. Used for paragraphs, form labels, table cells.
- **Numeric:** Inter's tabular-nums variant for tables and money. `font-feature-settings: "tnum"`.

Scale (Tailwind classes):

| Token        | Size / line-height | Use                                          |
| ------------ | ------------------ | -------------------------------------------- |
| `display-xl` | 96 / 92            | Hero headline (desktop). All caps, Oswald 800|
| `display-lg` | 64 / 64            | Hero (mobile), top of major sections         |
| `display-md` | 48 / 52            | Section titles ("OUR CLASSES")               |
| `display-sm` | 32 / 36            | Sub-section / pricing                        |
| `eyebrow`    | 14 / 20            | Orange small-caps label above a title (e.g. "WHY CHOOSE US"). Letter-spacing +12% |
| `h1`         | 28 / 36            | Page titles in admin / sub-pages             |
| `h2`         | 22 / 30            | Cards titles                                 |
| `h3`         | 18 / 26            | Smaller card titles                          |
| `body-lg`    | 18 / 28            | Lead paragraphs                              |
| `body`       | 16 / 26            | Default body                                 |
| `body-sm`    | 14 / 22            | Captions, meta                               |
| `mono`       | 14 / 20            | IDs, timestamps in admin                     |

The **eyebrow** treatment is core to this style: small orange uppercase label sitting above almost every display headline. Always centered with the headline on marketing pages.

---

## Layout patterns

The template the design references uses a strong repeating rhythm. Bake these in:

- **Section eyebrow + title**, every section. Eyebrow = orange small-caps; title = display-md all-caps white. Always center-aligned on the public site; left-aligned in the admin.
- **Full-bleed dark panels with a faded photo background** for the hero and the registration CTA section. Photo at ~25% opacity behind text. Always a black-to-transparent gradient on the right or bottom so text stays legible.
- **Tight card grid for classes** (4 cards desktop, 2 mobile). Card = photo with a dark gradient overlay; category eyebrow + class name pinned to the bottom-left.
- **Two-tone pricing cards** — dark surface, orange price line, white plan name, body-sm features list, full-width orange CTA at the bottom.
- **Full-bleed photo mosaic** band between sections (5–6 images, varied sizes) — this is the "Train With Experts" / community proof.

---

## Spacing & radii

- 4 px base grid. Use Tailwind's default scale.
- Section vertical padding on marketing: **120 px desktop / 72 px mobile.** Sections are big and breathy — the template uses lots of vertical space between dense bands.
- Card padding: 28 px desktop / 20 px mobile.
- Radii are tight — this is a poster, not a SaaS app:
  - Buttons, pills: `--radius-sm` = **4 px**
  - Cards: `--radius-md` = **6 px**
  - Hero panels: `--radius-lg` = **8 px**
  - Avatars: full-round

---

## Buttons

Three sizes (`sm` / `md` / `lg`) × four variants.

| Variant      | Background       | Text            | Border         | Use                                     |
| ------------ | ---------------- | --------------- | -------------- | --------------------------------------- |
| `primary`    | `--brand`        | white           | none           | Hero CTA, "GET INFO", "JOIN NOW"        |
| `secondary`  | transparent      | white           | 1.5 px white   | "SEE THE SCHEDULE", outline on hero     |
| `ghost`      | transparent      | `--ink-muted`   | none           | Tertiary actions, nav links             |
| `danger`     | `--danger`       | white           | none           | Destructive admin actions               |

All buttons:
- **Uppercase, Oswald 600**, letter-spacing +6%
- 14 px font size at `md`, 16 px at `lg`, 12 px at `sm`
- No rounded pill shapes — flat slabs with 4 px radius
- Hover: brand-hot fill or subtle white-bg-tint on outlines, no scale animation

---

## Photography & imagery

**Dark, high-contrast, mid-rep.** Not posed. Faces grimacing, mid-set, sweating. The template uses lots of low-key lighting where the subject is half in shadow — that's the look.

- **Hero shots:** subject on the left third, dark void on the right where headline goes. Or the reverse. Either way: high contrast, shadow detail intact.
- **Class cards:** action shots that match the class — barbell for weightlifting, bag work for boxing, etc. Square or 4:5 aspect.
- **Photo mosaic band:** mix of training shots — back squat, sled push, pull-up, rope work, partner stretch, locker-room candids.
- **Trainer headshots:** 4:5 portraits, dark background, no smiles required.

Until the owner provides real photos, use:
- The Google listing photos of the actual gym floor (drop them in `/public/photos/placeholders/`)
- High-quality royalty-free fitness photography (Pexels, Unsplash) for placeholders **with a `// TODO: replace with real Repz photo` comment** at every usage
- For trainer headshots: an Oswald-bold initials avatar on a charcoal background until real photos arrive

Treatment:
- Light film grain overlay (`opacity-10` to `opacity-15` PNG) on all hero and full-bleed images. The template has a subtle grit to it.
- Heavy bottom-of-image gradient (`from-bg via-bg/40 to-transparent`) over any image with text on top.
- Optional: subtle desaturation (`saturate-90`) for an "old gym poster" feel.

**Do not** use:
- Brightly lit, smiling stock fitness models
- Anything pastel, anything Peloton, anything boutique
- AI-generated humans
- Watermarked stock photos

---

## Components

Build these once in `components/ui/` and reuse. Each is keyboard-navigable and screen-reader friendly.

| Component       | Variants                                  | Notes                                                |
| --------------- | ----------------------------------------- | ---------------------------------------------------- |
| `Button`        | `primary` `secondary` `ghost` `danger`    | All sizes. See above.                                |
| `Card`          | `dark` `paper`                            | 6 px radius, 1 px line border                        |
| `Pill` / `Badge`| `neutral` `success` `warning` `danger`    | Status indicators                                    |
| `Eyebrow`       | only one variant                          | Small orange uppercase label                         |
| `SectionTitle`  | `center` `left`                           | Eyebrow + display-md headline pair                   |
| `Input` / `Textarea` | with `Label`, `HelpText`, `Error`    | RHF-friendly. White text on dark surface.            |
| `Select`        |                                           | Native on mobile, custom on desktop                  |
| `Table`         | sortable, sticky header                   | Admin tables                                         |
| `Tabs`          |                                           | Admin sections                                       |
| `SlideOver`     | right side, full-height                   | Add/edit member etc.                                 |
| `Dialog`        | modal                                     | Confirm cancel etc.                                  |
| `Toast`         | success / error                           | Form feedback                                        |
| `EmptyState`    | icon + title + body + optional CTA        | Required for every list                              |
| `Hero`          | photo background, headline, ctas, slider  | Home page                                            |
| `FeatureRow`    | 4 icons + titles                          | "WHY CHOOSE US" band                                 |
| `ClassCard`     | photo + eyebrow category + name           | "OUR CLASSES" grid                                   |
| `PricingCard`   | 3 variants on /pricing, also reused 1-up  | Dark surface, big orange price, feature list, CTA   |
| `CtaBanner`     | full-bleed dark + photo + center CTA      | "REGISTRATION NOW TO GET MORE DEALS"                 |
| `PhotoMosaic`   | varied-size grid of 5–6 images            | "Train with experts" band                            |
| `TrainerCard`   | 4:5 photo + name + tagline                | Trainers row                                         |
| `ContactStrip`  | 3 icons: address, phone, email            | Footer-adjacent strip from the template              |
| `LocationBlock` | map + address/phone/hours                 | Contact page                                         |
| `StatCard`      | big number + trend                        | Admin overview                                       |
| `RevenueChart`  | recharts wrapper                          | Admin revenue                                        |

---

## Motion

Energetic but never bouncy. We're a gym, not a kids' app.

- Hover on buttons: 120 ms ease-out, fill darkens to `--brand-hot`. No scale.
- Card hover on class/trainer cards: 200 ms, image scales to 1.04, overlay deepens slightly. Pointer becomes a pointer.
- Hero slider (if used): 600 ms crossfade, 6 s per slide, pause on hover, respects `prefers-reduced-motion`.
- Section reveals on scroll: opacity 0→1 + 16 px Y-translate, 400 ms ease-out, IntersectionObserver-triggered once.
- Reduced motion: disable scroll reveals, slider, and image hover-scale. Keep opacity transitions.

---

## Tailwind config snippet

```ts
// tailwind.config.ts
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.ts"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-muted": "rgb(var(--ink-muted) / <alpha-value>)",
        "ink-subtle": "rgb(var(--ink-subtle) / <alpha-value>)",
        brand: "rgb(var(--brand) / <alpha-value>)",
        "brand-hot": "rgb(var(--brand-hot) / <alpha-value>)",
        ember: "rgb(var(--ember) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
      },
      fontFamily: {
        display: ["Oswald", "Bebas Neue", "Anton", "ui-sans-serif", "system-ui"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      letterSpacing: {
        display: "0.02em",
        eyebrow: "0.12em",
        button: "0.06em",
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
      },
    },
  },
};
```

Load fonts in `app/layout.tsx` via `next/font/google` for both Oswald and Inter. Self-host — don't ship `<link>` tags.

`globals.css` defines the `--bg`, `--surface`, etc. tokens as space-separated RGB triples (e.g. `--bg: 10 10 10;`) so the `<alpha-value>` syntax works.

---

## Do / don't quick reference

**Do**
- Use uppercase for everything in the display family.
- Pair an orange eyebrow with every display headline.
- Lean hard into one big primary orange CTA per screen.
- Show heavy weights and real intensity in photos.
- Format phone as `(269) 685-1493` and make it a `tel:` link.
- Let the dark surfaces breathe — generous vertical padding on every section.

**Don't**
- Use pastels, gradients, glassmorphism, or neon.
- Center body copy (centered body copy is hard to read). Center display only.
- Stack three orange buttons on top of each other — pick the most important one.
- Show fake testimonials. Lift real Google review quotes verbatim.
- Hide the price behind a "request more info" form.
