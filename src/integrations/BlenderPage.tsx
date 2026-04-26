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

function hoverOutline(el: HTMLElement, on: boolean) {
  el.style.borderColor = on ? C.cyan               : 'rgba(0,0,0,0.14)';
  el.style.color       = on ? C.cyan               : C.navy;
  el.style.boxShadow   = on ? FOCUS_RING           : 'none';
}

const btnBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  borderRadius: 100,
  fontFamily: 'inherit',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  textDecoration: 'none',
  cursor: 'pointer',
  outline: 'none',
  border: 'none',
  transition: 'background 0.15s, box-shadow 0.2s, transform 0.15s, border-color 0.15s, color 0.15s',
  whiteSpace: 'nowrap' as const,
};

const STUCK_MOMENTS = [
  'Where is the modifier panel?',
  'Why does the final render look different from the viewport?',
  'Why are my materials not showing?',
  'Why did my textures disappear after export?',
  'Why is the render camera showing something else?',
];

const BLENDER_AREAS = ['Modifiers', 'Materials', 'Rendering', 'Textures', 'Nodes', 'Export'];

// ── Shared section wrapper ───────────────────────────────────────────────────
function Section({ children, bg, padY = 'clamp(72px,10vw,104px)' }: {
  children: React.ReactNode;
  bg?: string;
  padY?: string;
}) {
  return (
    <section style={{
      padding: `${padY} 24px`,
      background: bg ?? 'white',
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        {children}
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p style={{
      margin: '0 0 14px',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.10em',
      textTransform: 'uppercase',
      color: C.cyan,
    }}>
      {children}
    </p>
  );
}

function SectionHeading({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2 style={{
      margin: '0 0 28px',
      fontSize: 'clamp(22px,3vw,32px)',
      fontWeight: 700,
      letterSpacing: '-0.03em',
      lineHeight: 1.12,
      color: C.navy,
      ...style,
    }}>
      {children}
    </h2>
  );
}

function Divider() {
  return <div style={{ height: 1, background: C.border, margin: '28px 0' }} />;
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

      {/* ── Sticky header ─────────────────────────────────────────────────── */}
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
            style={{ ...btnBase, fontSize: 13, padding: '8px 18px', background: C.navy, color: 'white' }}
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

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(96px,14vw,144px) 24px clamp(88px,12vw,128px)',
          borderBottom: `1px solid ${C.border}`,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* ambient glow */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
            width: 800, height: 560, borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 66%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative' }}>
            <Eyebrow>Nexpot for Blender</Eyebrow>

            <h1 style={{
              margin: '0 0 24px',
              fontSize: 'clamp(40px,6.5vw,66px)',
              fontWeight: 700,
              letterSpacing: '-0.038em',
              lineHeight: 1.04,
              color: C.navy,
            }}>
              Stop leaving Blender<br />
              when you get stuck.
            </h1>

            <p style={{
              margin: '0 0 36px',
              fontSize: 'clamp(16px,1.8vw,19px)',
              color: C.slate,
              lineHeight: 1.65,
              maxWidth: 490,
              letterSpacing: '-0.01em',
            }}>
              A Blender-specific support agent that helps you continue the moment you don't know what to click, where to go, or how to fix the next step.
            </p>

            <a
              href="/#download"
              style={{ ...btnBase, fontSize: 15, padding: '13px 26px', background: C.navy, color: 'white' }}
              onMouseEnter={(e) => hoverPrimary(e.currentTarget as HTMLElement, true)}
              onMouseLeave={(e) => hoverPrimary(e.currentTarget as HTMLElement, false)}
              onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
              onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              Download now
              <ArrowRight size={15} strokeWidth={2.5} aria-hidden />
            </a>

            <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <p style={{ margin: 0, fontSize: 12, color: C.faint, letterSpacing: '-0.01em' }}>
                250 free credits included — about 5 support events free
              </p>
              <p style={{ margin: 0, fontSize: 12, color: C.faint, letterSpacing: '-0.01em' }}>
                From €6.99/month or pay as you go.
              </p>
            </div>
          </div>
        </section>

        {/* ── Blender breaks your flow ──────────────────────────────────────── */}
        <Section>
          <SectionHeading>
            Blender is powerful.<br />
            Until it breaks your flow.
          </SectionHeading>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 500, color: C.slate, lineHeight: 1.6, letterSpacing: '-0.015em' }}>
              You lose time when you leave the work.
            </p>
            {['You search.', 'You watch.', 'You guess.'].map((line) => (
              <p key={line} style={{ margin: 0, fontSize: 15, color: C.muted, lineHeight: 1.6, letterSpacing: '-0.01em' }}>
                {line}
              </p>
            ))}
          </div>

          <Divider />

          <p style={{
            margin: 0,
            fontSize: 17,
            fontWeight: 600,
            color: C.navy,
            lineHeight: 1.5,
            letterSpacing: '-0.02em',
          }}>
            Nexpot helps you stay inside Blender and move forward.
          </p>
        </Section>

        {/* ── Built for real Blender friction ──────────────────────────────── */}
        <Section bg={C.bg}>
          <SectionHeading>Built for real Blender friction.</SectionHeading>

          {/* Pill tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {BLENDER_AREAS.map((area) => (
              <span key={area} style={{
                fontSize: 12,
                fontWeight: 600,
                color: C.slate,
                background: 'white',
                border: `1px solid ${C.border}`,
                borderRadius: 100,
                padding: '5px 13px',
                letterSpacing: '0.01em',
              }}>
                {area}
              </span>
            ))}
          </div>

          <p style={{
            margin: 0,
            fontSize: 15,
            color: C.slate,
            lineHeight: 1.65,
            maxWidth: 420,
            letterSpacing: '-0.01em',
          }}>
            When something doesn't work the way you expect, Nexpot helps you find the next step.
          </p>
        </Section>

        {/* ── Help, exactly when you need it ───────────────────────────────── */}
        <Section>
          <SectionHeading>Help, exactly when you need it.</SectionHeading>

          <ol role="list" style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
            {[
              { n: '01', text: 'Press the shortcut.', strong: false },
              { n: '02', text: 'Ask your question.', strong: false },
              { n: '03', text: 'Nexpot looks at your Blender screen and shows you what to do next.', strong: true },
            ].map(({ n, text, strong }, i) => (
              <li key={n} style={{
                display: 'flex',
                gap: 20,
                alignItems: 'flex-start',
                padding: `${i === 0 ? 0 : 18}px 0 18px`,
                borderBottom: i < 2 ? `1px solid ${C.border}` : 'none',
              }}>
                <span aria-hidden="true" style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: C.cyan,
                  opacity: 0.5,
                  flexShrink: 0,
                  marginTop: 3,
                  fontVariantNumeric: 'tabular-nums',
                  userSelect: 'none',
                  width: 18,
                  textAlign: 'right' as const,
                }}>
                  {n}
                </span>
                <p style={{
                  margin: 0,
                  fontSize: strong ? 16 : 15,
                  fontWeight: strong ? 600 : 400,
                  color: strong ? C.navy : C.slate,
                  lineHeight: 1.6,
                  letterSpacing: '-0.01em',
                }}>
                  {text}
                </p>
              </li>
            ))}
          </ol>

          <p style={{
            margin: '24px 0 0',
            fontSize: 13,
            fontWeight: 500,
            color: C.muted,
            letterSpacing: '-0.01em',
          }}>
            No searching. No guessing. No waiting.
          </p>
        </Section>

        {/* ── Common stuck moments ─────────────────────────────────────────── */}
        <Section bg={C.bg}>
          <SectionHeading>Common stuck moments in Blender</SectionHeading>

          <ul role="list" style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {STUCK_MOMENTS.map((item) => (
              <li key={item} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '12px 16px',
                borderRadius: 10,
                border: `1px solid ${C.border}`,
                background: 'white',
              }}>
                <Check size={13} strokeWidth={2.5} style={{ color: C.cyan, flexShrink: 0, marginTop: 2 }} aria-hidden />
                <span style={{ fontSize: 13, color: C.slate, lineHeight: 1.55, letterSpacing: '-0.01em' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── Stay in the flow ─────────────────────────────────────────────── */}
        <Section>
          <SectionHeading style={{ margin: '0 0 24px' }}>Stay in the flow.</SectionHeading>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { text: 'That is the product.',      weight: 400, color: C.muted  },
              { text: 'You do not leave Blender.', weight: 400, color: C.slate  },
              { text: 'You do not stop to search.',weight: 400, color: C.slate  },
              { text: 'You keep working.',          weight: 600, color: C.navy   },
            ].map(({ text, weight, color }, i) => (
              <p key={text} style={{
                margin: 0,
                paddingTop: i === 0 ? 0 : 8,
                fontSize: i === 3 ? 17 : 15,
                fontWeight: weight,
                color,
                lineHeight: 1.6,
                letterSpacing: '-0.01em',
              }}>
                {text}
              </p>
            ))}
          </div>
        </Section>

        {/* ── Choose how to use it ─────────────────────────────────────────── */}
        <Section bg={C.bg}>
          <SectionHeading>Choose how you want to use it.</SectionHeading>

          <p style={{
            margin: '0 0 28px',
            fontSize: 15,
            color: C.slate,
            lineHeight: 1.65,
            maxWidth: 420,
            letterSpacing: '-0.01em',
          }}>
            Use Nexpot for Blender with a monthly plan, or buy credits when you need fast help right now.
          </p>

          <a
            href="/#pricing"
            style={{
              ...btnBase,
              fontSize: 13,
              padding: '9px 18px',
              border: '1px solid rgba(0,0,0,0.14)',
              background: 'white',
              color: C.navy,
            }}
            onMouseEnter={(e) => hoverOutline(e.currentTarget as HTMLElement, true)}
            onMouseLeave={(e) => hoverOutline(e.currentTarget as HTMLElement, false)}
            onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
            onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
          >
            See pricing
          </a>
        </Section>

        {/* ── Educator strip ───────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(48px,7vw,72px) 24px',
          borderBottom: `1px solid ${C.border}`,
          background: 'white',
        }}>
          <div style={{ maxWidth: 1120, margin: '0 auto' }}>
            <div style={{
              borderRadius: 20,
              border: `1px solid ${C.border}`,
              background: C.bg,
              padding: 'clamp(28px,4vw,40px) clamp(28px,4vw,44px)',
              display: 'flex',
              flexWrap: 'wrap' as const,
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: '1 1 260px', minWidth: 220 }}>
                <p style={{
                  margin: 0,
                  fontSize: 'clamp(17px,2vw,22px)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: C.navy,
                  lineHeight: 1.2,
                }}>
                  Teach Blender?
                </p>
                <p style={{
                  margin: 0,
                  fontSize: 14,
                  color: C.slate,
                  lineHeight: 1.6,
                  maxWidth: 360,
                  letterSpacing: '-0.01em',
                }}>
                  Give your students a support layer they can use when they get stuck.
                </p>
              </div>
              <a
                href="/contact"
                style={{ ...btnBase, fontSize: 13, padding: '10px 20px', background: C.navy, color: 'white', flex: '0 0 auto' }}
                onMouseEnter={(e) => hoverPrimary(e.currentTarget as HTMLElement, true)}
                onMouseLeave={(e) => hoverPrimary(e.currentTarget as HTMLElement, false)}
                onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
                onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                Become a partner
              </a>
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────────── */}
        <section style={{ padding: 'clamp(96px,14vw,144px) 24px', background: 'white' }}>
          <div style={{
            maxWidth: 480,
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <h2 style={{
              margin: '0 0 16px',
              fontSize: 'clamp(32px,5vw,52px)',
              fontWeight: 700,
              letterSpacing: '-0.038em',
              lineHeight: 1.06,
              color: C.navy,
            }}>
              Try Nexpot for Blender free.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 32 }}>
              <p style={{ margin: 0, fontSize: 15, color: C.muted, letterSpacing: '-0.01em' }}>Get unstuck faster.</p>
              <p style={{ margin: 0, fontSize: 15, color: C.muted, letterSpacing: '-0.01em' }}>Stay in Blender.</p>
            </div>

            <a
              href="/#download"
              style={{ ...btnBase, fontSize: 15, padding: '14px 30px', background: C.navy, color: 'white' }}
              onMouseEnter={(e) => hoverPrimary(e.currentTarget as HTMLElement, true)}
              onMouseLeave={(e) => hoverPrimary(e.currentTarget as HTMLElement, false)}
              onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
              onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              Download now
              <ArrowRight size={15} strokeWidth={2.5} aria-hidden />
            </a>

            <p style={{ margin: '14px 0 0', fontSize: 12, color: C.faint, letterSpacing: '-0.01em' }}>
              Windows & Mac
            </p>
          </div>
        </section>

      </main>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
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
