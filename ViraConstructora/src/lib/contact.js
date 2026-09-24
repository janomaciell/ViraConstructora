/* ============================================================
   VIRA — CONTACTO
   Un único lugar para el número de WhatsApp. Antes convivían dos
   distintos: el botón flotante usaba 549 11 6168-4537 y el footer
   549 11 15 6168-4537 (con el viejo prefijo "15", que en formato
   internacional no enruta).
   ============================================================ */

export const WHATSAPP_NUMBER = '5491161684537'

/** Enlace a WhatsApp con un mensaje ya escrito. */
export const whatsappUrl = (message = '') =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`

/** Reemplaza {campos} de una plantilla de traducción. */
export const fillTemplate = (template = '', values = {}) =>
  Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, value ?? ''),
    template,
  )
