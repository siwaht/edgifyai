import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const { isDark } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: isDark ? '#09090b' : '#ffffff' }}
    >
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />

      {/* Gradient orbs */}
      <motion.div 
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full blur-[100px] opacity-40"
        style={{ background: isDark ? 'rgba(6, 182, 212, 0.3)' : 'rgba(8, 145, 178, 0.2)' }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full blur-[100px] opacity-30"
        style={{ background: isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)' }}
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div 
        className="container-custom relative z-10 py-32 md:py-40"
        style={{ y, opacity }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="badge">
              <Sparkles size={14} />
              Next-Gen AI Platform
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            <span style={{ color: isDark ? '#fafafa' : '#09090b' }}>
              Build the Future with
            </span>
            <br />
            <span className="text-gradient">Autonomous AI</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: isDark ? '#a1a1aa' : '#52525b' }}
          >
            Deploy intelligent agents that work 24/7. Scale your operations with 
            AI-powered automation that learns, adapts, and delivers results.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="btn-primary w-full sm:w-auto">
              Start Free Trial
              <ArrowRight size={18} />
            </button>
            <button className="btn-secondary w-full sm:w-auto">
              <Play size={18} />
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 pt-10 border-t grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            style={{ borderColor: 'var(--border-primary)' }}
          >
            {[
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '50ms', label: 'Avg Latency' },
              { value: '10M+', label: 'API Calls/Day' },
              { value: '500+', label: 'Enterprise Clients' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div 
                  className="text-2xl sm:text-3xl font-bold mb-1"
                  style={{ color: isDark ? '#fafafa' : '#09090b' }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-sm"
                  style={{ color: isDark ? '#71717a' : '#a1a1aa' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${isDark ? '#09090b' : '#ffffff'}, transparent)`
        }}
      />
    </section>
  );
};

export default Hero;
