import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const benefits = ['No credit card required', '14-day free trial', 'Cancel anytime'];

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isDark } = useTheme();

  const sectionStyle = {
    padding: '80px 20px',
    background: isDark ? '#0c0c0f' : '#f4f4f5',
  };

  const containerStyle = {
    maxWidth: 900,
    margin: '0 auto',
  };

  const cardStyle = {
    position: 'relative',
    padding: 'clamp(40px, 8vw, 80px)',
    borderRadius: 28,
    background: isDark ? '#18181b' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
    textAlign: 'center',
    overflow: 'hidden',
  };

  const titleStyle = {
    fontSize: 'clamp(28px, 5vw, 44px)',
    fontWeight: 700,
    color: isDark ? '#fafafa' : '#09090b',
    marginBottom: 16,
  };

  const subtitleStyle = {
    fontSize: 'clamp(15px, 2vw, 18px)',
    color: isDark ? '#a1a1aa' : '#52525b',
    maxWidth: 500,
    margin: '0 auto 32px',
    lineHeight: 1.7,
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  };

  const primaryButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    padding: '16px 32px',
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    background: isDark ? '#fafafa' : '#09090b',
    color: isDark ? '#09090b' : '#fafafa',
    width: '100%',
    maxWidth: 220,
    justifyContent: 'center',
  };

  const secondaryButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    padding: '16px 32px',
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 12,
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
    cursor: 'pointer',
    background: 'transparent',
    color: isDark ? '#fafafa' : '#09090b',
    width: '100%',
    maxWidth: 220,
    justifyContent: 'center',
  };

  const benefitsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 24,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const benefitStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
    color: isDark ? '#71717a' : '#a1a1aa',
  };

  return (
    <section ref={ref} style={sectionStyle}>
      <div style={containerStyle}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={cardStyle}
        >
          {/* Background gradients */}
          {/* Premium Glowing Background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: isDark
              ? 'radial-gradient(circle at 50% -20%, rgba(6, 182, 212, 0.15), transparent 70%), radial-gradient(circle at 50% 120%, rgba(124, 58, 237, 0.15), transparent 70%)'
              : 'radial-gradient(circle at 50% -20%, rgba(6, 182, 212, 0.1), transparent 70%), radial-gradient(circle at 50% 120%, rgba(124, 58, 237, 0.1), transparent 70%)',
            zIndex: 0,
          }} />

          <div style={{
            position: 'absolute',
            inset: 0,
            background: isDark
              ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(139, 92, 246, 0.05))'
              : 'linear-gradient(135deg, rgba(6, 182, 212, 0.03), rgba(139, 92, 246, 0.03))',
            zIndex: 0,
          }} />

          {/* Animated Orbs */}
          <div className="absolute top-[-50%] left-[-20%] w-[600px] h-[600px] bg-cyan-500/10 blur-[100px] rounded-full animate-float" />
          <div className="absolute bottom-[-50%] right-[-20%] w-[600px] h-[600px] bg-purple-500/10 blur-[100px] rounded-full animate-float" style={{ animationDelay: '-2s' }} />

          <div style={{ position: 'relative', zIndex: 10 }}>
            <h2 style={titleStyle}>Ready to Get Started?</h2>
            <p style={subtitleStyle}>
              Join thousands of companies using Agenticos to automate their operations
              and scale their business.
            </p>

            <div style={buttonContainerStyle} className="flex-col sm:flex-row">
              <button style={primaryButtonStyle}>
                Start Free Trial
                <ArrowRight size={18} />
              </button>
              <button style={secondaryButtonStyle}>
                Talk to Sales
              </button>
            </div>

            <div style={benefitsStyle}>
              {benefits.map((benefit, i) => (
                <div key={i} style={benefitStyle}>
                  <Check size={16} style={{ color: isDark ? '#06b6d4' : '#0891b2' }} />
                  {benefit}
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
