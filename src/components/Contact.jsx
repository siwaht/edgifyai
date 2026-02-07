import { useState, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, CheckCircle, Clock, Mail, MessageSquare, AlertCircle, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../lib/supabase';

const PROJECT_TYPES = ['Voice Agents', 'Chat Agents', 'Deep Agents', 'RAG & Memory', 'Multi-Agent Systems', 'Custom Build'];

const INITIAL_FORM = { name: '', email: '', types: [], message: '' };

const ContactInfo = ({ isDark, colors }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
    {[
      { icon: Mail, title: 'Email Us', lines: ['hello@edgeifyai.com', 'support@edgeifyai.com'] },
      { icon: Clock, title: 'Response Time', lines: ['We typically respond within 24 hours', 'Mon - Fri, 9am - 6pm PST'] },
    ].map(({ icon: Icon, title, lines }) => (
      <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{
          padding: 14, borderRadius: 16,
          background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
          boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0,0,0,0.06)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`,
          flexShrink: 0,
        }}>
          <Icon size={22} style={{ color: '#06b6d4' }} />
        </div>
        <div>
          <h4 style={{ fontSize: 16, fontWeight: 600, color: colors.text, marginBottom: 4 }}>{title}</h4>
          {lines.map((line) => (
            <p key={line} style={{ fontSize: 14, color: colors.textMuted, lineHeight: 1.6 }}>{line}</p>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const Contact = () => {
  const { isDark, colors } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const updateField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { error: submitError } = await supabase
      .from('contact_submissions')
      .insert({
        name: form.name.trim(),
        email: form.email.trim(),
        project_type: form.types.join(', '),
        message: form.message.trim(),
      });

    setIsSubmitting(false);

    if (submitError) {
      setError('Something went wrong. Please try again.');
      return;
    }

    // Fire webhook to Make.com with form details
    try {
      await fetch('https://hook.eu2.make.com/90fx6s1adetomrpb2ah1rf5r6vm1znww', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          project_type: form.types.join(', '),
          message: form.message.trim(),
          submitted_at: new Date().toISOString(),
        }),
      });
    } catch {
      // Webhook failure is non-blocking — form was already saved to Supabase
    }

    setIsSuccess(true);
    setForm(INITIAL_FORM);
    setTimeout(() => setIsSuccess(false), 5000);
  }, [form]);

  const inputStyle = (field) => ({
    width: '100%',
    padding: '14px 16px',
    borderRadius: 12,
    border: `1px solid ${focusedField === field
      ? '#06b6d4'
      : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
    background: isDark
      ? (focusedField === field ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)')
      : (focusedField === field ? '#ffffff' : '#f8fafc'),
    color: colors.text,
    fontSize: 15,
    outline: 'none',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    boxShadow: focusedField === field
      ? isDark ? '0 0 0 3px rgba(6,182,212,0.15)' : '0 0 0 3px rgba(6,182,212,0.1)'
      : 'none',
  });

  const labelStyle = {
    display: 'block',
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: colors.textMuted,
    marginBottom: 8,
  };

  return (
    <section ref={ref} id="contact" style={{
      padding: 'clamp(60px, 10vw, 120px) 20px',
      background: isDark ? '#0d0d14' : '#f8fafc',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -200, right: -200, width: 600, height: 600,
        borderRadius: '50%', pointerEvents: 'none',
        background: isDark ? 'rgba(6,182,212,0.06)' : 'rgba(6,182,212,0.04)',
        filter: 'blur(120px)',
      }} />
      <div style={{
        position: 'absolute', bottom: -200, left: -200, width: 500, height: 500,
        borderRadius: '50%', pointerEvents: 'none',
        background: isDark ? 'rgba(14,165,233,0.05)' : 'rgba(14,165,233,0.03)',
        filter: 'blur(120px)',
      }} />

      <div style={{
        maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1,
        display: 'grid', gridTemplateColumns: '1fr', gap: 48,
      }} className="contact-grid">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', borderRadius: 100, marginBottom: 24,
            background: isDark ? 'rgba(6,182,212,0.08)' : 'rgba(6,182,212,0.08)',
            border: `1px solid ${isDark ? 'rgba(6,182,212,0.15)' : 'rgba(6,182,212,0.2)'}`,
          }}>
            <MessageSquare size={14} style={{ color: '#06b6d4' }} />
            <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: isDark ? '#22d3ee' : '#0891b2' }}>
              Get in Touch
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(30px, 5vw, 46px)', fontWeight: 700,
            color: colors.text, marginBottom: 16, lineHeight: 1.15, letterSpacing: '-0.03em',
          }}>
            Ready to build your{' '}
            <span
              className="gradient-text"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #0284c7)' }}
            >AI Agent?</span>
          </h2>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 17px)', lineHeight: 1.7,
            color: colors.textSecondary, maxWidth: 520, marginBottom: 40,
          }}>
            Book a consultation with our agent architects. We'll map your workflows and design the right agent system for your needs.
          </p>

          <ContactInfo isDark={isDark} colors={colors} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div style={{
            borderRadius: 24, padding: 'clamp(24px, 4vw, 40px)',
            background: isDark ? 'rgba(28, 28, 36, 0.6)' : 'rgba(255,255,255,0.9)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`,
            backdropFilter: 'blur(20px)',
            boxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.3)' : '0 20px 60px rgba(0,0,0,0.06)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: -60, right: -60, width: 200, height: 200,
              borderRadius: '50%', pointerEvents: 'none',
              background: isDark ? 'rgba(6,182,212,0.08)' : 'rgba(6,182,212,0.04)',
              filter: 'blur(60px)',
            }} />

            <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }} className="form-name-email">
                <div>
                  <label style={labelStyle}>Your Name</label>
                  <input
                    type="text" required value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle('name')}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email" required value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle('email')}
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Services Needed <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(select all that apply)</span></label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }} className="form-project-types">
                  {PROJECT_TYPES.map((type) => {
                    const isActive = form.types.includes(type);
                    return (
                      <button key={type} type="button"
                        onClick={() => {
                          setForm((prev) => ({
                            ...prev,
                            types: isActive
                              ? prev.types.filter((t) => t !== type)
                              : [...prev.types, type],
                          }));
                        }}
                        style={{
                          padding: '10px 12px', borderRadius: 10, fontSize: 13, fontWeight: 500,
                          cursor: 'pointer', transition: 'all 0.2s ease',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          border: `1px solid ${isActive
                            ? isDark ? 'rgba(6,182,212,0.3)' : 'rgba(6,182,212,0.3)'
                            : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                          background: isActive
                            ? isDark ? 'rgba(6,182,212,0.15)' : 'rgba(6,182,212,0.08)'
                            : isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                          color: isActive
                            ? isDark ? '#22d3ee' : '#0891b2'
                            : colors.textSecondary,
                        }}
                      >
                        {isActive && <Check size={14} strokeWidth={2.5} />}
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Message</label>
                <textarea
                  rows={4} required value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  style={{ ...inputStyle('message'), resize: 'none' }}
                  placeholder="Tell us about your project..."
                />
              </div>

              {error && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '12px 16px', borderRadius: 12, marginBottom: 20,
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.15)',
                  color: '#f87171', fontSize: 14,
                }}>
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <button type="submit" disabled={isSubmitting || isSuccess}
                style={{
                  width: '100%', padding: '16px 24px', borderRadius: 14,
                  border: 'none', cursor: isSubmitting ? 'wait' : 'pointer',
                  fontSize: 16, fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  background: isSuccess
                    ? '#10b981'
                    : 'linear-gradient(135deg, #06b6d4, #0284c7)',
                  color: '#ffffff',
                  boxShadow: isSuccess ? 'none' : '0 8px 30px rgba(6,182,212,0.3)',
                  transition: 'all 0.3s ease',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{
                      width: 20, height: 20,
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#ffffff',
                      borderRadius: '50%',
                    }}
                  />
                ) : isSuccess ? (
                  <><CheckCircle size={20} /> Message Sent!</>
                ) : (
                  <><Send size={18} /> Send Message</>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 64px !important;
            align-items: start;
          }
        }
        @media (max-width: 600px) {
          .form-name-email {
            grid-template-columns: 1fr !important;
          }
          .form-project-types {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        input::placeholder, textarea::placeholder {
          color: ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)'};
        }
      `}</style>
    </section>
  );
};

export default Contact;
