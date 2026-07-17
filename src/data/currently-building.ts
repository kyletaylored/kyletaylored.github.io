// Shared between about.astro and contact.astro (both show this list per
// their comps — About.dc.html and Contact.dc.html). Not a content
// collection since it's just 3 short-lived status lines, not something
// worth a CMS schema for; edit directly here when it changes.
export const currentlyBuilding = [
	{ title: 'Autonomous code review agent', tag: 'AI', border: 'border-teal', color: 'var(--color-teal)' },
	{ title: '6-axis robot arm (3D printed)', tag: 'Hardware', border: 'border-pink', color: 'var(--color-pink)' },
	{ title: 'Open source dev tools collection', tag: 'OSS', border: 'border-yellow', color: 'var(--color-yellow)' },
];
