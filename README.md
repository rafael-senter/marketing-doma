# marketing-doma

Plugin do Marketing da Doma para [Claude Code](https://claude.com/claude-code) — geração de posts, carrosséis e stories no Remotion seguindo o **design system real** da marca, **voz institucional @sigadoma** e **regras de marca** rigorosas (logo DOMa, watermark tom-sobre-tom medida, paleta amber, TT Lakes).

## O que esse plugin faz

- **Skill master `/marketing-doma`** — fluxo guiado passo-a-passo: leigo em Claude Code escolhe tipo de post, dá conteúdo (ou pede brainstorm), o plugin monta o plano medido, renderiza, audita vs modelo, e ajuda a publicar.
- **14 sub-skills** — uma por tipo de post (Dicas, SPIN, Doma Motiva, Inimigo em Comum, Funções do Sistema, Carrossel de Clientes, etc.) + brand-rules + protocolo de post novo.
- **4 agentes especialistas** — ghostwriter (voz Doma), validador de marca, editor de conteúdo, render orchestrator.
- **Templates Remotion validados** — componentes `.tsx` prontos, copiados dos validados em produção.
- **Auto-melhoria** — toda regra/padrão novo descoberto em runtime vira arquivo em `knowledge-base/live-rules/`.
- **Setup automático** — `/marketing-doma-setup` instala Remotion + deps + hook auto-start do studio.

## Instalação (via npm)

```bash
# 1× só:
npm install -g marketing-doma-cli
marketing-doma install

# Sempre que tiver versão nova:
marketing-doma update

# Ver versão / saúde:
marketing-doma status
```

Ou sem instalar global, via `npx`:

```bash
npx marketing-doma-cli install
npx marketing-doma-cli update
```

Pré-requisitos: Node.js ≥ 18, Python 3.10+, git, [Claude Code CLI](https://claude.com/claude-code). Detalhes em [INSTALL.md](INSTALL.md).

## Uso

Em **qualquer pasta** que vai criar posts:

```bash
cd ~/minha-pasta-de-trabalho
claude
```

No Claude Code:

```
/marketing-doma:marketing-doma-setup   # 1ª vez no projeto — instala Remotion + venv
/marketing-doma                         # cria peça nova (fluxo guiado)
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

## Documentação

- **[INSTALL.md](INSTALL.md)** — instalação passo-a-passo + pré-requisitos + modo dev (clone manual).
- **[SETUP.md](SETUP.md)** — setup técnico (dev).
- **[CLAUDE.md](CLAUDE.md)** — regras de marca + protocolo + auto-melhoria.
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — diagrama de fluxo completo + camadas.
- **[knowledge-base/](knowledge-base/)** — voz Doma + design system + RULES + 17 fichas + asset-index + live-rules.
- **[cli/README.md](cli/README.md)** — referência do CLI Node.js.

## Para quem é

- **Pessoa de marketing leiga em Claude Code** → usa só comandos `/marketing-doma` e `/marketing-doma-setup`.
- **Patrick / dev** → mantém e evolui sub-skills, regras e templates.

## Visão estrutural

```
.claude/plugins/marketing-doma/
├── plugin.json                   manifest
├── CLAUDE.md                     regras + auto-melhoria
├── cli/                          CLI Node.js (publicado no npm)
├── commands/                     slash commands
├── agents/                       subagentes
├── skills/marketing-doma/        master + 15 subskills
├── scripts/                      utilitários bash
├── templates/                    components .tsx + planos .md
├── knowledge-base/               voz/design/padroes/live-rules
└── assets/                       logos, ícones, fontes
```

## Licença

MIT.
