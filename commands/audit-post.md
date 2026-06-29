---
name: audit-post
description: "Compara render vs modelo via compare.py (SSIM + % pixels + MAE). Requer install-advanced."
---

# `/marketing-doma:audit-post <id> <modelo>` OU `--csv <arquivo>`

**EXECUTAR DIRETO.** Precisa `marketing-doma install-advanced` (venv Python).

Par único:
```bash
PY=$(node .claude/plugins/marketing-doma/scripts/lib/venv-paths.mjs "$(pwd)" python)
"$PY" .claude/skills/layout-mapper/scripts/compare.py \
  --modelo "<modelo>" --render "$(pwd)/remotion-doma/out/<id>.png"
```

Batch:
```bash
bash .claude/plugins/marketing-doma/scripts/compare-all.sh <arquivo.csv>
```
