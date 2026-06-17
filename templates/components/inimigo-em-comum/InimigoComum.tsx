import {AbsoluteFill, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico} from '../../../components';

/**
 * PADRÃO "INIMIGO EM COMUM" (v2) — recriação medida dos modelos POST 244 / 252.
 * Layout FIXO (só o texto varia): fundo manga + watermark "DOMa" gigante (CSS mask) +
 * card BRANCO (frase com aspas, centralizada, fim em **bold**) + badge circular preto com
 * seta ↘ + card SOFT amarelo (texto secundário centralizado) + logo DOMa no rodapé.
 * Medições: card branco L9% T22.2% W81.9% H24.2%; badge Ø119 centro (283,714).
 * ⚠️ CORES MEDIDAS DO MODELO POST 244 (pixel exato, jun/2026):
 *   - fundo: #F5C24A (mais CLARO — não é o manga padrão #F4BB35).
 *   - watermark: #F4BB35 (manga padrão, MAIS ESCURO que o fundo desta categoria).
 *   Inimigo em Comum INVERTE o padrão "fundo manga + watermark mais escura": aqui fundo
 *   é mais claro que outras categorias E watermark = manga padrão.
 */
const C = {fundo: '#F5C24A', watermark: '#F4BB35', branco: '#FFFFFF', soft: '#F8DD6B', grafite: '#1F1F1F'};
const F = brand.fontes.titulo;
const maskUrl = `url(${staticFile('oficial/logotipo-principal-branco.png')})`;

const SetaDiagonal: React.FC = () => (
  <svg viewBox="0 0 48 48" width="56" height="56">
    <path d="M15 15 L33 33" stroke="#fff" strokeWidth="6.5" strokeLinecap="round" />
    <path d="M33 18 L33 33 L18 33" stroke="#fff" strokeWidth="6.5" fill="none"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export type InimigoComumProps = {principal: string; secundario: string};

export const InimigoComum: React.FC<InimigoComumProps> = ({principal, secundario}) => (
  <AbsoluteFill style={{
    backgroundColor: C.fundo, fontFamily: F, overflow: 'hidden',
    WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision',
  }}>
    {/* watermark "DOMa" gigante (CSS mask da logo horizontal), tom-sobre-tom.
        Modelo: enorme, "DO" sangra o canto sup-esq. width ~175%, deslocado p/ esquerda. */}
    <div style={{position: 'absolute', top: '1%', left: '-6%',
      width: '175%', aspectRatio: '1767 / 322', backgroundColor: C.watermark,
      WebkitMaskImage: maskUrl, maskImage: maskUrl, WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', zIndex: 0}} />

    {/* card BRANCO — frase principal centralizada (aspas, fim em bold) */}
    <div style={{position: 'absolute', left: '9%', top: '22.2%', width: '81.9%', height: '24.2%',
      background: C.branco, borderRadius: 34, boxShadow: '0 8px 28px #00000022', zIndex: 2,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 56px', boxSizing: 'border-box'}}>
      <TextoRico style={{color: C.grafite, fontSize: 46, fontWeight: 400, lineHeight: 1.22, textAlign: 'center', display: 'block'}}>
        {principal}
      </TextoRico>
    </div>

    {/* badge circular preto + seta ↘ — centro (283,714) = L26.2% T52.9%, Ø119 */}
    <div style={{position: 'absolute', left: '26.2%', top: '52.9%', transform: 'translate(-50%,-50%)',
      width: 119, height: 119, borderRadius: '50%', background: C.grafite, zIndex: 3,
      display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <SetaDiagonal />
    </div>

    {/* card SOFT — texto secundário centralizado de verdade (sem paddingLeft que empurrava texto pra direita) */}
    <div style={{position: 'absolute', left: '16%', top: '54%', width: '68%', height: '24%',
      background: C.soft, borderRadius: 30, zIndex: 1,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px', boxSizing: 'border-box'}}>
      <TextoRico style={{color: C.grafite, fontSize: 38, fontWeight: 400, lineHeight: 1.3, textAlign: 'center', display: 'block'}}>
        {secundario}
      </TextoRico>
    </div>

    {/* logo DOMa rodapé */}
    <div style={{position: 'absolute', top: '87%', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 3}}>
      <LogoDoma cor={C.grafite} tamanho={60} wordmark />
    </div>
  </AbsoluteFill>
);
