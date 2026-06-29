---
name: marketing-doma-setup
description: "Reparar/re-sync — Remotion + IDE hooks. Idempotente (install já faz isso)."
---

# `/marketing-doma-setup`

**Reparo ou re-sync.** O `marketing-doma install` já roda este setup. Use só se algo falhou ou após mudança manual.

**EXECUTAR DIRETO:**

```bash
node .claude/plugins/marketing-doma/scripts/lib/install-deps.mjs
```

Se plugin não existir → avisar: `marketing-doma install` primeiro.

Output (~2 min na 1ª vez):
- `==> 1/5 Node.js`
- `==> 2/5 Remotion`
- `==> 3/5 Sync`
- `==> 4/5 IDE config (Claude + Cursor)`
- `==> 5/5 Python SKIP`
- `🎉 Setup completo`

**Python (opcional):**
```bash
marketing-doma install-advanced
```

Se OK → "✅ pronto, rode `/marketing-doma`"

## Anti-padrões

- ❌ Rodar manualmente se `marketing-doma install` ainda não foi feito
- ❌ Instalar Python pro fluxo padrão
- ❌ Ler scripts antes de executar
