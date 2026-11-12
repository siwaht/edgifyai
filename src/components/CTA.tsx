import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../context/theme';

const CTA = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const { isDark, colors } = useTheme();

  return (
    <section ref={ref} style={{ background: colors.bgAlt, padding: '96px 24px' }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(59,130,246,0.06) 50%, rgba(16,185,129,0.04) 100%)'
              : 'linear-gradient(135deg, rgba(8,145,178,0.07) 0%, rgba(59,130,246,0.05) 50%, rgba(16,185,129,0.04) 100%)',
            border: `1px solid ${isDark ? 'rgba(34,211,238,0.15)' : 'rgba(8,145,178,0.15)'}`,
            borderRadius: '28px',
            padding: '56px 48px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: -60, left: -60, width: 220, height: 220,
            borderRadius: '50%',
            background: isDark ? 'rgba(34,211,238,0.06)' : 'rgba(8,145,178,0.06)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: -60, right: -60, width: 220, height: 220,
            borderRadius: '50%',
            background: isDark ? 'rgba(59,130,246,0.07)' : 'rgba(59,130,246,0.05)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: colors.accentMuted,
              border: `1px solid ${isDark ? 'rgba(34,211,238,0.2)' : 'rgba(8,145,178,0.2)'}`,
              borderRadius: '100px',
              padding: '6px 16px',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: colors.accent,
              marginBottom: '24px',
            }}>
              <Sparkles size={12} /> Free agent audit
            </div>

            <h2
              className="font-display"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800, color: colors.text, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '16px' }}
            >
              Find Out What an Agent Could Take Off Your Plate
            </h2>
            <p style={{ color: colors.textSecondary, fontSize: '1rem', lineHeight: 1.7, maxWidth: '50ch', margin: '0 auto 36px' }}>
              Send us one workflow — the call queue, the inbox, the paperwork — and we will come back with an agent design, a realistic rollout plan and the numbers behind it.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
                  color: '#0a0a0f',
                  padding: '14px 32px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  transition: 'transform 0.2s ease, opacity 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}
              >
                Request an Agent Audit <ArrowRight size={16} />
              </a>
              <a
                href="#services"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                  padding: '14px 32px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  backdropFilter: 'blur(8px)',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = colors.borderHover; el.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = colors.border; el.style.transform = 'translateY(0)'; }}
              >
                Browse Agent Types
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
