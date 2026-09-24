import { useTheme } from '../../theme/theme-context'
import { useLanguage } from '../../i18n/language-context'
import { assetUrl } from '../../lib/media'

const RATIO = 800 / 576

/**
 * Logotipo completo de VIRA.
 * `tone`:
 *   'auto'  → sigue el tema (color en claro, blanco en oscuro)
 *   'dark'  → para fondos oscuros / sobre imagen (versión blanca)
 *   'light' → para fondos claros (versión a color)
 */
const Logo = ({ tone = 'auto', width = 190, className = '', priority = false }) => {
  const { resolvedTheme } = useTheme()
  const { t } = useLanguage()

  const onDark = tone === 'dark' || (tone === 'auto' && resolvedTheme === 'dark')
  const file = onDark ? 'vira-blanco' : 'vira-color'
  const height = Math.round(width / RATIO)

  return (
    <img
      src={assetUrl(`img/brand/${file}-400.png`)}
      srcSet={`${assetUrl(`img/brand/${file}-400.png`)} 400w, ${assetUrl(`img/brand/${file}-800.png`)} 800w`}
      sizes={`${width}px`}
      width={width}
      height={height}
      alt={t.meta.brand}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  )
}

export default Logo
