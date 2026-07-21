import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, SeloDoma, TextoRico} from '../../../components';

/**
 * PADRÃO "DICAS / TRENTO" (v2) — POST 193 (8 slides, storytelling Peccin/Trento).
 * Fundo comum: watermark "DOMa" tom-sobre-tom (_193-bg.png, extraído do modelo) + rodapé "ARRASTA PRO LADO →".
 * Fotos (históricas sépia + produtos Trento/Hershey = terceiros) recortadas do modelo (_193-*.jpg), NUNCA recriadas.
 * Slides 1/6/8 são puro-Doma (sem foto). Cores: manga #F4BB35 · soft #F8DD6B · grafite #1F1F1F.
 */
const C = {manga: '#F4BB35', soft: '#F8DD6B', grafite: '#1F1F1F', branco: '#FFFFFF'};
const F = brand.fontes.titulo;
const RAD = 26;

const baseFill = {
  fontFamily: F, overflow: 'hidden' as const, backgroundColor: C.manga,
  WebkitFontSmoothing: 'antialiased' as const, MozOsxFontSmoothing: 'grayscale' as const,
  textRendering: 'geometricPrecision' as const,
};
const Bg: React.FC = () => (
  <Img src={staticFile('oficial/_193-bg.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0}} />
);
const Footer: React.FC = () => (
  <div style={{position: 'absolute', bottom: '5.5%', left: 0, right: 0, textAlign: 'center', zIndex: 4,
    color: C.grafite, fontSize: 26, fontWeight: 600, letterSpacing: 2}}>ARRASTA PRO LADO →</div>
);
type Box = {src: string; l: number; t: number; w: number; h: number; rad?: boolean};
const Foto: React.FC<{b: Box; z?: number}> = ({b, z = 1}) => (
  <Img src={staticFile(b.src)} style={{position: 'absolute', left: `${b.l}%`, top: `${b.t}%`,
    width: `${b.w}%`, height: `${b.h}%`, objectFit: 'cover', borderRadius: b.rad === false ? 0 : RAD, zIndex: z}} />
);
const Txt: React.FC<{children: string; l: number; t: number; w: number; size?: number; align?: 'left' | 'center'}> =
  ({children, l, t, w, size = 40, align = 'left'}) => (
  <div style={{position: 'absolute', left: `${l}%`, top: `${t}%`, width: `${w}%`, textAlign: align, zIndex: 3}}>
    <TextoRico style={{color: C.grafite, fontSize: size, fontWeight: 400, lineHeight: 1.28, display: 'block'}}>{children}</TextoRico>
  </div>
);
/* ícone "gráfico caindo" soft (barras + seta ↘) */
const ChartDown: React.FC<{l: number; t: number; s: number}> = ({l, t, s}) => (
  <svg viewBox="0 0 100 80" style={{position: 'absolute', left: `${l}%`, top: `${t}%`, width: `${s}%`, zIndex: 1}}>
    <path d="M5 18 L45 42 L60 30 L92 54 M92 54 L92 38 M92 54 L74 54" stroke={C.soft} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="5" y="50" width="13" height="25" fill={C.soft}/>
    <rect x="30" y="58" width="13" height="17" fill={C.soft}/>
    <rect x="55" y="62" width="13" height="13" fill={C.soft}/>
  </svg>
);

/* ── s1 CAPA ── */
export const Trento1: React.FC = () => (
  <AbsoluteFill style={baseFill}>
    <Bg />
    <div style={{position: 'absolute', left: '17%', top: '19%', zIndex: 3}}>
      <TextoRico style={{color: C.grafite, fontSize: 54, fontWeight: 400, lineHeight: 1.2, display: 'block'}}>
        {'Uma marca\ndo **interior**\n**do Rio Grande**\n**do Sul...**'}
      </TextoRico>
    </div>
    {/* embrulho de bala (banda soft inclinada) */}
    <div style={{position: 'absolute', left: '10%', top: '44%', width: '80%', height: '13%',
      background: C.soft, borderRadius: 18, transform: 'rotate(-7deg)', zIndex: 1}} />
    <span style={{position: 'absolute', left: '70%', top: '37%', fontSize: 64, fontWeight: 600, color: C.grafite, zIndex: 2}}>?</span>
    <span style={{position: 'absolute', left: '38%', top: '55%', fontSize: 64, fontWeight: 600, color: C.grafite, zIndex: 2}}>?</span>
    <div style={{position: 'absolute', left: '12%', top: '60%', zIndex: 3}}>
      <SeloDoma tamanho={170} variante="grafite" />
    </div>
    <div style={{position: 'absolute', left: '53%', top: '61%', width: '40%', zIndex: 3}}>
      <TextoRico style={{color: C.grafite, fontSize: 50, fontWeight: 400, lineHeight: 1.2, display: 'block'}}>
        {'...que virou\nameaça pra\n**Hershey e**\n**Ferrero.**'}
      </TextoRico>
    </div>
    <Footer />
  </AbsoluteFill>
);

/* ── s2 história + 3 fotos sépia ── */
export const Trento2: React.FC = () => (
  <AbsoluteFill style={baseFill}>
    <Bg />
    <Foto b={{src: 'oficial/_193-s2p1.jpg', l: 57.5, t: 12.5, w: 42.5, h: 23.5}} />
    <Foto b={{src: 'oficial/_193-s2p2.jpg', l: 63.5, t: 36.5, w: 36.5, h: 23.5}} />
    <Foto b={{src: 'oficial/_193-s2p3.jpg', l: 52.3, t: 60.4, w: 45.2, h: 23.6}} />
    <Txt l={9} t={13} w={42} size={34}>{'Em 1956, no interior\ndo RS, os irmãos\nPezzim criaram uma\nfábrica de balas.\n\nPor 54 anos, eles\nproduziram\nartesanalmente.\n\nEstável, pequena…\ne invisível pros\ngrandes.\n\n**Mas exportavam\npara 50 países.**'}</Txt>
    <Footer />
  </AbsoluteFill>
);

/* ── s3 crise + 2 fotos esq + chart ── */
export const Trento3: React.FC = () => (
  <AbsoluteFill style={baseFill}>
    <Bg />
    <Foto b={{src: 'oficial/_193-s3p1.jpg', l: 0, t: 12.5, w: 13.5, h: 20}} />
    <Foto b={{src: 'oficial/_193-s3p2.jpg', l: 0, t: 33, w: 13.5, h: 26}} />
    <ChartDown l={58} t={36} s={36} />
    <Txt l={16} t={31} w={40} size={40}>{'Até que em 2010,\no dólar caiu…\n\nE junto com ele, a\nreceita da empresa:\n\n**–20% em um ano.**\n\nA crise apertou e tiveram\numa ideia que mudaria tudo.'}</Txt>
    <Footer />
  </AbsoluteFill>
);

/* ── s4 nasceu o Trento + produtos ── */
export const Trento4: React.FC = () => (
  <AbsoluteFill style={baseFill}>
    <Bg />
    {/* card soft */}
    <div style={{position: 'absolute', left: '8%', top: '9%', width: '84%', height: '82%', background: C.soft, borderRadius: 36, zIndex: 1}} />
    <div style={{position: 'absolute', left: '13%', top: '13%', zIndex: 3}}>
      <TextoRico style={{color: C.grafite, fontSize: 46, fontWeight: 400, lineHeight: 1.18, display: 'block'}}>
        {'Em 2011,\nnasceu o\n**TRENTO.**'}
      </TextoRico>
    </div>
    <Foto b={{src: 'oficial/_193-s4prod.jpg', l: 11, t: 23, w: 88, h: 38, rad: false}} z={2} />
    <Txt l={36} t={64} w={56} size={34}>{'Um chocolate\nem formato de tubo.\n\nRecheado. Crocante.\n\n**E 100% GAÚCHO.**'}</Txt>
    <Footer />
  </AbsoluteFill>
);

/* ── s5 prejuízo + produtos esq + chart ── */
export const Trento5: React.FC = () => (
  <AbsoluteFill style={baseFill}>
    <Bg />
    <Foto b={{src: 'oficial/_193-s5prod.jpg', l: 0, t: 10, w: 30.5, h: 40.5, rad: false}} />
    <ChartDown l={44} t={20} s={42} />
    <Txt l={16} t={26} w={62} size={44} align="left">{'**Nos primeiros\n3 anos, só prejuízo.**\n\n**Mas eles sabiam o\nque estavam fazendo.**'}</Txt>
    <Footer />
  </AbsoluteFill>
);

/* ── s6 pandemia (puro Doma) ── */
export const Trento6: React.FC = () => (
  <AbsoluteFill style={baseFill}>
    <Bg />
    <Txt l={25} t={31} w={56} size={42}>{'Veio a pandemia e o\nconsumo de chocolate\nsubiu 44%.'}</Txt>
    <div style={{position: 'absolute', left: '23%', top: '43%', width: '56%', background: C.soft, borderRadius: 14,
      padding: '20px 28px', zIndex: 3}}>
      <TextoRico style={{color: C.grafite, fontSize: 42, fontWeight: 600, lineHeight: 1.18, display: 'block'}}>
        {'E o Trento…\nvirou febre nas redes.'}
      </TextoRico>
    </div>
    <Txt l={25} t={57} w={56} size={42}>{'Ganhou os Trento Lovers\ne começou a incomodar\nos gigantes.'}</Txt>
    <Footer />
  </AbsoluteFill>
);

/* ── s7 copiaram + produtos Hershey ── */
export const Trento7: React.FC = () => (
  <AbsoluteFill style={baseFill}>
    <Bg />
    {/* moldura fina arredondada */}
    <div style={{position: 'absolute', left: '13%', top: '13%', width: '74%', height: '62%',
      border: `2px solid ${C.soft}`, borderRadius: 26, zIndex: 1}} />
    <Txt l={16} t={20} w={68} size={40} align="center">{'A Hershey’s e outras\ngigantes **copiaram o\ntubinho do interior.**'}</Txt>
    <Foto b={{src: 'oficial/_193-s7prod.jpg', l: 17, t: 42, w: 73, h: 34, rad: false}} z={2} />
    <Footer />
  </AbsoluteFill>
);

/* ── s8 fecho (puro Doma + logo) ── */
export const Trento8: React.FC = () => (
  <AbsoluteFill style={baseFill}>
    <Bg />
    {/* $ soft decorativos */}
    <span style={{position: 'absolute', right: '16%', top: '20%', fontSize: 70, color: C.soft, fontWeight: 600, zIndex: 1}}>$</span>
    <span style={{position: 'absolute', left: '13%', top: '70%', fontSize: 70, color: C.soft, fontWeight: 600, zIndex: 1}}>$</span>
    <Txt l={26} t={28} w={56} size={42}>{'Hoje, a Peccin fatura\nmais de ==R$ 700 milhões==\n==por ano.==\n\nE o Trento é mais que\nchocolate:\n\n**É o orgulho que nasceu\nno interior e venceu os\ngigantes.**'}</Txt>
    <div style={{position: 'absolute', bottom: '6%', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 4}}>
      <LogoDoma cor={C.grafite} tamanho={64} wordmark />
    </div>
  </AbsoluteFill>
);
