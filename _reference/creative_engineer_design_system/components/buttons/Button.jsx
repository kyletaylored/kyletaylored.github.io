export function Button({ label, variant = 'primary', size = 'md', href, onClick, icon, disabled }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    fontFamily: 'var(--font-body)', fontWeight: 600,
    letterSpacing: '0.06em', textTransform: 'uppercase',
    borderRadius: 0, border: '2px solid', cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none', transition: 'background 150ms ease, color 150ms ease, border-color 150ms ease',
    opacity: disabled ? 0.45 : 1, lineHeight: 1,
  };
  const sizes = {
    sm: { fontSize: '11px', padding: '8px 14px' },
    md: { fontSize: '13px', padding: '12px 20px' },
    lg: { fontSize: '14px', padding: '16px 28px' },
  };
  const variants = {
    primary:   { background: '#28D7E5', borderColor: '#28D7E5', color: '#111' },
    secondary: { background: 'transparent', borderColor: '#111', color: '#111' },
    ghost:     { background: 'transparent', borderColor: 'transparent', color: '#111' },
    dark:      { background: 'transparent', borderColor: '#FAF8F3', color: '#FAF8F3' },
    'dark-solid': { background: '#28D7E5', borderColor: '#28D7E5', color: '#111' },
  };
  const style = { ...base, ...sizes[size], ...variants[variant] };
  const inner = React.createElement(React.Fragment, null,
    label,
    icon && React.createElement('span', { style: { display: 'inline-flex', transition: 'transform 150ms ease' } }, icon)
  );
  if (href) return React.createElement('a', { href, style }, inner);
  return React.createElement('button', { style, onClick, disabled }, inner);
}
