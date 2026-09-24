# Design System — VIRA Constructora

Todo el sistema vive en dos archivos. Si un valor no está acá, no debería
existir en el proyecto.

- `src/styles/tokens.css` — color, tipografía, espacio, bordes, sombras, motion
- `src/styles/base.css` — reset, primitivas tipográficas, layout, botones, reveals

---

## 1. Color

### Marca

`#7AA6D0` es el color de VIRA y está en el sistema como `--vira-blue`,
con una escala de 100 a 900 para poder usarlo sin perder contraste.

No es un acento decorativo: aparece como **fondo pleno de sección**
(`.section--brand`), como bloque de relleno en botones y tarjetas, como
línea de identidad al pie de cada hero, como indicador de navegación y
como color del isotipo.

### Roles semánticos

Los componentes **nunca** usan `--vira-blue` directamente para texto o
fondo de superficie: usan roles, que cambian con el tema.

```
--background      fondo de página
--surface         tarjetas, header al scrollear
--surface-2       secciones alternadas
--surface-inverse bloque de tinta (footer, secciones oscuras)

--foreground      texto
--foreground-strong títulos
--muted           texto secundario
--on-inverse      texto sobre tinta

--border          separadores
--border-strong   bordes de control

--primary         azul legible sobre el fondo del tema
--primary-block   azul de bloque (fondos plenos)
--on-primary      texto sobre --primary
--accent-line     línea de identidad
```

En claro `--primary` es `#5C8CBC` y en oscuro `#7AA6D0`: el mismo azul de
marca, ajustado para que el texto siga siendo legible en ambos fondos.

### Temas

`data-theme="light" | "dark"` en `<html>`. Sin atributo se sigue la
preferencia del sistema (`prefers-color-scheme`). La elección se guarda en
`localStorage` bajo `vira-theme` y se aplica **antes del primer pintado**
con un script inline en `index.html`, así no hay parpadeo al recargar.

El cambio de tema sólo transiciona color: `html.theme-switching` limita la
transición a `background-color`, `border-color`, `color`, `fill` y `stroke`
durante 500 ms, para que nunca se anime el layout.

---

## 2. Tipografía

| Uso | Fuente |
|---|---|
| Títulos, números, cifras, palabras de impacto | **Anton** (`--font-display`) |
| Todo lo demás: navegación, texto, botones, labels | **Montserrat** 600 / 700 (`--font-body`) |

Escala fluida con `clamp()`, sin tamaños intermedios sueltos:

```
--fs-d1  …  10.5rem   frase del hero
--fs-d2  …   6.5rem   título de página
--fs-d3  …   4.25rem  título de sección
--fs-d4  …   2.875rem subtítulo
--fs-d5  …   1.875rem título de bloque

--fs-lead   texto destacado
--fs-body   texto
--fs-label  microtipografía en mayúscula (0.6875rem, tracking 0.22em)
```

Los display van a `line-height: 0.92` y `letter-spacing: -0.015em`. La
microtipografía (`.eyebrow`) es la que ordena la página: aparece antes de
cada título y lleva una línea de 34 px en `--accent-line`.

---

## 3. Espacio

Escala de 4 px (`--sp-1` … `--sp-11`). El aire vertical de sección es
fluido: `--section-y: clamp(5rem, 11vw, 11rem)`. El gutter horizontal
también: `--gutter: clamp(1.25rem, 4.5vw, 4.5rem)`.

Contenedores: `.shell` (1440 px), `.shell--wide` (1720 px),
`.shell--narrow` (980 px).

---

## 4. Bordes, radios y sombras

Estética arquitectónica: **radios casi nulos** (`0`, `2px`, `4px`) y
**sombras mínimas**. La jerarquía la dan las líneas de 1 px
(`--border`) y las de 2 px en `--accent-line`, no las sombras.

---

## 5. Motion

Un solo vocabulario, cuatro duraciones y tres curvas.

