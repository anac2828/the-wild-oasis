import { createContext } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { useContext } from 'react';
import { useEffect } from 'react';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  // @params, initial state and "key" value
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'isDarkMode'
  ); // will set the dark mode to user match users preferance

  function toggleDarkMode() {
    // Sets isDark to the opposite of what is currently
    setIsDarkMode((isDark) => !isDark);
  }

  // Will run when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error('DarkModeContext was used outside DarkModeProvider.');
  return context;
}

export { DarkModeProvider, useDarkMode };
