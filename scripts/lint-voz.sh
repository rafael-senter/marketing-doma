#!/usr/bin/env bash
# lint-voz.sh — detecta frases proibidas / anti-padrões da voz Doma em markdown.
# Roda em arquivos .md do plugin (skills, padroes, planos, commands, agents).
# Saída: tabela arquivo:linha: <severidade> <regra> — <trecho>.
#
# NÃO lê knowledge-base/identidade/voz-sigadoma.md (lista as proibidas como referência).
# NÃO lê knowledge-base/padroes/RULES-recriacao.md (lista anti-padrões intencionalmente).
# NÃO lê CLAUDE.md (regras de marca + glossário citam o erro como contra-exemplo).

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PLUGIN_DIR"

# Diretórios a varrer
TARGETS=(
  "templates/planos/"
  "templates/plano-base/"
  "skills/"
  "commands/"
  "agents/"
  "knowledge-base/padroes/POST-"
)

# Files a IGNORAR (mencionam regras como referência, não como uso)
IGNORE=(
  "CLAUDE.md"
  "knowledge-base/identidade/voz-sigadoma.md"
  "knowledge-base/identidade/design-system.md"
  "knowledge-base/padroes/RULES-recriacao.md"
  "knowledge-base/padroes/PLANO-recriacao.md"
  "knowledge-base/assets-index/"
  "skills/marketing-doma/subskills/brand-rules/"
  "skills/marketing-doma/subskills/novo-post-from-scratch/"
  "agents/ghostwriter-doma.md"
  "agents/validador-marca.md"
  "agents/editor-conteudo.md"
  "scripts/lint-voz.sh"
)

# Regras: case|severidade|nome|regex
# case: cs = case-sensitive, ci = case-insensitive
# Severidade: BLOQUEIA / AVISO
RULES=(
  "ci|BLOQUEIA|brand:DOM.a digitada|DOM\.a"
  "cs|BLOQUEIA|brand:DOMA caixa-alta em prosa|\bDOMA\b"
  "ci|BLOQUEIA|voz:julgador 'luxo de quem'|luxo de quem"
  "ci|BLOQUEIA|voz:julgador 'preguiça'|\bpregui[çc]a\b"
  "ci|BLOQUEIA|voz:julgador 'burrice/idiota'|\b(burrice|idiota)\b"
  "ci|AVISO|voz:promessa-atalho|(10x em [0-9]+ dias|em 1 click resolve)"
  "ci|AVISO|voz:anglicismo 'performance'|\bperformance\b"
  "ci|AVISO|voz:anglicismo 'tracking'|\btracking\b"
  "ci|AVISO|voz:anglicismo 'deliver'|\bdeliver\b"
  "ci|AVISO|voz:anglicismo 'workflow'|\bworkflow\b"
  "ci|AVISO|voz:ataque-concorrente|(diferente do sistema |no [A-Z][a-z]+ você não tem)"
)

# Coletar files
FILES=()
for t in "${TARGETS[@]}"; do
  while IFS= read -r f; do
    # ignora se bate qualquer padrão de IGNORE
    skip=0
    for ig in "${IGNORE[@]}"; do
      if [[ "$f" == *"$ig"* ]]; then skip=1; break; fi
    done
    [ $skip -eq 0 ] && FILES+=("$f")
  done < <(find "$t" -name '*.md' 2>/dev/null)
done

# Aplicar regras
TOTAL_BLOQUEIA=0
TOTAL_AVISO=0
echo "==> Lint voz — varrendo ${#FILES[@]} arquivos"
echo ""

for f in "${FILES[@]}"; do
  for rule in "${RULES[@]}"; do
    IFS='|' read -r CASE SEV NAME PATTERN <<< "$rule"
    GREP_FLAGS="-n -E"
    [ "$CASE" = "ci" ] && GREP_FLAGS="-in -E"
    while IFS=: read -r linenum match; do
      [ -z "$match" ] && continue
      # Skip linhas que são contra-exemplo documentado (lista anti-padrões)
      if echo "$match" | grep -qE '(❌|NÃO usar|nunca|erro recorrente|errado:|anti-padrão|NÃO escrever|não "|não usar|trocar por)'; then continue; fi
      # Skip se o termo está entre aspas (citação/contra-exemplo)
      if echo "$match" | grep -qE "[\"'](DOMA|DOM\.a)[\"']"; then continue; fi
      echo "[$SEV] $f:$linenum: $NAME"
      echo "   → $match" | head -c 120 ; echo ""
      [ "$SEV" = "BLOQUEIA" ] && TOTAL_BLOQUEIA=$((TOTAL_BLOQUEIA+1)) || TOTAL_AVISO=$((TOTAL_AVISO+1))
    done < <(grep $GREP_FLAGS "$PATTERN" "$f" 2>/dev/null || true)
  done
done

echo ""
echo "==> Resultado: $TOTAL_BLOQUEIA BLOQUEIA · $TOTAL_AVISO AVISO"

if [ $TOTAL_BLOQUEIA -gt 0 ]; then
  echo "❌ Lint voz REPROVADO — corrigir BLOQUEIAS antes de publicar/commitar."
  exit 1
elif [ $TOTAL_AVISO -gt 0 ]; then
  echo "⚠️  Lint voz com AVISOS — revisar mas não bloqueia."
  exit 0
else
  echo "✅ Lint voz OK"
  exit 0
fi
