import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mic, MessageSquare, Bot, Brain, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SERVICES = [
  {
    icon: Mic,
    title: 'Voice Agents',
    description: 'Natural voice interactions with real-time speech recognition, synthesis, and multi-turn conversational flow.',
    color: '#06b6d4',
    tag: 'Real-time',
  },
  {
    icon: MessageSquare,
    title: 'Chat Agents',
    description: 'Omnichannel messaging agents with context-aware responses across web, mobile, Slack, and more.',
    color: '#14b8a6',
    tag: 'Omnichannel',
  },
  {
    icon: Bot,
    title: 'Ambient Agents',
    description: 'Background agents that monitor systems, observe patterns, and act proactively without explicit prompts.',
    color: '#8b5cf6',
    tag: 'Autonomous',
  },
  {
    icon: Brain,
    title: 'Deep Agents',
    description: 'Complex reasoning agents for multi-step planning, research, analysis, and autonomous decision-making.',
    color: '#f59e0b',
    tag: 'Enterprise',
  },
];

const ServiceCard = ({ service, index }) => {
  const { isDark, colors } = useTheme();
  const Icon = service.icon;
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative', padding: '36px 32px', borderRadius: 24, overflow: 'hidden',
        background: isDark ? 'rgba(20, 20, 30, 0.6)' : '#ffffff',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
        backdropFilter: 'blur(12px)',
        height: '100%', display: 'flex', flexDirection: 'column',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: isHovered
          ? isDark ? `0 20px 48px rgba(0,0,0,0.4), 0 0 0 1px ${service.color}25` : `0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px ${service.color}20`
          : isDark ? '0 4px 20px rgba(0,0,0,0.2)' : '0 2px 12px rgba(0,0,0,0.05)',
        borderColor: isHovered
          ? isDark ? `${service.color}30` : `${service.color}20`
          : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
      }}
    >
      {/* Colored top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${service.color}80, ${service.color}00)`,
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }} />

      {/* Spotlight */}
      <div style={{
        position: 'absolute', inset: 0, opacity: spotlight.opacity,
        background: `radial-gradient(500px circle at ${spotlight.x}px ${spotlight.y}px, ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}, transparent 40%)`,
        transition: 'opacity 0.3s', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Tag */}
      <div style={{
        position: 'absolute', top: 20, right: 20, zIndex: 1,
        padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600,
        background: `${service.color}14`,
        color: service.color,
        border: `1px solid ${service.color}22`,
        letterSpacing: '0.04em',
        opacity: 0.9,
      }}>
        {service.tag}
      </div>

      {/* Icon */}
      <div style={{
        width: 60, height: 60, borderRadius: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isDark ? `${service.color}14` : `${service.color}0e`,
        color: service.color, marginBottom: 24,
        border: `1px solid ${service.color}22`,
        position: 'relative', zIndex: 1,
        boxShadow: `0 8px 24px -6px ${service.color}30`,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
      }}>
        <Icon size={26} strokeWidth={1.8} />
      </div>

      <div style={{
        fontSize: 19, fontWeight: 700, color: colors.text, marginBottom: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'relative', zIndex: 1, letterSpacing: '-0.02em',
        lineHeight: 1.2,
      }}>
        {service.title}
        <ArrowUpRight
          size={18}
          style={{
            color: service.color,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translate(0, 0)' : 'translate(-4px, 4px)',
            transition: 'all 0.25s ease',
            flexShrink: 0, marginLeft: 8,
          }}
        />
      </div>

      <p style={{
        fontSize: 14.5, lineHeight: 1.7, color: colors.textSecondary, flex: 1,
        position: 'relative', zIndex: 1,
      }}>
        {service.description}
      </p>
    </motion.div>
  );
};

const ServiceMatrix = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isDark, colors } = useTheme();

  return (
    <section ref={ref} id="services" style={{
      padding: 'clamp(72px,10vw,120px) 20px',
      background: isDark ? '#0d0d14' : '#f8fafc',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: 60 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 16px', borderRadius: 100, marginBottom: 20,
            background: isDark ? 'rgba(6,182,212,0.08)' : 'rgba(6,182,212,0.07)',
            border: `1px solid ${isDark ? 'rgba(6,182,212,0.16)' : 'rgba(6,182,212,0.2)'}`,
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: isDark ? '#22d3ee' : '#0891b2' }}>
              Our Services
            </span>
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: colors.text,
            marginBottom: 18, letterSpacing: '-0.03em', lineHeight: 1.1,
          }}>
            AI Agents for Every Need
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)', color: colors.textSecondary,
            maxWidth: 500, margin: '0 auto', lineHeight: 1.7,
          }}>
            From simple conversational bots to enterprise-grade autonomous systems — we build agents that think, remember, and act.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceMatrix;
