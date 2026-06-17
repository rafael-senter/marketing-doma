import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico} from '../../../components';

/**
 * PADRÃO "DICAS / ÓTICA" (v2) — POST 133 (9 slides, antes/depois de vitrine).
 * Sistema (fotos de terceiros = recortes _133-*.jpg extraídos do modelo, NUNCA recriadas):
 *   - OticaCapa      : título + 2 fotos (TROQUE ISSO / POR ISSO) + seta + pílula CTA + logo.
 *   - OticaAntesDepois: 2 fotos emolduradas + 2 pílulas + texto comparativo (X) + nota opcional.
 *   - OticaFullFoto  : foto full-bleed + card (soft|grafite) c/ título+corpo (posição via props).
 *   - OticaCta       : card soft + "Você já faz isso?" + corpo + watermark DOMa (CSS mask).
 * Cores: manga #F4BB35 · soft #F8DD6B · grafite #1F1F1F · branco #FFF.
 */
const C = {manga: '#F4BB35', soft: '#F8DD6B', grafite: '#1F1F1F', branco: '#FFFFFF'};
const F = brand.fontes.titulo;
const RAD = 28;
const maskUrl = `url(${staticFile('oficial/logotipo-principal-branco.png')})`;

const baseFill = {
  fontFamily: F, overflow: 'hidden' as const,
  WebkitFontSmoothing: 'antialiased' as const, MozOsxFontSmoothing: 'grayscale' as const,
  textRendering: 'geometricPrecision' as const,
};

type Box = {src: string; l: number; t: number; w: number; h: number};
const Foto: React.FC<{b: Box; z?: number}> = ({b, z = 1}) => (
  <Img
    src={staticFile(b.src)}
    style={{position: 'absolute', left: `${b.l}%`, top: `${b.t}%`,
      width: `${b.w}%`, height: `${b.h}%`, objectFit: 'cover', borderRadius: RAD, zIndex: z}} />
);

const Pilula: React.FC<{texto: string; l: number; t: number; w: number; dark?: boolean}> = ({texto, l, t, w, dark}) => (
  <div style={{position: 'absolute', left: `${l}%`, top: `${t}%`, width: `${w}%`, height: '3.6%',
    background: dark ? C.grafite : C.soft, color: dark ? C.branco : C.grafite, fontSize: 22, fontWeight: 700,
    letterSpacing: 0.5, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3}}>{texto}</div>
);

