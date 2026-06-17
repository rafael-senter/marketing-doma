#!/usr/bin/env bash
# render-batch.sh — renderiza N stills via render-still.sh do host.
# Uso:
#   bash render-batch.sh <id1> <id2> ...
#   bash render-batch.sh <prefix> <N>     (range numerado: prefix-1..prefix-N)
#
# Sempre usa render-still.sh (scale 2 → Lanczos, sem franja).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
source "$SCRIPT_DIR/_detect-project.sh"
detect_project_root "$@" || exit 1
require_host_remotion || exit 1
HOST="$HOST_REMOTION"

# Modo range: $1 = prefix, $2 = N (apenas se $2 for número)
IDS=()
if [ $# -eq 2 ] && [[ "$2" =~ ^[0-9]+$ ]]; then
  PREFIX="$1"; N="$2"
  for i in $(seq 1 "$N"); do IDS+=("${PREFIX}-${i}"); done
else
  IDS=("$@")
fi

if [ ${#IDS[@]} -eq 0 ]; then
  echo "Uso: bash render-batch.sh <id1> <id2> ... | <prefix> <N>"
  exit 1
fi

OK=0; FAIL=0; FAILED_IDS=()
for id in "${IDS[@]}"; do
  if ( cd "$HOST" && ./render-still.sh "$id" 2>&1 | tail -1 ) | grep -q "✓"; then
    OK=$((OK+1))
  else
    FAIL=$((FAIL+1))
    FAILED_IDS+=("$id")
  fi
done

echo ""
echo "==> Render batch: $OK ok / $FAIL falha (total ${#IDS[@]})"
if [ $FAIL -gt 0 ]; then
  echo "    Falharam: ${FAILED_IDS[*]}"
  exit 1
fi
