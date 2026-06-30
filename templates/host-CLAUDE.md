# CLAUDE.md — projeto Doma (host)

> Gerado pelo `marketing-doma install`. Pode editar livremente.

Você está num projeto de **marketing da Doma**. Plugin, regras e assets vivem **neste projeto**:

```
.claude/skills/marketing-doma/
```

Ativação: `.claude/settings.json` local (`enabledPlugins` + hook Remotion). **Nada no global `~/.claude/`.**

## Comandos disponíveis (slash)

| Comando | Função |
|---|---|
| `/marketing-doma-setup` | Reparar/re-sync Remotion + hooks |
| `/marketing-doma` | Fluxo guiado de criação |

## Estrutura local (criada pelo setup)

```
<este projeto>/
├── CLAUDE.md                       ← você está aqui
├── .claude/
│   ├── plugins/marketing-doma/      ← plugin completo (local)
│   └── settings.json                ← enabledPlugins + hook studio
├── remotion-doma/                   ← Remotion (working copy)
│   └── out/<id>.png
└── .venv-instagram/                 ← opcional (install-advanced)
```

## Regras de marca (resumo — detalhe no plugin)

- **Logo é LOGO, nunca texto**: usar PNG oficial de `oficial/`. Nunca digitar `DOMa`/`DOM.a`/`DOMA` em peça. Em prosa = `Doma`.
- **Watermark** = MAIS ESCURA tom-sobre-tom (NÃO mais clara).
- **Cores POR BLOCO**: medir cada peça, não reusar entre posts.
- **Fonte**: TT Lakes oficial em `fontes/`.
- **Render**: sempre `node remotion-doma/render-still.mjs <id>` (scale 2 → Lanczos).

## Onde ler cada coisa (referências ao plugin)

| Pra saber | Ler |
|---|---|
| Regras completas de marca + protocolo de criação | `.claude/skills/marketing-doma/CLAUDE.md` |
| Voz institucional Doma | `.claude/skills/marketing-doma/knowledge-base/identidade/voz-sigadoma.md` |
| Design system real (T1-T11) | `.claude/skills/marketing-doma/knowledge-base/identidade/design-system.md` |
| RULES de recriação §0-§18 | `.claude/skills/marketing-doma/knowledge-base/padroes/RULES-recriacao.md` |
| Ficha de uma categoria | `.claude/skills/marketing-doma/knowledge-base/padroes/<categoria>.md` |
| Catálogo de assets | `.claude/skills/marketing-doma/assets/CATALOGO.json` |
| Cheat-sheet Remotion | `.claude/skills/marketing-doma/knowledge-base/REMOTION-cheatsheet.md` |

## Auto-melhoria (regra-chave)

Quando descobrir padrão novo (cor invertida, voz julgadora, etc.) durante uso:
1. Gravar live-rule: rodar `auto-rules-learn.sh` do plugin global.
2. Atualizar ficha da categoria afetada.
3. (se transversal) promover pras RULES principais.

## Ingestão de novo asset (regra-chave)

Quando usuário enviar/colar imagem nova (foto cliente, logo, mockup):
1. Invocar sub-skill `asset-ingester` automaticamente (do plugin).
2. Identifica categoria + pede metadata + move pra `assets/<cat>/` no plugin.
3. Rebuild catálogo + sync pro host.
4. Nunca aceitar asset sem catalogar.

## Atualizar plugin

```bash
marketing-doma update
```
