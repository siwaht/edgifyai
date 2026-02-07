import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import AIAgentsAnimation from './AIAgentsAnimation';

const STATS = [
  { value: '12+', label: 'Agent Types' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '24/7', label: 'Autonomous Operation' },
  { value: '500+', label: 'Agents Deployed' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isDark } = useTheme();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-obsidian">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Mesh Gradient / Aurora */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30">
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-electric-cyan-dim/20 rounded-full blur-[120px] animate-blob" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[45vw] h-[45vw] bg-purple-glow/20 rounded-full blur-[100px] animate-blob animation-delay-4000" />
          <div className="absolute top-[30%] right-[15%] w-[25vw] h-[25vw] bg-blue-500/20 rounded-full blur-[80px] animate-blob animation-delay-2000" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto text-center px-6"
        style={{ y: yParallax, opacity: opacityFade }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full bg-electric-cyan/5 border border-electric-cyan/20 text-electric-cyan shadow-[0_0_15px_rgba(0,240,255,0.1)] backdrop-blur-md">
            <Sparkles size={14} className="animate-pulse-slow" />
            Next-Generation AI Agents
          </span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-white leading-[1.1]">
          Build the Future with{' '}
          <span className="gradient-text bg-300% animate-shimmer relative inline-block">
            Intelligent Agents
            <span className="absolute inset-x-0 bottom-2 h-[20%] bg-electric-cyan/20 blur-xl -z-10" />
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl leading-relaxed text-gray-400 max-w-2xl mx-auto mb-12">
          From simple chatbots to enterprise-grade autonomous agents — we design, build, and deploy AI agents with memory, reasoning, and real-world tool access.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group w-full sm:w-auto relative px-8 py-4 bg-white text-obsidian rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get a Consultation
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-150%] group-hover:animate-shimmer" />
          </button>

          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg text-white border border-white/10 hover:bg-white/5 hover:border-white/20 backdrop-blur-sm transition-all duration-300"
          >
            <Play size={18} className="fill-current" />
            View Our Work
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-20 relative z-20 transform-gpu">
          <div className="absolute inset-0 bg-electric-cyan/5 blur-[100px] -z-10 rounded-full" />
          <AIAgentsAnimation />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-24 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-electric-cyan transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
