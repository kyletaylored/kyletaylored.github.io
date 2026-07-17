/**
 * One-time WordPress -> MDX migration.
 *
 * Pulls all posts from the WordPress REST API and writes one .mdx file per
 * post into src/content/articles/. Re-runnable: always overwrites the
 * corresponding <slug>.mdx deterministically, so any manual edits made to a
 * previously migrated file will be clobbered on re-run — this is a one-time
 * migration aid, not a sync pipeline.
 *
 * Usage: npm run migrate:wp
 */
// @ts-expect-error - `he` ships no type declarations
import he from 'he';
import TurndownService from 'turndown';

const { decode } = he;
import { gfm } from 'turndown-plugin-gfm';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const WP_BASE = 'https://dev-kyletaylored-wp.pantheonsite.io/wp-json/wp/v2';
const OUT_DIR = path.resolve(import.meta.dirname, '../src/content/articles');

interface WpTerm {
	id: number;
	name: string;
	slug: string;
}

interface WpPost {
	id: number;
	date_gmt: string;
	slug: string;
	title: { rendered: string };
	excerpt: { rendered: string };
	content: { rendered: string };
	categories: number[];
	tags: number[];
	jetpack_featured_media_url?: string;
	_embedded?: {
		'wp:featuredmedia'?: Array<{ source_url?: string }>;
	};
}

async function fetchAllPosts(): Promise<WpPost[]> {
	const posts: WpPost[] = [];
	let page = 1;
	let totalPages = 1;

	do {
		const res = await fetch(`${WP_BASE}/posts?per_page=20&_embed&page=${page}`);
		if (!res.ok) throw new Error(`Failed to fetch posts page ${page}: ${res.status}`);
		totalPages = Number(res.headers.get('X-WP-TotalPages') ?? '1');
		posts.push(...(await res.json()));
		page++;
	} while (page <= totalPages);

	return posts;
}

async function fetchTermMap(endpoint: 'categories' | 'tags'): Promise<Map<number, WpTerm>> {
	const res = await fetch(`${WP_BASE}/${endpoint}?per_page=100`);
	if (!res.ok) throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
	const terms: WpTerm[] = await res.json();
	return new Map(terms.map((t) => [t.id, t]));
}

function stripTags(html: string): string {
	return decode(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')).trim();
}

function buildTurndown(): TurndownService {
	const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
	turndown.use(gfm);

	// Preserve fenced code blocks with a language tag from WP's Gutenberg
	// code blocks (<pre class="wp-block-code"><code class="language-x">...</code></pre>).
	turndown.addRule('wpCodeBlock', {
		filter: (node) => node.nodeName === 'PRE' && node.firstChild?.nodeName === 'CODE',
		replacement: (_content, node) => {
			const codeEl = node.firstChild as HTMLElement;
			const langMatch = /language-(\S+)/.exec(codeEl.getAttribute?.('class') ?? '');
			const lang = langMatch?.[1] ?? '';
			const code = codeEl.textContent ?? '';
			return `\n\n\`\`\`${lang}\n${code}\n\`\`\`\n\n`;
		},
	});

	return turndown;
}

function toYamlString(value: string): string {
	return JSON.stringify(value);
}

function toYamlList(values: string[]): string {
	if (values.length === 0) return '[]';
	return `[${values.map(toYamlString).join(', ')}]`;
}

async function main() {
	await mkdir(OUT_DIR, { recursive: true });

	const [posts, categoryMap, tagMap] = await Promise.all([
		fetchAllPosts(),
		fetchTermMap('categories'),
		fetchTermMap('tags'),
	]);

	const turndown = buildTurndown();

	console.log(`Fetched ${posts.length} posts from WordPress.`);

	for (const post of posts) {
		const title = decode(post.title.rendered);
		const description = stripTags(post.excerpt.rendered).replace(/\s*Continue reading.*$/i, '').trim();
		const pubDate = new Date(post.date_gmt + 'Z').toISOString().slice(0, 10);

		const categoryNames = post.categories.map((id) => categoryMap.get(id)?.name).filter(Boolean) as string[];
		const tagNames = post.tags.map((id) => tagMap.get(id)?.name).filter(Boolean) as string[];
		const category = categoryNames[0] ?? 'Uncategorized';
		const tags = Array.from(new Set([...categoryNames.slice(1), ...tagNames]));

		const heroImage = post.jetpack_featured_media_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

		const body = turndown.turndown(post.content.rendered);

		const frontmatter = [
			'---',
			`title: ${toYamlString(title)}`,
			`description: ${toYamlString(description)}`,
			`pubDate: ${pubDate}`,
			...(heroImage ? [`heroImage: ${toYamlString(heroImage)}`] : []),
			`category: ${toYamlString(category)}`,
			`tags: ${toYamlList(tags)}`,
			'seo: {}',
			'---',
			'',
		].join('\n');

		// .md (not .mdx) — migrated content is plain Markdown with no JSX, and
		// MDX's JSX-aware parser chokes on stray "<" characters that survive
		// HTML->Markdown conversion (e.g. inside code snippets).
		const filePath = path.join(OUT_DIR, `${post.slug}.md`);
		await writeFile(filePath, frontmatter + body + '\n', 'utf-8');
		console.log(`Wrote ${path.relative(process.cwd(), filePath)}`);
	}

	console.log(`Done. Migrated ${posts.length} posts to ${path.relative(process.cwd(), OUT_DIR)}/`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
