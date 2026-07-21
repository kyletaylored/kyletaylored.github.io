// Decorative-shape specs for each banner variant on /design/banners — the
// "rebellious Memphis" art from ui_kits/banners/Social Banners.dc.html
// (shapes spread across the whole canvas, not clustered in one corner),
// scaled to each banner's real export dimensions. One spec per variant
// drives both the on-page preview (BannerArt HTML renderer) and the PNG
// download route (satori renderer) — see src/lib/bannerArt.ts.
import type { Shape } from './bannerArt';
import { TEAL, PINK, YELLOW, BLUE, INK } from './bannerColors';

export type BannerKey = 'linkedin-left' | 'linkedin-right' | 'github' | 'email' | 'square-home' | 'square-article';

export interface BannerSpec {
	key: BannerKey;
	label: string;
	dims: string;
	width: number;
	height: number;
	background: string;
	shapes: Shape[];
}

const DARK_GRID = '#2A2A2A';
const DARK_LINE = '#333333';

function bottomBar(width: number): Shape {
	return { kind: 'bar', left: 0, bottom: 0, width, height: 4, color: PINK, rotate: 0 };
}

// Horizontally flips a shape's position (and, for rotated shapes, negates
// the angle so the rotation mirrors too) — used to derive the "content on
// the right" LinkedIn banner from the "content on the left" one, since
// LinkedIn's circular profile photo overlaps the bottom-left of the cover
// banner and would otherwise sit right on top of left-aligned text.
function mirrorShape(shape: Shape): Shape {
	const { left, right, ...rest } = shape;
	const flipped: Shape = {
		...rest,
		...(right !== undefined ? { left: right } : {}),
		...(left !== undefined ? { right: left } : {}),
	};
	if ('rotate' in flipped && typeof flipped.rotate === 'number') {
		flipped.rotate = -flipped.rotate;
	}
	return flipped;
}

function mirrorShapes(shapes: Shape[]): Shape[] {
	return shapes.map(mirrorShape);
}

const linkedinLeftShapes: Shape[] = [
	{ kind: 'circle', left: -40, bottom: -40, size: 220, color: YELLOW },
	{ kind: 'bar', left: -30, top: 60, width: 420, height: 14, color: TEAL, rotate: -8, opacity: 0.7 },
	{ kind: 'dotgrid', left: 160, top: 0, width: 220, height: 396, color: DARK_LINE, spacing: 14 },
	{ kind: 'diamond', left: 720, top: 40, size: 22, color: BLUE },
	{ kind: 'crosshair', left: 860, top: 150, size: 46, color: DARK_GRID },
	{ kind: 'hazard', left: 700, top: 0, width: 14, height: 396, colorA: YELLOW, colorB: '#1E1E1E', opacity: 0.3 },
	{ kind: 'triangle', right: 250, top: -20, width: 170, height: 150, color: TEAL, opacity: 0.5 },
	{ kind: 'circle', right: -60, top: -60, size: 260, color: PINK },
	{ kind: 'ring', right: 60, bottom: 40, size: 100, border: 3, color: DARK_GRID },
	{ kind: 'diamond', right: 100, top: 40, size: 16, color: PINK, opacity: 0.7 },
	{ kind: 'slashes', right: 40, bottom: 32, color: DARK_LINE, dotColor: YELLOW },
	bottomBar(1584),
];

