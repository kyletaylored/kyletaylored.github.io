import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface NavLink {
	label: string;
	href: string;
}

export function MobileNav({ links }: { links: NavLink[] }) {
	return (
		<Sheet>
			<SheetTrigger
				render={
					<button type="button" aria-label="Open menu" className="flex flex-col gap-1 p-1">
						<span className="h-[1.5px] w-[18px] bg-bg" />
						<span className="h-[1.5px] w-[18px] bg-bg" />
						<span className="h-[1.5px] w-[12px] bg-bg" />
					</button>
				}
			/>
			<SheetContent side="right" className="bg-ink">
				<SheetTitle className="sr-only">Navigation</SheetTitle>
				<nav className="flex flex-col gap-6 p-8">
					{links.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="font-display text-lg font-semibold text-bg uppercase tracking-wide"
						>
							{link.label}
						</a>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
}
