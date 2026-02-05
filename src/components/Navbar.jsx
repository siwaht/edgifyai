import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const navItems = ['Solutions', 'Technology', 'Enterprise', 'Company'];

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { isDark } = useTheme();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 100) {
      setHidden(true);
      setMobileMenuOpen(false);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 20);
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="container-custom">
          <motion.nav 
            className={`mt-4 px-4 sm:px-6 py-3 rounded-2xl transition-all duration-300 ${
              scrolled 
                ? isDark
                  ? 'bg-[#09090b]/90 backdrop-blur-xl border border-white/[0.08] shadow-lg'
                  : 'bg-white/90 backdrop-blur-xl border border-black/[0.06] shadow-lg'
                : 'bg-transparent'
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <a href="#" className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)' }}
                >
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className={`font-bold text-lg tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Agenticos
                </span>
              </a>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isDark 
                        ? 'text-zinc-400 hover:text-white hover:bg-white/[0.06]' 
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-black/[0.04]'
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center gap-3">
                <ThemeToggle />
                <button className="btn-primary text-sm py-2.5 px-5">
                  Get Started
                </button>
              </div>

              {/* Mobile Actions */}
              <div className="flex md:hidden items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-white/[0.06]' : 'hover:bg-black/[0.04]'
                  }`}
                >
                  {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
          </motion.nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={`fixed top-20 left-4 right-4 z-50 rounded-2xl p-6 md:hidden ${
                isDark 
                  ? 'bg-[#18181b] border border-white/[0.08]' 
                  : 'bg-white border border-black/[0.06]'
              }`}
              style={{ boxShadow: 'var(--shadow-lg)' }}
            >
              <nav className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                      isDark 
                        ? 'text-zinc-300 hover:text-white hover:bg-white/[0.06]' 
                        : 'text-zinc-700 hover:text-zinc-900 hover:bg-black/[0.04]'
                    }`}
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                <button className="btn-primary w-full">
                  Get Started
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
