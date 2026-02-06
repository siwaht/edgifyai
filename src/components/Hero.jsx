import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import AIAgentsAnimation from './AIAgentsAnimation';

const STATS = [
  { value: '40+', label: 'Languages Supported' },
  { value: '85%', label: 'Cost Reduction' },
  { value: '24/7', label: 'Autonomous Operation' },
  { value: '3min', label: 'Avg Deploy Time' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isDark, colors } = useTheme();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '140px 20px 80px', background: colors.bg, overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-15%', left: '-10%', width: '50vw', height: '50vw',
          borderRadius: '50%',
          background: isDark ? 'rgba(6,182,212,0.08)' : 'rgba(6,182,212,0.05)',
          filter: 'blur(120px)',
          animation: 'float-gentle 10s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-15%', right: '-10%', width: '45vw', height: '45vw',
          borderRadius: '50%',
          background: isDark ? 'rgba(20,184,166,0.06)' : 'rgba(20,184,166,0.04)',
          filter: 'blur(100px)',
          animation: 'float-gentle 10s ease-in-out infinite', animationDelay: '-4s',
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '15%', width: '25vw', height: '25vw',
          borderRadius: '50%',
          background: isDark ? 'rgba(6,182,212,0.04)' : 'rgba(6,182,212,0.03)',
          filter: 'blur(80px)',
          animation: 'float-gentle 10s ease-in-out infinite', animationDelay: '-7s',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }} />
      </div>

      <motion.div
        style={{ maxWidth: 920, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10, y: yParallax, opacity: opacityFade }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div variants={itemVariants}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 20px', fontSize: 13, fontWeight: 500,
            borderRadius: 100, marginBottom: 32,
            background: isDark ? 'rgba(6,182,212,0.1)' : 'rgba(6,182,212,0.06)',
            border: `1px solid ${isDark ? 'rgba(6,182,212,0.2)' : 'rgba(6,182,212,0.15)'}`,
            color: isDark ? '#22d3ee' : '#0891b2',
            backdropFilter: 'blur(12px)',
          }}>
            <Sparkles size={14} />
            Next-Generation AI Platform
          </span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="font-display" style={{
          fontSize: 'clamp(44px, 7.5vw, 82px)', fontWeight: 800,
          lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 28, color: colors.text,
        }}>
          Build the Future with{' '}
          <span
            className="gradient-text"
            style={{
              background: `linear-gradient(135deg, ${colors.accent}, #14b8a6, ${colors.accent})`,
              backgroundSize: '200% auto',
              animation: 'shimmer 4s linear infinite',
            }}
          >Autonomous AI</span>
        </motion.h1>

        <motion.p variants={itemVariants} style={{
          fontSize: 'clamp(17px, 2.2vw, 20px)', lineHeight: 1.7,
          color: colors.textSecondary, maxWidth: 620, margin: '0 auto 48px', fontWeight: 400,
        }}>
          Deploy intelligent agents that work 24/7. Scale your operations with
          AI-powered automation that learns, adapts, and delivers results.
        </motion.p>

        <motion.div variants={itemVariants} className="flex-col sm:flex-row" style={{
          display: 'flex', flexDirection: 'column', gap: 16,
          alignItems: 'center', justifyContent: 'center',
        }}>
          <button className="group hover:scale-[1.03] active:scale-95 transition-all duration-300" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '18px 36px', fontSize: 16, fontWeight: 600, borderRadius: 100,
            border: 'none', cursor: 'pointer',
            background: isDark ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : colors.text,
            color: isDark ? '#ffffff' : colors.bg,
            boxShadow: isDark ? '0 0 40px rgba(6,182,212,0.2)' : '0 10px 30px rgba(0,0,0,0.15)',
            width: '100%', maxWidth: 240, justifyContent: 'center',
          }}>
            Get a Consultation
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="group hover:scale-[1.03] active:scale-95 transition-all duration-200" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '18px 36px', fontSize: 16, fontWeight: 600, borderRadius: 100,
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : colors.border}`, cursor: 'pointer',
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
            color: colors.text, backdropFilter: 'blur(10px)',
            width: '100%', maxWidth: 240, justifyContent: 'center',
          }}>
            <Play size={16} style={{ fill: 'currentColor' }} />
            View Our Work
          </button>
        </motion.div>

        <motion.div variants={itemVariants} style={{ marginTop: 64 }}>
          <AIAgentsAnimation />
        </motion.div>

        <motion.div variants={itemVariants} className="grid-cols-2 md:grid-cols-4" style={{
          marginTop: 72, paddingTop: 40,
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32,
        }}>
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center group cursor-default"
            >
              <div className="font-display group-hover:text-cyan-400 transition-colors duration-300" style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700,
                color: colors.text, marginBottom: 4, letterSpacing: '-0.03em',
              }}>{stat.value}</div>
              <div style={{
                fontSize: 13, fontWeight: 500, color: colors.textMuted,
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
