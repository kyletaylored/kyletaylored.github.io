import { useEffect, useState } from 'react';
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';

interface NavEntry {
	label: string;
	href: string;
}

interface DemoEntry {
	label: string;
	href: string;
}

interface PagefindResult {
	url: string;
	meta: { title?: string };
	excerpt: string;
}

interface Props {
	navEntries: NavEntry[];
	demoEntries: DemoEntry[];
}

export function CommandPalette({ navEntries, demoEntries }: Props) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<PagefindResult[]>([]);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				setOpen((prev) => !prev);
			}
		};
		const onTrigger = () => setOpen(true);

		document.addEventListener('keydown', onKeyDown);
		window.addEventListener('open-command-palette', onTrigger);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('open-command-palette', onTrigger);
		};
	}, []);

	useEffect(() => {
		if (!query) {
			setResults([]);
			return;
		}

		let cancelled = false;

		(async () => {
			try {
				// Pagefind's index/module only exists after `npm run build` (it indexes
				// the built dist/ output) — not during `npm run dev`. Routing the path
				// through a variable keeps Vite's dev-time import analysis from trying
				// to statically resolve it (which fails the whole module transform,
				// bypassing this try/catch entirely); a real dynamic import with a
				// non-literal specifier is left for the browser to resolve at runtime,
				// where a 404 is just an ordinary rejected promise this catch handles.
				const pagefindPath = '/pagefind/pagefind.js';
				// @ts-expect-error - pagefind.js is generated at build time, not a real module
				const pagefind = await import(/* @vite-ignore */ pagefindPath);
				const search = await pagefind.search(query);
				const items = await Promise.all(search.results.slice(0, 8).map((r: any) => r.data()));
				if (!cancelled) setResults(items);
			} catch {
				if (!cancelled) setResults([]);
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [query]);

	return (
		<CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
			<CommandInput placeholder="Search or jump to..." value={query} onValueChange={setQuery} />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				{!query && (
					<CommandGroup heading="Navigate">
						{navEntries.map((entry) => (
							<CommandItem key={entry.href} onSelect={() => (window.location.href = entry.href)}>
								{entry.label}
							</CommandItem>
						))}
					</CommandGroup>
				)}
				{!query && demoEntries.length > 0 && (
					<CommandGroup heading="Launch Demo">
						{demoEntries.map((entry) => (
							<CommandItem
								key={entry.href}
								onSelect={() => window.open(entry.href, '_blank', 'noopener,noreferrer')}
							>
								{entry.label}
							</CommandItem>
						))}
					</CommandGroup>
				)}
				{results.length > 0 && (
					<CommandGroup heading="Search results">
						{results.map((result) => (
							<CommandItem key={result.url} onSelect={() => (window.location.href = result.url)}>
								{result.meta?.title ?? result.url}
							</CommandItem>
						))}
					</CommandGroup>
				)}
			</CommandList>
		</CommandDialog>
	);
}
