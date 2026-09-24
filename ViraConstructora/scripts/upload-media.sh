#!/usr/bin/env bash
# ============================================================
# Sube public/img/** a un bucket de Cloudflare R2 conservando
# la estructura de carpetas que espera src/lib/media.js.
#
#   npm run media:upload              (bucket por defecto: vira-media)
#   npm run media:upload -- otro-bucket
#
# Requiere wrangler autenticado (`npx wrangler login`).
# Las credenciales viven en tu máquina, nunca en el repositorio.
# ============================================================
set -euo pipefail

BUCKET="${1:-vira-media}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/img"

if [ ! -d "$SRC" ]; then
  echo "No existe $SRC" >&2
  exit 1
fi

content_type() {
  case "${1##*.}" in
    jpg|jpeg) echo "image/jpeg" ;;
    png)      echo "image/png" ;;
    webp)     echo "image/webp" ;;
    avif)     echo "image/avif" ;;
    mp4)      echo "video/mp4" ;;
    webm)     echo "video/webm" ;;
    *)        echo "application/octet-stream" ;;
  esac
}

total=0
while IFS= read -r file; do
  key="img/${file#"$SRC/"}"
  type="$(content_type "$file")"

  echo "→ $key"
  npx wrangler r2 object put "$BUCKET/$key" \
    --file "$file" \
    --content-type "$type" \
    --cache-control "public, max-age=31536000, immutable" \
    --remote
  total=$((total + 1))
done < <(find "$SRC" -type f ! -name '.gitkeep' ! -name '.DS_Store')

echo
echo "Listo: $total archivos subidos a r2://$BUCKET"
echo "Ahora cargá VITE_MEDIA_BASE_URL y VITE_CF_IMAGE_RESIZING (ver docs/MEDIA.md)."
