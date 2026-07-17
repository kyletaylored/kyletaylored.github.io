// Site-wide title/description live in src/data/site.json (CMS-editable via .pages.yml).
import site from './data/site.json';

export const SITE_TITLE = site.siteTitle;
export const SITE_DESCRIPTION = site.siteDescription;

// Every piece of content on this site is authored by the same person —
// there's no per-entry author field in the content schema.
export const AUTHOR_NAME = 'Kyle Taylor';
