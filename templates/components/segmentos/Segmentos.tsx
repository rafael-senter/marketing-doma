import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';

/**
 * CATEGORIA "SEGMENTOS" — recriação medida do modelo POST 234 (loja de material de construção).
 * Estrutura (medição pixel, jul/2026):
 *   1. FOTO full-bleed do segmento (object-fit cover) — TROCÁVEL via prop `foto`.
 *   2. Card MANGA #F4BB35: x124–956 (L11.48% W77.04%), y0–959 (H71.04%),
 *      topo COLADO no canvas, radius ~100 SÓ EMBAIXO (0 0 100 100).
 *   3. Wordmark DOMa SOFT #F8DD6B por cima de tudo: top 0, left 0, width 100%
 *      (aspect 1767/322 → altura 197px — bate exato com a medição do modelo).
 *      Fora do card a wordmark aparece sobre a FOTO (sangrada) — intencional.
 *   4. Texto grafite #212121 centralizado no card, deslocado pra baixo do centro
 *      (bloco medido y335–831; card center 480, bloco center 583).
 *      Padrão: linha regular → 2 linhas BOLD grandes → CAPS SUBLINHADAS → regular.
 *   5. SEM logo no rodapé (a wordmark DOMa do topo é a marca da peça).
 * Tipografia medida: regular ~64px (cap 47), bold ~76px (stroke 13px = pesado),
 * caps sublinhadas mesmo tamanho do regular, lineHeight ~1.16, sublinhado ~3px
 * colado ~10px abaixo da baseline.
 */
const C = {manga: '#F4BB35', soft: '#F8DD6B', grafite: '#212121'};
const F = brand.fontes.titulo;
const maskUrl = `url(${staticFile('oficial/logotipo-principal-branco.png')})`;

// ── mini-parser de linha: **bold** e __sublinhado__ (caps escritas direto no texto)
const Segmento: React.FC<{s: string; bold: boolean; sub: boolean}> = ({s, bold, sub}) => (
  <span style={{
    fontWeight: bold ? 700 : 400,
    ...(sub ? {textDecoration: 'underline', textUnderlineOffset: '0.14em', textDecorationThickness: 3} : {}),
  }}>{s}</span>
);

const Linha: React.FC<{texto: string; fontSize: number}> = ({texto, fontSize}) => {
  const parts = texto.split(/(\*\*[^*]+\*\*|__[^_]+__)/g).filter(Boolean);
  return (
    <div style={{fontSize, lineHeight: 1.16, textAlign: 'center', whiteSpace: 'nowrap'}}>
      {parts.map((p, i) => {
        const bold = p.startsWith('**');
        const sub = p.startsWith('__');
        return <Segmento key={i} s={p.replace(/^(\*\*|__)|(\*\*|__)$/g, '')} bold={bold} sub={sub} />;
      })}
    </div>
  );
};

export type SegmentosProps = {
  /** path relativo ao public/ da foto de fundo do segmento (trocável) */
  foto: string;
  /** linhas do texto, uma por item. Markup: **bold** e __sublinhado__ (caps direto no texto). */
  linhas: string[];
  /** por linha: 'regular' | 'bold' (bold = fontSize maior, medido no modelo) */
  tamanhos?: ('regular' | 'bold')[];
  story?: boolean;
};

export const Segmentos: React.FC<SegmentosProps> = ({foto, linhas, story}) => {
  const fsRegular = story ? 70 : 64;
  const fsBold = story ? 92 : 84;
  return (
    <AbsoluteFill style={{
      fontFamily: F, overflow: 'hidden', color: C.grafite,
      WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision',
    }}>
      {/* 1. foto full-bleed (trocável) */}
      <Img src={staticFile(foto)} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />

      {/* 2. card manga — topo colado, radius só embaixo */}
      <div style={{position: 'absolute', left: '11.5%', top: 0, width: '77%',
        height: story ? '62%' : '71%',
        background: C.manga, borderRadius: '0 0 100px 100px', zIndex: 1}} />

      {/* 3. wordmark DOMa soft — width 100%, top 0 (aspect exato do arquivo → h197) */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%',
        aspectRatio: '1767 / 322', backgroundColor: C.soft,
        WebkitMaskImage: maskUrl, maskImage: maskUrl,
        WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', zIndex: 2}} />

      {/* 4. bloco de texto — no feed começa y335 (24.8%); story desce pra zona segura */}
      <div style={{position: 'absolute', left: '11.5%', width: '77%',
        top: story ? '17%' : '24.8%', zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {linhas.map((l, i) => (
          <Linha key={i} texto={l} fontSize={/\*\*/.test(l) ? fsBold : fsRegular} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
