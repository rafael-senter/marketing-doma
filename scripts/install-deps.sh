#!/usr/bin/env bash
# install-deps.sh — instalação completa do ambiente p/ usar o plugin marketing-doma.
# Idempotente. Chamado pelo comando /marketing-doma-setup.
#
# Etapas:
#   1. Verifica deps base (node, python3, claude).
#   2. Instala Remotion se ainda não existe.
#   3. Cria venv Python + Pillow/numpy/scipy.
#   4. Sincroniza componentes/assets plugin → host.
#   5. Cria/atualiza .claude/settings.json LOCAL c/ hook auto-start.
#   6. Smoke test.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
source "$SCRIPT_DIR/_detect-project.sh"
detect_project_root "$@" || exit 1
VENV="$PROJECT_ROOT/.venv-instagram"
SETTINGS="$PROJECT_ROOT/.claude/settings.json"

ok() { echo "  [OK]   $*"; }
skip() { echo "  [SKIP] $*"; }
inst() { echo "  [INSTALL] $*"; }
fail() { echo "  [FAIL] $*"; exit 1; }

# 1. Deps base
echo "==> 1/6 Verificando deps base"
command -v node >/dev/null || fail "node não encontrado. Instale Node.js LTS (>=20)."
command -v python3 >/dev/null || fail "python3 não encontrado. Instale Python 3.10+."
command -v claude >/dev/null || skip "claude CLI não encontrado (não bloqueia — você já está dentro dele se está rodando isto)."
ok "node $(node --version), python $(python3 --version | awk '{print $2}')"

# 2. Remotion — montar manual do template do plugin (sem create-video interativo)
echo "==> 2/6 Remotion"
TPL="$PLUGIN_DIR/templates/remotion-init"
[ ! -d "$TPL" ] && fail "template em $TPL não encontrado"

if [ ! -d "$HOST_REMOTION" ]; then
  inst "criando projeto Remotion em $HOST_REMOTION (template manual)"
  mkdir -p "$HOST_REMOTION/src"
  cp "$TPL/package.json"        "$HOST_REMOTION/package.json"
  cp "$TPL/tsconfig.json"       "$HOST_REMOTION/tsconfig.json"
  cp "$TPL/remotion.config.ts"  "$HOST_REMOTION/remotion.config.ts"
  cp "$TPL/.npmrc"              "$HOST_REMOTION/.npmrc"
  cp "$TPL/src/index.ts"        "$HOST_REMOTION/src/index.ts"
  cp "$TPL/src/Root.tsx"        "$HOST_REMOTION/src/Root.tsx"
  ok "template Remotion copiado"
fi

# .npmrc local (idempotente)
if [ ! -f "$HOST_REMOTION/.npmrc" ] || ! grep -q "min-release-age=0" "$HOST_REMOTION/.npmrc"; then
  inst "criando .npmrc local (override min-release-age global)"
  echo "min-release-age=0" > "$HOST_REMOTION/.npmrc"
fi

# render-still.sh anti-franja
if [ -f "$PLUGIN_DIR/templates/render-still.sh" ] && [ ! -f "$HOST_REMOTION/render-still.sh" ]; then
  cp "$PLUGIN_DIR/templates/render-still.sh" "$HOST_REMOTION/render-still.sh"
  chmod +x "$HOST_REMOTION/render-still.sh"
  ok "render-still.sh copiado pro host"
fi

# npm i
if [ ! -d "$HOST_REMOTION/node_modules" ]; then
  inst "instalando deps Remotion (npm i — ~2min na 1ª vez)"
  (cd "$HOST_REMOTION" && npm i --no-fund --no-audit) || fail "npm i falhou"
else
  ok "node_modules já existem em $HOST_REMOTION"
fi

# 3. Venv Python
echo "==> 3/6 Python venv"
if [ ! -d "$VENV" ]; then
  inst "criando venv em $VENV"
  python3 -m venv "$VENV"
fi
inst "instalando Pillow/numpy/scipy (idempotente)"
"$VENV/bin/pip" install --quiet --upgrade pip
"$VENV/bin/pip" install --quiet Pillow numpy scipy
ok "venv pronto"

# 4. Sync plugin → host
echo "==> 4/6 Sync componentes/assets"
bash "$PLUGIN_DIR/scripts/sync-components.sh"

# 5. Settings hook auto-start
echo "==> 5/6 Hook auto-start em .claude/settings.json LOCAL"
mkdir -p "$PROJECT_ROOT/.claude"
HOOK_CMD='bash .claude/plugins/marketing-doma/scripts/start-remotion.sh &'

if [ ! -f "$SETTINGS" ]; then
  inst "criando .claude/settings.json"
  cat > "$SETTINGS" <<EOF
{
  "hooks": {
    "SessionStart": [
      {
        "type": "command",
        "command": "$HOOK_CMD"
      }
    ]
  }
}
EOF
else
  # Já existe — mostrar e pedir merge manual (não sobrescrever)
  if grep -q "marketing-doma/scripts/start-remotion.sh" "$SETTINGS"; then
    ok "hook já configurado em $SETTINGS"
  else
    cat <<EOF
  [AVISO] $SETTINGS já existe. Adicione manualmente o hook:
  {
    "hooks": {
      "SessionStart": [
        {"type": "command", "command": "$HOOK_CMD"}
      ]
    }
  }
EOF
  fi
fi

# 6. Smoke test
echo "==> 6/6 Smoke test"
SMOKE_ID="padrao-frase-pilulas"
if (cd "$HOST_REMOTION" && ./render-still.sh "$SMOKE_ID" 2>&1 | tail -1) | grep -q "✓"; then
  ok "smoke test passou ($SMOKE_ID renderizado)"
else
  echo "  [WARN] smoke test não passou — verificar se há ID '$SMOKE_ID' no Root.tsx."
fi

cat <<EOF

🎉 Setup completo!

✅ Node + Python OK
✅ Remotion instalado
✅ venv Python pronto (Pillow + numpy + scipy)
✅ Componentes + assets sincronizados (plugin → host)
✅ Hook auto-start configurado
✅ Smoke test

Próximo: /marketing-doma  (cria post novo guiado)
EOF
