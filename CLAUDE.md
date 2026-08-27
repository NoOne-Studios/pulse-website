@AGENTS.md

# Pulse marketing website

Next.js App Router implementation of the Pulse Phase-1 brochure site, built
from the Claude Design handoff in `docs/design/` (see
`docs/design/project/design_handoff_pulse_website/README.md` for the full
design spec, tokens and open decisions — that file is the spec of record,
more detailed than the top-level `docs/design/README.md`).

## Ground rules

- **Three-service state is the default render.** The doctor consultation
  service line must not appear anywhere on the site — service row, hero
  copy, "how it works" step 4, contact form chips, professionals role
  list, or its own `/doctor-consultation` page (which 404s while dark) —
  until `doctorLive` in `lib/config.ts` is flipped to `true`. This is a
  compliance constraint (MKT-06 §5: doctors can't be advertised before
  verified doctors exist and legal review is done), not a preference.
  When flipped, content for both states already exists in
  `lib/i18n/en.ts` / `ta.ts` — nothing needs to be re-authored.
- **All Tamil strings are unreviewed placeholder**, wired through
  `lib/i18n/{en,ta}.ts` (typed against the `Dictionary` shape derived from
  `en.ts`). Never hardcode a Tamil string in a component. Do not treat any
  Tamil wording here as final — it needs native-speaker review before
  launch, and so does the English copy (marked WEB-D16 in the design
  bundle: realistic draft length, not final wording).
- **Tamil typography**: `:lang(ta)` in `app/globals.css` sets
  `font-family` and `line-height: 1.75` globally. Tamil never takes
  negative letter-spacing or `text-transform: uppercase` — components
  gate those with an `isTamil` check rather than applying them
  unconditionally.
- **Design tokens** live in `app/globals.css` as CSS custom properties,
  ported verbatim from the locked design system. Components consume the
  semantic tokens (`--color-text-primary`, `--space-md`, ...), never
  literal values. `--color-text-tertiary` is ~4.8:1 contrast — placeholder
  and non-content labels only, never a body/content string (flagged,
  unresolved conflict in the source design).
- **Breakpoints**: only 390px (mobile) and 1280px (desktop) were actually
  designed. Everything in between is this build's interpolation — a
  single reflow via CSS Grid `auto-fit`/`minmax`, not a third drawn
  breakpoint. Check any layout change at both widths.
- **Tap targets**: 48×48 minimum (`--size-target-min`), 8px separation.
  Primary buttons are min-height 56px. Never fixed `height` on anything
  that holds text — `min-height` only, so 200% browser zoom and longer
  Tamil strings never clip or truncate.
- **Motion**: the hero's 3-line rise and the section reveal-on-scroll
  (`components/Reveal.tsx`) are both disabled under
  `prefers-reduced-motion: reduce` (global CSS collapses all
  animation/transition durations; `Reveal` also skips its own JS
  hide/reveal). Don't add new animation without the same guard.
- **Locale routing**: `/en` and `/ta` under `app/[locale]/`, with
  `app/[locale]/layout.tsx` as the effective root layout (sets `<html
  lang>`). `middleware.ts` redirects `/` to a detected locale (cookie
  override, then `Accept-Language`, then `en`) — this file convention is
  currently named `middleware.ts`; Next 16 recommends migrating to
  `proxy.ts` via `npx @next/codemod@canary middleware-to-proxy .` (not
  done yet — needs a clean git tree to run).

## Open product decisions (unresolved on purpose — do not guess)

Carried over from the design handoff's own "Open Decisions" list
(`docs/design/project/design_handoff_pulse_website/README.md`). Resolved
so far: **primary CTA → waitlist signup** (see `lib/config.ts`
`ctaMode`, `components/WaitlistForm.tsx`, `/api/waitlist` stub), **contact
form backend → stub API route only** (`/api/enquiry`, logs and validates,
nothing persisted). Still open:

1. **Hospitals page / service-line mismatch.** `app/[locale]/for-hospitals/page.tsx`
   sells discharge referrals, but discharge/attender support isn't one of
   the four agreed Phase-1 service lines. Built as-is with the conflict
   documented in a comment at the top of that file, per explicit
   instruction — do not silently rewrite one side to match the other.
2. **Home lab collection has no professional role card** — Pulse staff vs.
   partner lab is undecided (`for-professionals/page.tsx` renders a
   "no card for lab collection" note instead of inventing one).
3. **Approval time** for professional applications is withheld
   (`professionals.approvalPlaceholder` in the dictionary) — no figure
   exists yet, and one figure won't hold across roles once doctors launch.
4. **Display type step**: the largest type token is 32px (app-sized); a
   marketing display step for the desktop hero was never introduced.
5. **`--color-text-tertiary` contrast** (~4.8:1, under the 7:1 body floor)
   — placeholder-only, not raised.
6. **Tamil native-speaker review** — nothing in `lib/i18n/ta.ts` has been
   reviewed by a Tamil speaker; treat every string as a length/layout
   placeholder.
7. Founders section (`foundersVisible` in `lib/config.ts`) ships **off**
   — no real photos/names supplied. Flip once they exist; never fill with
   placeholder headshots.

## Structure

- `lib/config.ts` — the content-config flags above.
- `lib/i18n/` — `en.ts` (source of truth for the `Dictionary` shape),
  `ta.ts` (typechecked against it), `locales.ts`, `index.ts`
  (`getDictionary`).
- `components/` — one component per design-system pattern (`Hero`,
  `ServiceRow`, `StepStrip` = horizontal snap strip, `VerificationSteps` =
  vertical numbered rail — these two are deliberately different
  components per WEB-D13 even though both number steps — `ComparisonTable`,
  `ContactForm`, `Header`/`Footer`, etc).
- `app/[locale]/` — one folder per page; `app/api/{enquiry,waitlist}` —
  stub route handlers.
- `docs/design/` — the original Claude Design handoff bundle (HTML
  mockups, chat transcripts, README). Reference only; not shipped.
