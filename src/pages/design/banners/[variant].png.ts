import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getCollection } from 'astro:content';
import site from '../../../data/site.json';
import { shapesToSatori } from '../../../lib/bannerArt';
import { BANNER_SPECS, BANNER_ORDER, type BannerKey } from '../../../lib/bannerSpecs';
import { TEAL, PINK, INK, BG, MUTED, MUTED_DARK } from '../../../lib/bannerColors';

// High-resolution (2x) PNG export of the /design/banners preview art, so the
// banners can be downloaded directly instead of screenshotted out of the
// browser. Shares its decorative shapes with the on-page preview via
// src/lib/bannerSpecs.ts + bannerArt.ts's shapesToSatori — only the text/
// content overlay is built separately here, since satori needs its own
// plain-object node tree rather than the preview's Tailwind markup.

const EXPORT_SCALE = 2;

function div(style: Record<string, unknown>, children?: unknown) {
	return { type: 'div', props: { style: { display: 'flex', ...style }, ...(children !== undefined ? { children } : {}) } };
}

function span(style: Record<string, unknown>, children: unknown) {
	return { type: 'span', props: { style, children } };
}

function brandMark(size: number) {
	return div(
		{ width: `${size}px`, height: `${size}px`, backgroundColor: TEAL, borderRadius: '4px', alignItems: 'center', justifyContent: 'center', fontSize: `${size * 0.5}px`, fontWeight: 700, color: INK },
		'K',
	);
}

