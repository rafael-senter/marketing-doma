---
name: new-carrossel
description: "Atalho específico para carrossel (categorias: dicas-carrossel, spin, doma-carrossel-clientes). Gera scaffold de N slides + snippets de Still + plano lista de slides."
---

# `/new-carrossel <categoria> <nome> [N]` — carrossel rápido

Atalho que assume categoria de **carrossel** (≥ 6 slides). Wrapper sobre `/new-post`.

## Uso
```
/new-carrossel <categoria> <nome> [N-slides]
```

Exemplos:
- `/new-carrossel dicas-carrossel gestao-estoque 9`
- `/new-carrossel spin qualificacao-vendas 6`
- `/new-carrossel doma-carrossel-clientes lote-junho-2026 8`

## Categorias-carrossel
| Categoria | N padrão | Estrutura |
|---|---|---|
| `dicas-carrossel` | 9 | capa + 7 miolos + CTA |
| `spin` | 6 | capa + 4 SPIN + CTA |
| `doma-carrossel-clientes` | 8 | capa + 6 clientes + fecho |

## O que faz
- Roda `bash scripts/new-post.sh <cat> <nome>` (snippet ajustado pra N slides).
- Plano fica preparado com tabela slide-a-slide pronta pra preencher.

## Comandos relacionados
- `/marketing-doma` — fluxo guiado completo.
- `/render <prefix> <N>` — render lote (após preencher conteúdo).
