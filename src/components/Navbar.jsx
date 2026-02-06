import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NAV_ITEMS = [
  { label: 'Services', href: '#services' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
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
    ? isDark ? 'rgba(10, 10, 15, 0.75)' : 'rgba(255, 255, 255, 0.7)'
    : 'transparent';

  const navBorder = scrolled
    ? `1px solid ${colors.border}`
    : '1px solid transparent';

  const navShadow = scrolled
    ? isDark ? '0 10px 40px -10px rgba(0,0,0,0.5)' : '0 10px 30px -10px rgba(0,0,0,0.1)'
    : 'none';

  return (
    <>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '16px 20px' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: scrolled ? '12px 24px' : '16px 24px',
          borderRadius: 24,
          background: navBg,
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          border: navBorder,
          boxShadow: navShadow,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: colors.text }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 800, fontSize: 20,
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.25)',
            }}>A</div>
            <span style={{ fontWeight: 700, fontSize: 18 }}>Agenticos</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex" style={{ display: 'none', alignItems: 'center', gap: 4 }}>
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={item.href} style={{
                padding: '10px 16px', fontSize: 14, fontWeight: 500,
                color: colors.textSecondary, textDecoration: 'none', borderRadius: 8,
                transition: 'all 0.2s ease',
              }}>{item.label}</a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex" style={{ display: 'none', alignItems: 'center', gap: 12 }}>
            <button onClick={toggleTheme} aria-label="Toggle theme" style={{
              padding: 10, borderRadius: 10, border: 'none', cursor: 'pointer',
              background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              color: colors.textSecondary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} style={{
              padding: '10px 24px', fontSize: 14, fontWeight: 600, borderRadius: 100,
              border: 'none', cursor: 'pointer',
              background: colors.text, color: colors.bg,
              boxShadow: isDark ? '0 0 20px rgba(255,255,255,0.1)' : '0 10px 20px rgba(0,0,0,0.1)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>Contact Us</button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={toggleTheme} aria-label="Toggle theme" style={{
              padding: 10, borderRadius: 10, border: 'none', cursor: 'pointer',
              background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              color: colors.textSecondary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu" style={{
              padding: 10, borderRadius: 10, border: 'none', cursor: 'pointer',
              background: 'transparent', color: colors.text,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="md:hidden"
              style={{
                position: 'fixed', inset: 0, zIndex: 40,
                background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
              }}
            />
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="md:hidden"
              style={{
                position: 'fixed', top: 80, left: 16, right: 16, zIndex: 50,
                padding: 24, borderRadius: 16,
                background: colors.bgCard, border: `1px solid ${colors.border}`,
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              }}
            >
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {NAV_ITEMS.map((item) => (
                  <a key={item.label} href={item.href} onClick={closeMenu} style={{
                    padding: '14px 16px', fontSize: 16, fontWeight: 500,
                    color: colors.textSecondary, textDecoration: 'none', borderRadius: 10,
                  }}>{item.label}</a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
