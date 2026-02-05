import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ServiceMatrix from './components/ServiceMatrix';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AgentStatus from './components/AgentStatus';

// Smooth page loader
const PageLoader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-obsidian flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-2 border-electric-cyan/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 w-16 h-16 border-2 border-transparent border-t-electric-cyan rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 w-12 h-12 border border-electric-cyan/30 rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

// Ambient background effects
const AmbientBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    {/* Primary gradient orb */}
    <motion.div
      className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(0, 255, 255, 0.08) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }}
      animate={{
        x: [0, 100, 0],
        y: [0, -50, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Secondary gradient orb */}
    <motion.div
      className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }}
      animate={{
        x: [0, -80, 0],
        y: [0, 60, 0],
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Subtle grid overlay */}
    <div 
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px',
      }}
    />
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.div 
        className="font-sans antialiased text-white bg-obsidian selection:bg-electric-cyan/30 selection:text-white max-w-[100vw] overflow-x-hidden relative"
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
}

export default App;
