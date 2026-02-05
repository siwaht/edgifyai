import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Twitter, Linkedin, Github, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'API Docs'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'Guides', 'Support', 'Status'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
};

const Footer = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setEmail(''); }, 3000);
    }
  };

  const sectionStyle = {
    padding: '64px 20px 32px',
    background: isDark ? '#09090b' : '#ffffff',
    borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
  };

  const containerStyle = {
    maxWidth: 1200,
    margin: '0 auto',
  };

  const topStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 48,
    marginBottom: 48,
  };

  const brandStyle = {
    maxWidth: 320,
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    textDecoration: 'none',
    color: isDark ? '#fafafa' : '#09090b',
  };

  const logoIconStyle = {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: 700,
    fontSize: 14,
  };

  const descStyle = {
    fontSize: 14,
    lineHeight: 1.7,
    color: isDark ? '#a1a1aa' : '#52525b',
    marginBottom: 24,
  };

  const inputContainerStyle = {
    display: 'flex',
    gap: 8,
  };

  const inputStyle = {
    flex: 1,
    padding: '12px 16px',
    fontSize: 14,
    borderRadius: 10,
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
    background: isDark ? '#18181b' : '#fafafa',
    color: isDark ? '#fafafa' : '#09090b',
    outline: 'none',
  };

  const submitButtonStyle = {
    padding: '12px 16px',
    borderRadius: 10,
    border: 'none',
    background: isDark ? '#06b6d4' : '#0891b2',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const linksContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 32,
  };

  const linkGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  };

  const linkTitleStyle = {
    fontSize: 13,
    fontWeight: 600,
    color: isDark ? '#fafafa' : '#09090b',
    marginBottom: 4,
  };

  const linkStyle = {
    fontSize: 14,
    color: isDark ? '#a1a1aa' : '#52525b',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  };

  const bottomStyle = {
    paddingTop: 32,
    borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const copyrightStyle = {
    fontSize: 14,
    color: isDark ? '#71717a' : '#a1a1aa',
  };

  const socialStyle = {
    display: 'flex',
    gap: 8,
  };

  const socialButtonStyle = {
    padding: 10,
    borderRadius: 10,
    border: 'none',
    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    color: isDark ? '#71717a' : '#a1a1aa',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <footer style={sectionStyle}>
      <div style={containerStyle}>
        <div style={topStyle} className="lg:grid-cols-2">
          <div style={brandStyle}>
            <a href="#" style={logoStyle}>
              <div style={logoIconStyle}>A</div>
              <span style={{ fontWeight: 700, fontSize: 18 }}>Agenticos</span>
            </a>
            <p style={descStyle}>
              Building the future of autonomous AI. Deploy intelligent agents that 
              work around the clock.
            </p>
            <form onSubmit={handleSubmit}>
              <label style={{ fontSize: 14, fontWeight: 500, color: isDark ? '#fafafa' : '#09090b', marginBottom: 8, display: 'block' }}>
                Subscribe to updates
              </label>
              <div style={inputContainerStyle}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={submitted}
                  style={inputStyle}
                />
                <button type="submit" disabled={submitted} style={submitButtonStyle}>
                  {submitted ? <CheckCircle size={18} /> : <ArrowRight size={18} />}
                </button>
              </div>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ fontSize: 13, color: '#10b981', marginTop: 8 }}
                >
                  Thanks for subscribing!
                </motion.p>
              )}
            </form>
          </div>

          <div style={linksContainerStyle} className="sm:grid-cols-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} style={linkGroupStyle}>
                <span style={linkTitleStyle}>{category}</span>
                {links.map((link) => (
                  <a key={link} href="#" style={linkStyle}>{link}</a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={bottomStyle} className="sm:flex-row">
          <p style={copyrightStyle}>
            © {new Date().getFullYear()} Agenticos Labs Inc. All rights reserved.
          </p>
          <div style={socialStyle}>
            {[Twitter, Linkedin, Github].map((Icon, i) => (
              <button key={i} style={socialButtonStyle}>
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
