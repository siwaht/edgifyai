import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AgentStatus = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // Auto-minimize after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinimized(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          width: isMinimized ? 'auto' : 'auto',
        }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ 
          delay: 1.5, 
          duration: 0.5, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50"
        onMouseEnter={() => setIsMinimized(false)}
        onMouseLeave={() => setIsMinimized(true)}
      >
        <motion.div 
          className="flex items-center gap-3 px-4 py-2.5 rounded-full cursor-pointer"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 255, 255, 0.2)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 255, 255, 0.1)',
          }}
          whileHover={{ 
            borderColor: 'rgba(0, 255, 255, 0.4)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 255, 255, 0.2)',
          }}
          layout
        >
          {/* Animated status indicator */}
          <div className="relative flex h-3 w-3 flex-shrink-0">
            <motion.span 
              className="absolute inline-flex h-full w-full rounded-full bg-electric-cyan"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.75, 0, 0.75]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-electric-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
          </div>

          {/* Text content */}
          <AnimatePresence mode="wait">
            {!isMinimized && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 overflow-hidden"
              >
                <span className="text-sm font-medium tracking-wide text-electric-cyan whitespace-nowrap">
                  Agenticos Labs: System Active
                </span>
                
                {/* Close button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsVisible(false);
                  }}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={14} className="text-gray-400 hover:text-white" />
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
