# REFERÊNCIA — recursos do Remotion para posts estáticos da Doma

Fonte: repo oficial clonado em `_ref/remotion/` (docs em `packages/docs/docs/`).
Objetivo: usar o Remotion no seu potencial — não só `<div>` cru. Tudo aqui é para
**still 1080×1350** (imagem de feed), não vídeo.

## Pacotes instalados no projeto (4.0.468)
`remotion`, `@remotion/cli`, `@remotion/fonts`, `@remotion/google-fonts`,
`@remotion/shapes`, `@remotion/layout-utils`, `@remotion/paths`, `@remotion/media-utils`.

---

## 0. REGRA DE RENDER (anti-franja) — usar SEMPRE
`remotion still` em scale 1 deixa **franja cromática sub-pixel** nas bordas do texto
(o "texto torto"). Solução comprovada: renderizar em `--scale 2` e reduzir com Lanczos.
```bash
node render-still.mjs <id-do-still>      # faz scale2 + downscale Lanczos → out/<id>.png
```
Detalhes e medições em `RULES-recriacao.md §8`.

---

## 1. @remotion/layout-utils — ajuste de texto (o que mais faltava)
Evita "texto estourando o card" e o chute de fontSize. **Usar em todo card com texto variável.**

```tsx
import {fitText, measureText, fillTextBox} from '@remotion/layout-utils';

// (a) maior fontSize que cabe numa largura:
const {fontSize} = fitText({text: 'GERAM LUCRO', withinWidth: 320,
  fontFamily: 'TT Lakes', fontWeight: '800'});

// (b) medir largura/altura de um texto (p/ posicionar, alinhar, badge):
const {width, height} = measureText({text: 'CERTO', fontFamily: 'TT Lakes',
  fontSize: 29, fontWeight: '600'});

// (c) detectar overflow em multi-linha (card com N linhas máximas):
const box = fillTextBox({maxBoxWidth: 320, maxLines: 4});
box.add({text: 'volume de vendas', fontFamily: 'TT Lakes', fontSize: 38});
// box.exceedsBox === true se não couber
```
**Importante:** a fonte precisa estar carregada antes de medir (com `@remotion/fonts`,
o `loadFont` já bloqueia o render; com google-fonts use `waitUntilDone()`).

## 2. @remotion/shapes — formas SVG prontas (badges, selos, setas)
Em vez de `<div borderRadius:'50%'>`, usar shapes vetoriais (escalam sem perda no scale 2):
```tsx
import {Circle, Rect, Triangle, Star, Pie, Ellipse} from '@remotion/shapes';

<Circle radius={43} fill="#EF4639" />                       // badge
<Rect width={386} height={512} cornerRadius={30} fill="#F8DD6B" />  // card
<Star points={5} innerRadius={40} outerRadius={90} fill="#F4BB35" />// selo/destaque
<Triangle length={60} direction="right" fill="#212121" />   // seta/bullet
```
Versões de função: `makeCircle()`, `makeRect()` → retornam `{path, width, height}` p/ usar em `<svg><path/></svg>`.

## 3. @remotion/paths — manipular SVG path (ilustrações, seta custom, "M" da marca)
```tsx
import {parsePath, scalePath, translatePath, serializeInstructions, getLength} from '@remotion/paths';
const p = serializeInstructions(scalePath(parsePath('M0 0 L10 10'), 2));
```
Usar quando precisar de um traço vetorial específico (ex.: seta com ponta arredondada).
Para ilustrações complexas (celular 3D, mockup) → NÃO usar paths; gerar imagem (nanobanana) — ver `RULES §6`.

## 4. @remotion/media-utils — dimensões de imagem
```tsx
import {getImageDimensions} from '@remotion/media-utils';
const {width, height} = await getImageDimensions(staticFile('mockups/pdv.png'));
```
Útil p/ encaixar mockup/foto sem distorcer (calcular aspect ratio).

## 5. Núcleo `remotion` (still)
- `<AbsoluteFill>` — camada full-bleed (fundo, overlay). Empilhar com `zIndex`.
- `<Img src={staticFile('...')} />` — **sempre** para imagem; usa `delayRender` interno
  (espera carregar antes do still). Nunca usar `<img>` cru.
- `staticFile('pasta/arquivo.png')` — resolve assets de `public/`.
- `<Still id component width height defaultProps />` (em Root.tsx) — registra a peça.
- Para asset/cálculo assíncrono próprio: `delayRender()` + `continueRender()`.

## 6. @remotion/effects — efeitos visuais (WebGL) p/ fundos/destaques
```tsx
import {glow} from '@remotion/effects/glow';
import {vignette} from '@remotion/effects/vignette';
import {blur, brightness} from '@remotion/effects/blur';
// aplicar em <Img>/<Solid> via prop effects={[...]}
```
- `glow()` — halo em badge/destaque.
- `vignette()` — escurecer bordas de foto de fundo (profundidade).
- `blur()` — desfoque seletivo (ex.: fundo atrás do recorte 3D da pessoa).
*(instalar `@remotion/effects` se for usar; requer WebGL no render.)*

## 7. @remotion/noise — textura sutil de fundo
`noise2D(seed, x, y)` → 0..1. Para granulado leve sobre o amarelo (se algum modelo tiver).

---

## OS RECURSOS QUE MAIS AUMENTAM FIDELIDADE (e não usávamos)
1. **`fitText`/`measureText`/`fillTextBox`** — fim do texto estourado e do fontSize chutado. Casar nº de linhas do modelo.
2. **`--scale 2` + Lanczos** (`render-still.sh`) — mata a franja do texto. **Obrigatório.**
3. **`@remotion/shapes`** — badges/cards/setas como vetor (mais nítido no scale 2 que `<div>`).
4. **`<Img>`/`getImageDimensions`** — mockups e fotos sem distorção e sem flicker.
5. **`effects` (glow/vignette/blur)** — profundidade em fotos e destaques, e o desfoque do efeito 3D da pessoa.
6. **`@remotion/paths`** — traços vetoriais específicos quando shapes prontas não bastam.

> Regra prática: elemento geométrico simples → `@remotion/shapes`. Texto variável → `layout-utils`.
> Ilustração/3D/mockup realista → imagem gerada (nanobanana) + `<Img>`. Foto → `<Img>` + `effects`.
