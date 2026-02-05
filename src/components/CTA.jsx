import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const FloatingIcon = ({ icon: Icon, delay, x, y }) => {
  const { isDark } = useTheme();
  return (
    <motion.div
      className={`absolute p-3 rounded-xl backdrop-blur-sm ${
        isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-100 border border-gray-200'
      }`}
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1], y: [0, -10, 0] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <Icon size={20} className={isDark ? 'text-cyan-400/60' : 'text-cyan-600/60'} />
    </motion.div>
  );
};

const CTA = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section ref={sectionRef} className={`py-24 md:py-32 px-4 md:px-6 relative z-10 transition-colors duration-300 ${
      isDark ? 'bg-[#030712]' : 'bg-white'
    }`}>
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: isDark 
              ? 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)'
              : 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 100%)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-[-30%] left-[-10%] w-[400px] h-[400px] rounded-full"
              style={{
                background: isDark 
                  ? 'radial-gradient(circle, rgba(0,255,255,0.15) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(8,145,178,0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-[-30%] right-[-10%] w-[400px] h-[400px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={{ x: [0, -40, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} 1px, transparent 1px),
                  linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          <FloatingIcon icon={Zap} delay={0} x="10%" y="20%" />
          <FloatingIcon icon={Shield} delay={1} x="85%" y="25%" />
          <FloatingIcon icon={Globe} delay={2} x="15%" y="70%" />

          <motion.div 
            className="relative z-10 p-8 md:p-16 text-center"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <motion.div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                  isDark 
                    ? 'bg-cyan-400/10 border border-cyan-400/20 text-cyan-400' 
                    : 'bg-cyan-600/10 border border-cyan-600/20 text-cyan-600'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                  <Sparkles size={16} />
                </motion.div>
                <span>Systems Online</span>
                <span className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`} />
              </motion.div>
            </motion.div>

            <motion.h2 variants={itemVariants} className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Deploy Your<br />
              <span style={{
                background: isDark 
                  ? 'linear-gradient(135deg, #00ffff 0%, #7c3aed 100%)'
                  : 'linear-gradient(135deg, #0891b2 0%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Digital Workforce?
              </span>
            </motion.h2>

            <motion.p variants={itemVariants} className={`text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Stop renting time. Start owning outcomes. Integrate our autonomous agents 
              into your existing infrastructure today and watch your efficiency scale exponentially.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className={`group relative px-8 py-4 font-bold text-base rounded-xl overflow-hidden flex items-center justify-center gap-3 ${
                  isDark ? 'bg-white text-[#030712]' : 'bg-gray-900 text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Initialize Sequence</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <motion.div 
                  className={`absolute inset-0 ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.button>

              <motion.button
                className={`px-8 py-4 border font-semibold rounded-xl transition-all duration-300 ${
                  isDark 
                    ? 'border-white/20 text-white hover:border-cyan-400/50 hover:bg-white/5' 
                    : 'border-gray-300 text-gray-900 hover:border-cyan-600/50 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule Demo
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className={`mt-12 pt-8 border-t ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
              <div className={`flex flex-wrap justify-center gap-8 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                <div className="flex items-center gap-2">
                  <Shield size={16} className={isDark ? 'text-cyan-400/60' : 'text-cyan-600/60'} />
                  <span>SOC2 Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className={isDark ? 'text-cyan-400/60' : 'text-cyan-600/60'} />
                  <span>99.99% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={16} className={isDark ? 'text-cyan-400/60' : 'text-cyan-600/60'} />
                  <span>Global Infrastructure</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className={`mt-8 text-xs font-mono ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                // ENCRYPTED CONNECTION _ SECURE _ READY
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
