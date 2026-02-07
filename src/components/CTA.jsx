import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const BENEFITS = ['Free architecture review', 'Custom agent design', 'Ongoing support & iteration'];

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isDark } = useTheme();

  return (
    <section ref={ref} className="py-24 px-6 bg-obsidian-light relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative px-6 py-20 rounded-[2.5rem] text-center overflow-hidden border border-white/10 bg-glass-gradient backdrop-blur-xl shadow-2xl"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="absolute top-[-30%] left-[-10%] w-[500px] h-[500px] bg-electric-cyan/10 rounded-full blur-[80px] animate-blob" />
            <div className="absolute bottom-[-30%] right-[-10%] w-[500px] h-[500px] bg-purple-glow/10 rounded-full blur-[80px] animate-blob animation-delay-2000" />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIi8+PC9zdmc+')] mix-blend-overlay" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Let's Design Your <span className="text-electric-cyan">AI Solution</span>
            </h2>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed">
              Whether you need a simple chatbot or a fleet of autonomous agents — we'll architect the right system for your needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-electric-cyan hover:bg-electric-cyan-dark text-obsidian rounded-full font-bold text-base transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transform hover:-translate-y-0.5"
              >
                <span className="flex items-center justify-center gap-2 relative z-10">
                  Get in Touch <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 rounded-full font-bold text-base transition-all duration-300 backdrop-blur-sm"
              >
                View Services
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {BENEFITS.map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-electric-cyan/20 text-electric-cyan">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {b}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
