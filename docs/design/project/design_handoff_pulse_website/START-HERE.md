# Start here — from empty folder to first page

This is the running order for a project with **no repository yet**. The design spec is
`README.md` in this folder; this file is only about getting to the point where you can
build from it.

---

## 1. Make the repo

```bash
mkdir pulse-web && cd pulse-web
git init
```

Create the empty remote on github.com (New repository → name `pulse-web` → **no**
README, **no** .gitignore, **no** licence — you want it empty so the first push is clean),
then:

```bash
git remote add origin git@github.com:<you>/pulse-web.git
```

If you have the GitHub CLI, `gh repo create pulse-web --private --source=. --remote=origin`
does both steps.

Make it **private** for now. The site copy is unapproved draft and the Tamil is
unreviewed placeholder — neither should be public yet.

## 2. Scaffold the app

Nothing exists, so this is a free choice. For a bilingual, content-light marketing site
that needs to be indexable:

```bash
npx create-next-app@latest . --typescript --app --eslint
```

Take the defaults. Say yes to Tailwind only if you already know it; the design's tokens
map cleanly either way and plain CSS with custom properties is a perfectly good answer
here. Whatever you pick, pick it now — switching later is the expensive move.

## 3. Drop the handoff in

```bash
mkdir -p docs/design
cp -r <this-folder>/* docs/design/
git add -A && git commit -m "Scaffold app and add design handoff"
git push -u origin main
```

Committing the handoff is deliberate: Claude Code reads it from the repo, and it stays
with the project when the conversation is gone.

## 4. Start Claude Code

```bash
claude
```

From the repo root, so it can see the whole tree.

### First prompt — read, don't write

> Read `docs/design/README.md` and the HTML files it lists. Don't write any code yet.
> Tell me how you'd structure this in a fresh Next.js App Router project, and list
> everything in the README that's left open or undecided.

Check the list it comes back with against the **Open Decisions** section of the README.
It should find all nine. If it proposes answers to them, say no — those are business
decisions, not implementation details, and a guess baked into code is expensive to
unpick.

### Second prompt — set up the ground rules

> Set up the token layer and the two locale routes (`/en`, `/ta`) first. Self-host Hind
> and Hind Madurai. Then build the site header and the homepage hero only. Stop there.

### Then, one slice at a time

Header → hero → trust strip → service row → step strip → comparison → footer → then the
secondary pages, then the form last (it is the most stateful thing on the site).

Check each slice at **390px and 1280px** before moving on. Those are the only two widths
that were designed; anything you see in between is Claude Code improvising, and you
should tell it what you want rather than accept the first guess.

## 5. Say these two things out loud early

They are the likeliest to be quietly dropped:

1. **The three-service state is the default render.** The doctor service line must not
   appear until told otherwise — this is a compliance constraint (MKT-06 §5), not a
   preference. See the count-driven grid section of the README.
2. **Every Tamil string goes through i18n as a replaceable placeholder.** Nothing
   hardcoded, nothing inlined in a component. The Tamil has not been reviewed by a
   native speaker and all of it will change.

## 6. Add a CLAUDE.md

Once the ground rules are settled, ask Claude Code to write them into a `CLAUDE.md` at
the repo root — the token layer, the two breakpoints, the Tamil typography rules, the
48px target floor, and the two constraints above. It reads that file automatically on
every future session, so you stop having to repeat yourself.

## 7. Commit at every slice

```bash
git add -A && git commit -m "Homepage hero, both locales"
```

Small commits per slice. If a slice comes back wrong, `git revert` is faster than
arguing with it.

---

**Not to do:** don't ask for the whole site in one prompt. It will produce something
that looks plausible, silently resolves the open decisions, and drops the three-service
state. Slices and checks.
