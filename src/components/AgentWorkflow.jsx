import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquareText, Brain, Workflow, CheckCircle2, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const STEPS = [
  { icon: MessageSquareText, label: 'Input', desc: 'Your request enters the system', color: '#06b6d4' },
  { icon: Brain, label: 'AI Analysis', desc: 'Agent interprets intent & context', color: '#8b5cf6' },
  { icon: Workflow, label: 'Orchestration', desc: 'Tasks are planned & delegated', color: '#f59e0b' },
  { icon: CheckCircle2, label: 'Delivery', desc: 'Results returned in real-time', color: '#10b981' },
];

const Pulse = ({ color, delay }) => (
  <motion.div
    style={{
      position: 'absolute', inset: -4, borderRadius: '50%',
      border: `2px solid ${color}`,
    }}
    animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
    transition={{ duration: 2, repeat: Infinity, delay, ease: 'easeOut' }}
  />
);

const ConnectorArrow = ({ isDark, progress }) => (
  <div className="hidden md:flex" style={{
    display: 'none', alignItems: 'center', justifyContent: 'center',
    flex: '0 0 40px', position: 'relative',
  }}>
    <svg width="40" height="2" style={{ overflow: 'visible' }}>
      <motion.line
        x1="0" y1="1" x2="40" y2="1"
        stroke={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}
        strokeWidth="2"
      />
      <motion.line
        x1="0" y1="1" x2="40" y2="1"
        stroke="#06b6d4"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={progress ? { pathLength: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
    </svg>
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={progress ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.8 }}
    >
      <ArrowRight size={14} style={{
        position: 'absolute', right: -2, top: '50%', transform: 'translateY(-50%)',
        color: '#06b6d4',
      }} />
    </motion.div>
  </div>
);

const DataParticle = ({ isDark }) => {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 3 + Math.random() * 3,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 3,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size, borderRadius: '50%',
            background: isDark ? 'rgba(6,182,212,0.3)' : 'rgba(8,145,178,0.2)',
          }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

const AgentWorkflow = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { isDark, colors } = useTheme();

  return (
    <section ref={ref} style={{
      padding: '80px 20px', background: colors.bg,
      position: 'relative', overflow: 'hidden',
    }}>
      <DataParticle isDark={isDark} />

      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 350, borderRadius: '50%',
        background: isDark ? 'rgba(139,92,246,0.06)' : 'rgba(124,58,237,0.04)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: 56 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', fontSize: 12, fontWeight: 600,
            letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: 100,
            background: colors.purpleMuted, color: colors.purple, marginBottom: 20,
          }}>How It Works</span>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700,
            color: colors.text, marginBottom: 16,
          }}>
            Your AI Agent in Action
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)', color: colors.textSecondary,
            maxWidth: 520, margin: '0 auto', lineHeight: 1.7,
          }}>
            From request to result — see how our agents process, reason, and deliver.
          </p>
        </motion.div>

        {/* Steps row */}
        <div className="flex-col md:flex-row" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0,
        }}>
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} style={{ display: 'contents' }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    textAlign: 'center', flex: '1 1 0', minWidth: 0, maxWidth: 200,
                  }}
                >
                  {/* Icon circle */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    style={{
                      position: 'relative', width: 72, height: 72, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                      border: `2px solid ${step.color}40`,
                      marginBottom: 16,
                    }}
                  >
                    <Pulse color={step.color} delay={i * 0.5} />
                    <Icon size={28} style={{ color: step.color }} />
                  </motion.div>

                  <div style={{
                    fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 6,
                  }}>{step.label}</div>
                  <div style={{
                    fontSize: 13, color: colors.textSecondary, lineHeight: 1.5,
                    padding: '0 8px',
                  }}>{step.desc}</div>
                </motion.div>

                {i < STEPS.length - 1 && (
                  <ConnectorArrow isDark={isDark} progress={isInView} />
                )}
              </div>
            );
          })}
        </div>

        {/* Animated agent "brain" visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            marginTop: 56, padding: 32, borderRadius: 20,
            background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
            border: `1px solid ${colors.border}`,
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Scanning line */}
          <motion.div
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
            }}
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 12,
            alignItems: 'center', justifyContent: 'center',
          }}>
            {['Parsing request...', 'Identifying context', 'Selecting tools', 'Generating response', 'Quality check'].map((text, i) => (
              <motion.span
                key={text}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: [0.3, 1, 0.3] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                style={{
                  padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                  fontFamily: 'monospace',
                  background: isDark ? 'rgba(6,182,212,0.08)' : 'rgba(8,145,178,0.06)',
                  color: colors.accent,
                  border: `1px solid ${isDark ? 'rgba(6,182,212,0.15)' : 'rgba(8,145,178,0.12)'}`,
                }}
              >{text}</motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AgentWorkflow;
