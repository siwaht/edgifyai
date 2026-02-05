import { useEffect, useState } from 'react';
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
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDark ? '#09090b' : '#ffffff',
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ position: 'relative' }}>
        <motion.div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: `2px solid ${isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(8, 145, 178, 0.2)'}`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: isDark ? '#06b6d4' : '#0891b2',
          }}
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

      <div className="noise-overlay" />

      <motion.div
        style={{
          position: 'relative',
          overflowX: 'hidden',
          background: isDark ? '#09090b' : '#ffffff',
          color: isDark ? '#fafafa' : '#09090b',
          minHeight: '100vh',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <Navbar />
        <main>
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
