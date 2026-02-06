import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Network, Shield, Cpu, Globe, Zap, Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const FEATURES = [
  { icon: Network, title: 'Neural Orchestration', description: 'Self-organizing agent swarms that adapt to workload spikes in real-time.', accent: '#06b6d4' },
  { icon: Shield, title: 'Enterprise Security', description: 'SOC2 Type II compliant with end-to-end encryption and audit logging.', accent: '#10b981' },
  { icon: Globe, title: 'Global Edge Network', description: '200+ edge locations ensuring sub-50ms latency worldwide.', accent: '#14b8a6' },
  { icon: Cpu, title: 'Hyper-Scale Compute', description: 'Dedicated GPU clusters optimized for transformer inference.', accent: '#0891b2' },
  { icon: Zap, title: 'Real-Time Processing', description: 'Stream processing with instant response times for critical operations.', accent: '#f59e0b' },
  { icon: Lock, title: 'Data Privacy', description: 'Your data never leaves your environment. Full GDPR compliance.', accent: '#059669' },
];

const FeatureCard = ({ feature, index }) => {
  const { colors } = useTheme();
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, boxShadow: 'var(--card-hover-shadow)' }}
      style={{
        padding: 28, borderRadius: 20,
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        backdropFilter: 'blur(12px)',
        transition: 'all 0.3s ease',
        '--card-hover-shadow': colors.bg === '#0a0a0f'
          ? '0 16px 40px rgba(0,0,0,0.35)'
          : '0 16px 32px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${feature.accent}1a`, color: feature.accent, marginBottom: 20,
      }}>
        <Icon size={24} strokeWidth={1.8} />
      </div>
      <h3 className="font-display" style={{ fontSize: 18, fontWeight: 600, color: colors.text, marginBottom: 10 }}>
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
    <section ref={ref} style={{
      padding: '80px 20px', background: colors.bg,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800, height: 400, borderRadius: '50%',
        background: isDark ? 'rgba(6,182,212,0.08)' : 'rgba(8,145,178,0.06)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
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
          }}>Capabilities</span>
          <h2 className="font-display" style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, color: colors.text, marginBottom: 16 }}>
            Built for Scale
          </h2>
          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: colors.textSecondary, lineHeight: 1.7 }}>
            Enterprise-grade infrastructure designed to handle millions of requests
            while maintaining security and reliability.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
