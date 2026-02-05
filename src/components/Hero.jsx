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
    background: isDark ? '#09090b' : '#ffffff',
    overflow: 'hidden',
  };

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
    padding: '10px 18px',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    borderRadius: 100,
    background: isDark ? 'rgba(6, 182, 212, 0.15)' : 'rgba(8, 145, 178, 0.1)',
    color: isDark ? '#06b6d4' : '#0891b2',
    marginBottom: 32,
  };

  const headingStyle = {
    fontSize: 'clamp(36px, 8vw, 72px)',
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    marginBottom: 24,
    color: isDark ? '#fafafa' : '#09090b',
  };

  const gradientTextStyle = {
    background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const subtitleStyle = {
    fontSize: 'clamp(16px, 2.5vw, 20px)',
    lineHeight: 1.7,
    color: isDark ? '#a1a1aa' : '#52525b',
    maxWidth: 640,
    margin: '0 auto 40px',
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
    gap: 10,
    padding: '16px 28px',
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    background: isDark ? '#fafafa' : '#09090b',
    color: isDark ? '#09090b' : '#fafafa',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    width: '100%',
    maxWidth: 220,
    justifyContent: 'center',
  };

  const secondaryButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    padding: '16px 28px',
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 12,
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
    cursor: 'pointer',
    background: 'transparent',
    color: isDark ? '#fafafa' : '#09090b',
    transition: 'all 0.2s ease',
    width: '100%',
    maxWidth: 220,
    justifyContent: 'center',
  };

  const statsContainerStyle = {
    marginTop: 64,
    paddingTop: 48,
    borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 32,
  };

  const statStyle = {
    textAlign: 'center',
  };

  const statValueStyle = {
    fontSize: 'clamp(24px, 4vw, 36px)',
    fontWeight: 700,
    color: isDark ? '#fafafa' : '#09090b',
    marginBottom: 4,
  };

  const statLabelStyle = {
    fontSize: 14,
    color: isDark ? '#71717a' : '#a1a1aa',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const stats = [
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '50ms', label: 'Avg Latency' },
    { value: '10M+', label: 'API Calls/Day' },
    { value: '500+', label: 'Enterprise Clients' },
  ];

  return (
    <section ref={ref} style={sectionStyle}>
      {/* Background gradient orbs */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-10%',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: isDark ? 'rgba(6, 182, 212, 0.15)' : 'rgba(8, 145, 178, 0.1)',
        filter: 'blur(100px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-10%',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: isDark ? 'rgba(139, 92, 246, 0.12)' : 'rgba(124, 58, 237, 0.08)',
        filter: 'blur(100px)',
        pointerEvents: 'none',
      }} />

      <motion.div
        style={containerStyle}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants}>
          <span style={badgeStyle}>
            <Sparkles size={14} />
            Next-Gen AI Platform
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
          <button style={primaryButtonStyle}>
            Start Free Trial
            <ArrowRight size={18} />
          </button>
          <button style={secondaryButtonStyle}>
            <Play size={18} />
            Watch Demo
          </button>
        </motion.div>

        <motion.div variants={itemVariants} style={statsContainerStyle} className="grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} style={statStyle}>
              <div style={statValueStyle}>{stat.value}</div>
              <div style={statLabelStyle}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
