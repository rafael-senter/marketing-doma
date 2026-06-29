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
#   2. Habilita plugin em ~/.claude/settings.json (enabledPlugins)
#   3. Registra em ~/.claude/plugins/installed_plugins.json
#   4. Registra fonte em ~/.claude/plugins/known_marketplaces.json
#
# ⚠️  Modo LEGACY (dev). Equipe marketing usa install-project.sh via CLI.
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
NODE="${NODE:-node}"

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
  if [ "$DRY_RUN" -eq 0 ] && command -v "$NODE" >/dev/null 2>&1; then
    "$NODE" "$REPO_DIR/scripts/lib/settings-enable-plugin.js" "$SETTINGS" "marketing-doma@marketing-doma" disable 2>/dev/null || true
    for p in "$REGISTRY" "$MARKETPLACES"; do
      if [ -f "$p" ]; then
        "$NODE" -e "
const fs=require('fs'); const p=process.argv[1];
const d=JSON.parse(fs.readFileSync(p,'utf8'));
if(p.includes('installed_plugins')) delete d.plugins?.['marketing-doma@marketing-doma'];
if(p.includes('known_marketplaces')) delete d['marketing-doma'];
fs.writeFileSync(p, JSON.stringify(d,null,2)+'\n');
" "$p"
      fi
    done
    log "settings + registry limpos"
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

if ! command -v "$NODE" >/dev/null 2>&1; then
  echo "❌ node ausente (necessário pra editar settings.json)"
  exit 2
fi

run "mkdir -p '$PLUGINS_DIR'"

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

# ============= 2. SETTINGS.JSON — enabledPlugins =============
step "2. settings.json — habilitar plugin"

if [ ! -f "$SETTINGS" ]; then
  run "echo '{}' > '$SETTINGS'"
  log "settings.json criado vazio"
fi

if [ "$DRY_RUN" -eq 0 ]; then
  cp "$SETTINGS" "$SETTINGS.bak.$(date -Iseconds 2>/dev/null | tr ':' '-' || date +%Y%m%d-%H%M%S)"
  "$NODE" "$REPO_DIR/scripts/lib/settings-enable-plugin.js" "$SETTINGS" "marketing-doma@marketing-doma" enable
else
  log "[dry-run] habilitaria marketing-doma@marketing-doma em enabledPlugins"
fi

# ============= 3. installed_plugins.json =============
step "3. installed_plugins.json"

if [ ! -f "$REGISTRY" ]; then
  run "echo '{\"version\":2,\"plugins\":{}}' > '$REGISTRY'"
fi

if [ "$DRY_RUN" -eq 0 ]; then
  cp "$REGISTRY" "$REGISTRY.bak.$(date -Iseconds 2>/dev/null | tr ':' '-' || date +%Y%m%d-%H%M%S)"
  "$NODE" -e "
const fs=require('fs');
const p='$REGISTRY';
const d=fs.existsSync(p)?JSON.parse(fs.readFileSync(p,'utf8')):{version:2,plugins:{}};
d.plugins=d.plugins||{};
const now=new Date().toISOString();
d.plugins['marketing-doma@marketing-doma']=[{scope:'user',installPath:'$PLUGIN_LINK',version:'$VERSION',installedAt:now,lastUpdated:now}];
fs.writeFileSync(p,JSON.stringify(d,null,2)+'\n');
console.log('  ✓ marketing-doma@marketing-doma registrado');
"
else
  log "[dry-run] registraria em plugins.marketing-doma@marketing-doma"
fi

# ============= 4. known_marketplaces.json =============
step "4. known_marketplaces.json"

if [ ! -f "$MARKETPLACES" ]; then
  run "echo '{}' > '$MARKETPLACES'"
fi

if [ "$DRY_RUN" -eq 0 ]; then
  cp "$MARKETPLACES" "$MARKETPLACES.bak.$(date -Iseconds 2>/dev/null | tr ':' '-' || date +%Y%m%d-%H%M%S)"
  "$NODE" -e "
const fs=require('fs');
const p='$MARKETPLACES';
const d=fs.existsSync(p)?JSON.parse(fs.readFileSync(p,'utf8')):{};
d['marketing-doma']={source:{source:'directory',path:'$PLUGIN_LINK'},installLocation:'$PLUGIN_LINK',lastUpdated:new Date().toISOString()};
fs.writeFileSync(p,JSON.stringify(d,null,2)+'\n');
console.log('  ✓ marketing-doma registrado como marketplace local');
"
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
