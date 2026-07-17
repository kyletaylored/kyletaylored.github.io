// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { datadogVitePlugin } from '@datadog/vite-plugin';
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';

const SITE_URL = 'https://kyletaylored.com';

// Sourcemap upload for Datadog Error Tracking — only active when
// DATADOG_API_KEY is set (a repo secret, passed through by
// .github/workflows/deploy.yml). No-ops locally and in PR builds.
// releaseVersion must match Analytics.astro's DATADOG_RUM_VERSION so
// Datadog can symbolicate stack traces against the uploaded source.
const vitePlugins = [tailwindcss()];
if (process.env.DATADOG_API_KEY) {
    vitePlugins.push(
        datadogVitePlugin({
            auth: {
                apiKey: process.env.DATADOG_API_KEY,
                appKey: process.env.DATADOG_APP_KEY,
                site: process.env.DATADOG_RUM_SITE || 'datadoghq.com',
            },
            errorTracking: {
                enable: true,
                sourcemaps: {
                    minifiedPathPrefix: SITE_URL,
                    releaseVersion: process.env.DATADOG_RUM_VERSION || 'unknown',
                    service: process.env.DATADOG_RUM_SERVICE || 'kyletaylored-website',
                },
            },
        }),
    );
}

// https://astro.build/config
export default defineConfig({
    site: SITE_URL,
    integrations: [
        mdx(),
        sitemap({
            // /design/* are private export utilities (see /design/banners),
            // not real site content — keep them out of the sitemap.
            filter: (page) => !page.includes('/design/'),
        }),
        react(),
    ],
    vite: {
        plugins: vitePlugins,
        build: {
            sourcemap: true,
        },
        css: {
            devSourcemap: true,
        },
    },
    fonts: [
        {
            provider: fontProviders.google(),
            name: 'Space Grotesk',
            cssVariable: '--font-display',
            weights: [300, 400, 500, 600, 700],
            fallbacks: ['system-ui', 'sans-serif'],
        },
        {
            provider: fontProviders.google(),
            name: 'Space Mono',
            cssVariable: '--font-mono',
            weights: [400, 700],
            styles: ['normal', 'italic'],
            fallbacks: ['ui-monospace', 'monospace'],
        },
    ],
});
