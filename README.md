# marketing-doma

Plugin do Marketing da Doma para [Claude Code](https://claude.com/claude-code) — geração de posts, carrosséis e stories no Remotion seguindo o **design system real** da marca, **voz institucional @sigadoma** e **regras de marca** rigorosas (logo DOMa, watermark tom-sobre-tom medida, paleta amber, TT Lakes).

## O que esse plugin faz

- **Skill master `/marketing-doma`** — fluxo guiado passo-a-passo: leigo escolhe tipo de post, dá conteúdo (ou pede brainstorm), o plugin monta o plano medido, renderiza, audita vs modelo, e ajuda a publicar.
- **14 sub-skills** — uma por tipo de post (Dicas, SPIN, Doma Motiva, Inimigo em Comum, Funções do Sistema, Carrossel de Clientes, etc.) + brand-rules + protocolo de post novo.
- **4 agentes especialistas** — ghostwriter (voz Doma), validador de marca, editor de conteúdo, render orchestrator.
- **Templates Remotion validados** — componentes `.tsx` prontos, copiados dos validados em produção.
- **Auto-melhoria** — toda regra/padrão novo descoberto em runtime vira arquivo em `knowledge-base/live-rules/`.
- **Setup automático** — `/marketing-doma-setup` instala Remotion + deps + hook auto-start do studio.

## Documentação

- **[INSTALL.md](INSTALL.md)** — instalação passo-a-passo para usuário leigo.
- **[SETUP.md](SETUP.md)** — setup técnico (dev).
- **[CLAUDE.md](CLAUDE.md)** — regras de marca + protocolo + auto-melhoria.
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — diagrama de fluxo completo + camadas.
- **[knowledge-base/](knowledge-base/)** — voz Doma + design system + RULES + 17 fichas + asset-index + live-rules.

## Para quem é

- **Pessoa de marketing leiga** → usa só comandos `/marketing-doma` e `/marketing-doma-setup`.
- **Patrick / dev** → mantém e evolui sub-skills, regras e templates.

## Instalação — 2 etapas claras

### Etapa 1 (1×) — instalar o plugin no Claude Code GLOBAL

Clone o plugin em **qualquer pasta** (recomendado: separado dos projetos):

```bash
git clone git@gitlab.com:valem_grupo/marketing-doma.git ~/plugins/marketing-doma
cd ~/plugins/marketing-doma
bash install.sh
```

O `install.sh` faz:
- Symlink `~/.claude/plugins/marketing-doma` → fonte clonada.
- Registra em `~/.claude/plugins/installed_plugins.json` + `known_marketplaces.json`.
- Habilita `enabledPlugins['marketing-doma@marketing-doma'] = True` em `~/.claude/settings.json`.

Flags:
```bash
bash install.sh --dry-run    # mostra o que faria
bash install.sh --uninstall  # remove tudo
```

**Atualizações** chegam via `git pull` na pasta clonada — symlink reflete automaticamente.

### Etapa 2 (1× por projeto) — preparar projeto de trabalho

Em **qualquer pasta** que vai criar posts (não precisa ser perto do plugin):

```bash
cd ~/qualquer/pasta-de-trabalho
claude
```

No Claude Code:
```
/marketing-doma:marketing-doma-setup
```

Cria `remotion-doma/` + `CLAUDE.md` + `README.md` + `.gitignore` + venv Python + hook auto-start.

### Uso

```
/marketing-doma            # fluxo guiado
/marketing-doma:new-post   # atalho
```

Ver [`INSTALL.md`](./INSTALL.md) (passo-a-passo leigo) ou [`SETUP.md`](./SETUP.md) (técnico).

## Comandos disponíveis

| Comando | Função |
|---|---|
| `/marketing-doma` | Fluxo guiado — escolher tipo, conteúdo, renderizar |
| `/marketing-doma-setup` | Instalar dependências + criar hook auto-start |
| `/new-post` | Atalho: criar post novo (sem fluxo guiado) |
| `/new-carrossel` | Atalho: criar carrossel novo |
| `/brainstorm` | Pauta + 3 ângulos na voz Doma |
| `/render` | Renderizar 1 ou N stills |
| `/audit-post` | Comparar render vs modelo |
| `/publish-checklist` | Check-list final pré-publicar |

## Visão estrutural

```
.claude/plugins/marketing-doma/
├── plugin.json                   manifest
├── CLAUDE.md                     regras + auto-melhoria
├── commands/                     slash commands
├── agents/                       subagentes
├── skills/marketing-doma/        master + 15 subskills
├── scripts/                      utilitários bash
├── templates/                    components .tsx + planos .md
├── knowledge-base/               voz/design/padroes/live-rules
└── assets/                       logos, ícones, fontes
```

## Versionamento

Plugin tem **git próprio** (sub-repo) — fica em `.claude/plugins/marketing-doma/.git/`. Independente do projeto host.

```bash
cd .claude/plugins/marketing-doma
git status
```

## Licença

MIT. Compartilhável com a equipe.
