# Catálogo — `assets/fontes/`

TT Lakes (oficial da marca). Carregada via `@font-face` em `remotion-doma/public/fontes/`.


| Arquivo | Peso | Uso |
|---|---|---|
| `TTLakes-Black.ttf` | 900 | Título gigante (fontSize 78+), número grande de header. |
| `TTLakes-Bold.ttf` | 700 | Palavra-chave dentro de frase, badge, sub-card. |
| `TTLakes-DemiBold.ttf` | 600 | Kicker / legenda pequena. NÃO usar como bold em corpo (vira pesado demais). |
| `TTLakes-ExtraBold.ttf` | 800 | Título principal, palavra-chave de impacto. |
| `TTLakes-Medium.ttf` | 500 | Variante média — raramente usada. |
| `TTLakes-Regular.ttf` | 400 | Corpo de texto — DEFAULT. Sem bold. |

## Configuração Remotion (em theme.ts)

```ts
export const brand = { fontes: { titulo: 'TT Lakes', corpo: 'TT Lakes' } };
```


## Anti-padrões

- ❌ Fallback do sistema (Arial/Helvetica) — fonte fica errada.

- ❌ Corpo todo em bold ('tudo bold' anula contraste).

- ❌ Kicker em 700 (manual diz 600 SemiBold).

