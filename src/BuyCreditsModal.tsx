import { useEffect, useRef, useState } from 'react';
import { X, CreditCard, Check } from 'lucide-react';

const C = {
  navy:    '#0f172a',
  cyan:    '#06b6d4',
  cyanHov: '#22d3ee',
  slate:   '#64748b',
  muted:   '#94a3b8',
  border:  'rgba(0,0,0,0.07)',
} as const;

const FOCUS_RING = `0 0 0 3px rgba(6,182,212,0.35)`;

interface Package {
  id: string;
  credits: number;
  price: string;
  label: string;
  popular: boolean;
}

const PACKAGES: Package[] = [
  { id: 'lg', credits: 3000, price: '€11.99', label: 'One-time fee', popular: false },
  { id: 'md', credits: 1500, price: '€6.99',  label: 'Most popular',  popular: true  },
  { id: 'sm', credits: 250,  price: '€1.99',  label: 'One-time fee', popular: false },
];

interface Props {
  currentBalance: number;
  onClose: () => void;
  onConfirm: (credits: number) => void;
}

export default function BuyCreditsModal({ currentBalance, onClose, onConfirm }: Props) {
  const [selected, setSelected]     = useState<string | null>('md');
  const [success, setSuccess]       = useState(false);
  const overlayRef                  = useRef<HTMLDivElement>(null);
  const closeRef                    = useRef<HTMLButtonElement>(null);

  const selectedPkg = PACKAGES.find((p) => p.id === selected) ?? null;
  const newBalance  = selectedPkg ? currentBalance + selectedPkg.credits : null;

  function fmt(n: number) {
    return n.toLocaleString('en-US');
  }

  useEffect(() => {
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) onClose();
  }

  function handleConfirm() {
    if (!selectedPkg) return;
    onConfirm(selectedPkg.credits);
    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1400);
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="buy-credits-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(15,23,42,0.45)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        animation: 'bcFadeIn 0.18s ease',
      }}
    >
      <style>{`
        @keyframes bcFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bcSlideUp { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes bcPop { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      <div
        style={{
          background: 'white',
          borderRadius: 24,
          boxShadow: '0 24px 80px rgba(15,23,42,0.22), 0 4px 16px rgba(0,0,0,0.08)',
          width: '100%',
          maxWidth: 460,
          padding: '32px 32px 28px',
          position: 'relative',
          animation: 'bcSlideUp 0.22s cubic-bezier(0.22,1,0.36,1)',
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Close button */}
        <button
          ref={closeRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: `1px solid ${C.border}`,
            background: '#f8fafc',
            color: C.muted,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            outline: 'none',
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f1f5f9'; (e.currentTarget as HTMLElement).style.color = C.navy; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#f8fafc'; (e.currentTarget as HTMLElement).style.color = C.muted; }}
          onFocus={(e)  => (e.currentTarget.style.boxShadow = FOCUS_RING)}
          onBlur={(e)   => (e.currentTarget.style.boxShadow = 'none')}
        >
          <X size={14} strokeWidth={2} aria-hidden />
        </button>

        {success ? (
          /* Success state */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              padding: '20px 0 12px',
              animation: 'bcPop 0.22s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'rgba(6,182,212,0.10)',
                border: `1.5px solid rgba(6,182,212,0.25)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Check size={22} strokeWidth={2.5} style={{ color: C.cyan }} aria-hidden />
            </div>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', color: C.navy }}>
              Credits added successfully.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: 'rgba(6,182,212,0.08)',
                  border: `1px solid rgba(6,182,212,0.18)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <CreditCard size={15} strokeWidth={2} style={{ color: C.cyan }} aria-hidden />
              </span>
              <h2
                id="buy-credits-title"
                style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: '-0.025em', color: C.navy }}
              >
                Buy more credits
              </h2>
            </div>

            <p style={{ margin: '6px 0 2px', fontSize: 13, color: C.slate, letterSpacing: '-0.01em' }}>
              Choose a one-time credit package.
            </p>
            <p style={{ margin: '0 0 24px', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: C.muted }}>
              One-time fee. No subscription.
            </p>

            {/* Packages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {PACKAGES.map((pkg) => {
                const isSelected = selected === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelected(pkg.id)}
                    aria-pressed={isSelected}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      borderRadius: 14,
                      border: isSelected
                        ? `1.5px solid ${C.cyan}`
                        : `1px solid ${C.border}`,
                      background: isSelected ? 'rgba(6,182,212,0.04)' : 'white',
                      cursor: 'pointer',
                      outline: 'none',
                      textAlign: 'left',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.15s, background 0.15s, box-shadow 0.15s',
                      boxShadow: isSelected ? `0 0 0 3px rgba(6,182,212,0.12)` : 'none',
                    }}
                    onFocus={(e)  => { if (!isSelected) (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
                    onBlur={(e)   => { if (!isSelected) (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                  >
                    {pkg.popular && (
                      <span
                        style={{
                          position: 'absolute',
                          top: -10,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: C.cyan,
                          color: 'white',
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          padding: '2px 10px',
                          borderRadius: 100,
                          whiteSpace: 'nowrap',
                          textTransform: 'uppercase',
                        }}
                      >
                        Most popular
                      </span>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {/* Radio indicator */}
                      <span
                        aria-hidden="true"
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          border: isSelected ? `5px solid ${C.cyan}` : `1.5px solid rgba(0,0,0,0.18)`,
                          flexShrink: 0,
                          transition: 'border 0.15s',
                        }}
                      />
                      <div>
                        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em', color: C.navy }}>
                          {fmt(pkg.credits)} credits
                        </p>
                        <p style={{ margin: 0, fontSize: 11, color: C.muted, marginTop: 1 }}>
                          {pkg.label}
                        </p>
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        letterSpacing: '-0.025em',
                        color: isSelected ? C.cyan : C.navy,
                        transition: 'color 0.15s',
                      }}
                    >
                      {pkg.price}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Balance summary */}
            <div
              style={{
                background: '#f8fafc',
                borderRadius: 12,
                border: `1px solid ${C.border}`,
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                marginBottom: 24,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: C.slate, letterSpacing: '-0.01em' }}>Current balance</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.navy, letterSpacing: '-0.01em' }}>
                  {fmt(currentBalance)} credits
                </span>
              </div>
              {newBalance !== null && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: C.slate, letterSpacing: '-0.01em' }}>New balance after purchase</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.cyan, letterSpacing: '-0.01em' }}>
                    {fmt(newBalance)} credits
                  </span>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!selected}
                style={{
                  flex: 1,
                  borderRadius: 100,
                  border: 'none',
                  background: selected ? C.navy : '#e2e8f0',
                  color: selected ? 'white' : C.muted,
                  fontSize: 13,
                  fontWeight: 600,
                  padding: '11px 20px',
                  cursor: selected ? 'pointer' : 'not-allowed',
                  letterSpacing: '-0.01em',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'background 0.15s, box-shadow 0.15s, transform 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (selected) {
                    (e.currentTarget as HTMLElement).style.background = C.cyan;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 24px rgba(6,182,212,0.28)`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selected) {
                    (e.currentTarget as HTMLElement).style.background = C.navy;
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }
                }}
                onFocus={(e)  => { if (selected) (e.currentTarget.style.boxShadow = FOCUS_RING); }}
                onBlur={(e)   => { if (selected) (e.currentTarget.style.boxShadow = 'none'); }}
              >
                Add credits
              </button>

              <button
                type="button"
                onClick={onClose}
                style={{
                  borderRadius: 100,
                  border: `1px solid ${C.border}`,
                  background: 'transparent',
                  color: C.slate,
                  fontSize: 13,
                  fontWeight: 500,
                  padding: '11px 20px',
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'background 0.15s, border-color 0.15s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f8fafc'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.14)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = C.border; }}
                onFocus={(e)  => (e.currentTarget.style.boxShadow = FOCUS_RING)}
                onBlur={(e)   => (e.currentTarget.style.boxShadow = 'none')}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
