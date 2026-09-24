# Medios en Cloudflare — VIRA

Objetivo: que **ninguna imagen ni video salga de Vercel**. Hoy `public/`
pesa **70 MB** (40 MB son videos) y cada visita los descarga desde el
hosting, consumiendo data transfer.

El código ya está listo. Falta crear la cuenta, subir los archivos y
cargar tres variables de entorno.

---

## 1. Qué producto de Cloudflare y por qué

| Contenido | Servicio | Por qué |
|---|---|---|
| **Imágenes** | **R2 + Image Transformations** (`/cdn-cgi/image/…`) | Se sube **un solo original** por foto. El edge genera AVIF/WebP y cada tamaño a pedido, y lo cachea. No hay que subir cinco variantes de cada imagen. |
| **Video** | **R2 + CDN** | Son loops cortos y mudos. Un MP4 progresivo con *range requests*, cacheado en el edge, es más barato y liviano que un reproductor adaptativo. |
| **Marca (logo, isotipo)** | **R2 + CDN** | Ya están pre-dimensionados; sólo necesitan salir por el CDN. |
| **HTML / JS / CSS** | Vercel | Pesan poco y ya van con cache inmutable. |

**Por qué R2 y no Cloudflare Images:** R2 **no cobra egress** — ése es el
ahorro grande — y cobra el almacenamiento plano. Cloudflare Images cobra
por imagen almacenada y obliga a re-subir los originales a su sistema.

**Cuidado con el costo de las transformaciones:** las *Image
Transformations* tienen una cuota mensual gratuita y después se cobra por
transformación única; las variantes ya cacheadas no vuelven a contar.
Confirmá los números actuales en la página de precios de Cloudflare antes
de activarlo, porque cambian.

> Si preferís no pagar transformaciones: dejá `VITE_CF_IMAGE_RESIZING=false`.
> Las imágenes igual salen por R2 y el CDN (que es donde está el ahorro de
> data transfer); lo único que se pierde es el redimensionado automático.

---

## 2. Puesta en marcha desde el panel de Cloudflare

Son **113 archivos, 70,2 MB, en 18 carpetas**. Para controlar que no falte
nada, tenés el inventario exacto con `npm run media:check`.

### 2.1 Crear el bucket

**dash.cloudflare.com → R2 → Create bucket**

- Nombre: `vira-media`
- Location: *Automatic*

### 2.2 Subir las imágenes

Dentro del bucket, pestaña **Objects → Upload → Select folder**, y elegí
la carpeta:

```
ViraConstructora/public/img
```

> **Subí la carpeta `img` entera, no su contenido.** Las claves tienen que
> quedar como `img/ANCLA/01.jpg`. Si subís lo de adentro, quedan como
> `ANCLA/01.jpg` y el sitio no las encuentra.

Si el navegador no te deja elegir carpetas, creá primero las 18 carpetas a
mano (los nombres están en la tabla de `npm run media:check`) y subí los
archivos de cada una.

### 2.3 Darle una URL pública

Acá hay **dos caminos, y no dan lo mismo**:

| | URL de desarrollo (`r2.dev`) | Dominio propio |
|---|---|---|
| Cómo | Settings → **Public Development URL** → Enable | Settings → **Public access → Connect Domain** → `media.viraconstructora.com` |
| Sirve para | Probar | **Producción** |
| Límite de tráfico | Sí, Cloudflare la limita a propósito | No |
| ¿Funciona el redimensionado `/cdn-cgi/image`? | **No** | Sí |

Para producción va **dominio propio**. Requiere que `viraconstructora.com`
tenga el DNS en Cloudflare.

Si arrancás con `r2.dev` para probar, dejá `VITE_CF_IMAGE_RESIZING=false`:
en ese dominio las transformaciones no existen y las imágenes darían 404.

### 2.4 Activar el redimensionado (sólo con dominio propio)

Cloudflare → tu zona → **Images → Transformations → Enable for this zone**.

### 2.5 Cargar las variables en Vercel

Settings → Environment Variables (ver `.env.example`):

```
VITE_MEDIA_BASE_URL=https://media.viraconstructora.com
VITE_CF_IMAGE_RESIZING=true
VITE_CF_IMAGE_QUALITY=78
VITE_SITE_URL=https://www.viraconstructora.com
```

Sin `VITE_MEDIA_BASE_URL`, **todo sigue funcionando desde `/public`**. El
cambio es reversible borrando la variable.

### 2.6 Comprobar que no falte nada

```bash
npm run media:check -- https://media.viraconstructora.com
```

Recorre las 113 referencias del sitio y te dice cuáles no responden.
Hacelo antes de dar la migración por cerrada.

### 2.7 Regla de cache

Cloudflare → **Rules → Cache Rules**, para `media.viraconstructora.com/*`:
*Edge TTL* 1 año, *Browser TTL* 30 días.

Los archivos no cambian de nombre, así que si reemplazás una foto hay que
purgar esa URL.

### Alternativa por consola

Si alguna vez querés automatizarlo:

```bash
npx wrangler login
npx wrangler r2 bucket create vira-media
npm run media:upload
```

---

## 3. Cortar del todo el data transfer de Vercel

Una vez que el paso 2.6 dé verde, las imágenes ya no se piden a Vercel.
Para que además **dejen de viajar en el deploy**, agregá al
`.vercelignore` de la raíz:

```
ViraConstructora/public/img
```

Hacelo **sólo después** de confirmar que todo responde desde Cloudflare:
si las variables no están cargadas, el sitio busca las imágenes en
`/public` y quedarían rotas.

---

## 4. Cómo lo usa el código

Todo pasa por `src/lib/media.js`. Ningún componente arma una URL a mano.

```jsx
<SmartImage src="img/ANCLA/01.jpg" alt="ANCLA I" sizes={SIZES.card} zoom />
<SmartVideo src="img/ANCLA/VideoAncla.mp4" />
<Logo tone="dark" width={230} />     {/* también sale por el CDN */}
<Isotype size={24} />                {/* la URL del mask la fija main.jsx */}
```

Con las variables cargadas, `SmartImage` emite:

```
https://media.viraconstructora.com/cdn-cgi/image/width=768,quality=78,fit=cover,format=auto,metadata=none/img/ANCLA/01.jpg
```

`format=auto` negocia AVIF o WebP según el navegador. Los anchos del
sistema son 480 / 768 / 1024 / 1440 / 1920 y los `sizes` están
centralizados en `SIZES`.

---

## 5. Lo que conviene hacer igual

- [ ] **Recomprimir los videos antes de subirlos.** Son 40 MB y es el
      gasto más grande. Un loop mudo de fondo no necesita esa calidad:
      ```bash
      ffmpeg -i entrada.mp4 -an -vf "scale=-2:720" -c:v libx264 -crf 26 -preset slow -movflags +faststart salida.mp4
      ```
      Baja de ~12 MB a ~1,5 MB cada uno.

---

## 6. Seguridad

Las variables `VITE_*` **se publican en el bundle del navegador**. Ahí
sólo van URLs públicas. El token de API de Cloudflare y las claves de R2
viven en tu máquina o en el CI para `wrangler`, nunca en el frontend ni en
el repositorio.
