import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = ['Solutions', 'Technology', 'Enterprise', 'Company'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    padding: '16px 20px',
  };

  const containerStyle = {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scrolled ? '12px 24px' : '16px 24px',
    borderRadius: 24,
    background: scrolled
      ? isDark ? 'rgba(2, 6, 23, 0.6)' : 'rgba(255, 255, 255, 0.7)'
      : 'transparent',
    backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
    border: scrolled
      ? `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`
      : '1px solid transparent',
    boxShadow: scrolled
      ? isDark ? '0 10px 40px -10px rgba(0,0,0,0.5)' : '0 10px 30px -10px rgba(0,0,0,0.1)'
      : 'none',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
    color: isDark ? '#fafafa' : '#09090b',
  };

  const logoIconStyle = {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: 'linear-gradient(135deg, #00FFFF 0%, #7c3aed 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    fontWeight: 800,
    fontSize: 20,
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
  };

  const navLinksStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  };

  const linkStyle = {
    padding: '10px 16px',
    fontSize: 14,
    fontWeight: 500,
    color: isDark ? '#a1a1aa' : '#52525b',
    textDecoration: 'none',
    borderRadius: 8,
    transition: 'all 0.2s ease',
  };

  const buttonStyle = {
    padding: '10px 24px',
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 100,
    border: 'none',
    cursor: 'pointer',
    background: isDark ? '#ffffff' : '#030712',
    color: isDark ? '#030712' : '#ffffff',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: isDark ? '0 0 20px rgba(255, 255, 255, 0.1)' : '0 10px 20px rgba(0,0,0,0.1)',
  };

  const themeButtonStyle = {
    padding: 10,
    borderRadius: 10,
    border: 'none',
    cursor: 'pointer',
    background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
    color: isDark ? '#a1a1aa' : '#52525b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const mobileButtonStyle = {
    padding: 10,
    borderRadius: 10,
    border: 'none',
    cursor: 'pointer',
    background: 'transparent',
    color: isDark ? '#fafafa' : '#09090b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <>
      <header style={navStyle}>
        <div style={containerStyle}>
          <a href="#" style={logoStyle}>
            <div style={logoIconStyle}>A</div>
            <span style={{ fontWeight: 700, fontSize: 18 }}>Agenticos</span>
          </a>

          {/* Desktop Nav */}
          <nav style={{ ...navLinksStyle, display: 'none', '@media (min-width: 768px)': { display: 'flex' } }} className="hidden md:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} style={linkStyle}>
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div style={{ display: 'none', alignItems: 'center', gap: 12 }} className="hidden md:flex">
            <button onClick={toggleTheme} style={themeButtonStyle}>
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button style={buttonStyle}>Get Started</button>
          </div>

          {/* Mobile Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="flex md:hidden">
            <button onClick={toggleTheme} style={themeButtonStyle}>
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={mobileButtonStyle}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 40,
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
              }}
              className="md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: 'fixed',
                top: 80,
                left: 16,
                right: 16,
                zIndex: 50,
                padding: 24,
                borderRadius: 16,
                background: isDark ? '#18181b' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              }}
              className="md:hidden"
            >
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      padding: '14px 16px',
                      fontSize: 16,
                      fontWeight: 500,
                      color: isDark ? '#e4e4e7' : '#3f3f46',
                      textDecoration: 'none',
                      borderRadius: 10,
                    }}
                  >
                    {item}
                  </a>
                ))}
              </nav>
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                <button style={{ ...buttonStyle, width: '100%', padding: '14px 20px' }}>
                  Get Started
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
