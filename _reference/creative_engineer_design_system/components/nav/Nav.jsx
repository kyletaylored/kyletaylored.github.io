export function Nav({ items = [], active, onNav }) {
  return React.createElement('nav', {
    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '56px', background: '#111', borderBottom: '1px solid #2A2A2A', position: 'relative', zIndex: 10 }
  },
    // Logo mark
    React.createElement('a', { href: '#', style: { display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' } },
      React.createElement('div', {
        style: { width: 28, height: 28, background: '#28D7E5', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2px' }
      },
        React.createElement('span', { style: { fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 700, color: '#111', lineHeight: 1 } }, 'K')
      ),
      React.createElement('span', {
        style: { fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: '#FAF8F3', textTransform: 'uppercase' }
      }, 'KYLETAYLOR.DEV')
    ),
    // Nav items
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '32px' } },
      ...items.map((item, i) =>
        React.createElement('a', {
          key: i, href: item.href || '#',
          onClick: onNav ? (e) => { e.preventDefault(); onNav(item); } : undefined,
          style: {
            fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: active === item.label ? '#28D7E5' : '#FAF8F3',
            textDecoration: 'none', transition: 'color 150ms ease',
          }
        }, item.label)
      ),
      React.createElement('span', { style: { color: '#F44D8A', fontSize: '18px', lineHeight: 1, cursor: 'pointer' } }, '+')
    )
  );
}
