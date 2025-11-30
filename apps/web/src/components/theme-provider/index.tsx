'use client';

import { useEffect } from 'react';
import { ThemeState, useThemeStore } from '@repo/utils';
import { useShallow } from 'zustand/react/shallow';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, getEffectiveTheme } = useThemeStore(
    useShallow((state: ThemeState) => ({
      theme: state.theme,
      getEffectiveTheme: state.getEffectiveTheme,
    }))
  );

  useEffect(() => {
    // Initialize theme on mount
    const effectiveTheme = getEffectiveTheme();
    document.documentElement.setAttribute('data-theme', effectiveTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        const newEffectiveTheme = mediaQuery.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newEffectiveTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme, getEffectiveTheme]);

  return <>{children}</>;
};

export default ThemeProvider;
