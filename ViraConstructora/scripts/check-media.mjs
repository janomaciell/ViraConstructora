#!/usr/bin/env node
/* ============================================================
   Verifica los medios del sitio.

     npm run media:check                      → controla que no falte nada en /public
     npm run media:check -- https://media...  → además controla que estén subidos

   Recorre TODAS las rutas que el código referencia (proyectos,
   servicios, posters de video y marca) y avisa si alguna no existe.
   ============================================================ */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = path.join(ROOT, 'public')

/* Assets que no salen de los archivos de datos */
const BRAND = [
  'img/brand/vira-color-400.png',
  'img/brand/vira-color-800.png',
  'img/brand/vira-blanco-400.png',
  'img/brand/vira-blanco-800.png',
  'favicon.png',
]

const [{ projects }, { services }, { videoManifest }] = await Promise.all([
  import('../src/data/projects.js'),
  import('../src/data/services.js'),
  import('../src/data/media-manifest.js'),
])

const refs = new Set(BRAND)
for (const project of projects) {
  if (project.image) refs.add(project.image)
  project.gallery.forEach((image) => refs.add(image))
}
for (const service of services) refs.add(service.image)
for (const [video, meta] of Object.entries(videoManifest)) {
  refs.add(video)
  if (meta.poster) refs.add(meta.poster)
}

const assets = [...refs].sort()
const missing = []
let bytes = 0

for (const asset of assets) {
  const file = path.join(PUBLIC, asset)
  if (fs.existsSync(file)) bytes += fs.statSync(file).size
  else missing.push(asset)
}

/* URLs absolutas incrustadas en index.html y sitemap.xml (og:image,
   twitter:image y el sitemap de imágenes de Google). Si el dominio de
   medios cambia, hay que actualizarlas: por eso se controlan acá. */
const absolutas = new Set()
for (const archivo of ['index.html', 'public/sitemap.xml']) {
  const file = path.join(ROOT, archivo)
  if (!fs.existsSync(file)) continue
  const texto = fs.readFileSync(file, 'utf8')
  for (const url of texto.match(/https?:\/\/[^"'<>\s]+\/img\/[^"'<>\s]+/g) || []) {
    absolutas.add(url)
  }
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`

/* Inventario por carpeta: sirve para controlar contra el panel de R2 */
const byFolder = new Map()
for (const asset of assets) {
  const folder = asset.split('/').slice(0, -1).join('/') || '(raíz)'
  const file = path.join(PUBLIC, asset)
  const size = fs.existsSync(file) ? fs.statSync(file).size : 0
  const entry = byFolder.get(folder) || { files: 0, bytes: 0 }
  entry.files += 1
  entry.bytes += size
  byFolder.set(folder, entry)
}

console.log('Carpeta                        Archivos      Peso')
console.log('─'.repeat(52))
for (const [folder, entry] of [...byFolder].sort()) {
  console.log(`${folder.padEnd(30)}${String(entry.files).padStart(6)}${mb(entry.bytes).padStart(12)}`)
}
console.log('─'.repeat(52))
console.log(`${'TOTAL'.padEnd(30)}${String(assets.length).padStart(6)}${mb(bytes).padStart(12)}\n`)

if (missing.length) {
  console.error(`\nFaltan ${missing.length} archivos:`)
  missing.forEach((asset) => console.error(`  ${asset}`))
  process.exitCode = 1
} else {
  console.log('Sin referencias rotas.')
}

/* Control remoto opcional: ¿está todo subido a Cloudflare? */
const base = (process.argv[2] || process.env.VITE_MEDIA_BASE_URL || '').replace(/\/$/, '')
if (!base) {
  console.log('\nSin origen remoto: se controló sólo /public.')
  console.log('Para controlar Cloudflare: npm run media:check -- https://media.viraconstructora.com')
  process.exit()
}

/* Sólo `img/` vive en R2. El favicon se sigue sirviendo desde el sitio. */
const remotos = assets.filter((asset) => asset.startsWith('img/'))

console.log(`\nControlando ${remotos.length} archivos en ${base} ...`)
const notUploaded = []
let checked = 0

await Promise.all(
  remotos.map(async (asset) => {
    const url = `${base}/${asset.split('/').map(encodeURIComponent).join('/')}`
    try {
      const response = await fetch(url, { method: 'HEAD' })
      if (!response.ok) notUploaded.push(`${asset} → ${response.status}`)
    } catch (error) {
      notUploaded.push(`${asset} → ${error.message}`)
    }
    checked += 1
  }),
)

/* Las URLs de SEO tienen que vivir en el mismo origen que el resto */
const seoFuera = [...absolutas].filter((url) => !url.startsWith(base))
if (seoFuera.length) {
  console.error(`\nURLs de SEO que NO apuntan a ${base} (${seoFuera.length}):`)
  seoFuera.slice(0, 5).forEach((url) => console.error(`  ${url}`))
  console.error('  Están en index.html y public/sitemap.xml')
  process.exitCode = 1
} else if (absolutas.size) {
  console.log(`SEO y redes: ${absolutas.size} URLs apuntan al origen correcto.`)
}

console.log(`Comprobados: ${checked}`)
if (notUploaded.length) {
  console.error(`\nNo están disponibles ${notUploaded.length}:`)
  notUploaded.slice(0, 20).forEach((line) => console.error(`  ${line}`))
  process.exitCode = 1
} else {
  console.log('Todos los archivos responden desde Cloudflare.')
}