const [latestArticle] = (await getCollection('articles', ({ data }) => !data.draft)).sort(
	(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
);

const readingTime = latestArticle
	? Math.max(1, Math.round((latestArticle.body ?? '').trim().split(/\s+/).filter(Boolean).length / 200))
	: 1;

const articleDate = latestArticle
	? latestArticle.data.pubDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
	: '';

function buildContent(key: BannerKey): unknown {
	switch (key) {
		case 'linkedin-left':
		case 'linkedin-right': {
			const side = key === 'linkedin-left' ? { left: '64px' } : { right: '64px' };
			return div(
				{ position: 'absolute', ...side, top: '50%', transform: 'translateY(-50%)', flexDirection: 'column', alignItems: key === 'linkedin-right' ? 'flex-end' : 'flex-start' },
				[
					div({ alignItems: 'center', gap: '10px', marginBottom: '14px' }, [brandMark(28), span({ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: MUTED, textTransform: 'uppercase' }, site.brandLabel)]),
					div({ fontSize: '52px', fontWeight: 700, lineHeight: 1.0, letterSpacing: '-1px', color: BG, marginBottom: '10px' }, [site.siteTitle, span({ color: PINK }, '.')]),
					span({ fontFamily: 'Space Mono', fontSize: '16px', color: MUTED_DARK }, 'kyletaylored.com'),
				],
			);
		}
		case 'github':
			return div({ position: 'absolute', left: 0, top: 0, width: '1280px', height: '640px' }, [
				div({ position: 'absolute', left: 0, top: 0, bottom: 0, width: '520px', backgroundColor: '#0D0D0D', flexDirection: 'column' }, [
					div({ padding: '20px 28px', backgroundColor: '#1A1A1A', alignItems: 'center', gap: '8px' }, [
						div({ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F25A4C' }),
						div({ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FFD54A' }),
						div({ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: TEAL }),
						span({ marginLeft: '10px', fontFamily: 'Space Mono', fontSize: '15px', color: MUTED }, 'kyletaylored/kyletaylored.github.io'),
					]),
					div({ flexDirection: 'column', padding: '28px', fontFamily: 'Space Mono', fontSize: '15px', gap: '12px' }, [
						div({ gap: '16px' }, [span({ color: TEAL }, '$'), span({ color: BG }, 'git clone kyletaylored.github.io')]),
						div({ gap: '16px' }, [span({ color: TEAL }, '→'), span({ color: MUTED }, 'Cloning...')]),
						div({ gap: '16px' }, [span({ color: TEAL }, '$'), span({ color: BG }, 'npm run dev')]),
						div({ gap: '16px' }, [span({ color: TEAL }, '→'), span({ color: TEAL }, 'Ready on :4321')]),
					]),
				]),
				div({ position: 'absolute', left: '560px', top: '50%', transform: 'translateY(-50%)', width: '672px', flexDirection: 'column' }, [
					div({ alignItems: 'center', gap: '10px', marginBottom: '18px' }, [brandMark(22), span({ fontFamily: 'Space Mono', fontSize: '13px', letterSpacing: '1px', color: MUTED, textTransform: 'uppercase' }, 'kyletaylored.com')]),
					div({ fontSize: '42px', fontWeight: 700, lineHeight: 1.05, color: BG, marginBottom: '16px' }, [site.brandLabel, span({ color: PINK }, '.')]),
					div({ fontSize: '17px', color: MUTED_DARK, lineHeight: 1.5, marginBottom: '18px', width: '540px' }, site.siteDescription),
					div({ gap: '8px', flexWrap: 'wrap' }, ['TypeScript', 'Astro', 'AI', 'Open Source'].map((tag) =>
						div({ fontSize: '13px', color: MUTED_DARK, borderWidth: '1px', borderStyle: 'solid', borderColor: '#2A2A2A', borderRadius: '999px', padding: '2px 12px' }, tag),
					)),
				]),
			]);
		case 'email':
			return div({ position: 'absolute', left: '48px', top: '50%', transform: 'translateY(-50%)', flexDirection: 'column' }, [
				div({ alignItems: 'center', gap: '8px', marginBottom: '10px' }, [brandMark(20), span({ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', color: BG, textTransform: 'uppercase' }, site.brandLabel)]),
				div({ fontSize: '30px', fontWeight: 700, color: BG }, ['Lab Notes', span({ color: PINK }, '.')]),
				span({ fontFamily: 'Space Mono', fontSize: '13px', color: MUTED_DARK, marginTop: '6px' }, 'Issue # — replace per send'),
			]);
		case 'square-home':
			return div({ position: 'absolute', left: '56px', bottom: '56px', flexDirection: 'column' }, [
				div({ alignItems: 'center', gap: '12px', marginBottom: '20px' }, [brandMark(36), span({ fontSize: '20px', fontWeight: 600, letterSpacing: '2px', color: BG, textTransform: 'uppercase' }, site.brandLabel)]),
				div({ fontSize: '68px', fontWeight: 700, lineHeight: 1.05, color: BG, alignItems: 'baseline' }, [
					span({}, "Hi, I'm"),
					span({ color: TEAL, marginLeft: '22px' }, 'Kyle'),
					span({ color: PINK }, '.'),
				]),
			]);
		case 'square-article':
			return div({ position: 'absolute', left: '56px', bottom: '56px', width: '968px', flexDirection: 'column' }, [
				...(latestArticle
					? [
							div({ alignSelf: 'flex-start', fontSize: '20px', fontWeight: 600, textTransform: 'uppercase', backgroundColor: PINK, color: '#FFFFFF', padding: '8px 24px', borderRadius: '999px', marginBottom: '24px' }, latestArticle.data.category),
							div({ fontSize: '58px', fontWeight: 700, lineHeight: 1.05, color: BG, marginBottom: '20px' }, latestArticle.data.title),
							span({ fontFamily: 'Space Mono', fontSize: '18px', color: MUTED }, `${readingTime} min read · ${articleDate}`),
						]
					: []),
			]);
	}
}

async function fetchFont(family: string, weight: number): Promise<ArrayBuffer> {
	const res = await fetch(`https://api.fontsource.org/v1/fonts/${family}/latin-${weight}-normal.ttf`);
	if (!res.ok) throw new Error(`Failed to fetch font ${family}@${weight}: ${res.status}`);
	return res.arrayBuffer();
}

const [spaceGroteskBold, spaceMonoRegular] = await Promise.all([
	fetchFont('space-grotesk', 700),
	fetchFont('space-mono', 400),
]);

async function renderBannerPng(key: BannerKey): Promise<Buffer> {
	const spec = BANNER_SPECS[key];
	const tree = div({
		width: `${spec.width}px`,
		height: `${spec.height}px`,
		backgroundColor: spec.background,
		position: 'relative',
		overflow: 'hidden',
		fontFamily: 'Space Grotesk',
	}, [...shapesToSatori(spec.shapes), buildContent(key)]);

	const svg = await satori(tree as never, {
		width: spec.width,
		height: spec.height,
		fonts: [
			{ name: 'Space Grotesk', data: spaceGroteskBold, weight: 700, style: 'normal' },
			{ name: 'Space Mono', data: spaceMonoRegular, weight: 400, style: 'normal' },
		],
	});

	const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: spec.width * EXPORT_SCALE } });
	return resvg.render().asPng();
}

export function getStaticPaths() {
	return BANNER_ORDER.map((variant) => ({ params: { variant } }));
}

export async function GET({ params }: { params: { variant?: string } }) {
	const variant = params.variant as BannerKey;
	const png = await renderBannerPng(variant);
	return new Response(png, {
		headers: {
			'Content-Type': 'image/png',
			'Content-Disposition': `attachment; filename="banner-${variant}.png"`,
		},
	});
}
