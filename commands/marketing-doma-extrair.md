---
name: marketing-doma-extrair
description: "Guia interativo de extração de assets do manual PDF da Doma."
---

# `/marketing-doma:marketing-doma-extrair`

**Fluxo direto, mínimo de leitura.**

1. Listar páginas: `ls ~/.claude/skills/marketing-doma/../../doma-brand/manual/paginas/ 2>/dev/null` (se host configurado).
2. Perguntar qual página + região (coords px ou descrição visual).
3. Rodar: `bash ~/.claude/skills/marketing-doma/scripts/extract-from-pdf.sh --pdf <p> --page N [--crop X,Y,W,H] --name <slug> --destino <pasta>`
4. Adicionar entry em `scripts/build-catalog.py` (perguntar metadata).
5. Rodar `python ~/.claude/skills/marketing-doma/scripts/build-catalog.py` + sync.
