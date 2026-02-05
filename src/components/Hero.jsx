import React, { useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ParticleField = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const particleCount = 80;

    const particleColor = isDark ? '0, 255, 255' : '8, 145, 178';

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseVx = (Math.random() - 0.5) * 0.3;
        this.baseVy = (Math.random() - 0.5) * 0.3;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.size = Math.random() * 2 + 0.5;
        this.baseAlpha = Math.random() * 0.4 + 0.1;
        this.alpha = this.baseAlpha;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update(time) {
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
          const force = (200 - dist) / 200;
          this.vx += (dx / dist) * force * 0.02;
          this.vy += (dy / dist) * force * 0.02;
        }

        this.vx = this.vx * 0.98 + this.baseVx * 0.02;
        this.vy = this.vy * 0.98 + this.baseVy * 0.02;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha = this.baseAlpha + Math.sin(time * 0.002 + this.pulseOffset) * 0.1;

        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;
      }

      draw() {
        if (!ctx) return;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, `rgba(${particleColor}, ${this.alpha})`);
        gradient.addColorStop(1, `rgba(${particleColor}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${particleColor}, ${this.alpha * 1.5})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const alpha = (1 - distance / 120) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${particleColor}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    let time = 0;
    const animate = () => {
      if (!ctx) return;
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(time); p.draw(); });
      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

const FloatingOrbs = () => {
  const { isDark } = useTheme();
  const orbs = useMemo(() => [
    { size: 300, x: '10%', y: '20%', delay: 0, color: 'cyan' },
    { size: 200, x: '80%', y: '60%', delay: 2, color: 'purple' },
    { size: 150, x: '60%', y: '10%', delay: 4, color: 'cyan' },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color === 'cyan' 
              ? isDark 
                ? 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(8, 145, 178, 0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const { isDark } = useTheme();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section 
      ref={containerRef}
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#030712] text-white' : 'bg-white text-gray-900'
      }`}
    >
      <ParticleField />
      <FloatingOrbs />

      <motion.div 
        className="relative z-10 container mx-auto px-6 text-center"
        style={{ y: springY, opacity: springOpacity, scale: springScale }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div 
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest uppercase border rounded-full backdrop-blur-sm ${
                isDark 
                  ? 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5' 
                  : 'text-cyan-600 border-cyan-600/20 bg-cyan-600/5'
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles size={14} className="animate-pulse" />
              <span>Next-Gen Agentic Intelligence</span>
            </motion.div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
            <span className={isDark ? 'text-white' : 'text-gray-900'}>The Era of the</span>
            <br />
            <motion.span 
              className="inline-block"
              style={{
                background: isDark 
                  ? 'linear-gradient(135deg, #00ffff 0%, #00d4ff 25%, #7c3aed 50%, #00d4ff 75%, #00ffff 100%)'
                  : 'linear-gradient(135deg, #0891b2 0%, #06b6d4 25%, #7c3aed 50%, #06b6d4 75%, #0891b2 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              Autonomous Enterprise
            </motion.span>
          </motion.h1>

          <motion.p variants={itemVariants} className={`max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-light leading-relaxed mb-12 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Orchestrating the invisible hand of digital labor.
            <br className="hidden sm:block" />
            Scalable, sentient, and perpetually active systems designed for the future of work.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <motion.button
              className={`group relative px-8 py-4 font-semibold rounded-xl overflow-hidden ${
                isDark ? 'bg-white text-[#030712]' : 'bg-gray-900 text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </span>
              <motion.div 
                className={`absolute inset-0 ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.button>

            <motion.button
              className={`px-8 py-4 border font-semibold rounded-xl transition-all duration-300 ${
                isDark 
                  ? 'border-white/20 text-white hover:border-cyan-400/50 hover:bg-white/5' 
                  : 'border-gray-300 text-gray-900 hover:border-cyan-600/50 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className={`flex flex-col items-center gap-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>

      <div className={`absolute bottom-0 w-full h-40 pointer-events-none z-10 ${
        isDark 
          ? 'bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent' 
          : 'bg-gradient-to-t from-white via-white/80 to-transparent'
      }`} />
    </section>
  );
};

export default Hero;
