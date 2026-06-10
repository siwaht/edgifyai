import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Network, Shield, Brain, Workflow, Database, GitBranch, Cpu, Users } from 'lucide-react';
import { useTheme } from '../context/theme';

const FEATURES = [
  { icon: Brain, title: 'Long & Short-Term Memory', description: 'Persistent memory systems that let agents recall past interactions and maintain context across sessions.', accent: '#8b5cf6' },
  { icon: Database, title: 'RAG Pipelines', description: 'Retrieval-augmented generation with vector search, chunking strategies, and real-time knowledge grounding.', accent: '#0ea5e9' },
  { icon: Workflow, title: 'Tool Use via MCP', description: 'Agents that browse the web, execute code, query databases, and use any API via Model Context Protocol.', accent: '#14b8a6' },
  { icon: GitBranch, title: 'Agent-to-Agent (A2A)', description: 'Seamless inter-agent communication enabling delegation, collaboration, and multi-agent workflows.', accent: '#f59e0b' },
  { icon: Network, title: 'Multi-Agent Orchestration', description: 'Coordinate swarms of specialized agents that plan, delegate, and self-organize around complex tasks.', accent: '#06b6d4' },
  { icon: Cpu, title: 'Composable Skills', description: 'Modular skill libraries — from web browsing to code execution — that agents can learn, share, and compose.', accent: '#ec4899' },
  { icon: Users, title: 'Human in the Loop', description: 'Configurable approval workflows, escalation paths, and oversight for safety-critical agent operations.', accent: '#a855f7' },
  { icon: Shield, title: 'Safety & Guardrails', description: 'Built-in content filtering, rate limiting, and configurable boundaries to keep agents aligned and safe.', accent: '#10b981' },
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
        padding: '28px 26px',
        borderRadius: 20,
        background: isDark ? 'rgba(20,20,30,0.5)' : '#ffffff',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}`,
        backdropFilter: 'blur(12px)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{
        y: -4,
        boxShadow: isDark
          ? `0 16px 48px rgba(0,0,0,0.35), 0 0 0 1px ${feature.accent}18`
          : `0 16px 40px rgba(0,0,0,0.08), 0 0 0 1px ${feature.accent}18`,
        borderColor: isDark ? `${feature.accent}25` : `${feature.accent}18`,
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
      <p style={{ fontSize: 14, lineHeight: 1.7, color: colors.textSecondary }}>
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
            padding: '7px 16px', borderRadius: 100, marginBottom: 20,
            background: isDark ? 'rgba(6,182,212,0.08)' : 'rgba(6,182,212,0.07)',
            border: `1px solid ${isDark ? 'rgba(6,182,212,0.16)' : 'rgba(6,182,212,0.2)'}`,
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: isDark ? '#22d3ee' : '#0891b2' }}>
              Under the Hood
            </span>
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: colors.text,
            marginBottom: 18, letterSpacing: '-0.03em', lineHeight: 1.1,
          }}>
            What Powers Our Agents
          </h2>
          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: colors.textSecondary, lineHeight: 1.7 }}>
            The technical building blocks behind every agent we deploy — memory, reasoning, tool access, and multi-agent coordination.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
