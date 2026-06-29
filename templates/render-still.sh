#!/usr/bin/env bash
# Renderiza still scale 2 → Lanczos via sharp (Node). Sem Python.
set -euo pipefail

ID="${1:?Informe o id do still}"
W="${2:-1080}"
H="${3:-1350}"
DIR="$(cd "$(dirname "$0")" && pwd)"
BIN="$DIR/node_modules/.bin/remotion"
OUT="$DIR/out/$ID.png"
TMP="$DIR/out/_hi_$ID.png"
RESIZE="$DIR/scripts/resize-lanczos.mjs"

mkdir -p "$DIR/out"
"$BIN" still "$DIR/src/index.ts" "$ID" "$TMP" --image-format=png --scale=2 >/dev/null 2>&1
node "$RESIZE" "$TMP" "$OUT" "$W" "$H"
rm -f "$TMP"
echo "✓ $OUT  (${W}×${H}, scale2→Lanczos/sharp, sem franja)"
