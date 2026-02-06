import { Twitter, Linkedin, Github, Globe, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Integrations', 'API Docs', 'Changelog'],
  Company: ['About Us', 'Careers', 'Blog', 'Press Kit', 'Contact'],
  Resources: ['Community', 'Help Center', 'Status', 'Terms of Service', 'Privacy Policy'],
};

const SOCIAL_LINKS = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
];

const Footer = () => {
  const { isDark, colors } = useTheme();

  return (
    <footer className="relative overflow-hidden" style={{
      padding: '80px 20px 40px',
      background: isDark ? '#050507' : '#f8fafc',
      borderTop: `1px solid ${colors.border}`,
    }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: isDark ? 'rgba(6,182,212,0.04)' : 'rgba(6,182,212,0.03)', filter: 'blur(120px)' }}
        />
        <div
          className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: isDark ? 'rgba(14,165,233,0.04)' : 'rgba(14,165,233,0.03)', filter: 'blur(120px)' }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4">
            <a href="#" className="flex items-center gap-3 mb-6 no-underline group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-sky-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow duration-300">
                A
              </div>
              <span className="text-xl font-bold transition-colors duration-200" style={{ color: colors.text }}>
                Agenticos
              </span>
            </a>
            <p className="text-[15px] leading-[1.7] max-w-[360px] mb-6" style={{ color: colors.textSecondary }}>
              Building the operating system for the autonomous enterprise. Deploy intelligent agents that scale with your ambitions.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group/icon flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    color: colors.textMuted,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark ? 'rgba(6,182,212,0.15)' : 'rgba(6,182,212,0.1)';
                    e.currentTarget.style.color = colors.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                    e.currentTarget.style.color = colors.textMuted;
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category} className="flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-[0.08em] mb-1" style={{ color: colors.text }}>
                  {category}
                </h4>
                {links.map((link) => (
                  <a
                    key={link}
                    href={link === 'Contact' ? '#contact' : '#'}
                    className="text-sm no-underline transition-colors duration-200"
                    style={{ color: colors.textSecondary }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = colors.accent; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = colors.textSecondary; }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8"
          style={{ borderTop: `1px solid ${colors.border}` }}
        >
          <p className="text-sm" style={{ color: colors.textMuted }}>
            &copy; {new Date().getFullYear()} Agenticos Labs Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-xs" style={{ color: colors.textMuted }}>
              <Globe size={14} /> English (US)
            </span>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: colors.textMuted }}>
              <Shield size={14} /> SOC2 Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
