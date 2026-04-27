import { useState, useRef, useEffect } from 'react';
import { Settings, X, ArrowLeft, Zap, Plus, ChevronRight } from 'lucide-react';

type View = 'main' | 'settings';
type Mode = 'fast' | 'pro';

// ── Design tokens ────────────────────────────────────────────────────────────
const C = {
  navy:       '#0f172a',
  navyLight:  '#1e293b',
  navyBorder: '#2d3f55',
  cyan:       '#06b6d4',
  cyanDim:    'rgba(6,182,212,0.12)',
  cyanGlow:   'rgba(6,182,212,0.22)',
  slate:      '#64748b',
  muted:      '#94a3b8',
  faint:      '#cbd5e1',
  panelBg:    '#111827',
  panelBg2:   '#0f1623',
  surface:    'rgba(255,255,255,0.04)',
  surfaceHov: 'rgba(255,255,255,0.07)',
  border:     'rgba(255,255,255,0.07)',
  borderMid:  'rgba(255,255,255,0.10)',
  borderSub:  'rgba(255,255,255,0.05)',
} as const;

// ── Helpers ──────────────────────────────────────────────────────────────────
function IconBtn({
  children, onClick, label, active = false,
}: {
  children: React.ReactNode; onClick?: () => void; label: string; active?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      aria-label={label}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 28, height: 28, borderRadius: 7, border: 'none',
        background: active || hov ? C.border : 'transparent',
        color: active ? C.cyan : hov ? C.faint : C.muted,
        cursor: 'pointer', transition: 'background 0.12s, color 0.12s',
        flexShrink: 0, padding: 0, outline: 'none',
      }}
    >
      {children}
    </button>
  );
}

function StatusDot() {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: C.cyan,
        boxShadow: `0 0 6px ${C.cyan}`, display: 'inline-block', flexShrink: 0,
      }} />
      <span style={{ fontSize: 11, fontWeight: 500, color: C.cyan, letterSpacing: '0.02em' }}>
        Active
      </span>
    </span>
  );
}

// ── Keycap pill ──────────────────────────────────────────────────────────────
function Keycap({ children }: { children: string }) {
  return (
    <kbd style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      padding: '2px 7px',
      borderRadius: 5,
      fontSize: 11,
      fontWeight: 500,
      fontFamily: 'inherit',
      letterSpacing: '0.01em',
      color: C.muted,
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.10)',
      boxShadow: '0 1px 0 rgba(0,0,0,0.4)',
      lineHeight: 1.5,
      userSelect: 'none' as const,
      whiteSpace: 'nowrap' as const,
    }}>
      {children}
    </kbd>
  );
}

// ── Section label ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
  return (
    <p style={{
      margin: 0,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.09em',
      textTransform: 'uppercase' as const,
      color: 'rgba(255,255,255,0.25)',
      userSelect: 'none' as const,
    }}>
      {children}
    </p>
  );
}

// ── Auto-grow textarea ───────────────────────────────────────────────────────
function AutoTextarea({
  value, onChange, placeholder,
}: {
  value: string; onChange: (v: string) => void; placeholder: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }, [value]);

  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%',
        boxSizing: 'border-box' as const,
        resize: 'none',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        color: C.faint,
        fontSize: 13,
        fontWeight: 400,
        fontFamily: 'inherit',
        lineHeight: 1.6,
        letterSpacing: '-0.01em',
        padding: 0,
        maxHeight: 160,
        overflowY: 'auto' as const,
      }}
    />
  );
}

