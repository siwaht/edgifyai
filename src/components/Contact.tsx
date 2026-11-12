import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Clock, Send, CheckCircle, X } from 'lucide-react';
import { useTheme } from '../context/theme';
import { AGENT_TYPE_OPTIONS } from '../content/site';
import { submitEnquiry } from '../lib/supabase';

const CONTACT_INFO = [
  { icon: Mail, title: 'Email Us', lines: ['cc@edgifyai.com'] },
  { icon: MapPin, title: 'Location', lines: ['Remote-First', 'Global Coverage'] },
  { icon: Clock, title: 'Response Time', lines: ['< 24 hours', 'Mon – Fri, 9am – 6pm UTC'] },
];

const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const { isDark, colors } = useTheme();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const removeType = (type: string) => {
    setSelectedTypes((prev) => prev.filter((t) => t !== type));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSending(true);

    try {
      await submitEnquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || null,
        agent_types: selectedTypes,
        message: form.message.trim(),
        source: 'website',
      });
      setSent(true);
    } catch {
      setError('We could not send your message just now. Please try again, or email cc@edgifyai.com.');
    } finally {
      setSending(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: '10px',
    padding: '12px 16px',
    color: colors.text,
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    fontFamily: 'inherit',
  };

  return (
    <section id="contact" ref={ref} style={{ background: colors.bg, padding: '96px 24px' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span style={{
            display: 'inline-block',
            color: colors.accent,
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            Get In Touch
          </span>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: colors.text, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '16px' }}
          >
            Tell Us What You Want{' '}
            <span
              className="gradient-text"
              style={{ backgroundImage: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})` }}
            >
              Automated
            </span>
          </h2>
          <p style={{ color: colors.textSecondary, fontSize: '1rem', maxWidth: '50ch', margin: '0 auto', lineHeight: 1.7 }}>
            Share the workflow that costs you the most time. We will map it, show you where an agent fits, and give you an honest view of what it takes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {CONTACT_INFO.map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.title} style={{
                  display: 'flex', gap: '16px',
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '16px',
                  padding: '20px',
                  backdropFilter: 'blur(8px)',
                }}>
                  <div style={{
                    flexShrink: 0, width: 40, height: 40,
                    borderRadius: '10px',
                    background: colors.accentMuted,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} color={colors.accent} />
                  </div>
                  <div>
                    <div style={{ color: colors.textMuted, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                      {info.title}
                    </div>
                    {info.lines.map((line) => (
                      <div key={line} style={{ color: colors.text, fontSize: '0.9rem', fontWeight: 500 }}>{line}</div>
                    ))}
                  </div>
                </div>
              );
            })}

            <div style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              padding: '20px',
              backdropFilter: 'blur(8px)',
              marginTop: '4px',
            }}>
              <div style={{ color: colors.accent, fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>30 min</div>
              <div style={{ color: colors.text, fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>Discovery call</div>
              <div style={{ color: colors.textSecondary, fontSize: '0.82rem', lineHeight: 1.6 }}>
                No pitch deck. We walk through your workflow, name the agent types that fit, and tell you what a realistic first release looks like.
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
            style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: '20px',
              padding: '36px',
              backdropFilter: 'blur(12px)',
            }}
          >
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle size={56} color={colors.success} style={{ margin: '0 auto 16px' }} />
                </motion.div>
                <h3 style={{ color: colors.text, fontWeight: 700, fontSize: '1.3rem', marginBottom: '8px' }}>Message Sent Successfully</h3>
                <p style={{ color: colors.textSecondary, lineHeight: 1.6 }}>
                  Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" style={{ display: 'block', color: colors.textSecondary, fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Full Name *</label>
                    <input
                      id="contact-name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      maxLength={120}
                      placeholder="Jane Smith"
                      style={inputStyle}
                      onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = colors.accent; }}
                      onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = colors.border; }}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" style={{ display: 'block', color: colors.textSecondary, fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Work Email *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      maxLength={254}
                      placeholder="jane@company.com"
                      style={inputStyle}
                      onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = colors.accent; }}
                      onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = colors.border; }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-company" style={{ display: 'block', color: colors.textSecondary, fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Company</label>
                  <input
                    id="contact-company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    maxLength={160}
                    placeholder="Acme Corp"
                    style={inputStyle}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = colors.accent; }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = colors.border; }}
                  />
                </div>

                <div style={{ position: 'relative' }}>
                  <label style={{ display: 'block', color: colors.textSecondary, fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Agent Types (select multiple)</label>

                  <div
                    onClick={() => setDropdownOpen((o) => !o)}
                    style={{
                      ...inputStyle,
                      cursor: 'pointer',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      minHeight: '44px',
                      alignItems: 'center',
                      borderColor: dropdownOpen ? colors.accent : colors.border,
                    }}
                  >
                    {selectedTypes.length === 0 && (
                      <span style={{ color: colors.textMuted, fontSize: '0.875rem' }}>Click to select agent types...</span>
                    )}
                    {selectedTypes.map((type) => (
                      <span
                        key={type}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          background: colors.accentMuted,
                          border: `1px solid ${isDark ? 'rgba(34,211,238,0.2)' : 'rgba(8,145,178,0.2)'}`,
                          color: colors.accent,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        {type}
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeType(type); }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.accent, display: 'flex', padding: 0 }}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>

                  {dropdownOpen && (
                    <div style={{
                      position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 20,
                      marginTop: '4px',
                      background: colors.bgCardSolid,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '10px',
                      padding: '6px',
                      boxShadow: isDark ? '0 12px 32px rgba(0,0,0,0.5)' : '0 12px 32px rgba(0,0,0,0.12)',
                      maxHeight: '220px',
                      overflowY: 'auto',
                    }}>
                      {AGENT_TYPE_OPTIONS.map((type) => {
                        const isSelected = selectedTypes.includes(type);
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => toggleType(type)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '10px',
                              width: '100%',
                              textAlign: 'left',
                              padding: '10px 12px',
                              borderRadius: '8px',
                              border: 'none',
                              cursor: 'pointer',
                              background: isSelected ? colors.accentMuted : 'transparent',
                              color: isSelected ? colors.accent : colors.text,
                              fontSize: '0.875rem',
                              fontWeight: isSelected ? 600 : 400,
                              fontFamily: 'inherit',
                              transition: 'background 0.15s ease',
                            }}
                            onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'; }}
                            onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                          >
                            <span style={{
                              width: 18, height: 18, borderRadius: '5px', flexShrink: 0,
                              border: isSelected ? `2px solid ${colors.accent}` : `2px solid ${colors.border}`,
                              background: isSelected ? colors.accent : 'transparent',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'all 0.15s ease',
                            }}>
                              {isSelected && (
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                  <path d="M1 4L3.5 6.5L9 1" stroke="#0a0a0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </span>
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" style={{ display: 'block', color: colors.textSecondary, fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Tell us about your project *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    maxLength={5000}
                    placeholder="Describe the workflow, the call or ticket volume, and the systems the agent would need to work with..."
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                    onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = colors.accent; }}
                    onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = colors.border; }}
                  />
                </div>

                {error && (
                  <div style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 500 }}>{error}</div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
                    color: '#0a0a0f',
                    padding: '14px 28px',
                    borderRadius: '12px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: sending ? 'wait' : 'pointer',
                    opacity: sending ? 0.75 : 1,
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => { if (!sending) (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
                >
                  {sending ? 'Sending...' : (<>Send Message <Send size={16} /></>)}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
