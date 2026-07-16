# Render de STORY exige dimensões explícitas no render-still.sh

**Data:** 2026-07-16
**Descoberto em:** POST rede-lojas (stories saíram esmagados)
**Sintoma:** `render-still.sh <id>-story` sem argumentos redimensiona o PNG final pra **1080×1350 (default)** — o story 1080×1920 é ESMAGADO verticalmente (1.42×) de forma silenciosa. Visualmente "parece ok" mas está distorcido.
**Regra:** story SEMPRE renderiza com dims explícitas:
```bash
bash remotion-doma/render-still.sh <id>-story 1080 1920
```
Validar depois: `python3 -c "from PIL import Image; print(Image.open('out/<id>-story.png').size)"` → deve ser (1080, 1920).
**Aplicar em:** toda peça story (live-rule post-sempre-com-story), todas as categorias.
