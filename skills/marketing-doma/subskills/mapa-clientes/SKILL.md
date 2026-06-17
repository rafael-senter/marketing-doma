---
name: mapa-clientes
description: Card único com mapa do Brasil + selo "X% de clientes" + legenda. Estados em amarelo soft sobre card branco. Modelo de referência DSdIG_FkuI4_2. Use quando o usuário pedir "mapa do Brasil", "cobertura nacional", "selo % clientes".
---

# Mapa de Clientes

**Componente:** `remotion-doma/src/v2/categorias/mapa-de-clientes/MapaClientes.tsx`
**ID Still:** `padrao-mapa-clientes`
**Ficha completa:** `../../../knowledge-base/padroes/mapa-clientes.md`

## Padrão visual
- Fundo amber + watermark sutil.
- Card branco grande central com mapa SVG do Brasil (estados soft `#F8DD6B`, DF cinza).
- Selo circular ou pílula com "+ X% DE CLIENTES" sobreposto.
- Legenda abaixo do card (estados-chave: PE/AL/ES/RJ etc, posicionados FORA do contorno quando o modelo desloca).
- Logo DOMa rodapé.

## Particularidade
- Mapa SVG em `meet` ENCOLHE — setar `width`/`height` p/ PREENCHER o bbox alvo, não confiar no nominal (medir).
- Rótulos de estado: posição via transformação do canvas → viewBox SVG (`vx=(px−L)/S`).
- Fonte do selo: cap-height + letterSpacing separados (RULES §17).

## Voz
- Institucional, prova social ("a Doma está em N estados", "+ X% de cobertura").

## Quando usar
- Prova social geográfica, anúncio de cobertura, marco de crescimento.

## Anti-padrões
- ❌ Mapa preenche viewBox sem medir (fica menor que o esperado).
- ❌ Rótulos só dentro do contorno (alguns estados modelo desloca pra fora).

## Próximos passos
1. Variar % na pílula.
2. Mapear com região destacada (NE, SUL).
