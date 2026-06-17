import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico} from '../../../components';

/**
 * PADRÃO "PRODUTIVIDADE" — modo FOTO-CARD (POST 270): fundo manga + watermark "DOMa" +
 * título (topo) + foto em card arredondado (com sub-card escuro "tempo parado." embutido) + logo.
 * Foto = recorte do modelo (em produção, foto do Patrick). Medido: foto L12.4% T27.5% W75.2% H45%.
 */
const C = {fundo: '#F4BB35', watermark: '#F2BD3C', grafite: '#1F1F1F'};  // wm quase imperceptível (medido ~= fundo)
const F = brand.fontes.titulo;
const maskUrl = `url(${staticFile('oficial/logotipo-principal-branco.png')})`;

export const Produtividade270: React.FC = () => (
  <AbsoluteFill style={{
    backgroundColor: C.fundo, fontFamily: F, overflow: 'hidden',
    WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision',
  }}>
    <div style={{position: 'absolute', top: '3%', left: '50%', transform: 'translateX(-50%)',
      width: '95%', aspectRatio: '1767 / 322', backgroundColor: C.watermark,
      WebkitMaskImage: maskUrl, maskImage: maskUrl, WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', zIndex: 0}} />

    {/* título topo */}
    <div style={{position: 'absolute', left: '12.5%', top: '12%', zIndex: 2, color: C.grafite}}>
      <TextoRico style={{fontSize: 58, fontWeight: 400, lineHeight: 1.12, display: 'block'}}>
        {'O **maior custo**\nda sua fábrica'}
      </TextoRico>
    </div>

    {/* foto card (inclui o sub-card escuro "tempo parado") */}
    <div style={{position: 'absolute', left: '12.4%', top: '27.5%', width: '78.2%', height: '51.7%',
      borderRadius: 28, overflow: 'hidden', zIndex: 1, boxShadow: '0 10px 30px #00000026'}}>
      <Img src={staticFile('oficial/_prod270-foto.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </div>

    {/* logo rodapé */}
    <div style={{position: 'absolute', top: '90%', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 3}}>
      <LogoDoma cor={C.grafite} tamanho={56} wordmark />
    </div>
  </AbsoluteFill>
);
