#!/usr/bin/env bash
# start-remotion.sh
# Hook auto-start do studio Remotion. Idempotente: só sobe se não houver studio
# rodando na porta 3010. Output → /tmp/remotion.log (não polui sessão Claude).

set -euo pipefail

# Detectar raiz do projeto (CWD-aware, suporta plugin global via symlink)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
source "$SCRIPT_DIR/_detect-project.sh"
detect_project_root "$@" 2>/dev/null || exit 0  # exit silencioso (hook auto-start)
REMOTION_DIR="$HOST_REMOTION"
PORT=3010

# Não fazer nada se remotion-doma não existe (setup ainda não rodou)
if [ ! -d "$REMOTION_DIR" ]; then
  exit 0
fi

# Não fazer nada se já tem studio na porta
if (echo >/dev/tcp/127.0.0.1/$PORT) 2>/dev/null; then
  exit 0
fi

# Subir studio em background, output → /tmp
cd "$REMOTION_DIR"
nohup npx remotion studio --no-open --port $PORT > /tmp/remotion-marketing-doma.log 2>&1 &
disown || true

exit 0
