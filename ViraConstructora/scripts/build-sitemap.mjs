#!/usr/bin/env node
/* ============================================================
   Genera public/sitemap.xml desde los datos reales del sitio.

   Antes el sitemap se escribía a mano: listaba `dafna-i` (que no
   existe), le faltaban 5 proyectos y todas las fechas decían
   2024-10-10. Generándolo no puede volver a pasar.
   ============================================================ */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SITIO = (process.env.VITE_SITE_URL || 'https://www.viraconstructora.com').replace(/\/$/, '')
const MEDIOS = (process.env.VITE_MEDIA_BASE_URL || '').replace(/\/$/, '')
const HOY = new Date().toISOString().split('T')[0]

const { projects } = await import('../src/data/projects.js')

const escapar = (texto = '') =>
  texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const medio = (ruta) =>
  `${MEDIOS || SITIO}/${ruta.split('/').map(encodeURIComponent).join('/')}`

const secciones = [
  { ruta: '', prioridad: '1.0', frecuencia: 'weekly' },
  { ruta: 'proyectos', prioridad: '0.9', frecuencia: 'weekly' },
  { ruta: 'servicios', prioridad: '0.8', frecuencia: 'monthly' },
  { ruta: 'nosotros', prioridad: '0.7', frecuencia: 'monthly' },
  { ruta: 'contacto', prioridad: '0.8', frecuencia: 'monthly' },
]

const entradas = []

for (const { ruta, prioridad, frecuencia } of secciones) {
  entradas.push(
    `  <url>\n    <loc>${SITIO}/${ruta}</loc>\n    <lastmod>${HOY}</lastmod>\n` +
      `    <changefreq>${frecuencia}</changefreq>\n    <priority>${prioridad}</priority>\n  </url>`,
  )
}

for (const proyecto of projects) {
  const imagen = proyecto.image
    ? `\n    <image:image>\n      <image:loc>${medio(proyecto.image)}</image:loc>\n` +
      `      <image:title>${escapar(`${proyecto.title} — VIRA Constructora`)}</image:title>\n    </image:image>`
    : ''

  entradas.push(
    `  <url>\n    <loc>${SITIO}/proyectos/${proyecto.id}</loc>\n    <lastmod>${HOY}</lastmod>\n` +
      `    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>${imagen}\n  </url>`,
  )
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generado por scripts/build-sitemap.mjs. No editar a mano. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entradas.join('\n')}
</urlset>
`

fs.writeFileSync(path.join(ROOT, 'public/sitemap.xml'), xml)
console.log(`sitemap.xml: ${entradas.length} URLs (${projects.length} proyectos), lastmod ${HOY}`)
