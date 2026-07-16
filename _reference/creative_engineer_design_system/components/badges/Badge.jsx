export function Badge({ label, color = 'default' }) {
  const colors = {
    default: { background: 'transparent', border: '1px solid #C0BCB7', color: '#6B6860' },
    teal:    { background: '#28D7E5', border: '1px solid #28D7E5', color: '#111' },
    pink:    { background: '#F44D8A', border: '1px solid #F44D8A', color: '#FFF' },
    yellow:  { background: '#FFD54A', border: '1px solid #FFD54A', color: '#111' },
    blue:    { background: '#348BFF', border: '1px solid #348BFF', color: '#FFF' },
    red:     { background: '#F25A4C', border: '1px solid #F25A4C', color: '#FFF' },
    dark:    { background: '#1A1A1A', border: '1px solid #2A2A2A', color: '#FAF8F3' },
  };
  const style = {
    display: 'inline-flex', alignItems: 'center',
    padding: '3px 10px', borderRadius: '999px',
    fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500,
    lineHeight: 1.4, whiteSpace: 'nowrap',
    ...colors[color] || colors.default,
  };
  return React.createElement('span', { style }, label);
}
