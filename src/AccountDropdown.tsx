import { useEffect, useRef } from 'react';
import { LogOut, CreditCard, ChevronDown } from 'lucide-react';
import { type SignedInUser } from './AuthModal';

const C = {
  navy:    '#0f172a',
  cyan:    '#06b6d4',
  cyanHov: '#22d3ee',
  slate:   '#64748b',
  muted:   '#94a3b8',
  border:  'rgba(0,0,0,0.07)',
} as const;

const FOCUS_RING = `0 0 0 3px rgba(6,182,212,0.35)`;

interface Props {
  user: SignedInUser;
  credits: number;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSignOut: () => void;
  onBuyCredits: () => void;
}

export default function AccountDropdown({ user, credits, open, onToggle, onClose, onSignOut, onBuyCredits }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // ESC + outside click
  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    function onPointer(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, [open, onClose]);

  function handleBuyCredits() {
    onBuyCredits();
  }

  function fmtCredits(n: number) {
    return n.toLocaleString('en-US');
  }

  function handleSignOut() {
    onSignOut();
    onClose();
  }

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Trigger pill */}
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={onToggle}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 9,
          borderRadius: 100,
          border: `1px solid ${open ? 'rgba(0,0,0,0.16)' : 'rgba(0,0,0,0.10)'}`,
          background: open ? '#f1f5f9' : '#f8fafc',
          color: C.navy,
          fontFamily: 'inherit',
          fontSize: 13,
          fontWeight: 500,
          padding: '6px 12px 6px 6px',
          cursor: 'pointer',
          letterSpacing: '-0.01em',
          outline: 'none',
          whiteSpace: 'nowrap',
          transition: 'background 0.15s, border-color 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={(e) => {
          if (!open) (e.currentTarget as HTMLElement).style.background = '#f1f5f9';
        }}
        onMouseLeave={(e) => {
          if (!open) (e.currentTarget as HTMLElement).style.background = '#f8fafc';
        }}
        onFocus={(e)  => (e.currentTarget.style.boxShadow = FOCUS_RING)}
        onBlur={(e)   => (e.currentTarget.style.boxShadow = 'none')}
      >
        {/* Avatar */}
        <span
          aria-hidden="true"
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: C.cyan,
            color: 'white',
            fontSize: 12,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            letterSpacing: 0,
          }}
        >
          {user.name.charAt(0).toUpperCase()}
        </span>
        <span>Hello, {user.name}! You have {fmtCredits(credits)} credits left.</span>
        <ChevronDown
          size={13}
          strokeWidth={2.5}
          aria-hidden
          style={{
            flexShrink: 0,
            color: C.muted,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          role="menu"
          aria-label="Account menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: 256,
            background: 'white',
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            boxShadow: '0 8px 40px rgba(15,23,42,0.14), 0 1px 4px rgba(0,0,0,0.06)',
            overflow: 'hidden',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            zIndex: 60,
          }}
        >
          {/* Identity */}
          <div
            style={{
              padding: '16px 18px 14px',
              borderBottom: `1px solid ${C.border}`,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: C.cyan,
                color: 'white',
                fontSize: 14,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, overflow: 'hidden' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.navy, letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Hello, {user.name}
              </span>
              <span style={{ fontSize: 12, color: C.muted, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.email}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              padding: '14px 18px',
              borderBottom: `1px solid ${C.border}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: C.slate, letterSpacing: '-0.01em' }}>Current balance</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.navy, letterSpacing: '-0.01em' }}>{fmtCredits(credits)} credits</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: C.slate, letterSpacing: '-0.01em' }}>Usage in 7 days</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.navy, letterSpacing: '-0.01em' }}>131 events</span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ padding: '8px 8px' }}>
            <button
              role="menuitem"
              type="button"
              onClick={handleBuyCredits}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '9px 10px',
                borderRadius: 10,
                border: 'none',
                background: C.navy,
                color: 'white',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '-0.01em',
                fontFamily: 'inherit',
                transition: 'background 0.15s, box-shadow 0.15s',
                outline: 'none',
                marginBottom: 4,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = C.cyan; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = C.navy; }}
              onFocus={(e)  => (e.currentTarget.style.boxShadow = FOCUS_RING)}
              onBlur={(e)   => (e.currentTarget.style.boxShadow = 'none')}
            >
              <CreditCard size={14} strokeWidth={2} aria-hidden />
              Buy more credits
            </button>

            <button
              role="menuitem"
              type="button"
              onClick={handleSignOut}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '9px 10px',
                borderRadius: 10,
                border: 'none',
                background: 'transparent',
                color: C.slate,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                letterSpacing: '-0.01em',
                fontFamily: 'inherit',
                transition: 'background 0.15s, color 0.15s',
                outline: 'none',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f8fafc'; (e.currentTarget as HTMLElement).style.color = C.navy; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.slate; }}
              onFocus={(e)  => (e.currentTarget.style.boxShadow = FOCUS_RING)}
              onBlur={(e)   => (e.currentTarget.style.boxShadow = 'none')}
            >
              <LogOut size={14} strokeWidth={2} aria-hidden />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
