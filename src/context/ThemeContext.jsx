import { useState, useEffect, useCallback, useMemo } from 'react';
import { ThemeContext, getInitialTheme, readStoredTheme, storeTheme, darkColors, lightColors } from './theme';

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.classList.toggle('light', !isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isDark ? darkColors.bg : lightColors.bg);
  }, [isDark]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (!readStoredTheme()) setIsDark(e.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      storeTheme(next ? 'dark' : 'light');
      return next;
    });
  }, []);

  const colors = isDark ? darkColors : lightColors;
  const value = useMemo(() => ({ isDark, toggleTheme, colors }), [isDark, toggleTheme, colors]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
