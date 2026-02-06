import { useTheme } from '../context/ThemeContext';

/**
 * EdgeifyAI Logo
 * Logomark: Abstract "E" formed by 3 horizontal bars with a neural-network node accent
 * Style: Geometric, gradient, modern SaaS/AI aesthetic
 */
const Logo = ({ size = 40, showText = true, className = '' }) => {
  const { isDark, colors } = useTheme();
  const s = size;
  const textSize = Math.round(s * 0.45);

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: Math.round(s * 0.25) }}>
      {/* Logomark */}
      <svg
        width={s}
        height={s}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
          <linearGradient id="logoGradAlt" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="logoGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background rounded square */}
        <rect
          x="0" y="0" width="48" height="48" rx="12"
          fill="url(#logoGrad)"
        />

        {/* Abstract "E" — 3 horizontal bars */}
        <rect x="12" y="12" width="20" height="3.5" rx="1.75" fill="#fff" opacity="0.95" />
        <rect x="12" y="22.25" width="16" height="3.5" rx="1.75" fill="#fff" opacity="0.85" />
        <rect x="12" y="32.5" width="20" height="3.5" rx="1.75" fill="#fff" opacity="0.95" />

        {/* Vertical bar of the E */}
        <rect x="12" y="12" width="3.5" height="24" rx="1.75" fill="#fff" opacity="0.95" />

        {/* Neural node accent — small circle at the end of middle bar */}
        <circle cx="32" cy="24" r="4" fill="#fff" opacity="0.9" />
        <circle cx="32" cy="24" r="2" fill="url(#logoGrad)" />

        {/* Connection lines from node */}
        <line x1="32" y1="24" x2="37" y2="15" stroke="#fff" strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
        <line x1="32" y1="24" x2="37" y2="33" stroke="#fff" strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />

        {/* Outer nodes */}
        <circle cx="37" cy="15" r="2.2" fill="#fff" opacity="0.7" />
        <circle cx="37" cy="33" r="2.2" fill="#fff" opacity="0.7" />
      </svg>

      {/* Wordmark */}
      {showText && (
        <span style={{
          fontSize: textSize,
          fontWeight: 700,
          fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
          letterSpacing: '-0.02em',
          color: colors.text,
          lineHeight: 1,
          userSelect: 'none',
        }}>
          Edgeify<span style={{
            background: 'linear-gradient(135deg, #06b6d4, #14b8a6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>AI</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
