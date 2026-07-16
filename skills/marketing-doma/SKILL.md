---
name: marketing-doma
description: Skill master do plugin marketing-doma. Roteia para a sub-skill da categoria certa, carrega regras de marca + voz institucional + padrão medido + componente Remotion validado. Use SEMPRE que o usuário invocar /marketing-doma, /new-post, /new-carrossel, ou pedir "criar post Doma", "carrossel Doma", "gerar arte da Doma". Cobre 12 categorias de peças (Frase em Pílulas, Mapa Clientes, Certo e Errado, Clientes, Doma Motiva, Inimigo em Comum, Narrativa, Produtividade, Funções do Sistema, Doma Institucional, Dicas Carrossel, SPIN) + protocolo de post novo + regras transversais de marca.
allowed-tools: Read Grep Glob Bash Write Edit Task
---

# marketing-doma — Master Skill

Skill auto-contida que gera posts/carrosséis/stories da Doma no Remotion seguindo design system real, voz institucional e regras de marca. Empacota tudo o que foi mapeado pela equipe + auto-melhora a cada sessão.

## ⚠️ LEITURA OBRIGATÓRIA antes de criar QUALQUER peça

1. `../../CLAUDE.md` — regras de marca + protocolo + auto-melhoria.
2. `../../knowledge-base/padroes/RULES-recriacao.md` — §0–§18 de medição/render/cores/sobreposição/watermark.
3. `../../knowledge-base/identidade/voz-sigadoma.md` — 3 tons + bordões + vocabulário + frases proibidas.
4. `../../knowledge-base/identidade/design-system.md` — 11 templates oficiais + 2/4 modos de fundo + estrutura narrativa PAS.
5. `../../knowledge-base/identidade/persona-imagens.md` — regras de persona em imagem (30-50 anos, executivo do setor, EPIs) — se a peça usa foto de pessoa.
6. `../../knowledge-base/identidade/setores-atendidos.md` — setores oficiais de clientes Doma (copy segmentada + persona coerente).

## Roteamento por intenção

| Pedido do usuário | Sub-skill |
|---|---|
| "frase forte em caixas/pílulas amarelas" | `subskills/frase-pilulas` |
| "mapa do Brasil com selo de cobertura" | `subskills/mapa-clientes` |
| "card certo vs errado / contraste X ✓" | `subskills/certo-e-errado` |
| "anunciar novo cliente / loja entrou no time" | `subskills/clientes` |
| "frase motivacional sobre foto" | `subskills/doma-motiva` |
| "frase entre aspas + reflexão (inimigo em comum)" | `subskills/inimigo-em-comum` |
| "estoque cheio / caixa vazio / narrativa visual" | `subskills/narrativa` |
| "foto + sub-card escuro (produtividade)" | `subskills/produtividade` |
| "mockup ERP no celular/laptop + balões (funções)" | `subskills/funcoes-sistema` |
| "tipográfico institucional / frame + ícone Doma" | `subskills/doma-institucional` |
| "carrossel numerado de erros/dicas (família 246/133/193)" | `subskills/dicas-carrossel` |
| "carrossel de logos de cliente (família 205)" | `subskills/doma-carrossel-clientes` |
| "carrossel SPIN (perguntas → implicação → necessidade)" | `subskills/spin` |
| "categoria nova / não bate com nenhum padrão" | `subskills/novo-post-from-scratch` |
| "regras transversais de marca / voz / cor" | `subskills/brand-rules` |
| **peça precisa de foto de pessoa/dono/funcionário de setor cliente** (buscar internet ou gerar nanobanana) | `subskills/image-sourcer` |
| **usuário cola/envia imagem nova** (foto cliente, logo, asset) | `subskills/asset-ingester` (automático) |
| **detecta padrão repetido durante sessão** (2+ erros / 3+ confirmações) | `subskills/auto-optimizer` (META) |

## Sub-agentes invocáveis (Task tool)

| Agente | Quando usar |
|---|---|
| `ghostwriter-doma` | Brainstorm de copy na voz Doma (pauta → 3 ângulos). |
| `validador-marca` | Antes de codar/renderizar: checar regras de marca no plano. |
| `editor-conteudo` | Revisar copy: bordão Doma, sem julgar, vocabulário próprio. |
| `render-orchestrator` | Render N stills em batch + audit comparativo. |

## Fluxo padrão (quando `/marketing-doma` é invocado)

1. **Tipo** — `AskUserQuestion` com 14 opções (cards + carrosséis + "outro").
2. **Conteúdo** — "Já tem o conteúdo ou quer brainstorm?" → Se brainstorm: invocar `ghostwriter-doma`.
3. **Subskill** — Carregar `subskills/<categoria>/SKILL.md`.
4. **Plano** — Compor `templates/planos/POST-<nome>-plano.md` (cores medidas, voz, slide-a-slide).
5. **Validar** — Mostrar plano + invocar `validador-marca` + pedir aprovação humana.
6. **Codar** — Adicionar Stills no `remotion-doma/src/Root.tsx` (snippet em `templates/Root.tsx.snippet`).
7. **Renderizar** — `node remotion-doma/render-still.mjs <id>` por slide (scale 2 → Lanczos).
8. **Audit** — Se há modelo direto: `layout-mapper compare.py`. Senão: visual + checklist marca.
9. **Iterar/aprovar** — `/publish-checklist` quando aprovado.

## Auto-melhoria

Quando descobrir padrão novo (cor errada, voz ajustada, header desproporcional, watermark invertida, faixa ARRASTA com formato diferente):
1. Gravar `../../knowledge-base/live-rules/<YYYY-MM-DD>-<topic>.md`.
2. Atualizar `../../knowledge-base/padroes/<categoria>.md` com a regra.
3. Mencionar ao usuário: "Aprendi padrão novo: <X>. Gravado em live-rules pra próxima vez."

## Anti-padrões (não fazer)

Ver `../../CLAUDE.md` seção "Anti-padrões". Resumo:
- ❌ Reusar componente sem MEDIR (cor pode estar hard-coded errada).
- ❌ Codar 9 slides + descobrir defeitos só depois.
- ❌ Encurtar elemento pra compensar conteúdo magro — densificar conteúdo.
- ❌ Voz que julga ("luxo de quem não X").
- ❌ Render scale 1.
- ❌ Logo recriada em fonte/SVG.
- ❌ "DOM.a" escrito em qualquer lugar.

## Comandos relacionados

- `/marketing-doma` — fluxo principal (este).
- `/marketing-doma-setup` — instalação inicial.
- `/new-post`, `/new-carrossel` — atalhos sem fluxo guiado.
- `/brainstorm` — só pauta + ângulos.
- `/render <id>` — atalho do `render-still.sh`.
- `/audit-post <render> <modelo>` — comparação direta.
- `/publish-checklist` — final pré-publicar.
