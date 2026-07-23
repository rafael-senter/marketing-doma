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

/* pílula (badge) OPACA — cobre a badge baked (cortada/feia) das fotos do antes/depois.
   Fundo soft sólido + leve borda manga p/ garantir cobertura da baked por baixo. */
const Pilula: React.FC<{texto: string; l: number; t: number; w: number}> = ({texto, l, t, w}) => (
  <div style={{position: 'absolute', left: `${l}%`, top: `${t}%`, width: `${w}%`, height: '4.1%',
    background: C.soft, color: C.grafite, fontSize: 22, fontWeight: 500, letterSpacing: 0.5,
    borderRadius: 9, border: `4px solid ${C.manga}`, boxSizing: 'border-box',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5}}>{texto}</div>
);

/* ─────────────────────────  CAPA (slide 1)  ─────────────────────────
   MEDIDO (POST 133 s1): título x9.5-83% y13-28% fontSize ~64. Fotos A x5.6-51.8% y31.6-87.3%,
   B x50-95.3% y31.6-86.7% (h55.7%, eram 48% pequenas). ⚠️ As BADGES (TROQUE ISSO/POR ISSO) e a
   SETA já vêm BAKED nas fotos (_133-s1a/s1b) — o componente NÃO desenha (senão duplica: era o bug
   da seta dupla). CTA pill + logo = componente. */
export const OticaCapa: React.FC<{story?: boolean}> = ({story}) => {
  const pt = story ? 40 : 31.6;      // photo top
  const ph = story ? 39.2 : 55.7;    // photo height (mesma em px nos 2 formatos: 752px)
  const phB = story ? 38.7 : 55;
  return (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    <div style={{position: 'absolute', left: '9%', top: story ? '17%' : '13%', width: '80%', zIndex: 2,
      color: C.grafite, fontSize: 64, fontWeight: 500, lineHeight: 1.12}}>
      Lojista,<br />faça <span style={{textDecoration: 'underline', textUnderlineOffset: 6}}>trocas inteligentes</span><br />em sua ótica
    </div>
    <Foto b={{src: 'oficial/_133-s1a.jpg', l: 5.6, t: pt, w: 46.2, h: ph}} />
    <Foto b={{src: 'oficial/_133-s1b.jpg', l: 50, t: pt, w: 45.3, h: phB}} />
    {/* pílula CTA inferior (sobre a base das fotos) */}
    <div style={{position: 'absolute', left: '50%', top: story ? '79%' : '85%', transform: 'translateX(-50%)',
      background: C.grafite, color: C.branco, fontSize: 28, fontWeight: 500, borderRadius: 40,
      padding: '16px 34px', zIndex: 3, whiteSpace: 'nowrap'}}>para chamar mais atenção!</div>
    <div style={{position: 'absolute', left: 0, right: 0, bottom: story ? '7%' : '4.5%',
      display: 'flex', justifyContent: 'center', zIndex: 4}}>
      <LogoDoma cor={C.grafite} tamanho={58} wordmark />
    </div>
  </AbsoluteFill>
  );
};

/* ─────────────────────  ANTES / DEPOIS (slides 2-4)  ───────────────── */
export type AntesDepoisProps = {
  fotoA: Box; fotoB: Box; pilA?: {l: number; t: number}; pilB?: {l: number; t: number};
  compara: {texto: string; l: number; t: number; w: number};
  nota?: {texto: string; l: number; t: number; w: number};
  story?: boolean;
};
/* ⚠️ As pílulas TROQUE ISSO/POR ISSO vêm BAKED nas fotos (recorte do modelo) — o componente NÃO
   as desenha (senão duplica). Só posiciona fotos + texto comparativo (X) no quadrante limpo. */
export const OticaAntesDepois: React.FC<AntesDepoisProps> = ({fotoA, fotoB, pilA, pilB, compara, nota, story}) => {
  // story: fotos na MESMA px (h*0.703), diagonal preservada, texto reposicionado
  const adjB = (b: Box): Box => story ? {...b, t: b.t * 0.78 + 8, h: b.h * 0.703} : b;
  const adjT = (t: number) => story ? t * 0.78 + 8 : t;
  return (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    <Foto b={adjB(fotoA)} />
    <Foto b={adjB(fotoB)} />
    {/* badges OPACAS cobrindo as baked (posições medidas no modelo) */}
    {pilA && <Pilula texto="TROQUE ISSO" l={pilA.l} t={adjT(pilA.t)} w={21.9} />}
    {pilB && <Pilula texto="POR ISSO" l={pilB.l} t={adjT(pilB.t)} w={13.9} />}
    <div style={{position: 'absolute', left: `${compara.l}%`, top: `${adjT(compara.t)}%`, width: `${compara.w}%`, zIndex: 2}}>
      <TextoRico style={{color: C.grafite, fontSize: 34, fontWeight: 400, lineHeight: 1.3, display: 'block'}}>
        {compara.texto}
      </TextoRico>
    </div>
    {nota && (
      <div style={{position: 'absolute', left: `${nota.l}%`, top: `${adjT(nota.t)}%`, width: `${nota.w}%`, zIndex: 2}}>
        <TextoRico style={{color: C.grafite, fontSize: 26, fontWeight: 400, lineHeight: 1.35, display: 'block'}}>
          {nota.texto}
        </TextoRico>
      </div>
    )}
  </AbsoluteFill>
  );
};

/* ─────────────────────  FOTO FULL-BLEED + CARD (slides 5-8)  ───────── */
export type FullFotoProps = {
  foto: string;
  card: {l: number; t: number; w: number; h: number; cor: 'soft' | 'grafite'};
  titulo: string; corpo?: string; story?: boolean;
};
export const OticaFullFoto: React.FC<FullFotoProps> = ({foto, card, titulo, corpo, story}) => {
  const escuro = card.cor === 'grafite';
  return (
    <AbsoluteFill style={{...baseFill}}>
      <Img src={staticFile(foto)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0}} />
      <div style={{position: 'absolute', left: `${card.l}%`, top: `${card.t}%`, width: `${card.w}%`, height: `${card.h}%`,
        background: escuro ? C.grafite : C.soft, borderRadius: 30, zIndex: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px', boxSizing: 'border-box',
        textAlign: corpo ? 'left' : 'center', alignItems: corpo ? 'flex-start' : 'center'}}>
        <TextoRico style={{color: escuro ? C.branco : C.grafite, fontSize: 34, fontWeight: 500, lineHeight: 1.15, display: 'block'}}>
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
export const OticaCta: React.FC<{story?: boolean}> = ({story}) => {
  // card soft h ~918px; feed do topo (-27) até ~918; story centrado
  const cardTop = story ? 380 : -27;
  const cardH = 918;
  return (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    <div style={{position: 'absolute', left: '16.9%', top: cardTop, width: '66.2%', height: cardH,
      background: C.soft, borderRadius: 30, zIndex: 1, display: 'flex', alignItems: 'flex-end',
      justifyContent: 'center', paddingBottom: 56, boxSizing: 'border-box'}}>
      <span style={{color: C.grafite, fontSize: 96, fontWeight: 500, lineHeight: 1.0, textAlign: 'center'}}>
        Você já<br />faz isso?
      </span>
    </div>
    <div style={{position: 'absolute', left: '20%', top: cardTop + cardH + 27, width: '60%', textAlign: 'center', zIndex: 2}}>
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
};
