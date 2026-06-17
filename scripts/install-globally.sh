#!/usr/bin/env bash
# marketing-doma :: install-globally.sh
# Instalador portável COMPLETO. Roda 1x após clonar o plugin.
#
# Default: instala TUDO sem perguntar.
#
# Uso:
#   bash install-globally.sh                 # instala TUDO (recomendado)
#   bash install-globally.sh --dry-run       # mostra o que faria, sem mudar
#   bash install-globally.sh --uninstall     # remove symlinks + entries
#   bash install-globally.sh --help
#
# O que faz:
#   1. Symlink ~/.claude/plugins/marketing-doma → este diretório do plugin
#   2. Symlink cache redundante ~/.claude/plugins/cache/marketing-doma/marketing-doma/<v>/
#   3. Habilita plugin em ~/.claude/settings.json (enabledPlugins)
#   4. Registra em ~/.claude/plugins/installed_plugins.json
#   5. Registra fonte em ~/.claude/plugins/known_marketplaces.json
#
# 🛑 POLÍTICA INCREMENTAL — NUNCA SUBSTITUI
# - settings.json: apenas ADICIONA chaves (enabledPlugins['marketing-doma@marketing-doma']=True)
# - JSON registries: apenas ADICIONA entries. Outros plugins intactos.
# - Backup automático settings.json.bak.<timestamp> antes de cada mudança.
# - Idempotente: rodar 2x não duplica nada.

set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CLAUDE_DIR="$HOME/.claude"
PLUGINS_DIR="$CLAUDE_DIR/plugins"
SETTINGS="$CLAUDE_DIR/settings.json"
REGISTRY="$PLUGINS_DIR/installed_plugins.json"
MARKETPLACES="$PLUGINS_DIR/known_marketplaces.json"
PLUGIN_LINK="$PLUGINS_DIR/marketing-doma"
VERSION=$(grep '"version"' "$REPO_DIR/plugin.json" | head -1 | sed 's/.*"\([0-9.]*\)".*/\1/')
CACHE_LINK="$PLUGINS_DIR/cache/marketing-doma/marketing-doma/$VERSION"

DRY_RUN=0
UNINSTALL=0
for arg in "$@"; do
  case "$arg" in
    --dry-run|-n) DRY_RUN=1 ;;
    --uninstall) UNINSTALL=1 ;;
    --help|-h) sed -n '2,30p' "$0"; exit 0 ;;
    *) echo "Flag desconhecida: $arg"; exit 2 ;;
  esac
done

log() { echo "  $*"; }
step() { echo ""; echo "▸ $*"; }
run() { if [ "$DRY_RUN" -eq 1 ]; then echo "  [dry-run] $*"; else eval "$*"; fi; }

# ============= UNINSTALL =============
if [ "$UNINSTALL" -eq 1 ]; then
  echo "marketing-doma :: uninstall"
  [ -L "$PLUGIN_LINK" ] && { run "rm '$PLUGIN_LINK'"; log "✓ removido $PLUGIN_LINK"; }
  [ -L "$CACHE_LINK" ] && { run "rm '$CACHE_LINK'"; log "✓ removido $CACHE_LINK"; }
  if [ "$DRY_RUN" -eq 0 ]; then
    python3 - <<PYEOF
import json, pathlib
for p in [pathlib.Path("$SETTINGS"), pathlib.Path("$REGISTRY"), pathlib.Path("$MARKETPLACES")]:
    if not p.exists(): continue
    d = json.loads(p.read_text())
    if 'enabledPlugins' in d:
        d['enabledPlugins'].pop('marketing-doma@marketing-doma', None)
    if 'plugins' in d:
        d['plugins'].pop('marketing-doma@marketing-doma', None)
    if 'marketing-doma' in d:
        d.pop('marketing-doma', None)
    p.write_text(json.dumps(d, indent=2) + chr(10))
print("settings + registry + marketplaces limpos")
PYEOF
  fi
  echo "✓ Desinstalado. Reinicie Claude Code."
  exit 0
fi

# ============= PRE-FLIGHT =============
echo "marketing-doma :: install v$VERSION (completo)"
echo "Repo:     $REPO_DIR"
echo "Claude:   $CLAUDE_DIR"
echo "Modo:     $([ "$DRY_RUN" -eq 1 ] && echo 'dry-run (nada será gravado)' || echo 'aplica TUDO')"
echo "Politica: INCREMENTAL (nunca substitui — preserva outros plugins)"
echo ""

if [ ! -d "$CLAUDE_DIR" ]; then
  echo "❌ Claude Code não detectado em $CLAUDE_DIR"
  echo "   Instale primeiro: https://claude.com/code"
  exit 2
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "❌ python3 ausente (necessário pra editar settings.json com segurança)"
  exit 2
