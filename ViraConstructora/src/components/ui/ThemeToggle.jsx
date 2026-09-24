import { useTheme } from '../../theme/theme-context'
import { useLanguage } from '../../i18n/language-context'
import './Toggles.css'

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.4v2.2M12 19.4v2.2M4.2 12H2M22 12h-2.2M5.9 5.9 4.4 4.4M19.6 19.6l-1.5-1.5M18.1 5.9l1.5-1.5M4.4 19.6l1.5-1.5" strokeLinecap="round" />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" strokeLinejoin="round" />
  </svg>
)

const ThemeToggle = ({ className = '' }) => {
  const { resolvedTheme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={(event) => {
        // Con teclado no hay coordenadas: se usa el centro del botón
        const box = event.currentTarget.getBoundingClientRect()
        toggleTheme({
          x: event.clientX || box.left + box.width / 2,
          y: event.clientY || box.top + box.height / 2,
        })
      }}
      className={`toggle toggle--icon ${className}`.trim()}
      aria-label={isDark ? t.meta.themeToLight : t.meta.themeToDark}
      title={isDark ? t.meta.themeToLight : t.meta.themeToDark}
    >
      <span className={`toggle__icon ${isDark ? 'is-hidden' : ''}`}>
        <MoonIcon />
      </span>
      <span className={`toggle__icon toggle__icon--stacked ${isDark ? '' : 'is-hidden'}`}>
        <SunIcon />
      </span>
    </button>
  )
}

export default ThemeToggle
