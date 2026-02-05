import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2.5 rounded-xl transition-colors ${
        isDark 
          ? 'hover:bg-white/[0.06] text-zinc-400 hover:text-white' 
          : 'hover:bg-black/[0.04] text-zinc-500 hover:text-zinc-900'
      }`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: [1, 0.9, 1] }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
