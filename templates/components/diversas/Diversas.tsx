import {AbsoluteFill, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {TextoRico} from '../../../components';

/**
 * CATEGORIA "DIVERSAS" — template tipográfico parametrizado do POST 178
 * ("O nosso negócio é ver o seu prosperar."). Re-medido pixel a pixel jul/2026
 * (medidas do Doma178 antigo estavam erradas — fontes muito menores que o modelo).
 *
 * Estrutura (feed 1080×1350):
 *   - fundo manga #F4BB35
 *   - watermark DOMa #F1A625 SANGRADA: width 113.3%, left −6.7%, top 8.7%
 *     (letras cortadas nas duas laterais — medido bbox y117–340 ⇒ h223 ⇒ w1224)
 *   - frame outline grafite 2px: L22.9% T18% W54.3% H63.9%, radius 65
 *   - badge gota BRANCA (canto sup-dir do frame): L74.5% T33.2% W12.8%,
 *     borderRadius '50% 50% 50% 8%', glow branco suave; ícone barras grafite + seta manga
 *   - texto alinhado à ESQUERDA em x≈27.8%, top 33.4%:
 *     linhas fs≈98 com mix bold e regular inline, lineHeight ~1.12
 *   - fecho fs≈140 bold 800 — VAZA o frame dos dois lados (intencional, medido x212–867)
 *   - SEM logo rodapé (watermark é a marca).
 */
const C = {manga: '#F4BB35', wm: '#F1A625', grafite: '#1F1F1F', branco: '#FFFFFF'};
const F = brand.fontes.titulo;
const maskUrl = `url(${staticFile('oficial/logotipo-principal-branco.png')})`;

const IconeGrafico: React.FC<{left: string; top: string; width: string}> = ({left, top, width}) => (
  <div style={{position: 'absolute', left, top, width, aspectRatio: '1 / 1',
    background: C.branco, borderRadius: '50% 50% 50% 8%', zIndex: 3,
    boxShadow: '0 0 46px 10px #FFFFFF55',
    display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <svg viewBox="0 0 48 48" width="58%" height="58%">
      <rect x="6" y="30" width="6" height="10" rx="1.5" fill={C.grafite} />
      <rect x="16" y="24" width="6" height="16" rx="1.5" fill={C.grafite} />
      <rect x="26" y="27" width="6" height="13" rx="1.5" fill={C.grafite} />
      <path d="M8 22 L20 14 L28 18 L42 7" stroke={C.manga} strokeWidth="3.4" fill="none"
        strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 7 L42 7 L42 15" stroke={C.manga} strokeWidth="3.4" fill="none"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export type DiversasProps = {
  /** linhas superiores com markup **bold** (TextoRico), \n separa linhas. fs≈98 */
  texto: string;
  /** fecho gigante bold (fs≈140) — pode vazar o frame */
  fecho: string;
  story?: boolean;
};

export const Diversas: React.FC<DiversasProps> = ({texto, fecho, story}) => {
  const fsTexto = story ? 104 : 98;
  const fsFecho = story ? 148 : 140;
  return (
    <AbsoluteFill style={{
      backgroundColor: C.manga, fontFamily: F, overflow: 'hidden',
      WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision',
    }}>
      {/* watermark sangrada (cortada nas 2 laterais) */}
      <div style={{position: 'absolute', top: story ? '18%' : '8.7%', left: '-6.7%', width: '113.3%',
        aspectRatio: '1767 / 322', backgroundColor: C.wm,
        WebkitMaskImage: maskUrl, maskImage: maskUrl, WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', zIndex: 2}} />  {/* NA FRENTE do frame (ajuste Patrick 2026-07-16) */}

      {/* frame outline */}
      <div style={{position: 'absolute', left: '22.9%', top: story ? '28%' : '18%',
        width: '54.3%', height: story ? '52%' : '63.9%',
        border: `2px solid ${C.grafite}`, borderRadius: 65, zIndex: 1}} />

      <IconeGrafico left="74.5%" top={story ? '38%' : '33.2%'} width="12.8%" />

      {/* bloco de texto CENTRADO VERTICALMENTE no frame (medido: centro bloco 673.5 vs frame 674.5)
          — funciona pra qualquer nº de linhas. Texto à esquerda com recuo 53px da borda do frame. */}
      <div style={{position: 'absolute', left: '22.9%', top: story ? '28%' : '18%',
        width: '54.3%', height: story ? '52%' : '63.9%', zIndex: 2,
        display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <TextoRico style={{color: C.grafite, fontSize: fsTexto, fontWeight: 400, lineHeight: 1.18,
          display: 'block', paddingLeft: 55}}>
          {texto}
        </TextoRico>
        {/* fecho centralizado no eixo do frame — flexbox vaza simétrico (modelo x212–867) */}
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 8}}>
          {/* background manga CORTA as linhas do frame atrás do texto (modelo: linha nunca passa atrás) */}
          <span style={{color: C.grafite, fontSize: fsFecho, fontWeight: 500, lineHeight: 1.05,
            whiteSpace: 'nowrap', backgroundColor: C.manga, padding: '0 16px'}}>
            {fecho}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
