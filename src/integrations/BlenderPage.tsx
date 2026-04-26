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
  el.style.background = on ? C.cyan : C.navy;
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
  padding: '13px 26px',
  textDecoration: 'none',
  letterSpacing: '-0.01em',
  border: 'none',
  cursor: 'pointer',
  transition: 'background 0.15s, box-shadow 0.2s, transform 0.15s',
  outline: 'none',
  whiteSpace: 'nowrap' as const,
};

const STUCK_MOMENTS = [
  'Where is the modifier panel?',
  'Why does the final render look different from the viewport?',
  'Why are my materials not showing?',
  'Why did my textures disappear after export?',
  'Why is the render camera not matching what I see?',
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p style={{
      margin: 0,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.10em',
      textTransform: 'uppercase',
      color: C.cyan,
    }}>
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 style={{
      margin: 0,
      fontSize: 'clamp(22px, 3vw, 32px)',
      fontWeight: 700,
      letterSpacing: '-0.03em',
      lineHeight: 1.12,
      color: C.navy,
    }}>
      {children}
    </h2>
  );
}

export default function BlenderPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'white',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: C.navy,
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* ── Header ── */}
      <header style={{
        borderBottom: `1px solid ${C.border}`,
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        background: 'rgba(255,255,255,0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: 1120, margin: '0 auto', width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <a
            href="/"
            style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.02em', color: C.navy, textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.cyan)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.navy)}
          >
            Nexpot
          </a>
          <a
            href="/#download"
            style={{ ...btnPrimary, fontSize: 13, padding: '8px 18px' }}
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
        <section style={{
          padding: 'clamp(88px, 13vw, 136px) 24px clamp(80px, 11vw, 120px)',
          borderBottom: `1px solid ${C.border}`,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Ambient glow — identical radius/opacity as main site hero */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)',
            width: 900, height: 600, borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(6,182,212,0.065) 0%, transparent 68%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
            <SectionLabel>Nexpot for Blender</SectionLabel>

            <h1 style={{
              margin: '16px 0 0',
              fontSize: 'clamp(40px, 6.5vw, 64px)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
              color: C.navy,
            }}>
              Stuck in Blender?{' '}
              <span style={{ color: C.cyan }}>Keep moving.</span>
            </h1>

            <p style={{
              margin: '24px 0 0',
              fontSize: 'clamp(16px, 1.8vw, 19px)',
              color: C.slate,
              lineHeight: 1.65,
              maxWidth: 500,
              letterSpacing: '-0.01em',
            }}>
              A Blender-specific support agent that helps you continue when you get stuck in modifiers, materials, rendering, export, and everything in between.
            </p>

            <div style={{ marginTop: 36 }}>
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

            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p style={{ margin: 0, fontSize: 12, color: C.faint, letterSpacing: '-0.01em' }}>
                250 free credits included — about 5 support events free
              </p>
              <p style={{ margin: 0, fontSize: 12, color: C.faint, letterSpacing: '-0.01em' }}>
                From €6.99/month or pay as you go.
              </p>
            </div>
          </div>
        </section>

        {/* ── Built for real Blender friction ── */}
        <section style={{ padding: 'clamp(72px, 10vw, 104px) 24px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <SectionHeading>Built for real Blender friction.</SectionHeading>

            {/* Staggered friction lines */}
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { text: 'When Blender gets confusing, work stops.', weight: 400, color: C.slate },
                { text: 'You start searching.',                     weight: 400, color: C.muted },
                { text: 'You open YouTube.',                        weight: 400, color: C.muted },
                { text: 'You lose time.',                           weight: 400, color: C.muted },
              ].map(({ text, weight, color }, i) => (
                <p key={i} style={{
                  margin: 0,
                  paddingTop: i === 0 ? 0 : 10,
                  fontSize: i === 0 ? 'clamp(15px, 1.5vw, 17px)' : 'clamp(14px, 1.3vw, 15px)',
                  fontWeight: weight,
                  color,
                  lineHeight: 1.6,
                  letterSpacing: '-0.01em',
                }}>
                  {text}
                </p>
              ))}
            </div>

            {/* Resolution */}
            <p style={{
              margin: '32px 0 0',
              paddingTop: 28,
              borderTop: `1px solid ${C.border}`,
              fontSize: 'clamp(16px, 1.6vw, 18px)',
              fontWeight: 600,
              color: C.navy,
              lineHeight: 1.55,
              letterSpacing: '-0.02em',
            }}>
              Nexpot helps you continue inside Blender, right when you get stuck.
            </p>
          </div>
        </section>

        {/* ── Help, exactly when you need it ── */}
        <section style={{ padding: 'clamp(72px, 10vw, 104px) 24px', background: C.bg, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <SectionHeading>Help, exactly when you need it.</SectionHeading>

            <ol role="list" style={{ margin: '36px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                'Press the shortcut.',
                'Ask your question.',
                'Nexpot looks at your Blender screen and shows you what to do next.',
              ].map((text, i) => (
                <li key={i} style={{
                  display: 'flex',
                  gap: 20,
                  alignItems: 'flex-start',
                  paddingTop: i === 0 ? 0 : 20,
                  paddingBottom: 20,
                  borderBottom: i < 2 ? `1px solid ${C.border}` : 'none',
                }}>
                  <span aria-hidden="true" style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: C.cyan,
                    opacity: 0.55,
                    flexShrink: 0,
                    marginTop: 3,
                    fontVariantNumeric: 'tabular-nums',
                    userSelect: 'none',
                    width: 20,
                    textAlign: 'right',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{
                    margin: 0,
                    fontSize: 'clamp(14px, 1.4vw, 16px)',
                    fontWeight: i === 2 ? 500 : 400,
                    color: i === 2 ? C.navy : C.slate,
                    lineHeight: 1.6,
                    letterSpacing: '-0.01em',
                  }}>
                    {text}
                  </p>
                </li>
              ))}
            </ol>

            <p style={{
              margin: '28px 0 0',
              fontSize: 14,
              fontWeight: 500,
              color: C.muted,
              letterSpacing: '-0.01em',
            }}>
              No searching. No guessing. No waiting.
            </p>
          </div>
        </section>

        {/* ── Common stuck moments ── */}
        <section style={{ padding: 'clamp(72px, 10vw, 104px) 24px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <SectionHeading>Common stuck moments in Blender</SectionHeading>

            <ul role="list" style={{ margin: '32px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {STUCK_MOMENTS.map((item) => (
                <li key={item} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '13px 16px',
                  borderRadius: 10,
                  border: `1px solid ${C.border}`,
                  background: 'white',
                }}>
                  <Check size={13} strokeWidth={2.5} style={{ color: C.cyan, flexShrink: 0, marginTop: 2 }} aria-hidden />
                  <span style={{ fontSize: 13, color: C.slate, lineHeight: 1.55, letterSpacing: '-0.01em' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Pricing / plans ── */}
        <section style={{ padding: 'clamp(72px, 10vw, 104px) 24px', background: C.bg, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <SectionHeading>Choose how you want to use it.</SectionHeading>

            <p style={{
              margin: '20px 0 0',
              fontSize: 'clamp(14px, 1.4vw, 16px)',
              color: C.slate,
              lineHeight: 1.65,
              maxWidth: 440,
              letterSpacing: '-0.01em',
            }}>
              Use Nexpot for Blender with a monthly plan, or just buy credits when you need fast help.
            </p>

            <div style={{ marginTop: 28 }}>
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
                  padding: '9px 18px',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.15s, color 0.15s',
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
        <section style={{ padding: 'clamp(88px, 13vw, 136px) 24px' }}>
          <div style={{
            maxWidth: 520,
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
          }}>
            <h2 style={{
              margin: 0,
              fontSize: 'clamp(30px, 4.5vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.07,
              color: C.navy,
            }}>
              Try Nexpot for Blender free.
            </h2>
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <p style={{ margin: 0, fontSize: 15, color: C.muted, letterSpacing: '-0.01em' }}>Get unstuck faster.</p>
              <p style={{ margin: 0, fontSize: 15, color: C.muted, letterSpacing: '-0.01em' }}>Stay in the flow.</p>
            </div>
            <a
              href="/#download"
              style={{ ...btnPrimary, marginTop: 32, fontSize: 15, padding: '14px 30px' }}
              onMouseEnter={(e) => hoverPrimary(e.currentTarget as HTMLElement, true)}
              onMouseLeave={(e) => hoverPrimary(e.currentTarget as HTMLElement, false)}
              onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
              onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              Download now
              <ArrowRight size={15} strokeWidth={2.5} aria-hidden />
            </a>
            <p style={{ margin: '16px 0 0', fontSize: 12, color: C.faint }}>Windows & Mac</p>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: '28px 24px' }}>
        <div style={{
          maxWidth: 1120,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}>
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
