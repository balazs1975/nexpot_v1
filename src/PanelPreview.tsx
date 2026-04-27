import { useState, useRef, useEffect, useCallback } from 'react';
import { Settings, X, ArrowLeft, Zap, Plus, ChevronRight } from 'lucide-react';

type View = 'main' | 'settings';
type Mode = 'fast' | 'pro';

// ── Design tokens ─────────────────────────────────────────────────────────────
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
  surface:    'rgba(255,255,255,0.035)',
  surfaceHov: 'rgba(255,255,255,0.06)',
  border:     'rgba(255,255,255,0.07)',
  borderMid:  'rgba(255,255,255,0.10)',
  borderSub:  'rgba(255,255,255,0.05)',
  focus:      'rgba(6,182,212,0.55)',
} as const;

// Focus ring shared style — applied via onFocus/onBlur
const focusRing = `0 0 0 2px ${C.focus}`;

// ── Icon button ───────────────────────────────────────────────────────────────
function IconBtn({
  children, onClick, label, active = false,
}: {
  children: React.ReactNode; onClick?: () => void; label: string; active?: boolean;
}) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  return (
    <button
      aria-label={label}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 28, height: 28, borderRadius: 7, border: 'none',
        background: active || hov ? 'rgba(255,255,255,0.08)' : 'transparent',
        color: active ? C.cyan : hov ? C.faint : C.muted,
        cursor: 'pointer',
        transition: 'background 0.12s, color 0.12s, box-shadow 0.12s',
        flexShrink: 0, padding: 0, outline: 'none',
        boxShadow: foc ? focusRing : 'none',
      }}
    >
      {children}
    </button>
  );
}

// ── Status dot ────────────────────────────────────────────────────────────────
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

// ── Keycap ────────────────────────────────────────────────────────────────────
function Keycap({ children }: { children: string }) {
  return (
    <kbd style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      padding: '2px 7px', borderRadius: 5, fontSize: 11, fontWeight: 500,
      fontFamily: 'inherit', letterSpacing: '0.01em', color: C.muted,
      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.11)',
      boxShadow: '0 1px 0 rgba(0,0,0,0.45)', lineHeight: 1.5,
      userSelect: 'none' as const, whiteSpace: 'nowrap' as const,
    }}>
      {children}
    </kbd>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
  return (
    <p style={{
      margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: '0.09em',
      textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.22)',
      userSelect: 'none' as const,
    }}>
      {children}
    </p>
  );
}

// ── Segmented control ─────────────────────────────────────────────────────────
function Segmented({
  value, onChange, size = 'md',
}: {
  value: Mode; onChange: (v: Mode) => void; size?: 'sm' | 'md';
}) {
  const [foc, setFoc] = useState<Mode | null>(null);
  const sm = size === 'sm';
  return (
    <div
      role="group"
      aria-label="Response mode"
      style={{
        display: 'flex',
        background: 'rgba(0,0,0,0.32)',
        borderRadius: sm ? 7 : 8,
        padding: 3,
        gap: 2,
        border: `1px solid ${C.borderSub}`,
        flexShrink: 0,
      }}
    >
      {(['fast', 'pro'] as Mode[]).map((m) => {
        const active = value === m;
        return (
          <button
            key={m}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(m)}
            onFocus={() => setFoc(m)}
            onBlur={() => setFoc(null)}
            style={{
              fontSize: sm ? 10 : 11,
              fontWeight: 600,
              fontFamily: 'inherit',
              letterSpacing: '0.01em',
              padding: sm ? '3px 9px' : '4px 12px',
              borderRadius: sm ? 4 : 5,
              border: 'none',
              cursor: 'pointer',
              outline: 'none',
              transition: 'background 0.14s, color 0.14s, box-shadow 0.14s',
              background: active ? C.cyan : 'transparent',
              color: active ? 'white' : C.muted,
              boxShadow: foc === m
                ? focusRing
                : active
                  ? '0 1px 5px rgba(6,182,212,0.40)'
                  : 'none',
            }}
          >
            {m === 'fast' ? 'Fast' : 'Pro'}
          </button>
        );
      })}
    </div>
  );
}

// ── Toggle ────────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  const [foc, setFoc] = useState(false);
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{
        width: 30,
        height: 17,
        borderRadius: 100,
        border: 'none',
        background: checked ? C.cyan : 'rgba(255,255,255,0.13)',
        cursor: 'pointer',
        padding: 0,
        position: 'relative' as const,
        flexShrink: 0,
        transition: 'background 0.17s, box-shadow 0.12s',
        outline: 'none',
        boxShadow: foc ? focusRing : checked ? `0 0 0 1px ${C.cyanGlow}` : 'none',
      }}
    >
      <span style={{
        position: 'absolute' as const,
        top: 2,
        left: checked ? 15 : 2,
        width: 13,
        height: 13,
        borderRadius: '50%',
        background: 'white',
        transition: 'left 0.17s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.45)',
      }} />
    </button>
  );
}

