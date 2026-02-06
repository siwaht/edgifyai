import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Deterministic pseudo-random
const seed = (s) => {
  const x = Math.sin(s * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

// 4-layer neural network: input(5) → hidden1(7) → hidden2(7) → output(4)
const LAYER_X = [100, 300, 500, 700];
const LAYER_SIZES = [5, 7, 7, 4];
const LAYER_LABELS = ['Input', 'Processing', 'Reasoning', 'Output'];

const buildNodes = () => {
  const nodes = [];
  LAYER_SIZES.forEach((count, li) => {
    const totalH = (count - 1) * 48;
    const startY = 200 - totalH / 2;
    for (let ni = 0; ni < count; ni++) {
      nodes.push({
        id: `${li}-${ni}`,
        x: LAYER_X[li],
        y: startY + ni * 48,
        layer: li,
        r: li === 0 || li === 3 ? 8 : 10,
      });
    }
  });
  return nodes;
};

const buildEdges = (nodes) => {
  const edges = [];
  for (let li = 0; li < LAYER_SIZES.length - 1; li++) {
    const from = nodes.filter((n) => n.layer === li);
    const to = nodes.filter((n) => n.layer === li + 1);
    from.forEach((f) => {
      to.forEach((t) => {
        edges.push({ from: f, to: t, id: `${f.id}-${t.id}` });
      });
    });
  }
  return edges;
};

const NODES = buildNodes();
const EDGES = buildEdges(NODES);

const Neuron = ({ node, isDark, colors }) => {
  const isEdge = node.layer === 0 || node.layer === 3;
  const isHidden = !isEdge;
  const s1 = seed(node.x * 7 + node.y * 13);

  const fill = isDark
    ? isHidden ? 'rgba(6,182,212,0.12)' : 'rgba(255,255,255,0.05)'
    : isHidden ? 'rgba(8,145,178,0.1)' : 'rgba(0,0,0,0.04)';
  const stroke = isDark
    ? isHidden ? 'rgba(6,182,212,0.35)' : 'rgba(255,255,255,0.1)'
    : isHidden ? 'rgba(8,145,178,0.3)' : 'rgba(0,0,0,0.08)';

  return (
    <g>
      <motion.circle
        cx={node.x} cy={node.y} r={node.r}
        fill={fill} stroke={stroke} strokeWidth={1}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{
          duration: 2 + s1 * 2,
          delay: s1 * 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Inner glow dot */}
      <motion.circle
        cx={node.x} cy={node.y}
        r={isHidden ? 3.5 : 2.5}
        fill={isHidden ? colors.accent : isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.12)'}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          duration: 1.8 + s1 * 1.5,
          delay: s1 * 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </g>
  );
};

// Only animate a subset of edges for performance (every 3rd)
const SignalPulse = ({ edge, index, colors }) => {
  const d = seed(index * 17 + 3);
  return (
    <motion.circle
      r={2}
      fill={colors.accent}
      filter="url(#nnGlow)"
      initial={{ cx: edge.from.x, cy: edge.from.y, opacity: 0 }}
      animate={{
        cx: [edge.from.x, edge.to.x],
        cy: [edge.from.y, edge.to.y],
        opacity: [0, 0.9, 0.9, 0],
      }}
      transition={{
        duration: 1.2,
        delay: d * 6 + index * 0.08,
        repeat: Infinity,
        repeatDelay: 3 + d * 4,
        ease: 'easeInOut',
      }}
    />
  );
};

const NeuralNetworkViz = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const { isDark, colors } = useTheme();

  // Only animate every 3rd edge for performance
  const animatedEdges = EDGES.filter((_, i) => i % 3 === 0);

  return (
    <section ref={ref} style={{
      padding: '80px 20px 40px',
      background: isDark ? '#0d0d14' : '#f8fafc',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 300, borderRadius: '50%',
        background: isDark ? 'rgba(6,182,212,0.04)' : 'rgba(8,145,178,0.03)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 10 }}>
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
          }}>Neural Architecture</span>
          <h2 className="font-display" style={{
            fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700,
            color: colors.text, marginBottom: 12,
          }}>
            How Our Agents Think
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 2vw, 16px)', color: colors.textSecondary,
            maxWidth: 480, margin: '0 auto', lineHeight: 1.7,
          }}>
            Every request flows through layers of specialized neural processing — from understanding to action.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative' }}
        >
          <svg
            viewBox="0 0 800 400"
            fill="none"
            style={{ width: '100%', height: 'auto' }}
            role="img"
            aria-label="Neural network visualization showing data flowing through processing layers"
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

            {/* Layer labels */}
            {LAYER_X.map((x, i) => (
              <text
                key={LAYER_LABELS[i]}
                x={x} y={385}
                textAnchor="middle"
                fill={colors.textMuted}
                fontSize={10}
                fontWeight={600}
                fontFamily="inherit"
                letterSpacing="0.06em"
              >
                {LAYER_LABELS[i].toUpperCase()}
              </text>
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default NeuralNetworkViz;
