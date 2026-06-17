# Padrão de Post — "Inimigo em Comum" (Doma)

> ✅ **RECRIADO v2 — 244: 89.7% · 252: 90.6%** — `../../templates/components/inimigo-em-comum/InimigoComum.tsx`.
> Modelos: `tipos-de-posts/.../Inimigo em Comum/POST 244.png` e `POST 252.png`. Layout FIXO (só o texto varia).

Canvas 1080×1350. Medido com `layout-mapper` + numpy.

## Template FIXO
- **Fundo** `#F5C24A` (MEDIDO POST 244 — fundo desta categoria é mais claro que o padrão) + **watermark "DOMa" GIGANTE** (CSS mask `logotipo-principal-branco.png`, cor `#F4BB35` MEDIDO — manga padrão, MAIS ESCURA que o fundo desta categoria, width ~175%, "DO" sangra o canto sup-esq). É o maior limitante de fidelidade (área grande).
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
