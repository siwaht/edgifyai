import { createContext, useContext } from 'react';

export const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

const THEME_KEY = 'theme';

export const readStoredTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
};

export const storeTheme = (value) => {
  try {
    localStorage.setItem(THEME_KEY, value);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). The theme still works for this visit.
  }
};

export const getInitialTheme = () => {
  if (typeof window === 'undefined') return true;
  const saved = readStoredTheme();
  if (saved) return saved === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// JS mirror of the CSS custom properties in index.css.
// Used by SVG visualisations that need concrete colour values.
export const darkColors = {
  bg: '#08090d',
  bgAlt: '#0c0e13',
  text: '#f5f5f7',
  textSecondary: '#a9abb6',
  textMuted: '#757986',
  border: 'rgba(255,255,255,0.07)',
  borderHover: 'rgba(255,255,255,0.14)',
  accent: '#22d3ee',
  accentMuted: 'rgba(34, 211, 238, 0.12)',
  success: '#34d399',
};

export const lightColors = {
  bg: '#fbfbfc',
  bgAlt: '#f3f5f7',
  text: '#0b0c10',
  textSecondary: '#454852',
  textMuted: '#686c78',
  border: 'rgba(10,12,20,0.08)',
  borderHover: 'rgba(10,12,20,0.16)',
  accent: '#0891b2',
  accentMuted: 'rgba(8, 145, 178, 0.1)',
  success: '#059669',
};
