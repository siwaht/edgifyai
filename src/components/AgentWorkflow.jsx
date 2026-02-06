import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Neural network node positions — spread across the SVG canvas
const NODES = [
  // Core layer (center)
  { id: 0, x: 400, y: 200, r: 18, layer: 'core' },
  // Inner ring
  { id: 1, x: 250, y: 120, r: 10, layer: 'inner' },
  { id: 2, x: 550, y: 120, r: 10, layer: 'inner' },
  { id: 3, x: 200, y: 260, r: 10, layer: 'inner' },
  { id: 4, x: 600, y: 260, r: 10, layer: 'inner' },
  { id: 5, x: 320, y: 330, r: 10, layer: 'inner' },
  { id: 6, x: 480, y: 330, r: 10, layer: 'inner' },
  // Outer ring
  { id: 7, x: 100, y: 80, r: 6, layer: 'outer' },
  { id: 8, x: 400, y: 50, r: 6, layer: 'outer' },
  { id: 9, x: 700, y: 80, r: 6, layer: 'outer' },
  { id: 10, x: 80, y: 200, r: 6, layer: 'outer' },
  { id: 11, x: 720, y: 200, r: 6, layer: 'outer' },
  { id: 12, x: 100, y: 340, r: 6, layer: 'outer' },
  { id: 13, x: 700, y: 340, r: 6, layer: 'outer' },
  { id: 14, x: 250, y: 380, r: 6, layer: 'outer' },
  { id: 15, x: 550, y: 380, r: 6, layer: 'outer' },
  { id: 16, x: 400, y: 400, r: 6, layer: 'outer' },
];

// Connections between nodes
const EDGES = [
  // Core to inner
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  // Inner to inner
  [1, 2], [3, 5], [5, 6], [6, 4], [1, 3],  [2, 4],
  // Inner to outer
  [1, 7], [1, 8], [2, 8], [2, 9], [3, 10], [3, 12],
  [4, 11], [4, 13], [5, 14], [5, 12], [6, 15], [6, 13],
  [5, 16], [6, 16],
  // Outer to outer
  [7, 10], [9, 11], [12, 14], [13, 15], [14, 16], [15, 16],
];

const getNode = (id) => NODES[id];

const Edge = ({ from, to, index, isDark }) => {
  const a = getNode(from);
  const b = getNode(to);
  const baseColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';

  return (
    <line
      x1={a.x} y1={a.y} x2={b.x} y2={b.y}
      stroke={baseColor}
      strokeWidth={1}
    />
  );
};

// Seeded pseudo-random for stable values across renders
const seeded = (seed) => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

// Animated signal that travels along an edge
const Signal = ({ from, to, delay, accent, seed }) => {
  const a = getNode(from);
  const b = getNode(to);

  return (
    <motion.circle
      r={2.5}
      fill={accent}
      filter="url(#signalGlow)"
      initial={{ cx: a.x, cy: a.y, opacity: 0 }}
      animate={{
        cx: [a.x, b.x],
        cy: [a.y, b.y],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 1.8,
        delay,
        repeat: Infinity,
        repeatDelay: 4 + seeded(seed + 100) * 3,
        ease: 'easeInOut',
      }}
    />
  );
};

// Animated edge that lights up
const ActiveEdge = ({ from, to, delay, isDark, seed }) => {
  const a = getNode(from);
  const b = getNode(to);
  const glowColor = isDark ? 'rgba(6,182,212,0.25)' : 'rgba(8,145,178,0.2)';

  return (
    <motion.line
      x1={a.x} y1={a.y} x2={b.x} y2={b.y}
      stroke={glowColor}
      strokeWidth={1.5}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.7, 0.7, 0] }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        repeatDelay: 3 + seeded(seed + 200) * 4,
        ease: 'easeInOut',
      }}
    />
  );
};

