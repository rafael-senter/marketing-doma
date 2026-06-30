# Plano — POST {{NOME}}

> Categoria: spin (modelos POST 243/251)
> Criado: {{DATA}}
> Componente: `templates/components/spin/Spin.tsx`
> Sub-componentes: `SpinCapa`, `SpinMiolo`, `SpinCta`

## 1. Tema central
**Tema:** <ex: gestão sem dados / vendas sem CRM / fluxo de caixa>

## 2. Estrutura SPIN (6 slides, narrativa PAS)

| # | Tipo | Função | Conteúdo |
|---|---|---|---|
| 1 | SpinCapa | Hook | Frase forte + foto + frase em pílulas |
| 2 | SpinMiolo | Situação | 2-3 perguntas "Como você faz X hoje?" |
| 3 | SpinMiolo | Problema | 2-3 perguntas "E quando X falha?" |
| 4 | SpinMiolo (cardClaro) | Implicação | 2-3 perguntas "O que isso custa pro negócio?" |
| 5 | SpinMiolo | Necessidade | 2-3 perguntas "E se houvesse Y?" |
| 6 | SpinCta | Doma resolve + bordão | Texto + selo + LogoDoma |

## 3. Regra crítica
- **Doma NÃO aparece nos slides 1-5** — só no slide 6.
- Slides 1-5 = 100% sobre a DOR do empresário (perguntas em 2ª pessoa).

## 4. Voz
- 100% perguntas provocativas em 2ª pessoa nos slides 1-5.
- CTA no 6: bordão Doma + 1 frase de proposta.
- ❌ Afirmação no lugar de pergunta.
- ❌ Mais de 3 perguntas por slide (sobrecarrega).

## 5. Props
```ts
SpinCapa: {titulo: string; texto: string; foto: string}
SpinMiolo: {perguntas: string; cardClaro?: boolean}
SpinCta: {texto: string; destaque: string}
```

## 6. Validação + render
- [ ] `validador-marca`.
- [ ] Render lote: `node render-batch.mjs {{NOME}} 6`.
- [ ] Compare com POST 243 ou 251.