// ── Auto-grow textarea ────────────────────────────────────────────────────────
const MAX_TEXTAREA_H = 140;

function AutoTextarea({
  value, onChange, placeholder, onSubmit,
}: {
  value: string; onChange: (v: string) => void; placeholder: string; onSubmit?: () => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const resize = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = '0px';
    el.style.height = Math.min(el.scrollHeight, MAX_TEXTAREA_H) + 'px';
    el.style.overflowY = el.scrollHeight > MAX_TEXTAREA_H ? 'auto' : 'hidden';
  }, []);

  useEffect(() => { resize(); }, [value, resize]);

  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (value.trim()) onSubmit?.();
        }
      }}
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
        display: 'block',
        minHeight: '21px',
        overflowY: 'hidden' as const,
      }}
    />
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────
function Div({ indent = false }: { indent?: boolean }) {
  return (
    <div style={{
      height: 1,
      background: C.border,
      margin: indent ? '0 14px' : '0',
    }} />
  );
}

// ── Settings group ────────────────────────────────────────────────────────────
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

// ── Settings row ──────────────────────────────────────────────────────────────
function SettingsRow({
  title, description, right, destructive = false, onClick, disabled = false,
}: {
  title: string; description?: string; right?: React.ReactNode;
  destructive?: boolean; onClick?: () => void; disabled?: boolean;
}) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  const clickable = !!onClick && !disabled;

  return (
    <div
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? onClick : undefined}
      onMouseEnter={() => clickable && setHov(true)}
      onMouseLeave={() => { setHov(false); }}
      onFocus={() => clickable && setFoc(true)}
      onBlur={() => setFoc(false)}
      onKeyDown={(e) => { if (clickable && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onClick?.(); } }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12, padding: '9px 14px',
        cursor: clickable ? 'pointer' : 'default',
        background: hov || foc ? 'rgba(255,255,255,0.045)' : 'transparent',
        transition: 'background 0.1s',
        outline: 'none',
        opacity: disabled ? 0.42 : 1,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
        <span style={{
          fontSize: 12.5, fontWeight: 500,
          color: destructive ? '#f87171' : C.faint,
          letterSpacing: '-0.012em', lineHeight: 1.35,
        }}>
          {title}
        </span>
        {description && (
          <span style={{
            fontSize: 11,
            color: destructive ? 'rgba(248,113,113,0.52)' : 'rgba(255,255,255,0.27)',
            letterSpacing: '-0.01em', lineHeight: 1.4,
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

// ── Soon badge ────────────────────────────────────────────────────────────────
function SoonBadge() {
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
      textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.32)',
      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)',
      borderRadius: 100, padding: '2px 7px', userSelect: 'none' as const,
    }}>
      Soon
    </span>
  );
}

// ── Main view ─────────────────────────────────────────────────────────────────
function MainView() {
  const [mode, setMode] = useState<Mode>('fast');
  const [question, setQuestion] = useState('');
  const [boxFocused, setBoxFocused] = useState(false);

  const canAsk = question.trim().length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

      {/* Intro */}
      <div style={{ padding: '12px 16px 0' }}>
        <p style={{
          margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.36)',
          lineHeight: 1.55, letterSpacing: '-0.01em', fontWeight: 400,
        }}>
          Voice, type, or shortcut. Nexpot handles the rest.
        </p>
      </div>

      <Div indent={false} />

      {/* Shortcuts */}
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 7 }}>
        <SectionLabel>Shortcuts</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 1 }}>
          {[
            { label: 'Voice', keys: ['ctrl', 'option'] },
            { label: 'Panel', keys: ['ctrl', 'shift', 'option'] },
          ].map(({ label, keys }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: C.muted, letterSpacing: '-0.01em', flexShrink: 0 }}>
                {label}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {keys.map((k, i) => (
                  <span key={k} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    {i > 0 && <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.15)', fontWeight: 500 }}>+</span>}
                    <Keycap>{k}</Keycap>
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Div />

      {/* Response mode */}
      <div style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <SectionLabel>Mode</SectionLabel>
            <p style={{
              margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.26)',
              letterSpacing: '-0.01em', lineHeight: 1.4,
            }}>
              Fast replies quickly. Pro thinks it through.
            </p>
          </div>
          <Segmented value={mode} onChange={setMode} />
        </div>
      </div>

      <Div />

      {/* Ask */}
      <div style={{ padding: '12px 16px 14px', display: 'flex', flexDirection: 'column', gap: 7 }}>
        <SectionLabel>Ask</SectionLabel>
        <div
          style={{
            background: 'rgba(0,0,0,0.22)',
            border: `1px solid ${boxFocused ? 'rgba(6,182,212,0.35)' : C.borderMid}`,
            borderRadius: 10,
            padding: '9px 12px',
            display: 'flex', flexDirection: 'column', gap: 9,
            transition: 'border-color 0.15s',
          }}
        >
          <AutoTextarea
            value={question}
            onChange={setQuestion}
            placeholder="What do you need?"
            onSubmit={() => { /* send */ setQuestion(''); }}
          />
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            onFocusCapture={() => setBoxFocused(true)}
            onBlurCapture={() => setBoxFocused(false)}
          >
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.16)', letterSpacing: '-0.01em' }}>
              {canAsk ? 'Return to send · Shift+Return for new line' : ''}
            </span>
            <AskButton active={canAsk} onClick={() => setQuestion('')} />
          </div>
        </div>
      </div>

      <Div />

      {/* Credits */}
      <div style={{
        padding: '12px 16px 15px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <p style={{
            margin: 0, fontSize: 18, fontWeight: 700, color: C.faint,
            letterSpacing: '-0.04em', lineHeight: 1,
          }}>
            7,105
          </p>
          <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.28)', letterSpacing: '-0.01em' }}>
            credits remaining
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
          <BuyButton />
          <p style={{ margin: 0, fontSize: 10, color: 'rgba(255,255,255,0.18)', letterSpacing: '-0.01em' }}>
            Top up anytime
          </p>
        </div>
      </div>

    </div>
  );
}

