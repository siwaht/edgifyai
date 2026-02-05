import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Network, Shield, Cpu, Globe, Zap, Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const features = [
  { icon: Network, title: 'Neural Orchestration', description: 'Self-organizing agent swarms that adapt to workload spikes in real-time.' },
  { icon: Shield, title: 'Enterprise Security', description: 'SOC2 Type II compliant with end-to-end encryption and audit logging.' },
  { icon: Globe, title: 'Global Edge Network', description: '200+ edge locations ensuring sub-50ms latency worldwide.' },
  { icon: Cpu, title: 'Hyper-Scale Compute', description: 'Dedicated GPU clusters optimized for transformer inference.' },
  { icon: Zap, title: 'Real-Time Processing', description: 'Stream processing with instant response times for critical operations.' },
  { icon: Lock, title: 'Data Privacy', description: 'Your data never leaves your environment. Full GDPR compliance.' },
];

const FeatureCard = ({ feature, index, isDark }) => {
  const Icon = feature.icon;

  const cardStyle = {
    padding: 28,
    borderRadius: 20,
    background: isDark ? '#18181b' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
    transition: 'all 0.3s ease',
  };

  const iconStyle = {
    width: 52,
    height: 52,
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: isDark ? 'rgba(6, 182, 212, 0.15)' : 'rgba(8, 145, 178, 0.1)',
    color: isDark ? '#06b6d4' : '#0891b2',
    marginBottom: 20,
  };

  const titleStyle = {
    fontSize: 18,
    fontWeight: 600,
    color: isDark ? '#fafafa' : '#09090b',
    marginBottom: 10,
  };

  const descStyle = {
    fontSize: 14,
    lineHeight: 1.7,
    color: isDark ? '#a1a1aa' : '#52525b',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, boxShadow: isDark ? '0 16px 32px rgba(0,0,0,0.2)' : '0 16px 32px rgba(0,0,0,0.08)' }}
      style={cardStyle}
    >
      <div style={iconStyle}>
        <Icon size={24} />
      </div>
      <h3 style={titleStyle}>{feature.title}</h3>
      <p style={descStyle}>{feature.description}</p>
    </motion.div>
  );
};

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isDark } = useTheme();

  const sectionStyle = {
    padding: '80px 20px',
    background: isDark ? '#09090b' : '#fafafa',
    position: 'relative',
    overflow: 'hidden',
  };

  const containerStyle = {
    maxWidth: 1200,
    margin: '0 auto',
    position: 'relative',
    zIndex: 10,
  };

  const headerStyle = {
    marginBottom: 56,
    maxWidth: 600,
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    borderRadius: 100,
    background: isDark ? 'rgba(6, 182, 212, 0.15)' : 'rgba(8, 145, 178, 0.1)',
    color: isDark ? '#06b6d4' : '#0891b2',
    marginBottom: 20,
  };

  const titleStyle = {
    fontSize: 'clamp(28px, 5vw, 44px)',
    fontWeight: 700,
    color: isDark ? '#fafafa' : '#09090b',
    marginBottom: 16,
  };

  const subtitleStyle = {
    fontSize: 'clamp(15px, 2vw, 18px)',
    color: isDark ? '#a1a1aa' : '#52525b',
    lineHeight: 1.7,
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 20,
  };

  return (
    <section ref={ref} style={sectionStyle}>
      {/* Background gradient */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: 400,
        borderRadius: '50%',
        background: isDark ? 'rgba(6, 182, 212, 0.08)' : 'rgba(8, 145, 178, 0.06)',
        filter: 'blur(100px)',
        pointerEvents: 'none',
      }} />

      <div style={containerStyle}>
        <motion.div
          style={headerStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span style={badgeStyle}>Capabilities</span>
          <h2 style={titleStyle}>Built for Scale</h2>
          <p style={subtitleStyle}>
            Enterprise-grade infrastructure designed to handle millions of requests 
            while maintaining security and reliability.
          </p>
        </motion.div>

        <div style={gridStyle}>
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
