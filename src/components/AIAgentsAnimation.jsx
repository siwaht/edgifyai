import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const LAYERS = [4, 6, 8, 8, 6, 3];
const LAYER_LABELS = ['Input', 'Encode', 'Hidden 1', 'Hidden 2', 'Decode', 'Output'];

function buildNetwork(width, height) {
  const padX = 70;
  const padY = 40;
  const layerSpacing = (width - padX * 2) / (LAYERS.length - 1);
  const neurons = [];
  const connections = [];

  LAYERS.forEach((count, li) => {
    const x = padX + li * layerSpacing;
    const totalH = height - padY * 2;
    const gap = totalH / (count + 1);
    for (let ni = 0; ni < count; ni++) {
      const y = padY + gap * (ni + 1);
      neurons.push({ id: neurons.length, x, y, layer: li });
    }
  });

  for (let li = 0; li < LAYERS.length - 1; li++) {
    const fromNeurons = neurons.filter((n) => n.layer === li);
    const toNeurons = neurons.filter((n) => n.layer === li + 1);
    fromNeurons.forEach((from) => {
      toNeurons.forEach((to) => {
        const dy = Math.abs(from.y - to.y);
        const maxDy = (height - padY * 2);
        const weight = 1 - (dy / maxDy) * 0.7 + Math.random() * 0.15;
        connections.push({ from: from.id, to: to.id, weight: Math.max(0.08, Math.min(1, weight)) });
      });
    });
  }

  return { neurons, connections };
}

const AIAgentsAnimation = () => {
  const { isDark, colors } = useTheme();
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const networkRef = useRef(null);
  const signalsRef = useRef([]);
  const timeRef = useRef(0);

  const W = 720;
  const H = 380;

  if (!networkRef.current) {
    networkRef.current = buildNetwork(W, H);
  }

  const spawnSignal = useCallback(() => {
    const net = networkRef.current;
    const inputNeurons = net.neurons.filter((n) => n.layer === 0);
    const startNeuron = inputNeurons[Math.floor(Math.random() * inputNeurons.length)];

    const path = [startNeuron];
    let current = startNeuron;
    for (let li = 1; li < LAYERS.length; li++) {
      const nextLayer = net.neurons.filter((n) => n.layer === li);
      const candidates = net.connections
        .filter((c) => c.from === current.id && nextLayer.some((n) => n.id === c.to))
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 3);
      if (candidates.length === 0) break;
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      const nextNeuron = net.neurons.find((n) => n.id === pick.to);
      path.push(nextNeuron);
      current = nextNeuron;
    }

    signalsRef.current.push({
      path,
      progress: 0,
      speed: 0.008 + Math.random() * 0.006,
      opacity: 1,
    });
  }, []);

  const draw = useCallback((ctx, time) => {
    const net = networkRef.current;
    const accent = colors.accent;
    const dt = time - timeRef.current;
    timeRef.current = time;

    ctx.clearRect(0, 0, W, H);

    const connAlpha = isDark ? 0.04 : 0.035;
    net.connections.forEach((conn) => {
      const from = net.neurons[conn.from];
      const to = net.neurons[conn.to];
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = isDark
        ? `rgba(255,255,255,${connAlpha * conn.weight})`
        : `rgba(0,0,0,${connAlpha * conn.weight})`;
      ctx.lineWidth = 0.5 + conn.weight * 0.5;
      ctx.stroke();
    });

    const activeNeurons = new Set();
    signalsRef.current.forEach((sig) => {
      const segIndex = Math.floor(sig.progress * (sig.path.length - 1));
      const segProgress = (sig.progress * (sig.path.length - 1)) - segIndex;

      if (segIndex < sig.path.length - 1) {
        const from = sig.path[segIndex];
        const to = sig.path[segIndex + 1];

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        const grad = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        const ahead = Math.min(1, segProgress + 0.3);
        const behind = Math.max(0, segProgress - 0.3);
        grad.addColorStop(behind, `rgba(6,182,212,0)`);
        grad.addColorStop(segProgress, `rgba(6,182,212,${0.5 * sig.opacity})`);
        grad.addColorStop(ahead, `rgba(6,182,212,0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();

        const sx = from.x + (to.x - from.x) * segProgress;
        const sy = from.y + (to.y - from.y) * segProgress;

        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.shadowColor = accent;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        activeNeurons.add(from.id);
        if (segProgress > 0.7) activeNeurons.add(to.id);
      } else {
        activeNeurons.add(sig.path[sig.path.length - 1].id);
      }
    });

    net.neurons.forEach((neuron) => {
      const isActive = activeNeurons.has(neuron.id);
      const isInput = neuron.layer === 0;
      const isOutput = neuron.layer === LAYERS.length - 1;
      const baseSize = isInput || isOutput ? 5 : 4;
      const pulse = Math.sin(time * 0.002 + neuron.id * 0.5) * 0.3 + 0.7;

      if (isActive) {
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, baseSize + 8, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(6,182,212,0.12)` : `rgba(8,145,178,0.1)`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, baseSize, 0, Math.PI * 2);
      if (isActive) {
        ctx.fillStyle = accent;
        ctx.shadowColor = accent;
        ctx.shadowBlur = 10;
      } else {
        const alpha = isDark ? 0.15 + pulse * 0.1 : 0.12 + pulse * 0.08;
        ctx.fillStyle = isDark ? `rgba(6,182,212,${alpha})` : `rgba(8,145,178,${alpha})`;
        ctx.shadowBlur = 0;
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, baseSize, 0, Math.PI * 2);
      ctx.strokeStyle = isActive
        ? (isDark ? `rgba(6,182,212,0.6)` : `rgba(8,145,178,0.5)`)
        : (isDark ? `rgba(255,255,255,0.06)` : `rgba(0,0,0,0.06)`);
      ctx.lineWidth = isActive ? 1.5 : 0.5;
      ctx.stroke();
    });

    const labelAlpha = isDark ? 0.2 : 0.16;
    ctx.font = '500 9px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = isDark ? `rgba(255,255,255,${labelAlpha})` : `rgba(0,0,0,${labelAlpha})`;
    LAYERS.forEach((_, li) => {
      const layerNeurons = net.neurons.filter((n) => n.layer === li);
      const x = layerNeurons[0].x;
      ctx.fillText(LAYER_LABELS[li].toUpperCase(), x, H - 10);
    });

    signalsRef.current = signalsRef.current
      .map((sig) => ({ ...sig, progress: sig.progress + sig.speed }))
      .filter((sig) => sig.progress < 1.05);
  }, [isDark, colors.accent]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = W * 2;
    canvas.height = H * 2;
    ctx.scale(2, 2);

    let lastSpawn = 0;

    const loop = (time) => {
      if (time - lastSpawn > 600) {
        spawnSignal();
        lastSpawn = time;
      }
      draw(ctx, time);
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw, spawnSignal]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: '100%', maxWidth: 720, margin: '0 auto', position: 'relative' }}
    >
      <div style={{
        position: 'absolute', inset: -40, zIndex: 0,
        background: isDark
          ? 'radial-gradient(ellipse 70% 50% at center, rgba(6,182,212,0.06) 0%, transparent 70%)'
          : 'radial-gradient(ellipse 70% 50% at center, rgba(8,145,178,0.04) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: 'auto',
          aspectRatio: `${W} / ${H}`,
          position: 'relative',
          zIndex: 1,
        }}
      />
    </motion.div>
  );
};

export default AIAgentsAnimation;
