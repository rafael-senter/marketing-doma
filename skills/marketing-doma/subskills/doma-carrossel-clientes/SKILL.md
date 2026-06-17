---
name: doma-carrossel-clientes
description: Carrossel institucional de clientes — capa + N cards com logo de cliente (recortado do modelo) + fecho. Modelo POST 205. Use quando o usuário pedir "carrossel de clientes", "showcase de logos", "prova social com logos".
---

# Doma / Carrossel Clientes

**Componente:** `../../../../templates/components/doma-carrossel-clientes/CarrosselClientes.tsx`
- `ClientesCapa` — slide 1 (institucional + grafismos + frase)
- `ClientesMiolo` — slides 2-N ({card, texto}) — logo+card recortados do modelo
- `ClientesFecho` — slide final

**Ficha:** `../../../knowledge-base/padroes/doma-carrossel-clientes.md`

## Padrão visual

### Capa
- Grafismos extraídos do modelo (`_205-graf1.png`) — content pintado de amber → sobra decoração.
- Logo DOMa wordmark sup-esq (tamanho 70).
- Card claro L9.4% T26.5% W81.1% H42.6% raio 40 — fontSize 58 (bate 6 linhas do modelo).
- Texto solto inferior L22.1% T77.3% W38.3% (fontSize 44, 4 linhas).

### Miolos (cada slide = 1 cliente)
- **Card do cliente recortado inteiro** (logo + cor + cantos) L9.4% T10% W81.1% H42.6% (objectFit fill).
- Texto corrido embaixo (fontSize 46, bold no nome do cliente E em DOMa).

### Fecho
- Grafismos extraídos + card claro com fecho.

## ⚠️ Regra crítica
**Logo do cliente NUNCA recriado.** SEMPRE recortar do modelo:
- Recorta card colorido inteiro (logo + cor + cantos baked) → coloca como `<Img>` no mesmo rect %.
- Receita: "recorte = colocação" → fidelidade alta automática.

## Voz
- Institucional. "X faz parte do time", "Doma cresce com vocês".

## Quando usar
- Aniversário, atestado de prova social, lote de boas-vindas.

## Anti-padrões
- ❌ Recriar logo do cliente em fonte/SVG (proibido — RULES §1 + §6).
- ❌ Cor do card hard-coded de outro cliente (cada cliente tem cor própria — recortar do modelo dele).

## Props
```ts
ClientesMiolo: {card: string; texto: string}
```

## Próximos passos
1. Adicionar slide novo (recortar do modelo do cliente novo).
2. Variar fecho (institucional ↔ CTA).
