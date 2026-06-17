#!/usr/bin/env bash
# smoke-e2e.sh — teste fim-a-fim em diretório limpo (/tmp).
# Simula: usuário novo → clone fresh → setup → criar post → render (mock) → audit.
#
# NÃO altera projeto host real. Tudo isolado em /tmp/marketing-doma-smoke-<ts>/.

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
TS=$(date +%s)
TMP="/tmp/marketing-doma-smoke-$TS"

cleanup() {
  echo ""
  echo "==> Cleanup $TMP"
  rm -rf "$TMP"
}
trap cleanup EXIT

mkdir -p "$TMP"
cd "$TMP"

PASS=0; FAIL=0
ok() { echo "  [OK]   $*"; PASS=$((PASS+1)); }
fail() { echo "  [FAIL] $*"; FAIL=$((FAIL+1)); }

echo "════════════════════════════════════════════════════"
echo "  SMOKE E2E — pasta limpa $TMP"
echo "════════════════════════════════════════════════════"
echo ""

# 1. Simular projeto host
echo "==> 1. Estrutura host fake"
mkdir -p projeto/.claude/plugins projeto/doma-brand
cd projeto

# 2. "Clone" do plugin (copia local)
echo "==> 2. Copiar plugin pra .claude/plugins/"
cp -r "$PLUGIN_DIR" .claude/plugins/marketing-doma
[ -f .claude/plugins/marketing-doma/plugin.json ] && ok "plugin copiado" || fail "copia falhou"

# 3. validate.sh do plugin
echo "==> 3. validate.sh"
if bash .claude/plugins/marketing-doma/scripts/validate.sh >/dev/null 2>&1; then
  ok "validate OK"
else
  fail "validate falhou"
fi

# 4. lint-voz.sh
echo "==> 4. lint-voz.sh"
if bash .claude/plugins/marketing-doma/scripts/lint-voz.sh >/dev/null 2>&1; then
  ok "lint-voz OK"
else
  fail "lint-voz falhou"
fi

# 5. new-post.sh scaffold
echo "==> 5. new-post.sh dicas-carrossel"
if bash .claude/plugins/marketing-doma/scripts/new-post.sh dicas-carrossel smoke-e2e-test >/dev/null 2>&1; then
  PLAN=".claude/plugins/marketing-doma/templates/planos/POST-smoke-e2e-test-plano.md"
  SNIP="/tmp/smoke-e2e-test-still-snippet.tsx"
  [ -f "$PLAN" ] && ok "plano gerado" || fail "plano não gerado"
  [ -f "$SNIP" ] && ok "snippet gerado" || fail "snippet não gerado"
  rm -f "$SNIP"
else
  fail "new-post.sh falhou"
fi

# 6. Smoke: componentes existem em templates/components/
echo "==> 6. Componentes templates/components/"
for c in dicas/Dicas.tsx spin/Spin.tsx frase-em-pilulas/FrasePilulas.tsx; do
  if [ -f ".claude/plugins/marketing-doma/templates/components/$c" ]; then
    ok "$c"
  else
    fail "$c FALTA"
  fi
done

# 7. Assets oficiais
echo "==> 7. Assets oficiais"
for a in oficial/logotipo-principal-branco.png oficial/selo-grafite.png icones; do
  if [ -e ".claude/plugins/marketing-doma/assets/$a" ]; then
    ok "$a"
  else
    fail "$a FALTA"
  fi
done

# 8. Knowledge-base
echo "==> 8. Knowledge-base"
for k in identidade/voz-sigadoma.md padroes/RULES-recriacao.md padroes/INDICE.md assets-index/cores.md; do
  if [ -f ".claude/plugins/marketing-doma/knowledge-base/$k" ]; then
    ok "$k"
  else
    fail "$k FALTA"
  fi
done

# 9. Sub-skills 15 categorias
echo "==> 9. 15 sub-skills"
COUNT=$(find .claude/plugins/marketing-doma/skills/marketing-doma/subskills -maxdepth 2 -name 'SKILL.md' 2>/dev/null | wc -l)
[ $COUNT -eq 15 ] && ok "15 sub-skills" || fail "esperado 15, achou $COUNT"

# 10. Manifest plugin.json válido JSON
echo "==> 10. plugin.json válido"
if python3 -c "import json; json.load(open('.claude/plugins/marketing-doma/plugin.json'))" 2>/dev/null; then
  ok "JSON válido"
else
  fail "JSON inválido"
fi

echo ""
echo "════════════════════════════════════════════════════"
echo "  RESULTADO: $PASS PASS · $FAIL FAIL"
echo "════════════════════════════════════════════════════"

[ $FAIL -eq 0 ] && exit 0 || exit 1
