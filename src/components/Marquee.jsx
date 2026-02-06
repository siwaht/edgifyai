import { Bot, Brain, Zap, Shield, Globe, BarChart3, Workflow, MessageSquare, Database, Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const CAPABILITIES = [
  { icon: Bot, label: 'Autonomous Agents' },
  { icon: Brain, label: 'Natural Language Processing' },
  { icon: Zap, label: 'Real-Time Processing' },
  { icon: Shield, label: 'Enterprise Security' },
  { icon: Globe, label: 'Multi-Language Support' },
  { icon: BarChart3, label: 'Advanced Analytics' },
  { icon: Workflow, label: 'Workflow Automation' },
  { icon: MessageSquare, label: 'Conversational AI' },
  { icon: Database, label: 'Knowledge Base' },
  { icon: Lock, label: 'Data Privacy' },
];

const CapabilityItem = ({ icon: Icon, label, isDark }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '0 36px', whiteSpace: 'nowrap',
  }}>
    <div style={{
      width: 32, height: 32, borderRadius: 8,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: isDark ? 'rgba(6,182,212,0.1)' : 'rgba(6,182,212,0.06)',
      border: `1px solid ${isDark ? 'rgba(6,182,212,0.15)' : 'rgba(6,182,212,0.1)'}`,
      color: isDark ? '#22d3ee' : '#0891b2',
    }}>
      <Icon size={16} strokeWidth={1.8} />
    </div>
    <span style={{
      fontSize: 14, fontWeight: 500, letterSpacing: '-0.01em',
      color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)',
    }}>
      {label}
    </span>
  </div>
);

const Marquee = () => {
  const { isDark, colors } = useTheme();

  return (
    <section style={{
      padding: '44px 0', background: colors.bg,
      borderTop: `1px solid ${colors.border}`,
      borderBottom: `1px solid ${colors.border}`,
      overflow: 'hidden', position: 'relative',
    }}>
      <p style={{
        textAlign: 'center', fontSize: 12, fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.08em',
        color: colors.textMuted, marginBottom: 24,
      }}>
        Platform Capabilities
      </p>

      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
          background: `linear-gradient(to right, ${colors.bg}, transparent)`,
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
          background: `linear-gradient(to left, ${colors.bg}, transparent)`,
        }} />

        <div style={{
          display: 'flex',
          animation: 'marquee 35s linear infinite',
        }}>
          {[...CAPABILITIES, ...CAPABILITIES].map(({ icon, label }, i) => (
            <CapabilityItem key={`${label}-${i}`} icon={icon} label={label} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
