import { useTheme } from '../context/theme';
import { TECH_ITEMS } from '../content/site';

const Marquee = () => {
  const { colors } = useTheme();
  const items = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div style={{
      background: colors.bgAlt,
      borderTop: `1px solid ${colors.border}`,
      borderBottom: `1px solid ${colors.border}`,
      padding: '20px 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 80,
        background: `linear-gradient(to right, ${colors.bgAlt}, transparent)`,
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 80,
        background: `linear-gradient(to left, ${colors.bgAlt}, transparent)`,
        zIndex: 2, pointerEvents: 'none',
      }} />

      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: 'marquee 40s linear infinite',
        gap: '0',
      }}>
        {items.map((item, i) => (
          <div key={`${item}-${i}`} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '0 28px',
            flexShrink: 0,
          }}>
            <span style={{
              color: colors.textMuted,
              fontSize: '0.82rem',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              letterSpacing: '0.01em',
            }}>
              {item}
            </span>
            <span style={{
              width: 4, height: 4, borderRadius: '50%',
              background: colors.accent,
              opacity: 0.4,
              flexShrink: 0,
            }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
