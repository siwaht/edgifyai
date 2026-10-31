import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/theme';
import { NAV_ITEMS } from '../data/site';
import Logo from './Logo';
import './Navbar.css';

const useActiveSection = (ids) => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // A section counts as active while it crosses the upper-middle band of the viewport.
      { rootMargin: '-40% 0px -55% 0px' },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return active;
};

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    const onResize = () => { if (window.innerWidth >= 860) setMenuOpen(false); };
    document.body.classList.add('scroll-locked');
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.classList.remove('scroll-locked');
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const scrollToTop = (e) => {
    e.preventDefault();
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`nav ${scrolled || menuOpen ? 'nav--scrolled' : ''}`}>
        <div className="nav__bar">
          <a href="#top" onClick={scrollToTop} className="nav__brand" aria-label="EdgeifyAI home">
            <Logo size={34} />
          </a>

          <nav className="nav__links" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`nav__link ${active === item.id ? 'is-active' : ''}`}
                aria-current={active === item.id ? 'location' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <ThemeToggle />
            <a href="#contact" className="btn btn-primary btn-sm nav__cta">
              Book a Call
              <ArrowRight size={15} className="btn-arrow" />
            </a>
            <button
              type="button"
              className="icon-btn nav__menu-btn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              className="nav__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <motion.div
              key="menu"
              id="mobile-menu"
              className="nav__mobile"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <nav aria-label="Mobile navigation">
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={closeMenu}
                    className={`nav__mobile-link ${active === item.id ? 'is-active' : ''}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05 }}
                  >
                    {item.label}
                    <ArrowRight size={16} />
                  </motion.a>
                ))}
              </nav>
              <a href="#contact" onClick={closeMenu} className="btn btn-primary btn-block" style={{ marginTop: 14 }}>
                Book a Free Strategy Call
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
