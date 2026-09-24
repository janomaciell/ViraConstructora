import { useCallback, useEffect, useRef, useState } from 'react'
import { posterUrl, videoSource } from '../../lib/media'
import { getVideoMeta } from '../../data/media-manifest'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

/**
 * Video del sistema.
 * · `preload="none"` + poster: no se descarga un byte hasta que hace falta
 * · la fuente se adjunta recién cuando el video entra en viewport
 * · se pausa al salir de pantalla (ahorra CPU/GPU y batería en mobile)
 * · con prefers-reduced-motion no se reproduce solo: queda el poster
 */
const SmartVideo = ({
  src,
  poster,
  ratio,
  className = '',
  ambient = true,
  controls = false,
  muted = true,
  videoRef,
  onReady,
  ...rest
}) => {
  const localRef = useRef(null)
  const node = videoRef || localRef
  const [attached, setAttached] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  const meta = getVideoMeta(src)
  const source = videoSource(src, { streamId: meta.streamId })
  const posterPath = poster || meta.poster
  const aspect = ratio || meta.ratio

  const play = useCallback(() => {
    const element = node.current
    if (!element || reducedMotion || !ambient) return
    element.play?.().catch(() => {
      /* el navegador puede bloquear la reproducción: queda el poster */
    })
  }, [node, ambient, reducedMotion])

  useEffect(() => {
    const element = node.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAttached(true)
          play()
        } else if (ambient) {
          element.pause?.()
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [node, ambient, play])

  const handleLoadedData = (event) => {
    play()
    onReady?.(event)
  }

  return (
    <video
      ref={node}
      className={className}
      /* Asignar src recién acá es lo que dispara la descarga */
      src={attached ? source.src : undefined}
      poster={posterPath ? posterUrl(posterPath) : undefined}
      preload="none"
      playsInline
      muted={muted}
      loop={ambient}
      controls={controls}
      style={aspect ? { aspectRatio: aspect } : undefined}
      onLoadedData={handleLoadedData}
      {...rest}
    />
  )
}

export default SmartVideo
