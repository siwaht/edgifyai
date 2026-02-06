import { Twitter, Linkedin, Github, Globe, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Integrations', 'API Docs', 'Changelog'],
  Company: ['About Us', 'Careers', 'Blog', 'Press Kit', 'Contact'],
  Resources: ['Community', 'Help Center', 'Status', 'Terms of Service', 'Privacy Policy'],
};

const SOCIAL_ICONS = [Twitter, Linkedin, Github];

const Footer = () => {
  const { isDark, colors } = useTheme();

  return (
    <footer style={{
      position: 'relative', padding: '80px 20px 40px',
      background: colors.bg,
      borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
      overflow: 'hidden',
    }}>
      {/* Background blurs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div
          className="absolute bottom-0 left-[-20%] w-[600px] h-[600px] rounded-full"
          style={{ background: isDark ? 'rgba(6,182,212,0.05)' : 'rgba(6,182,212,0.03)', filter: 'blur(120px)' }}
        />
        <div
          className="absolute bottom-0 right-[-20%] w-[600px] h-[600px] rounded-full"
          style={{ background: isDark ? 'rgba(139,92,246,0.05)' : 'rgba(139,92,246,0.03)', filter: 'blur(120px)' }}
        />
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <a href="#" className="flex items-center gap-3 mb-6 no-underline">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/20">
                A
              </div>
              <span style={{ fontSize: 20, fontWeight: 700, color: colors.text }}>Agenticos</span>
            </a>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.textSecondary, maxWidth: 360, marginBottom: 24 }}>
              Building the operating system for the autonomous enterprise. Deploy intelligent agents that scale with your ambitions.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {SOCIAL_ICONS.map((Icon, i) => (
                <button
                  key={i}
                  aria-label={Icon.displayName}
                  className="group"
                  style={{
                    padding: 12, borderRadius: 12, border: 'none', cursor: 'pointer',
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    color: colors.textMuted,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <h4 style={{
                  fontSize: 13, fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.08em', color: colors.text, marginBottom: 4,
                }}>{category}</h4>
                {links.map((link) => (
                  <a key={link} href="#" style={{
                    fontSize: 14, color: colors.textSecondary,
                    textDecoration: 'none', transition: 'color 0.2s ease',
                  }}>{link}</a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6" style={{
          paddingTop: 32,
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
        }}>
          <p style={{ fontSize: 14, color: colors.textMuted }}>
            © {new Date().getFullYear()} Agenticos Labs Inc. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: colors.textMuted }}>
              <Globe size={14} /> English (US)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: colors.textMuted }}>
              <Shield size={14} /> SOC2 Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
