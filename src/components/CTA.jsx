import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const BENEFITS = ['Free architecture review', 'Custom agent design', 'Ongoing support & iteration'];

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isDark, colors } = useTheme();

  return (
    <section ref={ref} style={{ padding: '80px 20px', background: colors.bgAlt }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            position: 'relative', padding: 'clamp(40px, 8vw, 80px)',
            borderRadius: 28, textAlign: 'center', overflow: 'hidden',
            background: isDark ? 'rgba(28, 28, 36, 0.65)' : colors.bgCard,
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : colors.border}`,
            backdropFilter: 'blur(12px)',
            boxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.3)' : 'none',
          }}
        >
          {/* Background glows */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            background: isDark
              ? 'radial-gradient(circle at 50% -20%, rgba(6,182,212,0.15), transparent 70%), radial-gradient(circle at 50% 120%, rgba(20,184,166,0.12), transparent 70%)'
              : 'radial-gradient(circle at 50% -20%, rgba(8,145,178,0.1), transparent 70%), radial-gradient(circle at 50% 120%, rgba(20,184,166,0.08), transparent 70%)',
          }} />
          <div
            className="absolute top-[-50%] left-[-20%] w-[600px] h-[600px] rounded-full animate-float"
            style={{ background: isDark ? 'rgba(6,182,212,0.1)' : 'rgba(6,182,212,0.06)', filter: 'blur(100px)' }}
          />
          <div
            className="absolute bottom-[-50%] right-[-20%] w-[600px] h-[600px] rounded-full animate-float"
            style={{ background: isDark ? 'rgba(20,184,166,0.1)' : 'rgba(20,184,166,0.06)', filter: 'blur(100px)', animationDelay: '-2s' }}
          />

          <div style={{ position: 'relative', zIndex: 10 }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, color: colors.text, marginBottom: 16 }}>
              Let's Design Your AI Solution
            </h2>
            <p style={{
              fontSize: 'clamp(15px, 2vw, 18px)', color: colors.textSecondary,
              maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.7,
            }}>
              Whether you need a simple chatbot or a fleet of autonomous agents — we'll architect the right system for your needs.
            </p>

            <div className="flex-col sm:flex-row" style={{
              display: 'flex', flexDirection: 'column', gap: 16,
              alignItems: 'center', justifyContent: 'center', marginBottom: 32,
            }}>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 32px', fontSize: 16, fontWeight: 600, borderRadius: 100,
                border: 'none', cursor: 'pointer',
                background: isDark ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : colors.text,
                color: isDark ? '#ffffff' : colors.bg,
                boxShadow: isDark ? '0 8px 30px rgba(6,182,212,0.25)' : '0 8px 20px rgba(0,0,0,0.12)',
                width: '100%', maxWidth: 220, justifyContent: 'center',
              }}>
                Get in Touch <ArrowRight size={18} />
              </button>
              <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 32px', fontSize: 16, fontWeight: 600, borderRadius: 100,
                border: `1px solid ${colors.borderHover}`, cursor: 'pointer',
                background: 'transparent', color: colors.text,
                width: '100%', maxWidth: 220, justifyContent: 'center',
              }}>View Services</button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'center' }}>
              {BENEFITS.map((b) => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: colors.textMuted }}>
                  <Check size={16} style={{ color: colors.accent }} />
                  {b}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
