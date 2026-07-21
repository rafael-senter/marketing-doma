import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico} from '../../../components';

/**
 * PADRÃO "PRODUTIVIDADE" — POST 254 (parceria SENAI).
 * Foto de operário industrial (gerada via nanobanana, RULES §6) + badge "18%" (sup-esq) +
 * texto branco (dir) + faixa "Solução em parceria com o [SENAI]" + logo DOMa.
 * Cores: manga #F4BB35 · grafite #1F1F1F · branco #FFF. SENAI logo extraído do modelo (_senai-logo.png).
 */
const C = {manga: '#F4BB35', grafite: '#1F1F1F', branco: '#FFFFFF'};
const F = brand.fontes.titulo;

const baseFill = {
  fontFamily: F, overflow: 'hidden' as const,
  WebkitFontSmoothing: 'antialiased' as const, MozOsxFontSmoothing: 'grayscale' as const,
  textRendering: 'geometricPrecision' as const,
};

export const Produtividade254: React.FC = () => (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.grafite}}>
    <Img src={staticFile('oficial/_prod254-foto.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0}} />
    {/* escurecedor p/ legibilidade do texto branco (topo-dir) */}
    <div style={{position: 'absolute', inset: 0, zIndex: 1,
      background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.12) 38%, rgba(0,0,0,0) 60%)'}} />

    {/* badge "Aumento de até 18% na produtividade" (sup-esq) */}
    <div style={{position: 'absolute', left: '4%', top: '4%', width: '30%',
      background: C.manga, borderRadius: 16, zIndex: 2, padding: '16px 20px', boxSizing: 'border-box'}}>
      <div style={{color: C.grafite, fontSize: 22, fontWeight: 400, lineHeight: 1.1}}>Aumento de até</div>
      <div style={{color: C.grafite, fontSize: 60, fontWeight: 600, lineHeight: 1.0}}>18%</div>
      <div style={{color: C.grafite, fontSize: 22, fontWeight: 400, lineHeight: 1.1}}>na produtividade</div>
    </div>

    {/* texto branco (dir) */}
    <div style={{position: 'absolute', left: '40%', top: '7%', width: '56%', textAlign: 'right', zIndex: 2}}>
      <TextoRico style={{color: C.branco, fontSize: 42, fontWeight: 400, lineHeight: 1.2, display: 'block'}}>
        {'Aumente a **produtividade**\nda sua equipe com nossa\n**Plataforma de Gestão**\n**Ágil da Eficiência**\n**Produtiva.**'}
      </TextoRico>
    </div>

    {/* faixa "Solução em parceria com o [SENAI]" */}
    <div style={{position: 'absolute', left: '5%', top: '76%', width: '90%', height: '7%',
      background: C.manga, borderRadius: 14, zIndex: 2, display: 'flex', alignItems: 'center',
      justifyContent: 'center', gap: 22, padding: '0 24px', boxSizing: 'border-box'}}>
      <span style={{color: C.grafite, fontSize: 26, fontWeight: 400}}>Solução em parceria com o</span>
      <div style={{background: C.branco, borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center'}}>
        <Img src={staticFile('oficial/_senai-logo.png')} style={{height: 38, width: 'auto'}} />
      </div>
    </div>

    {/* logo DOMa (rodapé-dir) */}
    <div style={{position: 'absolute', right: '6%', bottom: '5.5%', zIndex: 3}}>
      <LogoDoma cor={C.branco} tamanho={58} wordmark />
    </div>
  </AbsoluteFill>
);