```
--ease-out    cubic-bezier(0.16, 1, 0.3, 1)     entradas
--ease-in-out cubic-bezier(0.65, 0, 0.35, 1)    transiciones de estado
--ease-emph   cubic-bezier(0.2, 0.8, 0.2, 1)    micro-interacción con carácter

--dur-1 160ms  hover, focus
--dur-2 320ms  estado: botones, nav, dropdowns
--dur-3 620ms  reveal de contenido
--dur-4 950ms  reveal de bloque grande
```

### Reveals al scroll

El vocabulario está en CSS (`[data-reveal]`) y un único
`IntersectionObserver` (`useScrollReveal`) agrega `.is-inview`:

| Valor | Gesto |
|---|---|
| `up` | sube 34 px con opacidad |
| `fade` | sólo opacidad |
| `left` / `right` | desplazamiento lateral de 32 px |
| `scale` | escala sutil desde 1.06 |
| `curtain` | `clip-path` que descubre la imagen desde abajo |
| `line` | línea que se traza con `scaleX` |

Escalonado con `--reveal-delay` inline. Texto enmascarado con
`.mask-line > span` (padre `overflow: hidden`, hijo que sube).

Sólo se anima `transform`, `opacity` y `clip-path`: nada que dispare
layout.

> El barrido mide con `getBoundingClientRect`, no con
> `IntersectionObserver`. Un `curtain` arranca con
> `clip-path: inset(100% 0 0 0)`, y un elemento recortado a cero puede
> no llegar nunca a "intersecar": ese fue el motivo por el que las
> imágenes de obra y el mapa quedaban en blanco. El barrido corre una
> vez por frame, sólo sobre lo que falta, y se apaga solo.

### El hero del Home

Es la única animación que no sigue este patrón porque no es un reveal:
es una composición **controlada por la posición del scroll** (GSAP
ScrollTrigger con `scrub`). Hay **un solo logo en pantalla**: nace
centrado sobre la foto, viaja hasta el hueco del header y ahí se
entrega (`data-hero-logo` en `<html>` decide cuál de los dos se ve).
Después el velo se cierra y la frase sube desde el borde inferior. Su estado inicial está declarado en CSS para
que la primera pintura no espere a ningún script, y GSAP se importa de
forma diferida — el chunk `motion` (45 kB gzip) queda fuera del camino
crítico. Si esa carga falla, `data-motion="fallback"` muestra el hero
completo.

### Movimiento reducido

`prefers-reduced-motion: reduce` anula todas las transiciones, muestra
todos los reveals y colapsa el hero a una sola pantalla estática.

---

## 6. Componentes del sistema

| Componente | Para qué |
|---|---|
| `<WorkGrid>` | grilla de obra a sangre (3 columnas, sin separación) — Home y Proyectos |
| `<SmartImage>` | toda imagen: `srcset`/`sizes`, lazy, sin CLS, placeholder de marca |
| `<SmartVideo>` | todo video: poster, carga al entrar en viewport, pausa al salir |
| `<Logo>` | logotipo, variante según tema o fondo |
| `<Isotype>` | isotipo pintado con `currentColor` vía `mask-image` |
| `<RichText>` | resuelve `**énfasis**` de las traducciones sin inyectar HTML |
| `<ArrowIcon>` | la única flecha del proyecto |

Clases compartidas: `.btn`, `.btn--solid`, `.btn--inverse`, `.btn--ink`,
`.link-underline`, `.eyebrow`, `.section`, `.section--brand`,
`.section--ink`, `.stats` / `.stat`, `.cta-block`, `.page-hero`.

---

## 7. Breakpoints

```
1080px  la navegación pasa a menú overlay
1024px  grillas de 3 → 2 columnas
 960px  columnas dobles → una sola
 700px  grillas → 1 columna
 620px  ajustes de ficha y galería
 480px  microtipografía y hero
```

---

## 8. Idiomas

`src/i18n/translations.js` con la misma forma en `es` y `en`. **El texto en
español es el original de la marca y se mantiene literal.** Ningún texto
visible está hardcodeado en JSX salvo nombres propios (VIRA, los títulos
de proyecto, los nombres del equipo).

El contenido de proyectos y servicios vive en `src/data/` con bloques
`es` / `en` por entrada; `localizeProject()` y `localizeService()` los
resuelven. La preferencia se guarda en `localStorage` (`vira-lang`).
