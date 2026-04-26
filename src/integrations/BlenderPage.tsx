const C = {
  navy:   '#0f172a',
  cyan:   '#06b6d4',
  slate:  '#64748b',
  muted:  '#94a3b8',
  faint:  '#cbd5e1',
  border: 'rgba(0,0,0,0.07)',
} as const;

const FOCUS_RING = `0 0 0 3px rgba(6,182,212,0.35)`;

function hoverPrimary(el: HTMLElement, on: boolean) {
  el.style.background = on ? C.cyan    : C.navy;
  el.style.boxShadow  = on ? `0 6px 24px rgba(6,182,212,0.28)` : 'none';
  el.style.transform  = on ? 'translateY(-1px)' : 'translateY(0)';
}

export default function BlenderPage() {
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

      {/* Hero */}
      <main style={{ flex: 1 }}>
        <section
          style={{
            padding: 'clamp(80px, 12vw, 128px) 24px clamp(64px, 10vw, 104px)',
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
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
                fontSize: 'clamp(32px, 5.5vw, 52px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                color: C.navy,
              }}
            >
              Nexpot for Blender
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(16px, 1.8vw, 18px)',
                color: C.slate,
                lineHeight: 1.65,
                maxWidth: 480,
              }}
            >
              Get instant, on-screen guidance for Blender — modelling, shading, rigging, rendering, and more — without leaving your workspace.
            </p>
            <div>
              <a
                href="/#download"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  borderRadius: 100,
                  background: C.navy,
                  color: 'white',
                  fontFamily: 'inherit',
                  fontSize: 14,
                  fontWeight: 600,
                  padding: '12px 24px',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  border: 'none',
                  outline: 'none',
                  transition: 'background 0.15s, box-shadow 0.2s, transform 0.15s',
                }}
                onMouseEnter={(e) => hoverPrimary(e.currentTarget as HTMLElement, true)}
                onMouseLeave={(e) => hoverPrimary(e.currentTarget as HTMLElement, false)}
                onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
                onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                Download Nexpot free
              </a>
            </div>
          </div>
        </section>

        {/* Placeholder content area */}
        <section style={{ padding: 'clamp(64px, 10vw, 96px) 24px' }}>
          <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }}>
            {[
              {
                label: '3D modelling',
                text: 'Ask how to extrude faces, loop cut, apply modifiers, or fix topology — Nexpot shows you exactly what to click.',
              },
              {
                label: 'Shading & materials',
                text: 'Get step-by-step guidance on node setups, PBR materials, and texture painting without switching to YouTube.',
              },
              {
                label: 'Rendering',
                text: 'Understand Cycles vs. EEVEE settings, denoising, and output configuration on the spot.',
              },
            ].map(({ label, text }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    color: C.cyan,
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    color: C.slate,
                    lineHeight: 1.7,
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>
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
