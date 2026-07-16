# Product Requirements Document (PRD)

## Kyle Taylor Digital Ecosystem

**Version:** 1.0
**Status:** Draft
**Owner:** Kyle Taylor

---

# 1. Overview

The goal is to build a modern, open-source-first digital presence that serves as both a professional portfolio and an engineering laboratory.

Rather than functioning as a traditional résumé website, the platform should communicate a philosophy of engineering:

> Build interesting things.
> Share everything.
> Document the journey.
> Inspire others.

The ecosystem will consist of two complementary websites:

| Domain               | Purpose                                                                       |
| -------------------- | ----------------------------------------------------------------------------- |
| **kyletaylored.com** | Personal brand, portfolio, writing, maker projects, open source contributions |
| **kyletaylor.dev**   | Interactive demos, experiments, playgrounds, developer tools, prototypes      |

Both websites should share a common visual identity while maintaining distinct purposes.

---

# 2. Goals

## Primary Goals

- Showcase technical expertise
- Showcase creativity
- Build a recognizable personal brand
- Demonstrate breadth of engineering capabilities
- Increase discoverability of open source work
- Serve as a living engineering journal
- Encourage community engagement

---

## Secondary Goals

- Publish technical articles
- Host demos
- Share CAD files
- Share 3D printable designs
- Publish open-source tooling
- Aggregate engineering activity
- Experiment with modern web technologies

---

# 3. Non-Goals

The platform is **not** intended to be:

- a résumé replacement
- a social network
- a traditional blog
- an online store
- a CMS-first website

Everything should remain Git-first.

---

# 4. Audience

## Primary

Software engineers

Engineering managers

Technical recruiters

Open source maintainers

Potential collaborators

Clients

---

## Secondary

Makers

3D printing enthusiasts

Students

AI enthusiasts

Hardware hackers

Woodworkers

---

# 5. Brand Positioning

The brand should communicate:

> Creative Engineer

rather than

> Full Stack Developer

Core themes:

- Engineering
- AI
- Open Source
- Design
- Making
- Teaching
- Curiosity

---

# 6. Design Language

## Inspiration

- Memphis Design
- Swiss Grid
- Bauhaus
- Nintendo
- Retro arcade graphics
- CAD drawings
- Technical blueprints
- Modern editorial layouts

---

## Visual Characteristics

Large typography

Bold geometric shapes

Rounded corners

Diagonal elements

Playful compositions

Minimal color palette

Technical annotations

Blueprint-inspired graphics

Magazine-like layouts

Generous whitespace

---

## Color Palette

Background

```
#FAF8F3
```

Black

```
#111111
```

Teal

```
#28D7E5
```

Pink

```
#F44D8A
```

Yellow

```
#FFD54A
```

Blue

```
#348BFF
```

Accent Red

```
#F25A4C
```

---

# 7. Technology Stack

## Framework

Astro

Reasons:

- GitHub Pages compatible
- Excellent MDX support
- Static-first
- Partial hydration
- React integration
- Excellent performance

---

## UI

React

Tailwind CSS

Motion

shadcn/ui (customized)

Iconify

---

## Content

MDX

Markdown

Pages CMS

GitHub

GitHub Actions

---

## Deployment

GitHub Pages

GitHub Actions

Cloudflare DNS

---

# 8. Information Architecture

## kyletaylored.com

```
Home

About

Projects

Articles

Open Source

Maker Lab

Talks

Uses

Now

Contact
```

---

## kyletaylor.dev

```
Experiments

Tools

Playground

AI

Graphics

Hardware

Utilities

API Demos
```

---

# 9. Homepage

The homepage should immediately communicate breadth.

## Hero

Large typography.

Example:

```
Building software,
AI systems,
and physical things.
```

Supporting copy:

Short paragraph describing engineering philosophy.

Primary CTA

View Projects

Secondary CTA

Visit the Lab

---

## Featured Work

Grid of flagship projects.

Include:

- enterprise software
- AI
- hardware
- maker projects

---

## Recent Activity

Automatically aggregated timeline.

Examples:

- published article
- merged PR
- GitHub release
- new experiment
- new project
- CAD upload

---

## Open Source

Highlighted repositories.

Contribution metrics.

Recent releases.

---

## Maker Lab Preview

Photography.

3D printing.

Woodworking.

Electronics.

---

## Writing

Latest articles.

---

## Footer

Social links.

GitHub.

RSS.

License.

---

# 10. Content Collections

## Projects

Each project contains:

```
title

description

status

cover image

gallery

repository

demo

tech stack

timeline

related articles

downloads
```

---

## Articles

```
title

summary

date

tags

reading time

series

cover image
```

---

## Open Source

