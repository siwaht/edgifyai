import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Twitter, Linkedin, Github, CheckCircle, Heart, Globe, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'API Docs', 'Changelog'],
  Company: ['About Us', 'Careers', 'Blog', 'Press Kit', 'Contact'],
  Resources: ['Community', 'Help Center', 'Status', 'Terms of Service', 'Privacy Policy'],
};

const Footer = () => {
  const { isDark } = useTheme();

  const sectionStyle = {
    position: 'relative',
    padding: '80px 20px 40px',
    background: isDark ? '#020617' : '#ffffff', // obsidian-deep
    borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
    overflow: 'hidden',
  };

  const containerStyle = {
    maxWidth: 1200,
    margin: '0 auto',
    position: 'relative',
    zIndex: 10,
  };

  // Background Mesh
  const FooterBackground = () => (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <div className="absolute bottom-0 left-[-20%] w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-[-20%] w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full" />
    </div>
  );

  return (
    <footer style={sectionStyle}>
      <FooterBackground />
      <div style={containerStyle}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a href="#" className="flex items-center gap-3 mb-6 no-underline">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/20">
                A
              </div>
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Agenticos
              </span>
            </a>
            <p className={`text-base leading-relaxed mb-8 max-w-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Building the operating system for the autonomous enterprise. Deploy intelligent agents that scale with your ambitions.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <button
                  key={i}
                  className={`p-3 rounded-xl transition-all duration-300 group ${isDark
                      ? 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-cyan-400'
                      : 'bg-black/5 hover:bg-black/10 text-slate-500 hover:text-cyan-600'
                    }`}
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="flex flex-col gap-4">
                <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  {category}
                </h4>
                <div className="flex flex-col gap-3">
                  {links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className={`text-[15px] transition-colors duration-200 hover:translate-x-1 ${isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-500 hover:text-cyan-600'
                        }`}
                      style={{ display: 'inline-block' }}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-6 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
          <p className={`text-sm flex items-center gap-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            © {new Date().getFullYear()} Agenticos Labs Inc. <span className="w-1 h-1 rounded-full bg-slate-700" /> All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              <Globe size={14} />
              <span>English (US)</span>
            </div>
            <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              <Shield size={14} />
              <span>SOC2 Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
