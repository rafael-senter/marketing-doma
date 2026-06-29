---
name: marketing-doma-setup
description: "Reparar/re-sync — Remotion + IDE hooks. Idempotente (install já faz isso)."
---

# `/marketing-doma-setup`

**Reparo ou re-sync.** O `marketing-doma install` já roda este setup. Use só se algo falhou ou após mudança manual.

**EXECUTAR DIRETO:**

```bash
node .claude/skills/marketing-doma/scripts/lib/install-deps.mjs
```

Se plugin não existir → avisar: `marketing-doma install` primeiro.

Output (~2 min na 1ª vez):
- ==> 0/6 package.json
- ==> 1/6 Node.js
- ==> 2/6 Claude Code CLI (auto por OS)
- ==> 3/6 Remotion
- ==> 4/6 Sync
- ==> 5/6 IDE config
- ==> 6/6 Python SKIP
- 🎉 Setup completo

**Python (opcional):**
```bash
marketing-doma install-advanced
```

Se OK → "✅ pronto, rode `/marketing-doma`"

## Anti-padrões

- ❌ Rodar manualmente se `marketing-doma install` ainda não foi feito
- ❌ Instalar Python pro fluxo padrão
- ❌ Ler scripts antes de executar
