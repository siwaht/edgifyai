import { useState, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, CheckCircle, MapPin, Mail, MessageSquare, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../lib/supabase';

const PROJECT_TYPES = ['Enterprise AI', 'Voice Agents', 'Consulting', 'Custom Dev'];

const INITIAL_FORM = { name: '', email: '', type: 'Enterprise AI', message: '' };

const Contact = () => {
  const { isDark, colors } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

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
        project_type: form.type,
        message: form.message.trim(),
      });

    setIsSubmitting(false);

    if (submitError) {
      setError('Something went wrong. Please try again.');
      return;
    }

    setIsSuccess(true);
    setForm(INITIAL_FORM);
    setTimeout(() => setIsSuccess(false), 5000);
  }, [form]);

  const inputClass = `w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-300 border text-[15px] ${
    isDark
      ? 'bg-white/5 text-white border-white/10 focus:border-cyan-500/50 focus:bg-white/10 placeholder:text-white/25'
      : 'bg-slate-50 text-slate-900 border-slate-200 focus:border-cyan-500/50 focus:bg-white placeholder:text-slate-400'
  }`;

  const labelClass = `text-xs font-semibold uppercase tracking-wider mb-2 block ${
    isDark ? 'text-slate-400' : 'text-slate-500'
  }`;

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden" style={{
      padding: '120px 20px',
      background: isDark ? '#020617' : '#f8fafc',
    }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
          style={{ background: isDark ? 'rgba(6,182,212,0.05)' : 'rgba(6,182,212,0.03)', filter: 'blur(120px)' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{ background: isDark ? 'rgba(14,165,233,0.04)' : 'rgba(14,165,233,0.03)', filter: 'blur(120px)' }} />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 ${
            isDark ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-cyan-100/50 text-cyan-700 border border-cyan-200'
          }`}>
            <MessageSquare size={14} />
            Get in Touch
          </span>

          <h2 className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Ready to transform your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-600">Enterprise?</span>
          </h2>

          <p className={`text-lg leading-relaxed mb-12 max-w-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Book a consultation with our AI architects. We'll analyze your workflows and propose a custom automation strategy.
          </p>

          <div className="space-y-8">
            {[
              { icon: Mail, title: 'Email Us', lines: ['hello@agenticos.ai', 'support@agenticos.ai'] },
              { icon: MapPin, title: 'Headquarters', lines: ['100 Innovation Dr, Suite 500', 'San Francisco, CA 94103'] },
            ].map(({ icon: Icon, title, lines }) => (
              <div key={title} className="flex items-start gap-4">
                <div className={`p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-white shadow-lg shadow-slate-200/50'}`}>
                  <Icon className="text-cyan-500" size={24} />
                </div>
                <div>
                  <h4 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
                  {lines.map((line) => (
                    <p key={line} className="text-slate-500 text-[15px]">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`rounded-3xl p-8 md:p-10 relative overflow-hidden backdrop-blur-xl border ${
            isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/80 border-slate-200 shadow-2xl shadow-slate-200/50'
          }`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none -z-10"
            style={{ background: isDark ? 'rgba(6,182,212,0.1)' : 'rgba(6,182,212,0.05)', filter: 'blur(80px)' }} />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Your Name</label>
                <input type="text" required value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={inputClass} placeholder="John Doe" />
              </div>
              <div>
                <label className={labelClass}>Email Address</label>
                <input type="email" required value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={inputClass} placeholder="john@company.com" />
              </div>
            </div>

            <div>
              <label className={labelClass}>Project Type</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {PROJECT_TYPES.map((type) => (
                  <button key={type} type="button"
                    onClick={() => updateField('type', type)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border cursor-pointer ${
                      form.type === type
                        ? isDark ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-cyan-100 text-cyan-700 border-cyan-200'
                        : isDark ? 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >{type}</button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Message</label>
              <textarea rows={4} required value={form.message}
                onChange={(e) => updateField('message', e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder="Tell us about your project..." />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button type="submit" disabled={isSubmitting || isSuccess}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer group border-none ${
                isSuccess
                  ? 'bg-emerald-500 text-white cursor-default'
                  : 'bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40'
              }`}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : isSuccess ? (
                <><CheckCircle size={20} /> Message Sent!</>
              ) : (
                <>Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
