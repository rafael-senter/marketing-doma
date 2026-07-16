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
- **Badge circular + seta ↘** = ícone SVG (strokeWidth grosso, linecap round), igual conceito dos ícones X/✓ do Certo e Errado.
- Watermark gigante: quando o modelo mostra só "DO" sangrando, usar a logo horizontal width ~175% deslocada p/ esquerda (não centralizada).

## Limites pra criação nova (§19 — calculados do componente, 2026-07-16)
| Bloco | fs | Máx chars/linha | Máx linhas | Risco |
|---|---|---|---|---|
| Frase principal (entre aspas) | 68 lh1.22 | ~24 | 3-4 | bloco fixo 81.9%×24.2% centrado — 5+ linhas transborda |
| Frase secundária | 48 lh1.3 (fs aumentado a pedido do Patrick 2026-07-16) | ~29 | ~4 | bloco 68%×24% |
- Aspas tipográficas “ ” na principal; bold só no trecho-chave.
- **Story: já usado em inimigo-crescimento-story esticando o componente — verificar densidade; ideal implementar prop `story` padrão SPIN.**

## 🆕 TEMPLATE v2 aprovado (Patrick, 2026-07-16) — POST inimigo-crescimento
Substitui as medidas antigas. Vale FEED e STORY (mesmo componente; story = canvas 1080×1920, aprovado assim).

- **Watermark**: logo VERTICAL empilhada (`logotipo-vertical-branco.png` mask) — "DO" em cima, "Ma" embaixo com espaçamento oficial, `width 100%, left 0, top 1%` (bate nas DUAS paredes; mask sem margens — medido). NÃO usar mais wordmark horizontal sangrada.
- **Cor watermark**: `#F5C24A` (mais clara que fundo — exceção da categoria mantida).
- **Card branco**: `L11.5% T23% W77% H22.5%` · **Card soft**: `L19% T53.5% W62% H22%` · **Badge**: centro `L27.5% T52.6%` Ø119.
- **Fontes**: principal 64 regular + fecho bold **700** (TextoRico boldWeight); secundário **56** regular.
- **Par obrigatório** feed+story; story renderiza com dims explícitas (1080 1920).
- Stills de referência: `inimigo-crescimento` + `inimigo-crescimento-story`.
