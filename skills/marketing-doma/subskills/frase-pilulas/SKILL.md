---
name: frase-pilulas
description: Card único com frase forte distribuída em pílulas amarelas tortas (rotação alternada). Padrão-ouro do método de medição. Modelo de referência DWO5_TLDG1w. Use quando o usuário pedir "frase em pílulas", "frase forte em caixas amarelas", ou citar diretamente a categoria.
---

# Frase em Pílulas

**Componente:** `remotion-doma/src/v2/categorias/frase-em-pilulas/FrasePilulas.tsx`
**ID Still:** `padrao-frase-pilulas`
**Ficha completa:** `../../../knowledge-base/padroes/frase-pilulas.md`

## Padrão visual
- Fundo manga `#F4BB35`.
- 5 pílulas soft `#F8DD6B` empilhadas verticalmente, **cada uma com rotação sutil** (±2-6°, alternando sinal — zigue-zague).
- Texto grafite bold em cada pílula (1 trecho por pílula).
- Watermark "DOMa" repetida em coluna com `gap` (não grudar) — medir espaçamento no modelo.
- Logo DOMa rodapé centralizado.

## z-index (NÃO linear — medir no modelo)
- A 1ª pílula vai por cima da 2ª.
- Da 2ª em diante: a de baixo cobre a de cima (3 sobre 2, 4 sobre 3, 5 sobre 4).
- `z = [6, 2, 3, 4, 5]`, não crescente simples.

## Voz
- Provocativa, frase única quebrada em 4-5 trechos curtos.
- Negrito seletivo no termo-chave.

## Quando usar
- Frase de impacto curta (15-30 palavras) que precisa de pausa visual.
- Hook de carrossel ou card standalone.

## Anti-padrões
- ❌ Pílulas retas (sem rotação).
- ❌ z-index crescente (vira escada errada).
- ❌ Watermark sem gap.

## Próximos passos sugeridos ao usuário
1. Renderizar com texto novo.
2. Gerar variação com 4 pílulas (menos texto).
3. Combinar com outra peça (capa de carrossel).
