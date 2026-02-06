import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const STATS = [
  { value: '40+', label: 'Languages Supported' },
  { value: '85%', label: 'Cost Reduction' },
  { value: '24/7', label: 'Autonomous Operation' },
  { value: '3min', label: 'Avg Deploy Time' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const AuroraBackground = ({ isDark }) => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    <div
      className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full animate-float"
      style={{ background: isDark ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.1)', filter: 'blur(120px)' }}
    />
    <div
      className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full animate-float"
      style={{ background: isDark ? 'rgba(6,182,212,0.1)' : 'rgba(6,182,212,0.08)', filter: 'blur(100px)', animationDelay: '-3s' }}
    />
    <div
      className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] rounded-full animate-pulse-slow"
      style={{ background: isDark ? 'rgba(37,99,235,0.1)' : 'rgba(37,99,235,0.06)', filter: 'blur(80px)' }}
    />
    {/* Grid overlay */}
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px),
        linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`,
      backgroundSize: '40px 40px',
      maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
    }} />
  </div>
);

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isDark, colors } = useTheme();

  return (
    <section ref={ref} style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '120px 20px 80px', background: colors.bg, overflow: 'hidden',
    }}>
      <AuroraBackground isDark={isDark} />

      <motion.div
        style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', fontSize: 13, fontWeight: 500,
            borderRadius: 100, marginBottom: 32,
            background: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(240, 249, 255, 0.8)',
            border: `1px solid ${colors.border}`,
            color: colors.textSecondary,
            backdropFilter: 'blur(8px)',
            boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 10px rgba(0,0,0,0.05)',
          }}>
            <Sparkles size={14} style={{ color: colors.accent }} />
            Next-Generation AI Platform
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1 variants={itemVariants} style={{
          fontSize: 'clamp(48px, 8vw, 86px)', fontWeight: 800,
          lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 32, color: colors.text,
        }}>
          Build the Future with{' '}
          <span style={{
            background: 'linear-gradient(to right, #22d3ee, #8b5cf6, #22d3ee)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', animation: 'shimmer 4s linear infinite',
          }}>Autonomous AI</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={itemVariants} style={{
          fontSize: 'clamp(18px, 2.5vw, 22px)', lineHeight: 1.6,
          color: colors.textSecondary, maxWidth: 680, margin: '0 auto 48px', fontWeight: 400,
        }}>
          Deploy intelligent agents that work 24/7. Scale your operations with
          AI-powered automation that learns, adapts, and delivers results.
        </motion.p>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="flex-col sm:flex-row" style={{
          display: 'flex', flexDirection: 'column', gap: 16,
          alignItems: 'center', justifyContent: 'center',
        }}>
          <button className="group hover:scale-105 active:scale-95" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            padding: '18px 36px', fontSize: 16, fontWeight: 600, borderRadius: 100,
            border: 'none', cursor: 'pointer',
            background: colors.text, color: colors.bg,
            boxShadow: isDark ? '0 0 40px rgba(255,255,255,0.2)' : '0 10px 30px rgba(0,0,0,0.2)',
            width: '100%', maxWidth: 240, justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            Start Free Trial
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="group hover:bg-white/5 active:scale-95" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            padding: '18px 36px', fontSize: 16, fontWeight: 600, borderRadius: 100,
            border: `1px solid ${colors.border}`, cursor: 'pointer',
            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
            color: colors.text, backdropFilter: 'blur(10px)',
            width: '100%', maxWidth: 240, justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}>
            <Play size={18} className="fill-current" />
            Watch Demo
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid-cols-2 md:grid-cols-4" style={{
          marginTop: 80, paddingTop: 40,
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40,
        }}>
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center group cursor-default">
              <div className="group-hover:text-cyan-400 transition-colors duration-300" style={{
                fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
                color: colors.text, marginBottom: 4, letterSpacing: '-0.03em',
              }}>{stat.value}</div>
              <div style={{
                fontSize: 14, fontWeight: 500, color: colors.textMuted,
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
