import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mic, MessageSquare, User, Video, Film, Activity, Globe, Zap, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ServiceCard = ({ title, subtitle, icon: Icon, children, className = "", index = 0 }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const { isDark } = useTheme();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      className={`group relative p-6 md:p-8 rounded-2xl overflow-hidden cursor-pointer transition-colors duration-300 ${className}`}
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)'
          : 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 100%)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      }}
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, rgba(0,255,255,0.05) 0%, transparent 50%)'
            : 'linear-gradient(135deg, rgba(8,145,178,0.08) 0%, transparent 50%)',
        }}
      />

      <div className={`absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        <Icon size={80} strokeWidth={1} />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <motion.div 
          className={`mb-4 p-3 rounded-xl w-fit transition-all duration-500 ${
            isDark 
              ? 'bg-white/5 border border-white/10 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/5' 
              : 'bg-gray-100 border border-gray-200 group-hover:border-cyan-600/30 group-hover:bg-cyan-600/5'
          }`}
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          <Icon className={isDark ? 'text-cyan-400' : 'text-cyan-600'} size={24} />
        </motion.div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
              isDark 
                ? 'text-white group-hover:text-cyan-400' 
                : 'text-gray-900 group-hover:text-cyan-600'
            }`}>
              {title}
            </h3>
            <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" whileHover={{ scale: 1.1 }}>
              <ArrowUpRight size={18} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
            </motion.div>
          </div>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{subtitle}</p>
        </div>

        <div className={`mt-6 pt-4 border-t ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

const Waveform = () => {
  const { isDark } = useTheme();
  return (
    <div className="flex items-center gap-1 h-10">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-1 rounded-full ${isDark ? 'bg-gradient-to-t from-cyan-400/50 to-cyan-400' : 'bg-gradient-to-t from-cyan-600/50 to-cyan-600'}`}
          animate={{ height: ["20%", "100%", "40%", "80%", "20%"], opacity: [0.5, 1, 0.7, 0.9, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
          style={{ height: "40%" }}
        />
      ))}
    </div>
  );
};

const ChatNodes = () => {
  const { isDark } = useTheme();
  return (
    <div className="flex justify-between items-center px-2">
      {[MessageSquare, Globe, Zap].map((Icon, i) => (
        <motion.div key={i} className="relative">
          <motion.div
            className={`p-3 rounded-full ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-100 border border-gray-200'}`}
            animate={{ scale: [1, 1.1, 1], borderColor: isDark ? ['rgba(255,255,255,0.1)', 'rgba(0,255,255,0.3)', 'rgba(255,255,255,0.1)'] : ['rgba(0,0,0,0.1)', 'rgba(8,145,178,0.3)', 'rgba(0,0,0,0.1)'] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          >
            <Icon size={18} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
          </motion.div>
          {i < 2 && (
            <motion.div 
              className={`absolute top-1/2 -right-8 w-6 h-px ${isDark ? 'bg-gradient-to-r from-cyan-400/50 to-transparent' : 'bg-gradient-to-r from-cyan-600/50 to-transparent'}`}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

const AvatarAnimation = () => {
  const { isDark } = useTheme();
  return (
    <div className="relative h-14 w-14 mx-auto">
      <motion.div 
        className={`absolute inset-0 rounded-full overflow-hidden border-2 ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        animate={{ borderColor: isDark ? ['rgba(255,255,255,0.1)', 'rgba(0,255,255,0.3)', 'rgba(255,255,255,0.1)'] : ['rgba(0,0,0,0.1)', 'rgba(8,145,178,0.3)', 'rgba(0,0,0,0.1)'] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800" />
        <motion.div
          className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-cyan-400/30 to-transparent' : 'bg-gradient-to-t from-cyan-600/30 to-transparent'}`}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      <motion.div
        className={`absolute -inset-2 rounded-full border ${isDark ? 'border-cyan-400/20' : 'border-cyan-600/20'}`}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
};

const MediaShimmer = () => {
  const { isDark } = useTheme();
  return (
    <div className={`h-10 w-full rounded-lg overflow-hidden relative ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
      <motion.div
        className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent' : 'bg-gradient-to-r from-transparent via-cyan-600/20 to-transparent'}`}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 flex items-center justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-1 h-4 rounded-full ${isDark ? 'bg-white/20' : 'bg-gray-400'}`}
            animate={{ scaleY: [0.5, 1, 0.5] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
};

const ProgressAnimation = () => {
  const { isDark } = useTheme();
  return (
    <div className="flex gap-3 items-center">
      <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: isDark 
              ? 'linear-gradient(90deg, #00ffff 0%, #7c3aed 100%)'
              : 'linear-gradient(90deg, #0891b2 0%, #7c3aed 100%)',
            boxShadow: isDark ? '0 0 20px rgba(0, 255, 255, 0.5)' : '0 0 20px rgba(8, 145, 178, 0.3)',
          }}
          initial={{ width: "0%" }}
          whileInView={{ width: "85%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </div>
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
        <Activity size={18} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
      </motion.div>
    </div>
  );
};

const ServiceMatrix = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { isDark } = useTheme();

  return (
    <section ref={sectionRef} className={`py-24 md:py-32 px-4 md:px-6 relative z-10 transition-colors duration-300 ${
      isDark ? 'bg-[#030712]' : 'bg-white'
    }`}>
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span 
            className={`inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase border rounded-full ${
              isDark 
                ? 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5' 
                : 'text-cyan-600 border-cyan-600/20 bg-cyan-600/5'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Services
          </motion.span>
          
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            The Service Matrix
          </h2>
          
          <motion.div 
            className={`w-24 h-1 mx-auto rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}
          >
            <motion.div
              className={`h-full ${isDark ? 'bg-gradient-to-r from-cyan-400 to-purple-500' : 'bg-gradient-to-r from-cyan-600 to-purple-500'}`}
              initial={{ width: 0 }}
              animate={isInView ? { width: '100%' } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <ServiceCard title="Voice Calling Agents" subtitle="High-fidelity audio intelligence with natural language processing." icon={Mic} index={0}>
            <Waveform />
          </ServiceCard>
          <ServiceCard title="Omnichannel Chat" subtitle="Unified cross-platform neural networks for seamless communication." icon={MessageSquare} index={1}>
            <ChatNodes />
          </ServiceCard>
          <ServiceCard title="AI Avatars" subtitle="Photorealistic digital presence with emotional intelligence." icon={User} index={2}>
            <AvatarAnimation />
          </ServiceCard>
          <ServiceCard title="AI-Generated Media" subtitle="Synthetic video & audio generation at enterprise scale." icon={Video} className="md:col-span-1 lg:col-span-1" index={3}>
            <MediaShimmer />
          </ServiceCard>
          <ServiceCard title="AI Post-Production" subtitle="Automated editorial intelligence for content optimization." icon={Film} className="md:col-span-2 lg:col-span-2" index={4}>
            <ProgressAnimation />
          </ServiceCard>
        </div>
      </div>
    </section>
  );
};

export default ServiceMatrix;
