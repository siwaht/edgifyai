import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import AIAgentsAnimation from './AIAgentsAnimation';
import './Hero.css';

const STATS = [
  { value: '2–4 wks', label: 'From kickoff to live pilot' },
  { value: '24/7', label: 'Coverage on every channel' },
  { value: '30+', label: 'Languages supported' },
  { value: '<1s', label: 'Voice response time' },
];

const ASSURANCES = ['Free strategy call', 'Live pilot in weeks', 'You own your data'];

const EASE = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
};

const Hero = ({ ready = true }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  return (
    <section ref={ref} id="top" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__glow hero__glow--a" />
        <div className="hero__glow hero__glow--b" />
        <div className="hero__grid" />
        <div className="hero__beam" />
      </div>

      {/* Parallax wrapper is separate from the entrance animation so the two opacity sources never fight. */}
      <motion.div className="container hero__inner" style={{ y: yParallax, opacity: opacityFade }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={ready ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="hero__badge-wrap">
            <span className="hero__badge">
              <span className="live-dot" aria-hidden="true" />
              AI Agent Agency
              <span className="hero__badge-sep" aria-hidden="true" />
              <span className="hero__badge-muted">Voice · Chat · Vision</span>
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="hero__title font-display">
            AI agents that talk, see
            <br />
            <span className="grad-text hero__title-accent">and get work done.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero__lead">
            EdgeifyAI designs, builds, and runs custom AI agents for your business. They answer calls,
            resolve support requests, read documents, and book meetings, connected to the tools
            your team already uses.
          </motion.p>

          <motion.div variants={itemVariants} className="hero__actions">
            <a href="#contact" className="btn btn-primary">
              Book a Free Strategy Call
              <ArrowRight size={17} className="btn-arrow" />
            </a>
            <a href="#services" className="btn btn-secondary">
              See What We Build
            </a>
          </motion.div>

          <motion.ul variants={itemVariants} className="hero__assurances" aria-label="What you get">
            {ASSURANCES.map((item) => (
              <li key={item}>
                <span className="check-dot"><Check size={11} strokeWidth={3} /></span>
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={itemVariants} className="hero__visual">
            <div className="hero__console card">
              <div className="hero__console-bar">
                <span className="hero__console-dots" aria-hidden="true"><i /><i /><i /></span>
                <span className="hero__console-title">edgeify · agent orchestrator</span>
                <span className="hero__console-status">
                  <span className="live-dot" aria-hidden="true" />
                  6 agents live
                </span>
              </div>
              <AIAgentsAnimation />
            </div>
          </motion.div>

          <motion.dl variants={itemVariants} className="hero__stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="hero__stat">
                <dt className="hero__stat-label">{stat.label}</dt>
                <dd className="hero__stat-value font-display">{stat.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