// ── Ask button ────────────────────────────────────────────────────────────────
function AskButton({ active, onClick }: { active: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  return (
    <button
      disabled={!active}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '5px 16px', borderRadius: 100, border: 'none',
        background: active
          ? hov ? '#22d3ee' : C.cyan
          : 'rgba(6,182,212,0.15)',
        color: active ? 'white' : 'rgba(6,182,212,0.40)',
        fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
        letterSpacing: '-0.01em',
        cursor: active ? 'pointer' : 'default',
        transition: 'background 0.14s, color 0.14s, box-shadow 0.14s',
        outline: 'none',
        boxShadow: foc && active
          ? focusRing
          : active && hov
            ? '0 4px 14px rgba(6,182,212,0.32)'
            : 'none',
      }}
    >
      Ask
    </button>
  );
}

// ── Buy button ────────────────────────────────────────────────────────────────
function BuyButton() {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '5px 12px', borderRadius: 100,
        border: `1px solid ${hov ? 'rgba(255,255,255,0.17)' : C.borderMid}`,
        background: hov ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.045)',
        color: C.faint, fontSize: 11, fontWeight: 600, fontFamily: 'inherit',
        letterSpacing: '-0.01em', cursor: 'pointer',
        transition: 'background 0.12s, border-color 0.12s, box-shadow 0.12s',
        outline: 'none',
        boxShadow: foc ? focusRing : 'none',
      }}
    >
      <Plus size={10} strokeWidth={2.5} aria-hidden />
      Buy credits
    </button>
  );
}

