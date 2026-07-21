import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getEntry } from 'astro:content';
import site from '../../data/site.json';
import { shapesToSatori, type Shape } from '../../lib/bannerArt';
import { TEAL, PINK, YELLOW, BLUE, INK, BG, MUTED_DARK } from '../../lib/bannerColors';

// Build-time share image for the site's standalone pages (home, about,
// contact, and the projects/articles/lab index pages) — these aren't
// content-collection entries, so they never got a card from
// `og/[...slug].png.ts`'s `seo.ogImage ?? heroImage ?? /og/...` fallback
// chain (that chain only fires for articles/projects/lab entries). Same
// satori -> resvg pipeline, reusing the shared color tokens and
// decorative-shape spec from src/lib/bannerArt.ts (see also
// src/pages/design/banners/[variant].png.ts) instead of one-off shapes,
// but without the kicker-pill/byline row article cards have — these pages
// have no category or reading time.

interface SitePageData {
	title: string;
	description: string;
}

const aboutEntry = await getEntry('pages', 'about');
const contactEntry = await getEntry('pages', 'contact');

const pages: Record<string, SitePageData> = {
	home: { title: site.siteTitle, description: site.siteDescription },
	about: {
		title: aboutEntry?.data.seo.metaTitle ?? aboutEntry?.data.title ?? 'About',
		description: aboutEntry?.data.description ?? '',
	},
	contact: {
		title: contactEntry?.data.seo.metaTitle ?? contactEntry?.data.title ?? 'Contact',
		description: contactEntry?.data.description ?? '',
	},
	projects: { title: 'Projects', description: "Methodology, source code, and live demos for everything I've built." },
	articles: { title: 'Articles', description: "Writeups, notes, and deep dives on what I'm building." },
	lab: { title: 'Maker Lab', description: 'A playground for ideas, experiments, and side projects.' },
	design: {
		title: 'Design System',
		description: "How this site's design system came together — tokens, components, and patterns, shown through the real thing rather than static mockups.",
	},
};

// Same "Hero Art — Circle + Triangle Cluster" composition as
// decor/HeroArt.astro (the canonical dark-hero decoration used across the
// live site), ported to satori Shape objects — these standalone-page OG
// cards were previously using their own much sparser 2-shape, low-opacity
// set instead of matching the real site's decorative language.
const DARK_GRID = '#2A2A2A';

const decorShapes: Shape[] = [
	{ kind: 'circle', right: -30, top: -40, size: 180, color: PINK, opacity: 0.9 },
	{ kind: 'triangle', right: 80, top: -10, width: 170, height: 170, color: TEAL, opacity: 0.9 },
	{ kind: 'circle', right: 260, bottom: 20, size: 80, color: YELLOW, opacity: 0.9 },
	{ kind: 'diamond', right: 20, top: 100, size: 24, color: BLUE, opacity: 0.9 },
	{ kind: 'dotgrid', right: 80, top: 20, width: 70, height: 70, color: DARK_GRID },
	{ kind: 'crosshair', right: 20, bottom: 40, size: 28, color: DARK_GRID },
	{ kind: 'slashes', left: 20, bottom: 20, color: DARK_GRID, dotColor: YELLOW },
	{ kind: 'ring', right: 160, bottom: 20, size: 60, border: 2, color: DARK_GRID },
	{ kind: 'hazard', right: 60, bottom: 60, width: 80, height: 18, colorA: YELLOW, colorB: '#1E1E1E', opacity: 0.9 },
];

async function fetchFont(family: string, weight: number): Promise<ArrayBuffer> {
	const res = await fetch(`https://api.fontsource.org/v1/fonts/${family}/latin-${weight}-normal.ttf`);
	if (!res.ok) throw new Error(`Failed to fetch font ${family}@${weight}: ${res.status}`);
	return res.arrayBuffer();
}

const [spaceGroteskBold, spaceMonoRegular] = await Promise.all([
	fetchFont('space-grotesk', 700),
	fetchFont('space-mono', 400),
]);

function renderOgTemplate(page: SitePageData) {
	return {
		type: 'div',
		props: {
			style: {
				display: 'flex',
				flexDirection: 'column',
				width: '1200px',
				height: '630px',
				backgroundColor: INK,
				position: 'relative',
				fontFamily: 'Space Grotesk',
				padding: '64px',
			},
			children: [
				...shapesToSatori(decorShapes),
				// Brand row
				{
					type: 'div',
					props: {
						style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' },
						children: [
							{
								type: 'div',
								props: {
									style: {
										width: '28px',
										height: '28px',
										backgroundColor: TEAL,
										borderRadius: '4px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: '15px',
										fontWeight: 700,
										color: INK,
									},
									children: 'K',
								},
							},
							{
								type: 'span',
								props: {
									style: { fontSize: '14px', fontWeight: 600, letterSpacing: '2px', color: BG, textTransform: 'uppercase' },
									children: site.brandLabel,
								},
							},
						],
					},
				},
				// Title
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							fontSize: '58px',
							fontWeight: 700,
							lineHeight: 1.1,
							letterSpacing: '-1px',
							color: BG,
							marginBottom: '24px',
							maxWidth: '950px',
						},
						children: page.title,
					},
				},
				// Description
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							fontFamily: 'Space Mono',
							fontSize: '20px',
							lineHeight: 1.5,
							color: MUTED_DARK,
							maxWidth: '820px',
							marginTop: 'auto',
						},
						children: page.description,
					},
				},
				// Pink bottom bar
				{
					type: 'div',
					props: {
						style: {
							position: 'absolute',
							bottom: 0,
							left: 0,
							right: 0,
							height: '4px',
							backgroundColor: PINK,
							display: 'flex',
						},
					},
				},
			],
		},
	};
}

async function renderOgImage(page: SitePageData): Promise<Buffer> {
	const svg = await satori(renderOgTemplate(page) as never, {
		width: 1200,
		height: 630,
		fonts: [
			{ name: 'Space Grotesk', data: spaceGroteskBold, weight: 700, style: 'normal' },
			{ name: 'Space Mono', data: spaceMonoRegular, weight: 400, style: 'normal' },
		],
	});

	const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
	return resvg.render().asPng();
}

export function getStaticPaths() {
	return Object.entries(pages).map(([page, data]) => ({ params: { page }, props: { page: data } }));
}

export async function GET({ props }: { props: { page: SitePageData } }) {
	const png = await renderOgImage(props.page);
	return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}
