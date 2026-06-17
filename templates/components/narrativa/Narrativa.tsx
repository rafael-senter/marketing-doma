import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {TextoRico} from '../../../components';

/**
 * PADRÃO "NARRATIVA" — modo CARD (POST 265): foto full-bleed + card BRANCO arredondado
 * com pergunta (fim em **bold**) + selo DOMa circular no canto sup-dir + watermark sangrado.
 * (A variante POST 272 usa fundo amarelo + elemento 3D — tratada à parte, RULES §6.)
 * Medido: card L17% T39.1% W65.8% H21.7%; selo ~Ø110 canto sup-dir.
 */
const C = {grafite: '#1F1F1F', branco: '#FFFFFF'};
const F = brand.fontes.titulo;

export type NarrativaProps = {foto: string; principal: string};

export const Narrativa: React.FC<NarrativaProps> = ({foto, principal}) => (
  <AbsoluteFill style={{
    fontFamily: F, overflow: 'hidden',
    WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision',
  }}>
    <Img src={staticFile(foto)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />

    {/* selo DOMa circular (canto sup-dir) */}
    <Img src={staticFile('oficial/selo-cor.png')} alt="DOMa"
      style={{position: 'absolute', top: '7.5%', right: '6%', width: 104, height: 104, zIndex: 3}} />

    {/* card BRANCO com a pergunta (centralizada, fim em bold) */}
    <div style={{position: 'absolute', left: '17%', top: '39.1%', width: '65.8%', height: '21.7%',
      background: C.branco, borderRadius: 24, boxShadow: '0 8px 26px #00000033', zIndex: 2,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 44px', boxSizing: 'border-box'}}>
      <TextoRico style={{color: C.grafite, fontSize: 52, fontWeight: 400, lineHeight: 1.2, textAlign: 'center', display: 'block'}}>
        {principal}
      </TextoRico>
    </div>
  </AbsoluteFill>
);
