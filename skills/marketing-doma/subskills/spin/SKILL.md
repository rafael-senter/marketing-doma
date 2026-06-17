---
name: spin
description: Carrossel SPIN (Situação → Problema → Implicação → Necessidade) com perguntas provocativas. 6 slides padrão. Modelos POST 243, 251. Use quando o usuário pedir "SPIN", "carrossel de perguntas", "P/I/N", "carrossel de qualificação".
---

# SPIN

**Componente:** `../../../../templates/components/spin/Spin.tsx`
- `SpinCapa` — hook + foto + frase em pílulas
- `SpinMiolo` — perguntas (`→ pergunta` cada)
- `SpinCta` — fecho + bordão Doma

**Ficha:** `../../../knowledge-base/padroes/spin.md`

## Padrão visual
- 6 slides estrutura: capa + 4 miolos (S/P/I/N) + CTA.
- Capa: foto + título em pílulas + texto explicativo.
- Miolos: card soft/claro com 2-3 perguntas (`→ ...?`).
- CTA: card + selo grafite + bordão Doma + logo.

## Estrutura narrativa (PAS / SPIN)
| Slide | Função |
|---|---|
| 1 capa | Hook + frase forte |
| 2 (S) | Pergunta de Situação ("Como você faz X hoje?") |
| 3 (P) | Pergunta de Problema ("E quando X falha?") |
| 4 (I) | Pergunta de Implicação ("O que isso custa pro negócio?") |
| 5 (N) | Pergunta de Necessidade ("E se houvesse Y?") |
| 6 CTA | Doma resolve + bordão + selo |

## Voz
- 100% perguntas provocativas em 2ª pessoa nos slides 1-5.
- Doma só aparece no slide 6 (regra do design-system: nomeia Doma só no fecho).

## Quando usar
- Qualificação de lead (gancho de DM/comentário).
- Tema com dor identificável (gestão sem dados, vendas sem CRM, fluxo de caixa).

## Anti-padrões
- ❌ Nomear Doma nos slides intermediários.
- ❌ Afirmação em vez de pergunta.
- ❌ Mais de 3 perguntas por slide (sobrecarrega).

## Props
```ts
SpinCapa: {titulo: string; texto: string; foto: string}
SpinMiolo: {perguntas: string; cardClaro?: boolean}
SpinCta: {texto: string; destaque: string}
```

## Próximos passos
1. Variar tema (financeiro, estoque, marketing).
2. Combinar com prova (`mapa-clientes`) no slide 5.
