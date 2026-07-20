import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getCollection } from 'astro:content';
import { shapesToSatori, type Shape } from '../../../lib/bannerArt';
import { TEAL, PINK, YELLOW, BLUE, INK } from '../../../lib/bannerColors';

// Textless, purpose-built fallback image for ArticleTeaserCard (jam.dev
// issue #4: the full 1200x630 article-share card from og/[...slug].png.ts
// bakes in a large title, which reads fine as a 1.9:1 social preview but
// falls apart the moment a teaser thumbnail crops it to a square or
// near-square box — object-cover center-crops the width, chopping the
// title text off mid-word. A square (1200x1200), text-free Memphis
// composition has nothing that can run off: every ArticleTeaserCard crop
// ratio (1:1, 16:9, 16:7) is narrower-or-equal than the source, so
// object-cover only ever trims off the top/bottom of the shape scene, and
// the real title/description text already rendered as real HTML in the
// card is what carries the copy — this image is decoration only.

const articles = await getCollection('articles', ({ data }) => !data.draft);
const projects = await getCollection('projects');
const lab = await getCollection('lab');

const entries = [...articles, ...projects, ...lab].map((entry) => `${entry.collection}/${entry.id}`);

// 4 fixed shape recipes, spread across the whole 1200x1200 canvas (not
// clustered in one corner) so any top/bottom crop still shows a full scene
// — same "go large, clip at edges" composition rules as guidelines/Art
// Blocks.dc.html. Picked per entry via a hash of its slug, same pattern
// ArticleTeaserCard already uses for its gradient/pill-color rotation.
const RECIPES: Shape[][] = [
	[
		{ kind: 'circle', right: -100, top: -100, size: 420, color: TEAL, opacity: 1 },
		{ kind: 'triangle', left: -60, bottom: -80, width: 320, height: 280, color: PINK, opacity: 0.85 },
		{ kind: 'diamond', left: 520, top: 80, size: 50, color: YELLOW },
		{ kind: 'dotgrid', right: 120, bottom: 120, width: 220, height: 220, color: '#2A2A2A' },
	],
	[
		{ kind: 'circle', left: -90, top: -90, size: 380, color: PINK, opacity: 1 },
		{ kind: 'triangle', right: -50, bottom: -60, width: 300, height: 260, color: TEAL, opacity: 0.8 },
		{ kind: 'diamond', right: 180, top: 520, size: 40, color: BLUE },
		{ kind: 'dotgrid', left: 100, top: 100, width: 200, height: 200, color: '#2A2A2A' },
	],
	[
		{ kind: 'circle', right: -80, bottom: -80, size: 360, color: YELLOW, opacity: 0.9 },
		{ kind: 'triangle', left: -40, top: -60, width: 280, height: 240, color: BLUE, opacity: 0.75 },
		{ kind: 'diamond', left: 600, bottom: 140, size: 46, color: PINK },
		{ kind: 'dotgrid', right: 80, top: 80, width: 200, height: 200, color: '#333333' },
	],
	[
		{ kind: 'circle', left: -100, bottom: -100, size: 400, color: BLUE, opacity: 1 },
		{ kind: 'triangle', right: -60, top: -70, width: 300, height: 260, color: YELLOW, opacity: 0.8 },
		{ kind: 'diamond', right: 140, bottom: 560, size: 44, color: TEAL },
		{ kind: 'dotgrid', left: 120, bottom: 120, width: 210, height: 210, color: '#2A2A2A' },
	],
];

function recipeFor(slug: string): Shape[] {
	const hash = slug.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
	return RECIPES[hash % RECIPES.length];
}

async function fetchFont(family: string, weight: number): Promise<ArrayBuffer> {
	const res = await fetch(`https://api.fontsource.org/v1/fonts/${family}/latin-${weight}-normal.ttf`);
	if (!res.ok) throw new Error(`Failed to fetch font ${family}@${weight}: ${res.status}`);
	return res.arrayBuffer();
}

const spaceGroteskBold = await fetchFont('space-grotesk', 700);

function renderTeaserTemplate(slug: string) {
	return {
		type: 'div',
		props: {
			style: {
				display: 'flex',
				width: '1200px',
				height: '1200px',
				backgroundColor: INK,
				position: 'relative',
				overflow: 'hidden',
				fontFamily: 'Space Grotesk',
			},
			children: [
				...shapesToSatori(recipeFor(slug)),
				// Brand mark — fixed position/size across every teaser image, same
				// spot as the "K" mark everywhere else on the site, for a
				// consistent brand anchor regardless of which recipe/crop shows.
				{
					type: 'div',
					props: {
						style: {
							position: 'absolute',
							left: '48px',
							bottom: '48px',
							width: '64px',
							height: '64px',
							backgroundColor: TEAL,
							borderRadius: '6px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: '34px',
							fontWeight: 700,
							color: INK,
						},
						children: 'K',
					},
				},
			],
		},
	};
}

async function renderTeaserImage(slug: string): Promise<Buffer> {
	const svg = await satori(renderTeaserTemplate(slug) as never, {
		width: 1200,
		height: 1200,
		fonts: [{ name: 'Space Grotesk', data: spaceGroteskBold, weight: 700, style: 'normal' }],
	});

	const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
	return resvg.render().asPng();
}

export function getStaticPaths() {
	return entries.map((slug) => ({ params: { slug } }));
}

export async function GET({ params }: { params: { slug?: string } }) {
	const png = await renderTeaserImage(params.slug ?? '');
	return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}
