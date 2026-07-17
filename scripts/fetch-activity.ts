/**
 * Build-time fetch of the GitHub contribution calendar (the "colored
 * squares" heatmap from a GitHub profile) for the homepage's GitHub
 * Activity section. Runs before `astro build` (see .github/workflows/deploy.yml)
 * so the graph is baked into static HTML with zero client JS.
 *
 * Requires a GH_ACTIVITY_TOKEN env var (a PAT with public read access) since
 * the auto-provided Actions GITHUB_TOKEN can't query the GraphQL API on the
 * user's behalf. If the token isn't set, this script writes an empty
 * contributions.json rather than failing the build.
 *
 * Uses GitHub's GraphQL API because contribution calendar data has no REST
 * equivalent — it's only exposed via `user.contributionsCollection`.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const GITHUB_USER = 'kyletaylored';
const OUT_FILE = path.resolve(import.meta.dirname, '../src/data/contributions.json');

interface ContributionDay {
	date: string;
	count: number;
}

interface ContributionWeek {
	days: ContributionDay[];
}

const QUERY = `
	query ($login: String!) {
		user(login: $login) {
			contributionsCollection {
				contributionCalendar {
					weeks {
						contributionDays {
							date
							contributionCount
						}
					}
				}
			}
		}
	}
`;

async function fetchContributions(token: string): Promise<ContributionWeek[]> {
	const res = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_USER } }),
	});
	if (!res.ok) throw new Error(`GitHub GraphQL request failed (${res.status})`);

	const json = (await res.json()) as {
		data?: {
			user?: {
				contributionsCollection?: {
					contributionCalendar?: {
						weeks: Array<{ contributionDays: Array<{ date: string; contributionCount: number }> }>;
					};
				};
			};
		};
		errors?: Array<{ message: string }>;
	};
	if (json.errors?.length) throw new Error(`GitHub GraphQL errors: ${json.errors.map((e) => e.message).join('; ')}`);

	const weeks = json.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
	return weeks.map((week) => ({
		days: week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount })),
	}));
}

async function main() {
	const token = process.env.GH_ACTIVITY_TOKEN;

	await mkdir(path.dirname(OUT_FILE), { recursive: true });

	if (!token) {
		console.warn('GH_ACTIVITY_TOKEN not set — writing empty contributions.json.');
		await writeFile(OUT_FILE, '[]\n', 'utf-8');
		return;
	}

	const weeks = await fetchContributions(token);
	const totalDays = weeks.reduce((sum, week) => sum + week.days.length, 0);
	await writeFile(OUT_FILE, JSON.stringify(weeks, null, 2) + '\n', 'utf-8');
	console.log(`Wrote ${weeks.length} weeks (${totalDays} days) to ${path.relative(process.cwd(), OUT_FILE)}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
