---
name: narrativa
description: Card foto + frase forte sobreposta. Variante 265 = foto + card. Variante 272 = foto + moedas 3D extraídas via rembg. Use quando o usuário pedir "narrativa visual", "estoque cheio caixa vazio", "frase forte sobre foto".
---

# Narrativa

**Componentes:**
- `remotion-doma/src/v2/categorias/narrativa/Narrativa.tsx` (modo 265 — card)
- `remotion-doma/src/v2/categorias/narrativa/Narrativa272.tsx` (modo 272 — moedas 3D)

**IDs:** `padrao-narrativa-265`, `padrao-narrativa-272`
**Ficha:** `../../../knowledge-base/padroes/narrativa.md`

## Padrão visual
- **265:** foto + card amber translúcido + frase com **bold no contraste** ("Estoque cheio **e caixa vazio?**").
- **272:** foto + objeto 3D (moedas) extraído via `rembg` (remoção de fundo local) sobre amber.

## Voz
- Provocativa contraintuitiva ("X cheio E Y vazio?").

## Quando usar
- Hook visual forte (carrossel slide 1 ou post solo).
- Dor identificável instantaneamente.

## Anti-padrões
- ❌ Recriar objeto 3D em CSS (RULES §6 — usar nanobanana ou extrair via rembg).
- ❌ Frase longa (passa do card).

## Props
```ts
// 265
type Props = {foto: string; principal: string};
// 272: hard-coded (objeto 3D específico)
```

## Próximos passos
1. Variar par de contraste (lucro alto / margem baixa, vendas crescendo / fluxo apertado).
2. Lote temático (4 narrativas no mesmo tom).
