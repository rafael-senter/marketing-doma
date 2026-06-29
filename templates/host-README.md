# Projeto Marketing Doma

Posts/carrosséis no Remotion — design system Doma.

**Tudo local neste projeto** — plugin em `.claude/plugins/marketing-doma/`.

## Setup

```bash
marketing-doma install
```

## Criar post

```
/marketing-doma
```

Cursor: *"cria post Doma"*

## Estrutura

```
.
├── .claude/
│   ├── plugins/marketing-doma/
│   └── settings.json
├── .cursor/hooks.json
├── remotion-doma/out/<id>.png
└── CLAUDE.md
```

## Atualizar plugin

```bash
marketing-doma update
```

## Studio Remotion

Hook em `.claude/settings.json` e `.cursor/hooks.json` sobe :3010 ao abrir sessão.

Manual:
```bash
cd remotion-doma && npx remotion studio --port 3010
```

## Advanced (opcional)

Audit/recreate/wizard → `marketing-doma install-advanced`
