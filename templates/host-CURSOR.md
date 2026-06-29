# CURSOR.md — projeto Marketing Doma

> Gerado pelo setup marketing-doma. Edite à vontade.

## IDE

Este projeto funciona em **Cursor** e **Claude Code** com a mesma pasta `.claude/plugins/marketing-doma/`.

| Ferramenta | Config local |
|---|---|
| **Claude Code** | `.claude/settings.json` → `enabledPlugins` + hooks |
| **Cursor** | `.cursor/hooks.json` + `.cursor/rules/marketing-doma.mdc` |

Nada instala em `~/.claude/` ou `~/.cursor/` global — só neste projeto.

## Setup (1× por pasta)

```bash
npm init -y
npm install marketing-doma-cli
npm run doma:install
```

Plugin baixa **direto** em `.claude/plugins/marketing-doma/` — sem clone/symlink global.

Reparo: `npm run doma:setup`

## Criar post

No chat: *"cria um carrossel Doma sobre X"* — agente segue `.cursor/rules/marketing-doma.mdc`.

Claude Code: `/marketing-doma`

## Estrutura

```
.
├── .claude/plugins/marketing-doma/   ← plugin
├── .claude/settings.json             ← Claude
├── .cursor/hooks.json                ← Cursor hooks
├── .cursor/rules/                    ← Cursor rules
├── CURSOR.md                         ← este arquivo
├── CLAUDE.md                         ← mapa Claude Code
└── remotion-doma/out/                ← PNGs renderizados
```

## Windows

- Node.js LTS + Cursor ou VS Code + extensão Claude.
- Comandos via **PowerShell** na raiz do projeto.
- `marketing-doma install` antes do setup se plugin ainda não existir.

## Atualizar plugin

```bash
marketing-doma update
node .claude/plugins/marketing-doma/scripts/lib/sync-components.mjs
```

## Docs completas

- Plugin: `.claude/plugins/marketing-doma/INSTALL.md`
- Marca: `.claude/plugins/marketing-doma/CLAUDE.md`
