import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {TextoRico} from '../../../components';

/**
 * PADRÃO "NARRATIVA" — modo CARD (POST 265): foto full-bleed + card BRANCO arredondado
 * com pergunta (fim em **bold**) + selo DOMa circular no canto sup-dir + watermark sangrado.
 * (A variante POST 272 usa fundo amarelo + elemento 3D — tratada à parte, RULES §6.)
 * MEDIDO no POST 265 (revisão v3 2026-07-21):
 *  - card L17% T39.1% W65.8% H21.7% (x184-895, y528-821), raio 34 (era 20).
 *  - texto ALINHADO À ESQUERDA (era centralizado), padding-left 73 (x257 − card 184).
 *  - fontSize 72, lineHeight FIXO 99px (delta medido entre os tops: 590→689).
 *  - negrito 700: traço bold 10px vs regular 5px = ratio 2.0× (o default 500 dava 1.4×).
 *  - selo Ø150 sobre o canto sup-dir DO CARD (centro 790,480 = 73.1%/35.6%), não no canto da peça.
 */
const C = {grafite: '#1F1F1F', branco: '#FFFFFF'};
const F = brand.fontes.titulo;

export type NarrativaProps = {foto: string; principal: string; story?: boolean};

export const Narrativa: React.FC<NarrativaProps> = ({foto, principal, story}) => (
  <AbsoluteFill style={{
    fontFamily: F, overflow: 'hidden',
    WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision',
  }}>
    <Img src={staticFile(foto)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />

    {/* watermark "DOMa" sangrada na base (no modelo é o logo translúcido sobre a foto).
        CSS mask do logo oficial — nunca texto digitado. */}
    <div style={{position: 'absolute', left: '-6%', bottom: story ? '14%' : '9%', width: '118%',
      aspectRatio: '1767 / 322', backgroundColor: '#FFFFFF', opacity: 0.13, zIndex: 1,
      WebkitMaskImage: `url(${staticFile('oficial/logotipo-principal-branco.png')})`,
      maskImage: `url(${staticFile('oficial/logotipo-principal-branco.png')})`,
      WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', pointerEvents: 'none'}} />

    {/* selo DOMa circular (canto sup-dir) */}
    <Img src={staticFile('oficial/selo-cor.png')} alt="DOMa"
      style={{position: 'absolute', left: '73.1%', top: story ? '30.7%' : '35.6%',
        transform: 'translate(-50%,-50%)', width: 150, height: 150, zIndex: 3}} />

    {/* card BRANCO com a pergunta (centralizada, fim em bold) */}
    {/* story: card com a MESMA altura em px do feed (294) — só a posição muda */}
    <div style={{position: 'absolute', left: '17%', top: story ? '34%' : '39.1%',
      width: '65.8%', height: story ? '15.3%' : '21.7%',
      background: C.branco, borderRadius: 34, boxShadow: '0 8px 26px #00000033', zIndex: 2,
      display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
      padding: '0 44px 0 73px', boxSizing: 'border-box'}}>
      <TextoRico boldWeight={700} style={{color: C.grafite, fontSize: 72, fontWeight: 400,
        lineHeight: '99px', textAlign: 'left', display: 'block'}}>
        {principal}
      </TextoRico>
    </div>
  </AbsoluteFill>
);
