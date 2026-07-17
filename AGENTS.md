## Design system

Before adding UI, check [`src/components/README.md`](./src/components/README.md) — it maps every pattern in the design comps (`_reference/creative_engineer_design_system/`) to the actual component that implements it, flags which comp-derived components (Badge, Card) exist but aren't wired up yet, and documents a real CSS cascade-layers gotcha (`global.css` tag selectors must live in `@layer base` or they silently beat Tailwind utilities).

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
