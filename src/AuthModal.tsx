import { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';

const C = {
  navy:    '#0f172a',
  cyan:    '#06b6d4',
  cyanHov: '#22d3ee',
  slate:   '#64748b',
  muted:   '#94a3b8',
  border:  'rgba(0,0,0,0.07)',
} as const;

const FOCUS_RING = `0 0 0 3px rgba(6,182,212,0.35)`;

type Mode = 'choose' | 'email';

export interface SignedInUser {
  name: string;
  email: string;
}

interface Props {
  onClose: () => void;
  onSignIn: (user: SignedInUser) => void;
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  );
}

export default function AuthModal({ onClose, onSignIn }: Props) {
  const [mode, setMode] = useState<Mode>('choose');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  // Focus trap + ESC
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    firstFocusRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, [onClose]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  }, [onClose]);

  function validateEmail(val: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function handleEmailContinue(e: React.FormEvent) {
    e.preventDefault();
    let valid = true;
    if (!name.trim()) { setNameError('Full name is required.'); valid = false; } else setNameError('');
    if (!validateEmail(email)) { setEmailError('Enter a valid email address.'); valid = false; } else setEmailError('');
    if (!valid) return;
    const firstName = name.trim().split(/\s+/)[0];
    onSignIn({ name: firstName, email: email.trim() });
    onClose();
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    border: `1px solid rgba(0,0,0,0.14)`,
    borderRadius: 10,
    padding: '11px 14px',
    fontSize: 14,
    color: C.navy,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    background: 'white',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 12,
    fontWeight: 600,
    color: C.slate,
    marginBottom: 6,
    letterSpacing: '-0.01em',
  };

  const errorStyle: React.CSSProperties = {
    fontSize: 12,
    color: '#dc2626',
    marginTop: 4,
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        background: 'rgba(15,23,42,0.45)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 400,
          background: 'white',
          borderRadius: 20,
          border: `1px solid ${C.border}`,
          boxShadow: '0 24px 80px rgba(15,23,42,0.20)',
          padding: '36px 32px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Close */}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            borderRadius: 8,
            border: 'none',
            background: 'transparent',
            color: C.muted,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s, color 0.15s',
            outline: 'none',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f1f5f9'; (e.currentTarget as HTMLElement).style.color = C.navy; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.muted; }}
          onFocus={(e)  => (e.currentTarget.style.boxShadow = FOCUS_RING)}
          onBlur={(e)   => (e.currentTarget.style.boxShadow = 'none')}
        >
          <X size={16} aria-hidden />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <h2
            id="auth-modal-title"
            style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em', color: C.navy }}
          >
            Sign in
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: C.slate, letterSpacing: '-0.01em' }}>
            Choose Google or email to continue.
          </p>
        </div>

        {mode === 'choose' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Google */}
            <button
              ref={firstFocusRef}
              type="button"
              onClick={() => { onSignIn({ name: 'Gabor', email: 'gabor@gmail.com' }); onClose(); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                width: '100%',
                padding: '11px 20px',
                borderRadius: 100,
                border: '1px solid rgba(0,0,0,0.14)',
                background: 'white',
                color: C.navy,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '-0.01em',
                fontFamily: 'inherit',
                transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s',
                outline: 'none',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.26)'; (e.currentTarget as HTMLElement).style.background = '#f8fafc'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.14)'; (e.currentTarget as HTMLElement).style.background = 'white'; }}
              onFocus={(e)  => (e.currentTarget.style.boxShadow = FOCUS_RING)}
              onBlur={(e)   => (e.currentTarget.style.boxShadow = 'none')}
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.07)' }} />
              <span style={{ fontSize: 11, color: C.muted, fontWeight: 500, letterSpacing: '0.04em' }}>OR</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.07)' }} />
            </div>

            {/* Email */}
            <button
              type="button"
              onClick={() => setMode('email')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                width: '100%',
                padding: '11px 20px',
                borderRadius: 100,
                border: 'none',
                background: C.navy,
                color: 'white',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '-0.01em',
                fontFamily: 'inherit',
                transition: 'background 0.15s, box-shadow 0.15s, transform 0.15s',
                outline: 'none',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = C.cyan; (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 24px rgba(6,182,212,0.28)`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = C.navy; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              onFocus={(e)  => (e.currentTarget.style.boxShadow = FOCUS_RING)}
              onBlur={(e)   => (e.currentTarget.style.boxShadow = 'none')}
            >
              Continue with email
            </button>
          </div>
        ) : (
          <form onSubmit={handleEmailContinue} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label htmlFor="auth-name" style={labelStyle}>Full name</label>
              <input
                ref={firstFocusRef as React.RefObject<HTMLInputElement>}
                id="auth-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => { setName(e.target.value); if (nameError) setNameError(''); }}
                placeholder="Jane Smith"
                style={{ ...inputStyle, borderColor: nameError ? '#dc2626' : 'rgba(0,0,0,0.14)' }}
                onFocus={(e)  => (e.currentTarget.style.boxShadow = FOCUS_RING)}
                onBlur={(e)   => (e.currentTarget.style.boxShadow = 'none')}
                aria-describedby={nameError ? 'auth-name-error' : undefined}
                aria-invalid={!!nameError}
              />
              {nameError && <p id="auth-name-error" role="alert" style={errorStyle}>{nameError}</p>}
            </div>

            <div>
              <label htmlFor="auth-email" style={labelStyle}>Email address</label>
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(''); }}
                placeholder="you@example.com"
                style={{ ...inputStyle, borderColor: emailError ? '#dc2626' : 'rgba(0,0,0,0.14)' }}
                onFocus={(e)  => (e.currentTarget.style.boxShadow = FOCUS_RING)}
                onBlur={(e)   => (e.currentTarget.style.boxShadow = 'none')}
                aria-describedby={emailError ? 'auth-email-error' : undefined}
                aria-invalid={!!emailError}
              />
              {emailError && <p id="auth-email-error" role="alert" style={errorStyle}>{emailError}</p>}
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px 20px',
                borderRadius: 100,
                border: 'none',
                background: C.navy,
                color: 'white',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '-0.01em',
                fontFamily: 'inherit',
                transition: 'background 0.15s, box-shadow 0.15s, transform 0.15s',
                outline: 'none',
                marginTop: 4,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = C.cyan; (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 24px rgba(6,182,212,0.28)`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = C.navy; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              onFocus={(e)  => (e.currentTarget.style.boxShadow = FOCUS_RING)}
              onBlur={(e)   => (e.currentTarget.style.boxShadow = 'none')}
            >
              Continue
            </button>

            <button
              type="button"
              onClick={() => { setMode('choose'); setNameError(''); setEmailError(''); }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                color: C.muted,
                fontFamily: 'inherit',
                letterSpacing: '-0.01em',
                padding: '0',
                textAlign: 'center',
                transition: 'color 0.15s',
                outline: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.navy)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
              onFocus={(e)  => (e.currentTarget.style.boxShadow = FOCUS_RING)}
              onBlur={(e)   => (e.currentTarget.style.boxShadow = 'none')}
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
