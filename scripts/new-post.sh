#!/usr/bin/env bash
# new-post.sh — scaffold de novo post da categoria escolhida.
# Gera: (1) plano em templates/planos/POST-<nome>-plano.md
#       (2) snippet de Still em /tmp/<nome>-still-snippet.tsx (pronto pra colar em Root.tsx)
# Uso:
#   bash new-post.sh <categoria> <nome-do-post>
#   bash new-post.sh <categoria> <nome-do-post> --conteudo /caminho/conteudo.json
#
# Categorias suportadas (templates em templates/plano-base/<categoria>.tpl.md):
#   dicas-carrossel, spin, frase-pilulas, inimigo-em-comum, doma-motiva, narrativa,
#   produtividade, certo-e-errado, clientes, mapa-clientes, funcoes-sistema,
#   doma-institucional, doma-carrossel-clientes
#
# Se uma categoria não tem template ainda, usa o template-generico.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

CATEGORIA="${1:-}"
NOME="${2:-}"

if [ -z "$CATEGORIA" ] || [ -z "$NOME" ]; then
  cat <<EOF
Uso: bash new-post.sh <categoria> <nome-do-post> [--conteudo arquivo.json]

Categorias:
  dicas-carrossel · spin · frase-pilulas · inimigo-em-comum · doma-motiva
  narrativa · produtividade · certo-e-errado · clientes · mapa-clientes
  funcoes-sistema · doma-institucional · doma-carrossel-clientes

Exemplo: bash new-post.sh dicas-carrossel gestao-estoque
EOF
  exit 1
fi

# Localizar template
PLANO_TPL="$PLUGIN_DIR/templates/plano-base/$CATEGORIA.tpl.md"
SNIP_TPL="$PLUGIN_DIR/templates/still-snippets/$CATEGORIA.tpl.tsx"

if [ ! -f "$PLANO_TPL" ]; then
  PLANO_TPL="$PLUGIN_DIR/templates/plano-base/_generico.tpl.md"
  echo "[INFO] Categoria '$CATEGORIA' sem template específico — usando _generico."
fi

PLANO_OUT="$PLUGIN_DIR/templates/planos/POST-${NOME}-plano.md"
SNIP_OUT="/tmp/${NOME}-still-snippet.tsx"

# Substituir placeholders
sed "s/{{NOME}}/$NOME/g; s/{{CATEGORIA}}/$CATEGORIA/g; s/{{DATA}}/$(date +%Y-%m-%d)/g" \
  "$PLANO_TPL" > "$PLANO_OUT"

if [ -f "$SNIP_TPL" ]; then
  sed "s/{{NOME}}/$NOME/g" "$SNIP_TPL" > "$SNIP_OUT"
else
  echo "// Snippet genérico — adapte pra sua categoria" > "$SNIP_OUT"
  echo "<Still id=\"${NOME}-1\" component={NomeDoComponente as never}" >> "$SNIP_OUT"
  echo "  width={vertical.largura} height={vertical.altura} />" >> "$SNIP_OUT"
fi

cat <<EOF

✅ Post '$NOME' (categoria: $CATEGORIA) scaffold criado.

📄 Plano: $PLANO_OUT
📋 Snippet de Still: $SNIP_OUT

Próximos passos:
1. Editar o plano com cores medidas + conteúdo slide-a-slide.
2. Rodar validador-marca no plano.
3. Colar snippet em remotion-doma/src/Root.tsx.
4. bash remotion-doma/render-still.sh ${NOME}-1
EOF
