import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mic, MessageSquare, User, Video, Film, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const services = [
  { icon: Mic, title: 'Voice Agents', description: 'Natural voice interactions powered by advanced speech recognition.', color: '#06b6d4' },
  { icon: MessageSquare, title: 'Chat Intelligence', description: 'Omnichannel messaging with context-aware responses.', color: '#8b5cf6' },
  { icon: User, title: 'Digital Avatars', description: 'Photorealistic AI representatives for engagement.', color: '#f59e0b' },
  { icon: Video, title: 'Media Generation', description: 'Create professional video and audio at scale.', color: '#ec4899' },
  { icon: Film, title: 'Post-Production', description: 'Automated editing and optimization for media.', color: '#10b981' },
];

const ServiceCard = ({ service, index, isDark }) => {
  const Icon = service.icon;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
    setIsFocused(true);
  };

  const handleBlur = () => {
    setOpacity(0);
    setIsFocused(false);
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  const ref = useRef(null);

  const cardStyle = {
    position: 'relative',
    padding: 32, // Increased padding
    borderRadius: 24, // More rounded
    background: isDark ? 'rgba(30, 41, 59, 0.2)' : '#ffffff', // Lighter bg for obsidian theme contrast or white
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease',
  };

  const iconContainerStyle = {
    width: 64,
    height: 64,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
    color: service.color,
    marginBottom: 24,
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
    boxShadow: `0 0 20px -5px ${service.color}40`, // Add colored glow
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      className="group"
    >
      {/* Spotlight Effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}, transparent 40%)`,
          transition: 'opacity 0.2s',
          pointerEvents: 'none',
        }}
      />

      {/* Border Glow */}
      <div
        style={{
          position: 'absolute',
          inset: -1,
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${service.color}40, transparent 40%)`,
          transition: 'opacity 0.2s',
          borderRadius: 'inherit',
          zIndex: -1,
        }}
      />

      <div style={iconContainerStyle}>
        <Icon size={28} />
      </div>
      <div style={{ // Title Style
        fontSize: 20,
        fontWeight: 700,
        color: isDark ? '#f8fafc' : '#0f172a',
        marginBottom: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {service.title}
        <ArrowUpRight size={20} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-cyan-400" />
      </div>
      <p style={{ // Desc Style
        fontSize: 15,
        lineHeight: 1.6,
        color: isDark ? '#94a3b8' : '#64748b',
        flex: 1,
      }}>{service.description}</p>
    </motion.div>
  );
};

const ServiceMatrix = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isDark } = useTheme();

  const sectionStyle = {
    padding: '80px 20px',
    background: isDark ? '#0c0c0f' : '#f4f4f5',
  };

  const containerStyle = {
    maxWidth: 1200,
    margin: '0 auto',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: 56,
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    borderRadius: 100,
    background: isDark ? 'rgba(6, 182, 212, 0.15)' : 'rgba(8, 145, 178, 0.1)',
    color: isDark ? '#06b6d4' : '#0891b2',
    marginBottom: 20,
  };

  const titleStyle = {
    fontSize: 'clamp(28px, 5vw, 44px)',
    fontWeight: 700,
    color: isDark ? '#fafafa' : '#09090b',
    marginBottom: 16,
  };

  const subtitleStyle = {
    fontSize: 'clamp(15px, 2vw, 18px)',
    color: isDark ? '#a1a1aa' : '#52525b',
    maxWidth: 500,
    margin: '0 auto',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 20,
  };

  return (
    <section ref={ref} style={sectionStyle}>
      <div style={containerStyle}>
        <motion.div
          style={headerStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span style={badgeStyle}>Services</span>
          <h2 style={titleStyle}>Complete AI Suite</h2>
          <p style={subtitleStyle}>
            Everything you need to build, deploy, and scale intelligent automation.
          </p>
        </motion.div>

        <div style={gridStyle}>
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} isDark={isDark} />
          ))}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            style={{
              padding: 28,
              borderRadius: 20,
              background: isDark
                ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(8, 145, 178, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)',
              border: `1px solid ${isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(8, 145, 178, 0.2)'}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 600, color: isDark ? '#fafafa' : '#09090b', marginBottom: 8 }}>
              Need something custom?
            </h3>
            <p style={{ fontSize: 14, color: isDark ? '#a1a1aa' : '#52525b', marginBottom: 20 }}>
              Let's build your perfect solution.
            </p>
            <button style={{
              padding: '12px 24px',
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 10,
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
              background: 'transparent',
              color: isDark ? '#fafafa' : '#09090b',
              cursor: 'pointer',
            }}>
              Contact Sales
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceMatrix;
