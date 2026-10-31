import { motion } from 'framer-motion';
import { PhoneCall, AudioLines, MessageSquare, Eye, BookOpenText, Workflow, Sparkles } from 'lucide-react';
import { useTheme } from '../context/theme';

const seeded = (s) => {
  const x = Math.sin(s * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

const AGENTS = [
  { id: 'orchestrator', label: 'Orchestrator', x: 300, y: 205, size: 42, icon: Sparkles, isCenter: true },
  { id: 'calls', label: 'Voice Calls', x: 120, y: 82, size: 30, icon: PhoneCall },
  { id: 'assistant', label: 'Voice Assistant', x: 480, y: 82, size: 30, icon: AudioLines },
  { id: 'vision', label: 'Vision & Docs', x: 526, y: 262, size: 30, icon: Eye },
  { id: 'chat', label: 'Chat & Support', x: 74, y: 262, size: 30, icon: MessageSquare },
  { id: 'knowledge', label: 'Knowledge', x: 186, y: 372, size: 28, icon: BookOpenText },
  { id: 'workflows', label: 'Workflows', x: 414, y: 372, size: 28, icon: Workflow },
];

const AGENT_BY_ID = Object.fromEntries(AGENTS.map((a) => [a.id, a]));

const CONNECTIONS = [
  { from: 'orchestrator', to: 'calls', delay: 0 },
  { from: 'orchestrator', to: 'assistant', delay: 0.5 },
  { from: 'orchestrator', to: 'vision', delay: 1 },
  { from: 'orchestrator', to: 'chat', delay: 1.5 },
  { from: 'orchestrator', to: 'knowledge', delay: 2 },
  { from: 'orchestrator', to: 'workflows', delay: 2.5 },
  { from: 'calls', to: 'chat', delay: 0.8 },
  { from: 'assistant', to: 'vision', delay: 1.2 },
  { from: 'knowledge', to: 'workflows', delay: 1.8 },
];

// Short "result" pills that tell the story of what each agent just did.
const EVENTS = [
  { agent: 'calls', text: 'Appointment booked', delay: 1 },
  { agent: 'vision', text: 'Invoice extracted', delay: 3 },
  { agent: 'chat', text: 'Ticket resolved', delay: 5 },
];

const DataPacket = ({ from, to, delay, color }) => (
  <motion.circle
    r={2.6}
    fill={color}
    filter="url(#packetGlow)"
    initial={{ cx: from.x, cy: from.y, opacity: 0 }}
    animate={{ cx: [from.x, to.x], cy: [from.y, to.y], opacity: [0, 1, 1, 0] }}
    transition={{ duration: 2.2, delay, repeat: Infinity, repeatDelay: 3.2, ease: 'easeInOut' }}
  />
);

const Connection = ({ from, to, delay, isDark, accent }) => (
  <g>
    <line
      x1={from.x} y1={from.y} x2={to.x} y2={to.y}
      stroke={isDark ? 'rgba(255,255,255,0.07)' : 'rgba(10,12,20,0.08)'}
      strokeWidth={1}
      strokeDasharray="2 4"
    />
    <motion.line
      x1={from.x} y1={from.y} x2={to.x} y2={to.y}
      stroke={accent}
      strokeOpacity={0.45}
      strokeWidth={1.2}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 1, 1], opacity: [0, 0.9, 0] }}
      transition={{ duration: 3, delay: delay + 0.5, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
    />
  </g>
);

const AgentNode = ({ agent, index, isDark, colors }) => {
  const { isCenter, icon: Icon } = agent;
  const s1 = seeded(index * 3 + 1);
  const s2 = seeded(index * 5 + 7);
  const iconSize = isCenter ? 24 : 18;

  const fill = isDark
    ? (isCenter ? 'rgba(34,211,238,0.12)' : '#101218')
    : (isCenter ? 'rgba(8,145,178,0.1)' : '#ffffff');
  const stroke = isCenter
    ? (isDark ? 'rgba(34,211,238,0.55)' : 'rgba(8,145,178,0.45)')
    : (isDark ? 'rgba(255,255,255,0.12)' : 'rgba(10,12,20,0.12)');

  return (
    <g>
      {isCenter && [0, 1].map((ring) => (
        <motion.circle
          key={ring}
          cx={agent.x} cy={agent.y} r={agent.size + 12}
          fill="none" stroke={colors.accent} strokeWidth={1}
          initial={{ scale: 1, opacity: 0.3 }}
          animate={{ scale: [1, 1.7], opacity: [0.3, 0] }}
          transition={{ duration: 3.2, delay: ring * 1.6, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      <motion.circle
        cx={agent.x} cy={agent.y} r={agent.size}
        fill={fill} stroke={stroke} strokeWidth={1}
        animate={{ scale: [1, isCenter ? 1.03 : 1.05, 1] }}
        transition={{ duration: isCenter ? 4 : 2.6 + s1, delay: s2 * 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Icon
        x={agent.x - iconSize / 2}
        y={agent.y - iconSize / 2}
        size={iconSize}
        strokeWidth={1.7}
        color={isCenter ? colors.accent : colors.textSecondary}
        aria-hidden="true"
      />

      <text
        x={agent.x}
        y={agent.y + agent.size + 18}
        textAnchor="middle"
        fill={isCenter ? colors.text : colors.textMuted}
        fontSize={isCenter ? 12 : 11}
        fontWeight={isCenter ? 600 : 500}
        fontFamily="inherit"
      >
        {agent.label}
      </text>
    </g>
  );
};

const EventPill = ({ agent, text, delay, colors, isDark }) => {
  const width = text.length * 5.6 + 30;
  const x = agent.x - width / 2;
  const y = agent.y - agent.size - 30;

  return (
    <motion.g
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: [0, 1, 1, 0], y: [4, 0, 0, -2] }}
      transition={{ duration: 2.6, delay, repeat: Infinity, repeatDelay: 4.4 }}
    >
      <rect
        x={x} y={y} width={width} height={20} rx={10}
        fill={isDark ? '#12151c' : '#ffffff'}
        stroke={isDark ? 'rgba(52,211,153,0.35)' : 'rgba(5,150,105,0.3)'}
      />
      <circle cx={x + 11} cy={y + 10} r={3} fill={colors.success} />
      <text x={x + 19} y={y + 13.5} fontSize={9.5} fontWeight={600} fill={colors.textSecondary} fontFamily="inherit">
        {text}
      </text>
    </motion.g>
  );
};

const AIAgentsAnimation = () => {
  const { isDark, colors } = useTheme();

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 640, margin: '0 auto', padding: '8px 12px 0' }}>
      <svg
        viewBox="0 0 600 420"
        fill="none"
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
        role="img"
        aria-label="An orchestrator agent coordinating voice calling, voice assistant, chat, vision, knowledge, and workflow agents"
      >
        <defs>
          <filter id="packetGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="agentsHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.accent} stopOpacity={isDark ? 0.14 : 0.1} />
            <stop offset="100%" stopColor={colors.accent} stopOpacity={0} />
          </radialGradient>
        </defs>

        <circle cx={300} cy={205} r={190} fill="url(#agentsHalo)" />

        {CONNECTIONS.map((c) => (
          <Connection
            key={`${c.from}-${c.to}`}
            from={AGENT_BY_ID[c.from]}
            to={AGENT_BY_ID[c.to]}
            delay={c.delay}
            isDark={isDark}
            accent={colors.accent}
          />
        ))}

        {CONNECTIONS.map((c) => (
          <DataPacket
            key={`packet-${c.from}-${c.to}`}
            from={AGENT_BY_ID[c.from]}
            to={AGENT_BY_ID[c.to]}
            delay={c.delay + 1}
            color={colors.accent}
          />
        ))}

        {AGENTS.map((agent, i) => (
          <AgentNode key={agent.id} agent={agent} index={i} isDark={isDark} colors={colors} />
        ))}

        {EVENTS.map((e) => (
          <EventPill
            key={e.agent}
            agent={AGENT_BY_ID[e.agent]}
            text={e.text}
            delay={e.delay}
            colors={colors}
            isDark={isDark}
          />
        ))}
      </svg>
    </div>
  );
};

export default AIAgentsAnimation;
