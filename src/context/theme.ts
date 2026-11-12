import { createContext, useContext } from 'react';

export interface ThemeColors {
  bg: string;
  bgAlt: string;
  bgCard: string;
  bgCardSolid: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderHover: string;
  accent: string;
  accentLight: string;
  accentMuted: string;
  warm: string;
  warmMuted: string;
  success: string;
  successMuted: string;
}

export interface ThemeContextValue {
  isDark: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

export const getInitialTheme = (): boolean => {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem('theme');
  if (saved) return saved === 'dark';
  return true;
};

export const darkColors: ThemeColors = {
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

export const lightColors: ThemeColors = {
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
