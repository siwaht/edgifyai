import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, Globe } from 'lucide-react';

const FloatingIcon = ({ icon: Icon, delay, x, y }) => (
  <motion.div
    className="absolute p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.1, 1],
      y: [0, -10, 0],
    }}
    transition={{ 
      duration: 4, 
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <Icon size={20} className="text-electric-cyan/60" />
  </motion.div>
);

const CTA = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-4 md:px-6 relative z-10">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Animated background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-[-30%] left-[-10%] w-[400px] h-[400px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0,255,255,0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-[-30%] right-[-10%] w-[400px] h-[400px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={{
                x: [0, -40, 0],
                y: [0, -20, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* Floating icons */}
          <FloatingIcon icon={Zap} delay={0} x="10%" y="20%" />
          <FloatingIcon icon={Shield} delay={1} x="85%" y="25%" />
          <FloatingIcon icon={Globe} delay={2} x="15%" y="70%" />

          {/* Content */}
          <motion.div 
            className="relative z-10 p-8 md:p-16 text-center"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan text-sm font-medium"
                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 255, 255, 0.4)' }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={16} />
                </motion.div>
                <span>Systems Online</span>
                <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
              </motion.div>
            </motion.div>

            {/* Heading */}
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Ready to Deploy Your
              <br />
              <motion.span 
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #00ffff 0%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Digital Workforce?
              </motion.span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-gray-400 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Stop renting time. Start owning outcomes. Integrate our autonomous agents 
              into your existing infrastructure today and watch your efficiency scale exponentially.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                className="group relative px-8 py-4 bg-white text-obsidian font-bold text-base rounded-xl overflow-hidden flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Initialize Sequence</span>
                <motion.div className="relative z-10">
                  <ArrowRight 
                    size={20} 
                    className="group-hover:translate-x-1 transition-transform duration-300" 
                  />
                </motion.div>
                <motion.div 
                  className="absolute inset-0 bg-electric-cyan"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.button>

              <motion.button
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:border-electric-cyan/50 hover:bg-white/5 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule Demo
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              variants={itemVariants}
              className="mt-12 pt-8 border-t border-white/5"
            >
              <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-electric-cyan/60" />
                  <span>SOC2 Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-electric-cyan/60" />
                  <span>99.99% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-electric-cyan/60" />
                  <span>Global Infrastructure</span>
                </div>
              </div>
            </motion.div>

            {/* Terminal-style footer */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 text-xs text-gray-600 font-mono"
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
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
