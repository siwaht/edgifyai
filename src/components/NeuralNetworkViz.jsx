import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const seed = (s) => {
  const x = Math.sin(s * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

// 5-layer agent pipeline mapped to neural network layers
const LAYERS = [
  {
    x: 80, count: 4, r: 9,
    label: 'User Input',
    tags: ['Voice', 'Text', 'API', 'Event'],
    color: '#06b6d4',
  },
  {
    x: 250, count: 6, r: 11,
    label: 'Context & Memory',
    tags: ['RAG', 'Short-term', 'Long-term', 'Knowledge', 'History', 'Embeddings'],
    color: '#8b5cf6',
  },
  {
    x: 430, count: 6, r: 11,
    label: 'Reasoning & Planning',
    tags: ['Chain-of-thought', 'Tool selection', 'Goal decomp', 'A2A routing', 'Guardrails', 'Evaluation'],
    color: '#14b8a6',
  },
  {
    x: 610, count: 5, r: 10,
    label: 'Skill Execution',
    tags: ['MCP tools', 'Code exec', 'Web browse', 'DB query', 'API call'],
    color: '#f59e0b',
  },
  {
    x: 770, count: 3, r: 9,
    label: 'Agent Output',
    tags: ['Response', 'Action', 'Escalation'],
    color: '#10b981',
  },
];

const buildNodes = () => {
  const nodes = [];
  LAYERS.forEach((layer, li) => {
    const totalH = (layer.count - 1) * 50;
    const startY = 195 - totalH / 2;
    for (let ni = 0; ni < layer.count; ni++) {
      nodes.push({
        id: `${li}-${ni}`,
        x: layer.x,
        y: startY + ni * 50,
        layer: li,
        r: layer.r,
        tag: layer.tags[ni] || '',
        color: layer.color,
      });
    }
  });
  return nodes;
};

const buildEdges = (nodes) => {
  const edges = [];
  const layerCount = LAYERS.length;
  for (let li = 0; li < layerCount - 1; li++) {
    const from = nodes.filter((n) => n.layer === li);
    const to = nodes.filter((n) => n.layer === li + 1);
    // Connect each node to 2-3 nodes in next layer (not fully connected — cleaner look)
    from.forEach((f, fi) => {
      to.forEach((t, ti) => {
        // Connect if indices are close, or with some deterministic spread
        const dist = Math.abs(fi / from.length - ti / to.length);
        if (dist < 0.45 || seed(fi * 7 + ti * 13 + li * 31) > 0.6) {
          edges.push({ from: f, to: t, id: `${f.id}-${t.id}` });
        }
      });
    });
  }
  return edges;
};

const NODES = buildNodes();
const EDGES = buildEdges(NODES);

const Neuron = ({ node, isDark, colors }) => {
  const s1 = seed(node.x * 7 + node.y * 13);
  const fill = isDark ? `${node.color}1a` : `${node.color}12`;
  const stroke = isDark ? `${node.color}55` : `${node.color}40`;

  return (
    <g>
      <motion.circle
        cx={node.x} cy={node.y} r={node.r}
        fill={fill} stroke={stroke} strokeWidth={1}
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{
          duration: 2 + s1 * 2,
          delay: s1 * 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.circle
        cx={node.x} cy={node.y}
        r={node.r * 0.35}
        fill={node.color}
        animate={{ opacity: [0.3, 0.9, 0.3] }}
        transition={{
          duration: 1.8 + s1 * 1.5,
          delay: s1 * 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Node tag label */}
      {node.tag && (
        <text
          x={node.x + node.r + 6}
          y={node.y + 4}
          fill={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)'}
          fontSize={8}
          fontFamily="inherit"
          fontWeight={500}
        >
          {node.tag}
        </text>
      )}
    </g>
  );
};

const SignalPulse = ({ edge, index, colors }) => {
  const d = seed(index * 17 + 3);
  const fromLayer = LAYERS[edge.from.layer];
  return (
    <motion.circle
      r={2}
      fill={fromLayer.color}
      filter="url(#nnGlow)"
      initial={{ cx: edge.from.x, cy: edge.from.y, opacity: 0 }}
      animate={{
        cx: [edge.from.x, edge.to.x],
        cy: [edge.from.y, edge.to.y],
        opacity: [0, 0.85, 0.85, 0],
      }}
      transition={{
        duration: 1.4,
        delay: d * 5 + index * 0.06,
        repeat: Infinity,
        repeatDelay: 3 + d * 5,
        ease: 'easeInOut',
      }}
    />
  );
};

const NeuralNetworkViz = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const { isDark, colors } = useTheme();

  const animatedEdges = EDGES.filter((_, i) => i % 3 === 0);

  return (
    <section ref={ref} id="how-it-works" style={{
      padding: '80px 20px 40px',
      background: isDark ? '#0d0d14' : '#f8fafc',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 300, borderRadius: '50%',
        background: isDark ? 'rgba(6,182,212,0.04)' : 'rgba(8,145,178,0.03)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: 40 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', fontSize: 12, fontWeight: 600,
            letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: 100,
            background: isDark ? 'rgba(139,92,246,0.12)' : 'rgba(124,58,237,0.08)',
            color: isDark ? '#a78bfa' : '#7c3aed',
            marginBottom: 20,
          }}>Agent Pipeline</span>
          <h2 className="font-display" style={{
            fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700,
            color: colors.text, marginBottom: 12,
          }}>
            From Input to Intelligent Action
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 2vw, 16px)', color: colors.textSecondary,
            maxWidth: 520, margin: '0 auto', lineHeight: 1.7,
          }}>
            Every request flows through memory retrieval, reasoning, tool selection, and execution — just like a neural network, but built for real-world agent tasks.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative' }}
        >
          <svg
            viewBox="0 0 850 420"
            fill="none"
            style={{ width: '100%', height: 'auto' }}
            role="img"
            aria-label="AI agent pipeline visualization showing data flowing from user input through memory, reasoning, skill execution, to agent output"
          >
            <defs>
              <filter id="nnGlow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Static edges */}
            {EDGES.map((edge) => (
              <line
                key={edge.id}
                x1={edge.from.x} y1={edge.from.y}
                x2={edge.to.x} y2={edge.to.y}
                stroke={isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)'}
                strokeWidth={0.8}
              />
            ))}

            {/* Animated signals */}
            {animatedEdges.map((edge, i) => (
              <SignalPulse key={`sig-${edge.id}`} edge={edge} index={i} colors={colors} />
            ))}

            {/* Nodes */}
            {NODES.map((node) => (
              <Neuron key={node.id} node={node} isDark={isDark} colors={colors} />
            ))}

            {/* Layer labels with colored accent */}
            {LAYERS.map((layer) => (
              <g key={layer.label}>
                {/* Colored dot before label */}
                <circle
                  cx={layer.x - 4}
                  cy={390}
                  r={3}
                  fill={layer.color}
                  opacity={0.6}
                />
                <text
                  x={layer.x + 6}
                  y={393}
                  textAnchor="start"
                  fill={colors.textMuted}
                  fontSize={9}
                  fontWeight={600}
                  fontFamily="inherit"
                  letterSpacing="0.04em"
                >
                  {layer.label.toUpperCase()}
                </text>
              </g>
            ))}

            {/* Flow arrows between layers */}
            {LAYERS.slice(0, -1).map((layer, i) => {
              const nextX = LAYERS[i + 1].x;
              const midX = (layer.x + nextX) / 2;
              return (
                <motion.g
                  key={`arrow-${i}`}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 0.25 } : {}}
                  transition={{ delay: 0.5 + i * 0.15 }}
                >
                  <line
                    x1={midX - 8} y1={405}
                    x2={midX + 8} y2={405}
                    stroke={colors.textMuted}
                    strokeWidth={1}
                  />
                  <polygon
                    points={`${midX + 8},402 ${midX + 14},405 ${midX + 8},408`}
                    fill={colors.textMuted}
                  />
                </motion.g>
              );
            })}
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default NeuralNetworkViz;
