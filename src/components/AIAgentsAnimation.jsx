import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateGraph() {
  const rng = seededRandom(42);
  const W = 700;
  const H = 420;
  const cx = W / 2;
  const cy = H / 2;

  const clusters = [
    { x: cx, y: cy, r: 30, count: 5, label: 'Reasoning', tier: 0 },
    { x: 160, y: 110, r: 60, count: 6, label: 'Retrieval', tier: 1 },
    { x: 540, y: 100, r: 55, count: 5, label: 'Embedding', tier: 1 },
    { x: 120, y: 310, r: 50, count: 5, label: 'Memory', tier: 1 },
    { x: 560, y: 300, r: 55, count: 5, label: 'Inference', tier: 1 },
    { x: 350, y: 60, r: 45, count: 4, label: 'Tokenizer', tier: 2 },
    { x: 350, y: 370, r: 45, count: 4, label: 'Output', tier: 2 },
    { x: 50, y: 200, r: 35, count: 3, label: 'Index', tier: 2 },
    { x: 650, y: 200, r: 35, count: 3, label: 'Cache', tier: 2 },
  ];

  const nodes = [];
  const edges = [];

  clusters.forEach((cluster, ci) => {
    const clusterNodes = [];
    for (let i = 0; i < cluster.count; i++) {
      const angle = (i / cluster.count) * Math.PI * 2 + rng() * 0.6;
      const dist = cluster.r * (0.3 + rng() * 0.7);
      const size = cluster.tier === 0 ? 4 + rng() * 3 : cluster.tier === 1 ? 2.5 + rng() * 2.5 : 1.5 + rng() * 2;
      const node = {
        id: nodes.length,
        x: cluster.x + Math.cos(angle) * dist,
        y: cluster.y + Math.sin(angle) * dist,
        size,
        cluster: ci,
        tier: cluster.tier,
      };
      clusterNodes.push(node);
      nodes.push(node);
    }

    for (let i = 0; i < clusterNodes.length; i++) {
      for (let j = i + 1; j < clusterNodes.length; j++) {
        if (rng() < 0.55) {
          edges.push({ from: clusterNodes[i].id, to: clusterNodes[j].id, intra: true });
        }
      }
    }
  });

  const clusterCenters = clusters.map((c, ci) => {
    const cNodes = nodes.filter((n) => n.cluster === ci);
    return { ci, x: cNodes.reduce((s, n) => s + n.x, 0) / cNodes.length, y: cNodes.reduce((s, n) => s + n.y, 0) / cNodes.length };
  });

  for (let i = 0; i < clusters.length; i++) {
    for (let j = i + 1; j < clusters.length; j++) {
      const dx = clusterCenters[i].x - clusterCenters[j].x;
      const dy = clusterCenters[i].y - clusterCenters[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 350) {
        const nodesA = nodes.filter((n) => n.cluster === i);
        const nodesB = nodes.filter((n) => n.cluster === j);
        const count = dist < 200 ? 2 : 1;
        for (let k = 0; k < count; k++) {
          const a = nodesA[Math.floor(rng() * nodesA.length)];
          const b = nodesB[Math.floor(rng() * nodesB.length)];
          edges.push({ from: a.id, to: b.id, intra: false });
        }
      }
    }
  }

  return { nodes, edges, clusters };
}

const GRAPH = generateGraph();

const SignalPulse = ({ edge, nodes, delay, accent }) => {
  const from = nodes[edge.from];
  const to = nodes[edge.to];
  const mx = (from.x + to.x) / 2 + (Math.random() - 0.5) * 10;
  const my = (from.y + to.y) / 2 + (Math.random() - 0.5) * 10;

  return (
    <motion.circle
      r={2}
      fill={accent}
      filter="url(#signalGlow)"
      initial={{ cx: from.x, cy: from.y, opacity: 0 }}
      animate={{
        cx: [from.x, mx, to.x],
        cy: [from.y, my, to.y],
        opacity: [0, 0.9, 0.9, 0],
      }}
      transition={{
        duration: 1.8 + Math.random() * 0.8,
        delay,
        repeat: Infinity,
        repeatDelay: 4 + Math.random() * 6,
        ease: 'easeInOut',
      }}
    />
  );
};

