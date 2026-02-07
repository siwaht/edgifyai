import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';

const NAV_ITEMS = [
  { label: 'Services', href: '#services' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'How It Works', href: '#how-it-works' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-spring ${scrolled ? 'py-3' : 'py-5'
        }`}>
        <div className={`mx-auto max-w-7xl px-6 transition-all duration-500`}>
          <div className={`
            mx-auto flex items-center justify-between rounded-full px-6 py-3
            transition-all duration-500 border
            ${scrolled
              ? 'bg-obsidian-light/70 backdrop-blur-md border-white/10 shadow-lg shadow-black/20'
              : 'bg-transparent border-transparent shadow-none'
            }
          `}>
            {/* Logo */}
            <a href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="relative z-10 group"
            >
              <Logo size={40} />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute inset-x-4 -bottom-1 h-px bg-electric-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors duration-300"
              >
                {isDark ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="
                  px-6 py-2.5 text-sm font-semibold rounded-full
                  bg-white text-obsidian
                  hover:bg-electric-cyan hover:text-obsidian
                  shadow-[0_0_20px_rgba(255,255,255,0.1)]
                  hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]
                  transition-all duration-300 transform hover:-translate-y-0.5
                "
              >
                Contact Us
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                {isDark ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="p-2 rounded-lg hover:bg-white/5 text-white transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
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
              className="md:hidden fixed inset-0 z-40 bg-obsidian-deep/80 backdrop-blur-sm"
            />
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed top-24 left-4 right-4 z-50 p-6 rounded-2xl bg-obsidian-light border border-white/10 shadow-2xl shadow-black/50"
            >
              <nav className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={() => { closeMenu(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="w-full py-3.5 text-sm font-semibold rounded-xl bg-white text-obsidian hover:bg-electric-cyan transition-colors shadow-lg"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