/* ─────────────────────────  CAPA (slide 1)  ───────────────────────── */
export const OticaCapa: React.FC = () => (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    <div style={{position: 'absolute', left: '9%', top: '8%', width: '64%', zIndex: 2,
      color: C.grafite, fontSize: 52, fontWeight: 700, lineHeight: 1.12}}>
      Lojista,<br />faça <span style={{textDecoration: 'underline', textUnderlineOffset: 5}}>trocas inteligentes</span><br />em sua ótica
    </div>
    <Foto b={{src: 'oficial/_133-s1a.jpg', l: 3.5, t: 31.6, w: 45.4, h: 48.5}} />
    <Foto b={{src: 'oficial/_133-s1b.jpg', l: 51.1, t: 31.6, w: 45.2, h: 48.3}} />
    <Pilula texto="TROQUE ISSO" l={3.7} t={40.3} w={21.9} />
    <Pilula texto="POR ISSO" l={74.2} t={40.3} w={21.9} />
    {/* seta entre as fotos */}
    <div style={{position: 'absolute', left: '46.5%', top: '49%', width: 64, height: 64, borderRadius: '50%',
      border: `3px solid ${C.grafite}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: C.grafite, fontSize: 34, fontWeight: 700, background: C.manga, zIndex: 4}}>→</div>
    {/* pílula CTA inferior */}
    <div style={{position: 'absolute', left: '50%', top: '82.5%', transform: 'translateX(-50%)',
      background: C.grafite, color: C.branco, fontSize: 28, fontWeight: 700, borderRadius: 40,
      padding: '16px 34px', zIndex: 3, whiteSpace: 'nowrap'}}>para chamar mais atenção!</div>
    <div style={{position: 'absolute', right: '6%', bottom: '4.5%', zIndex: 4}}>
      <LogoDoma cor={C.grafite} tamanho={58} wordmark />
    </div>
  </AbsoluteFill>
);

/* ─────────────────────  ANTES / DEPOIS (slides 2-4)  ───────────────── */
export type AntesDepoisProps = {
  fotoA: Box; fotoB: Box; pilA: {l: number; t: number}; pilB: {l: number; t: number};
  compara: {texto: string; l: number; t: number; w: number};
  nota?: {texto: string; l: number; t: number; w: number};
};
export const OticaAntesDepois: React.FC<AntesDepoisProps> = ({fotoA, fotoB, pilA, pilB, compara, nota}) => (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    <Foto b={fotoA} />
    <Foto b={fotoB} />
    <Pilula texto="TROQUE ISSO" l={pilA.l} t={pilA.t} w={21.9} />
    <Pilula texto="POR ISSO" l={pilB.l} t={pilB.t} w={16.8} />
    <div style={{position: 'absolute', left: `${compara.l}%`, top: `${compara.t}%`, width: `${compara.w}%`, zIndex: 2}}>
      <TextoRico style={{color: C.grafite, fontSize: 30, fontWeight: 400, lineHeight: 1.3, display: 'block'}}>
        {compara.texto}
      </TextoRico>
    </div>
    {nota && (
      <div style={{position: 'absolute', left: `${nota.l}%`, top: `${nota.t}%`, width: `${nota.w}%`, zIndex: 2}}>
        <TextoRico style={{color: C.grafite, fontSize: 26, fontWeight: 400, lineHeight: 1.35, display: 'block'}}>
          {nota.texto}
        </TextoRico>
      </div>
    )}
  </AbsoluteFill>
);

/* ─────────────────────  FOTO FULL-BLEED + CARD (slides 5-8)  ───────── */
export type FullFotoProps = {
  foto: string;
  card: {l: number; t: number; w: number; h: number; cor: 'soft' | 'grafite'};
  titulo: string; corpo?: string;
};
export const OticaFullFoto: React.FC<FullFotoProps> = ({foto, card, titulo, corpo}) => {
  const escuro = card.cor === 'grafite';
  return (
    <AbsoluteFill style={{...baseFill}}>
      <Img src={staticFile(foto)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0}} />
      <div style={{position: 'absolute', left: `${card.l}%`, top: `${card.t}%`, width: `${card.w}%`, height: `${card.h}%`,
        background: escuro ? C.grafite : C.soft, borderRadius: 30, zIndex: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px', boxSizing: 'border-box',
        textAlign: corpo ? 'left' : 'center', alignItems: corpo ? 'flex-start' : 'center'}}>
        <TextoRico style={{color: escuro ? C.branco : C.grafite, fontSize: 34, fontWeight: 700, lineHeight: 1.15, display: 'block'}}>
          {titulo}
        </TextoRico>
        {corpo && (
          <TextoRico style={{color: escuro ? C.soft : C.grafite, fontSize: 26, fontWeight: 400, lineHeight: 1.35, display: 'block', marginTop: 16}}>
            {corpo}
          </TextoRico>
        )}
      </div>
    </AbsoluteFill>
  );
};

/* ─────────────────────────  CTA (slide 9)  ─────────────────────────── */
export const OticaCta: React.FC = () => (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    {/* card soft alto (do topo até ~66%) */}
    <div style={{position: 'absolute', left: '16.9%', top: '-2%', width: '66.2%', height: '68%',
      background: C.soft, borderRadius: 30, zIndex: 1, display: 'flex', alignItems: 'flex-end',
      justifyContent: 'center', paddingBottom: 56, boxSizing: 'border-box'}}>
      <span style={{color: C.grafite, fontSize: 96, fontWeight: 700, lineHeight: 1.0, textAlign: 'center'}}>
        Você já<br />faz isso?
      </span>
    </div>
    <div style={{position: 'absolute', left: '20%', top: '70%', width: '60%', textAlign: 'center', zIndex: 2}}>
      <span style={{color: C.grafite, fontSize: 38, fontWeight: 400, lineHeight: 1.25}}>
        Deixe seu like e salve esse post para consultar futuramente!
      </span>
    </div>
    {/* watermark DOMa (tom-sobre-tom) base */}
    <div style={{position: 'absolute', bottom: '-1%', left: '-2%', width: '104%', aspectRatio: '1767 / 322',
      backgroundColor: '#EBB231', WebkitMaskImage: maskUrl, maskImage: maskUrl,
      WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', zIndex: 0}} />
  </AbsoluteFill>
);
