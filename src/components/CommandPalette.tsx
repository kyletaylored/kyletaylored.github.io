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
				// @ts-expect-error - pagefind.js is generated at build time, not a real module
				const pagefind = await import(/* @vite-ignore */ '/pagefind/pagefind.js');
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
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Search or jump to..." value={query} onValueChange={setQuery} />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Navigate">
					{navEntries.map((entry) => (
						<CommandItem key={entry.href} onSelect={() => (window.location.href = entry.href)}>
							{entry.label}
						</CommandItem>
					))}
				</CommandGroup>
				{demoEntries.length > 0 && (
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
