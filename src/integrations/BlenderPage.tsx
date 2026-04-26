import { ArrowRight, Check } from 'lucide-react';

const C = {
  navy:    '#0f172a',
  cyan:    '#06b6d4',
  cyanHov: '#22d3ee',
  slate:   '#64748b',
  muted:   '#94a3b8',
  faint:   '#cbd5e1',
  border:  'rgba(0,0,0,0.07)',
  bg:      '#fafafa',
} as const;

const FOCUS_RING = `0 0 0 3px rgba(6,182,212,0.35)`;

function hoverPrimary(el: HTMLElement, on: boolean) {
  el.style.background = on ? C.cyan    : C.navy;
  el.style.boxShadow  = on ? `0 6px 24px rgba(6,182,212,0.28)` : 'none';
  el.style.transform  = on ? 'translateY(-1px)' : 'translateY(0)';
}

const btnPrimary: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  borderRadius: 100,
  background: C.navy,
  color: 'white',
  fontFamily: 'inherit',
  fontSize: 15,
  fontWeight: 600,
  padding: '14px 28px',
  textDecoration: 'none',
  letterSpacing: '-0.01em',
  border: 'none',
  cursor: 'pointer',
  transition: 'background 0.15s, box-shadow 0.2s, transform 0.15s',
  outline: 'none',
};

