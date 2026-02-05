import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AgentStatus = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setIsMinimized(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ delay: 1.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50"
        onMouseEnter={() => setIsMinimized(false)}
        onMouseLeave={() => setIsMinimized(true)}
      >
        <motion.div 
          className={`flex items-center gap-3 px-4 py-2.5 rounded-full cursor-pointer transition-colors duration-300 ${
            isDark 
              ? 'bg-black/60 border border-cyan-400/20' 
              : 'bg-white/80 border border-cyan-600/20'
          }`}
          style={{
            backdropFilter: 'blur(20px)',
            boxShadow: isDark 
              ? '0 4px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 255, 255, 0.1)'
              : '0 4px 30px rgba(0, 0, 0, 0.1), 0 0 20px rgba(8, 145, 178, 0.1)',
          }}
          whileHover={{ 
            borderColor: isDark ? 'rgba(0, 255, 255, 0.4)' : 'rgba(8, 145, 178, 0.4)',
          }}
          layout
        >
          <div className="relative flex h-3 w-3 flex-shrink-0">
            <motion.span 
              className={`absolute inline-flex h-full w-full rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}
              animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}
              style={{ boxShadow: isDark ? '0 0 10px rgba(0,255,255,0.5)' : '0 0 10px rgba(8,145,178,0.5)' }} />
          </div>

          <AnimatePresence mode="wait">
            {!isMinimized && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 overflow-hidden"
              >
                <span className={`text-sm font-medium tracking-wide whitespace-nowrap ${
                  isDark ? 'text-cyan-400' : 'text-cyan-600'
                }`}>
                  Agenticos Labs: System Active
                </span>
                
                <motion.button
                  onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
                  className={`p-1 rounded-full transition-colors ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={14} className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AgentStatus;
