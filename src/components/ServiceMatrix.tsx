import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/theme';
import { SERVICES, type Service } from '../content/site';

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const { colors } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: '20px',
        padding: '32px 28px',
        backdropFilter: 'blur(12px)',
        transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = service.accent + '45';
        el.style.transform = 'translateY(-4px)';
        el.style.boxShadow = `0 20px 40px ${service.accent}15`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = colors.border;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
      }}
    >
      <div style={{
        position: 'absolute', top: -20, right: -20, width: 120, height: 120,
        borderRadius: '50%',
        background: service.accent + '08',
        pointerEvents: 'none',
      }} />

      <div className="flex items-start justify-between gap-3" style={{ marginBottom: '16px' }}>
        <div style={{
          width: 48, height: 48, borderRadius: '14px',
          background: service.accent + '1a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={22} color={service.accent} />
        </div>
        <span style={{
          display: 'inline-block',
          background: service.accent + '18',
          color: service.accent,
          fontSize: '0.68rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          padding: '4px 10px',
          borderRadius: '100px',
          whiteSpace: 'nowrap',
        }}>{service.badge}</span>
      </div>

      <h3 style={{ color: colors.text, fontWeight: 700, fontSize: '1.05rem', marginBottom: '4px', letterSpacing: '-0.01em' }}>
        {service.title}
      </h3>
      <div style={{ color: service.accent, fontSize: '0.78rem', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.01em' }}>
        {service.tagline}
      </div>
      <p style={{ color: colors.textSecondary, fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '18px' }}>
        {service.description}
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {service.points.map((point) => (
          <li key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <Check size={14} color={service.accent} style={{ flexShrink: 0, marginTop: '3px' }} />
            <span style={{ color: colors.textSecondary, fontSize: '0.8rem', lineHeight: 1.5 }}>{point}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        style={{
          marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '6px',
          color: service.accent, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none',
          transition: 'gap 0.2s ease',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = '10px'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = '6px'; }}
      >
        Talk to us about this <ArrowRight size={14} />
      </a>
    </motion.div>
  );
};

const ServiceMatrix = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const { colors } = useTheme();

  return (
    <section id="services" ref={ref} style={{ background: colors.bgAlt, padding: '96px 24px' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span style={{
            display: 'inline-block',
            color: colors.accent,
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            What We Build
          </span>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: colors.text, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '16px' }}
          >
            Eight Agent Types, One Partner
          </h2>
          <p style={{ color: colors.textSecondary, fontSize: '1rem', maxWidth: '56ch', margin: '0 auto', lineHeight: 1.7 }}>
            Whether you need a voice agent answering your phone line or a fleet of specialists running an entire back office, we build the whole stack — and stay on to keep it performing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceMatrix;
