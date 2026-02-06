import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const AGENTS = [
  { id: 'orchestrator', label: 'Orchestrator', x: 300, y: 200, size: 44, isCenter: true },
  { id: 'data', label: 'Data Agent', x: 120, y: 80, size: 34 },
  { id: 'code', label: 'Code Agent', x: 480, y: 80, size: 34 },
  { id: 'analysis', label: 'Analysis', x: 520, y: 260, size: 34 },
  { id: 'deploy', label: 'Deploy', x: 80, y: 260, size: 34 },
  { id: 'monitor', label: 'Monitor', x: 180, y: 370, size: 30 },
  { id: 'optimize', label: 'Optimize', x: 420, y: 370, size: 30 },
];

const CONNECTIONS = [
  { from: 'orchestrator', to: 'data', delay: 0 },
  { from: 'orchestrator', to: 'code', delay: 0.5 },
  { from: 'orchestrator', to: 'analysis', delay: 1 },
  { from: 'orchestrator', to: 'deploy', delay: 1.5 },
  { from: 'orchestrator', to: 'monitor', delay: 2 },
  { from: 'orchestrator', to: 'optimize', delay: 2.5 },
  { from: 'data', to: 'analysis', delay: 0.8 },
  { from: 'code', to: 'deploy', delay: 1.2 },
  { from: 'monitor', to: 'optimize', delay: 1.8 },
];

const getAgent = (id) => AGENTS.find((a) => a.id === id);

const DataPacket = ({ fromAgent, toAgent, delay, accent }) => {
  const dx = toAgent.x - fromAgent.x;
  const dy = toAgent.y - fromAgent.y;

  return (
    <motion.circle
      r={3}
      fill={accent}
      filter="url(#packetGlow)"
      initial={{ cx: fromAgent.x, cy: fromAgent.y, opacity: 0 }}
      animate={{
        cx: [fromAgent.x, fromAgent.x + dx * 0.5, toAgent.x],
        cy: [fromAgent.y, fromAgent.y + dy * 0.5, toAgent.y],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
        ease: 'easeInOut',
      }}
    />
  );
};

const ConnectionLine = ({ from, to, delay, isDark }) => {
  const fromA = getAgent(from);
  const toA = getAgent(to);
  const lineColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  return (
    <g>
      <line
        x1={fromA.x} y1={fromA.y}
        x2={toA.x} y2={toA.y}
        stroke={lineColor}
        strokeWidth={1}
      />
      <motion.line
        x1={fromA.x} y1={fromA.y}
        x2={toA.x} y2={toA.y}
        stroke={isDark ? 'rgba(6,182,212,0.3)' : 'rgba(8,145,178,0.3)'}
        strokeWidth={1.5}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.8, 0.8, 0] }}
        transition={{
          duration: 3,
          delay: delay + 0.5,
          repeat: Infinity,
          repeatDelay: 2.5,
          ease: 'easeInOut',
        }}
      />
    </g>
  );
};

const AgentNode = ({ agent, isDark, colors }) => {
  const isCenter = agent.isCenter;
  const bgFill = isDark
    ? (isCenter ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.04)')
    : (isCenter ? 'rgba(8,145,178,0.12)' : 'rgba(0,0,0,0.03)');
  const borderStroke = isDark
    ? (isCenter ? 'rgba(6,182,212,0.5)' : 'rgba(255,255,255,0.1)')
    : (isCenter ? 'rgba(8,145,178,0.4)' : 'rgba(0,0,0,0.1)');

  return (
    <g>
      {isCenter && (
        <motion.circle
          cx={agent.x} cy={agent.y} r={agent.size + 12}
          fill="none"
          stroke={colors.accent}
          strokeWidth={1}
          opacity={0.15}
          animate={{ r: [agent.size + 12, agent.size + 24, agent.size + 12] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <motion.circle
        cx={agent.x} cy={agent.y} r={agent.size}
        fill={bgFill}
        stroke={borderStroke}
        strokeWidth={1}
        animate={{
          scale: isCenter ? [1, 1.04, 1] : [1, 1.06, 1],
        }}
        transition={{
          duration: isCenter ? 4 : 3,
          delay: isCenter ? 0 : Math.random() * 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformOrigin: `${agent.x}px ${agent.y}px` }}
      />

      <motion.circle
        cx={agent.x} cy={agent.y}
        r={4}
        fill={colors.accent}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 2,
          delay: Math.random() * 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <text
        x={agent.x}
        y={agent.y + agent.size + 18}
        textAnchor="middle"
        fill={colors.textMuted}
        fontSize={11}
        fontWeight={500}
        fontFamily="inherit"
      >
        {agent.label}
      </text>

      {isCenter && (
        <text
          x={agent.x}
          y={agent.y + agent.size + 32}
          textAnchor="middle"
          fill={colors.accent}
          fontSize={9}
          fontWeight={600}
          fontFamily="inherit"
          letterSpacing="0.08em"
        >
          ACTIVE
        </text>
      )}
    </g>
  );
};

const StatusIndicator = ({ agent, colors, delay }) => (
  <motion.g
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 1, 0] }}
    transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: 4 }}
  >
    <rect
      x={agent.x + agent.size * 0.5}
      y={agent.y - agent.size * 0.8}
      width={48}
      height={20}
      rx={10}
      fill={colors.accent}
      opacity={0.15}
    />
    <circle
      cx={agent.x + agent.size * 0.5 + 10}
      cy={agent.y - agent.size * 0.8 + 10}
      r={3}
      fill="#22c55e"
    />
    <text
      x={agent.x + agent.size * 0.5 + 18}
      y={agent.y - agent.size * 0.8 + 14}
      fontSize={8}
      fontWeight={600}
      fill={colors.textSecondary}
      fontFamily="inherit"
    >
      Running
    </text>
  </motion.g>
);

const AIAgentsAnimation = () => {
  const { isDark, colors } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute', inset: -40, zIndex: 0,
        background: isDark
          ? 'radial-gradient(circle at center, rgba(6,182,212,0.06) 0%, transparent 70%)'
          : 'radial-gradient(circle at center, rgba(8,145,178,0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
      }} />

      <svg
        viewBox="0 0 600 430"
        fill="none"
        style={{ width: '100%', height: 'auto', position: 'relative', zIndex: 1 }}
      >
        <defs>
          <filter id="packetGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {CONNECTIONS.map((conn) => (
          <ConnectionLine
            key={`${conn.from}-${conn.to}`}
            from={conn.from}
            to={conn.to}
            delay={conn.delay}
            isDark={isDark}
          />
        ))}

        {CONNECTIONS.map((conn) => (
          <DataPacket
            key={`packet-${conn.from}-${conn.to}`}
            fromAgent={getAgent(conn.from)}
            toAgent={getAgent(conn.to)}
            delay={conn.delay + 1}
            accent={colors.accent}
          />
        ))}

        {AGENTS.map((agent) => (
          <AgentNode
            key={agent.id}
            agent={agent}
            isDark={isDark}
            colors={colors}
          />
        ))}

        {AGENTS.filter((a) => !a.isCenter).slice(0, 3).map((agent, i) => (
          <StatusIndicator
            key={`status-${agent.id}`}
            agent={agent}
            colors={colors}
            delay={i * 2 + 1}
          />
        ))}
      </svg>
    </motion.div>
  );
};

export default AIAgentsAnimation;
