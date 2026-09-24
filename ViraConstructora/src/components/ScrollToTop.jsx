import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Al navegar, la página arranca arriba. Antes cada página tenía su propio
 * useEffect tocando el DOM del header; ahora es una sola responsabilidad.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, left: 0, behavior: reduced ? 'auto' : 'instant' })
  }, [pathname])

  return null
}

export default ScrollToTop
