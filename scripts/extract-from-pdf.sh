#!/usr/bin/env bash
# extract-from-pdf.sh — extrai imagem/região do manual PDF e padroniza nome.
# Stub inicial — protocolo completo em docs/ROADMAP-extracao-assets.md.
#
# Uso:
#   bash extract-from-pdf.sh --pdf <pdf> --page N [--crop x,y,w,h] --name <slug> --destino <pasta>
#
# Exemplos:
#   # Extrair página inteira como PNG
#   bash extract-from-pdf.sh --pdf doma-brand/manual/MANUAL_IDENTIDADE_DOMA.pdf \
#                            --page 8 --name pag-08-grade-M --destino /tmp
#
#   # Extrair região (crop em px após render a 300dpi)
#   bash extract-from-pdf.sh --pdf ...pdf --page 8 --crop 200,300,800,600 \
#                            --name simbolo-m-grafite --destino assets/oficial

set -uo pipefail

PDF=""; PAGE=""; CROP=""; NAME=""; DEST=""

while [ $# -gt 0 ]; do
  case "$1" in
    --pdf) PDF="$2"; shift ;;
    --page) PAGE="$2"; shift ;;
    --crop) CROP="$2"; shift ;;
    --name) NAME="$2"; shift ;;
    --destino) DEST="$2"; shift ;;
    -h|--help) sed -n '/^#/p' "$0" | head -20; exit 0 ;;
  esac
  shift
done

[ -z "$PDF" ] || [ -z "$PAGE" ] || [ -z "$NAME" ] || [ -z "$DEST" ] && {
  echo "Faltando argumentos. Veja --help."; exit 1
}
[ ! -f "$PDF" ] && { echo "[ERRO] PDF não existe: $PDF"; exit 1; }
mkdir -p "$DEST"

# Dependência: poppler-utils (pdftoppm) ou ImageMagick (convert)
if command -v pdftoppm >/dev/null; then
  TMP="/tmp/extract-$$.png"
  pdftoppm -r 300 -f "$PAGE" -l "$PAGE" -png "$PDF" "/tmp/extract-$$" 2>/dev/null
  # pdftoppm gera /tmp/extract-$$-N.png
  GENPNG=$(ls /tmp/extract-$$-*.png 2>/dev/null | head -1)
  [ -z "$GENPNG" ] && { echo "[ERRO] pdftoppm não gerou PNG"; exit 1; }
  mv "$GENPNG" "$TMP"
elif command -v convert >/dev/null; then
  TMP="/tmp/extract-$$.png"
  convert -density 300 "${PDF}[$((PAGE-1))]" "$TMP" 2>/dev/null
else
  echo "[ERRO] precisa pdftoppm (poppler-utils) OU convert (ImageMagick)."
  echo "       sudo apt install poppler-utils  OR  sudo apt install imagemagick"
  exit 1
fi

# Crop opcional
if [ -n "$CROP" ]; then
  IFS=',' read -r X Y W H <<< "$CROP"
  if command -v convert >/dev/null; then
    convert "$TMP" -crop "${W}x${H}+${X}+${Y}" "$TMP.crop.png"
    mv "$TMP.crop.png" "$TMP"
  else
    echo "[WARN] crop pediu mas convert não instalado — usando PNG inteiro"
  fi
fi

FINAL="$DEST/${NAME}.png"
mv "$TMP" "$FINAL"

echo "✅ extraído: $FINAL ($(stat -c%s "$FINAL") bytes)"
echo ""
echo "Próximos passos:"
echo "  1. Conferir visualmente o arquivo."
echo "  2. Adicionar entrada em scripts/build-catalog.py (OFICIAL_META/ICONES_META)."
echo "  3. Re-rodar: python scripts/build-catalog.py"
echo "  4. Sync pro host: bash scripts/sync-components.sh"
