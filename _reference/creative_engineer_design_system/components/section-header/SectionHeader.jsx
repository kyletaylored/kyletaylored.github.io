export function SectionHeader({ label, linkText = 'View all', linkHref = '#', dot = true }) {
  return React.createElement('div', {
    style: { display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', padding:'0 0 20px' }
  },
    React.createElement('div', { style: { display:'flex', alignItems:'center', gap:'10px' } },
      dot && React.createElement('div', {
        style: { width:8, height:8, borderRadius:'50%', background:'#F25A4C', flexShrink:0 }
      }),
      React.createElement('span', {
        style: { fontFamily:'var(--font-body)', fontSize:'13px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'#111' }
      }, label)
    ),
    linkText && React.createElement('a', {
      href: linkHref,
      style: { fontFamily:'var(--font-body)', fontSize:'13px', color:'#111', textDecoration:'none', display:'flex', alignItems:'center', gap:'4px' }
    }, linkText, ' ', React.createElement('span', { style:{ transition:'transform 150ms ease' } }, '→'))
  );
}
