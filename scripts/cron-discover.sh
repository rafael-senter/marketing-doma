#!/usr/bin/env bash
# cron-discover.sh — versão automatizada do discover-models.sh.
# Pra rodar semanalmente via cron. Grava relatório + notifica se há modelos novos.
#
# Saída:
#   - knowledge-base/live-rules/<data>-discover-report.md (sempre)
#   - exit 1 se há modelos novos (cron pode encaminhar)
#   - exit 0 se nada novo
#
# Setup cron (rodar 1x):
#   crontab -e
#   0 9 * * 1 bash /caminho/marketing-doma/scripts/cron-discover.sh > /tmp/cron-discover.log 2>&1
#   (Segunda 09h)

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DATA=$(date +%Y-%m-%d)
REPORT="$PLUGIN_DIR/knowledge-base/live-rules/${DATA}-discover-report.md"

# Rodar discover-models capturando output
OUTPUT=$(bash "$SCRIPT_DIR/discover-models.sh" 2>&1)

# Detectar quantos modelos novos
NEW_COUNT=$(echo "$OUTPUT" | grep -c "^  POST [0-9]")

# Gerar relatório
cat > "$REPORT" <<EOF
# Discover report — $DATA

**Modelos novos detectados:** $NEW_COUNT

## Saída completa

\`\`\`
$OUTPUT
\`\`\`

## Próximos passos sugeridos

EOF

if [ "$NEW_COUNT" -gt 0 ]; then
  cat >> "$REPORT" <<EOF
1. Revisar cada POST listado e decidir categoria.
2. Rodar \`discover-models.sh --suggest-fichas\` pra gerar stubs.
3. Promover stubs em fichas definitivas após medição.

**Status:** 🟡 ação necessária ($NEW_COUNT modelos a categorizar)
EOF
  echo "[discover] $NEW_COUNT modelos novos — relatório em $REPORT"
  exit 1
else
  cat >> "$REPORT" <<EOF
Nenhum modelo novo. Inventário em dia.

**Status:** ✅ ok
EOF
  echo "[discover] tudo em dia — relatório em $REPORT"
  exit 0
fi
