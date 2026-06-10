import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { useTheme } from '../context/theme';
import AIAgentsAnimation from './AIAgentsAnimation';

const STATS = [
  { value: '12+', label: 'Agent Types' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '24/7', label: 'Autonomous Ops' },
  { value: '500+', label: 'Agents Deployed' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isDark, colors } = useTheme();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '140px 20px 100px', background: colors.bg, overflow: 'hidden',
    }}>
      {/* Background layer */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Primary glow - top left */}
        <div style={{
          position: 'absolute', top: '-20%', left: '-15%', width: '55vw', height: '55vw',
          borderRadius: '50%',
          background: isDark ? 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float-gentle 12s ease-in-out infinite',
        }} />
        {/* Secondary glow - bottom right */}
        <div style={{
          position: 'absolute', bottom: '-20%', right: '-15%', width: '50vw', height: '50vw',
          borderRadius: '50%',
          background: isDark ? 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(20,184,166,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float-gentle 12s ease-in-out infinite', animationDelay: '-5s',
        }} />
        {/* Accent - top right */}
        <div style={{
          position: 'absolute', top: '25%', right: '10%', width: '30vw', height: '30vw',
          borderRadius: '50%',
          background: isDark ? 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float-gentle 14s ease-in-out infinite', animationDelay: '-8s',
        }} />
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)'} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 50% 40%, black 20%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 20%, transparent 72%)',
        }} />
      </div>

      <motion.div
        style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10, y: yParallax, opacity: opacityFade }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 6px 6px 16px', fontSize: 13, fontWeight: 500,
            borderRadius: 100, marginBottom: 36,
            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
            color: colors.textSecondary,
          }}>
            <Sparkles size={13} style={{ color: '#22d3ee' }} />
            Next-Generation AI Agents
            <span style={{
              padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 600,
              background: isDark ? 'rgba(6,182,212,0.15)' : 'rgba(6,182,212,0.1)',
              color: isDark ? '#22d3ee' : '#0891b2',
              letterSpacing: '0.02em',
            }}>New</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={itemVariants} className="font-display" style={{
          fontSize: 'clamp(46px, 8vw, 90px)', fontWeight: 800,
          lineHeight: 1.02, letterSpacing: '-0.04em', marginBottom: 28, color: colors.text,
        }}>
          Build the Future
          <br />
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <span
              className="gradient-text"
              style={{
                background: `linear-gradient(135deg, #06b6d4 0%, #14b8a6 50%, #06b6d4 100%)`,
                backgroundSize: '200% auto',
                animation: 'shimmer 5s linear infinite',
              }}
            >with Intelligent</span>
          </span>
          {' '}Agents
        </motion.h1>

        {/* Subheading */}
        <motion.p variants={itemVariants} style={{
          fontSize: 'clamp(17px, 2.2vw, 20px)', lineHeight: 1.75,
          color: colors.textSecondary, maxWidth: 580, margin: '0 auto 52px', fontWeight: 400,
        }}>
          From simple chatbots to enterprise-grade autonomous agents — we design, build, and deploy AI agents with memory, reasoning, and real-world tool access.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={itemVariants} className="hero-buttons" style={{
          display: 'flex', flexDirection: 'column', gap: 14,
          alignItems: 'center', justifyContent: 'center',
        }}>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="hero-primary-btn"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '16px 32px', fontSize: 16, fontWeight: 600, borderRadius: 100,
              border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              color: '#ffffff',
              boxShadow: isDark
                ? '0 0 0 1px rgba(6,182,212,0.3), 0 8px 32px rgba(6,182,212,0.3)'
                : '0 8px 24px rgba(6,182,212,0.35)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              width: '100%', maxWidth: 240, justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = isDark
                ? '0 0 0 1px rgba(6,182,212,0.4), 0 12px 40px rgba(6,182,212,0.4)'
                : '0 12px 32px rgba(6,182,212,0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = isDark
                ? '0 0 0 1px rgba(6,182,212,0.3), 0 8px 32px rgba(6,182,212,0.3)'
                : '0 8px 24px rgba(6,182,212,0.35)';
            }}
          >
            Get a Consultation
            <ArrowRight size={17} />
          </button>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '16px 32px', fontSize: 16, fontWeight: 600, borderRadius: 100,
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              cursor: 'pointer',
              background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
              color: colors.text, backdropFilter: 'blur(10px)',
              width: '100%', maxWidth: 240, justifyContent: 'center',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
              e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)';
              e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
            }}
          >
            <ChevronDown size={17} />
            Explore Services
          </button>
        </motion.div>

        {/* Agent animation */}
        <motion.div variants={itemVariants} style={{ marginTop: 72 }}>
          <AIAgentsAnimation />
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} style={{ marginTop: 64 }}>
          <div style={{
            height: 1,
            background: isDark
              ? 'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)'
              : 'linear-gradient(to right, transparent, rgba(0,0,0,0.06) 20%, rgba(0,0,0,0.06) 80%, transparent)',
            marginBottom: 40,
          }} />
          <div className="hero-stats" style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px 0',
          }}>
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{ textAlign: 'center', position: 'relative' }}
              >
                {i > 0 && i % 2 === 0 ? null : null}
                <div className="font-display" style={{
                  fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800,
                  letterSpacing: '-0.04em', marginBottom: 6,
                  background: isDark
                    ? 'linear-gradient(135deg, #f4f4f5, #a1a1aa)'
                    : 'linear-gradient(135deg, #09090b, #3f3f46)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: 12, fontWeight: 600, color: colors.textMuted,
                  textTransform: 'uppercase', letterSpacing: '0.07em',
                }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        @media (min-width: 640px) {
          .hero-buttons { flex-direction: row !important; }
          .hero-primary-btn { max-width: 260px !important; }
        }
        @media (min-width: 768px) {
          .hero-stats { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
