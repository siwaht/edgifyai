import { useState } from 'react';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/theme';
import { LegalModal, ModalType } from './LegalModal';
import Logo from './Logo';

const NAV_LINKS = [
  { label: 'Agent Types', href: '#services' },
  { label: 'Platform', href: '#capabilities' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Industries', href: '#industries' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => {
  const { isDark, colors } = useTheme();
  const [legalModal, setLegalModal] = useState<ModalType>(null);

  return (
    <>
      <footer style={{
        background: isDark ? '#06060a' : '#f0f2f5',
        borderTop: `1px solid ${colors.border}`,
        padding: '48px 24px 32px',
      }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
            {/* Brand */}
            <div style={{ maxWidth: 320 }}>
              <Logo size={36} showText={true} />
              <p style={{ color: colors.textSecondary, fontSize: '0.875rem', lineHeight: 1.7, marginTop: '14px' }}>
                We build and run production AI agents — voice, vision and chat — that talk to your customers and take action in the systems your team already uses.
              </p>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/edgeifyai"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '16px',
                  color: colors.textMuted,
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = colors.accent; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = colors.textMuted; }}
              >
                <Linkedin size={16} /> LinkedIn <ArrowUpRight size={12} />
              </a>
            </div>

            {/* Nav */}
            <div className="flex flex-col gap-3">
              <span style={{ color: colors.textMuted, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                Navigation
              </span>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    color: colors.textSecondary,
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = colors.text; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = colors.textSecondary; }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-3">
              <span style={{ color: colors.textMuted, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                Legal
              </span>
              <button
                onClick={() => setLegalModal('privacy')}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: colors.textSecondary, fontSize: '0.875rem', fontWeight: 500,
                  textAlign: 'left', padding: 0, transition: 'color 0.2s ease', fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = colors.text; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = colors.textSecondary; }}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setLegalModal('terms')}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: colors.textSecondary, fontSize: '0.875rem', fontWeight: 500,
                  textAlign: 'left', padding: 0, transition: 'color 0.2s ease', fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = colors.text; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = colors.textSecondary; }}
              >
                Terms of Service
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            paddingTop: '24px',
            borderTop: `1px solid ${colors.border}`,
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px',
            alignItems: 'center',
          }}>
            <span style={{ color: colors.textMuted, fontSize: '0.8rem' }}>
              © {new Date().getFullYear()} EdgifyAI. All rights reserved.
            </span>
            <span style={{ color: colors.textMuted, fontSize: '0.8rem' }}>
              Crafted with intelligence.
            </span>
          </div>
        </div>
      </footer>

      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
    </>
  );
};

export default Footer;
