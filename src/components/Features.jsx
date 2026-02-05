import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Network, Shield, Cpu, Globe, Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const FeatureCard = ({ title, description, icon: Icon, children, className = "", index = 0, featured = false }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const { isDark } = useTheme();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className={`group relative rounded-3xl overflow-hidden transition-colors duration-300 ${className}`}
      style={{
        background: featured 
          ? isDark 
            ? 'linear-gradient(135deg, rgba(0,255,255,0.05) 0%, rgba(124,58,237,0.03) 100%)'
            : 'linear-gradient(135deg, rgba(8,145,178,0.08) 0%, rgba(124,58,237,0.05) 100%)'
          : isDark
            ? 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)'
            : 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 100%)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      }}
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isDark 
            ? 'radial-gradient(circle at 30% 30%, rgba(0,255,255,0.08) 0%, transparent 60%)'
            : 'radial-gradient(circle at 30% 30%, rgba(8,145,178,0.1) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
        <motion.div 
          className={`mb-5 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
            isDark 
              ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 group-hover:border-cyan-400/40 group-hover:bg-cyan-400/15' 
              : 'bg-cyan-600/10 text-cyan-600 border border-cyan-600/20 group-hover:border-cyan-600/40 group-hover:bg-cyan-600/15'
          }`}
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          <Icon size={26} strokeWidth={1.5} />
        </motion.div>

        <h3 className={`text-xl md:text-2xl font-bold mb-3 transition-colors duration-300 ${
          isDark 
            ? 'text-white group-hover:text-cyan-400' 
            : 'text-gray-900 group-hover:text-cyan-600'
        }`}>
          {title}
        </h3>
        <p className={`leading-relaxed text-sm md:text-base flex-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>

        <div className="mt-6 min-h-[80px] flex items-center justify-center">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

const NeuralAnimation = () => {
  const { isDark } = useTheme();
  const color = isDark ? '0, 255, 255' : '8, 145, 178';
  
  const nodes = [
    { x: 20, y: 30 }, { x: 50, y: 10 }, { x: 80, y: 30 },
    { x: 10, y: 60 }, { x: 40, y: 50 }, { x: 60, y: 50 }, { x: 90, y: 60 },
    { x: 30, y: 80 }, { x: 70, y: 80 },
  ];
  const connections = [[0, 3], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6], [3, 7], [4, 7], [4, 8], [5, 8], [6, 8]];

  return (
    <div className="w-full h-24 relative">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {connections.map(([from, to], i) => (
          <motion.line key={i} x1={`${nodes[from].x}%`} y1={`${nodes[from].y}%`} x2={`${nodes[to].x}%`} y2={`${nodes[to].y}%`}
            stroke={`rgba(${color}, 0.2)`} strokeWidth="0.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.1 }} />
        ))}
        {connections.slice(0, 5).map(([from, to], i) => (
          <motion.circle key={`flow-${i}`} r="1.5" fill={`rgb(${color})`}
            initial={{ cx: `${nodes[from].x}%`, cy: `${nodes[from].y}%`, opacity: 0 }}
            animate={{ cx: [`${nodes[from].x}%`, `${nodes[to].x}%`], cy: [`${nodes[from].y}%`, `${nodes[to].y}%`], opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }} />
        ))}
        {nodes.map((node, i) => (
          <motion.circle key={i} cx={`${node.x}%`} cy={`${node.y}%`} r="3" fill={`rgba(${color}, 0.3)`}
            stroke={`rgba(${color}, 0.5)`} strokeWidth="1" initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 + 0.5 }} />
        ))}
      </svg>
    </div>
  );
};

const SecurityAnimation = () => {
  const { isDark } = useTheme();
  return (
    <div className="relative flex items-center justify-center">
      <motion.div className={`absolute w-20 h-20 rounded-full border ${isDark ? 'border-cyan-400/20' : 'border-cyan-600/20'}`}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.div className={`absolute w-16 h-16 rounded-full border border-dashed ${isDark ? 'border-cyan-400/30' : 'border-cyan-600/30'}`}
        animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
      <motion.div className={`relative z-10 p-3 rounded-xl ${isDark ? 'bg-cyan-400/10 border border-cyan-400/20' : 'bg-cyan-600/10 border border-cyan-600/20'}`}
        animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
        <Lock size={24} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
      </motion.div>
    </div>
  );
};

const GlobeAnimation = () => {
  const { isDark } = useTheme();
  return (
    <div className="relative w-full h-20 flex items-center justify-center">
      <motion.div className={`absolute w-16 h-16 rounded-full border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        style={{ background: isDark ? 'radial-gradient(circle at 30% 30%, rgba(0,255,255,0.1) 0%, transparent 70%)' : 'radial-gradient(circle at 30% 30%, rgba(8,145,178,0.1) 0%, transparent 70%)' }} />
      {[...Array(5)].map((_, i) => (
        <motion.div key={i} className={`absolute w-2 h-2 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: Math.cos((i * 72 * Math.PI) / 180) * 35, y: Math.sin((i * 72 * Math.PI) / 180) * 35, opacity: [0, 1, 0] }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: "easeOut" }} />
      ))}
      <motion.div className={`text-xs font-mono ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>&lt;50ms</motion.div>
    </div>
  );
};

const ComputeAnimation = () => {
  const { isDark } = useTheme();
  return (
    <div className="flex gap-1 h-16 items-end justify-center w-full">
      {[...Array(16)].map((_, i) => (
        <motion.div key={i} className="w-full rounded-t-sm"
          style={{
            background: isDark ? 'linear-gradient(180deg, #00ffff 0%, rgba(0,255,255,0.3) 100%)' : 'linear-gradient(180deg, #0891b2 0%, rgba(8,145,178,0.3) 100%)',
            boxShadow: isDark ? '0 0 10px rgba(0,255,255,0.3)' : '0 0 10px rgba(8,145,178,0.2)',
          }}
          animate={{ height: ["15%", `${30 + Math.random() * 70}%`, "25%", `${40 + Math.random() * 50}%`, "15%"] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }} />
      ))}
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { isDark } = useTheme();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={sectionRef} className={`py-24 md:py-32 px-4 md:px-6 relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#030712]' : 'bg-gray-50'
    }`}>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: isDark ? 'radial-gradient(circle, rgba(0,255,255,0.08) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(8,145,178,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </motion.div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div className="mb-16 md:mb-20" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <motion.span className={`inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase border rounded-full ${
            isDark ? 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5' : 'text-cyan-600 border-cyan-600/20 bg-cyan-600/5'
          }`} initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.2 }}>
            Capabilities
          </motion.span>
          <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Beyond Human Capability.<br /><span className={isDark ? 'text-gray-500' : 'text-gray-400'}>Built for Scale.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <FeatureCard title="Neural Orchestration" description="Self-organizing agent swarms that adapt to workload spikes in real-time without manual intervention."
            icon={Network} className="lg:col-span-2" index={0} featured><NeuralAnimation /></FeatureCard>
          <FeatureCard title="Enterprise Security" description="SOC2 compliant infrastructure with end-to-end encryption for all neural pathways."
            icon={Shield} index={1}><SecurityAnimation /></FeatureCard>
          <FeatureCard title="Global Edge Network" description="Deployment across 200+ edge locations ensuring ultra-low latency worldwide."
            icon={Globe} index={2}><GlobeAnimation /></FeatureCard>
          <FeatureCard title="Hyper-Scale Compute" description="Dedicated GPU clusters optimized for transformer inference at enterprise scale."
            icon={Cpu} className="lg:col-span-2" index={3} featured><ComputeAnimation /></FeatureCard>
        </div>
      </div>
    </section>
  );
};

export default Features;
