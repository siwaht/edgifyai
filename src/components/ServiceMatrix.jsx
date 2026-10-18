import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { PhoneCall, AudioLines, MessageSquare, Eye, BookOpenText, MousePointerClick, ArrowUpRight, Check } from 'lucide-react';
import { useTheme } from '../context/theme';

const SERVICES = [
  {
    icon: PhoneCall,
    title: 'Voice Calling Agents',
    description: 'AI receptionists and sales reps that answer and place real phone calls, book appointments, qualify leads, and hand off to humans with full context.',
    points: ['Inbound & outbound telephony', 'Sub-second response latency', 'CRM & calendar actions'],
    color: '#06b6d4',
    tag: 'Telephony',
  },
  {
    icon: AudioLines,
    title: 'Voice Chat Agents',
    description: 'Real-time speech-to-speech assistants embedded in your website or app, with natural turn-taking, interruptions, and lifelike expressive voices.',
    points: ['Streaming speech-to-speech', '30+ languages & accents', 'Barge-in & emotion aware'],
    color: '#14b8a6',
    tag: 'Real-time',
  },
  {
    icon: MessageSquare,
    title: 'Chat Agents',
    description: 'Omnichannel assistants for web, WhatsApp, Slack, and email that resolve tickets end-to-end, not just answer FAQs.',
    points: ['WhatsApp, Slack, Teams & web', 'Takes actions in your tools', 'Seamless human handoff'],
    color: '#0ea5e9',
    tag: 'Omnichannel',
  },
  {
    icon: Eye,
    title: 'Vision Agents',
    description: 'Multimodal agents that see and understand images, documents, screens, and live video to inspect, extract, and act on what they observe.',
    points: ['Document & invoice parsing', 'Live video understanding', 'Visual quality inspection'],
    color: '#f59e0b',
    tag: 'Multimodal',
  },
  {
    icon: BookOpenText,
    title: 'RAG Knowledge Agents',
    description: 'Agents grounded in your own data, with hybrid search over docs, wikis, and databases, plus cited answers you can trust.',
    points: ['Agentic & graph RAG', 'Source citations on every answer', 'Permission-aware retrieval'],
    color: '#10b981',
    tag: 'Grounded',
  },
  {
    icon: MousePointerClick,
    title: 'Computer-Use Agents',
    description: 'Autonomous agents that operate browsers and desktop apps like a person would, completing multi-step workflows across legacy systems.',
    points: ['Browser & desktop automation', 'Works without APIs', 'Approval checkpoints'],
    color: '#f43f5e',
    tag: 'Autonomous',
  },
];

const ServiceCard = ({ service, index }) => {
  const { isDark, colors } = useTheme();
  const Icon = service.icon;
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative', padding: '32px 28px', borderRadius: 24, overflow: 'hidden',
        background: isDark ? 'rgba(20, 20, 28, 0.6)' : '#ffffff',
        border: `1px solid ${isHovered ? `${service.color}40` : colors.border}`,
        height: '100%', display: 'flex', flexDirection: 'column',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: isHovered
          ? isDark ? `0 24px 56px rgba(0,0,0,0.45), 0 0 40px -12px ${service.color}50` : `0 24px 48px rgba(15,23,42,0.1), 0 0 32px -12px ${service.color}40`
          : isDark ? '0 2px 12px rgba(0,0,0,0.2)' : '0 1px 3px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.04)',
      }}
    >
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 24, right: 24, height: 1,
        background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
        opacity: isHovered ? 1 : 0.25,
        transition: 'opacity 0.4s ease',
      }} />

      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s ease',
        background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${service.color}${isDark ? '14' : '0c'}, transparent 45%)`,
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, position: 'relative' }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `linear-gradient(135deg, ${service.color}22, ${service.color}08)`,
          color: service.color,
          border: `1px solid ${service.color}2e`,
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'scale(1.08) rotate(-4deg)' : 'scale(1)',
        }}>
          <Icon size={24} strokeWidth={1.8} />
        </div>
        <span style={{
          padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600,
          background: `${service.color}14`, color: service.color,
          border: `1px solid ${service.color}26`, letterSpacing: '0.04em',
        }}>
          {service.tag}
        </span>
      </div>

      <h3 className="font-display" style={{
        fontSize: 20, fontWeight: 700, color: colors.text, marginBottom: 12,
        display: 'flex', alignItems: 'center', gap: 8,
        position: 'relative', letterSpacing: '-0.02em', lineHeight: 1.2,
      }}>
        {service.title}
        <ArrowUpRight
          size={18}
          aria-hidden
          style={{
            color: service.color,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translate(0, 0)' : 'translate(-4px, 4px)',
            transition: 'all 0.3s ease', flexShrink: 0,
          }}
        />
      </h3>

      <p style={{ fontSize: 14.5, lineHeight: 1.6, color: colors.textSecondary, marginBottom: 24, position: 'relative' }}>
        {service.description}
      </p>

      <ul style={{
        listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10,
        marginTop: 'auto', paddingTop: 20, borderTop: `1px solid ${colors.border}`, position: 'relative',
      }}>
        {service.points.map((point) => (
          <li key={point} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: colors.textSecondary }}>
            <span style={{
              width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `${service.color}18`, color: service.color,
            }}>
              <Check size={11} strokeWidth={3} />
            </span>
            {point}
          </li>
        ))}
      </ul>
    </motion.article>
  );
};

const ServiceMatrix = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { isDark, colors } = useTheme();

  return (
    <section ref={ref} id="services" style={{
      padding: 'clamp(80px,10vw,128px) 20px',
      background: colors.bgAlt,
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: 64 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 16px', borderRadius: 100, marginBottom: 24,
            background: colors.accentMuted,
            border: `1px solid ${isDark ? 'rgba(34,211,238,0.18)' : 'rgba(8,145,178,0.2)'}`,
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: colors.accent }}>
              What We Build
            </span>
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: colors.text,
            marginBottom: 16, letterSpacing: '-0.035em', lineHeight: 1.1,
          }}>
            One Studio. Every Kind of{' '}
            <span className="gradient-text" style={{ background: 'linear-gradient(135deg, #06b6d4, #10b981)' }}>AI Agent</span>
          </h2>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 18px)', color: colors.textSecondary,
            maxWidth: 600, margin: '0 auto', lineHeight: 1.6,
          }}>
            Agents that talk, listen, see, read, and act. Each one is built for production with monitoring, guardrails, and the integrations your team already uses.
          </p>
        </motion.div>

        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 680px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 1040px) { .services-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </section>
  );
};

export default ServiceMatrix;
