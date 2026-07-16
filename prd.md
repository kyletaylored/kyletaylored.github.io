### Product Requirements Document (PRD): Kyle Taylor Digital Ecosystem

**Version:** 1.2 | **Status:** Finalized for Handoff | **Owner:** Kyle Taylor

#### 1. Overview & Core Philosophy

The goal is to build a modern, open-source-first digital presence that serves as a professional portfolio, an engineering laboratory, and a living engineering journal. The project will be treated as an open-source product itself, complete with proper documentation, semantic versioning, and public roadmaps.
**Core theme:** Build interesting things. Share everything. Document the journey. Inspire others.

#### 2. Domain & SEO Strategy (Consolidated Authority)

To ensure SEO authority compounds rather than dilutes, the ecosystem will utilize a unified domain structure.

- **kyletaylored.com:** The singular authoritative content hub. This domain will host all long-form content, technical writing, project documentation, the portfolio, and the "Lab" experience.
- **kyletaylored.com/lab:** A distinct destination within the main domain. When visitors enter the Lab, the experience shifts to a dark mode interface with different navigation and typography, akin to "entering another wing of a museum".
- **kyletaylor.dev:** Reserved strictly as an execution environment and infrastructure domain. It will host standalone deployed interactive apps and live demos, but no core content.

Every project page should prominently link three facets: the methodology/architecture, the source code/PRs, and the live interactive demo.

#### 3. Development Workflow & Repository State

- **Repository:** We are working within the existing Jekyll site repository (`kyletaylored.github.io`).
- **Base Framework:** A base installation of Astro.js is already present in the repository.
- **Design Assets:** Complete visual comps and design references are located in the `_reference` folder.
- **Content Migration (Action Required):** Existing Jekyll content has been moved to the `_archive` folder to keep the root clean. The agent is instructed to migrate and incorporate this existing content back into the new Astro/MDX structure. **Note:** We do not need to provide or configure legacy URL redirects for this archived content.

#### 4. Technology Stack & Content Modeling

- **Framework:** Astro (Static-first, GitHub Pages compatible, excellent MDX support).
- **UI/Styling:** React, Tailwind CSS, and Motion. **Crucially, the agent will utilize the `shadcn studio pro mcp`** to leverage existing components and rapidly build new ones based on the provided comps.
- **Content Management:** Pages CMS will be used for content modeling and CMS capabilities. Configuration will be managed via the `.pages.yml` file. Content will live in Git (Markdown/MDX), keeping the ecosystem Git-first.
- **Agent Task for CMS Schema:** The agent must design and configure the `.pages.yml` schema from scratch. The agent should infer the necessary content fields (e.g., `string`, `rich-text`, `image`, `date`, `object`) based on the design comps. **Crucially, the schema must explicitly support modern SEO practices by including dedicated metadata fields** (e.g., structured data, OpenGraph, dynamic JSON-LD, meta titles, descriptions).

#### 5. Design Language

- **Style:** Memphis Design, Swiss Grid, and Bauhaus inspired. It will feature large typography, bold geometric shapes, rounded corners, and minimal color palettes.
- **Brand Identity:** Focused on positioning as a "Creative Engineer" rather than just a "Full Stack Developer".
- **The Lab Interface:** Terminal-inspired UI, technical annotations, and retro arcade/CAD visual cues.
- **Design system:** Availabe in `_reference/creative_engineer_design_system/Design Reference.dc.html`

#### 6. Phased Development Plan

To keep the launch achievable while leaving room for organic growth, the implementation is split into the following explicitly defined phases:

- **Phase 1: Foundation & Content Architecture**
  - Initialize and configure the Astro base project against the provided Tailwind/design token specifications.
  - Define the content schemas in `.pages.yml` using Pages CMS field types to support both the visual design and modern SEO metadata requirements.
  - Establish the base layout templates and MDX routing.
  - Set up the GitHub Actions deployment workflow for Astro to GitHub Pages.

- **Phase 2: UI Construction & Design System (via shadcn MCP)**
  - Analyze the comps in the `_reference` folder to establish the core global components.
  - Use the `shadcn studio pro mcp` to generate and customize the required UI elements (buttons, cards, grids, navbars).
  - Implement the primary light theme for `kyletaylored.com`.
  - Implement the distinct "Lab" dark mode layout and toggle logic for the `/lab` route.

- **Phase 3: Core Features & Content Integration**
  - Build out the Homepage, Project detail pages, Article layouts, and Maker Lab section.
  - Migrate existing content from `_archive` into the new MDX structure via the newly defined Pages CMS schema formatting.
  - **Agent Autonomy (Recent Activity Timeline):** The agent will determine the best technical approach to build the "Recent Activity" timeline. The agent is free to implement this via build-time scripts, client-side fetching, or another optimal method, and must specify if any repository secrets (e.g., `GITHUB_TOKEN`) need to be added by the owner.

- **Phase 4: Interactivity & Optimization**
  - Build the interactive Command Palette (search, navigate, launch demos).
  - Integrate global site search.
  - Implement stringent SEO requirements (Sitemaps, RSS, Robots.txt) based on the CMS fields created in Phase 1.
  - Optimize for 100/100 Lighthouse scores, ensuring <100 KB initial JavaScript load and responsive AVIF/WebP image strategies.
