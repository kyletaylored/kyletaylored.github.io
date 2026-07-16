export function ActivityItem({ type, title, description, time }) {
  const typeConfig = {
    experiment: { label: 'New Experiment', color: '#F25A4C', icon: '⬡' },
    git:        { label: 'Git Push',       color: '#FFD54A', icon: '↑' },
    tool:       { label: 'New Tool',       color: '#28D7E5', icon: '⬛' },
    update:     { label: 'Experiment Updated', color: '#F44D8A', icon: '↻' },
    article:    { label: 'Published Article',  color: '#348BFF', icon: '✦' },
    commit:     { label: 'New Commit',    color: '#6B6860', icon: '●' },
  };
  const cfg = typeConfig[type] || typeConfig.commit;
  return React.createElement('div', {
    style: { display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px 0', borderBottom: '1px solid #F0EDE8' }
  },
    React.createElement('div', {
      style: { width: 28, height: 28, background: '#F0EDE8', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px', color: cfg.color }
    }, cfg.icon),
    React.createElement('div', { style: { flex: 1, minWidth: 0 } },
      React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: cfg.color, marginBottom: '2px' } }, cfg.label),
      React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: '13px', color: '#111', lineHeight: 1.4 } }, description),
    ),
    React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#A8A49F', whiteSpace: 'nowrap', flexShrink: 0, paddingTop: '2px' } }, time)
  );
}
