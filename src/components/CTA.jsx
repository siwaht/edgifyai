import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const BENEFITS = [
  'Free architecture review',
  'Custom agent design',
  'Ongoing support & iteration',
];

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isDark, colors } = useTheme();

  return (
    <section ref={ref} style={{
      padding: 'clamp(72px,10vw,120px) 20px',
      background: isDark ? '#0d0d14' : '#f8fafc',
    }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            padding: 'clamp(48px, 8vw, 80px) clamp(32px, 6vw, 72px)',
            borderRadius: 32, textAlign: 'center', overflow: 'hidden',
            background: isDark
              ? 'linear-gradient(145deg, rgba(20,20,32,0.95), rgba(14,14,22,0.98))'
              : 'linear-gradient(145deg, #ffffff, #f8fafc)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
            boxShadow: isDark
              ? '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)'
              : '0 32px 64px rgba(0,0,0,0.08)',
          }}
        >
          {/* Background glows */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
            background: isDark
              ? 'radial-gradient(ellipse at 30% -10%, rgba(6,182,212,0.18) 0%, transparent 60%), radial-gradient(ellipse at 70% 110%, rgba(20,184,166,0.14) 0%, transparent 60%)'
              : 'radial-gradient(ellipse at 30% -10%, rgba(6,182,212,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 110%, rgba(20,184,166,0.09) 0%, transparent 60%)',
          }} />

          {/* Grid overlay */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
            backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          }} />

          <div style={{ position: 'relative', zIndex: 10 }}>
            {/* Icon badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 56, height: 56, borderRadius: 16, marginBottom: 28,
              background: isDark ? 'rgba(6,182,212,0.12)' : 'rgba(6,182,212,0.09)',
              border: `1px solid ${isDark ? 'rgba(6,182,212,0.2)' : 'rgba(6,182,212,0.18)'}`,
              boxShadow: '0 8px 24px rgba(6,182,212,0.15)',
            }}>
              <Zap size={24} style={{ color: '#06b6d4' }} strokeWidth={2} />
            </div>

            <h2 className="font-display" style={{
              fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800, color: colors.text,
              marginBottom: 18, letterSpacing: '-0.03em', lineHeight: 1.1,
            }}>
              Let's Design Your AI Solution
            </h2>
            <p style={{
              fontSize: 'clamp(15px, 2vw, 18px)', color: colors.textSecondary,
              maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.7,
            }}>
              Whether you need a simple chatbot or a fleet of autonomous agents — we'll architect the right system for your needs.
            </p>

            <div className="cta-buttons" style={{
              display: 'flex', flexDirection: 'column', gap: 14,
              alignItems: 'center', justifyContent: 'center', marginBottom: 36,
            }}>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '16px 32px', fontSize: 15, fontWeight: 600, borderRadius: 100,
                  border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                  color: '#ffffff',
                  boxShadow: '0 8px 32px rgba(6,182,212,0.35)',
                  width: '100%', maxWidth: 220, justifyContent: 'center',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(6,182,212,0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(6,182,212,0.35)';
                }}
              >
                Get in Touch <ArrowRight size={17} />
              </button>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '16px 32px', fontSize: 15, fontWeight: 600, borderRadius: 100,
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
                  cursor: 'pointer',
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                  color: colors.text,
                  width: '100%', maxWidth: 220, justifyContent: 'center',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)';
                }}
              >
                View Services
              </button>
            </div>

            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 20,
              alignItems: 'center', justifyContent: 'center',
              paddingTop: 28,
              borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            }}>
              {BENEFITS.map((b) => (
                <div key={b} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 13.5, color: colors.textMuted,
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 100,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isDark ? 'rgba(16,185,129,0.15)' : 'rgba(5,150,105,0.1)',
                    flexShrink: 0,
                  }}>
                    <Check size={12} style={{ color: isDark ? '#10b981' : '#059669' }} strokeWidth={2.5} />
                  </div>
                  {b}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .cta-buttons { flex-direction: row !important; }
        }
      `}</style>
    </section>
  );
};

export default CTA;
