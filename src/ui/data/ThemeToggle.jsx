import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const KEY = 'theme';

// Dark unless the visitor has picked light before.
const readTheme = () => {
  try {
    if (localStorage.getItem(KEY) === 'light') return 'light';
  } catch {
    /* storage blocked: fall through */
  }
  return 'dark';
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="fixed right-5 bottom-5 z-40 flex size-12 items-center justify-center rounded-full border border-black/10 bg-white/80 text-neutral-900 shadow-lg backdrop-blur transition-transform hover:scale-105 active:scale-95 dark:border-white/15 dark:bg-neutral-900/80 dark:text-stone-100"
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
}
