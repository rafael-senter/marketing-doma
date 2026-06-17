#!/usr/bin/env bash
# sync-components.sh
# Copia templates/components/<categoria>/<Componente>.tsx do plugin → projeto Remotion
# host (remotion-doma/src/v2/categorias/<categoria>/). Também sincroniza infra (theme.ts,
# components.tsx) e assets oficiais. Idempotente (cp -u só atualiza se mais novo).
#
# Roda em duas situações:
#   1. /marketing-doma-setup (instalação) — primeiro sync.
#   2. Quando plugin é atualizado (git pull) — re-sync.
#
# NÃO sobrescreve arquivos que o host modificou após o sync. (Usuário pode customizar
# no host sem perder com re-sync. Mas então perde melhorias do plugin — tradeoff.)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_ROOT="$(cd "$PLUGIN_DIR/../../.." && pwd)"
HOST_REMOTION="$PROJECT_ROOT/remotion-doma"

if [ ! -d "$HOST_REMOTION" ]; then
  echo "[ERRO] remotion-doma não existe em $PROJECT_ROOT. Rode /marketing-doma-setup primeiro."
  exit 1
fi

echo "==> Sync plugin → host"
echo "    Plugin: $PLUGIN_DIR"
echo "    Host:   $HOST_REMOTION"
echo ""

# 1. Infra (theme.ts + components.tsx)
echo "[1/4] Infra (theme.ts, components.tsx)"
cp -u "$PLUGIN_DIR/templates/components/_base/theme.ts"      "$HOST_REMOTION/src/theme.ts"
cp -u "$PLUGIN_DIR/templates/components/_base/components.tsx" "$HOST_REMOTION/src/components.tsx"

# 2. Componentes por categoria
echo "[2/4] Componentes (18 .tsx em 15 categorias)"
mkdir -p "$HOST_REMOTION/src/v2/categorias"
for catdir in "$PLUGIN_DIR/templates/components/"*/; do
  cat=$(basename "$catdir")
  [ "$cat" = "_base" ] && continue
  mkdir -p "$HOST_REMOTION/src/v2/categorias/$cat"
  cp -u "$catdir"*.tsx "$HOST_REMOTION/src/v2/categorias/$cat/" 2>/dev/null || true
done

# 3. Assets oficiais (logos + ícones + fontes)
echo "[3/4] Assets oficiais (logos, ícones, fontes)"
mkdir -p "$HOST_REMOTION/public/oficial"
mkdir -p "$HOST_REMOTION/public/icones"
mkdir -p "$HOST_REMOTION/public/fontes"
cp -u "$PLUGIN_DIR/assets/oficial/"*.png "$HOST_REMOTION/public/oficial/" 2>/dev/null || true
cp -u "$PLUGIN_DIR/assets/oficial/"*.svg "$HOST_REMOTION/public/oficial/" 2>/dev/null || true
cp -u "$PLUGIN_DIR/assets/icones/"*     "$HOST_REMOTION/public/icones/"  2>/dev/null || true
cp -u "$PLUGIN_DIR/assets/fontes/"*     "$HOST_REMOTION/public/fontes/"  2>/dev/null || true

# 4. .npmrc local (override min-release-age global)
echo "[4/4] .npmrc local (min-release-age=0)"
if [ ! -f "$HOST_REMOTION/.npmrc" ]; then
  echo "min-release-age=0" > "$HOST_REMOTION/.npmrc"
fi

echo ""
echo "✅ Sync OK."
echo "   Host atualizado com componentes/assets do plugin."
echo "   Próximo: rodar 'npm i' em $HOST_REMOTION se ainda não rodou."
