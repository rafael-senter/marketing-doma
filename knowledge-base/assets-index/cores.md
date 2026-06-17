# Paleta Doma — cores medidas

⚠️ **Cores VARIAM por peça** — sempre amostrar pixel do modelo específico. Esta lista é só guia.

## Tokens canônicos

| Token | HEX | RGB | Uso típico |
|---|---|---|---|
| `manga` | `#F4BB35` | (244,187,53) | fundo dominante |
| `soft` | `#F8DD6B` | (248,221,107) | cards secundários, highlight título, faixa "ARRASTA" |
| `watermark` | `#F2B02C` | (242,176,44) | wm tom-sobre-tom (~5-7% MAIS ESCURA que manga) |
| `grafite` | `#1F1F1F` | (31,31,31) | texto, logo, selo |
| `grafite-alt` | `#212121` | (33,33,33) | variação do grafite |
| `branco` | `#FFFFFF` | (255,255,255) | cards de destaque, mockup |
| `claro` | `#EFEFEE` | (239,239,238) | card claro institucional (205 capa/fecho) |
| `wm-institucional` | `#EAAD32` | (234,173,50) | watermark institucional (mais visível) |

## Categorias com cores próprias medidas

### Dicas Carrossel (POST 246/133/193)
- Fundo: `#F4BB35`
- Soft: `#F8DD6B`
- Watermark capa: `#F2B02C` (medido em 246-1)
- Card branco corpo: `#FFFFFF`
- Texto grafite: `#1F1F1F`

### Inimigo em Comum (POST 244/252)
- Fundo: `#F4BB35`
- Watermark gigante: `#F5C24A` ou similar (medir por peça)
- Card branco: `#FFFFFF`
- Badge circular: `#1F1F1F`
- Card soft: `#F8DD6B`

### Certo e Errado (POST 247/256)
- Fundo: medir (varia entre `#F4BB35` e `#F6C655`)
- Watermark vertical "DO/MA": medir
- Badges: grafite + vermelho `#EF4639` / verde `#32BA7C` (se houver)

### Carrossel Clientes (POST 205)
- Fundo manga + watermark
- Card claro capa/fecho: `#EFEFEE`
- Cor de cada card de cliente: PRÓPRIA do cliente (recortada do modelo).

## Variações observadas

- Fundo "amarelo" varia entre `#F4BB35` (manga padrão) e `#F6C655` (mais claro) em algumas peças.
- Watermark institucional `#EAAD32` é mais visível que watermark de cards regulares `#F2B02C`.

## Como amostrar

```python
from PIL import Image
import numpy as np
a = np.array(Image.open('modelo.png').convert('RGB'))
# pixel exato dentro de letra da watermark
p = a[int(.10*H), int(.55*W)]
print(f"#{p[0]:02X}{p[1]:02X}{p[2]:02X}")
```

## Anti-padrões

- ❌ Reusar cor de outra peça sem medir (cada peça pode variar).
- ❌ Watermark MAIS CLARA que fundo (errado — deve ser MAIS ESCURA tom-sobre-tom).
- ❌ Fundo gradiente sem confirmar nos 4 cantos.

## Modos de fundo (do design-system)

- **Modo conteúdo (dia a dia)**: fundo AMARELO `#F4BB35` + texto/logo grafite.
- **Modo promoção (Semanaço)**: fundo GRAFITE `#212121` + destaque amarelo + texto branco.
