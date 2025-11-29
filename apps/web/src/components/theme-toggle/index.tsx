'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useShallow } from 'zustand/react/shallow';
import { useThemeStore, type ThemeState } from '@repo/utils';
import styles from './theme-toggle.module.scss';

const ThemeToggle = () => {
  const { setTheme, getEffectiveTheme } = useThemeStore(
    useShallow((state: ThemeState) => ({
      setTheme: state.setTheme,
      getEffectiveTheme: state.getEffectiveTheme,
    }))
  );
  const effectiveTheme = getEffectiveTheme();

  const handleToggle = () => {
    const newTheme = effectiveTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={styles['theme-toggle']}
      aria-label={`Switch to ${effectiveTheme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${effectiveTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      {effectiveTheme === 'light' ? (
        <MoonIcon width={20} height={20} />
      ) : (
        <SunIcon width={20} height={20} />
      )}
    </button>
  );
};

export default ThemeToggle;
