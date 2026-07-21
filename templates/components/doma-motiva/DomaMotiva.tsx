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
  /** EFEITO 3D (opcional — avaliar caso a caso, ver skill efeito-3d-camadas):
   *  recorte da pessoa (rembg) colado NA MESMA posição da foto, zIndex acima do card.
   *  A cabeça "salta" na frente do card. Coords em % do canvas (crop pré-alinhado). */
  recorte3d?: {src: string; left: string; top: string; width: string};
};

export const DomaMotiva: React.FC<DomaMotivaProps> = ({foto, blocos, card, seloCanto, watermark, fontSize = 33, recorte3d}) => {
  // selo CRUZA a borda do card (medido POST 242: Ø126, centro na borda direita, metade fora)
  const seloStyle: React.CSSProperties = seloCanto === 'sup-dir'
    ? {top: 12, right: -85}
    : {bottom: -85, right: -10};
  return (
    <AbsoluteFill style={{
      fontFamily: F, overflow: 'hidden',
      WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision',
    }}>
      {/* foto de fundo full-bleed */}
      <Img src={staticFile(foto)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />

      {/* watermark "#DomaMotiva" GIGANTE sangrado (medido POST 242/250): letras ~130px de altura,
          "#" cortado à esquerda e "a" cortado à direita — texto ultrapassa as DUAS bordas.
          Branco translúcido por cima da foto. Correção Patrick 2026-07-16 (antes era 88px sem sangrar). */}
      <div style={{position: 'absolute', left: '-2.2%', [watermark === 'topo' ? 'top' : 'bottom']: '-1%',
        fontSize: 162, fontWeight: 500, color: '#FFFFFF', opacity: 0.20, letterSpacing: -2,
        whiteSpace: 'nowrap', lineHeight: 1}}>
        #DomaMotiva
      </div>

      {/* card amarelo arredondado */}
      <div style={{position: 'absolute', left: card.left, top: card.top, width: card.width, height: card.height,
        background: C.card, borderRadius: 44, boxShadow: '0 10px 34px #00000026'}}>  {/* raio 44 medido */}
        {/* selo DOMa oficial no canto */}
        {/* selo preto-e-branco em CAMADAS: círculo preto (div, cresce livre) ATRÁS + escritas
            selo-branco.png fixas POR CIMA — borda preta ajustável sem mexer nas letras */}
        <div style={{position: 'absolute', width: 170, height: 170, ...seloStyle}}>
          <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: '#1F1F1F'}} />
          <Img src={staticFile('oficial/selo-branco.png')} alt="DOMa"
            style={{position: 'absolute', left: '18%', top: '18%', width: '64%', height: '64%'}} />
        </div>
        {/* texto motivacional (parágrafos, último termo em bold) */}
        {/* disposição medida POST 242: padding top 53 / left 66, gap entre parágrafos = 1 linha */}
        <div style={{position: 'absolute', top: 53, left: 66, right: 80, bottom: 44,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 40}}>
          {blocos.map((b, i) => (
            <TextoRico key={i} style={{color: C.grafite, fontSize, fontWeight: 400, lineHeight: 1.28, display: 'block'}}>
              {b}
            </TextoRico>
          ))}
        </div>
      </div>

      {/* camada 3D: recorte da pessoa por cima do card (sanduíche foto→card→recorte) */}
      {recorte3d && (
        <Img src={staticFile(recorte3d.src)} style={{position: 'absolute',
          left: recorte3d.left, top: recorte3d.top, width: recorte3d.width, zIndex: 5}} />
      )}
    </AbsoluteFill>
  );
};
