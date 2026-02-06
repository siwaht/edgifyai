import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mic, MessageSquare, Bot, Brain, Database, Plug, Users, Cpu, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SERVICES = [
  { icon: Mic, title: 'Voice Agents', description: 'Natural voice interactions with real-time speech recognition, synthesis, and conversational flow.', color: '#06b6d4' },
  { icon: MessageSquare, title: 'Chat Agents', description: 'Omnichannel messaging agents with context-aware responses across web, mobile, and platforms.', color: '#14b8a6' },
  { icon: Bot, title: 'Ambient Agents', description: 'Background agents that monitor, observe, and act proactively without explicit user prompts.', color: '#8b5cf6' },
  { icon: Brain, title: 'Deep Agents', description: 'Complex reasoning agents for multi-step planning, research, and autonomous decision-making.', color: '#f59e0b' },
  { icon: Database, title: 'RAG & Memory', description: 'Retrieval-augmented generation with long-term and short-term agent memory for persistent context.', color: '#ec4899' },
  { icon: Plug, title: 'MCP & A2A', description: 'Model Context Protocol and Agent-to-Agent communication for tool use and multi-agent orchestration.', color: '#10b981' },
  { icon: Cpu, title: 'Agent Skills', description: 'Modular skill libraries — from web browsing to code execution — that agents can learn and compose.', color: '#0ea5e9' },
  { icon: Users, title: 'Human in the Loop', description: 'Configurable approval workflows, escalation paths, and oversight for safety-critical operations.', color: '#a855f7' },
];

const ServiceCard = ({ service, index }) => {
  const { isDark, colors } = useTheme();
  const Icon = service.icon;
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group"
      style={{
        position: 'relative', padding: 32, borderRadius: 24, overflow: 'hidden',
        background: isDark ? 'rgba(28, 28, 36, 0.55)' : '#ffffff',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : colors.border}`,
        backdropFilter: 'blur(12px)',
        height: '100%', display: 'flex', flexDirection: 'column',
        transition: 'transform 0.3s ease',
      }}
    >
      {/* Spotlight effect */}
      <div style={{
        position: 'absolute', inset: 0, opacity: spotlight.opacity,
        background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}, transparent 40%)`,
        transition: 'opacity 0.2s', pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Border glow */}
      <div style={{
        position: 'absolute', inset: -1, opacity: spotlight.opacity,
        background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, ${service.color}40, transparent 40%)`,
        transition: 'opacity 0.2s', borderRadius: 'inherit', zIndex: 0, pointerEvents: 'none',
      }} />

      <div style={{
        width: 64, height: 64, borderRadius: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)',
        color: service.color, marginBottom: 24,
        border: `1px solid ${colors.border}`,
        boxShadow: `0 0 20px -5px ${service.color}40`,
        position: 'relative', zIndex: 1,
      }}>
        <Icon size={28} />
      </div>

      <div style={{
        fontSize: 20, fontWeight: 700, color: colors.text, marginBottom: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'relative', zIndex: 1,
      }}>
        {service.title}
        <ArrowUpRight size={20} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-cyan-400" />
      </div>

      <p style={{ fontSize: 15, lineHeight: 1.6, color: colors.textSecondary, flex: 1, position: 'relative', zIndex: 1 }}>
        {service.description}
      </p>
    </motion.div>
  );
};

const ServiceMatrix = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isDark, colors } = useTheme();

  return (
    <section ref={ref} style={{ padding: '80px 20px', background: colors.bgAlt }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
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
            background: colors.accentMuted, color: colors.accent, marginBottom: 20,
          }}>Our Services</span>
          <h2 className="font-display" style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, color: colors.text, marginBottom: 16 }}>
            AI Agents for Every Need
          </h2>
          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: colors.textSecondary, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            From simple conversational bots to enterprise-grade autonomous systems — we build agents that think, remember, and act.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            style={{
              padding: 28, borderRadius: 24, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', textAlign: 'center',
              background: isDark
                ? 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(20,184,166,0.1))'
                : 'linear-gradient(135deg, rgba(8,145,178,0.08), rgba(20,184,166,0.08))',
              border: `1px solid ${isDark ? 'rgba(6,182,212,0.2)' : 'rgba(8,145,178,0.2)'}`,
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.text, marginBottom: 8 }}>
              Need something custom?
            </h3>
            <p style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 20 }}>
              Let's build your perfect solution.
            </p>
            <button style={{
              padding: '12px 24px', fontSize: 14, fontWeight: 600, borderRadius: 10,
              border: `1px solid ${colors.borderHover}`, background: 'transparent',
              color: colors.text, cursor: 'pointer',
            }}>Get in Touch</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceMatrix;
