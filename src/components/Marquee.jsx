import { useTheme } from '../context/ThemeContext';

const LOGOS = [
  'Accenture', 'Deloitte', 'McKinsey', 'Stripe', 'Shopify',
  'Notion', 'Figma', 'Linear', 'Vercel', 'Datadog',
];

const LogoItem = ({ name, colors }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '0 40px', whiteSpace: 'nowrap',
    fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em',
    color: colors.textMuted, opacity: 0.6,
  }}>
    <div style={{
      width: 28, height: 28, borderRadius: 6,
      background: colors.border,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 700, color: colors.textMuted,
    }}>
      {name[0]}
    </div>
    {name}
  </div>
);

const Marquee = () => {
  const { colors } = useTheme();

  return (
    <section style={{
      padding: '48px 0', background: colors.bg,
      borderTop: `1px solid ${colors.border}`,
      borderBottom: `1px solid ${colors.border}`,
      overflow: 'hidden', position: 'relative',
    }}>
      <p style={{
        textAlign: 'center', fontSize: 12, fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.08em',
        color: colors.textMuted, marginBottom: 28,
      }}>
        Trusted by industry leaders
      </p>

      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, zIndex: 2,
          background: `linear-gradient(to right, ${colors.bg}, transparent)`,
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, zIndex: 2,
          background: `linear-gradient(to left, ${colors.bg}, transparent)`,
        }} />

        <div style={{
          display: 'flex',
          animation: 'marquee 30s linear infinite',
        }}>
          {[...LOGOS, ...LOGOS].map((name, i) => (
            <LogoItem key={`${name}-${i}`} name={name} colors={colors} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
