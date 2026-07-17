# kyletaylored.github.io

Kyle Taylor's site — portfolio, engineering journal, and Maker Lab. Built with Astro, Tailwind, and a Memphis/Bauhaus-inspired design system content-managed via [Pages CMS](https://pagescms.org).

## Project Structure

```text
├── public/                  # Static assets (favicon, robots.txt, CNAME, uploads/ — Pages CMS media)
├── scripts/                 # One-off/build-time scripts (WP migration, GitHub contribution fetch)
├── src/
│   ├── components/           # Astro/React components (ui/ = shadcn primitives, decor/ = Memphis shapes)
│   ├── content/               # Content collections: articles, projects, lab, pages
│   ├── data/                  # Site settings + build-time generated data (contributions.json)
│   ├── layouts/                # Page layouts (Base/Article/Project/Lab)
│   ├── lib/                    # Shared utilities
│   ├── pages/                  # Routes
│   └── styles/                  # Design tokens + Tailwind entry point
├── .pages.yml                # Pages CMS content schema
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Content lives in `src/content/` as Markdown/MDX and is edited either directly in Git or through Pages CMS (schema defined in `.pages.yml`). See [`src/content.config.ts`](./src/content.config.ts) for the zod schema each collection validates against.

## Commands

All commands run from the root of the project:

| Command                  | Action                                                                                                  |
| :----------------------- | :------------------------------------------------------------------------------------------------------ |
| `npm install`            | Install dependencies                                                                                    |
| `npm run dev`            | Start the local dev server at `localhost:4321`                                                          |
| `npm run build`          | Build the production site to `./dist/` (also builds the Pagefind search index)                          |
| `npm run preview`        | Preview the production build locally                                                                    |
| `npm run migrate:wp`     | One-time migration: pull posts from the WordPress REST API into `src/content/articles/`                 |
| `npm run fetch:activity` | Build-time fetch of the GitHub contribution calendar into `src/data/contributions.json` (requires `GH_ACTIVITY_TOKEN`) — powers the homepage's contribution heatmap |
| `npm run astro ...`      | Run Astro CLI commands (`astro check`, `astro add`, ...)                                                |

### Local search

Global search (Pagefind) indexes the built `dist/` output, so it only works after `npm run build` — search results won't populate against `npm run dev`.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the site and deploys it to GitHub Pages at the custom domain `kyletaylored.com` (see `public/CNAME`). The workflow also runs the contribution-graph fetch script when `GH_ACTIVITY_TOKEN` is configured as a repo secret.

## Stack

Astro · React (islands only, e.g. command palette, mobile nav) · Tailwind CSS v4 · shadcn/ui (`@base-ui/react` primitives) · Pagefind · Pages CMS
