#!/usr/bin/env bash
# discover-models.sh — detecta novos PNG-modelo em doma-brand/tipos-de-posts/
# (do projeto host) que ainda não tem ficha em knowledge-base/padroes/ nem
# Still no Root.tsx. Saída = lista pra revisar.
#
# Uso:
#   bash discover-models.sh
#   bash discover-models.sh --suggest-fichas   # cria stub de ficha pra cada modelo novo

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
source "$SCRIPT_DIR/_detect-project.sh"
detect_project_root "$@" || exit 1

MODELS_DIR="$PROJECT_ROOT/doma-brand/tipos-de-posts/tipos de posts"
FICHAS_DIR="$PLUGIN_DIR/knowledge-base/padroes"
ROOT_TSX="$PROJECT_ROOT/remotion-doma/src/Root.tsx"

if [ ! -d "$MODELS_DIR" ]; then
  echo "[ERRO] modelos não encontrados em $MODELS_DIR"; exit 1
fi

SUGGEST=0
[ "${1:-}" = "--suggest-fichas" ] && SUGGEST=1

# Encontrar todos PNG de modelos
echo "==> Inventário de modelos em $MODELS_DIR"
TOTAL=$(find "$MODELS_DIR" -name '*.png' 2>/dev/null | wc -l)
echo "Total de PNGs: $TOTAL"

# Detectar categorias (subpastas)
echo ""
echo "==> Categorias detectadas:"
find "$MODELS_DIR" -mindepth 1 -maxdepth 2 -type d 2>/dev/null | while read d; do
  rel="${d#$MODELS_DIR/}"
  n=$(find "$d" -maxdepth 1 -name '*.png' 2>/dev/null | wc -l)
  [ "$n" -gt 0 ] && echo "  $rel ($n PNGs)"
done

# Comparar com fichas existentes
echo ""
echo "==> Categorias com ficha em knowledge-base/padroes/:"
ls "$FICHAS_DIR/" | grep -v -E '^(RULES|INDICE|PLANO|REFERENCIA|POST-)' | grep '.md$' | sed 's/.md$//' | sort

# Modelos novos = PNG existem mas ID não no Root.tsx
echo ""
echo "==> Modelos POSSIVELMENTE NOVOS (PNG existe + ID não detectado em Root.tsx)"
NEW_COUNT=0
find "$MODELS_DIR" -name 'POST *.png' 2>/dev/null | while read png; do
  fname=$(basename "$png" .png)
  # extrair numero do POST (ex: "POST 246 1" → 246)
  postnum=$(echo "$fname" | grep -oE '[0-9]+' | head -1)
  [ -z "$postnum" ] && continue
  # Buscar se há Still no Root.tsx mencionando esse número
  if ! grep -q "$postnum" "$ROOT_TSX" 2>/dev/null; then
    echo "  POST $postnum — $png"
    NEW_COUNT=$((NEW_COUNT+1))
  fi
done

# Sugerir stub de ficha (modo --suggest-fichas)
if [ $SUGGEST -eq 1 ]; then
  echo ""
  echo "==> [--suggest-fichas] stubs de ficha em $FICHAS_DIR/STUB-*.md"
  find "$MODELS_DIR" -name 'POST *.png' 2>/dev/null | while read png; do
    fname=$(basename "$png" .png)
    postnum=$(echo "$fname" | grep -oE '[0-9]+' | head -1)
    [ -z "$postnum" ] && continue
    if ! grep -q "$postnum" "$ROOT_TSX" 2>/dev/null; then
      stub="$FICHAS_DIR/STUB-POST-${postnum}.md"
      if [ ! -f "$stub" ]; then
        cat > "$stub" <<EOF
# STUB ficha — POST $postnum

> 🟡 Detectado pelo discover-models.sh em $(date +%Y-%m-%d). Modelo existe em $png mas não há recriação.

## TODO
- [ ] Decidir CATEGORIA (frase-pilulas / dicas / spin / inimigo / ...). Ver knowledge-base/padroes/INDICE.md.
- [ ] Rodar layout-mapper extract.py pra medir.
- [ ] Criar plano completo com cores medidas + voz.
- [ ] Codar componente em templates/components/<categoria>/.
- [ ] Renderizar e validar.
- [ ] Promover este STUB pra ficha definitiva.
EOF
        echo "  criado: $stub"
      fi
    fi
  done
fi

echo ""
echo "Tip: rodar 'discover-models.sh --suggest-fichas' pra gerar stubs."