export const BANNER_SPECS: Record<BannerKey, BannerSpec> = {
	'linkedin-left': {
		key: 'linkedin-left',
		label: 'LinkedIn Profile Banner — Content Left',
		dims: '1584 × 396',
		width: 1584,
		height: 396,
		background: INK,
		shapes: linkedinLeftShapes,
	},
	'linkedin-right': {
		key: 'linkedin-right',
		label: 'LinkedIn Profile Banner — Content Right',
		dims: '1584 × 396',
		width: 1584,
		height: 396,
		background: INK,
		// LinkedIn's profile photo overlaps the bottom-left of the banner —
		// use this variant instead of linkedin-left whenever that would
		// otherwise sit on top of the text.
		shapes: mirrorShapes(linkedinLeftShapes),
	},
	github: {
		key: 'github',
		label: 'GitHub Social Preview',
		dims: '1280 × 640',
		width: 1280,
		height: 640,
		background: INK,
		shapes: [
			{ kind: 'bar', right: -20, top: 40, width: 260, height: 12, color: YELLOW, rotate: 20, opacity: 0.8 },
			{ kind: 'circle', right: -30, top: -30, size: 170, color: PINK },
			{ kind: 'triangle', right: 120, top: 220, width: 110, height: 96, color: TEAL, opacity: 0.5 },
			{ kind: 'circle', left: 600, bottom: -30, size: 110, color: YELLOW, opacity: 0.7 },
			{ kind: 'dotgrid', left: 660, top: 80, width: 120, height: 120, color: DARK_GRID },
			{ kind: 'diamond', left: 700, bottom: 70, size: 16, color: BLUE },
			{ kind: 'crosshair', right: 40, bottom: 60, size: 34, color: DARK_GRID },
			{ kind: 'slashes', left: 640, bottom: 26, color: DARK_GRID, dotColor: YELLOW },
			bottomBar(1280),
		],
	},
	email: {
		key: 'email',
		label: 'Email / Newsletter Header',
		dims: '600 × 200',
		width: 600,
		height: 200,
		background: INK,
		shapes: [
			{ kind: 'circle', left: -30, top: -30, size: 140, color: YELLOW },
			{ kind: 'bar', left: -10, top: 36, width: 340, height: 7, color: TEAL, rotate: -8, opacity: 0.6 },
			{ kind: 'circle', right: -30, bottom: -30, size: 120, color: PINK },
			{ kind: 'triangle', right: 60, top: -10, width: 88, height: 76, color: TEAL, opacity: 0.5 },
			{ kind: 'ring', right: 90, top: 75, size: 50, border: 2, color: '#222222' },
			{ kind: 'diamond', right: 180, top: 16, size: 10, color: BLUE },
			{ kind: 'dotgrid', right: 0, top: 0, width: 80, height: 200, color: DARK_GRID },
			{ kind: 'slashes', left: 250, bottom: 18, color: DARK_LINE, dotColor: YELLOW },
			{ kind: 'hazard', left: 0, bottom: 0, width: 600, height: 5, colorA: YELLOW, colorB: '#1A1A1A' },
		],
	},
	'square-home': {
		key: 'square-home',
		label: 'Square Social — Homepage',
		dims: '1080 × 1080',
		width: 1080,
		height: 1080,
		background: INK,
		shapes: [
			{ kind: 'circle', right: -100, top: -100, size: 400, color: PINK },
			{ kind: 'triangle', right: 140, top: -20, width: 220, height: 190, color: TEAL, opacity: 0.9 },
			{ kind: 'circle', right: 60, bottom: 260, size: 160, color: YELLOW, opacity: 0.9 },
			{ kind: 'dotgrid', left: 0, top: 0, width: 160, height: 160, color: DARK_GRID, opacity: 0.4 },
			{ kind: 'diamond', left: 80, bottom: 300, size: 22, color: BLUE },
			{ kind: 'crosshair', left: 60, top: 400, size: 50, color: '#222222' },
			{ kind: 'ring', left: 900, bottom: 80, size: 90, border: 3, color: DARK_GRID },
			{ kind: 'slashes', right: 80, bottom: 60, color: DARK_LINE, dotColor: YELLOW },
			bottomBar(1080),
		],
	},
	'square-article': {
		key: 'square-article',
		label: 'Square Social — Article',
		dims: '1080 × 1080',
		width: 1080,
		height: 1080,
		background: INK,
		shapes: [
			{ kind: 'circle', right: -100, top: -100, size: 320, color: TEAL, opacity: 0.25 },
			{ kind: 'bar', left: -40, top: 220, width: 1160, height: 14, color: PINK, rotate: -4, opacity: 0.6 },
			{ kind: 'diamond', right: 220, top: 120, size: 26, color: YELLOW },
			{ kind: 'dotgrid', right: 0, bottom: 0, width: 200, height: 200, color: DARK_LINE },
			{ kind: 'crosshair', right: 120, bottom: 140, size: 60, color: DARK_LINE },
			{ kind: 'ring', left: 80, bottom: 340, size: 70, border: 2, color: DARK_GRID },
			{ kind: 'diamond', left: 120, top: 500, size: 14, color: BLUE },
			{ kind: 'slashes', left: 80, bottom: 60, color: DARK_LINE, dotColor: TEAL },
		],
	},
};

export const BANNER_ORDER: BannerKey[] = ['linkedin-left', 'linkedin-right', 'github', 'email', 'square-home', 'square-article'];
