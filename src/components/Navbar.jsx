import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = ['Solutions', 'Technology', 'Enterprise', 'Company'];

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

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
              ? 'bg-obsidian/80 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20' 
              : 'bg-black/30 backdrop-blur-md border border-white/5'
          }`}
          layout
        >
          {/* Logo */}
          <motion.a 
            href="#" 
            className="text-lg md:text-xl font-bold tracking-tighter text-white relative group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">AGENTICOS</span>
            <motion.span 
              className="absolute -inset-2 bg-electric-cyan/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              layoutId="logo-glow"
            />
          </motion.a>

          {/* Desktop Navigation */}
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
                  className="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  {item}
                  <motion.span 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-electric-cyan group-hover:w-1/2 transition-all duration-300"
                  />
                </a>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <motion.button 
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-obsidian text-sm font-semibold overflow-hidden relative group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Access</span>
            <motion.div 
              className="absolute inset-0 bg-electric-cyan"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-4 right-4 z-40 bg-obsidian/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:hidden"
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
                    className="block py-2 text-lg font-medium text-gray-300 hover:text-electric-cyan transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.button 
              className="w-full mt-6 px-5 py-3 rounded-xl bg-white text-obsidian text-sm font-semibold"
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
