import { useState } from 'react';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import LegalModal from './LegalModal';
import Logo from './Logo';

const SOCIAL_LINKS = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/edgeifyai' },
];

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => {
  const { isDark, colors } = useTheme();
  const [legalModal, setLegalModal] = useState(null);

  return (
    <footer style={{
      padding: '52px 20px 32px',
      background: isDark ? '#09090f' : '#ffffff',
      borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}`,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Top row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start',
          justifyContent: 'space-between', gap: 32, marginBottom: 40,
        }}>
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 14 }}>
              <Logo size={36} />
            </a>
            <p style={{ fontSize: 14, color: colors.textMuted, lineHeight: 1.7 }}>
              We design, build, and deploy production-ready AI agents for enterprise workflows.
            </p>
          </div>

          {/* Nav */}
          <nav className="footer-nav" style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: colors.textMuted, marginBottom: 8 }}>
              Navigation
            </p>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: 14, color: colors.textSecondary, textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = colors.text; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = colors.textSecondary; }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact + Social */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: colors.textMuted, marginBottom: 4 }}>
              Contact
            </p>
            <a href="mailto:hello@edgeifyai.com" style={{
              fontSize: 14, color: colors.textSecondary, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = colors.text; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = colors.textSecondary; }}
            >
              hello@edgeifyai.com
              <ArrowUpRight size={13} />
            </a>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 36, height: 36, borderRadius: 10,
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
                    color: colors.textMuted, textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark ? 'rgba(6,182,212,0.12)' : 'rgba(6,182,212,0.08)';
                    e.currentTarget.style.borderColor = isDark ? 'rgba(6,182,212,0.25)' : 'rgba(6,182,212,0.2)';
                    e.currentTarget.style.color = '#06b6d4';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
                    e.currentTarget.style.color = colors.textMuted;
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}`,
          paddingTop: 24,
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: 12,
        }}>
          <p style={{ fontSize: 13, color: colors.textMuted, margin: 0 }}>
            &copy; {new Date().getFullYear()} EdgeifyAI Inc. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { label: 'Privacy Policy', type: 'privacy' },
              { label: 'Terms of Service', type: 'terms' },
            ].map((item) => (
              <button key={item.type} onClick={() => setLegalModal(item.type)} style={{
                fontSize: 13, color: colors.textMuted,
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 0, fontFamily: 'inherit',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = colors.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = colors.textMuted; }}
              >{item.label}</button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-nav { display: none !important; }
        }
      `}</style>

      {legalModal && (
        <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
      )}
    </footer>
  );
};

export default Footer;
