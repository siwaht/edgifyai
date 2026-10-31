import { motion } from 'framer-motion';
import { useTheme } from '../context/theme';
import './NeuralNetworkViz.css';

const seed = (s) => {
  const x = Math.sin(s * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

// What happens inside an agent, from the customer's first message to the finished task.
const LAYERS = [
  { x: 70, count: 4, r: 9, label: 'Input', detail: 'Call, voice, chat, or image', tags: ['Phone call', 'Voice', 'Chat', 'Image / doc'], color: '#22d3ee' },
  { x: 245, count: 6, r: 10, label: 'Context', detail: 'Memory and your knowledge', tags: ['Customer profile', 'Past conversations', 'Knowledge base', 'Order history', 'Policies', 'Live data'], color: '#38bdf8' },
  { x: 430, count: 6, r: 10, label: 'Reasoning', detail: 'Plans the next best step', tags: ['Understand intent', 'Plan steps', 'Pick tools', 'Check rules', 'Guardrails', 'Self-check'], color: '#2dd4bf' },
  { x: 615, count: 5, r: 10, label: 'Action', detail: 'Uses your real tools', tags: ['Update CRM', 'Book meeting', 'Issue refund', 'Fill portal', 'Call API'], color: '#fbbf24' },
  { x: 785, count: 3, r: 9, label: 'Outcome', detail: 'Done, or handed to your team', tags: ['Reply sent', 'Task done', 'Human handoff'], color: '#34d399' },
];

const STEPS = [
  { n: '01', when: 'Day 1', title: 'Strategy call', text: 'A free 30-minute call. We map your workflows and pick the use case with the clearest return.' },
  { n: '02', when: 'Week 1', title: 'Design and scope', text: 'We design conversation flows, integrations, and success metrics, then send a fixed-scope proposal.' },
  { n: '03', when: 'Weeks 2–3', title: 'Build and test', text: 'We build the agent, connect your tools, and test it against real scenarios from your business.' },
  { n: '04', when: 'Ongoing', title: 'Launch and improve', text: 'We go live with monitoring in place, then review results and tune the agent every month.' },
];

const buildNodes = () => LAYERS.flatMap((layer, li) => {
  const spacing = 52;
  const startY = 190 - ((layer.count - 1) * spacing) / 2;
  return Array.from({ length: layer.count }, (_, ni) => ({
    id: `${li}-${ni}`,
    x: layer.x,
    y: startY + ni * spacing,
    layer: li,
    r: layer.r,
    tag: layer.tags[ni] || '',
    color: layer.color,
  }));
});

const buildEdges = (nodes) => {
  const edges = [];
  for (let li = 0; li < LAYERS.length - 1; li++) {
    const from = nodes.filter((n) => n.layer === li);
    const to = nodes.filter((n) => n.layer === li + 1);
    from.forEach((f, fi) => {
      to.forEach((t, ti) => {
        // Sparse, deterministic wiring reads cleaner than a fully connected mesh.
        const dist = Math.abs(fi / from.length - ti / to.length);
        if (dist < 0.4 || seed(fi * 7 + ti * 13 + li * 31) > 0.68) {
          edges.push({ from: f, to: t, id: `${f.id}-${t.id}` });
        }
      });
    });
  }
  return edges;
};

const NODES = buildNodes();
const EDGES = buildEdges(NODES);
const ANIMATED_EDGES = EDGES.filter((_, i) => i % 3 === 0);

const Neuron = ({ node, isDark }) => {
  const s1 = seed(node.x * 7 + node.y * 13);
  return (
    <g>
      <motion.circle
        cx={node.x} cy={node.y} r={node.r}
        fill={isDark ? '#0f1117' : '#ffffff'}
        stroke={node.color}
        strokeOpacity={isDark ? 0.45 : 0.5}
        strokeWidth={1}
        animate={{ opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 2 + s1 * 2, delay: s1 * 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx={node.x} cy={node.y} r={node.r * 0.38}
        fill={node.color}
        animate={{ opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 1.8 + s1 * 1.5, delay: s1 * 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {node.tag && (
        <text
          className="nn-tag"
          x={node.x + node.r + 7}
          y={node.y + 3.5}
          fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(10,12,20,0.55)'}
          fontSize={10}
          fontFamily="inherit"
          fontWeight={500}
        >
          {node.tag}
        </text>
      )}
    </g>
  );
};

const SignalPulse = ({ edge, index }) => {
  const d = seed(index * 17 + 3);
  return (
    <motion.circle
      r={2.2}
      fill={LAYERS[edge.from.layer].color}
      filter="url(#nnGlow)"
      initial={{ cx: edge.from.x, cy: edge.from.y, opacity: 0 }}
      animate={{ cx: [edge.from.x, edge.to.x], cy: [edge.from.y, edge.to.y], opacity: [0, 0.9, 0.9, 0] }}
      transition={{ duration: 1.4, delay: d * 5 + index * 0.06, repeat: Infinity, repeatDelay: 3 + d * 5, ease: 'easeInOut' }}
    />
  );
};

const NeuralNetworkViz = () => {
  const { isDark } = useTheme();
  const reveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
  };

  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <motion.header className="section-head" {...reveal} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <span className="eyebrow">How It Works</span>
          <h2 className="section-title">
            From first word to <span className="grad-text">finished task</span>
          </h2>
          <p className="section-lead">
            A customer calls, types, or sends a photo. The agent pulls up context, plans the next step,
            uses your tools, and finishes with a reply, a completed task, or a clean handoff to your team.
          </p>
        </motion.header>

        <motion.div
          className="nn card"
          {...reveal}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="nn__scroll">
            <svg
              viewBox="0 30 900 320"
              fill="none"
              className="nn__svg"
              role="img"
              aria-label="Agent pipeline: input flows through context, reasoning, and action to an outcome"
            >
              <defs>
                <filter id="nnGlow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {EDGES.map((edge) => (
                <line
                  key={edge.id}
                  x1={edge.from.x} y1={edge.from.y}
                  x2={edge.to.x} y2={edge.to.y}
                  stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(10,12,20,0.06)'}
                  strokeWidth={0.8}
                />
              ))}

              {ANIMATED_EDGES.map((edge, i) => (
                <SignalPulse key={`sig-${edge.id}`} edge={edge} index={i} />
              ))}

              {NODES.map((node) => (
                <Neuron key={node.id} node={node} isDark={isDark} />
              ))}
            </svg>
          </div>

          <ol className="nn__legend">
            {LAYERS.map((layer, i) => (
              <li key={layer.label} style={{ '--c': layer.color }}>
                <span className="nn__legend-step">{String(i + 1).padStart(2, '0')}</span>
                <span className="nn__legend-label">{layer.label}</span>
                <span className="nn__legend-detail">{layer.detail}</span>
              </li>
            ))}
          </ol>
        </motion.div>

        <div className="process">
          <motion.div className="process__head" {...reveal} transition={{ duration: 0.6 }}>
            <h3 className="process__title font-display">How we work with you</h3>
            <p className="process__sub">From first call to a live agent in about a month.</p>
          </motion.div>
          <ol className="process__grid">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.n}
                className="process__step"
                {...reveal}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="process__meta">
                  <span className="process__num font-display">{step.n}</span>
                  <span className="process__when">{step.when}</span>
                </div>
                <h4 className="process__step-title font-display">{step.title}</h4>
                <p className="process__text">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default NeuralNetworkViz;
