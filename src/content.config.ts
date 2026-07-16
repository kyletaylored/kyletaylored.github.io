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

const authorSchema = z.object({
	name: z.string().default('Kyle Taylor'),
	role: z.string().default('Creative Engineer'),
	avatar: z.string().optional(),
});

const articles = defineCollection({
	loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.union([image(), z.string().url()]).optional(),
			category: z.string(),
			tags: z.array(z.string()).default([]),
			author: authorSchema.default({}),
			draft: z.boolean().default(false),
			sourceUrl: z.string().url().optional(),
			seo: seoSchema.default({}),
		}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			summary: z.string(),
			heroImage: z.union([image(), z.string().url()]).optional(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			status: z.enum(['active', 'archived', 'concept']).default('active'),
			tags: z.array(z.string()).default([]),
			links: z
				.object({
					caseStudy: z.string().optional(),
					source: z.string().url().optional(),
					demo: z.string().url().optional(),
				})
				.default({}),
			stack: z.array(z.string()).default([]),
			featured: z.boolean().default(false),
			seo: seoSchema.default({}),
		}),
});

const lab = defineCollection({
	loader: glob({ base: './src/content/lab', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			heroImage: z.union([image(), z.string().url()]).optional(),
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
