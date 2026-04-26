const C = {
  navy:   '#0f172a',
  cyan:   '#06b6d4',
  slate:  '#64748b',
  muted:  '#94a3b8',
  faint:  '#cbd5e1',
  border: 'rgba(0,0,0,0.07)',
} as const;

export default function DaVinciPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'white',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        color: C.navy,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Minimal header */}
      <header style={{ borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: 64, display: 'flex', alignItems: 'center' }}>
        <a
          href="/"
          style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.02em', color: C.navy, textDecoration: 'none' }}
        >
          Nexpot
        </a>
      </header>

      {/* Content */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
        <div style={{ maxWidth: 480, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: C.cyan,
            }}
          >
            Supported apps
          </p>
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: C.navy,
            }}
          >
            Nexpot for DaVinci Resolve
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 17,
              color: C.muted,
              letterSpacing: '-0.01em',
            }}
          >
            Coming soon.
          </p>
        </div>
      </main>

      {/* Minimal footer */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: '24px', textAlign: 'center' }}>
        <a
          href="/"
          style={{ fontSize: 12, color: C.muted, textDecoration: 'none', letterSpacing: '-0.01em' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.navy)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
        >
          ← Back to Nexpot
        </a>
      </footer>
    </div>
  );
}
