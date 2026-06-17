# Logos oficiais Doma — catálogo + uso

Todos os arquivos em `../../assets/oficial/` (sincronizados pro host via `sync-components.sh`).

## ⚠️ Regra absoluta
- **NUNCA recriar** logo/wordmark em fonte/SVG/CSS.
- SEMPRE usar PNG oficial (alpha transparente).
- **`DOM.a` NÃO existe** — não digitar em lugar nenhum.

## Wordmark horizontal (uso principal — header, rodapé)

| Arquivo | Cor | Uso |
|---|---|---|
| `logotipo-principal-cor.png` | amarelo manga | sobre fundo grafite/branco |
| `logotipo-principal-grafite.png` | grafite | sobre fundo manga/soft/claro |
| `logotipo-principal-branco.png` | branco (máscara) | usado em CSS mask + backgroundColor (watermark tingida) |

**Aspect ratio:** ~5.5:1 (1767 × 322 px na referência).

## Wordmark vertical (uso: watermark vertical, watermark "DO/MA")

| Arquivo | Cor |
|---|---|
| `logotipo-vertical-cor.png` | amarelo |
| `logotipo-vertical-grafite.png` | grafite |
| `logotipo-vertical-branco.png` | branco (mask) |

**Aspect ratio:** ~1.27:1.

## Selo circular (uso: CTA, fechamento, prova institucional)

| Arquivo | Uso |
|---|---|
| `selo-cor.png` | amarelo sobre grafite |
| `selo-grafite.png` | grafite sobre amber (mais comum) |
| `selo-branco.png` | branco sobre grafite |

Contém: "DOMINE A GESTÃO DO SEU NEGÓCIO · SOFTWARE PARA GESTÃO" texto curvo.

## Selo 14 anos (efêmero — 2024/2025)

`selo-14anos-1.png` ... `selo-14anos-4.png` — variantes do selo de aniversário.

## Sub-marcas (verticais oficiais)

| Arquivo | Vertical |
|---|---|
| `submarca-industria.png/.svg` | Indústria |
| `submarca-moda.png/.svg` | Moda |
| `submarca-pdv.png/.svg` | PDV |
| `submarca-textil.png/.svg` | Têxtil |
| `submarca-varejo.png/.svg` | Varejo |

Uso: bottom-bar dos cards verticalizados ("MODA MANAGER", "INDÚSTRIA MOBILE", etc).

## Complementos (uso decorativo)

| Arquivo | Descrição |
|---|---|
| `complemento-fundo-amarelo.png` | grafismo de fundo fora-de-quadro |
| `complemento-fundo-grafite.png` | mesmo, modo escuro |
| `complemento-principal-*.png` | grafismos da arte (3 variantes) |

## Taglines

| Arquivo | Disposição |
|---|---|
| `tagline-horizontal-cor.png` | tagline horizontal embaixo |
| `tagline-principal-cor.png` | tagline ao lado da logo |
| `tagline-vertical-cor.png` | tagline empilhada (story) |

## Como usar (Remotion)

### LogoDoma component (preferido)
```tsx
import {LogoDoma} from '../../components';

<LogoDoma cor="#1F1F1F" tamanho={64} wordmark />     // wordmark horizontal grafite
<LogoDoma cor="#1F1F1F" tamanho={64} />              // só símbolo M
```

### CSS mask (watermark tingida)
```tsx
<div style={{
  position: 'absolute', top: '4%', width: '100%', aspectRatio: '1767 / 322',
  backgroundColor: '#F2B02C',        // cor MEDIDA do modelo (mais ESCURA que fundo)
  WebkitMaskImage: `url(${staticFile('oficial/logotipo-principal-branco.png')})`,
  maskImage: `url(${staticFile('oficial/logotipo-principal-branco.png')})`,
  WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
  WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat'
}} />
```

### Watermark outline (2 masks empilhadas — RULES §18)
Ver `templates/components/clientes/Clientes.tsx` — `WatermarkOutline` component.

## Anti-padrões

- ❌ Usar `logotipo-principal-cor.png` (amarelo) **sobre fundo amarelo** — desaparece. Use `-grafite` ou `-branco`.
- ❌ Aplicar `mixBlendMode: multiply` no PNG da logo — distorce o "D" (vira fechado errado).
- ❌ Recolorir com `opacity` o PNG grafite pra "atenuar" — sai cinza, não a cor certa. Use `-branco` + `backgroundColor` (CSS mask).
- ❌ Esticar a logo (manter aspect ratio).
- ❌ Logo recriada em texto/fonte/SVG — não bate a forma oficial (M chevron, perna cortada, "a" minúsculo).
