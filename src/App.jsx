import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ServiceMatrix from './components/ServiceMatrix';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AgentStatus from './components/AgentStatus';

const PageLoader = ({ onComplete }) => {
  const { isDark } = useTheme();
  
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className={`fixed inset-0 z-[100] flex items-center justify-center ${
        isDark ? 'bg-[#030712]' : 'bg-white'
      }`}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative">
        <motion.div
          className={`w-16 h-16 border-2 rounded-full ${
            isDark ? 'border-cyan-500/20' : 'border-cyan-600/20'
          }`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={`absolute inset-0 w-16 h-16 border-2 border-transparent rounded-full ${
            isDark ? 'border-t-cyan-400' : 'border-t-cyan-600'
          }`}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};

const AmbientBackground = () => {
  const { isDark } = useTheme();
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden transition-colors duration-500">
      <motion.div
        className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full"
        style={{
          background: isDark 
            ? 'radial-gradient(circle, rgba(0, 255, 255, 0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(8, 145, 178, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
};

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDark } = useTheme();

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.div 
        className={`font-sans antialiased max-w-[100vw] overflow-x-hidden relative transition-colors duration-300 ${
          isDark ? 'bg-[#030712] text-white' : 'bg-white text-gray-900'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <AmbientBackground />
        <Navbar />
        <AgentStatus />

        <main className="relative z-10">
          <Hero />
          <ServiceMatrix />
          <Features />
          <CTA />
        </main>

        <Footer />
      </motion.div>
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
