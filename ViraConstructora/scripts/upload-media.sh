#!/usr/bin/env bash
# ============================================================
# Sube public/img/** al bucket de Cloudflare R2, conservando la
# estructura de carpetas que espera src/lib/media.js.
#
#   npm run r2:upload                 (bucket por defecto: vira-media)
#   npm run r2:upload -- otro-bucket
#
# Antes, una sola vez:
#   npx wrangler login
#
# Se autentica por navegador: no hay claves que copiar ni guardar.
# ============================================================
set -uo pipefail

BUCKET="${1:-vira-media}"
PARALELO="${R2_PARALELO:-6}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/img"
WRANGLER="$ROOT/node_modules/.bin/wrangler"

[ -d "$SRC" ] || { echo "No existe $SRC" >&2; exit 1; }
[ -x "$WRANGLER" ] || { echo "Falta wrangler. Corré: npm install" >&2; exit 1; }

# --- Sesión -------------------------------------------------
# Ojo: `wrangler whoami` termina con código 0 aunque no haya sesión,
# así que hay que mirar lo que imprime.
QUIEN="$("$WRANGLER" whoami 2>&1)"
if printf '%s' "$QUIEN" | grep -qi 'not authenticated'; then
  echo "No hay sesión de Cloudflare."
  echo
  echo "Corré primero:   npx wrangler login"
  echo "Se abre el navegador y autorizás. No hay claves que copiar."
  exit 1
fi

CUENTA="$(printf '%s' "$QUIEN" | grep -i 'account name' | head -1 | sed 's/.*│ *//;s/ *│.*//')"
echo "Cuenta: ${CUENTA:-(sesión activa)}"
echo "Bucket: $BUCKET"
echo

content_type() {
  case "${1##*.}" in
    jpg|jpeg) echo "image/jpeg" ;;
    png)      echo "image/png" ;;
    webp)     echo "image/webp" ;;
    avif)     echo "image/avif" ;;
    svg)      echo "image/svg+xml" ;;
    mp4)      echo "video/mp4" ;;
    webm)     echo "video/webm" ;;
    *)        echo "application/octet-stream" ;;
  esac
}

# --- Lista de archivos a subir ------------------------------
LISTA="$(mktemp)"; FALLOS="$(mktemp)"
trap 'rm -f "$LISTA" "$FALLOS"' EXIT

while IFS= read -r file; do
  printf '%s\n' "$file" >> "$LISTA"
done < <(find "$SRC" -type f ! -name '.DS_Store' ! -name '.gitkeep' | sort)

TOTAL=$(wc -l < "$LISTA" | tr -d ' ')
echo "Subiendo $TOTAL archivos con $PARALELO en paralelo..."
echo

# --- Subida en paralelo -------------------------------------
export WRANGLER BUCKET SRC FALLOS
export -f content_type

subir() {
  local file="$1"
  local key="img/${file#"$SRC/"}"
  local type; type="$(content_type "$file")"

  if "$WRANGLER" r2 object put "$BUCKET/$key" \
      --file "$file" \
      --content-type "$type" \
      --cache-control "public, max-age=31536000, immutable" \
      --remote >/dev/null 2>&1; then
    printf '  ok   %s\n' "$key"
  else
    printf '  ERROR %s\n' "$key"
    printf '%s\n' "$key" >> "$FALLOS"
  fi
}
export -f subir

xargs -P "$PARALELO" -I{} bash -c 'subir "$@"' _ {} < "$LISTA"

# --- Resultado ----------------------------------------------
ERRORES=$(wc -l < "$FALLOS" | tr -d ' ')
echo
if [ "$ERRORES" -gt 0 ]; then
  echo "Terminó con $ERRORES de $TOTAL archivos fallidos:"
  sed 's/^/  /' "$FALLOS"
  echo
  echo "Volvé a correr el comando: sólo reintenta lo que falta poco (sobrescribe sin problema)."
  exit 1
fi

echo "Listos los $TOTAL archivos en r2://$BUCKET"
echo
echo "Siguiente paso: dale una URL pública al bucket y comprobá con"
echo "  npm run r2:check -- https://TU-URL-PUBLICA"
