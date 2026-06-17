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

## Instalação rápida

Ver [`INSTALL.md`](./INSTALL.md) (passo-a-passo p/ leigo) ou [`SETUP.md`](./SETUP.md) (técnico).

```bash
# Resumo:
cd projetos-doma/patrick                              # ou seu projeto
# (Claude Code deve detectar o plugin em .claude/plugins/marketing-doma/)
# Rodar uma vez:
/marketing-doma-setup
# Depois usar:
/marketing-doma
```

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
