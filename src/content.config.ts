import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const seoSchema = z.object({
	metaTitle: z.string().optional(),
	metaDescription: z.string().optional(),
	ogImage: z.string().optional(),
	canonicalUrl: z.string().url().optional(),
	noindex: z.boolean().default(false),
	jsonLd: z.record(z.any()).optional(),
});

const articles = defineCollection({
	loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.string().optional(),
			category: z.string(),
			tags: z.array(z.string()).default([]),
			draft: z.boolean().default(false),
			sourceUrl: z.string().url().optional(),
			seo: seoSchema.default({}),
		}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z.object({
			title: z.string(),
			summary: z.string(),
			heroImage: z.string().optional(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			status: z.enum(['active', 'archived', 'concept']).default('active'),
			// 'role' entries represent a job/company era rather than a single
			// piece of software — `title` becomes the company name, `role` is
			// the job title, and `brandColor` tints the page's accent shapes
			// instead of the default teal/pink. `features` becomes "notable
			// work built there" (each optionally linking out via `href`) and
			// `lessons` becomes what that role taught. See components/README.md.
			kind: z.enum(['project', 'role']).default('project'),
			role: z.string().optional(),
			brandColor: z.string().optional(),
			tags: z.array(z.string()).default([]),
			links: z
				.object({
					caseStudy: z.string().optional(),
					source: z.string().url().optional(),
					demo: z.string().url().optional(),
					company: z.string().url().optional(),
				})
				.default({}),
			stack: z.array(z.string()).default([]),
			featured: z.boolean().default(false),
			stats: z
				.object({
					stars: z.string().optional(),
					forks: z.string().optional(),
					lastCommit: z.string().optional(),
					license: z.string().optional(),
					version: z.string().optional(),
				})
				.optional(),
			features: z
				.array(
					z.object({
						icon: z.string().optional(),
						title: z.string(),
						description: z.string(),
						// Plain string, not `.url()` — a "notable work" link may point
						// at a relative in-site path (e.g. an article write-up) as
						// easily as an external URL.
						href: z.string().optional(),
					}),
				)
				.default([]),
			lessons: z
				.array(
					z.object({
						title: z.string(),
						description: z.string(),
					}),
				)
				.default([]),
			seo: seoSchema.default({}),
		}),
});

const lab = defineCollection({
	loader: glob({ base: './src/content/lab', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			heroImage: z.string().optional(),
			labCategory: z.enum(['experiments', 'tools', 'playground', 'ai', 'hardware']),
			tags: z.array(z.string()).default([]),
			status: z.enum(['wip', 'stable', 'archived']).default('wip'),
			demoUrl: z.string().url().optional(),
			sourceUrl: z.string().url().optional(),
			seo: seoSchema.default({}),
		}),
});

const pages = defineCollection({
	loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			seo: seoSchema.default({}),
		}),
});

export const collections = { articles, projects, lab, pages };
