import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico} from '../../../components';

/**
 * PADRÃO "NARRATIVA" — modo TEXTO-LIVRE (POST 272): fundo manga + watermark "DOMa" +
 * elemento 3D (moedas) extraído do modelo via rembg (PNG transparente full-canvas,
 * já na posição) + título grande (esq) + subtítulo (dir) + logo rodapé.
 * Medido: fundo #F4BB35; título L13.5% T19.2%; subtítulo L49.7% T41%; logo cx50% T92%.
 */
const C = {fundo: '#F4BB35', watermark: '#F6C655', grafite: '#1F1F1F'};
const F = brand.fontes.titulo;
const maskUrl = `url(${staticFile('oficial/logotipo-principal-branco.png')})`;

export const Narrativa272: React.FC = () => (
  <AbsoluteFill style={{
    backgroundColor: C.fundo, fontFamily: F, overflow: 'hidden',
    WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision',
  }}>
    {/* watermark "DOMa" topo (CSS mask, tom-sobre-tom) */}
    <div style={{position: 'absolute', top: '4%', left: '50%', transform: 'translateX(-50%)',
      width: '95%', aspectRatio: '1767 / 322', backgroundColor: C.watermark,
      WebkitMaskImage: maskUrl, maskImage: maskUrl, WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', zIndex: 0}} />

    {/* moedas 3D (rembg) — PNG full-canvas, já posicionado */}
    <Img src={staticFile('oficial/_narr272-fg.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1}} />

    {/* título (esq) */}
    <div style={{position: 'absolute', left: '13%', top: '18%', zIndex: 2, color: C.grafite}}>
      <TextoRico style={{fontSize: 66, fontWeight: 400, lineHeight: 1.15, display: 'block'}}>
        {'Você trabalha\no **mês inteiro…**'}
      </TextoRico>
    </div>

    {/* subtítulo (dir) */}
    <div style={{position: 'absolute', left: '49%', top: '40.5%', right: '8%', zIndex: 2, color: C.grafite}}>
      <TextoRico style={{fontSize: 41, fontWeight: 400, lineHeight: 1.25, display: 'block'}}>
        {'e mesmo assim\no dinheiro **não**\n**sobra?**'}
      </TextoRico>
    </div>

    {/* logo rodapé */}
    <div style={{position: 'absolute', top: '91.5%', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 3}}>
      <LogoDoma cor={C.grafite} tamanho={56} wordmark />
    </div>
  </AbsoluteFill>
);
