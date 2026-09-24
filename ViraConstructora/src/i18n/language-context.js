import { createContext, useContext } from 'react'

export const LANG_STORAGE_KEY = 'vira-lang'
export const SUPPORTED_LANGS = ['es', 'en']

export const LanguageContext = createContext({
  lang: 'es',
  setLang: () => {},
  toggleLang: () => {},
  t: {},
})

export const useLanguage = () => useContext(LanguageContext)
