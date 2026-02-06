import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

const getInitialTheme = () => {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem('theme');
  if (saved) return saved === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Shared color tokens derived from theme state
const darkColors = {
  bg: '#09090b',
  bgAlt: '#0c0c0f',
  bgCard: '#18181b',
  text: '#fafafa',
  textSecondary: '#a1a1aa',
  textMuted: '#71717a',
  border: 'rgba(255,255,255,0.08)',
  borderHover: 'rgba(255,255,255,0.15)',
  accent: '#06b6d4',
  accentMuted: 'rgba(6, 182, 212, 0.15)',
  purple: '#8b5cf6',
  purpleMuted: 'rgba(139, 92, 246, 0.12)',
};

const lightColors = {
  bg: '#ffffff',
  bgAlt: '#f4f4f5',
  bgCard: '#ffffff',
  text: '#09090b',
  textSecondary: '#52525b',
  textMuted: '#a1a1aa',
  border: 'rgba(0,0,0,0.08)',
  borderHover: 'rgba(0,0,0,0.15)',
  accent: '#0891b2',
  accentMuted: 'rgba(8, 145, 178, 0.1)',
  purple: '#7c3aed',
  purpleMuted: 'rgba(124, 58, 237, 0.08)',
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.classList.toggle('light', !isDark);
  }, [isDark]);

  // Listen for system theme changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (!localStorage.getItem('theme')) setIsDark(e.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleTheme = useCallback(() => setIsDark((prev) => !prev), []);
  const colors = isDark ? darkColors : lightColors;

  const value = useMemo(() => ({ isDark, toggleTheme, colors }), [isDark, toggleTheme, colors]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
