---
name: doma-motiva
description: Card único motivacional — foto de fundo + card amarelo translúcido com frase motivacional + selo grafite em canto. Modelos POST 242/250. Use quando o usuário pedir "frase motivacional", "card de inspiração", "post motivacional".
---

# Doma Motiva

**Componente:** `remotion-doma/src/v2/categorias/doma-motiva/DomaMotiva.tsx`
**IDs:** `padrao-motiva-242`, `padrao-motiva-250`
**Ficha:** `../../../knowledge-base/padroes/doma-motiva.md`

## Padrão visual
- **Foto full-bleed** OR foto + área amber.
- **Card** soft `#F8DD6B` posicionado por props (`left/top/width/height`), com frase + **bold seletivo** em palavra-chave.
- **Selo grafite** circular em canto (`sup-dir` ou `inf-dir`).
- **Watermark** "DOMa" topo ou base.

## Props
```ts
type Props = {
  foto: string;
  blocos: string[];        // cada string = 1 frase com **bold** seletivo
  card: {left, top, width, height};
  seloCanto: 'sup-dir' | 'inf-dir';
  watermark: 'topo' | 'base';
};
```

## Voz
- **Motivacional com pés no chão.** "Desafios existem pra você crescer", "Uma mente forte enxerga oportunidades".
- Vocabulário: crescer, oportunidade, força, disciplina.
- ❌ Utopia ("você consegue tudo!"), ❌ promessa atalho.

## Quando usar
- Segunda-feira / virada de mês / momento de tensão do empresário.
- Quebra de carrossel narrativo.

## Anti-padrões
- ❌ Frase muito longa (não cabe no card).
- ❌ Card centralizado por padrão (modelo POSICIONA por canto).
- ❌ Selo grafite recriado em código — sempre asset oficial.

## Próximos passos
1. Lote semanal (4 frases motivacionais com fotos variadas).
2. Combinar com carrossel SPIN como gancho inicial.
