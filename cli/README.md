# marketing-doma-cli

CLI **local do projeto** — instalar com `npm install marketing-doma-cli` (sem `-g`).

## Fluxo equipe

```bash
mkdir marketing-doma && cd marketing-doma
npm init -y
npm install marketing-doma-cli
npm run doma:install
```

## O que `doma:install` faz

1. Baixa tarball GitHub → `.claude/skills/marketing-doma/` (sem git clone)
2. Cria `remotion-doma/` + npm i
3. Configura `.claude/` + `.cursor/`

Tudo **só nesta pasta**.

## Scripts npm (gerados no `package.json` do projeto)

| Script | Comando |
|---|---|
| `doma:install` | `marketing-doma install` |
| `doma:update` | `marketing-doma update` |
| `doma:status` | `marketing-doma status` |
| `doma:setup` | re-sync Remotion + IDE |
| `doma:export` | tarball pro dev |

## Publicar no npm (dev)

```bash
bash scripts/publish-cli.sh
```

Equipe atualiza CLI local:

```bash
npm install marketing-doma-cli@latest
npm run doma:update
```

## Licença

MIT.
