import {AbsoluteFill, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico} from '../../../components';

/**
 * PADRÃO "CERTO E ERRADO" (v2) — recriação medida por pixel do POST 247/256.
 * Canvas 1080×1350. Render SEMPRE por render-still.sh (scale2+Lanczos). RULES §0-14.
 *
 * MEDIÇÕES (POST 247):
 *  - Fundo GRADIENTE vertical: topo #F6C655 → base #F4BB35.
 *  - Watermark = LOGO OFICIAL gigante "DOMa" (CSS mask da logo-branco + cor #F0B834),
 *    sangrando o topo (vê-se "DO" em cima, "MA" atrás dos cards). Contraste ~2.7% (sutil).
 *  - Cards #F8DD6B: esq x[130,516] (12%–47.8%), dir x[563,949] (52.1%–87.9%),
 *    y[391,903] (29%–66.9%), 386×512px, raio ~30.
 *  - Badges Ø86 (8%), cy434 (32.1%): vermelho #EF4639 cx496 (45.9%), verde #32BA7C cx928 (85.9%).
 *  - Kicker grafite cap~19px, y~469, padding interno ~38px (x16.5%/57.5%).
 *  - Corpo grafite regular(400) + keyword bold, bloco centralizado vertical.
 *  - Logo "DOMa" grafite cx 50%, y[1107,1144] (82%–84.7%).
 */
const C = {
  fundo: '#F3BA35',       // INVERTIDO (Patrick): fundo = manga mais escura
  watermark: '#F6C655',   // INVERTIDO: watermark (letras) = manga mais clara
  soft: '#F8DD6B', grafite: '#212121', branco: '#FFFFFF',
  vermelho: '#EF4639', verde: '#32BA7C',
};
const F = brand.fontes.titulo;

// ÍconeX/Check em SVG (traços grossos arredondados) com LONG SHADOW (flat design):
// o símbolo é repetido N vezes deslocado na diagonal 45° (baixo-direita) em cor escura,
// criando o rastro de sombra que SEGUE a forma do símbolo (como no modelo). Branco por cima.
const IconeBadge: React.FC<{tipo: 'x' | 'check'; cor: string}> = ({tipo, cor}) => {
  const sym = (stroke: string, w = 9) => tipo === 'x' ? (
    <g stroke={stroke} strokeWidth={w} strokeLinecap="round">
      <line x1="31" y1="31" x2="55" y2="55" />
      <line x1="55" y1="31" x2="31" y2="55" />
    </g>
  ) : (
    <polyline points="28,45 39,56 59,32" fill="none" stroke={stroke}
      strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
  );
  // long shadow = cópias OPACAS na MESMA cor sólida (sombra), bem juntas → união uniforme
  // (sem acúmulo de opacidade = sem "riscos" mais escuros). A cor da sombra é uma única
  // tonalidade aplicada ao GRUPO inteiro com opacity, não por cópia.
  const passos = Array.from({length: 80}, (_, i) => (i + 1) * 0.55);
  const corSombra = '#000000';
  return (
    <div style={{position: 'absolute', top: 0, left: 323, width: 86, height: 86, borderRadius: '50%',
      background: cor, overflow: 'hidden', zIndex: 2, boxShadow: '0 5px 11px #0000002e'}}>
      <svg viewBox="0 0 86 86" width="86" height="86" style={{position: 'absolute', inset: 0}}>
        {/* sombra: o grupo TODO tem opacity única (0.15) → tonalidade uniforme.
            dentro, cópias opacas e densas formam uma silhueta sólida sem gradação. */}
        <g opacity={0.15}>
          {passos.map((d, i) => (
            <g key={i} transform={`translate(${d} ${d})`}>{sym(corSombra)}</g>
          ))}
        </g>
        {/* símbolo branco por cima */}
        {sym(C.branco)}
      </svg>
    </div>
  );
};

export type CertoErradoProps = {errado: string; certo: string};

// card: largura 35.8% (386px), altura 37.9% (512px), y 29%, raio 30.
// esq left 12%, dir left 52.1%. badge cx esq 45.9%/dir 85.9%, cy 32.1% (= topo do card).
const Card: React.FC<{lado: 'errado' | 'certo'; texto: string; left: string}> = ({lado, texto, left}) => {
  const ehErrado = lado === 'errado';
  return (
    <div style={{position: 'absolute', left, top: '29%', width: '35.74%', height: '37.93%',
      background: C.soft, borderRadius: 45, boxShadow: '0 6px 22px #C9982022', zIndex: 1}}>
      {/* badge Ø86, centro cy434 = topo do card (top:0), cx 496/928 (left interno 323). */}
      <IconeBadge tipo={ehErrado ? 'x' : 'check'} cor={ehErrado ? C.vermelho : C.verde} />
      {/* kicker: cap~19px → font ~27; y469 → top 78 (card y391); padding 38px */}
      <span style={{position: 'absolute', top: 78, left: 38, color: C.grafite, fontSize: 27, fontWeight: 700, letterSpacing: 0.5}}>
        {ehErrado ? 'ERRADO' : 'CERTO'}
      </span>
      {/* corpo: regular(400) + keyword bold; bloco centralizado vertical no espaço restante */}
      <div style={{position: 'absolute', top: 130, bottom: 48, left: 38, right: 38,
        display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <TextoRico style={{color: C.grafite, fontSize: 40, fontWeight: 400, lineHeight: 1.3, display: 'block'}}>
          {texto}
        </TextoRico>
      </div>
    </div>
  );
};

// watermark "DOMa" gigante via CSS mask. Usa a logo VERTICAL (empilhada: "DO" em cima,
// "Ma" embaixo) — é o que aparece no modelo (DO no topo, MA atrás dos cards).
const maskUrl = `url(${staticFile('oficial/logotipo-vertical-branco.png')})`;

export const CertoErrado: React.FC<CertoErradoProps> = ({errado, certo}) => (
  <AbsoluteFill style={{
    backgroundColor: C.fundo, fontFamily: F, overflow: 'hidden',
    WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision',
  }}>
    {/* watermark = logo VERTICAL recortada (CSS mask). GRANDE: o "DO" sangra o TOPO e as
        LATERAIS (perna esq do D, lateral dir do O cortadas); a BASE do "Ma" é o limite
        inferior (~y74%, logo abaixo dos cards). width 125% (sangra laterais), top -5%.
        Proporção natural 1.27:1 → altura ~79% (topo -5% → base ~74%). */}
    <div style={{position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)',
      width: '125%', aspectRatio: '1681 / 1328', backgroundColor: C.watermark,
      WebkitMaskImage: maskUrl, maskImage: maskUrl,
      WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', zIndex: 0}} />

    {/* 2 cards */}
    <Card lado="errado" texto={errado} left="12.04%" />
    <Card lado="certo" texto={certo} left="52.13%" />

    {/* logo rodapé "DOMa" grafite, cx 50%, y~82% */}
    <div style={{position: 'absolute', top: '82%', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 3}}>
      <LogoDoma cor={C.grafite} tamanho={58} wordmark />
    </div>
  </AbsoluteFill>
);
