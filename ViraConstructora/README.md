# VIRA Constructora

Sitio de VIRA Constructora y Desarrolladora (Pinamar, Buenos Aires).
React 19 + Vite, sin framework de estilos: el sistema visual es propio.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
npm run lint
```

## Estructura

```
src/
  styles/      tokens.css + base.css  ← el design system entero
  theme/       modo claro / oscuro (data-theme + localStorage)
  i18n/        español / inglés (translations.js)
  lib/media.js capa de medios: una sola puerta para imágenes y video
  data/        proyectos y servicios (fuente única de verdad)
  hooks/       reveals al scroll, movimiento reducido, bloqueo de scroll
  components/  Header, Footer y primitivas en components/ui
  pages/       una carpeta de estilos por ruta
docs/
  DESIGN-SYSTEM.md   color, tipografía, espacio, motion, breakpoints
  MEDIA.md           arquitectura de medios sobre Cloudflare
scripts/
  upload-media.sh    sube public/img a un bucket R2
```

## Documentación

- **[Design System](docs/DESIGN-SYSTEM.md)** — leer antes de tocar estilos.
- **[Arquitectura de medios](docs/MEDIA.md)** — cómo mover imágenes y
  video a Cloudflare sin cambiar una sola línea de los componentes.

## Variables de entorno

Ver [`.env.example`](.env.example). Todas son públicas (Vite las inyecta en
el bundle): ahí sólo van URLs. Sin ninguna configurada, el sitio sirve los
medios desde `public/` igual que siempre.

## Reglas del proyecto

1. **Los textos en español son contenido de marca y no se reescriben.**
   Se traducen al inglés en `translations.js`, no se editan.
2. Ningún color, tamaño ni duración fuera de `tokens.css`.
3. Toda imagen pasa por `<SmartImage>` y todo video por `<SmartVideo>`.
4. Anton para display, Montserrat para el resto.
5. Se anima `transform`, `opacity` y `clip-path`. Nada más.
