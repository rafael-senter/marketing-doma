#!/usr/bin/env bash
# compare-all.sh — roda layout-mapper compare.py em lote (render vs modelo).
# Uso:
#   bash compare-all.sh <pairs.csv>
#   onde cada linha: <id_render>,<caminho_modelo>
#
# Output: tabela markdown com fidelidade SSIM + % iguais + MAE por par.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_ROOT="$(cd "$PLUGIN_DIR/../../.." && pwd)"
VENV_PY="$PROJECT_ROOT/.venv-instagram/bin/python"
COMPARE_PY="$PROJECT_ROOT/.claude/skills/layout-mapper/scripts/compare.py"

CSV="${1:-}"

if [ ! -f "$VENV_PY" ] || [ ! -f "$COMPARE_PY" ]; then
  echo "[ERRO] venv ou layout-mapper não encontrado. Rode /marketing-doma-setup."
  exit 1
fi

if [ -z "$CSV" ] || [ ! -f "$CSV" ]; then
  cat <<EOF
Uso: bash compare-all.sh <pairs.csv>

Formato CSV (sem cabeçalho):
gestao-financeira-1,doma-brand/tipos-de-posts/tipos de posts/Dicas Carrossel/margem de lucro/POST 246 1.png
gestao-financeira-2,doma-brand/tipos-de-posts/tipos de posts/Dicas Carrossel/margem de lucro/POST 246 2.png
...
EOF
  exit 1
fi

echo "| ID | Fidelidade | SSIM | % iguais | MAE |"
echo "|---|---|---|---|---|"

while IFS=',' read -r ID MODELO; do
  RENDER="$PROJECT_ROOT/remotion-doma/out/${ID}.png"
  if [ ! -f "$RENDER" ] || [ ! -f "$MODELO" ]; then
    echo "| $ID | ❌ falta arquivo | — | — | — |"
    continue
  fi
  RESULT=$("$VENV_PY" "$COMPARE_PY" --modelo "$MODELO" --render "$RENDER" 2>/dev/null | grep -i fidel || true)
  if [ -z "$RESULT" ]; then
    echo "| $ID | ❌ erro | — | — | — |"
    continue
  fi
  # Ex: "[fidelidade] 87.7%  (SSIM=0.8575, pixels iguais=90.7%, MAE=11.33)"
  FID=$(echo "$RESULT" | grep -oP '\d+\.\d+(?=%)' | head -1)
  SSIM=$(echo "$RESULT" | grep -oP 'SSIM=\K\d+\.\d+')
  PCT=$(echo "$RESULT" | grep -oP 'pixels iguais=\K\d+\.\d+')
  MAE=$(echo "$RESULT" | grep -oP 'MAE=\K\d+\.\d+')
  echo "| $ID | ${FID}% | $SSIM | ${PCT}% | $MAE |"
done < "$CSV"
