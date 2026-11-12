import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/theme';
import NeuralNetworkViz from './NeuralNetworkViz';
import { STEPS } from '../content/site';

const AgentWorkflow = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const { isDark, colors } = useTheme();

  return (
    <section id="how-it-works" ref={ref} style={{ background: colors.bg, padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: isDark
          ? 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(34,211,238,0.04) 0%, transparent 70%)'
          : 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(8,145,178,0.04) 0%, transparent 70%)',
      }} />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span style={{
            display: 'inline-block',
            color: colors.accent,
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            How We Work
          </span>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: colors.text, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '16px' }}
          >
            From First Call to Live Agent
          </h2>
          <p style={{ color: colors.textSecondary, fontSize: '1rem', maxWidth: '54ch', margin: '0 auto', lineHeight: 1.7 }}>
            A four-stage engagement that gets you to a working agent quickly, then keeps improving it on real conversation data.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex', gap: '20px',
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '16px',
                  padding: '24px',
                  backdropFilter: 'blur(8px)',
                  transition: 'border-color 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = step.color + '40'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = colors.border; }}
              >
                <div style={{
                  flexShrink: 0,
                  width: 44, height: 44,
                  borderRadius: '12px',
                  background: step.color + '18',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', fontWeight: 800,
                  color: step.color,
                  fontFamily: 'Outfit, sans-serif',
                }}>
                  {step.number}
                </div>
                <div>
                  <h3 style={{ color: colors.text, fontWeight: 600, fontSize: '1rem', marginBottom: '6px' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: colors.textSecondary, fontSize: '0.875rem', lineHeight: 1.65 }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: '24px',
              padding: '32px',
              backdropFilter: 'blur(12px)',
            }}
          >
            <NeuralNetworkViz />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AgentWorkflow;
