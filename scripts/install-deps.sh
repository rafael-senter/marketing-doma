#!/usr/bin/env bash
# install-deps.sh — delega pro setup Node (sem Python no fluxo padrão).
# Advanced: bash install-deps.sh --advanced  OU  marketing-doma install-advanced
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ARGS=()
for a in "$@"; do ARGS+=("$a"); done
exec node "$DIR/lib/install-deps.mjs" "${ARGS[@]}"
