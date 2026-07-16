# Creative Engineer Design System

A design system for **kyletaylor.dev** — the personal site and lab of a Creative Engineer.
Built around the concept of "Creative Engineer" rather than "Full Stack Developer": someone who builds software, AI systems, and physical things, shares everything openly, and treats every project as an experiment worth documenting.

## Sources
- Reference designs: `uploads/lab-design.png` (lab homepage) and `uploads/site-design.png` (multi-surface overview)
- No Figma file or codebase attached — designed from visual references

---

## Brand Identity

**Name:** kyletaylor.dev / kyletaylored  
**Wordmark:** "KYLETAYLOR.DEV" in all-caps, spaced tracking. Logo mark is a bold "K" inside a teal (#28D7E5) square.  
**Tagline options:** "EXPERIMENT. BUILD. SHIP. REPEAT." / "BUILT IN PUBLIC. SHARE EVERYTHING. MAKE IMPACT."  
**Voice:** First person, direct, honest. "Nothing here is perfect." "Everything here is in progress."

## Core Themes
Engineering · AI · Open Source · Design · Making · Teaching · Curiosity

---

## CONTENT FUNDAMENTALS

- **Voice:** Direct, first-person, self-aware. Not corporate. Not modest either.
- **Casing:** ALL CAPS for section labels, nav, tags, category labels. Title case for project names. Sentence case for body.
- **Tone:** Builder's honesty — "This is a work in progress. Just like everything else."
- **Length:** Short. Labels 1-3 words. Descriptions 1-2 sentences max.
- **Emoji:** Never used.
- **Numbers:** Used for GitHub stars (1.2k), time (2h ago), contribution counts (1,349). Technical and factual.
- **Links:** Arrow suffix → on CTAs. "View all →" pattern for section overflow.

---

## VISUAL FOUNDATIONS

### Colors
- **Background:** `#FAF8F3` — warm off-white, like aged paper. Never pure white.
- **Black:** `#111111` — used for primary text and dark hero sections
- **Teal:** `#28D7E5` — primary accent, CTAs, highlights, logo mark
- **Pink:** `#F44D8A` — secondary accent, inline emphasis text, decorative shapes
- **Yellow:** `#FFD54A` — tertiary accent, shapes, decorative elements
- **Blue:** `#348BFF` — quaternary accent, some shapes and icons
- **Red:** `#F25A4C` — error states, "Accent Red" usage in tags and status dots

### Typography
- **Display:** Space Grotesk — Bold/ExtraBold (700-800). Very large, editorial. Used for hero headings.
- **Body:** Space Grotesk — Regular/Medium (400-500). Clean, readable.
- **Mono:** Space Mono — used in terminal UI, code contexts, technical annotations.
- **Scale:** Display 64–96px, H1 40–56px, H2 28–36px, body 15–17px, label 11–13px
- **Tracking:** Labels and nav: `letter-spacing: 0.08em`. Body: normal.
- **Transforms:** Nav and section labels: `text-transform: uppercase`

### Layout
- **Grid:** Swiss-inspired. Generous whitespace. Max-width ~1200px, full-bleed dark sections.
- **Sections:** Clearly delimited. Dark (#111) hero alternates with light (#FAF8F3) content sections.
- **Gutters:** 24px mobile, 48px desktop, 80px+ section padding.

### Shapes & Decoration (Memphis / Bauhaus)
- **Geometric shapes:** Circles, triangles, rectangles floating in hero areas. Not interactive.
- **Dot grids:** 4-5px dots in a regular grid, used in background areas.
- **Diagonal stripes:** Hazard-stripe pattern (black + yellow) used as decorative band.
- **Crosshairs (+):** Small ✕ marks at grid intersections, blueprint-style.
- **Diamond (◆):** Small filled diamonds as decorative accents.
- **Annotation lines:** Thin dashed lines with labels, technical-drawing style.

### Cards
- **Experiment cards:** White bg, 1px `#E0DDDA` border, 4px radius, square icon area (black bg with colored icon), title + description + tags + arrow link.
- **Tool cards:** Thin border, icon (4-color grid pattern), name + description + "Open" button.
- **Project cards:** Image-forward, dark overlay with title/tags below, rounded 4px.

### Buttons
- **Primary:** Solid teal fill, black text, uppercase, 2px border, arrow suffix. `border-radius: 0` (square corners).
- **Secondary:** White/transparent bg, black or white border, uppercase. Square corners.
- **Open button:** Small, 1px border, compact padding.

### Hover / Interaction
- Buttons: slight background shift, cursor pointer
- Cards: subtle border color change or shadow lift
- Links with →: arrow slides right 2-4px on hover
- Nav items: no underline by default, underline or color on hover

### Borders & Radius
- **Cards:** 2–4px radius, 1px solid border
- **Buttons:** 0px radius (sharp corners)
- **Tags/chips:** 999px (full pill)
- **Icon boxes:** 8px radius on dark icon containers

### Animation
- Minimal. No page transitions.
- Arrow hover: `transform: translateX(4px)` on hover, 150ms ease.
- No bouncing, no elaborate entrance animations.

### Shadows
- Cards use no drop shadow — border-only definition.
- Occasional very subtle box-shadow on tool cards.

### Iconography — see ICONOGRAPHY section below

---

## ICONOGRAPHY

Icons are rendered as geometric SVG glyphs inside black square containers (`background: #111`, `border-radius: 8px`). Color is applied to the icon glyph in one of the accent colors (teal, pink, yellow, blue).

- No external icon library identified in the source
- Style: outlined geometric, ~2px stroke weight, simple shapes
- Common icons: terminal prompt `>_`, wrench+screwdriver, `</>` code, brain, CPU chip, cube/3D
- GitHub/Twitter/RSS: social links use standard SVG icons
- CDN substitute: **Lucide Icons** (matching stroke style) via CDN
- Usage: `<i data-lucide="terminal">` or inline SVG

---

## INTENTIONAL ADDITIONS
- `Badge` component: pill-shaped tags not explicitly in source but implied by tag pattern on all cards
- `SectionHeader` component: repeated `• LABEL` + "View all →" pattern extracted as component

---

## File Index

```
readme.md                   — This file
SKILL.md                    — Claude Code skill descriptor
styles.css                  — Global CSS entry (imports only)
tokens/
  colors.css                — Color custom properties
  typography.css            — Type scale + font-face
  spacing.css               — Spacing scale
  effects.css               — Borders, radii, shadows
guidelines/
  colors.card.html          — Color palette specimen
  colors-semantic.card.html — Semantic color usage
  typography-display.card.html
  typography-body.card.html
  typography-mono.card.html
  spacing.card.html
  shapes.card.html          — Memphis geometric decorations
  brand-motifs.card.html    — Blueprint/annotation patterns
components/
  buttons/                  — Button, primary/secondary/ghost
  cards/                    — ExperimentCard, ToolCard
  badges/                   — Badge (pill tag)
  section-header/           — SectionHeader (• LABEL + View all)
  nav/                      — Nav top bar
  activity/                 — ActivityItem (feed row)
ui_kits/
  lab/                      — Lab homepage UI kit
```
