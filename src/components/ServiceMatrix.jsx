import { useRef } from 'react';
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

  const cardStyle = {
    position: 'relative',
    padding: 28,
    borderRadius: 20,
    background: isDark ? '#18181b' : '#fafafa',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
  };

  const iconContainerStyle = {
    width: 52,
    height: 52,
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `${service.color}15`,
    color: service.color,
    marginBottom: 20,
  };

  const titleStyle = {
    fontSize: 18,
    fontWeight: 600,
    color: isDark ? '#fafafa' : '#09090b',
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const descStyle = {
    fontSize: 14,
    lineHeight: 1.6,
    color: isDark ? '#a1a1aa' : '#52525b',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -6, boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.3)' : '0 20px 40px rgba(0,0,0,0.1)' }}
      style={cardStyle}
    >
      <div style={iconContainerStyle}>
        <Icon size={24} />
      </div>
      <div style={titleStyle}>
        {service.title}
        <ArrowUpRight size={18} style={{ color: isDark ? '#52525b' : '#a1a1aa' }} />
      </div>
      <p style={descStyle}>{service.description}</p>
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
