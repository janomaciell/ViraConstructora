import { useEffect } from 'react'

const SELECTOR = '[data-reveal]:not(.is-inview), .mask-line:not(.is-inview)'

/* Un elemento se revela cuando su borde superior entró un 8% en la pantalla. */
const THRESHOLD = 0.92

/**
 * Sistema de reveals de la plataforma.
 * El vocabulario de animación vive en CSS (`[data-reveal]`); acá sólo se
 * marca la entrada.
 *
 * Se mide con getBoundingClientRect y no con IntersectionObserver: los
 * reveals de tipo `curtain` arrancan con `clip-path: inset(100% 0 0 0)`,
 * y un elemento recortado a cero puede no llegar nunca a "intersecar".
 * El barrido corre una vez por frame y sólo sobre lo que todavía falta,
 * así que se apaga solo cuando la página terminó de revelarse.
 */
export const useScrollReveal = (deps = []) => {
  useEffect(() => {
    let pending = Array.from(document.querySelectorAll(SELECTOR))
    if (!pending.length) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      pending.forEach((node) => node.classList.add('is-inview'))
      return undefined
    }

    let frame = 0
    let timer = 0
    let stopped = false

    const clearPending = () => {
      if (frame) window.cancelAnimationFrame(frame)
      if (timer) window.clearTimeout(timer)
      frame = 0
      timer = 0
    }

    const sweep = () => {
      clearPending()

      /* Si no se puede medir la ventana, se muestra todo: una página que
         no puede calcular su viewport igual tiene que ser legible. */
      if (!window.innerHeight) {
        pending.forEach((node) => node.classList.add('is-inview'))
        pending = []
        stop()
        return
      }

      const limit = window.innerHeight * THRESHOLD
      const still = []

      for (const node of pending) {
        if (node.getBoundingClientRect().top < limit) node.classList.add('is-inview')
        else still.push(node)
      }

      pending = still
      if (!pending.length) stop()
    }

    /* Se agenda por rAF (barato, alineado al pintado) y también por
       timeout: si el navegador tiene el rAF suspendido —pestaña en
       segundo plano, ventana oculta— el contenido igual se revela. */
    const schedule = () => {
      if (stopped || frame || timer) return
      frame = window.requestAnimationFrame(sweep)
      timer = window.setTimeout(sweep, 120)
    }

    function stop() {
      if (stopped) return
      stopped = true
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      clearPending()
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    schedule()

    return stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useScrollReveal
