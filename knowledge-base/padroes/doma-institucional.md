# Padrão de Post — "Doma (institucional)" (Doma)

> ✅ **POST 115, 178, 257, 271 RECRIADOS (4/4)** — `remotion-doma/src/v2/categorias/doma-institucional/DomaInstitucional.tsx`.
> Modelos: `tipos-de-posts/.../Doma/POST *.png`.

Cards institucionais da marca. Canvas 1080×1350. Cores: manga `#F4BB35` · soft `#F8DD6B` ·
grafite `#1F1F1F` · branco `#FFF` · watermark `#EAAD32`.

## 2 sub-tipos (4 componentes bespoke)
### Tipográficos (code-only, sem device) — `Doma178`, `Doma271`
- **Frame grafite** (178: x[20-78%] y[18-82%]) + ícone branco em balão (gráfico subindo, SVG) +
  texto. Tudo vetorial, sem imagem externa.
- `IconeGrafico`: balão branco `borderRadius 50% 50% 50% 8%` + barras grafite + seta manga subindo (SVG).

### Com base nanobanana — `Doma115` (phone+menu), `Doma257` (notas R$)
- Base fotorrealista nanobanana (mesmo pipeline de [[funcoes-sistema]]) + overlays Remotion.

## Reaproveitável
- **Code-only quando o post é puramente tipográfico/geométrico** (frame + ícone SVG) — não precisa nanobanana.
- **Ícone "gráfico subindo" em balão** = SVG reaproveitável (barras + seta manga).
- Watermark institucional `#EAAD32` (mais visível que o `#F5C24A`/`#F6C85D` de outras categorias — medir por post).
