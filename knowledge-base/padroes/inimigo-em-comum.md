# Padrão de Post — "Inimigo em Comum" (Doma)

> ✅ **RECRIADO v2 — 244: 89.7% · 252: 90.6%** — `../../templates/components/inimigo-em-comum/InimigoComum.tsx`.
> Modelos: `tipos-de-posts/.../Inimigo em Comum/POST 244.png` e `POST 252.png`. Layout FIXO (só o texto varia).

Canvas 1080×1350. Medido com `layout-mapper` + numpy.

## Template FIXO
- **Fundo** `#F4BB35` (MEDIDO POST 244+252 — manga padrão, mais escuro que watermark nesta categoria) + **watermark "DOMa" GIGANTE** (CSS mask `logotipo-principal-branco.png`, cor `#F5C24A` MEDIDO — MAIS CLARA que o fundo (exceção à RULES §9 — só desta categoria), width ~175%, "DO" sangra o canto sup-esq). É o maior limitante de fidelidade (área grande).
- **Card BRANCO** `#FFFFFF`, L9% T22.2% W81.9% H24.2%, raio 34 — **frase principal entre aspas, centralizada, fim em bold** (fontSize ~58).
- **Badge circular preto** `#1F1F1F` Ø119 (centro L26.2% T52.9%) com **seta ↘ branca grossa** (SVG strokeWidth 6.5).
- **Card SOFT** `#F8DD6B`, L16% T54% W68% H24%, raio 30 — **texto secundário centralizado** (fontSize 40, maxWidth ~430 p/ quebrar em 3 linhas; paddingLeft 130 p/ não invadir o badge).
- **Logo DOMa** grafite no rodapé (T87%, centralizado).

## VARIA
- `principal` (card branco, aspas, fim bold) · `secundario` (card soft).
- ⚠️ **Quebras de linha hardcoded (`\n`) nos props** p/ bater o wrap EXATO do modelo (texto centrado).
  Mais confiável que ajustar fontSize/maxWidth e torcer pra quebrar igual. 244 = 3+3 linhas, 252 = 3+3.

## Reaproveitável
- **Badge circular + seta ↘** = componente compartilhado `SetaDoma` (padrão oficial, RULES §21). Branca no badge grafite. NÃO redesenhar a seta — importar de `../../../components`. (Antes era SVG local com linecap round; padronizado 2026-07-17 p/ butt+miter, ponta pontuda.)
- Watermark gigante: quando o modelo mostra só "DO" sangrando, usar a logo horizontal width ~175% deslocada p/ esquerda (não centralizada).

## Limites pra criação nova (§19 — calculados do componente, 2026-07-16)
| Bloco | fs | Máx chars/linha | Máx linhas | Risco |
|---|---|---|---|---|
| Frase principal (entre aspas) | 68 lh1.22 | ~24 | 3-4 | bloco fixo 81.9%×24.2% centrado — 5+ linhas transborda |
| Frase secundária | 48 lh1.3 (fs aumentado a pedido do Patrick 2026-07-16) | ~29 | ~4 | bloco 68%×24% |
- Aspas tipográficas “ ” na principal; bold só no trecho-chave.
- **Story: já usado em inimigo-crescimento-story esticando o componente — verificar densidade; ideal implementar prop `story` padrão SPIN.**

## 🆕 TEMPLATE v2 aprovado (Patrick, 2026-07-16) — FONTE DA VERDADE
Substitui as medidas antigas. Componente `InimigoComum.tsx` com prop `story` — números abaixo são os implementados (validados peça a peça com o Patrick no POST inimigo-crescimento).

### Escrita grande de fundo (watermark) — FEED e STORY
- Asset: `logotipo-vertical-branco.png` como CSS mask (logo VERTICAL empilhada: "DO" em cima, "Ma" embaixo, espaçamento oficial do arquivo).
- Posição: `top 1%, left 0, width 100%` — **bate nas DUAS paredes** (mask sem margens internas — medido alpha bbox 0/1680 de 1681).
- `aspectRatio: 1681/1328` → altura 853px (63% do feed; 44% do story). "Ma" fica parcialmente atrás dos cards — intencional.
- Cor: `#F5C24A` sobre fundo `#F4BB35` (mais CLARA que o fundo — exceção da categoria a RULES §9, medida nos modelos 244/252).
- ❌ NUNCA a wordmark horizontal sangrada (mostrava "DON" cortado — rejeitada).

### FEED 1080×1350 (prop `story` ausente/false)
| Elemento | Medidas |
|---|---|
| Card branco | `L11.5% T23% W77% H22.5%`, radius 34, sombra `0 8px 28px #00000022` |
| Badge seta ↘ | centro `L27.5% T52.6%`, Ø119, grafite `#1F1F1F` |
| Card soft `#F8DD6B` | `L19% T53.5% W62% H22%`, radius 30 |
| Logo rodapé | wordmark grafite, `top 87%`, tamanho 60 |

### STORY 1080×1920 (prop `story: true`)
| Elemento | Medidas |
|---|---|
| Card branco | `L11.5% T28% W77% H22.5%` (desce 5pp) |
| Badge seta ↘ | centro `L27.5% T58.5%` |
| Card soft | `L21% T59.5% W58% H17.5%` (menor que o feed — fontes NÃO diminuem) |
| Logo rodapé | `top 87%` (= y1670, fim da zona segura) |

### Tipografia (IGUAL nos dois formatos)
- Principal (card branco): TT Lakes **64px regular**, lineHeight 1.22, centralizado, fecho em **bold 700** (`TextoRico boldWeight={700}` — 800 rejeitado, grosso demais). Padrão de quebra: 3 linhas, aspas fora do bold.
- Secundário (card soft): **56px regular**, lineHeight 1.3, centralizado, SEM bold. 3 linhas curtas.

### Regras de uso
- Par obrigatório: `<id>` + `<id>-story` (story com `story: true` e canvas 1080×1920; render com dims explícitas).
- Só o texto varia entre peças — layout é fixo.
- Stills de referência: `inimigo-crescimento` / `inimigo-crescimento-story`. Renders aprovados em `remotion-doma/out/`.
