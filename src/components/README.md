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
| Decorative shapes — circle, triangle, diamond, dot grid | [`decor/Circle.astro`](./decor/Circle.astro), [`decor/Triangle.astro`](./decor/Triangle.astro), [`decor/Diamond.astro`](./decor/Diamond.astro), [`decor/DotGrid.astro`](./decor/DotGrid.astro) | dark hero/header bands: `ArticleLayout`, `ProjectLayout`, `about.astro`, `Footer.astro` — plus composed into the 3 components below |
| Hero art (`guidelines/Art Blocks.dc.html`'s "Hero Art — Circle + Triangle Cluster") | [`decor/HeroArt.astro`](./decor/HeroArt.astro) — one fixed composition (pink circle, teal triangle, yellow circle, blue diamond, dot grid, crosshair, slash-marks, hazard-stripe block), not prop-configurable | homepage hero, `/lab` hero. **Not** used on `about.astro`'s hero (a bespoke split avatar-panel layout the fixed composition would clash with) or `ArticleLayout`/`ProjectLayout`'s no-`heroImage` headers (shorter, intentionally low-opacity — HeroArt's shapes assume a ~500px+ tall section) — those three keep their own hand-placed `Circle`/`Triangle`/`Diamond` combinations. |
| Floating art panel (mid-section, from the same guideline) | [`decor/FloatingArtPanel.astro`](./decor/FloatingArtPanel.astro) — smaller triangle+circle+diamond; takes no default sizing/position classes, just a `class` prop, so a caller decides whether it's its own column or (as used today) a low-opacity `absolute inset-0` backdrop behind other content | homepage, as a background layer behind "Latest Articles" (used to be its own fixed-width middle column between "GitHub Activity" and "Latest Articles" — that squeezed both, so it moved behind the wider "Latest Articles" column instead) |
| Light-section art (dot-grid + diamond scatter, right-edge only) | [`decor/LightSectionArt.astro`](./decor/LightSectionArt.astro) | `/projects` index, `/articles` index, `/lab`'s "Everything in the Lab" section — all three were flat/undecorated before this |
| Image gallery (single / two-up / three-up / editorial hero+stack) | [`ImageGallery.astro`](./ImageGallery.astro) — takes `images`, an optional `layout`, and an optional shared `caption` | Not used in any real content yet (only comp-derived), but built and verified — import it inside an `.mdx` article body (MDX component imports don't work in plain `.md` files) |
| Article featured-image hero (full-bleed image + gradient overlay + overlaid title/meta) | `ArticleLayout.astro` — conditional on `heroImage` being set; falls back to the plain dark header when absent | `/articles/[slug]` |
| Project stats card, feature grid, "what I learned" list, screenshot preview (browser-chrome frame around `heroImage`) | `ProjectLayout.astro` — driven by the projects schema's optional `stats`/`features`/`lessons` fields | `/projects/[slug]` |
| Article teaser cards — horizontal compact, featured, vertical grid, large overlay (`components/cards/ArticleCard.dc.html`) | [`ArticleTeaserCard.astro`](./ArticleTeaserCard.astro) — `variant="featured" \| "compact" \| "vertical" \| "overlay"`; `entry` accepts `articles`/`projects`/`lab` (description/category normalized per collection — projects' `summary`/`status`, lab's `labCategory` — inside the component); the image always falls back through `seo.ogImage ?? heroImage ?? /og/<collection>/<id>.png` (the satori/resvg generator, see below), so cards never show a bare gradient placeholder; `compact`'s thumbnail is a fixed square (`aspect-square w-24`, not sized off the grid row) so a landscape OG image never overflows a short row | `compact`+`featured`: `/lab` "Latest Writing", homepage "Featured Projects" (`featured`, `projects` entries) + "Latest Articles" (`compact`). `vertical`: `/articles` index grid. `overlay`: built and available, not wired up anywhere yet (a natural fit for a future "post of the week" spot) |
| Social icons (footer) | [`icons/SocialIcon.astro`](./icons/SocialIcon.astro) — one `platform` prop (`github`/`youtube`/`instagram`/`tiktok`/`linkedin`/`threads`), inline SVG paths, `currentColor` fill | `Footer.astro` wraps each icon in a per-platform colored square (`socialStyles` map — bare `currentColor` icons read poorly against the footer's decorative shapes), driven by `site.json`'s `socialLinks` (each entry is `{ platform, url }`) |
| Parallax section (`components/Parallax Section.dc.html`) — `dark`/`light`/`split`/`teal` variants, decorative art layer drifts vertically as the section crosses the viewport, content layer stays fixed | [`ParallaxSection.astro`](./ParallaxSection.astro) — `variant` prop; `dark`/`light` reuse `HeroArt`/`LightSectionArt` outright as the art layer, `split`/`teal` compose their own scene from the same `decor/*` shapes. One shared inline `<script>` drives every instance via `requestAnimationFrame`, and is skipped entirely under `prefers-reduced-motion: reduce` — the comp's own script doesn't handle this, so it's a real gap closed here, not a fidelity trade-off. One accepted fidelity gap: the comp's tall asymmetric CSS-border-trick triangles are approximated with `Triangle.astro`'s equilateral shape rather than adding one-off width/height-split props | homepage hero (`dark` variant, replacing the old static `HeroArt` + content hero band) |

## Built but **not yet used** — reach for these instead of re-inlining the pattern

| Comp pattern | Component | Status |
| --- | --- | --- |
| Tags & Badges (default outline, colored solid) | [`ui/badge.tsx`](./ui/badge.tsx) — has `teal`/`pink`/`yellow`/`blue` variants added on top of shadcn's defaults specifically for this | **Not used anywhere.** Every tag/status pill across the site (`ArticleLayout`, `ProjectLayout`, lab pages, all three index pages) is a hand-written `<span class="rounded-full border ...">` instead. These should be migrated to `<Badge variant="...">` — the hand-rolled spans work but duplicate styling that already exists as a component. |
| Cards (experiment/tool card, 48px icon box + label + arrow) | [`ui/card.tsx`](./ui/card.tsx) | **Not used anywhere.** Every card grid (`/lab` category + featured cards, homepage featured projects, `/projects` index) is a hand-written `<a class="rounded-md border ...">` instead of `<Card>`. Same situation as Badge — works, but duplicates the component. |
| Decorative patterns — hazard stripe (used ✓ via Footer + HeroArt), slash-marks (`/ / / /`), crosshair (`+`) | [`decor/HazardStripe.astro`](./decor/HazardStripe.astro) (used), [`decor/CrosshairMark.astro`](./decor/CrosshairMark.astro) (unused), [`decor/DiagonalBar.astro`](./decor/DiagonalBar.astro) (unused) | Still true even after adding `HeroArt.astro`: its slash-marks and `+` are hand-written text/spans inline in the component, not `CrosshairMark`/`DiagonalBar`. `CrosshairMark.astro` actually draws something different from the guideline's spec — a circled crosshair/scope icon — where the guideline (and every real usage on the site) wants a bare `+` glyph (`font-weight: 200`), so it wasn't a fit even for the new component. `DiagonalBar.astro` is hardcoded to `rotate(-8deg)` with no way to override it, and the guideline's Hero Art composition wants one at `-30deg` — rather than add a `rotate` prop for a single caller, `HeroArt` left the diagonal bar (and the tiny "□ — ·" blueprint annotation) out entirely as a deliberate simplification; it's a minor fidelity gap versus the full guideline composition, not a bug. |
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

## OG/share images: satori + resvg, not astro-og-canvas

`src/pages/og/[...slug].png.ts` generates the fallback share image for any
article/project/lab entry without a `heroImage`/`seo.ogImage` (see the
media gotcha above). Standalone pages (home, about, contact, and the
projects/articles/lab index pages) aren't content-collection entries, so
they never hit that fallback chain — `src/pages/og/[page].png.ts` covers
those instead, reusing the same satori/resvg pipeline and the shared
color tokens + decorative-shape spec from `src/lib/bannerColors.ts` /
`src/lib/bannerArt.ts` (see also `src/pages/design/banners/[variant].png.ts`),
just without the kicker-pill/byline row article cards have. Each of those
6 pages passes `image="/og/<page>.png"` into `BaseLayout` to wire it up —
add a new page here (`pages` map + the `BaseLayout` `image` prop) any
time a new standalone route is added, or it'll silently ship with no
social preview image at all.

It used to use `astro-og-canvas`, which was replaced
because its layout model (one title block + one description block over a
background) can't reproduce `ui_kits/banners/Social Banners.dc.html`'s real
layout — brand row, category pill, byline + date/read-time row, decorative
shapes, pink accent bar. It's now a direct `satori` → `@resvg/resvg-js`
pipeline (the same pattern Astro's own docs recommend for dynamic OG
images), with fonts fetched from Fontsource's API at build time (same
approach `astro-og-canvas` used internally, so it's a proven pattern here).

Two satori quirks that cost real debugging time, worth knowing before
touching this file:
- **Every container needs an explicit `display: 'flex'`.** Satori has no
  concept of default block layout — a `div` with children but no
  `display` set won't lay them out at all.
- **The CSS "triangle via transparent borders" trick does not render in
  satori.** It silently produces a plain rectangle instead of a triangle.
  Use a `transform: rotate(45deg)` square (a diamond) for corner accents
  instead — verified working, see the bottom-right decoration in the OG
  template.
- Flex children default to `align-items: stretch` down a `flexDirection:
  column` parent, same as real CSS — a pill/badge-shaped element needs an
  explicit `alignSelf: 'flex-start'` or it stretches to the parent's full
  width instead of hugging its own content.

## `/lab` index: one unified tagged grid, not per-category sections

`src/pages/lab/index.astro` used to stack a separate `<section>` per
`labCategory` value — looked fine with lots of content, but with only 1-2
entries in some categories it left large empty gaps between sections. It's
now one grid (`#lab-cards`) of every lab entry, each card showing a colored
category tag, with filter pills (`#lab-grid`'s button row) and the "Explore
the Lab" tiles both driving the same client-side filter via a shared
`data-lab-filter` attribute — clicking either updates the URL hash and
re-filters `[data-lab-card]` elements by `data-category`. This is the one
plain `<script>` (not a `client:idle` React island) outside the Command
Palette/mobile nav on the whole site — it's simple enough (attribute-based
show/hide, no state library) that reaching for React would be overkill, but
if you're adding another filterable listing elsewhere, this is the pattern
to copy rather than reinventing it as a component.

## Art Blocks composition rules

`guidelines/Art Blocks.dc.html` specs 6 rules for composing decorative
shapes — worth knowing if you're placing `Circle`/`Triangle`/`Diamond`/
`DotGrid` by hand instead of reaching for `HeroArt`/`FloatingArtPanel`/
`LightSectionArt`:

1. **Go large** — 100–200px minimum. Small shapes read as mistakes.
2. **Clip at edges** — position circles/triangles so they bleed off the
   section edge (negative offsets). Fully-contained shapes look like clip art.
3. **Triangle behind, circle in front** — the teal triangle sits at a lower
   z-index than the pink circle; the circle overlaps it. Canonical pairing.
4. **Right side, always** — art lives on the right side of dark hero
   sections; left side is text.
5. **Max 3 accent colors per scene** — pink + teal + yellow is the
   canonical hero trio. Don't mix all 6 palette colors into one composition.
6. **Small details anchor large shapes** — pair big shapes with a
   micro-detail (crosshair, slash-marks + yellow square, dot grid, diamond)
   for the "blueprint" feel.

## One more gotcha worth knowing

Any plain CSS in `src/styles/global.css` targeting a bare tag selector
(`a`, `h1`–`h6`, etc.) **must** live inside `@layer base { ... }`. Tailwind
wraps its own utilities in CSS layers, and per the cascade-layers spec,
unlayered CSS always beats layered CSS regardless of specificity — an
unlayered `a { color: ... }` would silently override every `text-*` utility
applied to a link anywhere on the site.
