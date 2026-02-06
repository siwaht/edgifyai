import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquareText, Brain, Workflow, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const STEPS = [
  { icon: MessageSquareText, label: 'Request', desc: 'You describe your needs and goals through a simple brief.', color: '#06b6d4' },
  { icon: Brain, label: 'Analysis', desc: 'Our AI agents analyze context, intent, and optimal approach.', color: '#8b5cf6' },
  { icon: Workflow, label: 'Execution', desc: 'Tasks are orchestrated across specialized agent teams.', color: '#14b8a6' },
  { icon: CheckCircle2, label: 'Delivery', desc: 'Polished results delivered with full transparency and reporting.', color: '#10b981' },
];

const StepCard = ({ step, index, isInView, isDark, colors, total }) => {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      style={{
        position: 'relative',
        padding: 28,
        borderRadius: 20,
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Step number */}
      <div style={{
        position: 'absolute', top: 16, right: 20,
        fontSize: 48, fontWeight: 800, lineHeight: 1,
        color: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
        userSelect: 'none', pointerEvents: 'none',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${step.color}1a`,
        color: step.color,
      }}>
        <Icon size={24} strokeWidth={1.8} />
      </div>

      {/* Content */}
      <div>
        <h3 className="font-display" style={{
          fontSize: 18, fontWeight: 600, color: colors.text, marginBottom: 8,
        }}>{step.label}</h3>
        <p style={{
          fontSize: 14, lineHeight: 1.7, color: colors.textSecondary, margin: 0,
        }}>{step.desc}</p>
      </div>

      {/* Connector line to next card (visible on larger screens) */}
      {index < total - 1 && (
        <div className="hidden lg:block" style={{
          display: 'none',
          position: 'absolute', top: '50%', right: -12,
          transform: 'translateY(-50%)',
        }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.12 + 0.3 }}
            style={{
              width: 24, height: 2, transformOrigin: 'left',
              background: `linear-gradient(90deg, ${step.color}60, ${STEPS[index + 1].color}60)`,
            }}
          />
        </div>
      )}
    </motion.div>
  );
};

const AgentWorkflow = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { isDark, colors } = useTheme();

  return (
    <section ref={ref} style={{
      padding: '80px 20px',
      background: colors.bgAlt,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 350, borderRadius: '50%',
        background: isDark ? 'rgba(6,182,212,0.06)' : 'rgba(8,145,178,0.04)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <motion.div
          style={{ marginBottom: 56, maxWidth: 600 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', fontSize: 12, fontWeight: 600,
            letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: 100,
            background: colors.accentMuted, color: colors.accent, marginBottom: 20,
          }}>How It Works</span>
          <h2 className="font-display" style={{
            fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700,
            color: colors.text, marginBottom: 16,
          }}>
            From Brief to Results
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)', color: colors.textSecondary, lineHeight: 1.7,
          }}>
            A streamlined process powered by intelligent agents that handle the complexity so you don't have to.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 20,
        }}>
          {STEPS.map((step, i) => (
            <StepCard
              key={step.label}
              step={step}
              index={i}
              isInView={isInView}
              isDark={isDark}
              colors={colors}
              total={STEPS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentWorkflow;
