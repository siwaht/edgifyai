import { motion } from 'framer-motion';
import { useTheme } from '../context/theme';

const seeded = (s: number) => {
  const x = Math.sin(s * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

const AGENTS = [
  { id: 'orchestrator', label: 'Orchestrator', x: 300, y: 200, size: 44, isCenter: true },
  { id: 'voice', label: 'Voice', x: 120, y: 80, size: 34 },
  { id: 'chat', label: 'Chat', x: 480, y: 80, size: 34 },
  { id: 'vision', label: 'Vision', x: 520, y: 260, size: 34 },
  { id: 'browser', label: 'Browser', x: 80, y: 260, size: 34 },
  { id: 'memory', label: 'Memory', x: 180, y: 370, size: 30 },
  { id: 'evals', label: 'Evals', x: 420, y: 370, size: 30 },
];

const CONNECTIONS = [
  { from: 'orchestrator', to: 'voice', delay: 0 },
  { from: 'orchestrator', to: 'chat', delay: 0.5 },
  { from: 'orchestrator', to: 'vision', delay: 1 },
  { from: 'orchestrator', to: 'browser', delay: 1.5 },
  { from: 'orchestrator', to: 'memory', delay: 2 },
  { from: 'orchestrator', to: 'evals', delay: 2.5 },
  { from: 'voice', to: 'vision', delay: 0.8 },
  { from: 'chat', to: 'browser', delay: 1.2 },
  { from: 'memory', to: 'evals', delay: 1.8 },
];

const getAgent = (id: string) => AGENTS.find((a) => a.id === id)!;

interface DataPacketProps {
  fromAgent: typeof AGENTS[0];
  toAgent: typeof AGENTS[0];
  delay: number;
  accent: string;
}

const DataPacket = ({ fromAgent, toAgent, delay, accent }: DataPacketProps) => (
  <motion.circle
    r={3}
    fill={accent}
    opacity={0.9}
    initial={{ cx: fromAgent.x, cy: fromAgent.y, opacity: 0 }}
    animate={{
      cx: [fromAgent.x, toAgent.x],
      cy: [fromAgent.y, toAgent.y],
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration: 1.8,
      delay: delay,
      repeat: Infinity,
      repeatDelay: 3,
      ease: 'easeInOut',
    }}
  />
);

interface ConnectionLineProps {
  from: string;
  to: string;
  delay: number;
  isDark: boolean;
}

const ConnectionLine = ({ from, to, delay, isDark }: ConnectionLineProps) => {
  const fromA = getAgent(from);
  const toA = getAgent(to);
  return (
    <motion.line
      x1={fromA.x} y1={fromA.y}
      x2={toA.x} y2={toA.y}
      stroke={isDark ? 'rgba(34,211,238,0.18)' : 'rgba(8,145,178,0.18)'}
      strokeWidth={1}
      strokeDasharray="4 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1, delay: delay * 0.3, ease: 'easeOut' }}
    />
  );
};

interface AgentNodeProps {
  agent: typeof AGENTS[0];
  index: number;
  isDark: boolean;
  colors: { accent: string; text: string; textSecondary: string };
}

const AgentNode = ({ agent, index, isDark, colors }: AgentNodeProps) => {
  const isCenter = agent.isCenter;
  const s1 = seeded(index * 3 + 1) * 6 - 3;
  const s2 = seeded(index * 5 + 7) * 6 - 3;

  const bgFill = isDark
    ? (isCenter ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.04)')
    : (isCenter ? 'rgba(8,145,178,0.12)' : 'rgba(0,0,0,0.03)');

  const borderStroke = isDark
    ? (isCenter ? 'rgba(6,182,212,0.5)' : 'rgba(255,255,255,0.1)')
    : (isCenter ? 'rgba(8,145,178,0.4)' : 'rgba(0,0,0,0.1)');

  return (
    <motion.g
      animate={{ y: [0, s1, 0], x: [0, s2, 0] }}
      transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {isCenter && (
        <motion.circle
          cx={agent.x} cy={agent.y} r={agent.size + 14}
          fill="none"
          stroke={colors.accent}
          strokeWidth={1}
          initial={{ scale: 1, opacity: 0.15 }}
          animate={{ scale: [1, 1.6], opacity: [0.15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <circle
        cx={agent.x} cy={agent.y} r={agent.size}
        fill={bgFill}
        stroke={borderStroke}
        strokeWidth={isCenter ? 1.5 : 1}
      />
      <text
        x={agent.x} y={agent.y + 5}
        textAnchor="middle"
        fontSize={isCenter ? 11 : 9}
        fill={isCenter ? colors.accent : (isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)')}
        fontFamily="Inter, sans-serif"
        fontWeight={isCenter ? '600' : '400'}
      >
        {agent.label}
      </text>
      {isCenter && (
        <text
          x={agent.x} y={agent.y + 18}
          textAnchor="middle"
          fontSize={7}
          fill={colors.accent}
          fontFamily="Inter, sans-serif"
          fontWeight="500"
          opacity={0.7}
        >
          ACTIVE
        </text>
      )}
    </motion.g>
  );
};

const AIAgentsAnimation = () => {
  const { isDark, colors } = useTheme();

  return (
    <svg
      viewBox="0 0 600 450"
      width="100%"
      height="100%"
      style={{ maxWidth: 600 }}
    >
      {/* Connection lines */}
      {CONNECTIONS.map((conn, i) => (
        <ConnectionLine key={i} from={conn.from} to={conn.to} delay={conn.delay} isDark={isDark} />
      ))}
      {/* Data packets */}
      {CONNECTIONS.map((conn, i) => (
        <DataPacket
          key={i}
          fromAgent={getAgent(conn.from)}
          toAgent={getAgent(conn.to)}
          delay={conn.delay}
          accent={colors.accent}
        />
      ))}
      {/* Agent nodes */}
      {AGENTS.map((agent, i) => (
        <AgentNode key={agent.id} agent={agent} index={i} isDark={isDark} colors={colors} />
      ))}
    </svg>
  );
};

export default AIAgentsAnimation;
