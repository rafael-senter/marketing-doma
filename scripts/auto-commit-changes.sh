#!/usr/bin/env bash
# auto-commit-changes.sh — detecta mudanças no plugin global durante sessão e commita.
#
# Comportamento:
#   - Verifica `git status` no plugin (~/.claude/plugins/marketing-doma).
#   - Se há mudanças NÃO commitadas em arquivos críticos (knowledge-base/, templates/,
#     scripts/, CLAUDE.md, fichas), commita com mensagem auto-gerada por arquivo.
#   - Sempre validate antes (check-all.sh) — se falhar, NÃO commita (deixa user fix).
#   - Idempotente — se não há mudanças, exit 0 silencioso.
#
# Uso:
#   bash auto-commit-changes.sh              # commita tudo pendente
#   bash auto-commit-changes.sh --dry-run    # mostra o que faria
#   bash auto-commit-changes.sh --push       # commita E push pro origin
#
# Quando rodar:
#   - Manual: depois de editar ficha/componente durante sessão.
#   - Hook (futuro): SessionEnd OR após cada Edit/Write em arquivo do plugin.
#   - Skill: invocado pelo auto-optimizer quando promove regra.

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

DRY_RUN=0
PUSH=0
for arg in "$@"; do
  case "$arg" in
    --dry-run|-n) DRY_RUN=1 ;;
    --push) PUSH=1 ;;
    --help|-h) sed -n '2,20p' "$0"; exit 0 ;;
  esac
done

cd "$PLUGIN_DIR"

# 1. Estado git
CHANGED=$(git status --short | wc -l)
if [ "$CHANGED" -eq 0 ]; then
  echo "[auto-commit] nada a commitar"
  exit 0
fi

echo "==> $CHANGED arquivo(s) modificado(s) no plugin"
git status --short

# 2. Validate antes (não commitar plugin quebrado)
echo ""
echo "==> Rodando check-all (não commita se falhar)..."
if ! bash "$PLUGIN_DIR/scripts/check-all.sh" >/tmp/check-all-$$.log 2>&1; then
  echo "❌ check-all FALHOU — não commitando. Ver /tmp/check-all-$$.log"
  exit 1
fi
rm -f /tmp/check-all-$$.log
echo "✅ check-all OK"

# 3. Agrupar mudanças por tipo + commit com mensagem inteligente
echo ""
echo "==> Agrupando e commitando..."

# Detectar arquivos por categoria
KB_CHANGES=$(git status --short | grep "knowledge-base/" | awk '{print $NF}' | tr '\n' ' ')
TPL_CHANGES=$(git status --short | grep "templates/" | awk '{print $NF}' | tr '\n' ' ')
SCRIPT_CHANGES=$(git status --short | grep "scripts/" | awk '{print $NF}' | tr '\n' ' ')
SKILL_CHANGES=$(git status --short | grep "skills/" | awk '{print $NF}' | tr '\n' ' ')

# Gerar título do commit
TYPE=""
[ -n "$KB_CHANGES" ] && TYPE="docs"
[ -n "$TPL_CHANGES" ] && TYPE="${TYPE:+$TYPE,}fix"
[ -n "$SCRIPT_CHANGES" ] && TYPE="${TYPE:+$TYPE,}feat"
[ -n "$SKILL_CHANGES" ] && TYPE="${TYPE:+$TYPE,}feat"
[ -z "$TYPE" ] && TYPE="chore"

# Linhas do body
BODY=""
[ -n "$KB_CHANGES" ]    && BODY+="- knowledge-base: $(echo $KB_CHANGES | tr ' ' '\n' | head -3 | xargs)\n"
[ -n "$TPL_CHANGES" ]   && BODY+="- templates: $(echo $TPL_CHANGES | tr ' ' '\n' | head -3 | xargs)\n"
[ -n "$SCRIPT_CHANGES" ] && BODY+="- scripts: $(echo $SCRIPT_CHANGES | tr ' ' '\n' | head -3 | xargs)\n"
[ -n "$SKILL_CHANGES" ] && BODY+="- skills: $(echo $SKILL_CHANGES | tr ' ' '\n' | head -3 | xargs)\n"

DATE="$(date -u +%Y-%m-%d)"
COMMIT_MSG="auto: $TYPE — mudanças runtime $DATE

$(echo -e "$BODY")
Auto-commitado por auto-commit-changes.sh.
Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"

if [ $DRY_RUN -eq 1 ]; then
  echo "[dry-run] commit message seria:"
  echo "$COMMIT_MSG"
  exit 0
fi

git add -A
git commit -q -m "$COMMIT_MSG"
echo "✅ commit criado: $(git log --oneline -1)"

# 4. Push opcional
if [ $PUSH -eq 1 ]; then
  echo ""
  echo "==> push origin main..."
  git push origin main 2>&1 | tail -3
fi
