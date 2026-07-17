import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

// Build-time-generated share images, used ONLY as the last-resort fallback
// when a content entry has neither a heroImage nor a manual seo.ogImage set
// (see ArticleLayout/ProjectLayout/LabLayout's `image={...}` prop). Every
// article/project/lab entry gets one here regardless, but most requests for
// this route never happen in practice since a real image wins first.
const articles = await getCollection('articles', ({ data }) => !data.draft);
const projects = await getCollection('projects');
const lab = await getCollection('lab');

const pages = Object.fromEntries([
	...articles.map((entry) => [`articles/${entry.id}`, { title: entry.data.title, description: entry.data.description }]),
	...projects.map((entry) => [`projects/${entry.id}`, { title: entry.data.title, description: entry.data.summary }]),
	...lab.map((entry) => [`lab/${entry.id}`, { title: entry.data.title, description: entry.data.description }]),
]);

export const { getStaticPaths, GET } = await OGImageRoute({
	pages,
	// Our route file is already named `[...slug].png.ts`, so the slug itself
	// must NOT carry a `.png` suffix too — the default getSlug appends one,
	// which doubles up into `foo.png.png` once Astro's file-based routing
	// adds its own extension.
	getSlug: (path) => path,
	getImageOptions: (_path, page: { title: string; description: string }) => ({
		title: page.title,
		description: page.description,
		bgGradient: [[13, 13, 13]],
		border: { color: [40, 215, 229], width: 6, side: 'block-end' },
		padding: 80,
		font: {
			title: { size: 64, weight: 'Bold', color: [250, 248, 243] },
			description: { size: 32, color: [168, 164, 159] },
		},
	}),
});
