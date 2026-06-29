# marketing-doma

Plugin do Marketing da Doma para [Claude Code](https://claude.com/claude-code) e **Cursor** — geração de posts, carrosséis e stories no Remotion seguindo o **design system real** da marca, **voz institucional @sigadoma** e **regras de marca** rigorosas (logo DOMa, watermark tom-sobre-tom medida, paleta amber, TT Lakes).

## O que esse plugin faz

- **Skill master `/marketing-doma`** — fluxo guiado passo-a-passo: leigo escolhe tipo de post, dá conteúdo (ou pede brainstorm), o plugin monta o plano medido, renderiza, audita vs modelo, e ajuda a publicar.
- **14 sub-skills** — uma por tipo de post (Dicas, SPIN, Doma Motiva, Inimigo em Comum, Funções do Sistema, Carrossel de Clientes, etc.) + brand-rules + protocolo de post novo.
- **4 agentes especialistas** — ghostwriter (voz Doma), validador de marca, editor de conteúdo, render orchestrator.
- **Templates Remotion validados** — componentes `.tsx` prontos, copiados dos validados em produção.
- **Auto-melhoria** — toda regra/padrão novo descoberto em runtime vira arquivo em `knowledge-base/live-rules/`.
- **Setup automático** — `marketing-doma install` baixa o plugin, cria Remotion, sync de componentes, configura Claude Code + Cursor e hook do studio :3010.

## Instalação

### Manual (1× por computador)

1. **Node.js** LTS — https://nodejs.org
2. **Conta Anthropic** com plano Claude Code ativo (Pro/Max/Team ou API)
3. **VS Code** ou **Cursor** — https://code.visualstudio.com
4. **Extensão Claude Code** no VS Code (Anthropic) — se usar Claude Code
5. Abrir a **pasta de trabalho** (sem espaços no caminho — ex.: `marketing-doma`, não `marketing doma`)
6. Terminal integrado: **`Ctrl + '`**
7. Instalar o CLI:
   ```bash
   npm install -g marketing-doma-cli
   ```

### Automático (1× por pasta de projeto)

```bash
marketing-doma install
```

Faz tudo na pasta atual:

- Download do plugin → `.claude/plugins/marketing-doma/`
- `remotion-doma/` + `npm i` (~2 min na 1ª vez)
- Sync de componentes/assets
- `.claude/settings.json` — `enabledPlugins` + hook Remotion
- `.cursor/hooks.json` + `.cursor/rules/` — Cursor
- `CURSOR.md` · `CLAUDE.md`

**Não precisa:** git · bash · Python (fluxo padrão de marketing)

**Dia a dia:**

| IDE | Como usar |
|---|---|
| **Claude Code** | `claude` → `/marketing-doma` |
| **Cursor** | Chat: *"cria post Doma"* · ler `CURSOR.md` |

```bash
marketing-doma update    # versão nova (preserva live-rules/planos)
marketing-doma status    # conferir instalação
marketing-doma export    # enviar melhorias pro dev
```

Guia passo a passo: **[INSTALL.md](INSTALL.md)**

**Repo:** https://github.com/rafael-senter/marketing-doma *(privado até liberação para a equipe)*

**Windows:** PowerShell ou CMD — só Node.js + CLI.

### Reparar setup

Se Remotion ou hooks falharem:

```
/marketing-doma-setup
```

Idempotente — re-roda o mesmo setup do `install`.

### Advanced (opcional)

Audit/recreate/wizard cliente (Python + layout-mapper):

```bash
marketing-doma install-advanced
```

## Como usar `marketing-doma export`

Melhorias do cliente (live-rules, planos, edits, assets) ficam só na máquina dele. Export pro dev:

```bash
cd ~/Desktop
marketing-doma export
```

Gera `marketing-doma-export-YYYY-MM-DD.tar.gz` na pasta atual.

### No dev

```bash
cd /caminho/do/plugin/.claude/plugins/marketing-doma
tar -xzf ~/Downloads/marketing-doma-export-XXX.tar.gz
git status
# revisar + integrar + commit + git push origin main vX.Y.Z
```

Cliente roda `marketing-doma update`.

## Pré-requisitos

| Item | Quem instala |
|---|---|
| Node.js ≥ 18 LTS | Manual |
| Conta Anthropic + VS Code/Cursor | Manual |
| `npm install -g marketing-doma-cli` | Manual |
| Plugin + Remotion + IDE config | `marketing-doma install` |
| Python (audit/recreate) | `marketing-doma install-advanced` (opcional) |

**Sistema:** Linux / macOS / Windows. **Disco por projeto:** ~800 MB.

```bash
marketing-doma status
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

**Nada global** em `~/.claude/` ou `~/.cursor/`.

Instalação antiga em `~/.local/share/marketing-doma` → `marketing-doma cleanup-legacy`.

## Documentação

- **[INSTALL.md](INSTALL.md)** — instalação passo a passo.
- **[SETUP.md](SETUP.md)** — setup técnico (dev).
- **[CLAUDE.md](CLAUDE.md)** — regras de marca + protocolo + auto-melhoria.
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — diagrama de fluxo.
- **[knowledge-base/](knowledge-base/)** — voz Doma + design system + RULES + fichas + live-rules.
- **[cli/README.md](cli/README.md)** — referência do CLI.

## Para quem é

- **Marketing leigo** → `marketing-doma install` + `/marketing-doma` (ou Cursor chat).
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
