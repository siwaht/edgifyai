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
    if (latest > previous && latest > 150) {
      setHidden(true);
      setMobileMenuOpen(false);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-120%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 md:py-6 pointer-events-none px-4"
      >
        <motion.div 
          className={`pointer-events-auto flex items-center justify-between md:justify-start gap-4 md:gap-8 w-full md:w-auto px-4 md:px-6 py-3 rounded-2xl transition-all duration-500 ${
            scrolled 
              ? isDark
                ? 'bg-[#030712]/80 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20'
                : 'bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg shadow-black/5'
              : isDark
                ? 'bg-black/30 backdrop-blur-md border border-white/5'
                : 'bg-white/30 backdrop-blur-md border border-gray-200/50'
          }`}
          layout
        >
          <motion.a 
            href="#" 
            className={`text-lg md:text-xl font-bold tracking-tighter relative group ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">AGENTICOS</span>
          </motion.a>

          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.li 
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 group ${
                    isDark 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item}
                  <motion.span 
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px group-hover:w-1/2 transition-all duration-300 ${
                      isDark ? 'bg-cyan-400' : 'bg-cyan-600'
                    }`}
                  />
                </a>
              </motion.li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <motion.button 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold overflow-hidden relative group ${
                isDark 
                  ? 'bg-white text-[#030712]' 
                  : 'bg-gray-900 text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Access</span>
              <motion.div 
                className={`absolute inset-0 ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <motion.button
              className={`p-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-20 left-4 right-4 z-40 backdrop-blur-xl border rounded-2xl p-6 md:hidden ${
              isDark 
                ? 'bg-[#030712]/95 border-white/10' 
                : 'bg-white/95 border-gray-200'
            }`}
          >
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className={`block py-2 text-lg font-medium transition-colors ${
                      isDark 
                        ? 'text-gray-300 hover:text-cyan-400' 
                        : 'text-gray-700 hover:text-cyan-600'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.button 
              className={`w-full mt-6 px-5 py-3 rounded-xl text-sm font-semibold ${
                isDark 
                  ? 'bg-white text-[#030712]' 
                  : 'bg-gray-900 text-white'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Access Platform
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
