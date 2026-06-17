import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico} from '../../../components';

/**
 * PADRÃO "DOMA (institucional)" (v2) — POST 115, 178, 257, 271.
 * 178 e 271 são TIPOGRÁFICOS (code-only, sem device). 115 (phone+menu) e 257 (notas R$)
 * usam base nanobanana (ver [[funcoes-sistema-pipeline]]).
 * Cores: manga #F4BB35 · soft #F8DD6B · grafite #1F1F1F · branco #FFF.
 * Medido 178: fundo #F4BB35; frame grafite x[20-78%] y[18-82%]; ícone branco x[75-87%] y[33-43%].
 */
const C = {manga: '#F4BB35', soft: '#F8DD6B', grafite: '#1F1F1F', branco: '#FFFFFF', wm: '#EAAD32'};
const F = brand.fontes.titulo;
const maskUrl = `url(${staticFile('oficial/logotipo-principal-branco.png')})`;

const baseFill = {
  fontFamily: F, overflow: 'hidden' as const,
  WebkitFontSmoothing: 'antialiased' as const, MozOsxFontSmoothing: 'grayscale' as const,
  textRendering: 'geometricPrecision' as const,
};

/* ícone "gráfico subindo" dentro de balão branco (canto sup-dir do frame) */
const IconeGrafico: React.FC = () => (
  <div style={{position: 'absolute', left: '74.5%', top: '33.2%', width: '12.8%', aspectRatio: '1 / 1',
    background: C.branco, borderRadius: '50% 50% 50% 8%', zIndex: 3,
    display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <svg viewBox="0 0 48 48" width="58%" height="58%">
      {/* barras */}
      <rect x="6" y="30" width="6" height="10" rx="1.5" fill={C.grafite} />
      <rect x="16" y="24" width="6" height="16" rx="1.5" fill={C.grafite} />
      <rect x="26" y="27" width="6" height="13" rx="1.5" fill={C.grafite} />
      {/* seta subindo */}
      <path d="M8 22 L20 14 L28 18 L42 7" stroke={C.manga} strokeWidth="3.4" fill="none"
        strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 7 L42 7 L42 15" stroke={C.manga} strokeWidth="3.4" fill="none"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

/* ── POST 178 — tipográfico "O nosso negócio é ver o seu prosperar." ── */
export const Doma178: React.FC = () => (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    {/* watermark "DOMa" topo tom-sobre-tom */}
    <div style={{position: 'absolute', top: '6%', left: '0%', width: '100%', aspectRatio: '1767 / 322',
      backgroundColor: C.wm, WebkitMaskImage: maskUrl, maskImage: maskUrl,
      WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
      zIndex: 0}} />

    {/* frame outline grafite (cantos arredondados) */}
    <div style={{position: 'absolute', left: '20%', top: '18%', width: '58%', height: '64%',
      border: `2px solid ${C.grafite}`, borderRadius: 44, zIndex: 1}} />

    <IconeGrafico />

    {/* texto central */}
    <div style={{position: 'absolute', left: '23.5%', top: '33%', width: '60%', zIndex: 2}}>
      <TextoRico style={{color: C.grafite, fontSize: 62, fontWeight: 400, lineHeight: 1.12, display: 'block'}}>
        {'O **nosso**\n**negócio** é\nver o seu'}
      </TextoRico>
      <span style={{color: C.grafite, fontSize: 86, fontWeight: 800, lineHeight: 1.05, display: 'block', marginTop: 4}}>
        prosperar.
      </span>
    </div>
  </AbsoluteFill>
);

/* ── POST 271 — tipográfico "Tem uma coisa ESTRANHA..." + card lista ── */
const seta = (
  <svg viewBox="0 0 48 48" width="46%" height="46%">
    <path d="M14 14 L34 34" stroke={C.grafite} strokeWidth="5" strokeLinecap="round" />
    <path d="M20 34 L34 34 L34 20" stroke={C.grafite} strokeWidth="5" fill="none"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Doma271: React.FC = () => (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    {/* título (esq) — ESTRANHA em highlight soft; 'com quem usa Doma.' sublinhado */}
    <div style={{position: 'absolute', left: '13%', top: '15%', width: '78%', zIndex: 2,
      color: C.grafite, fontSize: 64, lineHeight: 1.16}}>
      <div style={{fontWeight: 400}}>Tem uma coisa</div>
      <div style={{display: 'inline-block', background: C.soft, color: C.grafite, fontWeight: 800,
        padding: '2px 18px', borderRadius: 12, margin: '6px 0'}}>ESTRANHA</div>
      <div style={{fontWeight: 400}}>acontecendo</div>
      <div style={{fontWeight: 400, textDecoration: 'underline', textUnderlineOffset: 8}}>com quem usa</div>
      <div style={{fontWeight: 400, textDecoration: 'underline', textUnderlineOffset: 8}}>Doma.</div>
    </div>

    {/* card branco (dir-inf) com a lista */}
    <div style={{position: 'absolute', left: '39.6%', top: '47.4%', width: '56%', height: '38.8%',
      background: C.branco, borderRadius: 30, zIndex: 1,
      padding: '44px 48px 44px 70px', boxSizing: 'border-box'}}>
      <div style={{color: C.grafite, fontSize: 40, fontWeight: 800, marginBottom: 24}}>Eles começam a:</div>
      {['Vender mais', 'Ver dinheiro sobrando\nno caixa', 'Tomar decisões muito\nmelhores'].map((t, i) => (
        <div key={i} style={{display: 'flex', gap: 14, marginBottom: 18}}>
          <span style={{color: C.grafite, fontSize: 34, lineHeight: 1.2}}>•</span>
          <span style={{color: C.grafite, fontSize: 34, fontWeight: 400, lineHeight: 1.2, whiteSpace: 'pre-line'}}>{t}</span>
        </div>
      ))}
    </div>

    {/* círculo soft + seta ↘ (borda esq do card) */}
    <div style={{position: 'absolute', left: '26.7%', top: '60.6%', width: '15.5%', aspectRatio: '1 / 1',
      background: C.soft, borderRadius: '50%', zIndex: 2,
      display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {seta}
    </div>

    {/* logo rodapé */}
    <div style={{position: 'absolute', bottom: '5%', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 3}}>
      <LogoDoma cor={C.grafite} tamanho={64} wordmark />
    </div>
  </AbsoluteFill>
);

/* ── POST 115 — phone+menu (base nanobanana) + card + badge + pílulas ── */
const Pilula: React.FC<{top: string; label: string}> = ({top, label}) => (
  <div style={{position: 'absolute', left: '26%', top, width: '32%', height: '7%',
    background: C.soft, borderRadius: 999, zIndex: 3, display: 'flex', alignItems: 'center', gap: 18, paddingLeft: 14}}>
    <div style={{width: '38px', height: '38px', minWidth: 38, borderRadius: '50%', background: C.grafite,
      display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <span style={{color: C.soft, fontSize: 30, fontWeight: 700, lineHeight: 1, marginTop: -2}}>+</span>
    </div>
    <span style={{color: C.grafite, fontSize: 38, fontWeight: 700}}>{label}</span>
  </div>
);
export const Doma115: React.FC = () => (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    <Img src={staticFile('oficial/_doma115-base.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0}} />

    {/* box soft com logo DOMa (topo-dir) */}
    <div style={{position: 'absolute', left: '57%', top: '19.5%', width: '31%', height: '9%',
      background: C.soft, borderRadius: 22, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <LogoDoma cor={C.grafite} tamanho={48} wordmark />
    </div>

    {/* white card (esq) */}
    <div style={{position: 'absolute', left: '7.9%', top: '18.5%', width: '43%', height: '38%',
      background: C.branco, borderRadius: 26, zIndex: 1, display: 'flex', alignItems: 'center',
      padding: '0 44px', boxSizing: 'border-box'}}>
      <TextoRico style={{color: C.grafite, fontSize: 54, fontWeight: 400, lineHeight: 1.12, display: 'block'}}>
        {'Domine seu\n**negócio** em\num único\nlugar.'}
      </TextoRico>
    </div>

    {/* badge "12 anos" grafite */}
    <div style={{position: 'absolute', left: '9%', top: '57.5%', width: '15%', height: '8.5%',
      background: C.grafite, borderRadius: 16, zIndex: 3, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', lineHeight: 1}}>
      <span style={{color: C.branco, fontSize: 52, fontWeight: 800}}>12</span>
      <span style={{color: C.branco, fontSize: 20, fontWeight: 400, letterSpacing: 2}}>anos</span>
    </div>

    <Pilula top="45%" label="controle" />
    <Pilula top="59%" label="vendas" />
    <Pilula top="73%" label="lucro" />
  </AbsoluteFill>
);

/* ── POST 257 — notas R$ (base nanobanana) + card + DOMa vertical ── */
export const Doma257: React.FC = () => (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    <Img src={staticFile('oficial/_doma257-base.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0}} />

    {/* card soft (centro-esq) */}
    <div style={{position: 'absolute', left: '11%', top: '37%', width: '49%', height: '26%',
      background: C.soft, borderRadius: 26, zIndex: 1, display: 'flex', alignItems: 'center',
      padding: '0 46px', boxSizing: 'border-box'}}>
      <TextoRico style={{color: C.grafite, fontSize: 46, fontWeight: 400, lineHeight: 1.18, display: 'block'}}>
        {'Tá vendendo\nbem, **mas não**\n**vê a cor do**\n**dinheiro?**'}
      </TextoRico>
    </div>

    {/* DOMa vertical (borda dir, lê de baixo p/ cima) */}
    <div style={{position: 'absolute', right: '2%', top: '50%', transform: 'translateY(-50%) rotate(-90deg)',
      transformOrigin: 'center', zIndex: 2}}>
      <LogoDoma cor={C.grafite} tamanho={92} wordmark />
    </div>
  </AbsoluteFill>
);
