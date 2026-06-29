#!/usr/bin/env bash
# marketing-doma :: install-project.sh
# Registra o plugin NO PROJETO (CWD) — sem clone global, sem cache redundante.
#
# Espera plugin clonado em: <projeto>/.claude/skills/marketing-doma/
#
# Uso:
#   MARKETING_DOMA_PROJECT=/path/projeto bash install-project.sh
#   bash install-project.sh --uninstall
#   bash install-project.sh --dry-run

set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ -n "${MARKETING_DOMA_PROJECT:-}" ] && [ -d "$MARKETING_DOMA_PROJECT" ]; then
  PROJECT_ROOT="$(cd "$MARKETING_DOMA_PROJECT" && pwd)"
else
  # .claude/skills/marketing-doma → sobe 3 níveis
  PROJECT_ROOT="$(cd "$REPO_DIR/../../.." && pwd)"
fi

CLAUDE_PROJECT="$PROJECT_ROOT/.claude"
SETTINGS="$CLAUDE_PROJECT/settings.json"
VERSION=$(grep '"version"' "$REPO_DIR/plugin.json" | head -1 | sed 's/.*"\([0-9.]*\)".*/\1/')
NODE="${NODE:-node}"

DRY_RUN=0
UNINSTALL=0
for arg in "$@"; do
  case "$arg" in
    --dry-run|-n) DRY_RUN=1 ;;
    --uninstall) UNINSTALL=1 ;;
    --help|-h)
      sed -n '2,20p' "$0"
      exit 0
      ;;
    *) echo "Flag desconhecida: $arg"; exit 2 ;;
  esac
done

log() { echo "  $*"; }
step() { echo ""; echo "▸ $*"; }
run() { if [ "$DRY_RUN" -eq 1 ]; then echo "  [dry-run] $*"; else eval "$*"; fi; }

json_enable() {
  if [ "$DRY_RUN" -eq 1 ]; then
    log "[dry-run] habilitaria marketing-doma@marketing-doma em $1"
    return
  fi
  if ! command -v "$NODE" >/dev/null 2>&1; then
    echo "❌ node não encontrado (necessário pra registrar plugin)"
    exit 2
  fi
  "$NODE" "$REPO_DIR/scripts/lib/settings-enable-plugin.js" "$1" "marketing-doma@marketing-doma" enable
}

json_disable() {
  if [ "$DRY_RUN" -eq 1 ]; then return; fi
  command -v "$NODE" >/dev/null 2>&1 || return 0
  "$NODE" "$REPO_DIR/scripts/lib/settings-enable-plugin.js" "$SETTINGS" "marketing-doma@marketing-doma" disable 2>/dev/null || true
}

# ============= UNINSTALL =============
if [ "$UNINSTALL" -eq 1 ]; then
  echo "marketing-doma :: uninstall (projeto)"
  echo "Projeto: $PROJECT_ROOT"
  json_disable
  log "✓ marketing-doma desabilitado em $SETTINGS"
  if [ -d "$REPO_DIR" ] && [ "$REPO_DIR" = "$PROJECT_ROOT/.claude/skills/marketing-doma" ]; then
    run "rm -rf '$REPO_DIR'"
    log "✓ plugin removido de $REPO_DIR"
  fi
  echo "✓ Desinstalado. Reinicie Claude Code."
  exit 0
fi

# ============= INSTALL =============
echo "marketing-doma :: install-project v$VERSION"
echo "Projeto:  $PROJECT_ROOT"
echo "Plugin:   $REPO_DIR"
echo "Modo:     $([ "$DRY_RUN" -eq 1 ] && echo 'dry-run' || echo 'aplica')"
echo ""

if [ ! -f "$REPO_DIR/plugin.json" ]; then
  echo "❌ plugin.json não encontrado em $REPO_DIR"
  exit 2
fi

step "1. settings.json do projeto — habilitar plugin"
run "mkdir -p '$CLAUDE_PROJECT'"
if [ -f "$SETTINGS" ] && [ "$DRY_RUN" -eq 0 ]; then
  cp "$SETTINGS" "$SETTINGS.bak.$(date -Iseconds 2>/dev/null | tr ':' '-' || date +%Y%m%d-%H%M%S)"
fi
json_enable "$SETTINGS"

step "2. Verificar estrutura do plugin"
for f in plugin.json .claude-plugin/plugin.json commands/marketing-doma.md; do
  if [ ! -e "$REPO_DIR/$f" ]; then
    echo "❌ arquivo ausente: $f"
    exit 2
  fi
  log "✓ $f"
done

step "3. Remotion + sync + IDE (Node)"
if [ "$DRY_RUN" -eq 1 ]; then
  log "[dry-run] rodaria node scripts/lib/install-deps.mjs"
else
  MARKETING_DOMA_PROJECT="$PROJECT_ROOT" "$NODE" "$REPO_DIR/scripts/lib/install-deps.mjs"
fi

echo ""
echo "🎉 Plugin marketing-doma v$VERSION pronto no projeto."
echo ""
echo "Próximos passos:"
echo "  1. Reinicie Claude Code / Cursor na pasta $PROJECT_ROOT"
echo "  2. Rode: /marketing-doma         (criar peça)"
echo ""
echo "Reparar setup: /marketing-doma-setup  ou  marketing-doma install"
echo "Desinstalar: bash $0 --uninstall"
