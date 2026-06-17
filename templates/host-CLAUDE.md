# CLAUDE.md — projeto Doma (host)

> Arquivo gerado pelo `/marketing-doma:marketing-doma-setup`. Pode editar livremente.

Você está num projeto de **marketing da Doma**. As regras técnicas, fichas de categoria, voz da marca, paleta medida e tudo mais vivem **dentro do plugin global**:

```
~/.claude/plugins/marketing-doma/
```

## Comandos disponíveis (slash)

| Comando | Função |
|---|---|
| `/marketing-doma:marketing-doma` | Fluxo guiado de criação de post |
| `/marketing-doma:marketing-doma-setup` | (re)instala Remotion + sincroniza assets |
| `/marketing-doma:new-post <cat> <nome>` | Atalho direto |
| `/marketing-doma:new-carrossel <cat> <nome>` | Atalho carrossel |
| `/marketing-doma:brainstorm <pauta>` | 3 ângulos voz Doma |
| `/marketing-doma:render <id...>` | Render anti-franja |
| `/marketing-doma:audit-post <id> <modelo>` | Fidelidade SSIM |
| `/marketing-doma:publish-checklist` | Checklist final |
| `/marketing-doma:marketing-doma-extrair` | Extrair asset do PDF manual |

## Estrutura local (criada pelo setup)

```
<este projeto>/
├── CLAUDE.md                       ← você está aqui
├── remotion-doma/                   ← projeto Remotion (working copy)
│   ├── src/v2/categorias/<cat>/    ← componentes sync do plugin
│   ├── src/{Root.tsx, theme.ts, components.tsx, index.ts}
│   ├── public/{oficial,icones,fontes}/  ← assets sync do plugin
│   ├── render-still.sh              ← script anti-franja
│   └── out/<id>.png                 ← renders gerados
├── .venv-instagram/                 ← Python venv (Pillow/numpy/scipy)
└── .claude/settings.json            ← hook auto-start studio
```

## Regras de marca (resumo — detalhe no plugin)

- **Logo é LOGO, nunca texto**: usar PNG oficial de `oficial/`. Nunca digitar `DOMa`/`DOM.a`/`DOMA` em peça. Em prosa = `Doma`.
- **Watermark** = MAIS ESCURA tom-sobre-tom (NÃO mais clara).
- **Cores POR BLOCO**: medir cada peça, não reusar entre posts.
- **Fonte**: TT Lakes oficial em `fontes/`.
- **Render**: sempre `bash remotion-doma/render-still.sh <id>` (scale 2 → Lanczos).

## Onde ler cada coisa (referências ao plugin)

| Pra saber | Ler |
|---|---|
| Regras completas de marca + protocolo de criação | `~/.claude/plugins/marketing-doma/CLAUDE.md` |
| Voz institucional Doma | `~/.claude/plugins/marketing-doma/knowledge-base/identidade/voz-sigadoma.md` |
| Design system real (T1-T11) | `~/.claude/plugins/marketing-doma/knowledge-base/identidade/design-system.md` |
| RULES de recriação §0-§18 | `~/.claude/plugins/marketing-doma/knowledge-base/padroes/RULES-recriacao.md` |
| Ficha de uma categoria | `~/.claude/plugins/marketing-doma/knowledge-base/padroes/<categoria>.md` |
| Catálogo de assets (144 itens) | `~/.claude/plugins/marketing-doma/assets/CATALOGO.json` |
| Cheat-sheet Remotion APIs do nosso uso | `~/.claude/plugins/marketing-doma/knowledge-base/REMOTION-cheatsheet.md` |
| Tutorial leigo em Claude Code "novo cliente" | `~/.claude/plugins/marketing-doma/docs/TUTORIAL-novo-cliente.md` |

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
cd ~/.claude/plugins/marketing-doma
git pull
bash scripts/install-globally.sh    # idempotente
bash scripts/sync-components.sh     # propaga pro host
```
