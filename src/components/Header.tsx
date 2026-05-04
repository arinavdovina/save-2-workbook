export default function Header() {
  return (
    <header style={{
      background: '#1C1510',
      height: 54,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      position: 'sticky',
      top: 0,
      zIndex: 99,
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#fff' }}>
        fresh<i style={{ fontStyle: 'italic', color: '#FF6B4A' }}>teacher</i>
      </div>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A8958C' }}>
        Prompt Architect
      </div>
    </header>
  );
}
