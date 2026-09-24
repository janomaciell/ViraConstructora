/* ============================================================
   VIRA — MANIFIESTO DE VIDEO
   Datos de build de cada video: poster, relación de aspecto y,
   opcionalmente, su id en Cloudflare Stream.

   Los ids de Stream son públicos (no son secretos) y pueden
   inyectarse por entorno con VITE_CF_STREAM_IDS, un JSON:
   {"img/ANCLA/VideoAncla.mp4":"a1b2c3..."}
   ============================================================ */

const parseStreamIds = () => {
  const raw = import.meta.env?.VITE_CF_STREAM_IDS
  if (!raw) return {}

  try {
    return JSON.parse(raw)
  } catch {
    console.warn('[media] VITE_CF_STREAM_IDS no es un JSON válido; se ignora.')
    return {}
  }
}

const streamIds = parseStreamIds()

/**
 * Todos los videos con su poster. El poster evita descargar un solo byte
 * de video hasta que el usuario realmente lo necesita.
 */
export const videoManifest = {
  'img/ANCLA/VideoAncla.mp4': {
    poster: 'img/ANCLA/01.jpg',
    ratio: '16 / 9',
  },
  'img/ANCLA/VideoAnclaInterior.mp4': {
    poster: 'img/ANCLA/10.jpg',
    ratio: '16 / 9',
  },
  'img/ANCLA/videoexterior.mp4': {
    poster: 'img/ANCLA/03.jpg',
    ratio: '16 / 9',
  },
  'img/ANCLA/videohabitaciones.mp4': {
    poster: 'img/ANCLA/16.jpg',
    ratio: '16 / 9',
  },
  'img/VideoContacto.mp4': {
    poster: 'img/CHAPE/07.jpg',
    ratio: '16 / 9',
  },
}

/** Metadatos de un video, con el id de Stream resuelto por entorno. */
export const getVideoMeta = (path = '') => {
  const key = path.replace(/^\/+/, '')
  const meta = videoManifest[key] || {}
  return { ...meta, streamId: meta.streamId || streamIds[key] || undefined }
}

export default videoManifest
