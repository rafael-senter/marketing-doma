#!/usr/bin/env bash
# marketing-doma :: install.sh (raiz)
#
# Instalação 100% LOCAL na pasta do projeto.
# Plugin sempre em <projeto>/.claude/skills/marketing-doma
# Nada global: sem symlinks em ~/.claude, sem ~/.local/share.

set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

exec bash "$DIR/scripts/install-project.sh" "$@"
