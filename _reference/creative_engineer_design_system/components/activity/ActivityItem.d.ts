/** Feed row for lab activity log. Color-coded by event type. */
export interface ActivityItemProps {
  type: 'experiment' | 'git' | 'tool' | 'update' | 'article' | 'commit';
  title?: string;
  description: string;
  time: string;
}
