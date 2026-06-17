#!/usr/bin/env bash
# Renderiza um still em ALTA (scale 2) e reduz para 1080×1350 com Lanczos.
# Isso ELIMINA a franja cromática sub-pixel do Chrome ("texto torto").
# Uso: ./render-still.sh <id-do-still> [largura] [altura]
# Ex:  ./render-still.sh padrao-certoerrado-247
set -euo pipefail

ID="${1:?Informe o id do still}"
W="${2:-1080}"
H="${3:-1350}"
DIR="$(cd "$(dirname "$0")" && pwd)"
BIN="$DIR/node_modules/.bin/remotion"
OUT="$DIR/out/$ID.png"
TMP="$DIR/out/_hi_$ID.png"

mkdir -p "$DIR/out"
"$BIN" still "$DIR/src/index.ts" "$ID" "$TMP" --image-format=png --scale=2 >/dev/null 2>&1
python3 - "$TMP" "$OUT" "$W" "$H" <<'PY'
import sys
from PIL import Image
src, dst, w, h = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
Image.open(src).convert('RGB').resize((w, h), Image.LANCZOS).save(dst)
PY
rm -f "$TMP"
echo "✓ $OUT  (${W}×${H}, scale2→Lanczos, sem franja)"
