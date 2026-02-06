import { useState } from 'react';
import { Linkedin } from 'lucide-react';
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
      padding: '48px 20px 32px',
      background: isDark ? '#0d0d14' : '#ffffff',
      borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: 24, marginBottom: 32,
        }}>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ textDecoration: 'none' }}>
            <Logo size={36} />
          </a>

          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'center' }} className="footer-nav">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: 14, color: colors.textMuted, textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = colors.text; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = colors.textMuted; }}
              >{link.label}</a>
            ))}
          </nav>

          <div style={{ display: 'flex', gap: 8 }}>
            {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 36, height: 36, borderRadius: 10,
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                  color: colors.textMuted, textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDark ? 'rgba(6,182,212,0.12)' : 'rgba(6,182,212,0.08)';
                  e.currentTarget.style.color = '#06b6d4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
                  e.currentTarget.style.color = colors.textMuted;
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
          paddingTop: 24,
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: 16,
        }}>
          <p style={{ fontSize: 13, color: colors.textMuted, margin: 0 }}>
            &copy; {new Date().getFullYear()} EdgeifyAI Inc.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {[
              { label: 'Privacy', type: 'privacy' },
              { label: 'Terms', type: 'terms' },
            ].map((item) => (
              <button key={item.type} onClick={() => setLegalModal(item.type)} style={{
                fontSize: 13, color: colors.textMuted, textDecoration: 'none',
                transition: 'color 0.2s ease', background: 'none', border: 'none',
                cursor: 'pointer', padding: 0, fontFamily: 'inherit',
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
