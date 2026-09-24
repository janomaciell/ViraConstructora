import { useEffect } from 'react'

/** Bloquea el scroll del body sin provocar salto por la barra de scroll. */
export const useLockBodyScroll = (locked) => {
  useEffect(() => {
    if (!locked) return undefined

    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const scrollbar = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [locked])
}

export default useLockBodyScroll
