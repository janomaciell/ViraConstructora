import { useCallback, useEffect, useMemo, useState } from 'react'
import { LanguageContext, LANG_STORAGE_KEY, SUPPORTED_LANGS } from './language-context'
import { translations } from './translations'

const readStored = () => {
  try {
    const value = localStorage.getItem(LANG_STORAGE_KEY)
    if (SUPPORTED_LANGS.includes(value)) return value
  } catch {
    /* almacenamiento no disponible */
  }
  // El español es el idioma de origen de la marca y el contenido canónico.
  return 'es'
}

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(readStored)

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  const setLang = useCallback((next) => {
    if (!SUPPORTED_LANGS.includes(next)) return
    setLangState(next)
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next)
    } catch {
      /* almacenamiento no disponible */
    }
  }, [])

  const toggleLang = useCallback(() => {
    setLang(lang === 'es' ? 'en' : 'es')
  }, [lang, setLang])

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t: translations[lang] }),
    [lang, setLang, toggleLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export default LanguageProvider
