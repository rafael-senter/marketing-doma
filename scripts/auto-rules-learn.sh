#!/usr/bin/env bash
# auto-rules-learn.sh — captura uma regra nova descoberta em runtime.
# Cria arquivo em knowledge-base/live-rules/<YYYY-MM-DD>-<topic-slug>.md
# e commita no sub-repo do plugin.
#
# Uso interativo (sem args) → pergunta cada campo.
# Uso CLI:
#   bash auto-rules-learn.sh <topic-slug> <"título"> <"sintoma"> <"medição"> <"regra"> <"aplicar-em">

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
LIVE_DIR="$PLUGIN_DIR/knowledge-base/live-rules"
DATA="$(date +%Y-%m-%d)"

if [ $# -ge 6 ]; then
  SLUG="$1"; TITULO="$2"; SINTOMA="$3"; MEDICAO="$4"; REGRA="$5"; APLICAR="$6"
else
  read -p "Slug (kebab-case): " SLUG
  read -p "Título: " TITULO
  read -p "Sintoma (o que estava errado): " SINTOMA
  read -p "Medição (número/cor/posição medida): " MEDICAO
  read -p "Regra nova: " REGRA
  read -p "Aplicar em (categorias): " APLICAR
fi

FILE="$LIVE_DIR/${DATA}-${SLUG}.md"

cat > "$FILE" <<EOF
# $TITULO

**Data:** $DATA
**Descoberto em:** runtime
**Sintoma:** $SINTOMA
**Medição:** $MEDICAO
**Regra nova:** $REGRA
**Aplicar em:** $APLICAR
**Status:** novo
EOF

echo "[OK] Live-rule gravada: $FILE"

# Commit no sub-repo do plugin
if [ -d "$PLUGIN_DIR/.git" ]; then
  (cd "$PLUGIN_DIR" && git add "$FILE" && \
   git -c user.email='auto@doma' -c user.name='auto-rules-learn' \
     commit -q -m "docs(live-rules): $TITULO" 2>/dev/null || true)
  echo "[OK] Commitado no sub-repo."
fi
