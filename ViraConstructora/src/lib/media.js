/* ============================================================
   VIRA — CAPA DE MEDIOS
   ------------------------------------------------------------
   Un único punto por el que pasan TODAS las imágenes y videos.
   Sin variables de entorno se sirve desde /public (comportamiento
   actual, nada se rompe). Con las variables cargadas, la misma
   ruta se resuelve contra Cloudflare sin tocar un solo componente.

   Arquitectura recomendada (ver .env.example y docs/MEDIA.md):
   · Cloudflare R2   → almacenamiento de originales (imágenes y video)
   · Image Resizing  → /cdn-cgi/image/... genera WebP/AVIF y tamaños
   · CDN + Cache     → cache inmutable de 1 año en el edge
   · Cloudflare Stream (opcional) → sólo para video largo/adaptativo
   ============================================================ */

const trimSlashes = (value = '') => value.replace(/^\/+|\/+$/g, '')

export const mediaConfig = {
  /** Origen público de los assets: dominio de R2 o subdominio detrás de Cloudflare. */
  baseUrl: trimSlashes(import.meta.env.VITE_MEDIA_BASE_URL || ''),
  /** Activa las transformaciones /cdn-cgi/image (Image Resizing / Images). */
  imageResizing: import.meta.env.VITE_CF_IMAGE_RESIZING === 'true',
  /** Código de cliente de Cloudflare Stream (sólo si se migra el video). */
  streamCustomerCode: import.meta.env.VITE_CF_STREAM_CUSTOMER_CODE || '',
  /** Calidad por defecto de las imágenes transformadas. */
  quality: Number(import.meta.env.VITE_CF_IMAGE_QUALITY || 78),
}

/** Anchos del sistema. Cubren mobile 1x/2x, tablet, laptop y desktop. */
export const IMAGE_WIDTHS = [480, 768, 1024, 1440, 1920]

/** `sizes` predefinidos para no repetir media queries por toda la app. */
export const SIZES = {
  full: '100vw',
  half: '(max-width: 900px) 100vw, 50vw',
  third: '(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw',
  card: '(max-width: 700px) 92vw, (max-width: 1200px) 46vw, 31vw',
  thumb: '(max-width: 700px) 45vw, 220px',
  logo: '320px',
}

const isAbsolute = (path = '') => /^(https?:)?\/\//i.test(path) || path.startsWith('data:')

/**
 * Ruta canónica de un asset, sin barra inicial y con cada segmento
 * escapado. Es obligatorio: `srcset` separa sus variantes con espacios,
 * así que un nombre de archivo con un espacio partiría la lista en dos.
 */
export const normalizePath = (path = '') =>
  trimSlashes(path)
    .split('/')
    .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
    .join('/')

/** URL cruda del asset (sin transformar). Sirve para video, PDF, etc. */
export const assetUrl = (path = '') => {
  if (!path) return ''
  if (isAbsolute(path)) return path
  const clean = normalizePath(path)
  return mediaConfig.baseUrl ? `${mediaConfig.baseUrl}/${clean}` : `/${clean}`
}

/**
 * URL de una imagen. Con Image Resizing activo devuelve una variante
 * redimensionada y en formato moderno (AVIF/WebP negociado por el edge).
 */
export const imageUrl = (path = '', { width, quality, fit = 'cover' } = {}) => {
  if (!path) return ''
  if (isAbsolute(path)) return path

  const clean = normalizePath(path)

  if (!mediaConfig.imageResizing || !mediaConfig.baseUrl || !width) {
    return assetUrl(clean)
  }

  const options = [
    `width=${width}`,
    `quality=${quality ?? mediaConfig.quality}`,
    `fit=${fit}`,
    'format=auto',
    'metadata=none',
  ].join(',')

  return `${mediaConfig.baseUrl}/cdn-cgi/image/${options}/${clean}`
}

/** srcSet responsive. Devuelve undefined si no hay transformaciones disponibles. */
export const imageSrcSet = (path = '', widths = IMAGE_WIDTHS, options = {}) => {
  if (!path || isAbsolute(path)) return undefined
  if (!mediaConfig.imageResizing || !mediaConfig.baseUrl) return undefined

  return widths
    .map((width) => `${imageUrl(path, { ...options, width })} ${width}w`)
    .join(', ')
}

/**
 * Fuente de un video.
 * - Por defecto: MP4 progresivo desde R2/CDN (soporta range requests y cachea
 *   en el edge; es lo más barato y liviano para loops de fondo).
 * - Con Stream configurado y un id en el manifiesto: HLS adaptativo.
 */
export const videoSource = (path = '', { streamId } = {}) => {
  if (streamId && mediaConfig.streamCustomerCode) {
    const base = `https://customer-${mediaConfig.streamCustomerCode}.cloudflarestream.com/${streamId}`
    return {
      kind: 'stream',
      src: `${base}/manifest/video.m3u8`,
      iframe: `${base}/iframe`,
      type: 'application/x-mpegURL',
    }
  }

  return { kind: 'file', src: assetUrl(path), type: 'video/mp4' }
}

/** URL del poster de un video (imagen optimizada como cualquier otra). */
export const posterUrl = (path = '', width = 1280) => imageUrl(path, { width })

export default {
  mediaConfig,
  assetUrl,
  imageUrl,
  imageSrcSet,
  videoSource,
  posterUrl,
  IMAGE_WIDTHS,
  SIZES,
}
