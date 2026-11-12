import { motion } from 'framer-motion';
import { useTheme } from '../context/theme';

const LAYERS = [
  { label: 'Listen', nodes: 3, color: '#06b6d4' },
  { label: 'Remember', nodes: 4, color: '#3b82f6' },
  { label: 'Reason', nodes: 5, color: '#f59e0b' },
  { label: 'Act', nodes: 4, color: '#10b981' },
  { label: 'Reply', nodes: 3, color: '#14b8a6' },
];

const NODE_R = 10;
const H_SPACING = 110;
const V_SPACING = 44;
const PADDING_X = 40;
const PADDING_Y = 30;

const getNodes = () =>
  LAYERS.flatMap((layer, li) => {
    const count = layer.nodes;
    const totalH = (count - 1) * V_SPACING;
    return Array.from({ length: count }, (_, ni) => ({
      x: PADDING_X + li * H_SPACING,
      y: PADDING_Y + (LAYERS.reduce((m, l) => Math.max(m, l.nodes), 0) * V_SPACING) / 2 - totalH / 2 + ni * V_SPACING,
      layer: li,
      index: ni,
      color: layer.color,
      label: layer.label,
      id: `${li}-${ni}`,
    }));
  });

const getEdges = () => {
  const nodes = getNodes();
  const edges: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
  for (let li = 0; li < LAYERS.length - 1; li++) {
    const fromNodes = nodes.filter((n) => n.layer === li);
    const toNodes = nodes.filter((n) => n.layer === li + 1);
    fromNodes.forEach((from, fi) => {
      toNodes.forEach((to, ti) => {
        if (Math.abs(fi - ti) <= 2) {
          edges.push({ x1: from.x, y1: from.y, x2: to.x, y2: to.y, delay: (li * 3 + fi * 0.5 + ti * 0.3) % 4 });
        }
      });
    });
  }
  return edges;
};

const NeuralNetworkViz = () => {
  const { isDark, colors } = useTheme();
  const allNodes = getNodes();
  const edges = getEdges();
  const maxNodes = Math.max(...LAYERS.map((l) => l.nodes));
  const svgH = PADDING_Y * 2 + maxNodes * V_SPACING;
  const svgW = PADDING_X * 2 + (LAYERS.length - 1) * H_SPACING;

  return (
    <div>
      <p style={{ color: colors.textMuted, fontSize: '0.75rem', textAlign: 'center', marginBottom: '16px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        Listen · Remember · Reason · Act · Reply
      </p>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" style={{ display: 'block' }}>
        {/* Edges */}
        {edges.map((edge, i) => (
          <motion.line
            key={i}
            x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2}
            stroke={isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}
            strokeWidth={0.8}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: edge.delay * 0.15, duration: 0.5 }}
          />
        ))}

        {/* Animated data pulses */}
        {edges.filter((_, i) => i % 3 === 0).map((edge, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r={2.5}
            fill={LAYERS[Math.floor(i / 4) % LAYERS.length].color}
            opacity={0.8}
            initial={{ cx: edge.x1, cy: edge.y1, opacity: 0 }}
            animate={{
              cx: [edge.x1, edge.x2],
              cy: [edge.y1, edge.y2],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.4,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Nodes */}
        {allNodes.map((node) => (
          <motion.g key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: node.layer * 0.1 + node.index * 0.05, duration: 0.4, ease: 'backOut' }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            <circle cx={node.x} cy={node.y} r={NODE_R + 4} fill={node.color} opacity={0.08} />
            <circle cx={node.x} cy={node.y} r={NODE_R} fill={node.color} opacity={0.85} />
            <circle cx={node.x} cy={node.y} r={NODE_R * 0.45} fill={isDark ? '#0a0a0f' : '#ffffff'} opacity={0.7} />
          </motion.g>
        ))}

        {/* Layer labels */}
        {LAYERS.map((layer, li) => (
          <text
            key={li}
            x={PADDING_X + li * H_SPACING}
            y={svgH - 6}
            textAnchor="middle"
            fontSize={8}
            fill={layer.color}
            fontFamily="Inter, sans-serif"
            fontWeight="600"
            opacity={0.85}
          >
            {layer.label}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default NeuralNetworkViz;
