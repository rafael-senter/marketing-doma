# marketing-doma

Plugin do Marketing da Doma para [Claude Code](https://claude.com/claude-code) e **Cursor** — geração de posts, carrosséis e stories no Remotion seguindo o **design system real** da marca, **voz institucional @sigadoma** e **regras de marca** rigorosas (logo DOMa, watermark tom-sobre-tom medida, paleta amber, TT Lakes).

## O que esse plugin faz

- **Skill master `/marketing-doma`** — fluxo guiado passo-a-passo: leigo escolhe tipo de post, dá conteúdo (ou pede brainstorm), o plugin monta o plano medido, renderiza, audita vs modelo, e ajuda a publicar.
- **14 sub-skills** — uma por tipo de post (Dicas, SPIN, Doma Motiva, Inimigo em Comum, Funções do Sistema, Carrossel de Clientes, etc.) + brand-rules + protocolo de post novo.
- **4 agentes especialistas** — ghostwriter (voz Doma), validador de marca, editor de conteúdo, render orchestrator.
- **Templates Remotion validados** — componentes `.tsx` prontos, copiados dos validados em produção.
- **Auto-melhoria** — toda regra/padrão novo descoberto em runtime vira arquivo em `knowledge-base/live-rules/`.
- **Setup automático** — `npm run doma:install` baixa o plugin, cria Remotion, sync de componentes, configura Claude Code + Cursor e hook do studio :3010.

## Pré-requisitos obrigatórios (instalar ANTES)

| Item | Como obter | Verificar |
|---|---|---|
| **Node.js LTS (≥18)** | https://nodejs.org | `node --version` |
| **Conta Anthropic** | Pro/Max/Team/Enterprise — https://claude.com/code | — |
| **Claude Code CLI** | Instalado automaticamente pelo `doma:install` (ou extensão VS Code) | `claude --version` |

> Node.js é o **único** pré-requisito que você precisa instalar manualmente. O resto o `doma:install` resolve.

## Instalação (100% local — só na pasta do projeto)

Sem `npm -g`, sem clone global, sem symlinks em `~/.claude/`. ✅ Caminhos com espaços e acentuação são suportados.

### 1× por pasta

```bash
mkdir marketing-doma && cd marketing-doma
npm init -y                             # cria package.json
npm install marketing-doma-cli          # local — NÃO usar -g
npm run doma:install                    # plugin + Remotion + IDE
```

> **⚠️ Nome inválido no `npm init -y`?** Se o nome da sua pasta tiver acentos ou espaços, o `npm init -y` falha. Solução: rode `npm init -y` em outra pasta ou crie o `package.json` manualmente com um nome simples (ex.: `"name": "marketing-doma-projeto"`). O plugin sanitiza nomes automaticamente no setup.

> **⚠️ Postinstall bloqueado?** Se o npm avisar sobre `allow-scripts`, adicione `"allowScripts": true` no `package.json` antes de instalar. O script `postinstall` só adiciona os comandos `doma:*` — pode revisar em `node_modules/marketing-doma-cli/postinstall.js`.

`doma:install` extrai tarball GitHub **direto** em `.claude/plugins/marketing-doma/` — sem `git clone`, sem GitHub CLI (HTTP puro).

### O comando NÃO é global

Use sempre via npm scripts (ou `npx`):

| ✅ Funciona | ❌ Não funciona |
|---|---|
| `npm run doma:install` | `marketing-doma install` (sem `-g`) |
| `npx marketing-doma install` | — |

### Dia a dia

| IDE | Como usar |
|---|---|
| **Claude Code** | `claude` → `/marketing-doma` |
| **Cursor** | *"cria post Doma"* · `CURSOR.md` |

```bash
npm run doma:update    # versão nova
npm run doma:status    # conferir
npm run doma:export    # enviar melhorias pro dev
```

Guia: **[INSTALL.md](INSTALL.md)**

**Repo:** https://github.com/rafael-senter/marketing-doma *(privado até liberação para a equipe)*

**Windows:** PowerShell ou CMD — só Node.js. Não precisa de admin nem Developer Mode (instalação copia arquivos, sem symlinks).

### Reparar setup

Se Remotion ou hooks falharem:

```
/marketing-doma-setup
```

Idempotente — re-roda o mesmo setup do `install`.

### Advanced (opcional)

Audit/recreate/wizard cliente (Python + layout-mapper):

```bash
npx marketing-doma install-advanced
```

## Como usar `marketing-doma export`

Melhorias do cliente (live-rules, planos, edits, assets) ficam só na máquina dele. Export pro dev:

```bash
cd ~/Desktop/minha-pasta-do-projeto
npm run doma:export
```

Gera `marketing-doma-export-YYYY-MM-DD.tar.gz` na pasta atual.

### No dev

```bash
cd /caminho/do/plugin/.claude/plugins/marketing-doma
tar -xzf ~/Downloads/marketing-doma-export-XXX.tar.gz
git status
# revisar + integrar + commit + git push origin main vX.Y.Z
```

Cliente roda `npm run doma:update`.

## Pré-requisitos

| Item | Quem instala |
|---|---|
| Node.js ≥ 18 | **Manual** (único obrigatório) |
| Conta Anthropic (Pro/Max/Team) | **Manual** |
| `npm install marketing-doma-cli` | **Local na pasta** (sem `-g`) |
| Claude Code CLI | `npm run doma:install` (automático) |
| Plugin + Remotion + IDE | `npm run doma:install` |
| Python (audit/recreate) | `npx marketing-doma install-advanced` (opcional) |

**Sistema:** Linux / macOS / Windows. **Disco por projeto:** ~800 MB.

```bash
npm run doma:status
```

## Comandos disponíveis

| Comando | Função |
|---|---|
| `/marketing-doma` | Fluxo guiado — escolher tipo, conteúdo, renderizar |
| `/marketing-doma-setup` | Reparar/re-sync Remotion + hooks (opcional) |
| `/new-post` | Atalho: criar post novo |
| `/new-carrossel` | Atalho: criar carrossel novo |
| `/brainstorm` | Pauta + 3 ângulos na voz Doma |
| `/render` | Renderizar 1 ou N stills |
| `/audit-post` | Comparar render vs modelo |
| `/publish-checklist` | Check-list final pré-publicar |

## Claude Code + Cursor (mesma pasta)

```
minha-pasta/
├── .claude/plugins/marketing-doma/
├── .claude/settings.json          ← enabledPlugins + hook SessionStart
├── .cursor/hooks.json             ← hook sessionStart
├── .cursor/rules/marketing-doma.mdc
├── CURSOR.md
└── remotion-doma/
```

Hook Remotion (studio :3010) nos dois IDEs — mesmo comando Node, cross-platform.

**Cursor:** Settings → Features → **Third-party skills** ON.

**Nada global** em `~/.claude/` ou `~/.cursor/`. Tudo fica na pasta do projeto.

## Documentação

- **[INSTALL.md](INSTALL.md)** — instalação passo a passo.
- **[SETUP.md](SETUP.md)** — setup técnico (dev).
- **[CLAUDE.md](CLAUDE.md)** — regras de marca + protocolo + auto-melhoria.
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — diagrama de fluxo.
- **[knowledge-base/](knowledge-base/)** — voz Doma + design system + RULES + fichas + live-rules.
- **[cli/README.md](cli/README.md)** — referência do CLI.

## Para quem é

- **Marketing leigo** → `npm run doma:install` + `/marketing-doma` (ou Cursor chat).
- **Patrick / dev** → mantém sub-skills, regras, templates, releases.

## Para o dev (release)

Duas camadas versionáveis:

| O que mudou | Propagação |
|---|---|
| **Plugin** (`templates/`, `knowledge-base/`, `agents/`, `commands/`, `skills/`, `assets/`, `scripts/`) | bump `plugin.json` + tag `vX.Y.Z` + `git push` → equipe `marketing-doma update` |
| **CLI** (`cli/`) | bump `cli/package.json` + `bash scripts/publish-cli.sh` → equipe `npm i -g marketing-doma-cli@latest` |

```bash
cd .claude/plugins/marketing-doma   # source no projeto dev
sed -i 's/"version": "0.1.X"/"version": "0.1.Y"/g' plugin.json .claude-plugin/plugin.json .claude-plugin/marketplace.json
bash scripts/check-all.sh
git add -A && git commit -m "feat(v0.1.Y): ..." && git tag v0.1.Y && git push origin main v0.1.Y
```

Detalhes em [cli/README.md](cli/README.md).

## Visão estrutural

```
.claude/plugins/marketing-doma/
├── plugin.json
├── CLAUDE.md
├── cli/                          CLI npm (marketing-doma-cli)
├── commands/                     slash commands
├── agents/
├── skills/marketing-doma/        master + subskills
├── scripts/lib/                  install-deps.mjs, configure-ides.mjs, sync
├── templates/                    components .tsx + cursor rules
├── knowledge-base/
└── assets/
```

## Licença

MIT.
