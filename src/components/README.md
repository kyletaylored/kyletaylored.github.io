# Design system → component map

This maps every pattern shown in the design comps
(`_reference/creative_engineer_design_system/Design Reference.dc.html` and
`_reference/creative_engineer_design_system/ui_kits/lab/*.dc.html`) to the
actual component that implements it, where it's used today, and whether
it's fully adopted or still has known gaps. Read this before adding new UI —
reuse what's listed here instead of re-implementing a pattern as inline
Tailwind classes.

The `.dc.html` files render standalone in a browser (they load
`support.js`) — open one directly if you want to see the original mockup
before touching the component that implements it.

## Fully adopted (comp pattern → component → wired up everywhere it appears)

| Comp pattern | Component | Used in |
| --- | --- | --- |
| Buttons (primary/secondary/dark, arrow suffix) | [`Button.astro`](./Button.astro) — plain-link wrapper, no JS | `ArticleLayout`, `ProjectLayout`, `LabLayout` post pages, homepage, `/lab` |
| Buttons (interactive, e.g. inside the command palette / mobile sheet) | [`ui/button.tsx`](./ui/button.tsx) — shadcn primitive on `@base-ui/react`, restyled to sharp corners in the `variant` map | `MobileNav.tsx` (via Sheet trigger) |
| Section Header (dot + uppercase label + "View all →") | [`SectionHeader.astro`](./SectionHeader.astro) | homepage, `/lab` index |
| Activity Feed row | [`ActivityItem.astro`](./ActivityItem.astro) + [`ActivityFeed.astro`](./ActivityFeed.astro) (list wrapper) | homepage, `/lab` index |
| Terminal window (Lab hero) | [`lab/TerminalWindow.astro`](./lab/TerminalWindow.astro) — CSS-only blinking cursor, no JS | homepage hero, `/lab` hero |
| Footer CTA banner + hazard stripe | [`Footer.astro`](./Footer.astro) (uses `decor/HazardStripe.astro` + `decor/Circle.astro`/`Triangle.astro`) | global, via `BaseLayout` |
| Decorative shapes — circle, triangle, diamond, dot grid | [`decor/Circle.astro`](./decor/Circle.astro), [`decor/Triangle.astro`](./decor/Triangle.astro), [`decor/Diamond.astro`](./decor/Diamond.astro), [`decor/DotGrid.astro`](./decor/DotGrid.astro) | dark hero/header bands: `ArticleLayout`, `ProjectLayout`, homepage, `/lab`, `Footer.astro` |

## Built but **not yet used** — reach for these instead of re-inlining the pattern

| Comp pattern | Component | Status |
| --- | --- | --- |
| Tags & Badges (default outline, colored solid) | [`ui/badge.tsx`](./ui/badge.tsx) — has `teal`/`pink`/`yellow`/`blue` variants added on top of shadcn's defaults specifically for this | **Not used anywhere.** Every tag/status pill across the site (`ArticleLayout`, `ProjectLayout`, lab pages, all three index pages) is a hand-written `<span class="rounded-full border ...">` instead. These should be migrated to `<Badge variant="...">` — the hand-rolled spans work but duplicate styling that already exists as a component. |
| Cards (experiment/tool card, 48px icon box + label + arrow) | [`ui/card.tsx`](./ui/card.tsx) | **Not used anywhere.** Every card grid (`/lab` category + featured cards, homepage featured projects, `/projects` index) is a hand-written `<a class="rounded-md border ...">` instead of `<Card>`. Same situation as Badge — works, but duplicates the component. |
| Decorative patterns — hazard stripe (used ✓ via Footer), slash-marks (`/ / / /`), crosshair (`+`) | [`decor/HazardStripe.astro`](./decor/HazardStripe.astro) (used), [`decor/CrosshairMark.astro`](./decor/CrosshairMark.astro) (unused), [`decor/DiagonalBar.astro`](./decor/DiagonalBar.astro) (unused) | The slash-marks (`/ / / /`) and `+` glyph seen in dark hero bands are currently hand-written text (`<div class="... tracking-[6px] ...">/ / / /</div>`), not the `CrosshairMark`/`DiagonalBar` components. |

**If you're touching tags, cards, or those two decor patterns:** prefer wiring up the existing component over adding another inline variant — it's a small, contained refactor (component already exists and is styled; it's just not imported anywhere yet).

## Not from the comps — our own extension

| Component | Why it exists |
| --- | --- |
| [`PageHeader.astro`](./PageHeader.astro) | The comps only include a dark header band for the *Blog Post* template and the *Lab Home* hero — there's no comp for a generic content/listing page (About, Projects index, Articles index). `PageHeader` extends the same dark-band + decorative-shape visual language to those pages so the site doesn't fall back to plain white headers outside the two comped page types. Used in `about.astro`, `projects/index.astro`, `articles/index.astro`. |
| `ui/*.tsx` primitives beyond Button/Badge/Card/Command/Dialog/Sheet (`input.tsx`, `input-group.tsx`, `textarea.tsx`, `separator.tsx`) | Installed as part of the shadcn `command`/`sheet` dependency chain (Command's search input uses `InputGroup`), not directly used as standalone components yet. Fine to use if a future page needs a form input — just restyle away from shadcn's default `--primary`/`--radius` look the same way `button.tsx`/`badge.tsx` were (see `tokens.css`'s `@theme inline` block for how shadcn's semantic vars are pointed at our own tokens). |

## Design tokens (not components — referenced directly, not imported)

`src/styles/tokens/{colors,typography,spacing,effects}.css` are copied verbatim
from `_reference/creative_engineer_design_system/tokens/`. Don't edit the
comp-derived values there without updating the reference files too, if you
want to keep them in sync as the single source of truth for hex/px values.

`src/styles/tokens.css` is where those tokens get registered as Tailwind
theme keys (`@theme { --color-teal: #28d7e5; ... }`) — **the values there
must be literal, not `var(--color-teal)`**, or you'll recreate the
self-referential CSS cycle that caused the black-on-black text bug (see git
history / commit `454d158` if you need the full explanation).

## One more gotcha worth knowing

Any plain CSS in `src/styles/global.css` targeting a bare tag selector
(`a`, `h1`–`h6`, etc.) **must** live inside `@layer base { ... }`. Tailwind
wraps its own utilities in CSS layers, and per the cascade-layers spec,
unlayered CSS always beats layered CSS regardless of specificity — an
unlayered `a { color: ... }` would silently override every `text-*` utility
applied to a link anywhere on the site.
