# Remotion — cheat-sheet pra contexto Marketing Doma

Resumo das APIs que aparecem nos componentes do plugin (`templates/components/`). Não substitui a [docs oficial](https://www.remotion.dev/docs) — é referência rápida pro nosso uso (peças estáticas vertical 1080×1350).

## ⚡ Quando precisar de detalhe profundo
Invoque a **skill `remotion-best-practices`** (já instalada no Claude Code):
```
/remotion-best-practices <questão>
```
Cobre: composições, hooks, performance, embed de fontes, render CLI, troubleshooting.

## APIs usadas no plugin

### `<AbsoluteFill>` — container raiz
```tsx
import {AbsoluteFill} from 'remotion';

<AbsoluteFill style={{backgroundColor: '#F4BB35', fontFamily: 'TT Lakes'}}>
  {/* conteúdo */}
</AbsoluteFill>
```
- Substitui `<div style={{position:'absolute', inset:0}}>` boilerplate.
- 100% do canvas Remotion (1080×1350 no nosso caso).

### `<Img>` + `staticFile()` — imagens
```tsx
import {Img, staticFile} from 'remotion';

<Img src={staticFile('oficial/logotipo-principal-branco.png')}
     style={{position: 'absolute', left: '10%', top: '5%', width: '20%'}} />
```
- `staticFile('X')` resolve pra `remotion-doma/public/X` em runtime.
- Path SEM prefixo `/` — `oficial/...` não `/oficial/...`.

### `<Still>` — registra peça
```tsx
import {Still} from 'remotion';

<Still id="meu-post-1" component={MeuComponente as never}
  width={vertical.largura} height={vertical.altura}
  defaultProps={{titulo: 'Texto'}} />
```
- ID = nome usado em `render-still.sh <id>`.
- `width/height` do `brand.formato.vertical` (1080×1350).
- `defaultProps` passa pros props do componente.

### CSS Mask — tingir PNG branco
Watermark, ícones bicolor, símbolo M:
```tsx
<div style={{
  backgroundColor: '#F2B02C',  // cor desejada
  WebkitMaskImage: `url(${staticFile('oficial/logotipo-principal-branco.png')})`,
  maskImage: `url(${staticFile('oficial/logotipo-principal-branco.png')})`,
  WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
  WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
  width: '100%', aspectRatio: '1767 / 322'
}} />
```
- Asset `-branco.png` = alpha mask. `backgroundColor` = cor real.
- Funciona pra QUALQUER cor sem regerar PNG.

### Anti-franja (regra absoluta)
SEMPRE renderizar via `render-still.sh` (scale 2 → Lanczos):
```bash
bash remotion-doma/render-still.sh <id>
```
- Render direto (`npx remotion still scale 1`) → franja sub-pixel = "texto torto".
- `--scale 2` + downscale Lanczos com PIL fundem os sub-pixels.

### Container CSS anti-franja
Todo componente raiz inclui:
```tsx
<AbsoluteFill style={{
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  textRendering: 'geometricPrecision',
  fontFamily: brand.fontes.titulo,
  // ...
}}>
```

## APIs NÃO usadas (vídeo — fora do escopo)

Peças do marketing-doma são **stills** (1 frame PNG). Não usar:
- ❌ `useCurrentFrame()` — só faz sentido em vídeo.
- ❌ `<Sequence>`, `<Series>` — composição temporal.
- ❌ `spring()`, `interpolate()` — animação.
- ❌ `<Video>`, `<Audio>`, `<OffthreadVideo>` — mídia temporal.

Se futuramente precisar de **carrossel animado MP4** (transições entre slides), aí sim invocar `remotion-best-practices` pra orientar.

## Estrutura típica de componente Doma

```tsx
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico} from '../../../components';

const C = {manga: '#F4BB35', soft: '#F8DD6B', grafite: '#1F1F1F'};
const F = brand.fontes.titulo;

const baseFill = {
  fontFamily: F, overflow: 'hidden' as const,
  WebkitFontSmoothing: 'antialiased' as const,
  MozOsxFontSmoothing: 'grayscale' as const,
  textRendering: 'geometricPrecision' as const,
};

export type MeuPostProps = { titulo: string };

export const MeuPost: React.FC<MeuPostProps> = ({titulo}) => (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    {/* watermark, cards, texto, logo... */}
    <TextoRico style={{color: C.grafite, fontSize: 50, fontWeight: 400}}>
      {titulo}
    </TextoRico>
  </AbsoluteFill>
);
```

## Links externos
- [Docs oficial Remotion](https://www.remotion.dev/docs)
- [API reference](https://www.remotion.dev/docs/api)
- [Migration guides](https://www.remotion.dev/docs/migration) (quando atualizar versão)
- [Skill `remotion-best-practices`](#) — instalada no Claude Code (built-in)

## Por que NÃO empacotamos o repo Remotion inteiro

Analisado em 2026-06-17: `github.com/remotion-dev/remotion` tem `.claude/skills/`, `.agents/`, `CLAUDE.md`, `AGENTS.md` — TODOS focados no **desenvolvimento INTERNO** do Remotion (add-cli-option, fix-dependabot, release, build com bun/bunx). NÃO úteis pra usuário final criando vídeos/peças.

Conteúdo aproveitável já está embarcado:
- **Skill `remotion-best-practices`** (built-in do Claude Code).
- Este cheat-sheet (APIs no nosso contexto).
- `templates/components/` (18 componentes Remotion validados).
- `templates/components/_base/theme.ts` + `components.tsx` (LogoDoma, TextoRico, SeloDoma).

Empacotar repo inteiro = bloat sem retorno.
