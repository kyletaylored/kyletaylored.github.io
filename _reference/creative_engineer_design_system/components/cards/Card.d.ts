/** Category card for Explore the Lab grid. Icon box + title + description + tags + arrow. */
export interface ExperimentCardProps {
  title: string;
  description: string;
  tags?: string[];
  /** Text/symbol shown in icon box */
  icon: string;
  /** Icon glyph color, defaults to teal */
  iconColor?: string;
}

/** Horizontal tool row with 4-color icon grid, title, description, and Open button. */
export interface ToolCardProps {
  title: string;
  description: string;
  icon?: string;
  onOpen?: () => void;
}
