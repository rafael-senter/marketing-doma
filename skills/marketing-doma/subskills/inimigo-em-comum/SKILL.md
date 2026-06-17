---
name: inimigo-em-comum
description: Card único com frase entre aspas em card branco + badge circular preto com seta ↘ + card soft de reflexão. Watermark "DOMa" GIGANTE sangrando o canto. Modelos POST 244/252. Use quando o usuário pedir "frase com aspas + reflexão", "inimigo em comum", "provocação com seta".
---

# Inimigo em Comum

**Componente:** `../../../../templates/components/inimigo-em-comum/InimigoComum.tsx`
**IDs:** `padrao-inimigo-244`, `padrao-inimigo-252`
**Ficha:** `../../../../knowledge-base/padroes/inimigo-em-comum.md`

## Padrão visual
- Fundo manga + **watermark "DOMa" GIGANTE** (width ~175%, sangra canto sup-esq — só "DO" visível).
- **Card branco** L9% T22.2% W81.9% H24.2% raio 34 — frase principal entre aspas curvas, **bold no remate**.
- **Badge circular preto** Ø119 (centro L26.2% T52.9%) com **seta ↘ branca grossa** (SVG strokeWidth 6.5).
- **Card soft** L16% T54% W68% H24% raio 30 — texto secundário centralizado.
- Logo DOMa rodapé T87%.

## Quebras de linha
- **HARDCODED com `\n`** nos props (texto centralizado é frágil em wrap automático).
- 244: 3+3 linhas. 252: 3+3 linhas.

## Voz
- Provocativa. Aspas = frase clichê do problema. Card soft = consequência.
- ❌ Julgar ("você não liga"), ❌ atacar.

## Props
```ts
type Props = {principal: string; secundario: string};
```

## Anti-padrões
- ❌ Watermark proporcional (precisa SANGRAR — 175% deslocada esquerda).
- ❌ Seta `↘` unicode (usar SVG).
- ❌ Card soft sem padding-left p/ caber ao lado do badge.

## Próximos passos
1. Variar tema (gestão sem dados, vendas sem CRM, marketing sem mensuração).
2. Combinar com `certo-e-errado` (sequência: aspas → certo/errado → CTA).
