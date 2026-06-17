---
name: certo-e-errado
description: 2 cards contrapostos com ícones X (errado) e ✓ (certo) — frase errada + frase certa em fundos diferentes. Watermark vertical "DO/MA". Modelos POST 247/256. Use quando o usuário pedir "certo vs errado", "X e check", "contraste de prática", ou citar a categoria.
---

# Certo e Errado

**Componente:** `../../../../templates/components/certo-e-errado/CertoErrado.tsx`
**IDs:** `padrao-certoerrado-247`, `padrao-certoerrado-256`
**Ficha:** `../../../knowledge-base/padroes/certo-e-errado.md`

## Padrão visual
- 2 cards meio-a-meio (vertical 50/50 ou diagonal).
- **Errado:** fundo escuro/vermelho-amarelado + ícone X + frase com **bold no erro**.
- **Certo:** fundo soft/verde-amarelado + ícone ✓ + frase com **bold no acerto**.
- Watermark "**DO/MA** vertical" (logo `logotipo-vertical-branco.png`).
- Ícones X/✓ em SVG raio 45, strokeWidth grosso, com **long-shadow** opcional (cópias deslocadas 45°, opacity no grupo).

## Cores medidas
- Errado: fundo `#F4BB35` ou `#F6C655` (medir!), badge X grafite/vermelho.
- Certo: fundo `#F4BB35` + soft, badge ✓ grafite/verde.

## Voz
- Provocativa direta. Frase errada = clichê do empresário. Frase certa = mindset Doma.

## Quando usar
- Educacional (mostrar a prática certa).
- Contrastar 2 ações/decisões opostas.

## Anti-padrões
- ❌ Ícones unicode (✕/✓) finos — sempre SVG grosso.
- ❌ Watermark horizontal (este padrão usa vertical).
- ❌ Long-shadow com clipPath triangular (fica errado).

## Props do componente
```ts
type Props = {errado: string; certo: string};  // markdown ** suportado
```

## Próximos passos
1. Gerar variação com tema novo (gestão, vendas, marketing).
2. Combinar 3-4 dessas como carrossel.
