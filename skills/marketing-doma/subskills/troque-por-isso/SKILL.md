---
name: troque-por-isso
description: Carrossel "Troque isso / Por isso" — pares antes→depois em dois cards soft empilhados com tabs brancas. Capa com foto da loja do segmento + badge, N miolos de troca, fecho e CTA com watermark. Modelo POST 186. Use quando o usuário pedir "troque isso por isso", "carrossel de dicas práticas por troca", "antes e depois em cards", ou "post de dicas pro segmento X".
---

# Troque Isso / Por Isso

**Componente:** `../../../../templates/components/troque-por-isso/TroquePorIsso.tsx`
- `TrocaCapa` — título + foto do segmento + badge grafite + logo
- `TrocaMiolo` — 2 cards (TROQUE ISSO / POR ISSO) com tabs brancas; aceita lista ✅
- `TrocaFecho` — card único, texto à esquerda
- `TrocaCta` — 3 blocos ícone + texto sobre watermark DOMa gigante

**Ficha (fonte da verdade, com TODAS as medidas):** `../../../../knowledge-base/padroes/troque-por-isso.md`
📌 **Ler a ficha inteira antes de codar.** Ela tem 7 correções já pagas com erro — não redescobrir.

## Estrutura
| Slide | Função |
|---|---|
| 1 capa | Pergunta provocativa em 2ª pessoa + foto da loja + badge "Dicas que…" |
| 2..N-2 | Um par Troque/Por isso por slide (o modelo tem 6) |
| N-1 fecho | Virada: "não é X… é Y" |
| N CTA | Salve · Compartilhe · E conta pra gente |

## As armadilhas desta categoria (todas já custaram retrabalho)
1. **Negrito é peso 500**, nunca 700 (RULES §23).
2. **`lineHeight` em px fixo** (62/43/50), nunca relativo (RULES §24).
3. **Itálico por `skewX(-8.5deg)`**, nunca `fontStyle: italic` (RULES §25).
4. **Hierarquia**: nota/reforço fs 37 contra principal fs 54. Achatar isso mata o card.
5. **Gap 70px** entre blocos do card (90 no CTA).
6. **Borda branca 2px em tudo** — inclusive na foto da capa.
7. **Foto**: enquadramento aberto, preço em etiqueta impressa (nunca papelão manuscrito).

## Voz
- Capa: pergunta provocativa em 2ª pessoa ("Sua loja está X… ou Y?").
- Miolos: didático e concreto. O "Troque isso" descreve o hábito, sem julgar o lojista.
- Reforço: frase curta de consequência ("Desconto não paga estoque parado.").
- Doma aparece só no último miolo (checklist ✅) e some no fecho — o fecho é sobre o lojista.

## Quando usar
- Dicas práticas por segmento (ferragens, ótica, produtos naturais, autopeças…).
- Conteúdo que ensina uma troca de comportamento, não um conceito abstrato.

## Anti-padrões
- ❌ Faixa "ARRASTA PRO LADO" (não existe nesta categoria).
- ❌ Seta `SetaDoma` (não tem flecha direcional aqui).
- ❌ Bullets `–` / `›` / `•` — aqui é ✅ verde, e só no último miolo.
- ❌ Reforço do mesmo tamanho do texto principal.

## Props
```ts
type Bloco = {texto: string; fontSize?: number; lhPx?: number; italico?: boolean; bold?: boolean}
TrocaCapa:  {titulo: string; foto: string; badge: string[]; fontSizeTitulo?: number; topTitulo?: string}
TrocaMiolo: {troque: Bloco[]; porIsso: Bloco[]; lista?: string[]}
TrocaFecho: {paragrafos: string[]; fontSize?: number}
TrocaCta:   {blocos: string[]}
```

## Validação pós-render (obrigatória)
Comparar a lista de tops das linhas com a do modelo (~5px), conferir traço do bold (1.5× o regular)
e o ângulo do itálico (8-9°). Detalhe do método na ficha, §10.

## Próximos passos
1. Peça de referência: `POST-ferragens-troca` (plano em `templates/planos/`).
2. Implementar prop `story` (1080×1920) — ainda não existe nesta categoria.