const STUCK_MOMENTS = [
  'Where is the modifier panel?',
  'Why does the final render look different from the viewport?',
  'Why are my materials not showing?',
  'Why did my textures disappear after export?',
  'Why is the render camera not matching what I see?',
];

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
      {/* ── Header ── */}
      <header
        style={{
          borderBottom: `1px solid ${C.border}`,
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          zIndex: 50,
        }}
      >
        <div style={{ maxWidth: 1120, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a
            href="/"
            style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.02em', color: C.navy, textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.cyan)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.navy)}
          >
            Nexpot
          </a>
          <a
            href="/#download"
            style={{ ...btnPrimary, fontSize: 13, padding: '8px 20px' }}
            onMouseEnter={(e) => hoverPrimary(e.currentTarget as HTMLElement, true)}
            onMouseLeave={(e) => hoverPrimary(e.currentTarget as HTMLElement, false)}
            onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
            onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
          >
            Download now
          </a>
        </div>
      </header>

      <main>

        {/* ── Hero ── */}
        <section
          style={{
            padding: 'clamp(80px, 12vw, 128px) 24px clamp(72px, 10vw, 112px)',
            borderBottom: `1px solid ${C.border}`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
              width: 800, height: 500, borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, position: 'relative' }}>
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
              Nexpot for Blender
            </p>
            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(36px, 6vw, 60px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.07,
                color: C.navy,
              }}
            >
              Stuck in Blender?{' '}
              <span style={{ color: C.cyan }}>Keep moving.</span>
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(16px, 1.8vw, 19px)',
                color: C.slate,
                lineHeight: 1.65,
                maxWidth: 520,
              }}
            >
              A Blender-specific support agent that helps you continue when you get stuck in modifiers, materials, rendering, export, and everything in between.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
              <a
                href="/#download"
                style={btnPrimary}
                onMouseEnter={(e) => hoverPrimary(e.currentTarget as HTMLElement, true)}
                onMouseLeave={(e) => hoverPrimary(e.currentTarget as HTMLElement, false)}
                onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
                onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                Download now
                <ArrowRight size={15} strokeWidth={2.5} aria-hidden />
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, paddingTop: 4 }}>
              <p style={{ margin: 0, fontSize: 12, color: C.faint }}>250 free credits included — about 5 support events free</p>
              <p style={{ margin: 0, fontSize: 12, color: C.faint }}>From €6.99/month or pay as you go.</p>
            </div>
          </div>
        </section>

        {/* ── Built for real Blender friction ── */}
        <section style={{ padding: 'clamp(64px, 10vw, 96px) 24px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(24px, 3.5vw, 36px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.12,
                color: C.navy,
              }}
            >
              Built for real Blender friction.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                'When Blender gets confusing, work stops.',
                'You start searching.',
                'You open YouTube.',
                'You lose time.',
              ].map((line) => (
                <p key={line} style={{ margin: 0, fontSize: 'clamp(15px, 1.5vw, 17px)', color: C.slate, lineHeight: 1.6 }}>
                  {line}
                </p>
              ))}
              <p style={{ margin: '12px 0 0', fontSize: 'clamp(15px, 1.5vw, 17px)', fontWeight: 500, color: C.navy, lineHeight: 1.6 }}>
                Nexpot helps you continue inside Blender, right when you get stuck.
              </p>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section style={{ padding: 'clamp(64px, 10vw, 96px) 24px', background: C.bg, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(24px, 3.5vw, 36px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.12,
                color: C.navy,
              }}
            >
              Help, exactly when you need it.
            </h2>
            <ol
              role="list"
              style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              {[
                { n: '01', text: 'Press the shortcut.' },
                { n: '02', text: 'Ask your question.' },
                { n: '03', text: 'Nexpot looks at your Blender screen and shows you what to do next.' },
              ].map(({ n, text }) => (
                <li key={n} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      fontSize: 'clamp(26px, 3vw, 36px)',
                      fontWeight: 700,
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      color: C.cyan,
                      opacity: 0.18,
                      flexShrink: 0,
                      fontVariantNumeric: 'tabular-nums',
                      userSelect: 'none',
                    }}
                  >
                    {n}
                  </span>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 'clamp(15px, 1.5vw, 17px)',
                      fontWeight: 500,
                      color: C.navy,
                      lineHeight: 1.5,
                      letterSpacing: '-0.01em',
                      paddingTop: 4,
                    }}
                  >
                    {text}
                  </p>
                </li>
              ))}
            </ol>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 500, color: C.slate, borderTop: `1px solid ${C.border}`, paddingTop: 20 }}>
              No searching. No guessing. No waiting.
            </p>
          </div>
        </section>

        {/* ── Common stuck moments ── */}
        <section style={{ padding: 'clamp(64px, 10vw, 96px) 24px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(24px, 3.5vw, 36px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.12,
                color: C.navy,
              }}
            >
              Common stuck moments in Blender
            </h2>
            <ul
              role="list"
              style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              {STUCK_MOMENTS.map((item) => (
                <li
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: '14px 16px',
                    borderRadius: 12,
                    border: `1px solid ${C.border}`,
                    background: 'white',
                  }}
                >
                  <Check size={14} strokeWidth={2.5} style={{ color: C.cyan, flexShrink: 0, marginTop: 2 }} aria-hidden />
                  <span style={{ fontSize: 14, color: C.slate, lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Pricing / plans ── */}
        <section style={{ padding: 'clamp(64px, 10vw, 96px) 24px', background: C.bg, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(24px, 3.5vw, 36px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.12,
                color: C.navy,
              }}
            >
              Choose how you want to use it.
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(15px, 1.5vw, 17px)',
                color: C.slate,
                lineHeight: 1.65,
                maxWidth: 480,
              }}
            >
              Use Nexpot for Blender with a monthly plan, or just buy credits when you need fast help.
            </p>
            <div>
              <a
                href="/#pricing"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  borderRadius: 100,
                  border: '1px solid rgba(0,0,0,0.14)',
                  background: 'white',
                  color: C.navy,
                  fontSize: 13,
                  fontWeight: 600,
                  padding: '10px 20px',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.15s, color 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = C.cyan;
                  (e.currentTarget as HTMLElement).style.color = C.cyan;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.14)';
                  (e.currentTarget as HTMLElement).style.color = C.navy;
                }}
                onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
                onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                See pricing
              </a>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section style={{ padding: 'clamp(80px, 12vw, 128px) 24px' }}>
          <div
            style={{
              maxWidth: 560,
              margin: '0 auto',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(28px, 4.5vw, 48px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: C.navy,
              }}
            >
              Try Nexpot for Blender free.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p style={{ margin: 0, fontSize: 15, color: C.muted, letterSpacing: '-0.01em' }}>Get unstuck faster.</p>
              <p style={{ margin: 0, fontSize: 15, color: C.muted, letterSpacing: '-0.01em' }}>Stay in the flow.</p>
            </div>
            <a
              href="/#download"
              style={{ ...btnPrimary, fontSize: 15, padding: '15px 32px' }}
              onMouseEnter={(e) => hoverPrimary(e.currentTarget as HTMLElement, true)}
              onMouseLeave={(e) => hoverPrimary(e.currentTarget as HTMLElement, false)}
              onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
              onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              Download now
              <ArrowRight size={15} strokeWidth={2.5} aria-hidden />
            </a>
            <p style={{ margin: 0, fontSize: 12, color: C.faint }}>Windows & Mac</p>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: '28px 24px' }}>
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <p style={{ margin: 0, fontSize: 12, color: C.faint }}>© 2026 Nexpot. All rights reserved.</p>
          <a
            href="/"
            style={{ fontSize: 12, color: C.muted, textDecoration: 'none', letterSpacing: '-0.01em', transition: 'color 0.15s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.navy)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
          >
            ← Back to Nexpot
          </a>
        </div>
      </footer>
    </div>
  );
}
