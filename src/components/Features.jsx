import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Network, ShieldCheck, Brain, Plug, GitBranch, Gauge, Users, Activity } from 'lucide-react';
import { useTheme } from '../context/theme';

const FEATURES = [
  { icon: Brain, title: 'Persistent Memory', description: 'Agents remember customers, preferences, and past conversations across every channel and session.', accent: '#0ea5e9' },
  { icon: Plug, title: 'MCP Tool Access', description: 'Connect agents to CRMs, calendars, databases, and any API through the Model Context Protocol standard.', accent: '#14b8a6' },
  { icon: GitBranch, title: 'Agent-to-Agent (A2A)', description: 'Agents discover and delegate to each other using the open A2A protocol, even across vendors.', accent: '#f59e0b' },
  { icon: Network, title: 'Multi-Agent Orchestration', description: 'Supervisor and specialist agents plan, split, and verify complex work so nothing falls through the cracks.', accent: '#06b6d4' },
  { icon: Gauge, title: 'Low-Latency Voice Stack', description: 'Streaming speech recognition, reasoning, and synthesis tuned for natural, human-speed conversation.', accent: '#f43f5e' },
  { icon: Activity, title: 'Evals & Observability', description: 'Every call and chat is traced, scored, and replayable, so quality improves with each release.', accent: '#10b981' },
  { icon: Users, title: 'Human in the Loop', description: 'Approval steps, live takeover, and smart escalation keep people in control of high-stakes actions.', accent: '#0891b2' },
  { icon: ShieldCheck, title: 'Guardrails & Compliance', description: 'PII redaction, prompt-injection defense, and audit trails built for SOC 2, HIPAA, and GDPR teams.', accent: '#059669' },
];

const FeatureCard = ({ feature, index }) => {
  const { isDark, colors } = useTheme();
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      style={{
        padding: '28px 24px',
        borderRadius: 20,
        background: isDark ? 'rgba(20,20,28,0.55)' : '#ffffff',
        border: `1px solid ${colors.border}`,
        boxShadow: isDark ? 'none' : '0 1px 3px rgba(15,23,42,0.05)',
        transition: 'border-color 0.3s ease',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
      }}
      whileHover={{
        y: -4,
        borderColor: `${feature.accent}40`,
        boxShadow: isDark
          ? `0 16px 48px rgba(0,0,0,0.35)`
          : `0 16px 40px rgba(15,23,42,0.08)`,
      }}
    >
      {/* Subtle corner glow */}
      <div style={{
        position: 'absolute', top: -30, right: -30, width: 100, height: 100,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${feature.accent}14 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        width: 50, height: 50, borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${feature.accent}12`,
        color: feature.accent, marginBottom: 18,
        border: `1px solid ${feature.accent}20`,
      }}>
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <h3 className="font-display" style={{
        fontSize: 17, fontWeight: 700, color: colors.text, marginBottom: 10,
        letterSpacing: '-0.02em', lineHeight: 1.25,
      }}>
        {feature.title}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: colors.textSecondary }}>
        {feature.description}
      </p>
    </motion.div>
  );
};

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isDark, colors } = useTheme();

  return (
    <section ref={ref} id="capabilities" style={{
      padding: 'clamp(72px,10vw,120px) 20px',
      background: colors.bg,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900, height: 500, borderRadius: '50%',
        background: isDark ? 'rgba(6,182,212,0.05)' : 'rgba(8,145,178,0.04)',
        filter: 'blur(120px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.div
          style={{ marginBottom: 60, maxWidth: 580 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 16px', borderRadius: 100, marginBottom: 24,
            background: colors.accentMuted,
            border: `1px solid ${isDark ? 'rgba(34,211,238,0.18)' : 'rgba(8,145,178,0.2)'}`,
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: colors.accent }}>
              The Agent Stack
            </span>
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: colors.text,
            marginBottom: 16, letterSpacing: '-0.035em', lineHeight: 1.1,
          }}>
            Built on the Standards Shaping 2026
          </h2>
          <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: colors.textSecondary, lineHeight: 1.6 }}>
            Memory, open protocols, real-time voice, and enterprise-grade safety. These are the building blocks inside every agent we ship.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