// ── Settings view ─────────────────────────────────────────────────────────────
function SettingsView({ onBack }: { onBack: () => void }) {
  const [backHov, setBackHov] = useState(false);
  const [backFoc, setBackFoc] = useState(false);
  const [defaultMode, setDefaultMode] = useState<Mode>('fast');
  const [economyVoice, setEconomyVoice] = useState(false);
  const [textOnly, setTextOnly] = useState(false);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>

      {/* Sub-header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 12px 10px 14px',
        borderBottom: `1px solid ${C.border}`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={onBack}
            onMouseEnter={() => setBackHov(true)}
            onMouseLeave={() => setBackHov(false)}
            onFocus={() => setBackFoc(true)}
            onBlur={() => setBackFoc(false)}
            aria-label="Back to main view"
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '3px 0', color: backHov ? C.faint : C.muted,
              fontSize: 12, fontWeight: 500, letterSpacing: '-0.01em',
              fontFamily: 'inherit',
              transition: 'color 0.12s, box-shadow 0.12s',
              outline: 'none',
              borderRadius: 5,
              boxShadow: backFoc ? focusRing : 'none',
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
        flex: 1, overflowY: 'auto' as const,
        display: 'flex', flexDirection: 'column', gap: 7,
        padding: '10px 0 14px',
      }}>

        {/* Group 1 */}
        <SettingsGroup>
          <SettingsRow title="Autopilot" description="Coming soon" right={<SoonBadge />} disabled />
          <Div indent />
          <SettingsRow
            title="Default mode"
            description="How Nexpot responds by default."
            right={<Segmented value={defaultMode} onChange={setDefaultMode} size="sm" />}
          />
          <Div indent />
          <SettingsRow
            title="Economy voice"
            description="Reduces voice cost. Slightly less accurate."
            right={<Toggle checked={economyVoice} onChange={setEconomyVoice} />}
          />
          <Div indent />
          <SettingsRow
            title="Text only"
            description="Skip reading replies aloud."
            right={<Toggle checked={textOnly} onChange={setTextOnly} />}
          />
        </SettingsGroup>

        {/* Group 2 */}
        <SettingsGroup>
          <SettingsRow
            title="Check for updates"
            right={<ChevronRight size={13} strokeWidth={2} color="rgba(255,255,255,0.22)" />}
            onClick={() => {}}
          />
          <Div indent />
          <SettingsRow
            title="Buy credits"
            description="7,105 credits remaining"
            right={<ChevronRight size={13} strokeWidth={2} color="rgba(255,255,255,0.22)" />}
            onClick={() => {}}
          />
        </SettingsGroup>

        {/* Group 3 */}
        <SettingsGroup>
          <SettingsRow
            title="Sign out"
            description="balazs@walterscube.com"
            right={<ChevronRight size={13} strokeWidth={2} color="rgba(255,255,255,0.22)" />}
            onClick={() => {}}
          />
        </SettingsGroup>

        {/* Group 4 — destructive */}
        <SettingsGroup>
          <SettingsRow
            title="Quit Nexpot"
            destructive
            right={<ChevronRight size={13} strokeWidth={2} color="rgba(248,113,113,0.32)" />}
            onClick={() => {}}
          />
        </SettingsGroup>

      </div>
    </div>
  );
}

// ── Panel — animated view switcher ────────────────────────────────────────────
function Panel() {
  const [view, setView] = useState<View>('main');
  // Track previous view to drive exit direction
  const [animState, setAnimState] = useState<'idle' | 'exiting' | 'entering'>('idle');
  const [displayView, setDisplayView] = useState<View>('main');
  const nextView = useRef<View>('main');

  const switchView = useCallback((to: View) => {
    if (to === displayView || animState !== 'idle') return;
    nextView.current = to;
    setAnimState('exiting');
  }, [displayView, animState]);

  useEffect(() => {
    if (animState === 'exiting') {
      const t = setTimeout(() => {
        setDisplayView(nextView.current);
        setView(nextView.current);
        setAnimState('entering');
      }, 120);
      return () => clearTimeout(t);
    }
    if (animState === 'entering') {
      const t = setTimeout(() => setAnimState('idle'), 120);
      return () => clearTimeout(t);
    }
  }, [animState]);

  // Slide direction: main→settings goes left, settings→main goes right
  const toSettings = nextView.current === 'settings';
  const exitX   = animState === 'exiting'  ? (toSettings ? '-18px' : '18px') : '0px';
  const enterX  = animState === 'entering' ? '0px' : (toSettings ? '18px' : '-18px');
  const translateX = animState === 'exiting' ? exitX : animState === 'entering' ? enterX : '0px';
  const opacity = animState === 'idle' ? 1 : animState === 'entering' ? 1 : 0;

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
        0 20px 56px -8px rgba(0,0,0,0.58),
        0 0 0 1px rgba(255,255,255,0.04) inset
      `,
      overflow: 'hidden',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    }}>

      {/* Shared header — always visible */}
      {displayView === 'main' && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '11px 12px 11px 14px',
          borderBottom: `1px solid ${C.border}`,
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
              onClick={() => switchView('settings')}
              active={false}
            >
              <Settings size={14} strokeWidth={2} />
            </IconBtn>
            <IconBtn label="Close panel">
              <X size={14} strokeWidth={2.2} />
            </IconBtn>
          </div>
        </div>
      )}

      {/* Animated body */}
      <div style={{
        transform: `translateX(${translateX})`,
        opacity,
        transition: animState !== 'idle'
          ? 'transform 0.12s ease, opacity 0.12s ease'
          : 'none',
        display: 'flex', flexDirection: 'column', flex: 1,
      }}>
        {displayView === 'main'
          ? <MainView />
          : <SettingsView onBack={() => switchView('main')} />
        }
      </div>

    </div>
  );
}

// ── Preview page ──────────────────────────────────────────────────────────────
export default function PanelPreview() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: '#0d1117',
      backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(6,182,212,0.07) 0%, transparent 60%)`,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      padding: 24,
    }}>
      <Panel />
      <p style={{
        marginTop: 28, fontSize: 11, fontWeight: 500, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', userSelect: 'none',
      }}>
        Panel preview — /panel-preview
      </p>
    </div>
  );
}
