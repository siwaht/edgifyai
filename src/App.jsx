import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ServiceMatrix from './components/ServiceMatrix';
import CTA from './components/CTA';
import Footer from './components/Footer';

const PageLoader = ({ onComplete }) => {
  const { isDark } = useTheme();
  
  useEffect(() => {
    const timer = setTimeout(onComplete, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: isDark ? '#09090b' : '#ffffff' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          className="w-12 h-12 rounded-full border-2"
          style={{ borderColor: isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(8, 145, 178, 0.2)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-12 h-12 rounded-full border-2 border-transparent"
          style={{ borderTopColor: isDark ? '#06b6d4' : '#0891b2' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
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
        className="relative overflow-x-hidden"
        style={{ 
          background: isDark ? '#09090b' : '#ffffff',
          color: isDark ? '#fafafa' : '#09090b'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Ambient gradients */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]"
            style={{ background: isDark ? 'rgba(6, 182, 212, 0.15)' : 'rgba(8, 145, 178, 0.1)' }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-30 blur-[120px]"
            style={{ background: isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(124, 58, 237, 0.08)' }}
          />
        </div>

        <Navbar />
        
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
