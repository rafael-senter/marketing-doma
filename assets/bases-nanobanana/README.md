# Catálogo — `assets/bases-nanobanana/`

Bases fotorrealistas geradas via [nanobanana-skill](../../knowledge-base/) (Gemini Imagen).

Cada base = device (mão+iPhone / laptop / produto) + tela do ERP Doma. Overlays Remotion vetoriais por cima (texto nunca baked).


**Reuso:** clonar pra peça similar trocando overlays — base NÃO é editável trivialmente (regerar via nanobanana se precisar mudar device/tela).


| Arquivo | POST | Categoria | Device | Tela | Dims | Tamanho | Reusar em |
|---|---|---|---|---|---|---|---|
| `_doma115-base.png` | POST 115 | doma-institucional | phone | menu Doma (institucional) | 1856×2304 | 3810.7 KB | peças institucionais mobile |
| `_doma257-base.png` | POST 257 | doma-institucional | notas R$ | notas de dinheiro fotorrealistas | 1856×2304 | 5143.6 KB | peças com tema dinheiro/lucro/financeiro |
| `_func127-base.png` | POST 127 | funcoes-sistema | mão+iPhone | dashboard ERP Doma | 1856×2304 | 3520.2 KB | outras peças com tema 'mobile ERP' |
| `_func201-base.png` | POST 201 | funcoes-sistema | mão+iPhone | WhatsApp + ERP | 1856×2304 | 3773.5 KB | peças sobre integração WhatsApp/atendimento |
| `_func207-base.png` | POST 207 | funcoes-sistema | mão+iPhone | tela ERP | 1856×2304 | 3434.0 KB | peças mobile ERP |
| `_func248-base.png` | POST 248 | funcoes-sistema | laptop | dashboard financeiro | 1856×2304 | 3794.1 KB | peças desktop/dashboard |
| `_func266-base.png` | POST 266 | funcoes-sistema | mão+iPhone | tela ERP | 1856×2304 | 3524.2 KB | peças mobile ERP |
| `_func273-base.png` | POST 273 | funcoes-sistema | laptop | dashboard ERP | 1856×2304 | 3367.1 KB | peças desktop ERP |
| `_funcinadimplencia-base.png` | POST inadimplencia (2026-07-16) | funcoes-sistema | notebook (MacBook-like) | Painel de Inadimplência (Dashboard Financeiro, ERP Doma Indústria) | 2304×1856 | 1585.8 KB | peças desktop ERP financeiro/inadimplência |
| `motiva-controla-feed.png` | ? | ? | ? | ? | 1080×1350 | 1944.0 KB | ? |
| `motiva-controla-story.png` | ? | ? | ? | ? | 1080×1920 | 2730.8 KB | ? |

## Como usar

Em `FuncoesSistemaProps` (ou `Doma115`/`Doma257`):

```tsx
<FuncoesSistema base='oficial/_func127-base.png' ... />
```

Sync via `scripts/sync-components.sh` copia plugin → host (`remotion-doma/public/oficial/`).

