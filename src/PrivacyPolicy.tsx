const C = {
  navy:  '#0f172a',
  cyan:  '#06b6d4',
  slate: '#64748b',
  muted: '#94a3b8',
  faint: '#cbd5e1',
  border: 'rgba(0,0,0,0.07)',
} as const;

const font: React.CSSProperties = {
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  color: C.navy,
};

const para: React.CSSProperties = {
  margin: '0 0 20px',
  fontSize: 15,
  color: C.slate,
  lineHeight: 1.75,
  fontWeight: 400,
};

const h2Style: React.CSSProperties = {
  margin: '40px 0 12px',
  fontSize: 16,
  fontWeight: 600,
  letterSpacing: '-0.02em',
  color: C.navy,
};

const listStyle: React.CSSProperties = {
  margin: '0 0 20px',
  padding: '0 0 0 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
};

const listItem: React.CSSProperties = {
  fontSize: 15,
  color: C.slate,
  lineHeight: 1.7,
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white" style={font}>
      {/* Nav bar */}
      <header style={{ borderBottom: `1px solid ${C.border}`, padding: '0 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center' }}>
          <a
            href="/"
            style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.02em', color: C.navy, textDecoration: 'none' }}
          >
            Nexpot
          </a>
        </div>
      </header>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) 24px clamp(80px, 10vw, 120px)' }}>
        {/* Meta */}
        <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: C.cyan }}>
          Legal
        </p>

        <h1 style={{ margin: '0 0 8px', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: C.navy }}>
          Privacy Policy
        </h1>
        <p style={{ margin: '0 0 48px', fontSize: 13, color: C.muted }}>Last updated: April 24, 2026</p>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 40 }}>
          <p style={para}>Nexpot respects your privacy.</p>
          <p style={para}>
            This Privacy Policy explains how we collect, use, and protect information when you visit our website or submit information through our forms.
          </p>

          <h2 style={h2Style}>Information we may collect</h2>
          <p style={para}>We may collect information you choose to provide, including:</p>
          <ul style={listStyle}>
            {[
              'your name',
              'your email address',
              'your company name',
              'your company website',
              'your social media account or website',
              'estimated seats needed for team plans',
            ].map((item) => (
              <li key={item} style={listItem}>{item}</li>
            ))}
          </ul>
          <p style={para}>
            We may also collect limited technical information automatically, such as browser or device information, for basic site performance, security, and analytics purposes.
          </p>

          <h2 style={h2Style}>How we use information</h2>
          <p style={para}>We may use the information we collect to:</p>
          <ul style={listStyle}>
            {[
              'respond to your inquiry',
              'contact you about Nexpot',
              'review team plan or affiliate requests',
              'improve our website and service',
              'maintain security and performance',
            ].map((item) => (
              <li key={item} style={listItem}>{item}</li>
            ))}
          </ul>

          <h2 style={h2Style}>Data sharing</h2>
          <p style={para}>
            We may use trusted service providers to help operate our website, forms, analytics, and communications. We do not share information beyond what is reasonably necessary to operate the service and respond to requests.
          </p>

          <h2 style={h2Style}>Data retention</h2>
          <p style={para}>
            We keep information only for as long as necessary to respond to inquiries, operate the service, comply with legal obligations, and improve our business.
          </p>

          <h2 style={h2Style}>Your choices</h2>
          <p style={para}>
            You may contact us at any time to request access, correction, or deletion of the information you have submitted to us, subject to applicable law.
          </p>

          <h2 style={h2Style}>Contact</h2>
          <p style={{ ...para, marginBottom: 4 }}>If you have questions about this Privacy Policy, you can contact us at:</p>
          <a
            href="mailto:hello@nexpot.ai"
            style={{ fontSize: 15, color: C.navy, fontWeight: 500, textDecoration: 'none', letterSpacing: '-0.01em', borderBottom: `1px solid ${C.border}`, paddingBottom: 1, transition: 'border-color 0.15s' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.cyan)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
          >
            hello@nexpot.ai
          </a>
        </div>
      </main>

      <footer role="contentinfo" style={{ borderTop: `1px solid ${C.border}`, padding: '28px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 12, color: C.faint }}>© 2026 Nexpot. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="/privacy" style={{ fontSize: 12, color: C.muted, textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/terms"   style={{ fontSize: 12, color: C.muted, textDecoration: 'none' }}>Terms &amp; Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
