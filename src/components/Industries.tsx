import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/theme';
import { INDUSTRIES, type Industry } from '../content/site';

const IndustryCard = ({ industry, index }: { industry: Industry; index: number }) => {
  const { colors } = useTheme();
  const Icon = industry.icon;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: '18px',
        padding: '26px 22px',
        backdropFilter: 'blur(12px)',
        transition: 'border-color 0.22s ease, transform 0.22s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = industry.accent + '45';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = colors.border;
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 40, height: 40, borderRadius: '11px',
        background: industry.accent + '18',
        marginBottom: '14px',
      }}>
        <Icon size={19} color={industry.accent} />
      </div>
      <h3 style={{ color: colors.text, fontWeight: 600, fontSize: '0.95rem', marginBottom: '8px', letterSpacing: '-0.01em' }}>
        {industry.title}
      </h3>
      <p style={{ color: colors.textSecondary, fontSize: '0.845rem', lineHeight: 1.6 }}>
        {industry.useCase}
      </p>
    </motion.div>
  );
};

const Industries = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const { colors } = useTheme();

  return (
    <section id="industries" ref={ref} style={{ background: colors.bgAlt, padding: '96px 24px' }}>
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
            Where It Pays Off
          </span>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: colors.text, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '16px' }}
          >
            Built for Your Industry
          </h2>
          <p style={{ color: colors.textSecondary, fontSize: '1rem', maxWidth: '54ch', margin: '0 auto', lineHeight: 1.7 }}>
            The same platform, tuned to the conversations and paperwork your teams actually deal with every day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INDUSTRIES.map((industry, i) => (
            <IndustryCard key={industry.title} industry={industry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