```
repository

description

language

license

stars

forks

documentation

latest release
```

---

## Maker Projects

```
photos

STL

STEP

Fusion files

assembly guide

materials

print settings

firmware

BOM

downloads
```

---

## Talks

```
conference

slides

video

photos

resources
```

---

# 11. Interactive Features

## Command Palette

Keyboard shortcut:

```
⌘K
```

Capabilities:

Search

Navigate

Open projects

Launch demos

Search articles

Open repositories

---

## Theme

Light

Dark

Retro

High Contrast

---

## Search

Global search across:

Projects

Articles

Repositories

Experiments

Tags

Technologies

---

## Activity Timeline

Aggregate:

GitHub

Articles

Projects

Releases

Experiments

Maker updates

---

## Reading Progress

Progress bar.

Estimated reading time.

Table of contents.

---

## RSS

Articles

Projects

Releases

---

# 12. Open Source Integration

Automatically surface:

Pinned repositories

Recent repositories

Recent releases

Latest commits

Contribution graph

Maintained projects

---

# 13. Maker Lab

Dedicated section showcasing:

3D printing

Woodworking

Laser engraving

CAD

Fusion

PCB design

Electronics

Embedded systems

Home automation

Each project should include downloadable assets when applicable.

---

# 14. Engineering Journal

Instead of a traditional blog.

Content types:

Lessons learned

Architecture decisions

Project logs

Build diaries

Experiments

Failure reports

Benchmarks

Tutorials

---

# 15. SEO

Every page should include:

Structured data

OpenGraph

Twitter cards

Canonical URLs

Sitemap

RSS

Robots.txt

JSON-LD

Automatic metadata generation

---

# 16. Performance Goals

Lighthouse

Performance

95+

Accessibility

100

SEO

100

Best Practices

100

---

Initial Load

<100 KB JavaScript

---

Image Strategy

AVIF

WebP

Responsive images

Lazy loading

Blur placeholders

---

# 17. Accessibility

WCAG AA

Keyboard navigation

Reduced motion

High contrast support

Semantic HTML

Screen reader labels

Visible focus states

Skip navigation

---

# 18. Future Integrations

GitHub GraphQL API

GitHub Discussions

RSS aggregation

Bluesky

YouTube

MakerWorld

Printables

Thingiverse

Hackaday

Dev.to

Mastodon

Podcast feeds

---

# 19. Stretch Goals

Interactive project diagrams

CAD model viewers

Embedded STL viewers

Git commit visualizations

Project dependency graphs

3D animated homepage

Terminal interface

Interactive blueprint mode

AI-powered site search

Natural language navigation

Voice search

---

# 20. Success Metrics

Within 6 months:

- Consistently publish project updates through Git-based workflows.
- Increase visibility and engagement with open source repositories.
- Establish a recognizable personal brand centered on engineering and making.
- Provide a polished portfolio experience while making experimentation easy to share.
- Maintain excellent Core Web Vitals and Lighthouse scores.
- Ensure all content is fully version-controlled, portable, and statically deployable.

---

# 21. Guiding Principles

1. **Content lives in Git.** Every page, article, and project is versioned and reviewable through pull requests.

2. **Build in public.** Document not only polished outcomes, but experiments, prototypes, failures, and lessons learned.

3. **Show, don't tell.** Demonstrate expertise through interactive projects, detailed case studies, downloadable assets, and technical write-ups instead of listing skills.

4. **Design with intention.** Every visual element should reinforce the intersection of engineering precision and creative exploration.

5. **Performance is a feature.** Favor static generation, progressive enhancement, and minimal JavaScript over unnecessary complexity.

6. **Open by default.** Whenever possible, publish source code, documentation, CAD files, APIs, and implementation details to encourage learning and collaboration.

7. **Evolve continuously.** Treat the website as a living product with iterative improvements rather than a finished portfolio.

---

## Recommendation: Treat This as an Open Source Product

One addition I'd make to the PRD is to treat the website itself as an open source project, not just a website. Create a public GitHub repository with proper documentation (`README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `LICENSE`, and GitHub Discussions), semantic versioning, automated releases, and a public roadmap. The site then becomes a showcase of your engineering practices as much as your work.

I'd also split the implementation into phases:

- **Phase 1:** Core platform, design system, homepage, projects, articles, Pages CMS, GitHub Pages deployment.
- **Phase 2:** Open Source dashboard, Maker Lab, activity timeline, command palette, search.
- **Phase 3:** Interactive demos, AI-powered search, CAD/STL viewers, advanced visualizations, and additional integrations.

That approach keeps the initial launch achievable while leaving plenty of room for the site to grow organically, just like the projects it will showcase.
