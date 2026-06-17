---
name: marketing-doma-extrair
description: "Guia interativo de extração de assets do manual PDF da Doma. Mostra páginas, pede coordenadas, extrai região, sugere nome + cor, atualiza catálogo, sync host. Fluxo conversacional pra leigo."
---

# `/marketing-doma-extrair` — extração assistida do manual PDF

Comando que **guia o usuário** (Patrick ou marketing) pela extração de assets novos do `doma-brand/manual/MANUAL_IDENTIDADE_DOMA.pdf` (51 páginas). Substitui rodar `scripts/extract-from-pdf.sh` na mão.

## Fluxo

### Passo 1 — Mostrar páginas disponíveis
```
Manual da Doma tem 51 páginas (renderizadas em doma-brand/manual/paginas/):
  pag-01 — capa
  pag-02-04 — universo visual
  pag-05-06 — anti-padrões
  pag-07-08 — paleta de cores
  pag-09 — tipografia TT Lakes
  pag-10-13 — assinatura visual (3 versões logo)
  pag-14-15 — área de proteção
  pag-16-17 — usos incorretos
  pag-18 — GRAFISMOS (símbolo M derivado)
  pag-19-21 — sub-marcas (Varejo/Moda/Indústria/PDV/Têxtil)
  pag-22 — iconografia (50 ícones)
  pag-23-30 — aplicações físicas (placa, polo, mockup)
  pag-31-50 — fotografia + aplicações digitais
  pag-51 — fim

Qual página quer extrair algo? (1-51)
```

### Passo 2 — Mostrar página escolhida (visual)
Carregar `doma-brand/manual/paginas/pag-NN.png` (reduzir se > 1500px) e mostrar inline. Usuário aponta região.

### Passo 3 — Pedir coordenadas OU descrição
- **Opção A** (preciso): "Cole coordenadas x,y,w,h" (ou "x1,y1 → x2,y2").
- **Opção B** (descrição): "Descreva o que quer extrair" → Claude tenta detectar (cor predominante + bbox).

### Passo 4 — Preview do crop
Mostrar PNG do crop. Confirmar.

### Passo 5 — Pedir metadata
- Nome (slug kebab-case).
- Categoria: oficial / grafismos / icones / fotos / cards-clientes.
- Cor predominante (se aplicável).
- Uso recomendado (frase curta).

### Passo 6 — Salvar + catalogar
1. Rodar `scripts/extract-from-pdf.sh --pdf ... --page NN --crop X,Y,W,H --name <slug> --destino assets/<cat>/`
2. Editar `scripts/build-catalog.py` (adicionar entry no dict apropriado).
3. Rebuild catalog.
4. Sync pro host.

### Passo 7 — Próximos passos
Mostrar como usar em componente (path host + exemplo).

## Anti-padrões

- ❌ Extrair região com texto baked (usuário tira "I am text" no print).
- ❌ Nomear sem padrão (espaços, acentos, caixa-alta).
- ❌ Catalogar sem metadata mínima (uso/categoria/cor).
- ❌ Pular sync — asset extraído fica só no plugin, host não vê.

## Quando usar este comando vs outros

| Cenário | Comando |
|---|---|
| Asset NOVO do manual oficial | `/marketing-doma-extrair` (este) |
| Asset criado FORA do manual (foto cliente, mockup gerado) | sub-skill `asset-ingester` |
| Catálogo atualizar manualmente | `python scripts/build-catalog.py` |
| Wizard cliente novo | `python scripts/wizard-cliente.py` |

## Scripts relacionados
- `scripts/extract-from-pdf.sh` — backend de extração.
- `scripts/build-catalog.py` — catálogo.
- `scripts/sync-components.sh` — sync.