fi

run "mkdir -p '$PLUGINS_DIR' '$(dirname "$CACHE_LINK")'"

# ============= 1. SYMLINKS =============
step "1. Symlinks do plugin"

create_symlink() {
  local dst="$1" src="$2" label="$3"
  if [ -L "$dst" ] && [ "$(readlink "$dst")" = "$src" ]; then
    log "✓ $label já correto (skip)"
  elif [ -e "$dst" ] || [ -L "$dst" ]; then
    local bak="$dst.bak.$(date -Iseconds | tr ':' '-')"
    run "mv '$dst' '$bak'"
    log "⚠ existente movido para $bak"
    run "ln -s '$src' '$dst'"
    log "✓ $label criado"
  else
    run "ln -s '$src' '$dst'"
    log "✓ $label criado"
  fi
}

create_symlink "$PLUGIN_LINK" "$REPO_DIR" "plugin → repo"
create_symlink "$CACHE_LINK" "$REPO_DIR" "cache → repo (redundância)"

# ============= 2. SETTINGS.JSON — enabledPlugins =============
step "2. settings.json — habilitar plugin"

if [ ! -f "$SETTINGS" ]; then
  run "echo '{}' > '$SETTINGS'"
  log "settings.json criado vazio"
fi

if [ "$DRY_RUN" -eq 0 ]; then
  cp "$SETTINGS" "$SETTINGS.bak.$(date -Iseconds | tr ':' '-')"
  python3 - <<PYEOF
import json, pathlib
p = pathlib.Path("$SETTINGS")
d = json.loads(p.read_text())
ep = d.setdefault('enabledPlugins', {})
already = ep.get('marketing-doma@marketing-doma') == True
ep['marketing-doma@marketing-doma'] = True
p.write_text(json.dumps(d, indent=2) + chr(10))
print(f"  {'⊝' if already else '✓'} marketing-doma@marketing-doma habilitado" + (' (já estava)' if already else ''))
PYEOF
else
  log "[dry-run] habilitaria marketing-doma@marketing-doma em enabledPlugins"
fi

# ============= 3. installed_plugins.json =============
step "3. installed_plugins.json"

if [ ! -f "$REGISTRY" ]; then
  run "echo '{\"version\":2,\"plugins\":{}}' > '$REGISTRY'"
fi

if [ "$DRY_RUN" -eq 0 ]; then
  cp "$REGISTRY" "$REGISTRY.bak.$(date -Iseconds | tr ':' '-')"
  python3 - <<PYEOF
import json, pathlib, datetime
p = pathlib.Path("$REGISTRY")
d = json.loads(p.read_text())
d.setdefault('plugins', {})
now = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.000Z")
d['plugins']['marketing-doma@marketing-doma'] = [{
    "scope": "user",
    "installPath": "$PLUGIN_LINK",
    "version": "$VERSION",
    "installedAt": now,
    "lastUpdated": now
}]
p.write_text(json.dumps(d, indent=2) + chr(10))
print("  ✓ marketing-doma@marketing-doma registrado")
PYEOF
else
  log "[dry-run] registraria em plugins.marketing-doma@marketing-doma"
fi

# ============= 4. known_marketplaces.json =============
step "4. known_marketplaces.json"

if [ ! -f "$MARKETPLACES" ]; then
  run "echo '{}' > '$MARKETPLACES'"
fi

if [ "$DRY_RUN" -eq 0 ]; then
  cp "$MARKETPLACES" "$MARKETPLACES.bak.$(date -Iseconds | tr ':' '-')"
  python3 - <<PYEOF
import json, pathlib, datetime
p = pathlib.Path("$MARKETPLACES")
d = json.loads(p.read_text())
now = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.000Z")
d['marketing-doma'] = {
    "source": {"source": "directory", "path": "$PLUGIN_LINK"},
    "installLocation": "$PLUGIN_LINK",
    "lastUpdated": now
}
p.write_text(json.dumps(d, indent=2) + chr(10))
print("  ✓ marketing-doma registrado como marketplace local")
PYEOF
fi

# ============= DONE =============
echo ""
echo "🎉 Plugin marketing-doma v$VERSION instalado globalmente."
echo ""
echo "Próximos passos:"
echo "  1. Saia da sessão atual: exit"
echo "  2. Entre novamente: claude"
echo "  3. Teste: /marketing-doma"
echo ""
echo "Edições no plugin (em qualquer caminho do symlink) refletem global automaticamente."
echo ""
echo "Desinstalar: bash $0 --uninstall"