// ── Main view ────────────────────────────────────────────────────────────────
function MainView() {
  const [mode, setMode] = useState<Mode>('fast');
  const [question, setQuestion] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

      {/* Intro line */}
      <div style={{ padding: '13px 16px 0' }}>
        <p style={{
          margin: 0,
          fontSize: 12,
          color: 'rgba(255,255,255,0.38)',
          lineHeight: 1.55,
          letterSpacing: '-0.01em',
          fontWeight: 400,
        }}>
          Talk, type, or open the panel. Nexpot guides the next step.
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: C.border, margin: '13px 0 0' }} />

      {/* Shortcuts */}
      <div style={{ padding: '13px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SectionLabel>Shortcuts</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 2 }}>
          {[
            { label: 'Talk',       keys: ['ctrl', 'option'] },
            { label: 'Open panel', keys: ['ctrl', 'shift', 'option'] },
          ].map(({ label, keys }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: C.muted, letterSpacing: '-0.01em', flexShrink: 0 }}>
                {label}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {keys.map((k, i) => (
                  <span key={k} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {i > 0 && <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)' }}>+</span>}
                    <Keycap>{k}</Keycap>
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: C.border }} />

      {/* Response mode */}
      <div style={{ padding: '13px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <SectionLabel>Response mode</SectionLabel>
            <p style={{
              margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.28)',
              letterSpacing: '-0.01em', lineHeight: 1.4,
            }}>
              Fast is quicker. Pro is more thoughtful.
            </p>
          </div>

          {/* Segmented control */}
          <div style={{
            display: 'flex',
            background: 'rgba(0,0,0,0.30)',
            borderRadius: 8,
            padding: 3,
            gap: 2,
            border: `1px solid ${C.borderSub}`,
            flexShrink: 0,
          }}>
            {(['fast', 'pro'] as Mode[]).map((m) => {
              const active = mode === m;
              return (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    fontFamily: 'inherit',
                    letterSpacing: '0.01em',
                    textTransform: 'capitalize' as const,
                    padding: '4px 11px',
                    borderRadius: 5,
                    border: 'none',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'background 0.12s, color 0.12s, box-shadow 0.12s',
                    background: active ? C.cyan : 'transparent',
                    color: active ? 'white' : C.muted,
                    boxShadow: active ? '0 1px 4px rgba(6,182,212,0.35)' : 'none',
                  }}
                >
                  {m === 'fast' ? 'Fast' : 'Pro'}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: C.border }} />

      {/* Ask question */}
      <div style={{ padding: '13px 16px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SectionLabel>Type a question</SectionLabel>

        <div style={{
          background: 'rgba(0,0,0,0.25)',
          border: `1px solid ${C.borderMid}`,
          borderRadius: 10,
          padding: '10px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          transition: 'border-color 0.15s',
        }}
          onFocusCapture={(e) => { (e.currentTarget as HTMLElement).style.borderColor = C.cyanGlow; }}
          onBlurCapture={(e)  => { (e.currentTarget as HTMLElement).style.borderColor = C.borderMid; }}
        >
          <AutoTextarea
            value={question}
            onChange={setQuestion}
            placeholder="Type your question…"
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              disabled={!question.trim()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '5px 14px',
                borderRadius: 100,
                border: 'none',
                background: question.trim() ? C.cyan : 'rgba(6,182,212,0.18)',
                color: question.trim() ? 'white' : 'rgba(6,182,212,0.45)',
                fontSize: 12,
                fontWeight: 600,
                fontFamily: 'inherit',
                letterSpacing: '-0.01em',
                cursor: question.trim() ? 'pointer' : 'default',
                transition: 'background 0.15s, color 0.15s, box-shadow 0.15s',
                outline: 'none',
              }}
              onMouseEnter={(e) => {
                if (question.trim()) {
                  (e.currentTarget as HTMLElement).style.background = '#22d3ee';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(6,182,212,0.35)';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = question.trim() ? C.cyan : 'rgba(6,182,212,0.18)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              Ask
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: C.border }} />

      {/* Credits */}
      <div style={{
        padding: '13px 16px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <p style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            color: C.faint,
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}>
            7,105
          </p>
          <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.30)', letterSpacing: '-0.01em' }}>
            credits available
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
          <button
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '5px 12px',
              borderRadius: 100,
              border: `1px solid ${C.borderMid}`,
              background: 'rgba(255,255,255,0.05)',
              color: C.faint,
              fontSize: 11,
              fontWeight: 600,
              fontFamily: 'inherit',
              letterSpacing: '-0.01em',
              cursor: 'pointer',
              outline: 'none',
              transition: 'background 0.12s, border-color 0.12s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
              (e.currentTarget as HTMLElement).style.borderColor = C.borderMid;
            }}
          >
            <Plus size={10} strokeWidth={2.5} aria-hidden />
            Buy credits
          </button>
          <p style={{ margin: 0, fontSize: 10, color: 'rgba(255,255,255,0.20)', letterSpacing: '-0.01em' }}>
            Add more anytime
          </p>
        </div>
      </div>

    </div>
  );
}

// ── Toggle switch ─────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        width: 32,
        height: 18,
        borderRadius: 100,
        border: 'none',
        background: checked ? C.cyan : 'rgba(255,255,255,0.12)',
        cursor: 'pointer',
        padding: 0,
        position: 'relative' as const,
        flexShrink: 0,
        transition: 'background 0.18s',
        outline: 'none',
        boxShadow: checked ? `0 0 0 1px ${C.cyanGlow}` : 'none',
      }}
    >
      <span style={{
        position: 'absolute' as const,
        top: 2,
        left: checked ? 16 : 2,
        width: 14,
        height: 14,
        borderRadius: '50%',
        background: 'white',
        transition: 'left 0.18s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
      }} />
    </button>
  );
}

