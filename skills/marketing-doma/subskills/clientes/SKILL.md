---
name: clientes
description: Card "novo cliente" — foto da loja + pílula com cidade + texto "A <Cliente> agora faz parte do time de clientes da DOMa". Modelo LAYOUT CLIENTE NOVO. Use quando o usuário pedir "anunciar novo cliente", "loja entrou", "boas-vindas cliente", "card de cliente".
---

# Cliente Novo

**Componente:** `remotion-doma/src/v2/categorias/clientes/Clientes.tsx`
**IDs:** `padrao-clientes`, `padrao-clientes-2`
**Ficha:** `../../../knowledge-base/padroes/clientes.md`

## Padrão visual
- Fundo manga + watermark "DOMa" outline (técnica de 2 CSS masks, RULES §18).
- Card foto arredondado (L6.3% T10.1% W87.3% H55.1% raio 40).
- **Pílula localização** grafite centralizada sobre a base da foto: pin SVG branco (gota com furo grafite) + "Cidade/UF".
- Texto 3 linhas (fontSize 64, nome do cliente em **bold**, "DOMa" = LogoDoma).
- Rodapé "DOMINE A GESTÃO DO SEU NEGÓCIO".

## Props
```ts
type Props = {foto: string; nome: string; cidade: string};
```

## Voz
- Acolhedora, factual. "A {nome} agora faz parte do time de clientes da DOMa".

## Quando usar
- Boas-vindas a cliente novo.
- Carrossel de clientes ativos.

## Anti-padrões
- ❌ Logo do cliente no card (este padrão usa FOTO da loja, não logo). Para logos → `doma-carrossel-clientes`.
- ❌ Pin com fonte/emoji (usar SVG).
- ❌ Recriar wordmark "DOMa" em fonte — sempre `<LogoDoma>`.

## Próximos passos
1. Lote de N clientes (1 still por cliente).
2. Combinar com prova social numérica (`mapa-clientes`).
