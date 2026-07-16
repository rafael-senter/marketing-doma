# Zonas seguras do Instagram — regra de layout por formato

> Fonte: https://www.instagram.com/p/DD9lMPqpVTV (arte "Os tamanhos certos podem transformar seu conteúdo no Instagram") + prática. Registrado 2026-07-16 por ordem do Patrick.
> **Princípio:** a UI do Instagram cobre faixas do topo e da base (nome/perfil em cima; responder/DM/ícones embaixo). Conteúdo colocado ali NÃO é visto — derruba retenção. Todo elemento CRÍTICO (título, CTA, número, selo, logo) fica na ZONA SEGURA; zona morta só aceita decorativo (fundo, watermark, textura).

## Medidas por formato

| Formato | Canvas | Zona morta TOPO | Zona morta BASE | Zona segura central |
|---|---|---|---|---|
| **Story** | 1080×1920 | 250px (~13%) | 250px (~13%) | 1420px (y 250–1670) |
| **Reels (vídeo)** | 1080×1920 | 420px | 420px + coluna DIREITA de ícones (like/coment./share, ~120px) | evitar também canto inf-dir |
| **Capa Reels** | 1080×1920 | 420px | 420px | 1080px central (capa é cropada no grid) |
| **Carrossel** | 1080×1350 | 135px (~10%) | 135px (~10%) | 1080px (y 135–1215) |
| **Foto** | 1080×1350 | 135px | 135px | 1080px |
| **Foto perfil** | círculo 320px | — | — | manter logo/rosto no miolo |
| **Destaques** | círculo 400px | — | — | ícone centralizado |

## Regras abstraídas (aplicar em TODA peça)

1. **Crítico só na zona segura**: título, corpo, CTA, número grande, selo, logo — nunca nas faixas mortas.
2. **Decorativo pode vazar**: watermark, fundo, grafismo podem ocupar zona morta (dão sangria sem custo de retenção).
3. **Story: logo rodapé sobe** — `bottom ≥ 15%` (não os 5% do feed). Os 5% do feed caem na zona morta do story.
4. **Story: título abaixo de y250px** (top ≥ 14%).
5. **Reels: nada de CTA no canto inferior direito** (coluna de ícones cobre).
6. **Capa de reels: pensar no crop** — o essencial dentro do miolo 1080×1080 central (aparece cropada no grid).
7. **Carrossel/foto 4:5: margem crítica de ~10%** topo/base.
8. **Retenção**: hook/título no terço central-superior da zona segura (primeiro foco do olhar); CTA no fim da zona segura, nunca abaixo dela.
9. **Par post+story NÃO é resize**: redistribuir os elementos pras zonas seguras de cada formato (live-rule `2026-07-16-post-sempre-com-story.md`).
