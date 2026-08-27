# Website building with Claude

_Started 2026-08-26 08:58 UTC_

---

## User

Continuing from "Chat".

## Assistant

We were building an A5 single-sheet Tamil/English pamphlet for a health service. The design system is set to Hind / Hind Madurai (OFL), Blue 600 `#1F5FBF` (spec'd C92 M64 Y0 K2 for print), and ink `oklch(20% .015 262)`. Layout is at actual size with 3 mm bleed and 5 mm safe guides.

Early decisions: We kept Hind/Madurai rather than switching to Anek (both OFL, clear to embed; we noted to re-clear if type direction changes later). We spec'd blue to rebuild rather than convert—the naive profile reads plum, so a wet proof on stock is required before the run. Print body is 12 pt (system floor); copy was cut to fit the constraint, not the other way.

Tamil is entirely placeholder at correct length and needs native-speaker review plus two proof passes before plating.

Current state: Both faces (Tamil and English) fit cleanly inside the 210 mm trim with the 5 mm safe zone and 10 mm foot margin intact (last block ends 0.3 px inside the content box on each). The QR caption was the main blocker—it was stacked in a 24 mm column and wrapped to five lines, pushing the CTA row 50 px taller than the phone number beside it. We collapsed it to a single 9 pt line running full measure under the row, which also reads better. Tamil is now at full capacity at 12 pt; any future addition is a copy trade, not an insertion.

Recent trims to fit: Tamil stamp body to one line, lead's second clause, ~3 mm of block spacing. Type sizes unchanged.

File: Pulse Pamphlet Print.dc.html

Next: Native Tamil speaker review and two proof passes before any move to plate. Wet proof of blue on stock before the run.

## User

Lets build the website using Claude Code

## Assistant

_[tool: read_skill_prompt]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

Now writing the handoff package.

_[tool: run_script]_

_[tool: copy_files]_

_[tool: present_fs_item_for_download]_

Handoff package is ready — README plus all six design files and `support.js` so the HTML opens standalone.

The README documents tokens verbatim, the two drawn breakpoints (390 / 1280), every screen, the count-driven 4-vs-3 service grid rule, the motion timings, and the nine open decisions flagged as *not to resolve silently* — including the CTA destination, the service-line mismatch with the hospitals page, and the unreviewed Tamil copy.

Want screenshots of the frames added to the bundle?

## User

Yes go ahead and explain the steps to take it to Claude Code

## Assistant

_[tool: show_to_user]_

_[tool: snapshot_element]_

_[tool: snapshot_element]_

_[tool: snapshot_element]_

_[tool: snapshot_element]_

_[tool: snapshot_element]_

_[tool: snapshot_element]_

_[tool: delete_file]_

_[tool: run_script]_

_[tool: present_fs_item_for_download]_

Screenshots added (mobile homepage, applied hero, 200% text, reduced motion).

**Taking it to Claude Code**

1. Download and unzip the folder somewhere sensible — either inside the repo you're building in (add it to `.gitignore`, or commit it as `docs/design/`), or alongside it.
2. In your terminal, `cd` into the project repo and run `claude`.
3. First prompt: point it at the README and let it read before writing anything.
   > Read `design_handoff_pulse_website/README.md` and the HTML files it lists. Don't write code yet — tell me how you'd structure this in our codebase, and list anything in the README that conflicts with what's already here.
4. Read its plan against the nine open decisions. It will want to resolve them; don't let it. The CTA destination and the service-line mismatch in particular need your answer, not its guess.
5. Then build in slices, header and homepage hero first. Ask for one page at a time and check it at 390px and 1280px before moving on — the README only specifies those two widths, so anything in between is Claude Code inventing.
6. Two things to state explicitly early, because they're the most likely to be quietly dropped: the **three-service state must be the default render** until you say otherwise, and **Tamil strings go through i18n as replaceable placeholders** — never hardcoded.

If it has repo access, connecting the GitHub repo here too would let me review its output against the designs later.

## User

I don't have any github repo and I am just creating one. Include them in the steps

## Assistant

_[tool: write_file]_

_[tool: run_script]_

_[tool: present_fs_item_for_download]_

Added `START-HERE.md` to the bundle — repo creation, scaffold, where to put the handoff, the prompts to open with, and the build order. The README is the spec; that file is the running order.

Two calls worth knowing about, since I made them for you: **private repo** (draft copy, unreviewed Tamil) and **Next.js App Router** as the scaffold, chosen because the site needs to be indexable and has almost no client state. Say so if you'd rather go another way and I'll rewrite that step.

