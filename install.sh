#!/usr/bin/env bash
# marketing-doma :: install.sh (raiz)
#
# Wrapper conveniente — chama scripts/install-globally.sh.
# Roda 1× após clonar o plugin em qualquer pasta.
#
# Fluxo típico:
#   git clone git@gitlab.com:valem_grupo/marketing-doma.git ~/qualquer/lugar/marketing-doma
#   cd ~/qualquer/lugar/marketing-doma
#   bash install.sh
#
# Depois (em qualquer pasta de projeto):
#   claude
#   /marketing-doma:marketing-doma-setup    # instala Remotion no CWD
#   /marketing-doma:marketing-doma           # cria posts

set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec bash "$DIR/scripts/install-globally.sh" "$@"
