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
  bg: '#0a0a0f',
  bgAlt: '#111118',
  bgCard: 'rgba(28, 28, 36, 0.65)',
  bgCardSolid: '#1c1c24',
  text: '#f4f4f5',
  textSecondary: '#a1a1aa',
  textMuted: '#71717a',
  border: 'rgba(255,255,255,0.08)',
  borderHover: 'rgba(255,255,255,0.16)',
  accent: '#22d3ee',
  accentLight: '#67e8f9',
  accentMuted: 'rgba(34, 211, 238, 0.1)',
  warm: '#f59e0b',
  warmMuted: 'rgba(245, 158, 11, 0.12)',
  success: '#10b981',
  successMuted: 'rgba(16, 185, 129, 0.12)',
};

const lightColors = {
  bg: '#ffffff',
  bgAlt: '#f4f6f8',
  bgCard: 'rgba(255, 255, 255, 0.85)',
  bgCardSolid: '#ffffff',
  text: '#09090b',
  textSecondary: '#3f3f46',
  textMuted: '#71717a',
  border: 'rgba(0,0,0,0.09)',
  borderHover: 'rgba(0,0,0,0.16)',
  accent: '#0891b2',
  accentLight: '#06b6d4',
  accentMuted: 'rgba(8, 145, 178, 0.1)',
  warm: '#d97706',
  warmMuted: 'rgba(217, 119, 6, 0.1)',
  success: '#059669',
  successMuted: 'rgba(5, 150, 105, 0.1)',
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
