import React, { useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

// Optimized particle system with connection lines
const ParticleField = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const particleCount = 80;

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
        // Mouse interaction
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
          const force = (200 - dist) / 200;
          this.vx += (dx / dist) * force * 0.02;
          this.vy += (dy / dist) * force * 0.02;
        }

        // Apply velocity with damping
        this.vx = this.vx * 0.98 + this.baseVx * 0.02;
        this.vy = this.vy * 0.98 + this.baseVy * 0.02;

        this.x += this.vx;
        this.y += this.vy;

        // Pulse effect
        this.alpha = this.baseAlpha + Math.sin(time * 0.002 + this.pulseOffset) * 0.1;

        // Wrap around edges
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;
      }

      draw() {
        if (!ctx) return;
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, `rgba(0, 255, 255, ${this.alpha})`);
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(0, 255, 255, ${this.alpha * 1.5})`;
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
            ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
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

      particles.forEach(p => {
        p.update(time);
        p.draw();
      });

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
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

// Floating orbs decoration
const FloatingOrbs = () => {
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
              ? 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-obsidian text-white"
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
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest text-electric-cyan uppercase border border-electric-cyan/20 rounded-full bg-electric-cyan/5 backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: 'rgba(0, 255, 255, 0.4)' }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles size={14} className="animate-pulse" />
              <span>Next-Gen Agentic Intelligence</span>
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.9]"
          >
            <span className="text-gradient-white">The Era of the</span>
            <br />
            <motion.span 
              className="text-gradient-cyan inline-block"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundSize: '200% 200%',
                background: 'linear-gradient(135deg, #00ffff 0%, #00d4ff 25%, #7c3aed 50%, #00d4ff 75%, #00ffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Autonomous Enterprise
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-12"
          >
            Orchestrating the invisible hand of digital labor.
            <br className="hidden sm:block" />
            Scalable, sentient, and perpetually active systems designed for the future of work.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              className="group relative px-8 py-4 bg-white text-obsidian font-semibold rounded-xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <motion.div 
                className="absolute inset-0 bg-electric-cyan"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.button>

            <motion.button
              className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:border-electric-cyan/50 hover:bg-white/5 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-gray-500"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default Hero;
