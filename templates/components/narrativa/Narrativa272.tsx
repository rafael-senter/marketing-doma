import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico} from '../../../components';

/**
 * PADRÃO "NARRATIVA" — modo TEXTO-LIVRE (POST 272): fundo manga + watermark "DOMa" +
 * elemento 3D (moedas) extraído do modelo via rembg (PNG transparente full-canvas,
 * já na posição) + título grande (esq) + subtítulo (dir) + logo rodapé.
 * MEDIDO no modelo (revisão v3 2026-07-21):
 *  - título fs **96**, lineHeight FIXO **118px** (tops 259→377), esq x146 (13.5%), cap-top y259.
 *  - subtítulo fs **42**, lineHeight **66px**, esq x537 (49.7%), 1ª linha em y564.
 *  - negrito **700** (o default 500 não segurava o peso do título).
 *  - moedas RE-EXTRAÍDAS com alpha pela distância ao FUNDO (RULES §27) — a versão antiga
 *    tinha halo cinza porque o recorte veio com o retângulo do PNG.
 */
const C = {fundo: '#F4BB35', watermark: '#F6C655', grafite: '#1F1F1F'};
const F = brand.fontes.titulo;
const maskUrl = `url(${staticFile('oficial/logotipo-principal-branco.png')})`;

export const Narrativa272: React.FC<{story?: boolean}> = ({story}) => (
  <AbsoluteFill style={{
    backgroundColor: C.fundo, fontFamily: F, overflow: 'hidden',
    WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision',
  }}>
    {/* watermark "DOMa" topo (CSS mask, tom-sobre-tom) */}
    <div style={{position: 'absolute', top: story ? '9%' : '4%', left: '50%', transform: 'translateX(-50%)',
      width: '95%', aspectRatio: '1767 / 322', backgroundColor: C.watermark,
      WebkitMaskImage: maskUrl, maskImage: maskUrl, WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', zIndex: 0}} />

    {/* moedas 3D (rembg) — PNG full-canvas, já posicionado */}
    {/* moedas: MESMO tamanho em px do feed (1080×1350), só reposicionadas no story */}
    <Img src={staticFile('narrativa/narr-272-moedas.png')}
      style={{position: 'absolute', left: 0, top: story ? 400 : 0, width: 1080, height: 1350, zIndex: 1}} />

    {/* título (esq) */}
    <div style={{position: 'absolute', left: '13.5%', top: story ? '22%' : '17.5%', zIndex: 2, color: C.grafite}}>
      <TextoRico boldWeight={700} style={{fontSize: 96, fontWeight: 400, lineHeight: '118px', display: 'block'}}>
        {'Você trabalha\no **mês inteiro…**'}
      </TextoRico>
    </div>

    {/* subtítulo (dir) */}
    <div style={{position: 'absolute', left: '49.7%', top: story ? '38%' : '40.5%', right: '6%', zIndex: 2, color: C.grafite}}>
      <TextoRico boldWeight={700} style={{fontSize: 42, fontWeight: 400, lineHeight: '66px', display: 'block'}}>
        {'e mesmo assim\no dinheiro **não**\n**sobra?**'}
      </TextoRico>
    </div>

    {/* logo rodapé */}
    <div style={{position: 'absolute', top: story ? '85%' : '91.5%', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 3}}>
      <LogoDoma cor={C.grafite} tamanho={56} wordmark />
    </div>
  </AbsoluteFill>
);
