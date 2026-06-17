#!/usr/bin/env bash
# lint-copy.sh — lint de copy AVULSA (não-arquivo).
# Stdin OU --file <arq> → roda mesmas regras do lint-voz.sh.
# Saída padrão: relatório markdown ou JSON.
#
# Uso:
#   echo "Achismo é luxo de quem não liga" | bash lint-copy.sh
#   bash lint-copy.sh --file /tmp/copy.txt
#   bash lint-copy.sh --json --file /tmp/copy.txt   (saída JSON pra web)

set -uo pipefail

JSON=0
FILE=""
while [ $# -gt 0 ]; do
  case "$1" in
    --json) JSON=1 ;;
    --file) FILE="$2"; shift ;;
    *) ;;
  esac
  shift
done

# Captura input
if [ -n "$FILE" ]; then
  [ ! -f "$FILE" ] && { echo "[ERRO] arquivo não existe: $FILE" >&2; exit 1; }
  INPUT=$(cat "$FILE")
else
  INPUT=$(cat)
fi

# Regras (mesmo conjunto do lint-voz.sh — ver lá pra detalhes)
declare -a RULES=(
  "ci|BLOQUEIA|brand:DOM.a digitada|DOM\\.a"
  "cs|BLOQUEIA|brand:DOMA caixa-alta em prosa|\\bDOMA\\b"
  "ci|BLOQUEIA|voz:julgador 'luxo de quem'|luxo de quem"
  "ci|BLOQUEIA|voz:julgador 'preguiça'|\\bpregui[çc]a\\b"
  "ci|BLOQUEIA|voz:julgador 'burrice/idiota'|\\b(burrice|idiota)\\b"
  "ci|AVISO|voz:promessa-atalho|(10x em [0-9]+ dias|em 1 click resolve)"
  "ci|AVISO|voz:anglicismo 'performance'|\\bperformance\\b"
  "ci|AVISO|voz:anglicismo 'tracking'|\\btracking\\b"
  "ci|AVISO|voz:anglicismo 'deliver'|\\bdeliver\\b"
  "ci|AVISO|voz:anglicismo 'workflow'|\\bworkflow\\b"
  "ci|AVISO|voz:ataque-concorrente|(diferente do sistema |no [A-Z][a-z]+ você não tem)"
)

# Coletar findings (linha-a-linha)
FINDINGS=()
LINE=0
while IFS= read -r row; do
  LINE=$((LINE+1))
  for rule in "${RULES[@]}"; do
    IFS='|' read -r CASE SEV NAME PATTERN <<< "$rule"
    FLAGS=""
    [ "$CASE" = "ci" ] && FLAGS="-i"
    if echo "$row" | grep -q $FLAGS -E "$PATTERN"; then
      FINDINGS+=("$LINE|$SEV|$NAME|$row")
    fi
  done
done <<< "$INPUT"

# Output
TOTAL_BLOQ=0
TOTAL_AVISO=0
for f in "${FINDINGS[@]}"; do
  IFS='|' read -r _ sev _ _ <<< "$f"
  [ "$sev" = "BLOQUEIA" ] && TOTAL_BLOQ=$((TOTAL_BLOQ+1)) || TOTAL_AVISO=$((TOTAL_AVISO+1))
done

if [ $JSON -eq 1 ]; then
  # JSON saída pra web
  python3 - "${FINDINGS[@]:-}" <<PY
import json, sys
findings = []
for arg in sys.argv[1:]:
    if not arg: continue
    parts = arg.split('|', 3)
    if len(parts) == 4:
        findings.append({
            'line': int(parts[0]),
            'sev': parts[1],
            'rule': parts[2],
            'text': parts[3]
        })
bloq = sum(1 for f in findings if f['sev']=='BLOQUEIA')
aviso = sum(1 for f in findings if f['sev']=='AVISO')
verdict = 'BLOQUEIA' if bloq>0 else ('AVISO' if aviso>0 else 'OK')
print(json.dumps({'verdict': verdict, 'bloqueia': bloq, 'aviso': aviso, 'findings': findings}, ensure_ascii=False, indent=2))
PY
else
  # Markdown saída pro terminal
  echo "# Lint de copy"
  echo ""
  if [ ${#FINDINGS[@]} -eq 0 ]; then
    echo "✅ Nenhuma frase proibida detectada."
    exit 0
  fi
  echo "| Linha | Severidade | Regra | Trecho |"
  echo "|---|---|---|---|"
  for f in "${FINDINGS[@]}"; do
    IFS='|' read -r ln sev name text <<< "$f"
    # truncar texto
    t=$(echo "$text" | head -c 80)
    echo "| $ln | $sev | $name | $t |"
  done
  echo ""
  echo "Total: $TOTAL_BLOQ BLOQUEIA · $TOTAL_AVISO AVISO"
  [ $TOTAL_BLOQ -gt 0 ] && exit 1 || exit 0
fi
