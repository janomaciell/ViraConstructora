import { useEffect } from 'react'
import { applySeo, applyStructuredData } from '../lib/seo'

/**
 * Aplica los metadatos de la página y, si hay, sus datos estructurados.
 * Se vuelve a ejecutar cuando cambia el idioma o el contenido.
 */
export const useSeo = ({ structuredData, ...seo }, deps = []) => {
  useEffect(() => {
    applySeo(seo)
    applyStructuredData(structuredData)

    return () => applyStructuredData(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useSeo
