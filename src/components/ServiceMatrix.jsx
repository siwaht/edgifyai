import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mic, MessageSquare, User, Video, Film, Activity, Globe, Zap, ArrowUpRight } from 'lucide-react';

const ServiceCard = ({ title, subtitle, icon: Icon, children, className = "", index = 0 }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] 
      }}
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
      }}
      className={`group relative p-6 md:p-8 rounded-2xl overflow-hidden cursor-pointer ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Hover gradient overlay */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(0,255,255,0.05) 0%, transparent 50%)',
        }}
      />

      {/* Animated border on hover */}
      <motion.div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(0,255,255,0.2) 0%, transparent 50%)',
          padding: '1px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Background icon */}
      <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <Icon size={80} strokeWidth={1} />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Icon */}
        <motion.div 
          className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10 w-fit group-hover:border-electric-cyan/30 group-hover:bg-electric-cyan/5 transition-all duration-500"
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          <Icon className="text-electric-cyan" size={24} />
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-electric-cyan transition-colors duration-300">
              {title}
            </h3>
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight size={18} className="text-electric-cyan" />
            </motion.div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">{subtitle}</p>
        </div>

        {/* Visual element */}
        <div className="mt-6 pt-4 border-t border-white/5">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced waveform animation
const Waveform = () => (
  <div className="flex items-center gap-1 h-10">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="w-1 bg-gradient-to-t from-electric-cyan/50 to-electric-cyan rounded-full"
        animate={{ 
          height: ["20%", "100%", "40%", "80%", "20%"],
          opacity: [0.5, 1, 0.7, 0.9, 0.5]
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.08
        }}
        style={{ height: "40%" }}
      />
    ))}
  </div>
);

// Enhanced chat nodes
const ChatNodes = () => (
  <div className="flex justify-between items-center px-2">
    {[MessageSquare, Globe, Zap].map((Icon, i) => (
      <motion.div
        key={i}
        className="relative"
      >
        <motion.div
          className="p-3 rounded-full bg-white/5 border border-white/10"
          animate={{ 
            scale: [1, 1.1, 1],
            borderColor: ['rgba(255,255,255,0.1)', 'rgba(0,255,255,0.3)', 'rgba(255,255,255,0.1)']
          }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
        >
          <Icon size={18} className="text-gray-300" />
        </motion.div>
        {i < 2 && (
          <motion.div 
            className="absolute top-1/2 -right-8 w-6 h-px bg-gradient-to-r from-electric-cyan/50 to-transparent"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        )}
      </motion.div>
    ))}
  </div>
);

// Avatar animation
const AvatarAnimation = () => (
  <div className="relative h-14 w-14 mx-auto">
    <motion.div 
      className="absolute inset-0 rounded-full overflow-hidden border-2 border-white/10"
      animate={{ borderColor: ['rgba(255,255,255,0.1)', 'rgba(0,255,255,0.3)', 'rgba(255,255,255,0.1)'] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-electric-cyan/30 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
    <motion.div
      className="absolute -inset-2 rounded-full border border-electric-cyan/20"
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </div>
);

// Media shimmer effect
const MediaShimmer = () => (
  <div className="h-10 w-full bg-white/5 rounded-lg overflow-hidden relative">
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-electric-cyan/20 to-transparent"
      animate={{ x: ['-100%', '100%'] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />
    <div className="absolute inset-0 flex items-center justify-center gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 h-4 bg-white/20 rounded-full"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </div>
  </div>
);

// Progress bar animation
const ProgressAnimation = () => (
  <div className="flex gap-3 items-center">
    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{
          background: 'linear-gradient(90deg, #00ffff 0%, #7c3aed 100%)',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
        }}
        initial={{ width: "0%" }}
        whileInView={{ width: "85%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
    </div>
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <Activity size={18} className="text-electric-cyan" />
    </motion.div>
  </div>
);

const ServiceMatrix = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-4 md:px-6 relative z-10 bg-obsidian">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-electric-cyan uppercase border border-electric-cyan/20 rounded-full bg-electric-cyan/5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Services
          </motion.span>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            The Service Matrix
          </h2>
          
          <motion.div 
            className="w-24 h-1 mx-auto rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-electric-cyan to-purple-500"
              initial={{ width: 0 }}
              animate={isInView ? { width: '100%' } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.div>
        </motion.div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <ServiceCard
            title="Voice Calling Agents"
            subtitle="High-fidelity audio intelligence with natural language processing."
            icon={Mic}
            index={0}
          >
            <Waveform />
          </ServiceCard>

          <ServiceCard
            title="Omnichannel Chat"
            subtitle="Unified cross-platform neural networks for seamless communication."
            icon={MessageSquare}
            index={1}
          >
            <ChatNodes />
          </ServiceCard>

          <ServiceCard
            title="AI Avatars"
            subtitle="Photorealistic digital presence with emotional intelligence."
            icon={User}
            index={2}
          >
            <AvatarAnimation />
          </ServiceCard>

          <ServiceCard
            title="AI-Generated Media"
            subtitle="Synthetic video & audio generation at enterprise scale."
            icon={Video}
            className="md:col-span-1 lg:col-span-1"
            index={3}
          >
            <MediaShimmer />
          </ServiceCard>

          <ServiceCard
            title="AI Post-Production"
            subtitle="Automated editorial intelligence for content optimization."
            icon={Film}
            className="md:col-span-2 lg:col-span-2"
            index={4}
          >
            <ProgressAnimation />
          </ServiceCard>
        </div>
      </div>
    </section>
  );
};

export default ServiceMatrix;
