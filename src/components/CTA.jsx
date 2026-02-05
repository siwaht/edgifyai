import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const benefits = [
  'No credit card required',
  '14-day free trial',
  'Cancel anytime',
];

const CTA = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { isDark } = useTheme();

  return (
    <section 
      ref={sectionRef}
      className="section-padding relative"
      style={{ background: isDark ? '#09090b' : '#ffffff' }}
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-16"
          style={{
            background: isDark 
              ? 'linear-gradient(135deg, #18181b 0%, #1f1f23 100%)'
              : 'linear-gradient(135deg, #f4f4f5 0%, #fafafa 100%)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          }}
        >
          {/* Background elements */}
          <div 
            className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-40"
            style={{ background: isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(8, 145, 178, 0.15)' }}
          />
          <div 
            className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-30"
            style={{ background: isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.15)' }}
          />

          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px),
                linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
              style={{ color: isDark ? '#fafafa' : '#09090b' }}
            >
              Ready to Get Started?
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg mb-8"
              style={{ color: isDark ? '#a1a1aa' : '#52525b' }}
            >
              Join thousands of companies using Agenticos to automate their operations 
              and scale their business.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              <button className="btn-primary w-full sm:w-auto">
                Start Free Trial
                <ArrowRight size={18} />
              </button>
              <button className="btn-secondary w-full sm:w-auto">
                Talk to Sales
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            >
              {benefits.map((benefit, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: isDark ? '#71717a' : '#a1a1aa' }}
                >
                  <Check size={16} style={{ color: 'var(--accent)' }} />
                  {benefit}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
