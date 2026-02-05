import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Twitter, Linkedin, Github, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'API Docs'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'Guides', 'Support', 'Status'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
];

const Footer = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer 
      className="relative pt-16 md:pt-24 pb-8"
      style={{ 
        background: isDark ? '#0c0c0f' : '#fafafa',
        borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` 
      }}
    >
      <div className="container-custom">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-12 md:mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)' }}
              >
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span 
                className="font-bold text-lg"
                style={{ color: isDark ? '#fafafa' : '#09090b' }}
              >
                Agenticos
              </span>
            </div>

            <p 
              className="text-sm mb-6 max-w-sm"
              style={{ color: isDark ? '#a1a1aa' : '#52525b' }}
            >
              Building the future of autonomous AI. Deploy intelligent agents that 
              work around the clock.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubmit} className="max-w-sm">
              <label 
                className="text-sm font-medium mb-2 block"
                style={{ color: isDark ? '#fafafa' : '#09090b' }}
              >
                Subscribe to updates
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={submitted}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: isDark ? '#18181b' : '#ffffff',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    color: isDark ? '#fafafa' : '#09090b',
                  }}
                />
                <button 
                  type="submit"
                  disabled={submitted}
                  className="px-4 py-2.5 rounded-xl transition-all"
                  style={{
                    background: 'var(--accent)',
                    color: '#fff',
                  }}
                >
                  {submitted ? <CheckCircle size={18} /> : <ArrowRight size={18} />}
                </button>
              </div>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm mt-2"
                  style={{ color: '#10b981' }}
                >
                  Thanks for subscribing!
                </motion.p>
              )}
            </form>
          </div>

          {/* Links */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h4 
                    className="text-sm font-semibold mb-4"
                    style={{ color: isDark ? '#fafafa' : '#09090b' }}
                  >
                    {category}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm transition-colors hover:underline"
                          style={{ color: isDark ? '#a1a1aa' : '#52525b' }}
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div 
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}
        >
          <p 
            className="text-sm"
            style={{ color: isDark ? '#71717a' : '#a1a1aa' }}
          >
            © {new Date().getFullYear()} Agenticos Labs Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="p-2.5 rounded-xl transition-colors"
                style={{
                  color: isDark ? '#71717a' : '#a1a1aa',
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
