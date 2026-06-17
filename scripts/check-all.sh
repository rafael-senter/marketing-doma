#!/usr/bin/env bash
# check-all.sh — roda TODOS os checks de qualidade do plugin localmente.
# Substitui o CI remoto (rodar manual antes de push importante).
#
# Inclui:
#   1. validate.sh — estrutura, refs, smoke new-post.
#   2. lint-voz.sh — frases proibidas + anglicismo + marca em prosa.
#
# Saída: relatório consolidado + exit 0/1.

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

FAIL=0

echo "════════════════════════════════════════════════════"
echo "  CHECK-ALL — plugin marketing-doma"
echo "════════════════════════════════════════════════════"
echo ""

# 1. Validate
echo "─── 1/2 validate.sh ───"
if bash "$SCRIPT_DIR/validate.sh"; then
  echo "✅ validate OK"
else
  echo "❌ validate FALHOU"; FAIL=1
fi
echo ""

# 2. Lint voz
echo "─── 2/2 lint-voz.sh ───"
if bash "$SCRIPT_DIR/lint-voz.sh"; then
  echo "✅ lint-voz OK"
else
  echo "❌ lint-voz FALHOU"; FAIL=1
fi
echo ""

echo "════════════════════════════════════════════════════"
if [ $FAIL -eq 0 ]; then
  echo "  🎉 TODOS OS CHECKS PASSARAM"
else
  echo "  ❌ ALGUM CHECK FALHOU — corrigir antes de push"
fi
echo "════════════════════════════════════════════════════"

exit $FAIL
