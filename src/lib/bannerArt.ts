// Shared decorative-shape "spec" for the Memphis-style banner art (see
// ui_kits/banners/Social Banners.dc.html and src/pages/design/banners.astro).
// One declarative shape list drives two renderers: BannerArt.astro (real
// browser CSS/SVG, used for the on-page preview) and shapesToSatori below
// (a satori node tree, used for the downloadable PNG export). Keeping the
// shapes as data — not hand-duplicated markup — is what keeps the preview
// and the downloaded file in sync.
import { TEAL, PINK, YELLOW, BLUE, INK } from './bannerColors';

export type Pos = { top?: number; left?: number; right?: number; bottom?: number };

export type Shape =
	| (Pos & { kind: 'circle'; size: number; color: string; opacity?: number })
	| (Pos & { kind: 'diamond'; size: number; color: string; opacity?: number; rotate?: number })
	| (Pos & { kind: 'ring'; size: number; color: string; border?: number; opacity?: number })
	| (Pos & { kind: 'bar'; width: number; height: number; color: string; rotate?: number; opacity?: number })
	| (Pos & { kind: 'triangle'; width: number; height: number; color: string; rotate?: number; opacity?: number })
	| (Pos & { kind: 'dotgrid'; width: number; height: number; color: string; opacity?: number; spacing?: number })
	| (Pos & { kind: 'hazard'; width: number; height: number; colorA: string; colorB: string; opacity?: number })
	| (Pos & { kind: 'crosshair'; size?: number; color: string })
	| (Pos & { kind: 'slashes'; color: string; dotColor: string });

function posStyle(pos: Pos): Record<string, string> {
	const style: Record<string, string> = { position: 'absolute' };
	if (pos.top !== undefined) style.top = `${pos.top}px`;
	if (pos.left !== undefined) style.left = `${pos.left}px`;
	if (pos.right !== undefined) style.right = `${pos.right}px`;
	if (pos.bottom !== undefined) style.bottom = `${pos.bottom}px`;
	return style;
}

// ── satori tree builder ──────────────────────────────────────────────────
// Satori quirks (see components/README.md): every container needs an
// explicit `display: 'flex'`; CSS border-trick triangles don't render
// (a real SVG <polygon> does, and is what's used below).

function div(style: Record<string, unknown>, children?: unknown) {
	return { type: 'div', props: { style: { display: 'flex', ...style }, ...(children !== undefined ? { children } : {}) } };
}

function svg(width: number, height: number, style: Record<string, unknown>, children: unknown[]) {
	return { type: 'svg', props: { width, height, viewBox: `0 0 ${width} ${height}`, style, children } };
}

export function shapeToSatori(shape: Shape) {
	const pos = posStyle(shape);
	switch (shape.kind) {
		case 'circle':
			return div({ ...pos, width: `${shape.size}px`, height: `${shape.size}px`, borderRadius: '50%', backgroundColor: shape.color, opacity: shape.opacity ?? 1 });
		case 'diamond':
			return div({ ...pos, width: `${shape.size}px`, height: `${shape.size}px`, backgroundColor: shape.color, opacity: shape.opacity ?? 1, transform: `rotate(${shape.rotate ?? 45}deg)` });
		case 'ring':
			return div({
				...pos,
				width: `${shape.size}px`,
				height: `${shape.size}px`,
				borderRadius: '50%',
				borderWidth: `${shape.border ?? 2}px`,
				borderStyle: 'solid',
				borderColor: shape.color,
				opacity: shape.opacity ?? 1,
			});
		case 'bar':
			return div({ ...pos, width: `${shape.width}px`, height: `${shape.height}px`, backgroundColor: shape.color, opacity: shape.opacity ?? 1, transform: `rotate(${shape.rotate ?? 0}deg)` });
		case 'triangle':
			return {
				type: 'div',
				props: {
					style: { ...pos, width: `${shape.width}px`, height: `${shape.height}px`, opacity: shape.opacity ?? 1, transform: `rotate(${shape.rotate ?? 0}deg)`, display: 'flex' },
					children: [svg(shape.width, shape.height, { display: 'flex' }, [
						{ type: 'polygon', props: { points: `${shape.width / 2},0 ${shape.width},${shape.height} 0,${shape.height}`, fill: shape.color } },
					])],
				},
			};
		case 'dotgrid': {
			const spacing = shape.spacing ?? 10;
			const dots: unknown[] = [];
			for (let y = spacing / 2; y < shape.height; y += spacing) {
				for (let x = spacing / 2; x < shape.width; x += spacing) {
					dots.push({ type: 'circle', props: { cx: x, cy: y, r: 1.3, fill: shape.color } });
				}
			}
			return { type: 'div', props: { style: { ...pos, width: `${shape.width}px`, height: `${shape.height}px`, opacity: shape.opacity ?? 1, display: 'flex' }, children: [svg(shape.width, shape.height, { display: 'flex' }, dots)] } };
		}
		case 'hazard': {
			const step = 10;
			const stripes: unknown[] = [];
			for (let x = -step; x < shape.width + step; x += step) {
				stripes.push({ type: 'polygon', props: { points: `${x},${shape.height} ${x + step / 2},0 ${x + step},0 ${x + step / 2},${shape.height}`, fill: shape.colorA } });
			}
			return {
				type: 'div',
				props: {
					style: { ...pos, width: `${shape.width}px`, height: `${shape.height}px`, opacity: shape.opacity ?? 1, overflow: 'hidden', display: 'flex' },
					children: [svg(shape.width, shape.height, { display: 'flex' }, [
						{ type: 'rect', props: { width: shape.width, height: shape.height, fill: shape.colorB } },
						...stripes,
					])],
				},
			};
		}
		case 'crosshair':
			return div({ ...pos, fontSize: `${shape.size ?? 28}px`, fontWeight: 200, color: shape.color, lineHeight: '1' }, '+');
		case 'slashes':
			return div({ ...pos, alignItems: 'center', gap: '4px' }, [
				{ type: 'span', props: { style: { fontFamily: 'Space Mono', fontSize: '11px', letterSpacing: '4px', color: shape.color }, children: '/ / / /' } },
				div({ width: '6px', height: '6px', backgroundColor: shape.dotColor }),
			]);
		default:
			return div({});
	}
}

