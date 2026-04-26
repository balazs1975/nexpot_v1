import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { ArrowRight, ArrowUpRight, Check, Menu, X } from 'lucide-react';
import ContactModal, { type ModalType } from './ContactModal';
import AuthModal, { type SignedInUser } from './AuthModal';
import AccountDropdown from './AccountDropdown';
import BuyCreditsModal from './BuyCreditsModal';

// ── Shared style tokens ──────────────────────────────────────────────────────
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

// ── Helpers ──────────────────────────────────────────────────────────────────
function hoverPrimary(el: HTMLElement, on: boolean) {
  el.style.background    = on ? C.cyan    : C.navy;
  el.style.boxShadow     = on ? `0 6px 24px rgba(6,182,212,0.28)` : 'none';
  el.style.transform     = on ? 'translateY(-1px)' : 'translateY(0)';
}

function hoverOutline(el: HTMLElement, on: boolean) {
  el.style.borderColor = on ? C.cyan  : 'rgba(0,0,0,0.14)';
  el.style.color       = on ? C.cyan  : C.navy;
  el.style.boxShadow   = on ? FOCUS_RING : 'none';
}

function hoverSubtle(el: HTMLElement, on: boolean) {
  el.style.borderColor = on ? C.navy  : 'rgba(0,0,0,0.12)';
  el.style.background  = on ? '#f8fafc' : 'transparent';
}

// ── Typewriter data ──────────────────────────────────────────────────────────
const QA_PAIRS = [
  { q: 'How do I select a different printer?',                       a: 'Click here and open the printer list, then choose the right device so this document goes to the printer you actually want.' },
  { q: 'How do I add a logo to my Gmail signature?',                 a: 'Click here and open Gmail signature settings, then insert your image so it appears automatically at the bottom of every email.' },
  { q: 'Why is Zoom not detecting my microphone?',                   a: 'Click here and open your audio input settings, then select the correct microphone so Zoom can hear your voice.' },
  { q: "Why can't I upload files to this Google Drive folder?",      a: 'Click here and open the folder sharing settings, then check if you have Editor access because Viewer access will block uploads.' },
  { q: 'How do I set up Google Workspace email for my domain?',      a: 'Click here and open your domain DNS settings, then add the mail records so your emails start arriving in Google Workspace instead of the old server.' },
  { q: 'How do I make the end of my video fade out in Premiere Pro?',a: 'Click here and open the transitions panel, then add a fade so the video ends smoothly instead of cutting off abruptly.' },
  { q: 'How do I combine multiple PDFs into one file?',              a: 'Click here and open the combine files tool, then merge the documents so everything is saved as one clean PDF.' },
  { q: 'How do I sign in with a different Windows user?',            a: 'Click here and switch to another user account, so you can open the correct desktop, files, and settings for that profile.' },
  { q: "Why can't I install this app even though I'm an admin?",     a: 'Click here and run the installer as administrator, which gives the setup the permission it needs to complete properly.' },
  { q: 'How do I stop Microsoft Edge from becoming my default browser again?', a: 'Click here and open default browser settings, then assign your preferred browser so links stop reopening in Edge.' },
  { q: 'How do I export a transparent background in Canva?',         a: 'Click here and open the download settings, then enable transparency so the background disappears in the exported file.' },
  { q: 'How do I keep the top row visible in Excel?',                a: 'Click here and open the Freeze Panes menu, then freeze the top row so your column headers stay visible while you scroll.' },
  { q: 'Why am I not getting Slack notifications?',                  a: 'Click here and open Slack notification settings, then turn notifications back on so new messages show up again.' },
  { q: 'How do I share a Notion page with someone?',                 a: 'Click here and open the Share menu, then add the person or copy the link so they can access the page.' },
  { q: 'How do I connect my domain to Shopify?',                     a: 'Click here and open your domain settings, then point the domain to Shopify so your store loads on the correct web address.' },
  { q: 'How do I start page numbers from page 2 in Word?',           a: 'Click here and open the header and footer settings, then break the section so numbering starts later without affecting the first page.' },
  { q: 'How do I share a Chrome tab with audio in Google Meet?',     a: 'Click here and choose Present a tab, then select the correct tab so both the screen and sound are shared.' },
  { q: 'How do I add a material to an object in Blender?',           a: 'Click here and open the Material Properties panel, then assign a material so the object gets its visible surface look.' },
  { q: 'How do I add a signature in Outlook?',                       a: 'Click here and open signature settings, then create or select your signature so it is added automatically to new emails.' },
  { q: 'Why does my laptop keep connecting to the wrong Wi-Fi network?', a: 'Click here and open your saved Wi-Fi settings, then remove or reprioritize the old network so your laptop joins the right one first.' },
] as const;

// ── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(items: readonly string[]) {
  const prefersReduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'erasing'>('typing');

  useEffect(() => {
    if (prefersReduced) {
      // Simple cross-fade swap
      const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 3200);
      setDisplayed(items[0]);
      return () => clearInterval(id);
    }

    const target = items[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (displayed.length < target.length) {
        const delay = 28 + Math.random() * 36; // 28–64 ms per char
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), delay);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 1800);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('erasing'), 400);
    } else {
      if (displayed.length > 0) {
        const delay = 12 + Math.random() * 14; // faster erase
        timeout = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), delay);
      } else {
        setIndex((i) => (i + 1) % items.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, index, phase, items, prefersReduced]);

  // When index changes and prefersReduced, update displayed text immediately
  useEffect(() => {
    if (prefersReduced) setDisplayed(items[index]);
  }, [index, items, prefersReduced]);

  return { displayed, isTyping: phase !== 'pausing', prefersReduced };
}

// ── Sub-components ───────────────────────────────────────────────────────────
function CyanArrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" focusable="false">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeroMockup() {
  const rows = [false, false, true, false];
  const answers = useMemo(() => QA_PAIRS.map((p) => p.a), []);
  const { displayed, isTyping, prefersReduced } = useTypewriter(answers);
  return (
    <div
      role="img"
      aria-label="Nexpot highlighting a setting on screen with a cyan arrow"
      style={{ position: 'relative', width: '100%', maxWidth: 360 }}
    >
      {/* Window */}
      <div
        style={{
          borderRadius: 24,
          overflow: 'hidden',
          background: 'white',
          border: `1px solid ${C.border}`,
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04), 0 20px 60px -10px rgba(0,0,0,0.10)',
        }}
      >
        {/* Chrome */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '12px 16px',
            background: '#f7f7f8',
            borderBottom: `1px solid rgba(0,0,0,0.06)`,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: '#e5e5e5' }} />
          ))}
          <span
            style={{
              flex: 1,
              marginLeft: 8,
              height: 20,
              borderRadius: 6,
              background: 'white',
              border: `1px solid rgba(0,0,0,0.07)`,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 8,
              fontSize: 10,
              fontWeight: 500,
              color: '#aaa',
            }}
          >
            settings.myapp.com
          </span>
        </div>

        {/* Rows */}
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 10, width: 80, borderRadius: 100, background: '#ebebeb', marginBottom: 4 }} />
          {rows.map((active, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 12,
                padding: '12px 14px',
                border: active ? '1.5px solid rgba(6,182,212,0.45)' : `1px solid rgba(0,0,0,0.05)`,
                background: active ? 'rgba(6,182,212,0.04)' : 'white',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: active ? 'rgba(6,182,212,0.2)' : '#ebebeb' }} />
                <div style={{ height: 8, width: active ? 88 : [64, 72, 52][i % 3], borderRadius: 100, background: active ? 'rgba(6,182,212,0.35)' : '#ebebeb' }} />
              </div>
              <div style={{ height: 6, width: 32, borderRadius: 100, background: active ? 'rgba(6,182,212,0.25)' : '#e8e8e8' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Arrow ring */}
      <div
        style={{
          position: 'absolute',
          right: -18,
          top: '58%',
          transform: 'translateY(-50%)',
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'rgba(6,182,212,0.10)',
          border: '1.5px solid rgba(6,182,212,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CyanArrow className="w-4 h-4 text-cyan-500" />
      </div>

      {/* Answer bubble */}
      <div
        style={{
          position: 'absolute',
          bottom: -20,
          right: -8,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          padding: '10px 14px',
          borderRadius: 16,
          background: 'white',
          border: `1px solid rgba(6,182,212,0.18)`,
          boxShadow: '0 8px 32px rgba(6,182,212,0.12), 0 1px 4px rgba(0,0,0,0.06)',
          maxWidth: 280,
        }}
      >
        <span
          style={{ width: 24, height: 24, borderRadius: '50%', background: C.cyan, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}
        >
          <CyanArrow className="w-3 h-3 text-white" />
        </span>
        <span
          aria-live="polite"
          aria-atomic="true"
          style={{ fontSize: 12, fontWeight: 500, color: C.navy, letterSpacing: '-0.01em', lineHeight: 1.5, wordBreak: 'break-word' }}
        >
          {displayed}
          {!prefersReduced && (
            <span
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: 1,
                height: '0.85em',
                background: C.cyan,
                marginLeft: 2,
                verticalAlign: 'text-bottom',
                animation: isTyping ? 'none' : 'nxBlink 1s step-end infinite',
                opacity: isTyping ? 1 : undefined,
              }}
            />
          )}
        </span>
      </div>
    </div>
  );
}

// ── How It Works Steps ───────────────────────────────────────────────────────
function HowItWorksSteps() {
  const questions = useMemo(() => QA_PAIRS.map((p) => p.q), []);
  const { displayed, isTyping, prefersReduced } = useTypewriter(questions);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* Steps */}
      <ol role="list" style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 32 }}>
        {[
          { n: '01', text: 'Press the shortcut.' },
          { n: '02', text: 'Ask your question.' },
          { n: '03', text: 'Nexpot understands what is on your screen and shows you how to continue.' },
        ].map(({ n, text }) => (
          <li key={n} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <span
                aria-hidden="true"
                style={{
                  display: 'block',
                  fontSize: 'clamp(28px, 3.5vw, 40px)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: C.cyan,
                  opacity: 0.18,
                  fontVariantNumeric: 'tabular-nums',
                  userSelect: 'none',
                }}
              >
                {n}
              </span>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(15px, 1.5vw, 17px)',
                fontWeight: 500,
                color: C.navy,
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                paddingTop: 4,
              }}
            >
              {text}
            </p>
          </li>
        ))}
      </ol>

      {/* Bottom line + rotating question */}
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 500, color: '#475569', letterSpacing: '-0.01em' }}>
          No searching. No guessing. No waiting for support.
        </p>
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{ minHeight: 28, display: 'flex', alignItems: 'center' }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 400,
              color: C.muted,
              letterSpacing: '-0.01em',
            }}
          >
            {displayed}
            {!prefersReduced && (
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: 1,
                  height: '0.85em',
                  background: C.muted,
                  marginLeft: 2,
                  verticalAlign: 'text-bottom',
                  animation: isTyping ? 'none' : 'nxBlink 1s step-end infinite',
                  opacity: isTyping ? 1 : undefined,
                }}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Pricing Cards ─────────────────────────────────────────────────────────────
