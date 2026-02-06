import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const BENEFITS = ['No credit card required', '14-day free trial', 'Cancel anytime'];

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
            background: colors.bgCard,
            border: `1px solid ${colors.border}`,
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
              Ready to Get Started?
            </h2>
            <p style={{
              fontSize: 'clamp(15px, 2vw, 18px)', color: colors.textSecondary,
              maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.7,
            }}>
              Join thousands of companies using Agenticos to automate their operations
              and scale their business.
            </p>

            <div className="flex-col sm:flex-row" style={{
              display: 'flex', flexDirection: 'column', gap: 16,
              alignItems: 'center', justifyContent: 'center', marginBottom: 32,
            }}>
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 32px', fontSize: 16, fontWeight: 600, borderRadius: 100,
                border: 'none', cursor: 'pointer',
                background: colors.text, color: colors.bg,
                width: '100%', maxWidth: 220, justifyContent: 'center',
              }}>
                Start Free Trial <ArrowRight size={18} />
              </button>
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 32px', fontSize: 16, fontWeight: 600, borderRadius: 100,
                border: `1px solid ${colors.borderHover}`, cursor: 'pointer',
                background: 'transparent', color: colors.text,
                width: '100%', maxWidth: 220, justifyContent: 'center',
              }}>Talk to Sales</button>
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
