import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ServiceMatrix from './components/ServiceMatrix';
import CTA from './components/CTA';
import AgentWorkflow from './components/AgentWorkflow';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Marquee from './components/Marquee';

const PageLoader = ({ onComplete }) => {
  const { colors } = useTheme();

  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 24, background: colors.bg,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ position: 'relative', width: 48, height: 48 }}>
        <motion.div
          style={{
            width: 48, height: 48, borderRadius: '50%',
            border: `2px solid ${colors.accentMuted}`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            width: 48, height: 48, borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: colors.accent,
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <motion.span
        className="font-display"
        style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.02em', color: colors.textMuted }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Agenticos
      </motion.span>
    </motion.div>
  );
};

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { colors } = useTheme();
  const handleLoaded = useCallback(() => setIsLoading(false), []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader onComplete={handleLoaded} />}
      </AnimatePresence>

      <div className="noise-overlay" />

      <motion.div
        style={{
          position: 'relative', overflowX: 'hidden',
          background: colors.bg, color: colors.text, minHeight: '100vh',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <ServiceMatrix />
          <Features />
          <CTA />
          <AgentWorkflow />
          <Contact />
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
