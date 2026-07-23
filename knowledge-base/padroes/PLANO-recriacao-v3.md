# PLANO — Recriação v3 das categorias antigas (2026-07-21)

> ✅ **FILA CONCLUÍDA (2026-07-23) — 10/10 categorias recriadas + story.** Todas as antigas agora têm
> componente medido/consertado + versão story (1080×1920). Fechamento em v0.2.11.

## Por que existe este plano
As categorias abaixo foram criadas com a versão antiga da skill, **antes** das regras §22–§27
(encaixe de texto, negrito medido, lineHeight em px, hierarquia de corpo, itálico por skew,
bbox do pixel, ícone vetorial medido). Elas têm os mesmos defeitos que corrigimos um a um na
`troque-por-isso` — e nenhuma tem versão story.

**Critério de seleção (definido pelo Patrick):** categoria **sem prop `story` = não foi recriada
com a skill nova** → entra na fila. Categoria **com prop `story` = já recriada** → não mexer.

## Não mexer (8 — já recriadas, já têm story)
`dicas-trento` · `diversas` · `funcoes-sistema` · `inimigo-em-comum` · `produtividade` ·
`segmentos` · `spin` · `troque-por-isso`

## Fila de recriação (10)

| # | Categoria | Modelos | Peças | Tipo | Status |
|---|---|---|---|---|---|
| 1 | `frase-em-pilulas` | DWO5_TLDG1w | 1 | card único | ✅ bold 700 medido · px em vez de % · story |
| 2 | `certo-e-errado` | POST 247, 256 | 2 | card único | ✅ negrito 600 medido + story (cantos/sombra adiados) |
| 3 | `doma-motiva` | POST 242, 250 | 2 | card único (foto) | ✅ fotos limpas recriadas · selo/fs medidos · 3D · story |
| 4 | `narrativa` | POST 265, 272 | 2 | card único (foto) | ✅ tipografia medida · foto limpa · moedas re-extraídas · story |
| 5 | `mapa-de-clientes` | DSdIG_FkuI4_2 | 1 | card único | ✅ escala + rótulos alinhados + overflow do SVG + story |
| 6 | `clientes` | LAYOUT CLIENTE NOVO | 2 | card único (foto) | ✅ já fiel · % → px · watermark #F5C758 · story (bugs = foto) |
| 7 | `doma-institucional` | POST 115, 178, 257, 271 | 4 | card único | ✅ 178/257/115 recriados (medidos) · 271 px · story nas 4 |
| 8 | `dicas` | POST 246 | 9 | carrossel | ✅ capa consertada (ícone limpo + highlight) · story nas 9 |
| 9 | `dicas-otica` | POST 133 | 9 | carrossel (fotos) | ✅ seta dupla + fotos/texto corrigidos · badge baked pintada · story nas 9 |
| 10 | `doma-carrossel-clientes` | POST 205 | 8 | carrossel (logos) | ✅ bug marca DOMa→Doma (7x) · story nas 8 |

Ordem: cards únicos primeiro (ciclo curto, valida o processo), carrosséis depois.

## Protocolo por categoria (o mesmo que deu certo na `troque-por-isso`)

1. **Medir o modelo do zero** — não confiar na ficha antiga (RULES §0.1: doc antigo pode ter erro):
   - cores hex **por bloco** (fundo, cards, pílulas, badges, watermark);
   - bbox → px e % de cada elemento; raios por canto; z-order;
   - **fontSize por PAPEL** e a razão entre eles (§24.2);
   - **lineHeight em px** (delta entre tops de linha) e **gap** entre blocos (§24.1/§24.3);
   - **peso do negrito** por medição de traço bold-vs-regular do mesmo fontSize (§23);
   - **ângulo do itálico**, se houver (§25);
   - **bbox do pixel** de cada ícone/selo/grafismo (§26) e vetorizar o que for do modelo (§27).
2. **Comparar com o componente atual** e listar as divergências.
3. **Corrigir** o componente no plugin.
4. **Criar a prop `story`** — blocos no mesmo tamanho em px, só reposicionados; zona segura.
5. **Renderizar feed + story** e validar por medição (tops das linhas ±5px, traço, bbox).
6. **Atualizar a ficha** da categoria com os valores implementados + tabela de correções.
7. **Validar com o Patrick** antes de seguir para a próxima.
8. Commit + tag + push.

## Regras que a versão antiga não conhecia (checar todas em cada categoria)
§22 encaixe de texto · §23 negrito medido por categoria · §24 lineHeight px + hierarquia + gap ·
§25 itálico por `skewX` · §26 bbox do pixel, não o prop · §27 ícone vetorial medido.
