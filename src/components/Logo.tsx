import { useTheme } from '../context/theme';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

const Logo = ({ size = 40, showText = true, className = '' }: LogoProps) => {
  const { colors, isDark } = useTheme();
  const s = size;

  return (
    <div className={`flex items-center gap-2 ${className}`} style={{ gap: Math.round(s * 0.28) }}>
      {/* Logomark: abstract "E" with neural node accent */}
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={colors.accent} />
            <stop offset="100%" stopColor={colors.accentLight} stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="logo-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isDark ? 'rgba(34,211,238,0.12)' : 'rgba(8,145,178,0.1)'} />
            <stop offset="100%" stopColor={isDark ? 'rgba(34,211,238,0.05)' : 'rgba(8,145,178,0.04)'} />
          </linearGradient>
        </defs>
        {/* Background */}
        <rect width="40" height="40" rx="10" fill="url(#logo-bg)" />
        <rect width="40" height="40" rx="10" stroke="url(#logo-grad)" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />
        {/* E bars */}
        <rect x="9" y="10" width="16" height="3.5" rx="1.5" fill="url(#logo-grad)" />
        <rect x="9" y="18.25" width="12" height="3.5" rx="1.5" fill="url(#logo-grad)" opacity="0.85" />
        <rect x="9" y="26.5" width="16" height="3.5" rx="1.5" fill="url(#logo-grad)" />
        {/* Neural node accent */}
        <circle cx="30" cy="20" r="4" fill="url(#logo-grad)" opacity="0.9" />
        <circle cx="30" cy="20" r="2" fill={isDark ? '#0a0a0f' : '#ffffff'} opacity="0.8" />
        <line x1="21" y1="20" x2="26" y2="20" stroke="url(#logo-grad)" strokeWidth="1.2" strokeOpacity="0.7" />
      </svg>
      {showText && (
        <span
          className="font-display font-bold tracking-tight select-none"
          style={{ fontSize: Math.round(s * 0.45), color: colors.text, letterSpacing: '-0.02em' }}
        >
          edgify<span style={{ color: colors.accent }}>AI</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
