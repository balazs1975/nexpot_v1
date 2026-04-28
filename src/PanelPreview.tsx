import { useState } from 'react';
import { Settings, X, ArrowLeft, Zap } from 'lucide-react';

type View = 'main' | 'settings';

// ── Design tokens (matches Nexpot brand) ─────────────────────────────────────
const C = {
  navy:       '#0f172a',
  navyLight:  '#1e293b',
  navyBorder: '#2d3f55',
  cyan:       '#06b6d4',
  cyanDim:    'rgba(6,182,212,0.12)',
  slate:      '#64748b',
  muted:      '#94a3b8',
  faint:      '#cbd5e1',
  panelBg:    '#111827',
  panelBg2:   '#0f1623',
  border:     'rgba(255,255,255,0.07)',
  borderMid:  'rgba(255,255,255,0.10)',
} as const;

// ── Micro icon button ────────────────────────────────────────────────────────
function IconBtn({
  children,
  onClick,
  label,
  active = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  label: string;
  active?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      aria-label={label}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: 7,
        border: 'none',
        background: active || hov ? C.border : 'transparent',
        color: active ? C.cyan : hov ? C.faint : C.muted,
        cursor: 'pointer',
        transition: 'background 0.12s, color 0.12s',
        flexShrink: 0,
        padding: 0,
        outline: 'none',
      }}
    >
      {children}
    </button>
  );
}

// ── Status dot ───────────────────────────────────────────────────────────────
function StatusDot() {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <span style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: C.cyan,
        boxShadow: `0 0 6px ${C.cyan}`,
        display: 'inline-block',
        flexShrink: 0,
      }} />
      <span style={{ fontSize: 11, fontWeight: 500, color: C.cyan, letterSpacing: '0.02em' }}>
        Active
      </span>
    </span>
  );
}

// ── Main view placeholder ────────────────────────────────────────────────────
function MainView() {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: '32px 20px',
    }}>
      <span style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        color: C.slate,
        userSelect: 'none',
      }}>
        Main view
      </span>
      <span style={{
        fontSize: 12,
        color: C.navyBorder,
        letterSpacing: '-0.01em',
      }}>
        Content goes here
      </span>
    </div>
  );
}

// ── Settings view placeholder ────────────────────────────────────────────────
function SettingsView({ onBack }: { onBack: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Settings sub-header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 14px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <button
          onClick={onBack}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          aria-label="Back to main view"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '3px 0',
            color: hov ? C.faint : C.muted,
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '-0.01em',
            fontFamily: 'inherit',
            transition: 'color 0.12s',
            outline: 'none',
          }}
        >
          <ArrowLeft size={13} strokeWidth={2.5} />
          Back
        </button>
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          color: C.faint,
          letterSpacing: '-0.01em',
          marginLeft: 4,
        }}>
          Settings
        </span>
      </div>

      {/* Placeholder */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '32px 20px',
      }}>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.09em',
          textTransform: 'uppercase' as const,
          color: C.slate,
          userSelect: 'none',
        }}>
          Settings view
        </span>
        <span style={{
          fontSize: 12,
          color: C.navyBorder,
          letterSpacing: '-0.01em',
        }}>
          Content goes here
        </span>
      </div>
    </div>
  );
}

// ── Panel ────────────────────────────────────────────────────────────────────
function Panel() {
  const [view, setView] = useState<View>('main');

  return (
    <div style={{
      width: 320,
      minHeight: 400,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 18,
      background: C.panelBg,
      border: `1px solid ${C.borderMid}`,
      boxShadow: `
        0 0 0 0.5px rgba(0,0,0,0.5),
        0 4px 6px -1px rgba(0,0,0,0.35),
        0 16px 48px -8px rgba(0,0,0,0.55),
        0 0 0 1px rgba(255,255,255,0.04) inset
      `,
      overflow: 'hidden',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    }}>

      {/* ── Header ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '11px 12px 11px 14px',
        borderBottom: `1px solid ${C.border}`,
        background: `linear-gradient(180deg, ${C.panelBg} 0%, rgba(17,24,39,0) 100%)`,
        flexShrink: 0,
      }}>
        {/* Left: logo + name + status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Logo mark */}
          <span style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            background: C.cyan,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Zap size={12} strokeWidth={2.5} color="white" aria-hidden />
          </span>

          <span style={{
            fontSize: 13,
            fontWeight: 600,
            color: C.faint,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>
            Nexpot
          </span>

          {/* Separator */}
          <span style={{
            width: 1,
            height: 12,
            background: C.border,
            display: 'inline-block',
            flexShrink: 0,
          }} />

          <StatusDot />
        </div>

        {/* Right: settings + close */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconBtn
            label="Open settings"
            onClick={() => setView(view === 'settings' ? 'main' : 'settings')}
            active={view === 'settings'}
          >
            <Settings size={14} strokeWidth={2} />
          </IconBtn>
          <IconBtn label="Close panel">
            <X size={14} strokeWidth={2.2} />
          </IconBtn>
        </div>
      </div>

      {/* ── Body ── */}
      {view === 'main'
        ? <MainView />
        : <SettingsView onBack={() => setView('main')} />
      }

    </div>
  );
}

// ── Preview page ─────────────────────────────────────────────────────────────
export default function PanelPreview() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0d1117',
      backgroundImage: `
        radial-gradient(ellipse 80% 50% at 50% -10%, rgba(6,182,212,0.08) 0%, transparent 60%)
      `,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      padding: 24,
    }}>
      <Panel />

      {/* Preview label */}
      <p style={{
        marginTop: 28,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.18)',
        userSelect: 'none',
      }}>
        Panel preview — /panel-preview
      </p>
    </div>
  );
}
