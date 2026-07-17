# Design system → component map

This maps every pattern shown in the design comps
(`_reference/creative_engineer_design_system/Design Reference.dc.html`,
`_reference/creative_engineer_design_system/ui_kits/lab/*.dc.html`, and
`_reference/creative_engineer_design_system/components/media/*.dc.html`) to
the actual component that implements it, where it's used today, and whether
it's fully adopted or still has known gaps. Read this before adding new UI —
reuse what's listed here instead of re-implementing a pattern as inline
Tailwind classes.

**Check `ui_kits/lab/` for new comps before starting new work.** They get
added over time (About, Project, Blog Post Featured Image, etc. were all
added after the initial design system pass) — `ls` the directory rather than
assuming this doc's comp list is exhaustive.

The `.dc.html` files render standalone in a browser (they load
`support.js`) — open one directly if you want to see the original mockup
before touching the component that implements it.

## Fully adopted (comp pattern → component → wired up everywhere it appears)

| Comp pattern | Component | Used in |
| --- | --- | --- |
| Buttons (primary/secondary/dark, arrow suffix) | [`Button.astro`](./Button.astro) — plain-link wrapper, no JS | `ArticleLayout`, `ProjectLayout`, `LabLayout` post pages, homepage, `/lab` |
| Buttons (interactive, e.g. inside the command palette / mobile sheet) | [`ui/button.tsx`](./ui/button.tsx) — shadcn primitive on `@base-ui/react`, restyled to sharp corners in the `variant` map | `MobileNav.tsx` (via Sheet trigger) |
| Section Header (dot + uppercase label + "View all →") | [`SectionHeader.astro`](./SectionHeader.astro) | homepage, `/lab` index |
| GitHub contribution heatmap | [`GitHubContributionGraph.astro`](./GitHubContributionGraph.astro) — renders the same weeks×days grid as a GitHub profile, re-skinned to the site's teal accent instead of GitHub's green. Data comes from `scripts/fetch-activity.ts` (`src/data/contributions.json`, `GH_ACTIVITY_TOKEN`-gated, no-ops to an empty state when unset) | homepage only. Replaces the old text-based Activity Feed there (raw "pushed to X" / merged-PR titles read as noise rather than signal); the `/lab` index dropped its Activity section entirely rather than replacing it. |
| Terminal window (Lab hero) | [`lab/TerminalWindow.astro`](./lab/TerminalWindow.astro) — CSS-only blinking cursor, no JS | homepage hero, `/lab` hero |
| Footer CTA banner + hazard stripe | [`Footer.astro`](./Footer.astro) (uses `decor/HazardStripe.astro` + `decor/Circle.astro`/`Triangle.astro`) | global, via `BaseLayout` |
| Decorative shapes — circle, triangle, diamond, dot grid | [`decor/Circle.astro`](./decor/Circle.astro), [`decor/Triangle.astro`](./decor/Triangle.astro), [`decor/Diamond.astro`](./decor/Diamond.astro), [`decor/DotGrid.astro`](./decor/DotGrid.astro) | dark hero/header bands: `ArticleLayout`, `ProjectLayout`, `about.astro`, homepage, `/lab`, `Footer.astro` |
| Image gallery (single / two-up / three-up / editorial hero+stack) | [`ImageGallery.astro`](./ImageGallery.astro) — takes `images`, an optional `layout`, and an optional shared `caption` | Not used in any real content yet (only comp-derived), but built and verified — import it inside an `.mdx` article body (MDX component imports don't work in plain `.md` files) |
| Article featured-image hero (full-bleed image + gradient overlay + overlaid title/meta) | `ArticleLayout.astro` — conditional on `heroImage` being set; falls back to the plain dark header when absent | `/articles/[slug]` |
| Project stats card, feature grid, "what I learned" list, screenshot preview (browser-chrome frame around `heroImage`) | `ProjectLayout.astro` — driven by the projects schema's optional `stats`/`features`/`lessons` fields | `/projects/[slug]` |
| Article teaser cards — horizontal compact, featured, vertical grid, large overlay (`components/cards/ArticleCard.dc.html`) | [`ArticleTeaserCard.astro`](./ArticleTeaserCard.astro) — `variant="featured" \| "compact" \| "vertical" \| "overlay"`; falls back to a deterministic gradient + pill color (picked from the entry's slug) when no `heroImage` is set, so cards stay visually varied instead of all sharing one placeholder | `compact`+`featured`: `/lab` "Latest Writing". `vertical`: `/articles` index grid. `overlay`: built and available, not wired up anywhere yet (a natural fit for a future "post of the week" spot) |
| Social icons (footer) | [`icons/SocialIcon.astro`](./icons/SocialIcon.astro) — one `platform` prop (`github`/`youtube`/`instagram`/`tiktok`/`linkedin`), inline SVG paths, `currentColor` fill | `Footer.astro`, driven by `site.json`'s `socialLinks` (each entry is `{ platform, url }`) |

## Built but **not yet used** — reach for these instead of re-inlining the pattern

| Comp pattern | Component | Status |
| --- | --- | --- |
| Tags & Badges (default outline, colored solid) | [`ui/badge.tsx`](./ui/badge.tsx) — has `teal`/`pink`/`yellow`/`blue` variants added on top of shadcn's defaults specifically for this | **Not used anywhere.** Every tag/status pill across the site (`ArticleLayout`, `ProjectLayout`, lab pages, all three index pages) is a hand-written `<span class="rounded-full border ...">` instead. These should be migrated to `<Badge variant="...">` — the hand-rolled spans work but duplicate styling that already exists as a component. |
| Cards (experiment/tool card, 48px icon box + label + arrow) | [`ui/card.tsx`](./ui/card.tsx) | **Not used anywhere.** Every card grid (`/lab` category + featured cards, homepage featured projects, `/projects` index) is a hand-written `<a class="rounded-md border ...">` instead of `<Card>`. Same situation as Badge — works, but duplicates the component. |
| Decorative patterns — hazard stripe (used ✓ via Footer), slash-marks (`/ / / /`), crosshair (`+`) | [`decor/HazardStripe.astro`](./decor/HazardStripe.astro) (used), [`decor/CrosshairMark.astro`](./decor/CrosshairMark.astro) (unused), [`decor/DiagonalBar.astro`](./decor/DiagonalBar.astro) (unused) | The slash-marks (`/ / / /`) and `+` glyph seen in dark hero bands are currently hand-written text (`<div class="... tracking-[6px] ...">/ / / /</div>`), not the `CrosshairMark`/`DiagonalBar` components. |
| Activity Feed row (text list: icon + type label + description + relative time) | [`ActivityItem.astro`](./ActivityItem.astro) + [`ActivityFeed.astro`](./ActivityFeed.astro) (list wrapper) | **Not used anywhere** — replaced on the homepage by [`GitHubContributionGraph.astro`](./GitHubContributionGraph.astro) (see above) and dropped outright on `/lab`. Kept in the tree deliberately as a reference implementation, not because it's about to be wired back in — if a future feed-like need comes up (e.g. a real multi-source timeline), this is a working starting point. |

**If you're touching tags, cards, or those two decor patterns:** prefer wiring up the existing component over adding another inline variant — it's a small, contained refactor (component already exists and is styled; it's just not imported anywhere yet).

## Not from the comps — our own extension

| Component | Why it exists |
| --- | --- |
| [`PageHeader.astro`](./PageHeader.astro) | A generic dark-band + decorative-shape header for content/listing pages that don't have their own dedicated comp. Used in `projects/index.astro`, `articles/index.astro`. **Not used on `about.astro`** — About got its own comp (`ui_kits/lab/About.dc.html`) and is fully bespoke (split hero, bio section, What I Do tiles, timeline, etc.) — see below. |
| `ui/*.tsx` primitives beyond Button/Badge/Card/Command/Dialog/Sheet (`input.tsx`, `input-group.tsx`, `textarea.tsx`, `separator.tsx`) | Installed as part of the shadcn `command`/`sheet` dependency chain (Command's search input uses `InputGroup`), not directly used as standalone components yet. Fine to use if a future page needs a form input — just restyle away from shadcn's default `--primary`/`--radius` look the same way `button.tsx`/`badge.tsx` were (see `tokens.css`'s `@theme inline` block for how shadcn's semantic vars are pointed at our own tokens). |

`about.astro` **is** a 1:1 comp implementation (`ui_kits/lab/About.dc.html`), just not a reusable component — it's a bespoke, one-off page. Its "What I Do" tiles, timeline, "How I Work" list, stack grid, and "Currently Building" items are hardcoded data arrays at the top of the file, not driven by any content collection (only the page's title/description/SEO and the long-form bio paragraphs come from `src/content/pages/about.mdx`). Edit the arrays directly in `about.astro` to update that content — there's no schema to extend.

| Component | Why it exists |
| --- | --- |
| [`Analytics.astro`](./Analytics.astro) | GTM + Datadog RUM aren't in any comp — they're wired from repo secrets at **build time** (`.github/workflows/deploy.yml` → `process.env.GTM_ID` / `DATADOG_RUM_*`), not through Pages CMS content, since they're deployment config rather than editable site content. No-ops locally when the env vars are unset (see `.env.example`). Included via `BaseHead.astro`; the GTM `<noscript>` fallback lives in `BaseLayout.astro` right after `<body>`. RUM uses the real `@datadog/browser-rum` + `@datadog/browser-rum-react` SDKs (not the CDN async snippet) — **two separate `<script>` tags are required**: one `define:vars` script that only sets `window.__DD_RUM_CONFIG__` (Astro skips Vite/module bundling for any script using `define:vars`, so `import` statements silently don't work inside it — this bit us once), and a second plain `<script>` (no `define:vars`) that Vite *does* bundle, which imports the SDK and reads that global. Don't merge them back into one script. |

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

## Media: why `heroImage`/`ogImage` are plain strings, not `astro:assets` `image()`

`heroImage` (articles/projects/lab) and `seo.ogImage` are typed as plain
`z.string().optional()` in `content.config.ts` — **not** the `image()`
content-collection helper, and every place that renders one uses a plain
`<img src={heroImage} />`, not `<Picture>`/`<Image>`. This is deliberate:
Pages CMS's media picker (`.pages.yml`'s `media` config) always writes
root-relative paths like `/uploads/foo.jpg` pointing at `public/uploads/`,
because that's the one convention Pages CMS's own UI supports — it has no
concept of Astro's relative-import-based `image()` schema. `image()` only
accepts a path it can statically resolve to a file under `src/`, so a CMS
write of `/uploads/foo.jpg` fails that schema outright (`ImageNotFound` at
build time) the moment an editor uses the CMS's image field. Don't
reintroduce `image()`/`Picture` for these fields, and don't move
`public/uploads/` back into `src/assets/` — it'll silently break the next
Pages CMS-authored image the moment someone (including future-you) adds
one. The tradeoff: CMS-uploaded images skip Astro's build-time
optimization (no automatic avif/webp/resize) — acceptable since Pages CMS
is the actual authoring surface for this content, not a build script.

## One more gotcha worth knowing

Any plain CSS in `src/styles/global.css` targeting a bare tag selector
(`a`, `h1`–`h6`, etc.) **must** live inside `@layer base { ... }`. Tailwind
wraps its own utilities in CSS layers, and per the cascade-layers spec,
unlayered CSS always beats layered CSS regardless of specificity — an
unlayered `a { color: ... }` would silently override every `text-*` utility
applied to a link anywhere on the site.
