/**
 * Primary interactive element. Sharp corners, uppercase labels.
 * @startingPoint section="Components" subtitle="Button — primary, secondary, ghost, dark" viewport="700x120"
 */
export interface ButtonProps {
  /** Button label text */
  label: string;
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark' | 'dark-solid';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** If provided, renders as an anchor */
  href?: string;
  onClick?: () => void;
  /** Icon element appended after label */
  icon?: React.ReactNode;
  disabled?: boolean;
}