const Node = ({ node, isDark, colors }) => {
  const isCore = node.layer === 'core';
  const isInner = node.layer === 'inner';
  const s1 = seeded(node.id + 50);
  const s2 = seeded(node.id + 80);

  const fill = isDark
    ? isCore ? 'rgba(6,182,212,0.2)' : isInner ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)'
    : isCore ? 'rgba(8,145,178,0.15)' : isInner ? 'rgba(0,0,0,0.04)' : 'rgba(0,0,0,0.03)';

  const stroke = isDark
    ? isCore ? 'rgba(6,182,212,0.5)' : isInner ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'
    : isCore ? 'rgba(8,145,178,0.4)' : isInner ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.05)';

  return (
    <g>
      {isCore && (
        <motion.circle
          cx={node.x} cy={node.y} r={node.r + 8}
          fill="none" stroke={colors.accent} strokeWidth={1} opacity={0.12}
          animate={{ r: [node.r + 8, node.r + 22, node.r + 8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <motion.circle
        cx={node.x} cy={node.y} r={node.r}
        fill={fill} stroke={stroke} strokeWidth={1}
        animate={isCore
          ? { scale: [1, 1.06, 1] }
          : { opacity: [0.7, 1, 0.7] }
        }
        transition={{
          duration: isCore ? 3 : 2 + s1 * 2,
          delay: s2 * 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformOrigin: `${node.x}px ${node.y}px` }}
      />

      <motion.circle
        cx={node.x} cy={node.y}
        r={isCore ? 5 : isInner ? 3 : 2}
        fill={isCore ? colors.accent : isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)'}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 2.5,
          delay: s1 * 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Core label */}
      {isCore && (
        <>
          <text
            x={node.x} y={node.y + node.r + 28}
            textAnchor="middle" fill={colors.textMuted}
            fontSize={11} fontWeight={600} fontFamily="inherit"
            letterSpacing="0.06em"
          >
            AI AGENT
          </text>
          <motion.text
            x={node.x} y={node.y + node.r + 42}
            textAnchor="middle" fill={colors.accent}
            fontSize={9} fontWeight={600} fontFamily="inherit"
            letterSpacing="0.08em"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            PROCESSING
          </motion.text>
        </>
      )}
    </g>
  );
};

const AgentWorkflow = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { isDark, colors } = useTheme();

  // Pre-compute signal delays so they're stable across renders
  const signalDelays = useMemo(
    () => EDGES.map((_, i) => i * 0.3 + seeded(i) * 2),
    []
  );

  return (
    <section ref={ref} style={{
      padding: '80px 20px',
      background: colors.bgAlt,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 400, borderRadius: '50%',
        background: isDark ? 'rgba(6,182,212,0.05)' : 'rgba(8,145,178,0.03)',
        filter: 'blur(120px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: 48 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', fontSize: 12, fontWeight: 600,
            letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: 100,
            background: colors.accentMuted, color: colors.accent, marginBottom: 20,
          }}>How It Works</span>
          <h2 className="font-display" style={{
            fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700,
            color: colors.text, marginBottom: 16,
          }}>
            Intelligence at Work
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)', color: colors.textSecondary,
            maxWidth: 520, margin: '0 auto', lineHeight: 1.7,
          }}>
            Our AI agents coordinate across a neural network of specialized nodes to analyze, plan, and execute your tasks.
          </p>
        </motion.div>

        {/* Neural network animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%', maxWidth: 800, margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* Radial glow behind the network */}
          <div style={{
            position: 'absolute', inset: -60, zIndex: 0,
            background: isDark
              ? 'radial-gradient(circle at center, rgba(6,182,212,0.06) 0%, transparent 65%)'
              : 'radial-gradient(circle at center, rgba(8,145,178,0.04) 0%, transparent 65%)',
            borderRadius: '50%', filter: 'blur(40px)',
          }} />

          <svg
            viewBox="0 0 800 450"
            fill="none"
            style={{ width: '100%', height: 'auto', position: 'relative', zIndex: 1 }}
            role="img"
            aria-label="Neural network animation showing AI agent processing"
          >
            <defs>
              <filter id="signalGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={colors.accent} stopOpacity="0.3" />
                <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Core ambient glow */}
            <circle cx={400} cy={200} r={60} fill="url(#coreGradient)" />

            {/* Static edges */}
            {EDGES.map(([from, to], i) => (
              <Edge key={`e-${i}`} from={from} to={to} index={i} isDark={isDark} />
            ))}

            {/* Animated edges */}
            {EDGES.map(([from, to], i) => (
              <ActiveEdge
                key={`ae-${i}`}
                from={from} to={to}
                delay={signalDelays[i]}
                isDark={isDark}
                seed={i}
              />
            ))}

            {/* Traveling signals */}
            {EDGES.map(([from, to], i) => (
              <Signal
                key={`s-${i}`}
                from={from} to={to}
                delay={signalDelays[i] + 0.5}
                accent={colors.accent}
                seed={i}
              />
            ))}

            {/* Nodes */}
            {NODES.map((node) => (
              <Node key={node.id} node={node} isDark={isDark} colors={colors} />
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default AgentWorkflow;
