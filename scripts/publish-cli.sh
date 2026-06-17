#!/usr/bin/env bash
# publish-cli.sh — publica o CLI no npm.
#
# Quando rodar: só quando o CLI (cli/bin/marketing-doma.js, cli/package.json)
# mudar. NÃO precisa rodar a cada release do plugin — o CLI puxa o plugin
# via git, então atualização do plugin é só `git push` na raiz.
#
# Pré-req: logado no npm (npm login). Conta com permissão pro pacote
# `marketing-doma-cli` (ou trocar nome em cli/package.json).
#
# Uso:
#   bash scripts/publish-cli.sh              # publica versão atual
#   bash scripts/publish-cli.sh patch        # bump patch + publica
#   bash scripts/publish-cli.sh minor        # bump minor + publica
#   bash scripts/publish-cli.sh --dry-run    # simula (npm publish --dry-run)

set -euo pipefail

PLUGIN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CLI_DIR="$PLUGIN_DIR/cli"

cd "$CLI_DIR"

# Bump opcional
case "${1:-}" in
  patch|minor|major)
    echo "==> npm version $1"
    npm version "$1" --no-git-tag-version
    ;;
  --dry-run)
    echo "==> npm publish --dry-run --access public"
    npm publish --dry-run --access public
    exit 0
    ;;
esac

# Logado?
if ! npm whoami >/dev/null 2>&1; then
  echo "✗ Não logado no npm. Rode: npm login"
  exit 1
fi

# Smoke test antes
echo "==> Smoke test CLI"
node bin/marketing-doma.js version
node bin/marketing-doma.js help >/dev/null

# Publica — npm registry exige 2FA pra publicar. Aceita OTP via env ou flag.
OTP="${NPM_OTP:-${2:-}}"
if [ -z "$OTP" ]; then
  echo ""
  echo "==> npm exige 2FA. Abra app autenticador (Google Authenticator/Authy/etc) e digite OTP:"
  read -r -p "OTP (6 dígitos): " OTP
fi

if [ -z "$OTP" ]; then
  echo "✗ OTP vazio. Abortando."
  exit 1
fi

echo "==> npm publish --access public --otp=******"
npm publish --access public --otp="$OTP"

V=$(node -p "require('./package.json').version")
echo ""
echo "🎉 marketing-doma-cli@$V publicado!"
echo ""
echo "Usuários instalam com:"
echo "  npm install -g marketing-doma-cli"
echo "  marketing-doma install"
