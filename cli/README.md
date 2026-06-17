# marketing-doma-cli

CLI Node.js wrapper do plugin Claude Code [`marketing-doma`](https://github.com/rafael-senter/marketing-doma).

Pacote npm pequeno (~5 KB). Faz `git clone` + `git pull` do plugin real. Plugin continua versionado no GitHub.

## Instalar (uma vez só)

```bash
npm install -g marketing-doma-cli
```

Ou via `npx` sem instalar global:

```bash
npx marketing-doma-cli install
```

## Comandos

| Comando | O que faz |
|---|---|
| `marketing-doma install` | Clona o plugin do GitHub em `~/.local/share/marketing-doma` + roda `install.sh` (registra no Claude Code global). |
| `marketing-doma update` | `git pull` no plugin clonado + re-roda `install.sh` (idempotente). |
| `marketing-doma status` | Mostra versão do CLI, versão do plugin local, última versão no GitHub. |
| `marketing-doma uninstall` | Remove plugin + symlinks. CLI continua. |
| `marketing-doma version` | Versão do CLI + plugin. |
| `marketing-doma help` | Ajuda. |

## Fluxo típico (usuário leigo)

```bash
# 1× só:
npm install -g marketing-doma-cli
marketing-doma install

# Sempre que tiver versão nova:
marketing-doma update
```

Depois, dentro de qualquer pasta:

```bash
claude
# no Claude Code:
/marketing-doma:marketing-doma-setup    # 1ª vez no projeto
/marketing-doma                         # criar peça
```

## Como atualizações funcionam

- **CLI**: só muda se o fluxo de install mudar. Atualiza com `npm install -g marketing-doma-cli@latest`.
- **Plugin** (regras, templates, fichas, componentes): atualiza com `marketing-doma update`. Plugin vive no GitHub — `git push` lá no GitHub → próximo `update` puxa.

Resultado: equipe roda 1 comando (`marketing-doma update`) pra ter última versão.

## Requisitos

- Node.js ≥ 18
- git
- bash
- Claude Code instalado (CLI `claude`)

## Repo do plugin

https://github.com/rafael-senter/marketing-doma

## Licença

MIT.
