#!/usr/bin/env bash
# install-globally.sh — instala plugin marketing-doma globalmente no Claude Code via symlink.
#
# Cria symlink ~/.claude/plugins/marketing-doma → este diretório do plugin.
# Edição é COMPARTILHADA: mexer no plugin (em qualquer caminho) propaga global.
#
# Idempotente. Roda em cada máquina nova que clonar o plugin.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
GLOBAL_DIR="$HOME/.claude/plugins"
TARGET="$GLOBAL_DIR/marketing-doma"
VERSION=$(grep '"version"' "$PLUGIN_DIR/plugin.json" | head -1 | sed 's/.*"\([0-9.]*\)".*/\1/')

echo "==> Plugin marketing-doma v$VERSION"
echo "    Fonte: $PLUGIN_DIR"
echo "    Global: $TARGET"
echo ""

# 1. Garantir pasta global
mkdir -p "$GLOBAL_DIR"

# 2. Criar/atualizar symlink
if [ -L "$TARGET" ]; then
  CURRENT="$(readlink "$TARGET")"
  if [ "$CURRENT" = "$PLUGIN_DIR" ]; then
    echo "[OK] Symlink já aponta pra $PLUGIN_DIR"
  else
    echo "[REPLACE] Symlink apontava pra $CURRENT — atualizando."
    rm "$TARGET"
    ln -sfn "$PLUGIN_DIR" "$TARGET"
  fi
elif [ -d "$TARGET" ]; then
  echo "[ERRO] $TARGET existe como diretório real (não symlink). Renomear ou remover manualmente."
  exit 1
else
  ln -sfn "$PLUGIN_DIR" "$TARGET"
  echo "[OK] Symlink criado: $TARGET → $PLUGIN_DIR"
fi

# 3. Registrar em known_marketplaces.json
KMP="$HOME/.claude/plugins/known_marketplaces.json"
[ ! -f "$KMP" ] && echo "{}" > "$KMP"

python3 - <<PY
import json
p = "$KMP"
with open(p) as f: data = json.load(f)
data['marketing-doma'] = {
    "source": {"source": "directory", "path": "$TARGET"},
    "installLocation": "$TARGET",
    "lastUpdated": "$(date -u +%Y-%m-%dT%H:%M:%S.000Z)"
}
with open(p, 'w') as f: json.dump(data, f, indent=4)
print("[OK] known_marketplaces.json atualizado")
PY

# 4. Registrar em installed_plugins.json
IPJ="$HOME/.claude/plugins/installed_plugins.json"
[ ! -f "$IPJ" ] && echo '{"version":2,"plugins":{}}' > "$IPJ"

python3 - <<PY
import json
p = "$IPJ"
with open(p) as f: data = json.load(f)
data.setdefault('plugins', {})
data['plugins']['marketing-doma@marketing-doma'] = [{
    "scope": "user",
    "installPath": "$TARGET",
    "version": "$VERSION",
    "installedAt": "$(date -u +%Y-%m-%dT%H:%M:%S.000Z)",
    "lastUpdated": "$(date -u +%Y-%m-%dT%H:%M:%S.000Z)"
}]
with open(p, 'w') as f: json.dump(data, f, indent=2)
print("[OK] installed_plugins.json atualizado")
PY

echo ""
echo "🎉 Plugin instalado globalmente. Reinicie o Claude Code:"
echo "   1. Saia da sessão atual"
echo "   2. Entre de novo (\`claude\`)"
echo "   3. Teste: /marketing-doma"
echo ""
echo "Edições no plugin (em qualquer caminho) refletem global automaticamente (symlink)."
