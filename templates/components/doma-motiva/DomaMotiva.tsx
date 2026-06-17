import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {TextoRico} from '../../../components';

/**
 * PADRÃO "DOMA MOTIVA" (v2) — recriação medida dos modelos POST 242 / 250.
 * Foto full-bleed de fundo + card amarelo manga arredondado com frase motivacional
 * (linha curta + linha com **bold**) + selo DOMa no canto + watermark "DomaMotiva" sangrado.
 * VARIA: foto, posição do card, texto, posição do watermark (topo/base), canto do selo.
 * Render por render-still.sh. Medições: card 242 x10.2% y17.6% w46.8% h32.4%, cor #F4BB35.
 */
const C = {card: '#F4BB35', grafite: '#212121', branco: '#FFFFFF'};
const F = brand.fontes.titulo;

export type DomaMotivaProps = {
  foto: string;
  blocos: string[];                 // cada parágrafo (markup **bold**)
  card: {left: string; top: string; width: string; height: string};
  seloCanto: 'sup-dir' | 'inf-dir';
  watermark: 'topo' | 'base';
  fontSize?: number;
};

export const DomaMotiva: React.FC<DomaMotivaProps> = ({foto, blocos, card, seloCanto, watermark, fontSize = 33}) => {
  const seloStyle: React.CSSProperties = seloCanto === 'sup-dir'
    ? {top: 18, right: 18}
    : {bottom: -26, right: 24};
  return (
    <AbsoluteFill style={{
      fontFamily: F, overflow: 'hidden',
      WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision',
    }}>
      {/* foto de fundo full-bleed */}
      <Img src={staticFile(foto)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />

      {/* watermark "DomaMotiva" sangrado (branco translúcido) */}
      <div style={{position: 'absolute', left: 0, right: 0, [watermark === 'topo' ? 'top' : 'bottom']: '0.5%',
        textAlign: watermark === 'topo' ? 'left' : 'center', paddingLeft: watermark === 'topo' ? '4%' : 0,
        fontSize: 88, fontWeight: 800, color: '#FFFFFF', opacity: 0.16, letterSpacing: -1, whiteSpace: 'nowrap'}}>
        {watermark === 'base' ? '#DomaMotiva' : 'DomaMotiva'}
      </div>

      {/* card amarelo arredondado */}
      <div style={{position: 'absolute', left: card.left, top: card.top, width: card.width, height: card.height,
        background: C.card, borderRadius: 28, boxShadow: '0 10px 34px #00000026'}}>
        {/* selo DOMa oficial no canto */}
        <Img src={staticFile('oficial/selo-grafite.png')} alt="DOMa"
          style={{position: 'absolute', width: 74, height: 74, ...seloStyle}} />
        {/* texto motivacional (parágrafos, último termo em bold) */}
        <div style={{position: 'absolute', top: 40, left: 40, right: 100, bottom: 36,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 26}}>
          {blocos.map((b, i) => (
            <TextoRico key={i} style={{color: C.grafite, fontSize, fontWeight: 400, lineHeight: 1.28, display: 'block'}}>
              {b}
            </TextoRico>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