const AIAgentsAnimation = () => {
  const { isDark, colors } = useTheme();

  const signalEdges = useMemo(() => {
    const rng = seededRandom(99);
    return GRAPH.edges
      .filter(() => rng() < 0.4)
      .map((e, i) => ({ ...e, delay: i * 0.3 + rng() * 2 }));
  }, []);

  const edgeColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
  const edgeHighlight = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
  const labelColor = isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.18)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: '100%', maxWidth: 700, margin: '0 auto', position: 'relative' }}
    >
      <div style={{
        position: 'absolute', inset: -60, zIndex: 0,
        background: isDark
          ? 'radial-gradient(ellipse 60% 50% at center, rgba(6,182,212,0.07) 0%, transparent 70%)'
          : 'radial-gradient(ellipse 60% 50% at center, rgba(8,145,178,0.05) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} />

      <svg
        viewBox="0 0 700 420"
        fill="none"
        style={{ width: '100%', height: 'auto', position: 'relative', zIndex: 1 }}
      >
        <defs>
          <filter id="signalGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.accent} stopOpacity={isDark ? 0.2 : 0.15} />
            <stop offset="100%" stopColor={colors.accent} stopOpacity={0} />
          </radialGradient>
        </defs>

        <circle cx={350} cy={210} r={120} fill="url(#centerGrad)" />

        {GRAPH.edges.map((e, i) => {
          const from = GRAPH.nodes[e.from];
          const to = GRAPH.nodes[e.to];
          return (
            <line
              key={`e-${i}`}
              x1={from.x} y1={from.y}
              x2={to.x} y2={to.y}
              stroke={e.intra ? edgeHighlight : edgeColor}
              strokeWidth={e.intra ? 0.8 : 0.5}
            />
          );
        })}

        {signalEdges.map((e, i) => (
          <SignalPulse
            key={`sig-${i}`}
            edge={e}
            nodes={GRAPH.nodes}
            delay={e.delay}
            accent={colors.accent}
          />
        ))}

        {GRAPH.nodes.map((node) => {
          const isCore = node.tier === 0;
          const isPrimary = node.tier === 1;
          const fill = isCore
            ? colors.accent
            : isPrimary
              ? (isDark ? 'rgba(6,182,212,0.6)' : 'rgba(8,145,178,0.5)')
              : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)');

          return (
            <g key={`n-${node.id}`}>
              {isCore && (
                <motion.circle
                  cx={node.x} cy={node.y} r={node.size + 6}
                  fill={colors.accent}
                  opacity={0.1}
                  filter="url(#nodeGlow)"
                  animate={{ r: [node.size + 6, node.size + 12, node.size + 6], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 3 + Math.random(), repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <motion.circle
                cx={node.x} cy={node.y}
                r={node.size}
                fill={fill}
                animate={
                  isCore
                    ? { opacity: [0.7, 1, 0.7] }
                    : isPrimary
                      ? { opacity: [0.5, 0.8, 0.5] }
                      : { opacity: [0.3, 0.6, 0.3] }
                }
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </g>
          );
        })}

        {GRAPH.clusters.map((cluster, i) => (
          <text
            key={`label-${i}`}
            x={cluster.x}
            y={cluster.y + cluster.r + 18}
            textAnchor="middle"
            fill={labelColor}
            fontSize={9}
            fontWeight={500}
            fontFamily="inherit"
            letterSpacing="0.1em"
            style={{ textTransform: 'uppercase' }}
          >
            {cluster.label}
          </text>
        ))}

        {[0, 1, 2].map((i) => {
          const activeClusters = [0, 1, 3];
          const cluster = GRAPH.clusters[activeClusters[i]];
          return (
            <motion.circle
              key={`pulse-${i}`}
              cx={cluster.x} cy={cluster.y}
              r={cluster.r * 0.8}
              fill="none"
              stroke={colors.accent}
              strokeWidth={0.5}
              initial={{ r: 5, opacity: 0.5 }}
              animate={{ r: [5, cluster.r * 1.2], opacity: [0.4, 0] }}
              transition={{
                duration: 3,
                delay: i * 2.5 + 1,
                repeat: Infinity,
                repeatDelay: 5,
                ease: 'easeOut',
              }}
            />
          );
        })}
      </svg>
    </motion.div>
  );
};

export default AIAgentsAnimation;
