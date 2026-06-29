#!/usr/bin/env bash
# marketing-doma :: install.sh (raiz)
#
# Roteador:
#   Plugin em <projeto>/.claude/plugins/marketing-doma → install-project.sh (padrão)
#   Plugin em outro lugar (dev) → install-globally.sh (legacy)

set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -n "${MARKETING_DOMA_PROJECT:-}" ] || [[ "$DIR" == *"/.claude/plugins/marketing-doma" ]]; then
  exec bash "$DIR/scripts/install-project.sh" "$@"
fi

exec bash "$DIR/scripts/install-globally.sh" "$@"
