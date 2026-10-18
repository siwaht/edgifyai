import { useState } from 'react';
import { Eye, Brain, Plug, ShieldCheck, Mic, MessageSquare, BookOpenText, PhoneCall, GitBranch, Users, MousePointerClick, AudioLines } from 'lucide-react';
import { useTheme } from '../context/theme';

const CAPABILITIES = [
  { icon: PhoneCall, label: 'Voice Calling Agents' },
  { icon: AudioLines, label: 'Voice Chat Agents' },
  { icon: MessageSquare, label: 'Chat Agents' },
  { icon: Eye, label: 'Vision Agents' },
  { icon: BookOpenText, label: 'RAG Agents' },
  { icon: MousePointerClick, label: 'Computer Use' },
  { icon: Plug, label: 'MCP Tools' },
  { icon: GitBranch, label: 'A2A Protocol' },
  { icon: Mic, label: 'Speech-to-Speech' },
  { icon: Brain, label: 'Agent Memory' },
  { icon: Users, label: 'Human in the Loop' },
  { icon: ShieldCheck, label: 'Guardrails' },
];

const Dot = ({ isDark }) => (
  <div style={{
    width: 4, height: 4, borderRadius: '50%', flexShrink: 0,
    background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
  }} />
);

const CapabilityItem = ({ icon: Icon, label, isDark }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 32, whiteSpace: 'nowrap', flexShrink: 0,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isDark ? 'rgba(6,182,212,0.09)' : 'rgba(6,182,212,0.07)',
        border: `1px solid ${isDark ? 'rgba(6,182,212,0.14)' : 'rgba(6,182,212,0.12)'}`,
        color: isDark ? '#22d3ee' : '#0891b2',
      }}>
        <Icon size={15} strokeWidth={1.8} />
      </div>
      <span style={{
        fontSize: 14, fontWeight: 500,
        color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
        letterSpacing: '-0.01em',
      }}>
        {label}
      </span>
    </div>
    <Dot isDark={isDark} />
  </div>
);

const Marquee = () => {
  const { isDark, colors } = useTheme();
  const [paused, setPaused] = useState(false);

  return (
    <section style={{
      padding: '40px 0',
      background: colors.bg,
      borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
      overflow: 'hidden', position: 'relative',
    }}>
      <p style={{
        textAlign: 'center', fontSize: 11, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.1em',
        color: colors.textMuted, marginBottom: 20,
      }}>
        Agent Capabilities
      </p>

      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 140, zIndex: 2,
          background: `linear-gradient(to right, ${colors.bg}, transparent)`,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 140, zIndex: 2,
          background: `linear-gradient(to left, ${colors.bg}, transparent)`,
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'flex',
          animation: `marquee 40s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          gap: 0,
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
