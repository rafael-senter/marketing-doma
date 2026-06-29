#!/usr/bin/env bash
# install-advanced.sh — delega pro setup Node (Windows Scripts/ + Unix bin/).
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec node "$DIR/lib/install-advanced.mjs" "$@"
