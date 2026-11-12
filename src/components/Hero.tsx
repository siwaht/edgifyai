import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { useTheme } from '../context/theme';
import AIAgentsAnimation from './AIAgentsAnimation';
import { CHANNELS, HERO_STATS } from '../content/site';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const { isDark, colors } = useTheme();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      style={{ background: colors.bg, position: 'relative', overflow: 'hidden', minHeight: '100vh' }}
      className="flex flex-col"
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: isDark
          ? 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(34,211,238,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(59,130,246,0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 10%, rgba(16,185,129,0.04) 0%, transparent 60%)'
          : 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(8,145,178,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(59,130,246,0.05) 0%, transparent 60%)',
      }} />

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.025)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.025)'} 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
      }} />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-16 w-full flex-1 flex flex-col">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ opacity: opacityFade }}
          className="flex flex-col lg:flex-row items-center gap-12 flex-1"
        >
          <div className="flex-1 flex flex-col gap-6 max-w-xl">
            <motion.div variants={itemVariants} className="flex items-center gap-2" style={{ width: 'fit-content' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: colors.accentMuted,
                border: `1px solid ${isDark ? 'rgba(34,211,238,0.2)' : 'rgba(8,145,178,0.2)'}`,
                borderRadius: '100px',
                padding: '6px 14px',
                fontSize: '0.78rem',
                fontWeight: 500,
                color: colors.accent,
              }}>
                <Sparkles size={12} />
                Voice, Vision &amp; Chat Agents
                <span style={{
                  background: colors.accent, color: '#0a0a0f',
                  fontSize: '0.65rem', fontWeight: 700, padding: '1px 6px', borderRadius: '100px',
                }}>2026</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 4.25rem)', fontWeight: 800, lineHeight: 1.08, color: colors.text, letterSpacing: '-0.03em' }}
            >
              AI Agents That
              <br />
              <span style={{ color: colors.textSecondary }}>Hear, See and</span>{' '}
              <span
                className="gradient-text"
                style={{ backgroundImage: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})` }}
              >
                Get Work Done
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} style={{ color: colors.textSecondary, fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '46ch' }}>
              We design, build and run production AI agents for your business — answering calls in your voice, reading documents and screens, chatting on every channel, and taking action in the systems you already use.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <a
                href="#contact"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
                  color: '#0a0a0f',
                  padding: '13px 28px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  transition: 'transform 0.2s ease, opacity 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}
              >
                Book a Demo <ArrowRight size={16} />
              </a>
              <a
                href="#services"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                  padding: '13px 28px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  backdropFilter: 'blur(8px)',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = colors.borderHover; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = colors.border; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}
              >
                Explore Agent Types
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-1">
              {CHANNELS.map((channel) => {
                const Icon = channel.icon;
                return (
                  <span
                    key={channel.label}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      background: colors.bgCard,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '100px',
                      padding: '5px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: colors.textSecondary,
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <Icon size={12} color={colors.accent} />
                    {channel.label}
                  </span>
                );
              })}
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} style={{
                  padding: '12px 16px',
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '12px',
                  backdropFilter: 'blur(8px)',
                }}>
                  <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: colors.accent, letterSpacing: '-0.02em' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.72rem', color: colors.textMuted, fontWeight: 500, marginTop: '2px' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            style={{ flex: '0 0 auto', width: '100%', maxWidth: 540 }}
            className="hidden lg:block"
          >
            <motion.div style={{ y: yParallax }}>
              <AIAgentsAnimation />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex justify-center pb-8 mt-auto"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: colors.textMuted, cursor: 'pointer' }}
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
