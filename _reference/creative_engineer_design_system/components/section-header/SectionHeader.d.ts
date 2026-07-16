/** Section label with red dot + "View all →" link. Appears at the start of every content section. */
export interface SectionHeaderProps {
  /** ALL CAPS section label, e.g. "EXPLORE THE LAB" */
  label: string;
  linkText?: string;
  linkHref?: string;
  /** Show the red status dot (default true) */
  dot?: boolean;
}
