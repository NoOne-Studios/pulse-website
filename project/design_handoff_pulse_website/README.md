# Handoff: Pulse marketing website (Phase 1 brochure site)

## Overview
Pulse is a home-care service operating in Adyar, Besant Nagar and Thiruvanmiyur (Chennai). This handoff covers the **Phase 1 brochure marketing site**: homepage, four service-line pages, a doctor-consultation page, for-professionals, for-hospitals, about, technology-and-trust, blog index + article, and a branching enquiry (contact) form. Every page ships in **English and Tamil**.

The site is a brochure/marketing site, not the product. There is no login, no booking engine, no payment. The single conversion is the enquiry form (and possibly a waitlist — see Open Decisions).

> **New project with no repo yet?** Read `START-HERE.md` in this folder first — it covers
> creating the repository, scaffolding the app, and the order to build in. This file is the
> design spec; that one is the running order.

## About the Design Files
The file in this bundle (\`Pulse Website.dc.html\`, plus the supporting brand files) is a **design reference created in HTML** — a prototype that shows intended look, copy, structure and behaviour. It is **not production code to lift**. It is a single design document containing many device frames side by side on a canvas, with commentary panels between them; it is not a routable site.

Your task is to **recreate these designs in the target codebase's environment**, using its established framework, component library and conventions. If no environment exists yet, choose an appropriate stack for a bilingual, content-light, SEO-relevant marketing site (Next.js App Router + a CSS solution of your choice is a reasonable default; the design has no client-state requirements beyond the form and a nav dropdown, so it should render as static/SSG pages).

**Do not copy the commentary panels, option comparisons, or frame labels** — those are review apparatus for the design conversation, not site content. Only the device frames are the site.

## Fidelity
**High-fidelity.** Colours, type sizes, line-heights, spacing, radii, motion durations and copy are all final-intent and are drawn from a locked design system (\`Pulse Foundations.dc.html\`, \`Pulse Identity Locked.dc.html\`, \`Pulse Components.dc.html\` in this bundle). Recreate pixel-faithfully, but express the values as your codebase's tokens rather than hard-coded literals.

Two caveats:
- **All Tamil copy is placeholder** at realistic length, pending native-speaker review. Do not ship it. Wire the strings through i18n and leave them replaceable.
- **All English copy is draft** (marked WEB-D16) and awaiting sign-off. Structure and length are load-bearing; wording is not final.

---

## Design Tokens

Copy these verbatim; they are the locked system. Colours are authored in \`oklch()\` — keep them in oklch if your stack allows, since the ramps were tuned in that space.

### Colour primitives
\`\`\`
--blue-50:  oklch(96% 0.018 255)
--blue-100: oklch(94% 0.030 255)
--blue-400: oklch(62% 0.140 255)
--blue-600: oklch(42% 0.130 255)   /* brand blue; print equivalent #1F5FBF */
--blue-700: oklch(36% 0.120 255)
--blue-800: oklch(30% 0.100 255)

--ink-0:   #ffffff
--ink-50:  oklch(96.5% 0.006 262)
--ink-100: oklch(93% 0.007 262)
--ink-200: oklch(91% 0.008 262)
--ink-300: oklch(85% 0.010 262)
--ink-400: oklch(72% 0.012 262)
--ink-500: oklch(58% 0.015 262)
--ink-600: oklch(45% 0.018 262)
--ink-800: oklch(31% 0.015 262)
--ink-900: oklch(20% 0.015 262)
--ink-950: oklch(17% 0.015 262)

--green-100: oklch(92% 0.05 152)   --green-700: oklch(31% 0.09 152)
--red-100:   oklch(92% 0.05 22)    --red-700:   oklch(35% 0.11 22)
\`\`\`

### Semantic aliases (use these in components, never the primitives)
\`\`\`
surface-base      = ink-0        surface-sunken   = ink-50
surface-selected  = blue-100     surface-brand    = blue-600
surface-inverse   = ink-950

text-primary   = ink-900   text-secondary = ink-600   text-tertiary = ink-500
text-brand     = blue-600  text-inverse   = ink-0     text-on-brand = ink-0

border-subtle = ink-200   border-default = ink-300   border-strong = ink-900
border-brand  = blue-600  border-focus   = oklch(52% 0.16 255)

action-primary = blue-600   action-primary-text = ink-0
verified-border / verified-text = ink-900
\`\`\`

Page background behind the frames in the design doc is \`oklch(94% 0.006 262)\` — that is the **canvas**, not the site. Site background is \`surface-base\` (white).

### Typography
- Latin: **Hind** — weights 400/500/600/700. \`"Hind", system-ui, sans-serif\`
- Tamil: **Hind Madurai** — weights 400/500/600/700. \`"Hind Madurai", "Noto Sans Tamil", sans-serif\`
- Both are OFL-licensed and cleared to self-host. **Self-host them** rather than using the Google Fonts CDN link in the prototype; subset Latin and Tamil separately.
- Tamil is selected by \`:lang(ta)\`, which also sets \`line-height: 1.75\`. Keep this mechanism — set \`lang\` on the \`<html>\` element per locale and let the rule do the work.

Type scale as used (px / line-height):

| Role | English | Tamil |
|---|---|---|
| Hero / page h1 | 32 / 1.15, weight 700, letter-spacing −0.01em | 30 / 1.30, weight 700, **no negative tracking** |
| Section h2 | 24 / 1.25, weight 700, ls −0.005em | 22 / 1.40, weight 700 |
| Card title / h3 | 18 / 1.35, weight 600 | 17 / 1.50, weight 600 |
| Lead paragraph | 17 / 1.55 | 17 / 1.75 |
| Body | 15 / 1.55–1.65 | 15 / 1.75 |
| Small / caption | 13 / 1.6 | 13 / 1.75 |
| Eyebrow / label | 12–13, weight 600, ls .06em, uppercase | same, **not** uppercased |

Rules: Tamil never takes negative letter-spacing, never takes \`text-transform: uppercase\`, and always steps down one size at hero and h2 while gaining line-height. Body text uses \`text-wrap: pretty\`.

### Spacing scale
\`4, 8, 12, 16, 24, 32, 48, 64\` px (2xs, xs, sm, md, lg, xl, 2xl, 3xl). No other spacing values appear. Use flex/grid + \`gap\`.

### Radii
\`4 (xs), 8 (sm), 12 (md), 16 (lg), 999 (full)\` px. Cards and buttons are \`md\`; pills and the language toggle are \`full\`; the phone-frame outer shell in the doc uses 20px, which is device chrome — **not a site value**.

### Elevation
\`\`\`
elevation-1: 0 1px 2px oklch(20% .03 262/.06), 0 1px 3px oklch(20% .03 262/.05)
elevation-2: 0 4px 10px oklch(20% .03 262/.08), 0 1px 3px oklch(20% .03 262/.05)
\`\`\`
The site itself uses almost no shadow — cards are 1px \`border-default\`. \`elevation-2\` in the doc is on the device frames.

### Motion
\`\`\`
duration-fast 120ms   duration-base 180ms   duration-slow 240ms
ease-standard cubic-bezier(.2, 0, 0, 1)
\`\`\`

### Other
- \`--size-target-min: 48px\` — **every** interactive target is at least 48×48. Primary buttons are min-height 56px, min-width 220px.
- Focus: \`outline: 2px solid border-focus; outline-offset: 2px; border-radius: 4px\` on \`:focus-visible\`. Do not remove.
- Links: \`color: blue-600; text-decoration: underline; text-underline-offset: 2px\`, hover \`blue-700\`.

---

## Breakpoints

The design was drawn at exactly two widths:
- **390px** — mobile. Single column, \`space-md\` (16px) side padding.
- **1280px** — desktop. Content grids go 2-up / 3-up / 4-up; the doctor page and several others use \`grid-template-columns: 1fr 420px\` with \`gap: space-3xl\` (a content column plus a fixed sidebar).

Nothing between was drawn. Treat 390 as the floor and 1280 as the reference desktop; interpolate with a single tablet reflow (stack the 420px sidebar under the content column, drop 4-up to 2×2, 3-up to 1-up). **Design intent for the sidebar: it grows, nothing shrinks** — under Tamil, the sidebar column keeps its 420px and the content column absorbs the extra length.

---

## Screens / Views

### 1. Site header (all pages)
- Mobile: 48px-tall row, \`space-xs\` vertical / \`space-md\` horizontal padding, bottom border \`border-subtle\`. Left: wordmark "Pulse", 20px/700, ls −0.01em, \`text-brand\`. Right: language toggle then hamburger, \`space-xs\` gap.
- **Language toggle**: a pill (\`radius-full\`, 1px \`border-default\`, min-height 48px, overflow hidden) containing two segments, each min-width 48px, padding \`0 space-sm\`, 15px. Active segment: \`surface-selected\` fill + \`text-brand\` + weight 600. Inactive: \`text-primary\`, weight 500. Labels are **"EN"** and **"தமிழ்"** — each language named in its own script, never a flag, never a globe icon.
- **Hamburger**: 48×48, 1px \`border-default\`, \`radius-sm\`, three 20×2px \`text-primary\` bars with 5px gaps.
- **Open state** (drawn for both languages): a dropdown panel below the header listing the nav destinations as full-width rows, each ≥48px. See the "Navigation and language entry states" section of the design doc for the exact list and the Tamil variant, where **the nav wraps rather than truncating** at 1280.
- Desktop 1280: wordmark left, nav links inline right, language toggle at the far right; no hamburger.

### 2. Homepage
Order of blocks, top to bottom:

1. **Hero.** Headline set as **three separately-clipped lines** (each line in an \`overflow: hidden\` wrapper) so it can rise into view. EN 32/1.15/700; TA 30/1.30/700. Then a 17/1.55 lead paragraph, then the primary CTA.
   - EN headline: "Care comes to / your parents — / at home, or by video"
   - Lead: "Doctor consultations, nursing, physiotherapy and lab collection, arranged in Adyar, Besant Nagar and Thiruvanmiyur. Almost all of it happens at your parents' home — a consultation can start on video when that is faster."
   - CTA: **"Primary action — TBD"** — the destination is an open decision (below). Sub-label under it: "Destination undecided — see the CTA comparison below."
2. **Trust strip.** \`surface-sunken\` band with top and bottom \`border-subtle\`, \`space-md\` padding, \`space-sm\` gap. Four rows, each a 22×22 square with 1.5px \`verified-border\`, \`radius-xs\`, containing a ✓ at 13px/700, beside 15/1.55 text. Content: ID and police verification on every visitor; nursing-council registration checked before a first visit; the same attender returns for repeat visits where possible; (fourth row — see file).
3. **Service row.** See §3 below — the count-driven grid.
4. **How it works** — numbered step strip (§4).
5. **Comparison table** (§5).
6. **Founders block** (§6).
7. **Footer** (§7).

### 3. Service row — count-driven grid ⚠️
This is the most important structural rule on the site.

Four Phase-1 service lines: **doctor consultation, home nursing, home physiotherapy, home lab collection**.

- **Four-service state**: 4 across at 1280, 2×2 at 390.
- **Three-service state** (doctor withheld): 3 across at 1280, single stack at 390.

The column count is **a function of the service count**. The three-service layout is a real layout — never the four-service grid with a hole, and never a greyed-out "Doctor — coming soon" card. Both states are fully drawn in the design doc ("The doctor slot dark" section) for hero, service row, step four, contact chips and professional roles.

**Why**: MKT-06 §5 forbids advertising a doctor as available before verification is satisfied. Build both states behind one flag (\`doctorLive: boolean\`) driven by content config, and make sure the three-service state is what renders by default until told otherwise.

Each service card: 1px \`border-default\`, \`radius-md\`, \`space-md\` padding (mobile) / \`space-lg\` (desktop), column flex with \`space-xs\` gap. Contains a **delivery-mode pill**, a title (18/1.35/600), and body (15/1.55).

**Delivery-mode pill** — new component. Small \`radius-full\` pill, 12px/600, reading either **"At home"** or **"At home or by video"**. This pill is the *only* element that carries the remote-consultation exception, which is what allows the headline to stay a clean promise. Do not drop it, do not turn it into an icon.

### 4. How it works — numbered step strip
Horizontal, **snap-scrolling** on mobile with a "Swipe to see all four →" affordance. Steps are numbered 1–4. Step numbers are 32×32 \`radius-full\` circles, \`surface-brand\` fill, \`text-on-brand\`, centred, weight 600. Step cards are max-width 300px, 1px \`border-default\`, \`radius-md\`, \`space-md\` padding, \`surface-base\`.

Use CSS scroll-snap (\`scroll-snap-type: x mandatory\` on the track, \`scroll-snap-align: start\` on cards) — no JS carousel, no dots.

**Step four differs between the two service states** (drawn separately in the doc).

### 5. Comparison table
Rows compare Pulse against the alternatives. Two rules:
- **Text alternatives to ticks and dashes.** Every cell that would be a ✓ or an — carries a real word as well. A screen-reader user must not be handed a table of symbols.
- **One emphasised row** uses \`surface-selected\` fill for a claim that now carries weight (iteration 2 addition).

### 6. Founders block
Two founder cards with **photo slots** (real photos pending — leave the slots as neutral \`surface-sunken\` placeholders with a stated aspect ratio, do not generate or stock-source images). The design doc also draws a **founders-removed state** (WEB-D02) — the section may be cut before launch, and the page must not leave a gap when it is. Implement as an optional section.

### 7. Footer
Marketing footer with **text-label social links** (WEB-D08) — the words "Instagram", "WhatsApp" etc., not glyphs. Contains service links, page links, the two locality lists, and contact details.

### 8. Doctor consultation page (new service page)
- H1: "Talk to a doctor — at the house, or on video"
- Lead: "A full consultation with a registered doctor, and a referral onward if one is needed. You choose where it happens."
- H2 **"Two ways it happens"** → two cards, each carrying a delivery-mode pill.
- H2 **"What a consultation includes"** → cards: "The doctor's own assessment", "A written note afterwards", etc.
- A **"How the doctor is verified"** block: NMC or state medical council registration checked before the first consultation.
- Desktop layout: \`1fr 420px\`, \`gap: space-3xl\`, \`align-items: start\`.

### 9. For professionals
- H1 "Work with Pulse", lead naming nurses, attenders, physiotherapists and doctors and the three localities.
- H2 **"Which role are you applying for?"** → **role selector**: four role cards (Nurse, Attender, Physiotherapist, Doctor), **each with its own credential list** — this replaced a single shared list in iteration 2. Mobile: single stack. Desktop: 2-up, \`grid-template-columns: repeat(2, minmax(320px, 1fr))\`.
- In the three-service state the doctor card is **absent, not disabled**.
- **Reserved-slot block, per role**: approval time is unknown and differs by role, so each role card has a slot that says so rather than implying a single figure is coming ("How long approval takes" — see WEB-D11).
- **No card exists for home lab collection** — whether that is Pulse staff or a partner lab is undecided.

### 10. For hospitals
Discharge-focused page. ⚠️ Note the conflict: this page exists to sell after-hospital-discharge, which is **not** one of the four agreed Phase-1 service lines. Do not silently reconcile — see Open Decisions.

### 11. Contact — branching enquiry form
Three states drawn: **empty**, **mid-completion**, **submitted**; mobile in both languages, plus desktop mid-completion.

- **Chip groups**: the service chips (four, or three in the doctor-dark state). Chips wrap, so dropping one opens no gap. Selected chip: \`surface-selected\` + \`border-brand\` + \`text-brand\`, weight 600. Unselected: 1px \`border-default\`, \`text-primary\`. Each chip ≥48px tall.
- **Progressive reveal**: follow-up fields appear only once the relevant chip is chosen. The reveal is a real branch — the form asks different follow-ups per service.
- **Submitted panel** replaces the form in place; it states what happens next and by when.
- Placeholder text is the *only* place \`text-tertiary\` is allowed (see contrast conflict). Never use it for a content string.

### 12. About us · Technology and trust · Blog
- **Technology and trust** is structured as four labelled blocks: **"What we ask for" / "What we never ask for" / "Who can see it" / "How long we keep it"**. Keep that four-part structure — it is the trust argument.
- **Blog**: index (cards with "Placeholder date · N min read") and an article template, both languages.

### 13. Accessibility variants (drawn, must hold)
- **200% text**: the mobile homepage at doubled font sizes with line-heights converted to unitless ratios. Nothing clips, nothing overlaps, no horizontal scroll. Test this for real.
- **Reduced motion**: all hero animation removed, all reveal transitions off, content in final position. Implement with \`@media (prefers-reduced-motion: reduce)\`.

---

## Interactions & Behavior

- **Hero entrance.** Three headline lines rise from clipped containers: \`@keyframes pulseRise { from { transform: translateY(115%) } to { transform: translateY(0) } }\`, \`240ms\` \`ease-standard\` \`both\`, staggered **0 / 90ms / 180ms**. Lead paragraph and CTA then fade up: \`@keyframes pulseFade { from { opacity:0; transform: translateY(10px) } to { opacity:1; transform:none } }\` at **320ms** and **420ms** delay. Runs once on load, not on scroll.
- **Scroll reveal.** Blocks below the hero carry \`data-reveal\`: initial \`opacity:0; transform: translateY(16px)\`, transitioning \`opacity\` and \`transform\` over \`240ms\` \`ease-standard\`. In the design doc these are all forced on after mount; in production use an \`IntersectionObserver\` (one-shot, ~15% threshold) and **skip entirely under reduced motion** — never leave content at \`opacity:0\` if the observer does not fire.
- **Language toggle.** Switches locale and navigates to the same page in the other language. **Two entry states are drawn** (WEB-D15, "Language on load"): the decision of whether a first-time visitor lands in English or Tamil is open — implement locale routing (\`/en/...\`, \`/ta/...\`) so either default is a config change, and persist an explicit choice.
- **Hamburger** toggles the dropdown panel; \`aria-expanded\`, focus trap not required (it is a disclosure, not a modal), Escape closes, click-outside closes.
- **Step strip**: native scroll-snap; keyboard-reachable (the track is focusable and arrow-scrollable).
- **Form**: chip selection drives progressive reveal; submit swaps to the submitted panel. Validation rules are not specified in the design — treat required-field errors as \`red-700\` text below the field on \`red-100\`, and announce them.

## State Management
Trivial; no store needed.
- \`locale: 'en' | 'ta'\` — from the route.
- \`doctorLive: boolean\` — content config, drives the 4-vs-3 service grid, the hero string, step four, contact chips and role cards.
- \`foundersVisible: boolean\` — content config.
- \`navOpen: boolean\` — header local state.
- Form: selected service chips (array), per-branch follow-up field values, \`submitted: boolean\`. One POST to an enquiry endpoint; no other data fetching. Blog posts should come from whatever CMS/MDX the codebase prefers.

## Screenshots
`screenshots/` contains four reference captures:
- `01-homepage-mobile-en.png` — the full English mobile homepage, 390px, top to bottom. This is the canonical frame; everything else on the site follows its vocabulary.
- `02-hero-option-2a-applied.png` — the applied hero option in both languages, with its headline-budget notes.
- `03-accessibility-200pct-text.png` — the mobile homepage at 200% text. Nothing clips or overlaps; match this.
- `04-reduced-motion.png` — the reduced-motion state, all content in final position.

They are a spot-check, not the spec. The HTML files carry every frame (Tamil, desktop 1280, both service states, form states, all secondary pages) and are the reference of record — open them rather than working from the PNGs.

## Assets
- **Fonts**: Hind and Hind Madurai, OFL, self-host.
- **Photos**: none supplied. The founders block and any imagery are **empty slots** awaiting real photographs. Do not substitute stock or generated imagery.
- **Icons**: essentially none by design. The tick is a text ✓ inside a bordered square; social links are words; the hamburger is three divs. Keep it that way unless the codebase has an icon set already in use.

## Open Decisions — do not resolve these silently
1. **What the primary CTA does.** Three destinations are drawn and compared: **A** waitlist sign-up, **B** app-store link, **C** launching-soon panel. Until this is decided the button reads "Primary action — TBD". Build the hero so the CTA is a slot.
2. **The four service lines are not the three previously advertised.** Iteration 1 sold *nursing visits, attender support, after-hospital discharge*. The agreed four (D-04) contain no attender and no discharge line, yet both are still real offers named elsewhere on the site — including the hospitals page, which exists to sell discharge. Either attender support is a fifth service line, or the hospitals page needs a rewrite.
3. **Home lab collection has no role card** — undecided whether Pulse staff or a partner lab draws the sample.
4. **Approval time**: no single figure will hold across roles; the reserved slot says so.
5. **Display type step.** The largest system step is 32px, sized for app screens; the desktop hero wants more presence but no new step was invented. A marketing display step is a system decision.
6. **\`text-tertiary\` (ink-500) is ~4.8:1 on white**, under the 7:1 body floor. Used only for placeholders and non-content labels. The system should either raise it or mark it placeholder-only. **Never use it for a body string.**
7. **Motion ceiling**: the hero entrance sits at the top of the 240ms slow token. Anything more expressive needs a new duration token.
8. **Tamil copy is unreviewed placeholder.** Native-speaker review required before launch.
9. **Headline strings are per-state**: the applied headline (option 2a) names video and therefore cannot ship in the three-service state — it needs a second approved string, not a toggle.

## Files
- \`Pulse Website.dc.html\` — the full design doc: all frames, both languages, both service states, all accessibility variants, plus the option comparisons and conflict notes.
- \`Pulse Foundations.dc.html\` — token definitions and rationale.
- \`Pulse Identity Locked.dc.html\` — locked brand identity (wordmark, colour, type pairing).
- \`Pulse Components.dc.html\` — the existing component set the site builds on.
- \`Pulse Brand Directions.dc.html\` — the three explored directions and which was chosen (context only; do not build from it).
- \`Pulse Pamphlet Print.dc.html\` — the print pamphlet, for copy and tone consistency (context only).

Open these in a browser directly. The website file is a wide canvas — pan and zoom.

### Reading the design file
Frames are labelled with small uppercase captions (e.g. "English · 390px", "Tamil · 1280px · sidebar grows, nothing shrinks", "200% text · English · 390px"). Bordered panels headed "Conflicts raised, not resolved" and "New in iteration 2" are commentary. Options carry visible badges \`2a\` / \`2b\` / \`2c\` — **2a is the applied one**.
