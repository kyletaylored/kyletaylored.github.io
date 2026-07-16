import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface NavLink {
	label: string;
	href: string;
}

export function MobileNav({ links }: { links: NavLink[] }) {
	return (
		<Sheet>
			<SheetTrigger
				render={
					<Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
						<span aria-hidden="true">&#9776;</span>
					</Button>
				}
			/>
			<SheetContent side="right">
				<SheetTitle className="sr-only">Navigation</SheetTitle>
				<nav className="flex flex-col gap-4 p-6">
					{links.map((link) => (
						<a key={link.href} href={link.href} className="font-display text-lg text-ink">
							{link.label}
						</a>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
}
