import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getCollection } from 'astro:content';
import { AUTHOR_NAME } from '../../consts';

// Build-time-generated share images, used ONLY as the last-resort fallback
// when a content entry has neither a heroImage nor a manual seo.ogImage set
// (see ArticleLayout/ProjectLayout/the Lab [...slug].astro's `image={...}`
// prop). Every article/project/lab entry gets one here regardless, but
// most requests for this route never happen in practice since a real
// image wins first.
//
// Uses satori + resvg directly (not astro-og-canvas) because the design
// system's Social Banners comp specs a real layout — brand row, category
// pill, byline + date/read-time row, decorative shapes, pink accent bar —
// that astro-og-canvas's title+description-over-a-background model can't
// reproduce. See components/README.md for the fuller rationale.

interface OgPageData {
	title: string;
	description: string;
	kicker: string;
	date: string;
	readingTime: number;
}

const articles = await getCollection('articles', ({ data }) => !data.draft);
const projects = await getCollection('projects');
const lab = await getCollection('lab');

function readingTimeFor(body: string | undefined): number {
	const wordCount = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(wordCount / 200));
}

function formatDate(date: Date): string {
	return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const pages: Record<string, OgPageData> = Object.fromEntries([
	...articles.map((entry) => [
		`articles/${entry.id}`,
		{
			title: entry.data.title,
			description: entry.data.description,
			kicker: entry.data.category,
			date: formatDate(entry.data.pubDate),
			readingTime: readingTimeFor(entry.body),
		},
	]),
	...projects.map((entry) => [
		`projects/${entry.id}`,
		{
			title: entry.data.title,
			description: entry.data.summary,
			kicker: entry.data.status,
			date: formatDate(entry.data.pubDate),
			readingTime: readingTimeFor(entry.body),
		},
	]),
	...lab.map((entry) => [
		`lab/${entry.id}`,
		{
			title: entry.data.title,
			description: entry.data.description,
			kicker: entry.data.labCategory,
			date: formatDate(entry.data.pubDate),
			readingTime: readingTimeFor(entry.body),
		},
	]),
]);

async function fetchFont(family: string, weight: number): Promise<ArrayBuffer> {
	const res = await fetch(`https://api.fontsource.org/v1/fonts/${family}/latin-${weight}-normal.ttf`);
	if (!res.ok) throw new Error(`Failed to fetch font ${family}@${weight}: ${res.status}`);
	return res.arrayBuffer();
}

const [spaceGroteskBold, spaceMonoRegular] = await Promise.all([
	fetchFont('space-grotesk', 700),
	fetchFont('space-mono', 400),
]);

const TEAL = '#28D7E5';
const PINK = '#F44D8A';
const INK = '#111111';
const BG = '#FAF8F3';
const MUTED = '#A8A49F';
const MUTED_DARK = '#6B6860';

function renderOgTemplate(page: OgPageData) {
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
				// Subtle decorative circle, top-right, low opacity — per the
				// Article OG comp: "less dominant than homepage" art.
				{
					type: 'div',
					props: {
						style: {
							position: 'absolute',
							right: '-40px',
							top: '-40px',
							width: '260px',
							height: '260px',
							borderRadius: '50%',
							backgroundColor: TEAL,
							opacity: 0.15,
							display: 'flex',
						},
					},
				},
				{
					type: 'div',
					props: {
						style: {
							position: 'absolute',
							right: '40px',
							bottom: '-60px',
							width: '160px',
							height: '160px',
							backgroundColor: PINK,
							opacity: 0.12,
							transform: 'rotate(45deg)',
							display: 'flex',
						},
					},
				},
				// Brand row
				{
					type: 'div',
					props: {
						style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' },
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
									children: 'KYLETAYLORED.COM',
								},
							},
						],
					},
				},
				// Kicker pill
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							alignSelf: 'flex-start',
							fontSize: '13px',
							fontWeight: 600,
							letterSpacing: '1px',
							textTransform: 'uppercase',
							backgroundColor: PINK,
							color: '#FFFFFF',
							padding: '5px 16px',
							borderRadius: '999px',
							marginBottom: '24px',
						},
						children: page.kicker,
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
							marginBottom: '28px',
							maxWidth: '900px',
						},
						children: page.title,
					},
				},
				// Byline + date/reading-time row
				{
					type: 'div',
					props: {
						style: { display: 'flex', alignItems: 'center', gap: '24px', marginTop: 'auto' },
						children: [
							{
								type: 'div',
								props: {
									style: { display: 'flex', alignItems: 'center', gap: '10px' },
									children: [
										{
											type: 'div',
											props: {
												style: {
													width: '24px',
													height: '24px',
													backgroundColor: TEAL,
													borderRadius: '3px',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													fontSize: '13px',
													fontWeight: 700,
													color: INK,
												},
												children: 'K',
											},
										},
										{
											type: 'span',
											props: { style: { fontSize: '18px', color: MUTED }, children: AUTHOR_NAME },
										},
									],
								},
							},
							{
								type: 'span',
								props: {
									style: { fontFamily: 'Space Mono', fontSize: '16px', color: MUTED_DARK },
									children: `${page.date} · ${page.readingTime} min read`,
								},
							},
						],
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

async function renderOgImage(page: OgPageData): Promise<Buffer> {
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
	return Object.entries(pages).map(([slug, page]) => ({ params: { slug }, props: { page } }));
}

export async function GET({ props }: { props: { page: OgPageData } }) {
	const png = await renderOgImage(props.page);
	return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}
