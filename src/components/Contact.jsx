import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, CheckCircle, MapPin, Mail, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
    const { isDark } = useTheme();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        type: 'Enterprise AI',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [activeField, setActiveField] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormState({ name: '', email: '', type: 'Enterprise AI', message: '' });
            setTimeout(() => setIsSuccess(false), 5000);
        }, 2000);
    };

    const projectTypes = ['Enterprise AI', 'Voice Agents', 'Consulting', 'Custom Dev'];

    const sectionStyle = {
        position: 'relative',
        padding: '120px 20px',
        background: isDark ? '#020617' : '#f8fafc',
        overflow: 'hidden',
    };

    return (
        <section ref={ref} style={sectionStyle} id="contact">
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full animate-float" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full animate-float" style={{ animationDelay: '-4s' }} />
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 ${isDark ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-cyan-100/50 text-cyan-700 border border-cyan-200'
                        }`}>
                        <MessageSquare size={14} />
                        Get in Touch
                    </span>

                    <h2 className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Ready to transform your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Enterprise?</span>
                    </h2>

                    <p className={`text-lg leading-relaxed mb-12 max-w-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Book a consultation with our AI architects. We'll analyze your workflows and propose a custom automation strategy.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className={`p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-white shadow-lg shadow-cyan-500/5'}`}>
                                <Mail className="text-cyan-400" size={24} />
                            </div>
                            <div>
                                <h4 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Email Us</h4>
                                <p className={`${isDark ? 'text-slate-500' : 'text-slate-500'}`}>hello@agenticos.ai</p>
                                <p className={`${isDark ? 'text-slate-500' : 'text-slate-500'}`}>support@agenticos.ai</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className={`p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-white shadow-lg shadow-cyan-500/5'}`}>
                                <MapPin className="text-purple-400" size={24} />
                            </div>
                            <div>
                                <h4 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Headquarters</h4>
                                <p className={`${isDark ? 'text-slate-500' : 'text-slate-500'}`}>100 Innovation Dr, Suite 500</p>
                                <p className={`${isDark ? 'text-slate-500' : 'text-slate-500'}`}>San Francisco, CA 94103</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`rounded-3xl p-8 md:p-10 relative overflow-hidden backdrop-blur-xl border ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/80 border-slate-200 shadow-2xl shadow-slate-200/50'
                        }`}
                >
                    {/* Form Glow */}
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none -z-10`} />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                                <label className={`text-xs font-semibold uppercase tracking-wider mb-2 block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    onFocus={() => setActiveField('name')}
                                    onBlur={() => setActiveField(null)}
                                    className={`w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-300 border ${isDark
                                            ? 'bg-white/5 text-white border-white/10 focus:border-cyan-500/50 focus:bg-white/10'
                                            : 'bg-slate-50 text-slate-900 border-slate-200 focus:border-cyan-500/50 focus:bg-white'
                                        }`}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="relative">
                                <label className={`text-xs font-semibold uppercase tracking-wider mb-2 block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    onFocus={() => setActiveField('email')}
                                    onBlur={() => setActiveField(null)}
                                    className={`w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-300 border ${isDark
                                            ? 'bg-white/5 text-white border-white/10 focus:border-cyan-500/50 focus:bg-white/10'
                                            : 'bg-slate-50 text-slate-900 border-slate-200 focus:border-cyan-500/50 focus:bg-white'
                                        }`}
                                    placeholder="john@company.com"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className={`text-xs font-semibold uppercase tracking-wider mb-2 block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Project Type
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {projectTypes.map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setFormState({ ...formState, type })}
                                        className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${formState.type === type
                                                ? isDark ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-cyan-100 text-cyan-700 border-cyan-200'
                                                : isDark ? 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <label className={`text-xs font-semibold uppercase tracking-wider mb-2 block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Message
                            </label>
                            <textarea
                                rows={4}
                                required
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                onFocus={() => setActiveField('message')}
                                onBlur={() => setActiveField(null)}
                                className={`w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-300 resize-none border ${isDark
                                        ? 'bg-white/5 text-white border-white/10 focus:border-cyan-500/50 focus:bg-white/10'
                                        : 'bg-slate-50 text-slate-900 border-slate-200 focus:border-cyan-500/50 focus:bg-white'
                                    }`}
                                placeholder="Tell us about your project..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || isSuccess}
                            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 overflow-hidden relative group ${isSuccess
                                    ? 'bg-green-500 text-white cursor-default'
                                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                                }`}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {isSubmitting ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                ) : isSuccess ? (
                                    <>
                                        <CheckCircle size={20} />
                                        Message Sent!
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
