import { Twitter, Linkedin, Github } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SOCIAL_LINKS = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
];

const NAV_LINKS = ['Features', 'Pricing', 'Docs', 'Blog', 'Contact'];

const Footer = () => {
  const { isDark, colors } = useTheme();

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
          <a href="#" style={{
            display: 'flex', alignItems: 'center', gap: 10,
            textDecoration: 'none',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #06b6d4, #0284c7)',
              color: '#ffffff', fontWeight: 700, fontSize: 16,
              boxShadow: '0 4px 12px rgba(6,182,212,0.25)',
            }}>A</div>
            <span style={{ fontSize: 18, fontWeight: 700, color: colors.text }}>Agenticos</span>
          </a>

          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'center' }} className="footer-nav">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={link === 'Contact' ? '#contact' : '#'}
                style={{
                  fontSize: 14, color: colors.textMuted, textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = colors.text; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = colors.textMuted; }}
              >{link}</a>
            ))}
          </nav>

          <div style={{ display: 'flex', gap: 8 }}>
            {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} aria-label={label}
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
            &copy; {new Date().getFullYear()} Agenticos Labs Inc.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms'].map((item) => (
              <a key={item} href="#" style={{
                fontSize: 13, color: colors.textMuted, textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.color = colors.text; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = colors.textMuted; }}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-nav { display: none !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