function PricingCards() {
  const featureText = (s: string, dark = false) => ({
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 10,
    fontSize: 14,
    color: dark ? 'rgba(255,255,255,0.55)' : '#475569',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Main plans: Basic + Pro */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: 16,
          alignItems: 'stretch',
        }}
      >
        {/* Basic */}
        <article
          aria-label="Basic plan"
          style={{ borderRadius: 20, border: `1px solid ${C.border}`, background: 'white', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 28 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted }}>Basic</p>
            <p style={{ margin: 0, fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', color: C.navy }}>€0</p>
          </div>
          <ul role="list" style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
            {['250 credits monthly', 'About 5 support events', 'Trial access'].map((f) => (
              <li key={f} style={featureText(f)}>
                <Check size={14} strokeWidth={2.5} style={{ color: C.cyan, flexShrink: 0 }} aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <a
            href="#download"
            style={{ display: 'block', textAlign: 'center' as const, borderRadius: 100, border: '1px solid rgba(0,0,0,0.12)', padding: '11px 20px', fontSize: 13, fontWeight: 600, color: C.navy, textDecoration: 'none', letterSpacing: '-0.01em', transition: 'border-color 0.15s, background 0.15s', fontFamily: 'inherit' }}
            onMouseEnter={(e) => hoverSubtle(e.currentTarget as HTMLElement, true)}
            onMouseLeave={(e) => hoverSubtle(e.currentTarget as HTMLElement, false)}
            onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
            onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
          >
            Download now
          </a>
        </article>

        {/* Pro — featured */}
        <article
          aria-label="Pro plan — most popular"
          style={{ borderRadius: 20, background: C.navy, padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 28, position: 'relative', boxShadow: '0 12px 48px rgba(15,23,42,0.18)' }}
        >
          <span
            style={{
              position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)',
              borderRadius: 100, background: C.cyan, padding: '3px 12px',
              fontSize: 11, fontWeight: 600, color: 'white', letterSpacing: '0.02em', whiteSpace: 'nowrap' as const,
            }}
          >
            Most popular
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(6,182,212,0.6)' }}>Pro</p>
            <p style={{ margin: 0, fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', color: 'white' }}>
              €6.99
              <span style={{ fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.35)', marginLeft: 4 }}>/month</span>
            </p>
          </div>
          <ul role="list" style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
            {['1,500 credits monthly', 'About 30 support events', 'Pro support level included', 'Buy extra credits anytime'].map((f) => (
              <li key={f} style={featureText(f, true)}>
                <Check size={14} strokeWidth={2.5} style={{ color: C.cyan, flexShrink: 0 }} aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <a
            href="#download"
            style={{ display: 'block', textAlign: 'center' as const, borderRadius: 100, background: C.cyan, padding: '11px 20px', fontSize: 13, fontWeight: 600, color: 'white', textDecoration: 'none', letterSpacing: '-0.01em', transition: 'background 0.15s, box-shadow 0.15s', fontFamily: 'inherit' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = C.cyanHov; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(6,182,212,0.35)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = C.cyan; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 3px rgba(255,255,255,0.4)'; }}
            onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
          >
            Download now
          </a>
        </article>
      </div>

      {/* Pay as you go — separated mini-hero strip */}
      <div style={{ marginTop: 40, paddingTop: 40, borderTop: `1px solid ${C.border}` }}>
        <div
          style={{
            borderRadius: 20,
            border: `1px solid ${C.border}`,
            background: 'white',
            padding: 'clamp(24px, 4vw, 36px) clamp(24px, 4vw, 40px)',
            display: 'flex',
            flexWrap: 'wrap' as const,
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 28,
          }}
        >
          {/* Left: copy */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, minWidth: 220, flex: '1 1 280px' }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase' as const, color: C.cyan }}>
              Pay as you go
            </p>
            <p style={{ margin: 0, fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 700, letterSpacing: '-0.03em', color: C.navy, lineHeight: 1.2 }}>
              Don't want a monthly plan?
            </p>
            <p style={{ margin: 0, fontSize: 14, color: C.slate, lineHeight: 1.6, maxWidth: 360 }}>
              Need help right now? Get fast, professional support without a subscription.
            </p>
            <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
              Ideal for one-time problems when you need a quick solution and want guidance right away.
            </p>
          </div>

          {/* Middle: price + details */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, flex: '0 0 auto' }}>
            <p style={{ margin: 0, fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, letterSpacing: '-0.03em', color: C.navy }}>
              €9.99
              <span style={{ fontSize: 13, fontWeight: 400, color: C.muted, marginLeft: 6 }}>one-time</span>
            </p>
            <ul role="list" style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
              {['1,000 credits', 'About 20 support events', 'Pro support level included'].map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569' }}>
                  <Check size={13} strokeWidth={2.5} style={{ color: C.cyan, flexShrink: 0 }} aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: CTA */}
          <div style={{ flex: '0 0 auto' }}>
            <a
              href="#download"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 100, background: C.navy, color: 'white', padding: '12px 24px', fontSize: 13, fontWeight: 600, textDecoration: 'none', letterSpacing: '-0.01em', transition: 'background 0.15s, box-shadow 0.15s, transform 0.15s', whiteSpace: 'nowrap' as const, fontFamily: 'inherit', border: 'none', outline: 'none' }}
              onMouseEnter={(e) => hoverPrimary(e.currentTarget as HTMLElement, true)}
              onMouseLeave={(e) => hoverPrimary(e.currentTarget as HTMLElement, false)}
              onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
              onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              Buy credits
              <ArrowRight size={13} strokeWidth={2.5} aria-hidden />
            </a>
          </div>
        </div>
        <p style={{ margin: '20px 0 0', fontSize: 11, color: C.faint, letterSpacing: '-0.005em', lineHeight: 1.6 }}>
          Support event = one guided request where Nexpot answers your question, shows you what to do, and points to the next step on screen.
        </p>
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [activeModal, setActiveModal]   = useState<ModalType | null>(null);
  const [authOpen, setAuthOpen]         = useState(false);
  const [user, setUser]                 = useState<SignedInUser | null>(() => {
    try { const s = localStorage.getItem('nexpot_user'); return s ? JSON.parse(s) : null; } catch { return null; }
  });
  const [dropdownOpen, setDropdownOpen]       = useState(false);
  const [buyCreditsOpen, setBuyCreditsOpen]   = useState(false);
  const [credits, setCredits]                 = useState(1247);
  const openModal  = useCallback((t: ModalType) => setActiveModal(t), []);
  const closeModal = useCallback(() => setActiveModal(null), []);
  const handleSignIn = useCallback((u: SignedInUser) => {
    localStorage.setItem('nexpot_user', JSON.stringify(u));
    setUser(u);
    setDropdownOpen(false);
  }, []);
  const handleSignOut = useCallback(() => {
    localStorage.removeItem('nexpot_user');
    setUser(null);
    setDropdownOpen(false);
  }, []);
  const handleOpenBuyCredits = useCallback(() => {
    setDropdownOpen(false);
    setBuyCreditsOpen(true);
  }, []);
  const handleAddCredits = useCallback((amount: number) => {
    setCredits((c) => c + amount);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const navLinks = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing',      href: '#pricing' },
    { label: 'For teams',    href: '#for-teams' },
    { label: 'Affiliate',    href: '#affiliate' },
  ];

  // Shared inline style base for primary buttons
  const btnPrimary: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    borderRadius: 100,
    background: C.navy,
    color: 'white',
    fontFamily: 'inherit',
    fontSize: 15,
    fontWeight: 600,
    padding: '14px 28px',
    textDecoration: 'none',
    letterSpacing: '-0.01em',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.15s, box-shadow 0.2s, transform 0.15s',
    outline: 'none',
  };

  const font: React.CSSProperties = {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    color: C.navy,
  };

  return (
    <div className="min-h-screen bg-white" style={font}>

      {/* ── Skip link (a11y) ── */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          top: -100,
          left: 16,
          zIndex: 200,
          background: C.cyan,
          color: 'white',
          padding: '8px 16px',
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'top 0.15s',
        }}
        onFocus={(e) => (e.currentTarget.style.top = '16px')}
        onBlur={(e)  => (e.currentTarget.style.top = '-100px')}
      >
        Skip to main content
      </a>

      {/* ── NAV ── */}
      <header
        role="banner"
        style={{
          position: 'fixed',
          inset: '0 0 auto 0',
          zIndex: 50,
          transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
          background: scrolled ? 'rgba(255,255,255,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'rgba(0,0,0,0.06)' : 'transparent'}`,
        }}
      >
        <nav
          aria-label="Main navigation"
          style={{ maxWidth: 1120, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: 64 }}
        >
          <a
            href="#"
            aria-label="Nexpot home"
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
            className="group"
          >
            <span
              style={{ width: 32, height: 32, borderRadius: 10, background: C.cyan, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'transform 0.15s' }}
              className="group-hover:scale-105"
            >
              <CyanArrow className="w-4 h-4 text-white" />
            </span>
            <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.02em', color: C.navy }}>Nexpot</span>
          </a>

          {/* Desktop links */}
          <ul
            role="list"
            style={{ display: 'none', alignItems: 'center', gap: 36, listStyle: 'none', margin: 0, padding: 0 }}
            className="md:flex"
          >
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  style={{ fontSize: 13, fontWeight: 500, color: C.slate, textDecoration: 'none', letterSpacing: '-0.01em', transition: 'color 0.15s', borderRadius: 4, padding: '2px 0' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.navy)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.slate)}
                  onFocus={(e)  => { e.currentTarget.style.color = C.navy; e.currentTarget.style.outline = `2px solid ${C.cyan}`; e.currentTarget.style.outlineOffset = '4px'; }}
                  onBlur={(e)   => { e.currentTarget.style.color = C.slate; e.currentTarget.style.outline = 'none'; }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA + Sign in / signed-in area */}
          <div style={{ display: 'none', alignItems: 'center', gap: 10 }} className="md:flex">
            {user ? (
              <AccountDropdown
                user={user}
                credits={credits}
                open={dropdownOpen}
                onToggle={() => setDropdownOpen((v) => !v)}
                onClose={() => setDropdownOpen(false)}
                onSignOut={handleSignOut}
                onBuyCredits={handleOpenBuyCredits}
              />
            ) : (
              <button
                type="button"
                onClick={() => setAuthOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  borderRadius: 100,
                  border: '1px solid rgba(0,0,0,0.12)',
                  background: 'transparent',
                  color: C.navy,
                  fontFamily: 'inherit',
                  fontSize: 13,
                  fontWeight: 600,
                  padding: '8px 18px',
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                  transition: 'border-color 0.15s, background 0.15s, box-shadow 0.15s',
                  outline: 'none',
                }}
                onMouseEnter={(e) => hoverSubtle(e.currentTarget as HTMLElement, true)}
                onMouseLeave={(e) => hoverSubtle(e.currentTarget as HTMLElement, false)}
                onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
                onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                Sign in
              </button>
            )}
            <a
              href="#download"
              style={{ ...btnPrimary, fontSize: 13, padding: '8px 20px' }}
              onMouseEnter={(e) => hoverPrimary(e.currentTarget as HTMLElement, true)}
              onMouseLeave={(e) => hoverPrimary(e.currentTarget as HTMLElement, false)}
              onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
              onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              Download now
            </a>
          </div>

          {/* Mobile: Sign in / signed-in + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="md:hidden">
            {user ? (
              <AccountDropdown
                user={user}
                credits={credits}
                open={dropdownOpen}
                onToggle={() => setDropdownOpen((v) => !v)}
                onClose={() => setDropdownOpen(false)}
                onSignOut={handleSignOut}
                onBuyCredits={handleOpenBuyCredits}
              />
            ) : (
              <button
                type="button"
                onClick={() => setAuthOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  borderRadius: 100,
                  border: '1px solid rgba(0,0,0,0.12)',
                  background: 'transparent',
                  color: C.navy,
                  fontFamily: 'inherit',
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '6px 14px',
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                  transition: 'border-color 0.15s, background 0.15s, box-shadow 0.15s',
                  outline: 'none',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => hoverSubtle(e.currentTarget as HTMLElement, true)}
                onMouseLeave={(e) => hoverSubtle(e.currentTarget as HTMLElement, false)}
                onFocus={(e)  => (e.currentTarget.style.boxShadow = FOCUS_RING)}
                onBlur={(e)   => (e.currentTarget.style.boxShadow = 'none')}
              >
                Sign in
              </button>
            )}
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: 'transparent', border: 'none', color: C.slate, cursor: 'pointer', transition: 'color 0.15s' }}
              onFocus={(e)  => (e.currentTarget.style.boxShadow = FOCUS_RING)}
              onBlur={(e)   => (e.currentTarget.style.boxShadow = 'none')}
            >
              {menuOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Mobile navigation"
          aria-modal="false"
          hidden={!menuOpen}
          style={{
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(16px)',
            borderTop: `1px solid rgba(0,0,0,0.06)`,
            padding: '20px 24px 28px',
          }}
        >
          <nav aria-label="Mobile navigation links">
            <ul role="list" style={{ listStyle: 'none', margin: '0 0 20px', padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={closeMenu}
                    style={{ display: 'block', padding: '10px 0', fontSize: 16, fontWeight: 500, color: '#374151', textDecoration: 'none', borderBottom: `1px solid rgba(0,0,0,0.05)` }}
                    onFocus={(e)  => (e.currentTarget.style.outline = `2px solid ${C.cyan}`)}
                    onBlur={(e)   => (e.currentTarget.style.outline = 'none')}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#download"
              onClick={closeMenu}
              style={{ ...btnPrimary, fontSize: 14, padding: '12px 24px' }}
              onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
              onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              Download now
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">

        {/* ── HERO ── */}
        <section
          aria-labelledby="hero-heading"
          style={{
            paddingTop:    'clamp(104px, 14vw, 160px)',
            paddingBottom: 'clamp(72px,  10vw, 128px)',
            paddingLeft:   24,
            paddingRight:  24,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ambient glow – decorative */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
              width: 800, height: 500, borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: 1120, margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(48px, 8vw, 96px)',
                alignItems: 'center',
              }}
            >
              {/* Copy */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                <h1
                  id="hero-heading"
                  style={{
                    margin: 0,
                    fontSize: 'clamp(34px, 5.5vw, 60px)',
                    fontWeight: 700,
                    lineHeight: 1.08,
                    letterSpacing: '-0.03em',
                    color: C.navy,
                  }}
                >
                  Stuck on your screen?{' '}
                  <span style={{ color: C.cyan }}>Nexpot</span>{' '}
                  helps you move forward.
                </h1>

                <p
                  style={{
                    margin: 0,
                    fontSize: 'clamp(16px, 1.8vw, 19px)',
                    color: C.slate,
                    lineHeight: 1.65,
                    fontWeight: 400,
                    maxWidth: 420,
                  }}
                >
                  A downloadable AI support agent that helps you continue the moment you get stuck in websites, apps, and digital tasks.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
                  <a
                    href="#download"
                    style={btnPrimary}
                    onMouseEnter={(e) => hoverPrimary(e.currentTarget as HTMLElement, true)}
                    onMouseLeave={(e) => hoverPrimary(e.currentTarget as HTMLElement, false)}
                    onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
                    onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                  >
                    Download now
                    <ArrowRight size={15} strokeWidth={2.5} aria-hidden />
                  </a>
                  <a
                    href="#how-it-works"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 14, fontWeight: 500, color: C.muted, textDecoration: 'none', letterSpacing: '-0.01em', transition: 'color 0.15s', borderRadius: 4 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.cyan)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
                    onFocus={(e)  => { e.currentTarget.style.color = C.cyan; e.currentTarget.style.outline = `2px solid ${C.cyan}`; e.currentTarget.style.outlineOffset = '3px'; }}
                    onBlur={(e)   => { e.currentTarget.style.color = C.muted; e.currentTarget.style.outline = 'none'; }}
                  >
                    See how it works
                    <ArrowUpRight size={13} strokeWidth={2.5} aria-hidden />
                  </a>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 4 }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 500, color: C.faint, letterSpacing: '-0.01em' }}>Windows & Mac</p>
                  <p style={{ margin: 0, fontSize: 12, color: C.faint }}>250 free credits included — about 5 support events free</p>
                  <p style={{ margin: 0, fontSize: 12, color: C.faint }}>From €4.99/month or pay as you go.</p>
                </div>
              </div>

              {/* Mockup */}
              <div style={{ display: 'flex', justifyContent: 'center', paddingRight: 'clamp(0px, 4vw, 40px)', paddingBottom: 32 }}>
                <HeroMockup />
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section
          id="how-it-works"
          aria-labelledby="hiw-heading"
          style={{ padding: 'clamp(72px, 10vw, 120px) 24px', borderTop: `1px solid ${C.border}` }}
        >
          <div style={{ maxWidth: 1120, margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: 'clamp(40px, 8vw, 96px)',
                alignItems: 'start',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: C.cyan }}>
                  How it works
                </p>
                <h2
                  id="hiw-heading"
                  style={{ margin: 0, fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.12, color: C.navy }}
                >
                  Help, exactly when you need it.
                </h2>
              </div>

              <HowItWorksSteps />
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section
          id="pricing"
          aria-labelledby="pricing-heading"
          style={{ padding: 'clamp(72px, 10vw, 120px) 24px', background: C.bg, borderTop: `1px solid ${C.border}` }}
        >
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <h2
                id="pricing-heading"
                style={{ margin: 0, fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', color: C.navy }}
              >
                Simple pricing
              </h2>
            </div>

            <PricingCards />
          </div>
        </section>

        {/* ── FOR TEAMS ── */}
        <section
          id="for-teams"
          aria-labelledby="teams-heading"
          style={{ padding: 'clamp(72px, 10vw, 120px) 24px', borderTop: `1px solid ${C.border}` }}
        >
          <div style={{ maxWidth: 1120, margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: 'clamp(40px, 8vw, 96px)',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: C.cyan }}>For teams</p>
                <h2 id="teams-heading" style={{ margin: 0, fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.12, color: C.navy }}>
                  Also built for teams.
                </h2>
                <p style={{ margin: 0, fontSize: 'clamp(15px, 1.5vw, 17px)', color: C.slate, lineHeight: 1.65, fontWeight: 400, maxWidth: 400 }}>
                  Give employees an always-available support agent for everyday software tasks.
                  Reduce repetitive support requests and help people solve problems faster.
                </p>
              </div>

              <div style={{ borderRadius: 24, border: `1px solid ${C.border}`, background: C.bg, padding: 36, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p style={{ margin: 0, fontSize: 15, color: '#475569' }}>
                  From <span style={{ fontWeight: 600, color: C.navy }}>€2.99 per seat / month</span>
                </p>
                <button
                  type="button"
                  onClick={() => openModal('teams')}
                  style={{ ...btnPrimary, fontSize: 14, padding: '12px 24px', alignSelf: 'flex-start' }}
                  onMouseEnter={(e) => hoverPrimary(e.currentTarget as HTMLElement, true)}
                  onMouseLeave={(e) => hoverPrimary(e.currentTarget as HTMLElement, false)}
                  onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
                  onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  Talk to us about team plans
                  <ArrowUpRight size={14} strokeWidth={2.5} aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── AFFILIATE ── */}
        <section
          id="affiliate"
          aria-labelledby="affiliate-heading"
          style={{ padding: 'clamp(72px, 10vw, 120px) 24px', background: C.bg, borderTop: `1px solid ${C.border}` }}
        >
          <div style={{ maxWidth: 1120, margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: 'clamp(40px, 8vw, 96px)',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: C.cyan }}>Affiliate Program</p>
                <h2 id="affiliate-heading" style={{ margin: 0, fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.12, color: C.navy }}>
                  Affiliate Program
                </h2>
                <p style={{ margin: 0, fontSize: 'clamp(15px, 1.5vw, 17px)', color: C.slate, lineHeight: 1.65, fontWeight: 400, maxWidth: 400 }}>
                  Do you teach software, creative tools, or digital workflows?
                  Offer your audience a faster way to get unstuck — and earn commission.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => openModal('affiliate')}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    borderRadius: 100, border: '1px solid rgba(0,0,0,0.14)', background: 'white',
                    color: C.navy, fontSize: 14, fontWeight: 600, padding: '12px 24px',
                    cursor: 'pointer', letterSpacing: '-0.01em', fontFamily: 'inherit',
                    transition: 'border-color 0.15s, color 0.15s, box-shadow 0.15s',
                    outline: 'none',
                  }}
                  onMouseEnter={(e) => hoverOutline(e.currentTarget as HTMLElement, true)}
                  onMouseLeave={(e) => hoverOutline(e.currentTarget as HTMLElement, false)}
                  onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
                  onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  Join the affiliate program
                  <ArrowUpRight size={14} strokeWidth={2.5} aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section
          id="download"
          aria-labelledby="cta-heading"
          style={{ padding: 'clamp(80px, 12vw, 144px) 24px', borderTop: `1px solid ${C.border}` }}
        >
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            <div
              aria-hidden="true"
              style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <CyanArrow className="w-6 h-6 text-cyan-500" />
            </div>

            <h2
              id="cta-heading"
              style={{ margin: 0, fontSize: 'clamp(28px, 4.5vw, 50px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: C.navy }}
            >
              Download Nexpot and try it free.
            </h2>

            <p style={{ margin: 0, fontSize: 14, color: C.muted, letterSpacing: '-0.01em' }}>
              250 free credits included — about 5 support events free
            </p>

            <a
              href="#"
              style={{ ...btnPrimary, fontSize: 15, padding: '15px 32px' }}
              onMouseEnter={(e) => hoverPrimary(e.currentTarget as HTMLElement, true)}
              onMouseLeave={(e) => hoverPrimary(e.currentTarget as HTMLElement, false)}
              onFocus={(e)  => { (e.currentTarget as HTMLElement).style.boxShadow = FOCUS_RING; }}
              onBlur={(e)   => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              Download now
              <ArrowRight size={15} strokeWidth={2.5} aria-hidden />
            </a>

            <p style={{ margin: 0, fontSize: 12, color: C.faint }}>Windows & Mac</p>
          </div>
        </section>
      </main>

      {/* ── MODALS ── */}
      {activeModal && <ContactModal type={activeModal} onClose={closeModal} />}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} onSignIn={handleSignIn} />}
      {buyCreditsOpen && (
        <BuyCreditsModal
          currentBalance={credits}
          onClose={() => setBuyCreditsOpen(false)}
          onConfirm={(amount) => { handleAddCredits(amount); }}
        />
      )}

      {/* ── FOOTER ── */}
      <footer
        role="contentinfo"
        style={{ borderTop: `1px solid ${C.border}`, padding: '36px 24px' }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          {/* Left: brand + contact + copyright */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.02em', color: C.navy }}>Nexpot</span>
            <a
              href="mailto:hello@nexpot.ai"
              style={{ fontSize: 12, color: C.muted, textDecoration: 'none', letterSpacing: '-0.01em', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.navy)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
              onFocus={(e)  => { e.currentTarget.style.color = C.navy; e.currentTarget.style.outline = `2px solid ${C.cyan}`; e.currentTarget.style.outlineOffset = '3px'; }}
              onBlur={(e)   => { e.currentTarget.style.color = C.muted; e.currentTarget.style.outline = 'none'; }}
            >
              hello@nexpot.ai
            </a>
            <p style={{ margin: 0, fontSize: 12, color: C.faint }}>© 2026 Nexpot. All rights reserved.</p>
          </div>

          {/* Supported apps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: C.faint }}>Supported apps</span>
            {[
              { label: 'Blender',         href: '/integrations/blender' },
              { label: 'DaVinci Resolve', href: '/integrations/davinci-resolve' },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                style={{ fontSize: 12, color: C.muted, textDecoration: 'none', letterSpacing: '-0.01em', transition: 'color 0.15s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.navy)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
                onFocus={(e)  => { e.currentTarget.style.color = C.navy; e.currentTarget.style.outline = `2px solid ${C.cyan}`; e.currentTarget.style.outlineOffset = '3px'; }}
                onBlur={(e)   => { e.currentTarget.style.color = C.muted; e.currentTarget.style.outline = 'none'; }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right: legal links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
            <a
              href="/privacy"
              style={{ fontSize: 12, color: C.muted, textDecoration: 'none', letterSpacing: '-0.01em', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.navy)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
              onFocus={(e)  => { e.currentTarget.style.color = C.navy; e.currentTarget.style.outline = `2px solid ${C.cyan}`; e.currentTarget.style.outlineOffset = '3px'; }}
              onBlur={(e)   => { e.currentTarget.style.color = C.muted; e.currentTarget.style.outline = 'none'; }}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              style={{ fontSize: 12, color: C.muted, textDecoration: 'none', letterSpacing: '-0.01em', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.navy)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
              onFocus={(e)  => { e.currentTarget.style.color = C.navy; e.currentTarget.style.outline = `2px solid ${C.cyan}`; e.currentTarget.style.outlineOffset = '3px'; }}
              onBlur={(e)   => { e.currentTarget.style.color = C.muted; e.currentTarget.style.outline = 'none'; }}
            >
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