export function shapesToSatori(shapes: Shape[]) {
	return shapes.map(shapeToSatori);
}

// ── browser HTML renderer ────────────────────────────────────────────────
// Used by the on-page preview (src/pages/design/banners.astro) via
// `<Fragment set:html={shapeToHtml(shape)} />` — safe here since every
// shape comes from this file's own static data, never user input.

function cssStyle(props: Record<string, string | number | undefined>): string {
	return Object.entries(props)
		.filter(([, v]) => v !== undefined)
		.map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}:${v}`)
		.join(';');
}

function styleAttr(pos: Pos, extra: Record<string, string | number | undefined>): string {
	return cssStyle({ ...posStyle(pos), ...extra });
}

export function shapeToHtml(shape: Shape): string {
	switch (shape.kind) {
		case 'circle':
			return `<div style="${styleAttr(shape, { width: `${shape.size}px`, height: `${shape.size}px`, borderRadius: '50%', backgroundColor: shape.color, opacity: shape.opacity ?? 1 })}"></div>`;
		case 'diamond':
			return `<div style="${styleAttr(shape, { width: `${shape.size}px`, height: `${shape.size}px`, backgroundColor: shape.color, opacity: shape.opacity ?? 1, transform: `rotate(${shape.rotate ?? 45}deg)` })}"></div>`;
		case 'ring':
			return `<div style="${styleAttr(shape, { width: `${shape.size}px`, height: `${shape.size}px`, borderRadius: '50%', border: `${shape.border ?? 2}px solid ${shape.color}`, opacity: shape.opacity ?? 1 })}"></div>`;
		case 'bar':
			return `<div style="${styleAttr(shape, { width: `${shape.width}px`, height: `${shape.height}px`, backgroundColor: shape.color, opacity: shape.opacity ?? 1, transform: `rotate(${shape.rotate ?? 0}deg)` })}"></div>`;
		case 'triangle':
			return `<div style="${styleAttr(shape, { width: `${shape.width}px`, height: `${shape.height}px`, opacity: shape.opacity ?? 1, transform: `rotate(${shape.rotate ?? 0}deg)` })}"><svg width="${shape.width}" height="${shape.height}" viewBox="0 0 ${shape.width} ${shape.height}"><polygon points="${shape.width / 2},0 ${shape.width},${shape.height} 0,${shape.height}" fill="${shape.color}" /></svg></div>`;
		case 'dotgrid': {
			const spacing = shape.spacing ?? 10;
			const id = `dg-${Math.round(shape.width)}-${Math.round(shape.height)}-${spacing}-${shape.color.replace('#', '')}`;
			return `<div style="${styleAttr(shape, { width: `${shape.width}px`, height: `${shape.height}px`, opacity: shape.opacity ?? 1 })}"><svg width="${shape.width}" height="${shape.height}"><defs><pattern id="${id}" x="0" y="0" width="${spacing}" height="${spacing}" patternUnits="userSpaceOnUse"><circle cx="${spacing / 2}" cy="${spacing / 2}" r="1.3" fill="${shape.color}" /></pattern></defs><rect width="${shape.width}" height="${shape.height}" fill="url(#${id})" /></svg></div>`;
		}
		case 'hazard': {
			const id = `hz-${Math.round(shape.width)}-${Math.round(shape.height)}`;
			return `<div style="${styleAttr(shape, { width: `${shape.width}px`, height: `${shape.height}px`, opacity: shape.opacity ?? 1, overflow: 'hidden' })}"><svg width="${shape.width}" height="${shape.height}" preserveAspectRatio="none"><defs><pattern id="${id}" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse"><polygon points="0,10 5,0 10,0 5,10" fill="${shape.colorA}" /><polygon points="5,10 10,0 15,0 10,10" fill="${shape.colorB}" /></pattern></defs><rect width="${shape.width}" height="${shape.height}" fill="url(#${id})" /></svg></div>`;
		}
		case 'crosshair':
			return `<div style="${styleAttr(shape, { fontSize: `${shape.size ?? 28}px`, fontWeight: 200, color: shape.color, lineHeight: '1' })}">+</div>`;
		case 'slashes':
			return `<div style="${styleAttr(shape, { display: 'flex', alignItems: 'center', gap: '4px' })}"><span style="font-family:'Space Mono',monospace;font-size:11px;letter-spacing:4px;color:${shape.color};">/ / / /</span><div style="width:6px;height:6px;background:${shape.dotColor};"></div></div>`;
		default:
			return '';
	}
}

export function shapesToHtml(shapes: Shape[]): string {
	return shapes.map(shapeToHtml).join('');
}

export { TEAL, PINK, YELLOW, BLUE, INK };
