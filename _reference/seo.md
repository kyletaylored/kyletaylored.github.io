I actually think consolidating is the stronger long-term strategy.

Not because having multiple domains is "bad." It's because **authority compounds**, and right now you're building _a brand_, not separate businesses.

## I'd recommend this architecture

```
kyletaylored.com
│
├── /
├── /projects
├── /articles
├── /opensource
├── /maker
├── /about
├── /uses
├── /now
│
├── /lab
│     ├── /
│     ├── /experiments
│     ├── /tools
│     ├── /playground
│     ├── /ai
│     └── /hardware
│
└── /projects/*
```

Then use

```
kyletaylor.dev
```

for actual applications.

Example:

```
kyletaylor.dev/json-diff

kyletaylor.dev/color-palette

kyletaylor.dev/rag-playground

kyletaylor.dev/agent-chat

kyletaylor.dev/particle-engine
```

These are applications.

Not content.

---

## Why this is better for SEO

Google doesn't really care about domains.

It cares about **authority**.

Imagine after 5 years.

Option A

```
kyletaylored.com

100 articles
50 projects
30 experiments
200 backlinks

Authority split:
100%
```

Option B

```
kyletaylored.com

60 articles
20 projects

Authority

50%

-----------

kyletaylor.dev

30 experiments
20 tools

Authority

50%
```

Now you have two sites competing for authority.

Every backlink is diluted.

Every article is diluted.

Every GitHub README links to two places.

Every social post splits your traffic.

---

## Internal linking becomes powerful

Imagine someone lands here:

```
Building Reliable AI Agents

↓

Related

AI Home Assistant

↓

View source

↓

Read architecture

↓

Try demo

↓

Download STL

↓

Related ESP32 project
```

Every click stays on the same domain.

Google loves this.

Your users love this.

---

## The Lab becomes a destination

Instead of

```
kyletaylor.dev
```

I'd actually brand it like this.

```
KYLETAYLORED

LAB
```

Navigation

```
Home

Projects

Articles

Open Source

Maker Lab

LAB

About
```

When someone enters

```
/lab
```

the whole experience changes.

Dark mode.

Different navigation.

Different typography.

Same domain.

Think of it like entering another wing of a museum.

---

## Use the .dev domain as infrastructure

The `.dev` domain is fantastic, just not necessarily as the home for content.

Some ideas:

```
play.kyletaylor.dev

api.kyletaylor.dev

tools.kyletaylor.dev

lab.kyletaylor.dev

demo.kyletaylor.dev

preview.kyletaylor.dev
```

or simply

```
kyletaylor.dev/json-diff

kyletaylor.dev/prompt-lab

kyletaylor.dev/llm-chat

kyletaylor.dev/terminal

kyletaylor.dev/graph
```

Each is a standalone deployed app.

---

## This is also cleaner from a GitHub perspective

Imagine one repository.

```
kyletaylored

content/

projects/

articles/

lab/

maker/

components/

```

Astro builds

```
/

/projects

/articles

/lab

/maker
```

Every app inside `/lab` can still be a separate GitHub repository if appropriate.

For example:

```
json-diff

↓

github.com/kyletaylored/json-diff

↓

Deploys to

kyletaylor.dev/json-diff

↓

Portfolio page

kyletaylored.com/projects/json-diff

↓

"Launch Demo"

↓

kyletaylor.dev/json-diff
```

This is a pattern used by many successful open source projects:

- **Project page** (marketing, documentation, case study) lives on the main site.
- **Interactive app** lives on a dedicated deployment.

---

## A pattern I really like

Think of your ecosystem as three layers:

```
kyletaylored.com

The Story
```

Who you are.

Why you built it.

Architecture.

Lessons learned.

Documentation.

---

```
github.com/kyletaylored

The Code
```

Issues.

PRs.

Source.

Releases.

Packages.

---

```
kyletaylor.dev

The Product
```

Interactive.

Runnable.

Live demos.

Tools.

Experiments.

---

Each site has a distinct responsibility.

---

## One thing I'd definitely add

Because you're an open source advocate, I'd make every project page prominently link all three facets:

```
───────────────────────────────

AI Home Assistant

[ Read Case Study ]

[ View Source ]

[ Launch Demo ]

───────────────────────────────

Case Study
→ kyletaylored.com

Source
→ GitHub

Demo
→ kyletaylor.dev
```

That's an elegant mental model. Visitors can read about your thinking, inspect the implementation, and try the software without wondering where anything lives.

If I were designing this from scratch today, that's the architecture I'd choose. It keeps **all of your long-form content, technical writing, project documentation, and portfolio under one authoritative domain**, while reserving **`kyletaylor.dev` as the execution environment** where code actually runs. It gives you the SEO benefits of a unified content hub while preserving the flexibility and "developer playground" feel that makes a `.dev` domain so appealing.
