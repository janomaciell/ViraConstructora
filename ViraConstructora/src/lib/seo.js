/* ============================================================
   VIRA — METADATOS POR PÁGINA
   El sitio es una SPA: el HTML que se descarga es siempre el
   mismo. Sin esto, las 24 URLs comparten título y, peor, un
   `canonical` apuntando a la home, que le pide a Google que no
   indexe ninguna página interna.
   ============================================================ */

import { canonicalUrl, SITE_URL } from './site'

const setMeta = (selector, attr, value) => {
  if (!value) return
  let tag = document.head.querySelector(selector)

  if (!tag) {
    tag = document.createElement('meta')
    const [, name, key] = selector.match(/\[(.+?)="(.+?)"\]/) || []
    if (name && key) tag.setAttribute(name, key)
    document.head.appendChild(tag)
  }

  tag.setAttribute(attr, value)
}

const setLink = (rel, href) => {
  if (!href) return
  let tag = document.head.querySelector(`link[rel="${rel}"]`)

  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }

  tag.setAttribute('href', href)
}

/** Aplica los metadatos de una página. `path` es la ruta interna. */
export const applySeo = ({ title, description, path = '', image, type = 'website' }) => {
  const url = path ? canonicalUrl(path) : SITE_URL

  if (title) document.title = title

  setMeta('meta[name="description"]', 'content', description)
  setLink('canonical', url)

  setMeta('meta[property="og:title"]', 'content', title)
  setMeta('meta[property="og:description"]', 'content', description)
  setMeta('meta[property="og:url"]', 'content', url)
  setMeta('meta[property="og:type"]', 'content', type)
  if (image) setMeta('meta[property="og:image"]', 'content', image)

  setMeta('meta[name="twitter:title"]', 'content', title)
  setMeta('meta[name="twitter:description"]', 'content', description)
  if (image) setMeta('meta[name="twitter:image"]', 'content', image)
}

/** Recorta una descripción al largo que muestra Google, sin cortar palabras. */
export const resumir = (texto = '', max = 155) => {
  const limpio = String(texto).replace(/\s+/g, ' ').trim()
  if (limpio.length <= max) return limpio
  return `${limpio.slice(0, limpio.lastIndexOf(' ', max - 1))}…`
}

const LD_ID = 'vira-ld-pagina'

/** Datos estructurados propios de la página. Se reemplazan al navegar. */
export const applyStructuredData = (data) => {
  document.getElementById(LD_ID)?.remove()
  if (!data) return

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = LD_ID
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}
