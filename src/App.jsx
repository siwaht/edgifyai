import { useEffect, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import ServiceMatrix from './components/ServiceMatrix';
import Features from './components/Features';
import CTA from './components/CTA';
import NeuralNetworkViz from './components/NeuralNetworkViz';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Logo from './components/Logo';

const LOADER_MS = 750;

const PageLoader = () => (
  <motion.div
    className="page-loader"
    role="status"
    aria-label="Loading EdgeifyAI"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
  >
    <motion.div
      initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Logo size={40} />
    </motion.div>
    <div className="page-loader__bar">
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: LOADER_MS / 1000, ease: [0.65, 0, 0.35, 1] }}
      />
    </div>
  </motion.div>
);

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADER_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      <AnimatePresence>
        {isLoading && <PageLoader key="loader" />}
      </AnimatePresence>

      <div className="noise-overlay" aria-hidden="true" />

      <div style={{ position: 'relative', overflowX: 'clip', minHeight: '100vh' }}>
        <Navbar />
        <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
          <Hero ready={!isLoading} />
          <Marquee />
          <ServiceMatrix />
          <Features />
          <CTA />
          <NeuralNetworkViz />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <AppContent />
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
