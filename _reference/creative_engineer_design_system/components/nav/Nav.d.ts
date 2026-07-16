/** Top navigation bar. Dark bg with K logo mark, uppercase nav items, pink + accent. */
export interface NavProps {
  items: Array<{ label: string; href?: string }>;
  /** Currently active nav item label */
  active?: string;
  onNav?: (item: { label: string; href?: string }) => void;
}
