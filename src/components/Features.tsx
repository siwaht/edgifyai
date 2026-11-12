import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/theme';
import { CAPABILITIES, type Capability } from '../content/site';

const CapabilityCard = ({ capability, index }: { capability: Capability; index: number }) => {
  const { colors } = useTheme();
  const Icon = capability.icon;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: '16px',
        padding: '24px 22px',
        backdropFilter: 'blur(12px)',
        overflow: 'hidden',
        transition: 'border-color 0.2s ease, transform 0.2s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = capability.accent + '40';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = colors.border;
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }}
    >
      <div style={{
        position: 'absolute', top: 0, right: 0, width: 80, height: 80, borderRadius: '0 16px 0 80px',
        background: capability.accent + '0d', pointerEvents: 'none',
      }} />

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 40, height: 40, borderRadius: '11px',
        background: capability.accent + '18',
        marginBottom: '14px',
      }}>
        <Icon size={19} color={capability.accent} />
      </div>

      <h3 style={{ color: colors.text, fontWeight: 600, fontSize: '0.95rem', marginBottom: '7px', letterSpacing: '-0.01em' }}>
        {capability.title}
      </h3>
      <p style={{ color: colors.textSecondary, fontSize: '0.845rem', lineHeight: 1.6 }}>
        {capability.description}
      </p>
    </motion.div>
  );
};

const Features = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const { colors } = useTheme();

  return (
    <section id="capabilities" ref={ref} style={{ background: colors.bg, padding: '96px 24px' }}>
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
            The Platform Layer
          </span>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: colors.text, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '16px' }}
          >
            Everything an Agent Needs to Work
          </h2>
          <p style={{ color: colors.textSecondary, fontSize: '1rem', maxWidth: '56ch', margin: '0 auto', lineHeight: 1.7 }}>
            Voice, memory, retrieval, tools and evaluation are wired together on every project — so agents do not just talk, they get things done and stay accountable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CAPABILITIES.map((capability, i) => (
            <CapabilityCard key={capability.title} capability={capability} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
