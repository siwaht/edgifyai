import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Network, Shield, Cpu, Globe, Lock } from 'lucide-react';

const FeatureCard = ({ title, description, icon: Icon, children, className = "", index = 0, featured = false }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] 
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3 }
      }}
      className={`group relative rounded-3xl overflow-hidden ${className}`}
      style={{
        background: featured 
          ? 'linear-gradient(135deg, rgba(0,255,255,0.05) 0%, rgba(124,58,237,0.03) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <motion.div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(135deg, rgba(0,255,255,0.15) 0%, rgba(124,58,237,0.1) 50%, transparent 100%)',
          padding: '1px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
        }}
      />

      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(0,255,255,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
        <motion.div 
          className="mb-5 w-14 h-14 rounded-2xl bg-electric-cyan/10 flex items-center justify-center text-electric-cyan border border-electric-cyan/20 group-hover:border-electric-cyan/40 group-hover:bg-electric-cyan/15 transition-all duration-500"
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          <Icon size={26} strokeWidth={1.5} />
        </motion.div>

        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-electric-cyan transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed text-sm md:text-base flex-1">
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
  const nodes = [
    { x: 20, y: 30 }, { x: 50, y: 10 }, { x: 80, y: 30 },
    { x: 10, y: 60 }, { x: 40, y: 50 }, { x: 60, y: 50 }, { x: 90, y: 60 },
    { x: 30, y: 80 }, { x: 70, y: 80 },
  ];

  const connections = [
    [0, 3], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6],
    [3, 7], [4, 7], [4, 8], [5, 8], [6, 8],
  ];

  return (
    <div className="w-full h-24 relative">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {connections.map(([from, to], i) => (
          <motion.line
            key={i}
            x1={`${nodes[from].x}%`}
            y1={`${nodes[from].y}%`}
            x2={`${nodes[to].x}%`}
            y2={`${nodes[to].y}%`}
            stroke="rgba(0, 255, 255, 0.2)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
          />
        ))}
        
        {connections.slice(0, 5).map(([from, to], i) => (
          <motion.circle
            key={`flow-${i}`}
            r="1.5"
            fill="#00ffff"
            initial={{ cx: `${nodes[from].x}%`, cy: `${nodes[from].y}%`, opacity: 0 }}
            animate={{ 
              cx: [`${nodes[from].x}%`, `${nodes[to].x}%`],
              cy: [`${nodes[from].y}%`, `${nodes[to].y}%`],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="3"
            fill="rgba(0, 255, 255, 0.3)"
            stroke="rgba(0, 255, 255, 0.5)"
            strokeWidth="1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 + 0.5 }}
          />
        ))}
      </svg>
    </div>
  );
};

const SecurityAnimation = () => (
  <div className="relative flex items-center justify-center">
    <motion.div
      className="absolute w-20 h-20 rounded-full border border-electric-cyan/20"
      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.div
      className="absolute w-16 h-16 rounded-full border border-dashed border-electric-cyan/30"
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="relative z-10 p-3 rounded-xl bg-electric-cyan/10 border border-electric-cyan/20"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Lock size={24} className="text-electric-cyan" />
    </motion.div>
  </div>
);

const GlobeAnimation = () => (
  <div className="relative w-full h-20 flex items-center justify-center">
    <motion.div
      className="absolute w-16 h-16 rounded-full border border-white/10"
      style={{ background: 'radial-gradient(circle at 30% 30%, rgba(0,255,255,0.1) 0%, transparent 70%)' }}
    />
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-electric-cyan rounded-full"
        initial={{ x: 0, y: 0, opacity: 0 }}
        animate={{ 
          x: Math.cos((i * 72 * Math.PI) / 180) * 35,
          y: Math.sin((i * 72 * Math.PI) / 180) * 35,
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: "easeOut" }}
      />
    ))}
    <motion.div
      className="text-xs font-mono text-electric-cyan"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      &lt;50ms
    </motion.div>
  </div>
);

const ComputeAnimation = () => (
  <div className="flex gap-1 h-16 items-end justify-center w-full">
    {[...Array(16)].map((_, i) => (
      <motion.div
        key={i}
        className="w-full rounded-t-sm"
        style={{
          background: 'linear-gradient(180deg, #00ffff 0%, rgba(0,255,255,0.3) 100%)',
          boxShadow: '0 0 10px rgba(0,255,255,0.3)',
        }}
        animate={{ height: ["15%", `${30 + Math.random() * 70}%`, "25%", `${40 + Math.random() * 50}%`, "15%"] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
      />
    ))}
  </div>
);

const Features = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-4 md:px-6 bg-obsidian relative overflow-hidden">
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(0,255,255,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </motion.div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <motion.span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-electric-cyan uppercase border border-electric-cyan/20 rounded-full bg-electric-cyan/5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}>
            Capabilities
          </motion.span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
            Beyond Human Capability.<br /><span className="text-gray-500">Built for Scale.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <FeatureCard title="Neural Orchestration" description="Self-organizing agent swarms that adapt to workload spikes in real-time without manual intervention."
            icon={Network} className="lg:col-span-2" index={0} featured>
            <NeuralAnimation />
          </FeatureCard>

          <FeatureCard title="Enterprise Security" description="SOC2 compliant infrastructure with end-to-end encryption for all neural pathways."
            icon={Shield} index={1}>
            <SecurityAnimation />
          </FeatureCard>

          <FeatureCard title="Global Edge Network" description="Deployment across 200+ edge locations ensuring ultra-low latency worldwide."
            icon={Globe} index={2}>
            <GlobeAnimation />
          </FeatureCard>

          <FeatureCard title="Hyper-Scale Compute" description="Dedicated GPU clusters optimized for transformer inference at enterprise scale."
            icon={Cpu} className="lg:col-span-2" index={3} featured>
            <ComputeAnimation />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};

export default Features;
