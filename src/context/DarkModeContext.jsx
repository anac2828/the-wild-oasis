import { createContext } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import { useContext } from 'react'
import { useEffect } from 'react'

const DarkModeContext = createContext()

// ** CONTEXT PROVIDER ** /
function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    // Initial state
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    // "key" value to store it in local storage
    'isDarkMode',
  )

  const toggleDarkMode = () => {
    // Sets isDark to the opposite of what is currently
    setIsDarkMode((isDark) => !isDark)
  }

  // Will run when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      // Updates the classes in the <HTML> element
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
    } else {
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

// ** CUSTOM HOOK TO CONSUME CONTEXT
function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (context === undefined)
    throw new Error('DarkModeContext was used outside DarkModeProvider.')
  return context
}

export { DarkModeProvider, useDarkMode }
