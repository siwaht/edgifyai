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

const darkColors = {
  bg: '#09090b',
  bgAlt: '#0c0c0f',
  bgCard: 'rgba(24, 24, 27, 0.6)',
  bgCardSolid: '#18181b',
  text: '#fafafa',
  textSecondary: '#a1a1aa',
  textMuted: '#71717a',
  border: 'rgba(255,255,255,0.07)',
  borderHover: 'rgba(255,255,255,0.14)',
  accent: '#06b6d4',
  accentLight: '#22d3ee',
  accentMuted: 'rgba(6, 182, 212, 0.12)',
  warm: '#f59e0b',
  warmMuted: 'rgba(245, 158, 11, 0.12)',
  success: '#10b981',
  successMuted: 'rgba(16, 185, 129, 0.12)',
};

const lightColors = {
  bg: '#ffffff',
  bgAlt: '#f8fafc',
  bgCard: 'rgba(255, 255, 255, 0.8)',
  bgCardSolid: '#ffffff',
  text: '#09090b',
  textSecondary: '#52525b',
  textMuted: '#a1a1aa',
  border: 'rgba(0,0,0,0.06)',
  borderHover: 'rgba(0,0,0,0.12)',
  accent: '#0891b2',
  accentLight: '#06b6d4',
  accentMuted: 'rgba(8, 145, 178, 0.08)',
  warm: '#d97706',
  warmMuted: 'rgba(217, 119, 6, 0.08)',
  success: '#059669',
  successMuted: 'rgba(5, 150, 105, 0.08)',
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.classList.toggle('light', !isDark);
  }, [isDark]);

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
