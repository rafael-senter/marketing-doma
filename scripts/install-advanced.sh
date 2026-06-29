#!/usr/bin/env bash
# install-advanced.sh — Python venv p/ layout-mapper, audit, wizard cliente.
# NÃO roda no setup padrão. Só: marketing-doma install-advanced ou install-deps.mjs --advanced

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
source "$SCRIPT_DIR/_detect-project.sh"
detect_project_root "$@" || exit 1
VENV="$PROJECT_ROOT/.venv-instagram"

inst() { echo "  [INSTALL] $*"; }
ok() { echo "  [OK]   $*"; }
fail() { echo "  [FAIL] $*"; exit 1; }

PYTHON_CMD=""
for cand in python3 python py; do
  if command -v "$cand" >/dev/null 2>&1; then
    case "$(command -v "$cand")" in
      *[Ww]indows[Aa]pps*|*[Mm]icrosoft*[Ww]indows[Aa]pps*) continue ;;
    esac
    if "$cand" --version >/dev/null 2>&1; then PYTHON_CMD="$cand"; break; fi
  fi
done
[ -z "$PYTHON_CMD" ] && fail "Python 3.10+ real não encontrado. Windows: desative alias Microsoft Store e instale Python.Python.3.11 via winget."

echo "==> Advanced: venv Python em $VENV"
if [ ! -d "$VENV" ]; then
  inst "criando venv"
  "$PYTHON_CMD" -m venv "$VENV"
fi

if [ -f "$VENV/Scripts/pip.exe" ]; then PIP="$VENV/Scripts/pip.exe"
elif [ -f "$VENV/bin/pip" ]; then PIP="$VENV/bin/pip"
else fail "pip não encontrado no venv"; fi

"$PIP" install --quiet --upgrade pip
"$PIP" install --quiet Pillow numpy scipy scikit-image

# layout-mapper deps extras (se skill existir no host)
LM_REQ="$PROJECT_ROOT/.claude/skills/layout-mapper/requirements.txt"
if [ ! -f "$LM_REQ" ]; then
  LM_REQ="$HOME/.claude/skills/layout-mapper/requirements.txt"
fi
if [ -f "$LM_REQ" ]; then
  inst "layout-mapper requirements"
  "$PIP" install --quiet -r "$LM_REQ"
fi

ok "venv advanced pronto ($("$PYTHON_CMD" --version 2>&1))"
echo ""
echo "✅ Advanced OK — audit (/audit-post), layout-mapper, wizard-cliente disponíveis"
echo "   Python: $VENV/bin/python (Linux/Mac) ou $VENV/Scripts/python.exe (Windows)"
