import { useCallback, useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import { ThemeContext, THEME_STORAGE_KEY } from './theme-context'

const readStored = () => {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : 'system'
  } catch {
    return 'system'
  }
}

const systemPrefersDark = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches

/** Escribe el tema en el documento. Se usa en el efecto y, además, dentro
 *  de la View Transition, donde el DOM tiene que cambiar de forma síncrona. */
const paintTheme = (theme, resolved) => {
  const root = document.documentElement

  if (theme === 'system') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', theme)

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', resolved === 'dark' ? '#0B0D10' : '#FBFBF9')
}

const DURATION = 620

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(readStored)
  const [systemDark, setSystemDark] = useState(systemPrefersDark)

  // Seguir la preferencia del sistema mientras el usuario no elija explícitamente
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event) => setSystemDark(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const resolvedTheme = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme

  useEffect(() => {
    const root = document.documentElement
    paintTheme(theme, resolvedTheme)

    // Durante el círculo no hace falta: la transición ya cubre el cambio
    if (root.dataset.themeTransition) return undefined

    // Sólo transicionan los colores durante el cambio: nunca el layout
    root.classList.add('theme-switching')
    const timeout = window.setTimeout(() => root.classList.remove('theme-switching'), 500)

    return () => window.clearTimeout(timeout)
  }, [theme, resolvedTheme])

  const setTheme = useCallback((next) => {
    setThemeState(next)
    try {
      if (next === 'system') localStorage.removeItem(THEME_STORAGE_KEY)
      else localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      /* almacenamiento no disponible: la preferencia vive sólo en memoria */
    }
  }, [])

  /**
   * Cambio de tema con un círculo que se abre desde el punto que se tocó.
   * Si el navegador no soporta View Transitions, o el usuario pidió menos
   * movimiento, el cambio se aplica igual: sólo pierde la animación.
   */
  const toggleTheme = useCallback(
    (origin) => {
      const next = resolvedTheme === 'dark' ? 'light' : 'dark'
      const root = document.documentElement
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduced || !origin || typeof document.startViewTransition !== 'function') {
        setTheme(next)
        return
      }

      root.dataset.themeTransition = 'circle'

      const transition = document.startViewTransition(() => {
        paintTheme(next, next)
        flushSync(() => setTheme(next))
      })

      transition.ready
        .then(() => {
          const { x, y } = origin
          const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y),
          )

          root.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: DURATION,
              easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
              pseudoElement: '::view-transition-new(root)',
            },
          )
        })
        .catch(() => {})

      transition.finished.finally(() => {
        delete root.dataset.themeTransition
      })
    },
    [resolvedTheme, setTheme],
  )

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
