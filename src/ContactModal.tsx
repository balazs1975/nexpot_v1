import { useEffect, useRef, useCallback, useState } from 'react';
import { X, Check } from 'lucide-react';
import { supabase } from './supabase';

// ── Shared tokens (duplicated minimally to keep this file self-contained) ────
const C = {
  navy:   '#0f172a',
  cyan:   '#06b6d4',
  slate:  '#64748b',
  muted:  '#94a3b8',
  border: 'rgba(0,0,0,0.08)',
  error:  '#ef4444',
} as const;

const FOCUS_RING = `0 0 0 3px rgba(6,182,212,0.30)`;

// ── Types ────────────────────────────────────────────────────────────────────
export type ModalType = 'teams' | 'affiliate';

interface Props {
  type: ModalType;
  onClose: () => void;
}

// ── Field helpers ─────────────────────────────────────────────────────────────
function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function Field({
  label,
  id,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label
        htmlFor={id}
        style={{ fontSize: 13, fontWeight: 500, color: C.navy, letterSpacing: '-0.01em' }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '10px 14px',
          borderRadius: 10,
          border: `1px solid ${error ? C.error : C.border}`,
          fontSize: 14,
          color: C.navy,
          background: 'white',
          outline: 'none',
          fontFamily: 'inherit',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = error ? C.error : C.cyan;
          e.currentTarget.style.boxShadow = FOCUS_RING;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? C.error : C.border;
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
      {error && (
        <span
          id={`${id}-error`}
          role="alert"
          style={{ fontSize: 12, color: C.error }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
export default function ContactModal({ type, onClose }: Props) {
  // Form state
  const [name,            setName]           = useState('');
  const [email,           setEmail]          = useState('');
  const [companyName,     setCompanyName]    = useState('');
  const [companyWebsite,  setCompanyWebsite] = useState('');
  const [estimatedSeats,  setEstimatedSeats] = useState('');
  const [socialOrWebsite, setSocialOrWebsite] = useState('');

  const [errors,   setErrors]   = useState<Record<string, string>>({});
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);

  const dialogRef   = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const title = type === 'teams'
    ? 'Talk to us about team plans'
    : 'Join the affiliate program';

  // Focus trap & ESC
  useEffect(() => {
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, input, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled'));

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Click outside
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  // Validation
  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim())  errs.name  = 'Required';
    if (!email.trim()) errs.email = 'Required';
    else if (!isValidEmail(email)) errs.email = 'Enter a valid email address';

    if (type === 'teams') {
      if (!companyName.trim())    errs.companyName    = 'Required';
      if (!companyWebsite.trim()) errs.companyWebsite = 'Required';
      if (!estimatedSeats.trim()) errs.estimatedSeats = 'Required';
    } else {
      if (!socialOrWebsite.trim()) errs.socialOrWebsite = 'Required';
    }
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setErrors({});

    const { error } = await supabase.from('contact_submissions').insert({
      type,
      name:              name.trim(),
      email:             email.trim(),
      company_name:      companyName.trim(),
      company_website:   companyWebsite.trim(),
      estimated_seats:   estimatedSeats.trim(),
      social_or_website: socialOrWebsite.trim(),
    });

    setLoading(false);
    if (!error) {
      setSuccess(true);
    } else {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      role="presentation"
      onClick={handleBackdropClick}
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
        animation: 'fadeIn 0.18s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          width: '100%',
          maxWidth: 480,
          background: 'white',
          borderRadius: 20,
          boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
          overflow: 'hidden',
          animation: 'slideUp 0.22s ease',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 24px 0',
          }}
        >
          <h2
            id="modal-title"
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: C.navy,
            }}
          >
            {title}
          </h2>
          <button
            ref={closeBtnRef}
            aria-label="Close"
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: C.muted,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.12s, color 0.12s',
              outline: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = C.navy; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.muted; }}
            onFocus={(e)  => (e.currentTarget.style.boxShadow = FOCUS_RING)}
            onBlur={(e)   => (e.currentTarget.style.boxShadow = 'none')}
          >
            <X size={16} aria-hidden />
          </button>
        </div>

        {/* Body */}
        {success ? (
          <div
            style={{
              padding: '32px 24px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              textAlign: 'center',
            }}
          >
            <span
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'rgba(6,182,212,0.08)',
                border: '1px solid rgba(6,182,212,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Check size={20} style={{ color: C.cyan }} aria-hidden />
            </span>
            <p
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: 500,
                color: C.navy,
                lineHeight: 1.55,
                letterSpacing: '-0.01em',
              }}
            >
              Thanks for your interest. A team member will contact you soon.
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: 4,
                borderRadius: 100,
                background: C.navy,
                color: 'white',
                border: 'none',
                padding: '10px 24px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                letterSpacing: '-0.01em',
                transition: 'background 0.15s',
                outline: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.cyan)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.navy)}
              onFocus={(e)  => (e.currentTarget.style.boxShadow = FOCUS_RING)}
              onBlur={(e)   => (e.currentTarget.style.boxShadow = 'none')}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div
              style={{
                padding: '24px 24px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              {type === 'teams' && (
                <>
                  <Field
                    id="company-name"
                    label="Company name"
                    value={companyName}
                    onChange={(v) => { setCompanyName(v); setErrors((p) => ({ ...p, companyName: '' })); }}
                    error={errors.companyName}
                  />
                  <Field
                    id="company-website"
                    label="Company website"
                    value={companyWebsite}
                    onChange={(v) => { setCompanyWebsite(v); setErrors((p) => ({ ...p, companyWebsite: '' })); }}
                    error={errors.companyWebsite}
                    placeholder="https://"
                  />
                </>
              )}

              <Field
                id="contact-name"
                label="Your name"
                value={name}
                onChange={(v) => { setName(v); setErrors((p) => ({ ...p, name: '' })); }}
                error={errors.name}
              />
              <Field
                id="contact-email"
                label="Email address"
                type="email"
                value={email}
                onChange={(v) => { setEmail(v); setErrors((p) => ({ ...p, email: '' })); }}
                error={errors.email}
                placeholder="you@example.com"
              />

              {type === 'teams' && (
                <Field
                  id="estimated-seats"
                  label="Estimated seats needed"
                  value={estimatedSeats}
                  onChange={(v) => { setEstimatedSeats(v); setErrors((p) => ({ ...p, estimatedSeats: '' })); }}
                  error={errors.estimatedSeats}
                  placeholder="e.g. 10–50"
                />
              )}

              {type === 'affiliate' && (
                <Field
                  id="social-or-website"
                  label="Social media account or website"
                  value={socialOrWebsite}
                  onChange={(v) => { setSocialOrWebsite(v); setErrors((p) => ({ ...p, socialOrWebsite: '' })); }}
                  error={errors.socialOrWebsite}
                  placeholder="https:// or @handle"
                />
              )}

              {errors.submit && (
                <p role="alert" style={{ margin: 0, fontSize: 13, color: C.error }}>
                  {errors.submit}
                </p>
              )}
            </div>

            {/* Footer actions */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 10,
                padding: '20px 24px 24px',
                borderTop: `1px solid rgba(0,0,0,0.06)`,
                marginTop: 20,
              }}
            >
              <button
                type="button"
                onClick={onClose}
                style={{
                  borderRadius: 100,
                  border: '1px solid rgba(0,0,0,0.12)',
                  background: 'white',
                  color: C.slate,
                  padding: '10px 20px',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  letterSpacing: '-0.01em',
                  transition: 'border-color 0.15s, color 0.15s',
                  outline: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.navy; e.currentTarget.style.color = C.navy; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; e.currentTarget.style.color = C.slate; }}
                onFocus={(e)  => (e.currentTarget.style.boxShadow = FOCUS_RING)}
                onBlur={(e)   => (e.currentTarget.style.boxShadow = 'none')}
              >
                Close
              </button>

              <button
                type="submit"
                disabled={loading}
                style={{
                  borderRadius: 100,
                  background: loading ? C.muted : C.navy,
                  color: 'white',
                  border: 'none',
                  padding: '10px 22px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: loading ? 'default' : 'pointer',
                  fontFamily: 'inherit',
                  letterSpacing: '-0.01em',
                  transition: 'background 0.15s, box-shadow 0.15s',
                  outline: 'none',
                  minWidth: 96,
                }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = C.cyan; }}
                onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = C.navy; }}
                onFocus={(e)  => (e.currentTarget.style.boxShadow = FOCUS_RING)}
                onBlur={(e)   => (e.currentTarget.style.boxShadow = 'none')}
              >
                {loading ? 'Sending…' : type === 'affiliate' ? 'Apply now' : 'Request team plan'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
