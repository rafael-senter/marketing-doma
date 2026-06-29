# marketing-doma-cli

CLI do plugin — **100% Node no fluxo marketing**.

## Requisitos manuais

- Node.js ≥ 18 LTS
- Conta Anthropic + VS Code/Cursor (+ extensão Claude Code se usar VS Code)
- `npm install -g marketing-doma-cli`

**Não precisa:** git · bash · Python (fluxo padrão)

## Comandos

| Comando | O que faz |
|---|---|
| `marketing-doma install` | Download + Remotion + sync + Claude/Cursor config |
| `marketing-doma update` | Atualiza plugin (preserva live-rules/planos) + re-sync |
| `marketing-doma install-advanced` | Python venv — audit, layout-mapper (opcional) |
| `marketing-doma status` | Versões + saúde |
| `marketing-doma export` | Tarball pro dev |
| `marketing-doma cleanup-legacy` | Remove instalação antiga `~/.local/share/` |

## Fluxo marketing

```bash
cd minha-pasta
marketing-doma install
claude → /marketing-doma          # criar peça
```

Cursor: mesma pasta → *"cria post Doma"* ou ler `CURSOR.md`.

Reparar setup: `/marketing-doma-setup` (idempotente).

## Fluxo dev (audit/recreate)

```bash
marketing-doma install-advanced
```

## Licença

MIT.
