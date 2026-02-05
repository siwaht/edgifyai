import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Twitter, Linkedin, Github, Mail, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SocialLink = ({ icon: Icon, href, label }) => {
  const { isDark } = useTheme();
  return (
    <motion.a
      href={href}
      aria-label={label}
      className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300 ${
        isDark 
          ? 'border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/5' 
          : 'border-gray-200 text-gray-500 hover:text-cyan-600 hover:border-cyan-600/30 hover:bg-cyan-600/5'
      }`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon size={18} />
    </motion.a>
  );
};

const FooterLink = ({ href, children }) => {
  const { isDark } = useTheme();
  return (
    <motion.a
      href={href}
      className={`relative group transition-colors duration-300 ${
        isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-500 hover:text-cyan-600'
      }`}
      whileHover={{ x: 4 }}
    >
      {children}
      <span className={`absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
        isDark ? 'bg-cyan-400' : 'bg-cyan-600'
      }`} />
    </motion.a>
  );
};

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isDark } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => { setIsSubmitted(false); setEmail(''); }, 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <footer 
      ref={footerRef}
      className={`relative pt-20 md:pt-28 pb-8 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <motion.div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: isDark 
            ? 'linear-gradient(90deg, transparent 0%, rgba(0,255,255,0.5) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(8,145,178,0.5) 50%, transparent 100%)',
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(0,255,255,0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(8,145,178,0.1) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 md:mb-24"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <h2 className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 leading-[0.9] ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <span>See the</span><br />
              <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>Invisible.</span>
            </h2>

            <form onSubmit={handleSubmit} className="max-w-md">
              <div className="relative">
                <div className={`flex items-center border-b transition-colors duration-300 ${
                  isDark ? 'border-white/20 focus-within:border-cyan-400/50' : 'border-gray-300 focus-within:border-cyan-600/50'
                }`}>
                  <Mail size={20} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`bg-transparent border-none outline-none text-base md:text-lg w-full py-3 ml-3 ${
                      isDark ? 'text-white placeholder-gray-600' : 'text-gray-900 placeholder-gray-400'
                    }`}
                    disabled={isSubmitted}
                  />
                  <motion.button
                    type="submit"
                    className={`p-2 transition-colors ${isDark ? 'text-cyan-400 hover:text-white' : 'text-cyan-600 hover:text-cyan-800'}`}
                    whileHover={{ scale: 1.1, x: 4 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={isSubmitted}
                  >
                    {isSubmitted ? <CheckCircle size={24} className="text-green-500" /> : <ArrowRight size={24} />}
                  </motion.button>
                </div>
                {isSubmitted && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-green-500 text-sm mt-2">
                    Thanks for subscribing!
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className={`font-semibold mb-6 uppercase text-xs tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Platform</h4>
              <ul className="space-y-4">
                {['Agents', 'Orchestration', 'Integrations', 'Security'].map((item) => (
                  <li key={item}><FooterLink href="#">{item}</FooterLink></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-6 uppercase text-xs tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Company</h4>
              <ul className="space-y-4">
                {['About', 'Careers', 'Blog', 'Contact'].map((item) => (
                  <li key={item}><FooterLink href="#">{item}</FooterLink></li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className={`font-semibold mb-6 uppercase text-xs tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Connect</h4>
              <div className="flex gap-3">
                <SocialLink icon={Twitter} href="#" label="Twitter" />
                <SocialLink icon={Linkedin} href="#" label="LinkedIn" />
                <SocialLink icon={Github} href="#" label="GitHub" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${
            isDark ? 'border-white/10' : 'border-gray-200'
          }`}
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className={`w-2 h-2 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              &copy; {new Date().getFullYear()} Agenticos Labs Inc. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <motion.a href="#" className={`transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`} whileHover={{ y: -2 }}>
              Privacy Policy
            </motion.a>
            <motion.a href="#" className={`transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`} whileHover={{ y: -2 }}>
              Terms of Service
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
