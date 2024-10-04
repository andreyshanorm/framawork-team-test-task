import React, { useMemo, useState } from 'react';

type ThemeContextType = {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => null,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const storedTheme = localStorage.getItem('theme');

  const currentTheme = storedTheme ? (storedTheme as 'dark' | 'light') : 'dark';

  const [theme, setTheme] = useState(currentTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);

      return newTheme;
    });
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <div className={`${theme} bg-background main-page`}>{children}</div>
    </ThemeContext.Provider>
  );
}
