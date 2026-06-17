---
name: audit-post
description: "Compara render vs modelo via compare.py (SSIM + % pixels + MAE)."
---

# `/marketing-doma:audit-post <id> <modelo>` OU `--csv <arquivo>`

**EXECUTAR DIRETO.**

Par único:
```bash
$(pwd)/.venv-instagram/bin/python ~/.claude/skills/layout-mapper/scripts/compare.py \
  --modelo "<modelo>" --render "$(pwd)/remotion-doma/out/<id>.png"
```

Batch:
```bash
bash ~/.claude/plugins/marketing-doma/scripts/compare-all.sh <arquivo.csv>
```
