import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/theme';
import Logo from './Logo';

const NAV_ITEMS = [
  { label: 'Services', href: '#services' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'How It Works', href: '#how-it-works' },
];

const NavLink = ({ label, href, onClick }) => {
  const { colors } = useTheme();
  return (
    <a
      href={href}
      onClick={onClick}
      className="nav-link"
      style={{
        position: 'relative',
        padding: '10px 16px',
        fontSize: 14,
        fontWeight: 500,
        color: colors.textSecondary,
        textDecoration: 'none',
        borderRadius: 8,
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = colors.text; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = colors.textSecondary; }}
    >
      {label}
    </a>
  );
};

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
    ? isDark ? 'rgba(10, 10, 15, 0.82)' : 'rgba(255, 255, 255, 0.82)'
    : 'transparent';

  const navBorder = scrolled
    ? `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`
    : '1px solid transparent';

  return (
    <>
      <header role="banner" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '14px 20px' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: scrolled ? '11px 24px' : '14px 24px',
          borderRadius: 20,
          background: navBg,
          backdropFilter: scrolled ? 'blur(20px) saturate(200%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(200%)' : 'none',
          border: navBorder,
          boxShadow: scrolled
            ? isDark ? '0 8px 32px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.04)' : '0 8px 24px rgba(0,0,0,0.07)'
            : 'none',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ textDecoration: 'none' }}>
            <Logo size={38} />
          </a>

          <nav className="desktop-nav" aria-label="Main navigation" style={{ alignItems: 'center', gap: 2 }}>
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.label} label={item.label} href={item.href} />
            ))}
          </nav>

          <div className="desktop-actions" style={{ alignItems: 'center', gap: 10 }}>
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                width: 38, height: 38, borderRadius: 10, border: 'none', cursor: 'pointer',
                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                color: colors.textSecondary,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.1)';
                e.currentTarget.style.color = colors.text;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
                e.currentTarget.style.color = colors.textSecondary;
              }}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '10px 22px', fontSize: 14, fontWeight: 600, borderRadius: 100,
                border: 'none', cursor: 'pointer',
                background: isDark ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : colors.text,
                color: '#ffffff',
                boxShadow: isDark ? '0 4px 20px rgba(6,182,212,0.25)' : '0 4px 16px rgba(0,0,0,0.15)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = isDark ? '0 8px 28px rgba(6,182,212,0.35)' : '0 8px 24px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = isDark ? '0 4px 20px rgba(6,182,212,0.25)' : '0 4px 16px rgba(0,0,0,0.15)';
              }}
            >
              Get Started
            </button>
          </div>

          <div className="mobile-actions" style={{ alignItems: 'center', gap: 8 }}>
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                width: 38, height: 38, borderRadius: 10, border: 'none', cursor: 'pointer',
                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                color: colors.textSecondary,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              style={{
                width: 38, height: 38, borderRadius: 10, border: 'none', cursor: 'pointer',
                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                color: colors.text,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeMenu}
              style={{
                position: 'fixed', inset: 0, zIndex: 40,
                background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
              }}
            />
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed', top: 76, left: 16, right: 16, zIndex: 50,
                padding: 20, borderRadius: 18,
                background: isDark ? 'rgba(18,18,26,0.96)' : 'rgba(255,255,255,0.97)',
                border: `1px solid ${colors.border}`,
                boxShadow: isDark
                  ? '0 24px 48px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.05)'
                  : '0 24px 48px rgba(0,0,0,0.12)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {NAV_ITEMS.map((item) => (
                  <a key={item.label} href={item.href} onClick={closeMenu} style={{
                    padding: '13px 16px', fontSize: 16, fontWeight: 500,
                    color: colors.textSecondary, textDecoration: 'none', borderRadius: 12,
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';
                    e.currentTarget.style.color = colors.text;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = colors.textSecondary;
                  }}
                  >{item.label}</a>
                ))}
              </nav>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${colors.border}` }}>
                <button onClick={() => { closeMenu(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} style={{
                  width: '100%', padding: '13px 20px', fontSize: 15, fontWeight: 600,
                  borderRadius: 100, border: 'none', cursor: 'pointer',
                  background: isDark ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : colors.text,
                  color: '#ffffff',
                  boxShadow: isDark ? '0 4px 20px rgba(6,182,212,0.3)' : '0 4px 16px rgba(0,0,0,0.15)',
                }}>Get Started</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-nav { display: none; }
        .desktop-actions { display: none; }
        .mobile-actions { display: flex; }
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-actions { display: flex !important; }
          .mobile-actions { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
