import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Network, Shield, Cpu, Globe, Zap, Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const features = [
  {
    icon: Network,
    title: 'Neural Orchestration',
    description: 'Self-organizing agent swarms that adapt to workload spikes in real-time.',
    highlight: true,
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC2 Type II compliant with end-to-end encryption and audit logging.',
  },
  {
    icon: Globe,
    title: 'Global Edge Network',
    description: '200+ edge locations ensuring sub-50ms latency worldwide.',
  },
  {
    icon: Cpu,
    title: 'Hyper-Scale Compute',
    description: 'Dedicated GPU clusters optimized for transformer inference.',
    highlight: true,
  },
  {
    icon: Zap,
    title: 'Real-Time Processing',
    description: 'Stream processing with instant response times for critical operations.',
  },
  {
    icon: Lock,
    title: 'Data Privacy',
    description: 'Your data never leaves your environment. Full GDPR compliance.',
  },
];

const FeatureCard = ({ feature, index }) => {
  const { isDark } = useTheme();
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`relative p-6 md:p-8 rounded-2xl transition-all duration-300 ${
        feature.highlight 
          ? 'sm:col-span-2 lg:col-span-1'
          : ''
      }`}
      style={{
        background: feature.highlight
          ? isDark 
            ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(8, 145, 178, 0.06) 0%, rgba(124, 58, 237, 0.04) 100%)'
          : isDark 
            ? '#18181b' 
            : '#fafafa',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      }}
    >
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{ 
          background: 'var(--accent-muted)',
          color: 'var(--accent)' 
        }}
      >
        <Icon size={24} />
      </div>

      <h3 
        className="text-lg md:text-xl font-semibold mb-2"
        style={{ color: isDark ? '#fafafa' : '#09090b' }}
      >
        {feature.title}
      </h3>
      
      <p 
        className="text-sm md:text-base leading-relaxed"
        style={{ color: isDark ? '#a1a1aa' : '#52525b' }}
      >
        {feature.description}
      </p>
    </motion.div>
  );
};

const Features = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { isDark } = useTheme();

  return (
    <section 
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: isDark ? '#0c0c0f' : '#fafafa' }}
    >
      {/* Background gradient */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-30"
        style={{ background: isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(8, 145, 178, 0.15)' }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div 
          className="max-w-2xl mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="badge mb-4">Capabilities</span>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: isDark ? '#fafafa' : '#09090b' }}
          >
            Built for Scale
          </h2>
          <p 
            className="text-base md:text-lg"
            style={{ color: isDark ? '#a1a1aa' : '#52525b' }}
          >
            Enterprise-grade infrastructure designed to handle millions of requests 
            while maintaining security and reliability.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
