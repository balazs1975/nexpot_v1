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

export default function TermsConditions() {
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
          Terms &amp; Conditions
        </h1>
        <p style={{ margin: '0 0 48px', fontSize: 13, color: C.muted }}>Last updated: April 24, 2026</p>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 40 }}>
          <p style={para}>Welcome to Nexpot.</p>
          <p style={para}>
            These Terms &amp; Conditions govern your access to and use of the Nexpot website and related services. By using this website or submitting information through our forms, you agree to these terms.
          </p>

          <h2 style={h2Style}>Use of the website</h2>
          <p style={para}>
            You may use this website only for lawful purposes and in a way that does not harm Nexpot, its users, or its services.
          </p>
          <p style={para}>
            You agree not to misuse the website, interfere with its operation, attempt unauthorized access, or use the site in a way that could damage, disable, or disrupt the service.
          </p>

          <h2 style={h2Style}>Product and service information</h2>
          <p style={para}>
            We aim to keep the information on this website accurate and up to date. However, some features, pricing, availability, and product details may change over time without notice.
          </p>

          <h2 style={h2Style}>Intellectual property</h2>
          <p style={para}>
            All content on this website, including text, branding, visuals, and design elements, is owned by Nexpot or used with permission, unless otherwise stated. You may not copy, reproduce, distribute, or use this content without prior written permission.
          </p>

          <h2 style={h2Style}>No warranty</h2>
          <p style={para}>
            This website and related materials are provided on an "as is" and "as available" basis. We do not guarantee uninterrupted availability, error-free operation, or that the website will always meet your expectations.
          </p>

          <h2 style={h2Style}>Limitation of liability</h2>
          <p style={para}>
            To the maximum extent permitted by law, Nexpot shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website or related services.
          </p>

          <h2 style={h2Style}>Third-party links and services</h2>
          <p style={para}>
            This website may contain links to third-party services or rely on third-party providers. We are not responsible for the content, policies, or practices of third parties.
          </p>

          <h2 style={h2Style}>Changes to these terms</h2>
          <p style={para}>
            We may update these Terms &amp; Conditions from time to time. Continued use of the website after changes are posted means you accept the updated terms.
          </p>

          <h2 style={h2Style}>Contact</h2>
          <p style={{ ...para, marginBottom: 4 }}>If you have questions about these Terms &amp; Conditions, contact us at:</p>
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
