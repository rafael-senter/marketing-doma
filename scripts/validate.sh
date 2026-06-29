#!/usr/bin/env bash
# validate.sh — rodando os 5 checks E2E do plugin marketing-doma.
# Sai com 0 se tudo OK, 1 se algum check falhar.
#
# Checks:
#   1. plugin.json declarações batem com arquivos físicos.
#   2. Bash syntax de todos os scripts/*.sh.
#   3. Refs externas ao host (render-still.sh, Root.tsx, etc.) existem.
#   4. Refs internas nos .md (path-like) existem.
#   5. Smoke test new-post.sh (sem efeito persistente).

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_ROOT="$(cd "$PLUGIN_DIR/../../.." && pwd)"

cd "$PLUGIN_DIR"

FAIL=0
ok()   { echo "  [OK]   $*"; }
fail() { echo "  [FAIL] $*"; FAIL=1; }
warn() { echo "  [WARN] $*"; }

# 1. plugin.json declarações
echo "==> 1/5 plugin.json declarações"
MISSING=$(python3 - <<'PY'
import json, os
with open('plugin.json') as f: m=json.load(f)
miss=[]
for s in m.get('skills', []):
    if not os.path.exists(f"{s}/SKILL.md"): miss.append(f"skill: {s}/SKILL.md")
for c in m.get('commands', []):
    if not os.path.exists(c): miss.append(f"command: {c}")
for a in m.get('agents', []):
    if not os.path.exists(a): miss.append(f"agent: {a}")
for k,v in m.get('scripts', {}).items():
    if not os.path.exists(v): miss.append(f"script[{k}]: {v}")
for sub in m.get('embedded_subskills', []):
    if not os.path.exists(f"{sub}/SKILL.md"): miss.append(f"subskill: {sub}/SKILL.md")
print('\n'.join(miss) if miss else 'OK')
PY
)
if [ "$MISSING" = "OK" ]; then ok "todas declarações batem"; else fail "$MISSING"; fi

# 2. Bash syntax
echo "==> 2/5 Bash syntax"
for s in scripts/*.sh; do
  if bash -n "$s" 2>/dev/null; then ok "$s"; else fail "$s"; fi
done

# 3. Refs ao host
echo "==> 3/5 Refs externas ao host"
HOST_REFS=(
  "$PROJECT_ROOT/remotion-doma/render-still.sh"
  "$PROJECT_ROOT/remotion-doma/src/Root.tsx"
  "$PROJECT_ROOT/remotion-doma/public/oficial/logotipo-principal-branco.png"
  "$PROJECT_ROOT/.venv-instagram/bin/python"
  "$PROJECT_ROOT/.claude/skills/layout-mapper/scripts/compare.py"
)
for ref in "${HOST_REFS[@]}"; do
  if [ -e "$ref" ]; then ok "$(basename $ref)"; else warn "host falta: $ref"; fi
done

# 4. Refs internas .md
echo "==> 4/5 Refs internas .md"
BROKEN=$(python3 - <<'PY'
import os, re, glob
md_files = glob.glob('**/*.md', recursive=True)
broken = []
for md in md_files:
    with open(md) as f: text = f.read()
    for m in re.finditer(r'`([^`\n]+\.(?:md|tsx|ts|sh|json|tpl\.md|tpl\.tsx))`', text):
        p = m.group(1).strip()
        # ignorar wildcards, placeholders, refs ao host, /tmp, comandos bash
        skip_substrings = ['{{','<','*','{','remotion-doma/','doma-brand/','.venv-instagram/','/tmp/','/.claude/skills/','.claude/settings.json',
                           '.cursor/hooks.json','.cursor/rules/','.claude/plugins/marketing-doma/',
                           'v1/','v1.tsx','manual/','mapaBrasil.ts','RootV1','POST-template-']
        if any(x in p for x in skip_substrings): continue
        # comando bash (`bash script.sh`, `npm i`, etc) — não é path
        if p.startswith('bash ') or p.startswith('npm ') or p.startswith('npx '): continue
        if p.startswith('http'): continue
        if p.startswith('~/') or p.startswith('/home/'): continue  # absolute paths fora do plugin
        if p.startswith('.git/') or p.startswith('.git-hooks/'): continue
        # placeholders MAIÚSCULOS tipo X/Y/N
        if re.match(r'^[A-Z]\.', p) or re.match(r'^<', p): continue
        src_dir = os.path.dirname(md)
        if p.startswith('../') or p.startswith('./'):
            cand = os.path.normpath(os.path.join(src_dir, p))
        elif '/' in p:
            cand = p if os.path.exists(p) else os.path.normpath(os.path.join(src_dir, p))
        else:
            continue
        if not os.path.exists(cand):
            # tentar oficial/ como ref do host (staticFile do Remotion)
            if 'oficial/' in p or 'icones/' in p or 'fontes/' in p: continue
            broken.append(f"{md}: '{p}' -> {cand}")
print('\n'.join(broken) if broken else 'OK')
PY
)
if [ "$BROKEN" = "OK" ]; then ok "todas refs OK"; else echo "$BROKEN" | head -15 | sed 's/^/  [BROKEN] /'; FAIL=1; fi

# 5. Smoke test new-post.sh
echo "==> 5/5 Smoke test new-post.sh"
TMP_PLAN="$PLUGIN_DIR/templates/planos/POST-validate-smoke-plano.md"
TMP_SNIP="/tmp/validate-smoke-still-snippet.tsx"
if bash "$PLUGIN_DIR/scripts/new-post.sh" dicas-carrossel validate-smoke >/dev/null 2>&1 && [ -f "$TMP_PLAN" ] && [ -f "$TMP_SNIP" ]; then
  ok "new-post.sh gera plano + snippet"
  rm -f "$TMP_PLAN" "$TMP_SNIP"
else
  fail "new-post.sh falhou"
fi

echo ""
if [ $FAIL -eq 0 ]; then
  echo "🎉 Plugin VALIDADO — todos os checks OK"
  exit 0
else
  echo "❌ Plugin com falhas — corrigir antes de commitar"
  exit 1
fi
