import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isDark } = useTheme();

  const sectionStyle = {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '120px 20px 80px',
    background: isDark ? '#020617' : '#ffffff', // obsidian-deep
    overflow: 'hidden',
  };

  // Background Elements
  const AuroraBackground = () => (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-500/20 blur-[120px] rounded-full animate-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-500/10 blur-[100px] rounded-full animate-float" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] bg-blue-600/10 blur-[80px] rounded-full animate-pulse-slow" />

      {/* Mesh Grid Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
      }} />
    </div>
  );

  const containerStyle = {
    maxWidth: 900,
    margin: '0 auto',
    textAlign: 'center',
    position: 'relative',
    zIndex: 10,
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: '0.02em',
    // textTransform: 'uppercase', // Removing uppercase for modern feel
    borderRadius: 100,
    background: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(240, 249, 255, 0.8)',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
    color: isDark ? '#e2e8f0' : '#475569',
    marginBottom: 32,
    backdropFilter: 'blur(8px)',
    boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 10px rgba(0,0,0,0.05)',
  };

  const headingStyle = {
    fontSize: 'clamp(48px, 8vw, 86px)', // Increased size
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: '-0.04em', // Tighter spacing
    marginBottom: 32,
    color: isDark ? '#ffffff' : '#020617',
  };

  const gradientTextStyle = {
    background: 'linear-gradient(to right, #22d3ee, #8b5cf6, #22d3ee)', // Animated gradient base
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'shimmer 4s linear infinite',
  };

  const subtitleStyle = {
    fontSize: 'clamp(18px, 2.5vw, 22px)',
    lineHeight: 1.6,
    color: isDark ? '#94a3b8' : '#475569',
    maxWidth: 680,
    margin: '0 auto 48px',
    fontWeight: 400,
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const primaryButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 12,
    padding: '18px 36px',
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 100,
    border: 'none',
    cursor: 'pointer',
    background: isDark ? '#ffffff' : '#020617', // High contrast
    color: isDark ? '#020617' : '#ffffff',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: isDark ? '0 0 40px rgba(255, 255, 255, 0.2)' : '0 10px 30px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: 240,
    justifyContent: 'center',
  };

  const secondaryButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 12,
    padding: '18px 36px',
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 100,
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
    cursor: 'pointer',
    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
    color: isDark ? '#ffffff' : '#020617',
    transition: 'all 0.2s ease',
    backdropFilter: 'blur(10px)',
    width: '100%',
    maxWidth: 240,
    justifyContent: 'center',
  };

  const statsContainerStyle = {
    marginTop: 80,
    paddingTop: 40,
    borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 40,
  };

  const statValueStyle = {
    fontSize: 'clamp(32px, 4vw, 48px)',
    fontWeight: 700,
    color: isDark ? '#ffffff' : '#020617',
    marginBottom: 4,
    letterSpacing: '-0.03em',
  };

  const statLabelStyle = {
    fontSize: 14,
    fontWeight: 500,
    color: isDark ? '#64748b' : '#64748b', // Slate-500
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' }, // Added blur to exit
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const stats = [
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '50ms', label: 'Avg Latency' },
    { value: '10M+', label: 'API Calls/Day' },
    { value: '500+', label: 'Enterprise Clients' },
  ];

  return (
    <section ref={ref} style={sectionStyle}>
      <AuroraBackground />

      <motion.div
        style={containerStyle}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants}>
          <span style={badgeStyle}>
            <Sparkles size={14} className="text-cyan-400" />
            <span style={{ opacity: 0.9 }}>Next-Generation AI Platform</span>
          </span>
        </motion.div>

        <motion.h1 variants={itemVariants} style={headingStyle}>
          Build the Future with{' '}
          <span style={gradientTextStyle}>Autonomous AI</span>
        </motion.h1>

        <motion.p variants={itemVariants} style={subtitleStyle}>
          Deploy intelligent agents that work 24/7. Scale your operations with
          AI-powered automation that learns, adapts, and delivers results.
        </motion.p>

        <motion.div variants={itemVariants} style={buttonContainerStyle} className="flex-col sm:flex-row">
          <button style={primaryButtonStyle} className="group hover:scale-105 active:scale-95">
            Start Free Trial
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button style={secondaryButtonStyle} className="group hover:bg-white/5 active:scale-95">
            <Play size={18} className="fill-current" />
            Watch Demo
          </button>
        </motion.div>

        <motion.div variants={itemVariants} style={statsContainerStyle} className="grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group cursor-default">
              <div style={statValueStyle} className="group-hover:text-cyan-400 transition-colors duration-300">
                {stat.value}
              </div>
              <div style={statLabelStyle}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
