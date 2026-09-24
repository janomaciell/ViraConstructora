/* ============================================================
   VIRA — DATOS DEL SITIO
   ============================================================ */

/** Dominio público. Se usa para los enlaces que salen del sitio
 *  (WhatsApp, compartir): siempre tienen que apuntar a producción,
 *  aunque la página se abra en local o en un preview de Vercel. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.viraconstructora.com')
  .replace(/\/$/, '')

/** URL absoluta y pública de una ruta interna. */
export const canonicalUrl = (path = '') =>
  `${SITE_URL}/${String(path).replace(/^\//, '')}`
