export function ExperimentCard({ title, description, tags = [], icon, iconColor = '#28D7E5' }) {
  const [hovered, setHovered] = React.useState(false);
  return React.createElement('div', {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      background: '#FFF', border: `1px solid ${hovered ? '#111' : '#E0DDDA'}`,
      borderRadius: '4px', padding: '20px', display: 'flex', flexDirection: 'column',
      gap: '12px', cursor: 'pointer', transition: 'border-color 150ms ease',
    }
  },
    React.createElement('div', {
      style: { width: 48, height: 48, background: '#111', borderRadius: '8px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
    },
      React.createElement('span', { style: { color: iconColor, fontSize: '20px', fontFamily: 'var(--font-mono)', fontWeight: 700 } }, icon)
    ),
    React.createElement('div', null,
      React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#111', marginBottom: '6px' } }, title),
      React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B6860', lineHeight: 1.5 } }, description),
    ),
    tags.length > 0 && React.createElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } },
      ...tags.map((t, i) => React.createElement('span', {
        key: i,
        style: { fontFamily: 'var(--font-body)', fontSize: '11px', color: '#6B6860', background: 'transparent', border: '1px solid #C0BCB7', borderRadius: '999px', padding: '2px 8px' }
      }, t))
    ),
    React.createElement('div', { style: { color: '#111', fontSize: '16px', transition: 'transform 150ms ease', transform: hovered ? 'translateX(4px)' : 'none', display: 'inline-block' } }, '→')
  );
}

export function ToolCard({ title, description, icon, onOpen }) {
  const [hovered, setHovered] = React.useState(false);
  return React.createElement('div', {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      background: '#FFF', border: `1px solid ${hovered ? '#111' : '#E0DDDA'}`,
      borderRadius: '4px', padding: '16px 20px',
      display: 'flex', alignItems: 'center', gap: '16px',
      transition: 'border-color 150ms ease',
    }
  },
    React.createElement('div', {
      style: { width: 40, height: 40, background: '#111', borderRadius: '6px', flexShrink: 0,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', padding: '6px', overflow: 'hidden' }
    },
      React.createElement('div', { style: { background: '#28D7E5', borderRadius: '1px' } }),
      React.createElement('div', { style: { background: '#F44D8A', borderRadius: '1px' } }),
      React.createElement('div', { style: { background: '#FFD54A', borderRadius: '1px' } }),
      React.createElement('div', { style: { background: '#348BFF', borderRadius: '1px' } }),
    ),
    React.createElement('div', { style: { flex: 1, minWidth: 0 } },
      React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#111', marginBottom: '2px' } }, title),
      React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6B6860' } }, description),
    ),
    React.createElement('button', {
      onClick: onOpen,
      style: { fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em',
        padding: '7px 16px', background: 'transparent', border: '1px solid #E0DDDA', borderRadius: '0',
        cursor: 'pointer', color: '#111', whiteSpace: 'nowrap', flexShrink: 0 }
    }, 'Open')
  );
}
