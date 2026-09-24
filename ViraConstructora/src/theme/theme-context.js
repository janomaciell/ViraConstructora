import { createContext, useContext } from 'react'

export const THEME_STORAGE_KEY = 'vira-theme'

/** 'light' | 'dark' | 'system' */
export const ThemeContext = createContext({
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)
