/**
 * Build-time fetch of recent GitHub activity for the homepage "Recent
 * Activity" timeline. Runs before `astro build` (see .github/workflows/deploy.yml)
 * so the timeline is baked into static HTML with zero client JS.
 *
 * Requires a GH_ACTIVITY_TOKEN env var (a PAT with public read access) since
 * the auto-provided Actions GITHUB_TOKEN is scoped only to this repo and
 * can't list activity across other repos. If the token isn't set, this
 * script writes an empty activity.json rather than failing the build.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const GITHUB_USER = 'kyletaylored';
const OUT_FILE = path.resolve(import.meta.dirname, '../src/data/activity.json');

interface ActivityEntry {
	type: 'git' | 'article' | 'tool' | 'commit';
	repo: string;
	title: string;
	url: string;
	date: string;
}

async function githubFetch(url: string, token: string) {
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/vnd.github+json',
		},
	});
	if (!res.ok) throw new Error(`GitHub API request failed (${res.status}): ${url}`);
	return res.json();
}

async function main() {
	const token = process.env.GH_ACTIVITY_TOKEN;

	if (!token) {
		console.warn('GH_ACTIVITY_TOKEN not set — writing empty activity.json.');
		await mkdir(path.dirname(OUT_FILE), { recursive: true });
		await writeFile(OUT_FILE, '[]\n', 'utf-8');
		return;
	}

	const repos = (await githubFetch(
		`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=10`,
		token,
	)) as Array<{ name: string; full_name: string; html_url: string; pushed_at: string; fork: boolean }>;

	const prs = (await githubFetch(
		`https://api.github.com/search/issues?q=author:${GITHUB_USER}+is:pr+is:merged&sort=updated&order=desc&per_page=10`,
		token,
	)) as { items: Array<{ title: string; html_url: string; updated_at: string; repository_url: string }> };

	const repoActivity: ActivityEntry[] = repos
		.filter((r) => !r.fork)
		.map((r) => ({
			type: 'git',
			repo: r.full_name,
			title: `Pushed to ${r.name}`,
			url: r.html_url,
			date: r.pushed_at,
		}));

	const prActivity: ActivityEntry[] = prs.items.map((pr) => ({
		type: 'commit',
		repo: pr.repository_url.replace('https://api.github.com/repos/', ''),
		title: pr.title,
		url: pr.html_url,
		date: pr.updated_at,
	}));

	const activity = [...repoActivity, ...prActivity]
		.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
		.slice(0, 20);

	await mkdir(path.dirname(OUT_FILE), { recursive: true });
	await writeFile(OUT_FILE, JSON.stringify(activity, null, 2) + '\n', 'utf-8');
	console.log(`Wrote ${activity.length} activity entries to ${path.relative(process.cwd(), OUT_FILE)}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
