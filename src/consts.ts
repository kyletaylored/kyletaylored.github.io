// Site-wide title/description live in src/data/site.json (CMS-editable via .pages.yml).
import site from './data/site.json';

export const SITE_TITLE = site.siteTitle;
export const SITE_DESCRIPTION = site.siteDescription;

// Every piece of content on this site is authored by the same person —
// there's no per-entry author field in the content schema.
export const AUTHOR_NAME = 'Kyle Taylor';
export const AUTHOR_GRAVATAR_HASH = 'c42e5a148b2134b8024ee33e2e3ff9d76222d96e1d4927164d8afe0ffcb4003e';
export const CONTACT_EMAIL = 'hey@kyletaylored.com';
export const FORMSPREE_FORM_ID = 'xzdnegan';