// ── Settings row variants ─────────────────────────────────────────────────────
function SettingsRow({
  title,
  description,
  right,
  destructive = false,
  onClick,
  disabled = false,
}: {
  title: string;
  description?: string;
  right?: React.ReactNode;
  destructive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const [hov, setHov] = useState(false);
  const isClickable = !!onClick;

  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => isClickable && !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      onKeyDown={(e) => { if (isClickable && !disabled && (e.key === 'Enter' || e.key === ' ')) onClick?.(); }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '10px 16px',
        cursor: isClickable && !disabled ? 'pointer' : 'default',
        background: hov ? 'rgba(255,255,255,0.04)' : 'transparent',
        transition: 'background 0.1s',
        outline: 'none',
        opacity: disabled ? 0.45 : 1,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
        <span style={{
          fontSize: 12,
          fontWeight: 500,
          color: destructive ? '#f87171' : C.faint,
          letterSpacing: '-0.01em',
          lineHeight: 1.4,
          whiteSpace: 'nowrap' as const,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {title}
        </span>
        {description && (
          <span style={{
            fontSize: 11,
            color: destructive ? 'rgba(248,113,113,0.55)' : 'rgba(255,255,255,0.28)',
            letterSpacing: '-0.01em',
            lineHeight: 1.4,
          }}>
            {description}
          </span>
        )}
      </div>

      {right && (
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          {right}
        </div>
      )}
    </div>
  );
}

function SoonBadge() {
  return (
    <span style={{
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      color: 'rgba(255,255,255,0.35)',
      background: 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: 100,
      padding: '2px 7px',
      userSelect: 'none' as const,
    }}>
      Soon
    </span>
  );
}

function RowDivider() {
  return <div style={{ height: 1, background: C.border, margin: '0 16px' }} />;
}

function SettingsGroup({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: C.surface,
      borderRadius: 10,
      border: `1px solid ${C.border}`,
      overflow: 'hidden',
      margin: '0 12px',
    }}>
      {children}
    </div>
  );
}

// ── Settings view ─────────────────────────────────────────────────────────────
function SettingsView({ onBack }: { onBack: () => void }) {
  const [backHov, setBackHov] = useState(false);
  const [defaultMode, setDefaultMode] = useState<Mode>('fast');
  const [economyVoice, setEconomyVoice] = useState(false);
  const [textOnly, setTextOnly] = useState(false);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>

      {/* Sub-header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px 10px 14px',
        borderBottom: `1px solid ${C.border}`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={onBack}
            onMouseEnter={() => setBackHov(true)}
            onMouseLeave={() => setBackHov(false)}
            aria-label="Back to main view"
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '3px 0', color: backHov ? C.faint : C.muted,
              fontSize: 12, fontWeight: 500, letterSpacing: '-0.01em',
              fontFamily: 'inherit', transition: 'color 0.12s', outline: 'none',
            }}
          >
            <ArrowLeft size={12} strokeWidth={2.5} />
            Back
          </button>

          <span style={{ width: 1, height: 10, background: C.border, display: 'inline-block' }} />

          <span style={{ fontSize: 12, fontWeight: 600, color: C.faint, letterSpacing: '-0.01em' }}>
            Settings
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <StatusDot />
          <IconBtn label="Close panel">
            <X size={14} strokeWidth={2.2} />
          </IconBtn>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{
        flex: 1,
        overflowY: 'auto' as const,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: '10px 0 14px',
      }}>

        {/* Group 1: Autopilot + Default mode + toggles */}
        <SettingsGroup>
          <SettingsRow
            title="Autopilot"
            description="Coming soon"
            right={<SoonBadge />}
            disabled
          />
          <RowDivider />
          <SettingsRow
            title="Default mode"
            description="Choose how Nexpot replies by default."
            right={
              <div style={{
                display: 'flex',
                background: 'rgba(0,0,0,0.30)',
                borderRadius: 7,
                padding: 3,
                gap: 2,
                border: `1px solid ${C.borderSub}`,
              }}>
                {(['fast', 'pro'] as Mode[]).map((m) => {
                  const active = defaultMode === m;
                  return (
                    <button
                      key={m}
                      onClick={() => setDefaultMode(m)}
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        fontFamily: 'inherit',
                        letterSpacing: '0.01em',
                        textTransform: 'capitalize' as const,
                        padding: '3px 9px',
                        borderRadius: 4,
                        border: 'none',
                        cursor: 'pointer',
                        outline: 'none',
                        transition: 'background 0.12s, color 0.12s',
                        background: active ? C.cyan : 'transparent',
                        color: active ? 'white' : C.muted,
                        boxShadow: active ? '0 1px 4px rgba(6,182,212,0.35)' : 'none',
                      }}
                    >
                      {m === 'fast' ? 'Fast' : 'Pro'}
                    </button>
                  );
                })}
              </div>
            }
          />
          <RowDivider />
          <SettingsRow
            title="Economy voice"
            description="Lower voice cost. Slightly less precise transcription."
            right={<Toggle checked={economyVoice} onChange={setEconomyVoice} />}
          />
          <RowDivider />
          <SettingsRow
            title="Text-only replies"
            description="Show the text bubble without reading replies aloud."
            right={<Toggle checked={textOnly} onChange={setTextOnly} />}
          />
        </SettingsGroup>

        {/* Group 2: Updates + credits */}
        <SettingsGroup>
          <SettingsRow
            title="Check for updates"
            right={<ChevronRight size={13} strokeWidth={2} color="rgba(255,255,255,0.25)" />}
            onClick={() => {}}
          />
          <RowDivider />
          <SettingsRow
            title="Buy credits"
            description="7,105 credits available"
            right={<ChevronRight size={13} strokeWidth={2} color="rgba(255,255,255,0.25)" />}
            onClick={() => {}}
          />
        </SettingsGroup>

        {/* Group 3: Account */}
        <SettingsGroup>
          <SettingsRow
            title="Sign out"
            description="balazs@walterscube.com"
            right={<ChevronRight size={13} strokeWidth={2} color="rgba(255,255,255,0.25)" />}
            onClick={() => {}}
          />
        </SettingsGroup>

        {/* Group 4: Destructive */}
        <SettingsGroup>
          <SettingsRow
            title="Quit Nexpot"
            destructive
            right={<ChevronRight size={13} strokeWidth={2} color="rgba(248,113,113,0.35)" />}
            onClick={() => {}}
          />
        </SettingsGroup>

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

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '11px 12px 11px 14px',
        borderBottom: `1px solid ${C.border}`,
        background: `linear-gradient(180deg, ${C.panelBg} 0%, rgba(17,24,39,0) 100%)`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 22, height: 22, borderRadius: 6, background: C.cyan,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Zap size={12} strokeWidth={2.5} color="white" aria-hidden />
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.faint, letterSpacing: '-0.02em', lineHeight: 1 }}>
            Nexpot
          </span>
          <span style={{ width: 1, height: 12, background: C.border, display: 'inline-block', flexShrink: 0 }} />
          <StatusDot />
        </div>
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

      {/* Body */}
      {view === 'main'
        ? <MainView />
        : <SettingsView onBack={() => setView('main')} />
      }
    </div>
  );
}

// ── Preview page ──────────────────────────────────────────────────────────────
export default function PanelPreview() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0d1117',
      backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(6,182,212,0.08) 0%, transparent 60%)`,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      padding: 24,
    }}>
      <Panel />
      <p style={{
        marginTop: 28,
        fontSize: 11, fontWeight: 500, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', userSelect: 'none',
      }}>
        Panel preview — /panel-preview
      </p>
    </div>
  );
}
