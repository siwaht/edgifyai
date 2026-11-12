import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/theme';
import Logo from './Logo';

const NAV_ITEMS = [
  { label: 'Agent Types', href: '#services' },
  { label: 'Platform', href: '#capabilities' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Industries', href: '#industries' },
  { label: 'FAQ', href: '#faq' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme, colors } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const navBg = scrolled
    ? isDark ? 'rgba(10,10,15,0.82)' : 'rgba(255,255,255,0.82)'
    : 'transparent';

  const navBorder = scrolled
    ? `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`
    : '1px solid transparent';

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: navBg,
          borderBottom: navBorder,
          backdropFilter: scrolled ? 'blur(20px) saturate(1.8)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.8)' : 'none',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ textDecoration: 'none' }}
          >
            <Logo size={36} showText={true} />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{ color: colors.textSecondary, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = colors.text; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = colors.textSecondary; }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              style={{
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                color: colors.textSecondary,
                borderRadius: '10px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = colors.accent; (e.currentTarget as HTMLButtonElement).style.borderColor = colors.borderHover; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = colors.textSecondary; (e.currentTarget as HTMLButtonElement).style.borderColor = colors.border; }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* CTA */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
                color: '#0a0a0f',
                padding: '9px 20px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.88'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}
            >
              Get Started
            </a>

            {/* Mobile menu button */}
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                color: colors.text,
                borderRadius: '10px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '72px',
              left: 0,
              right: 0,
              background: isDark ? 'rgba(10,10,15,0.96)' : 'rgba(255,255,255,0.96)',
              backdropFilter: 'blur(20px)',
              borderBottom: `1px solid ${colors.border}`,
              zIndex: 49,
              padding: '16px 24px 24px',
            }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                style={{
                  display: 'block',
                  color: colors.text,
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  padding: '12px 0',
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              style={{
                display: 'block',
                marginTop: '16px',
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
                color: '#0a0a0f',
                padding: '12px 24px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
