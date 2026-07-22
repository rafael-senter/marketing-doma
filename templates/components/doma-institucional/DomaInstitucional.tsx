import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico, SetaDoma} from '../../../components';

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

/* ── POST 178 — tipográfico "O nosso negócio é ver o seu prosperar." ──
   MEDIDO (2026-07-22): frame x[247,832] y[243,1107] (w585 h864) raio44 borda 2px grafite.
   Watermark "DOMa" full-bleed topo y8.6-26.6%, cor #F1A625 (mais saturada). Badge gráfico
   branco x74.5% y33.2%. Texto NORMAL fontSize ~96 (cap 71 / x-height 52 no modelo — o 62
   antigo era pequeno demais); "prosperar" bold ~128. Texto LEFT-align x≈297, centrado
   verticalmente no frame. Story mantém px, só reposiciona. */
export const Doma178: React.FC<{story?: boolean}> = ({story}) => {
  const frameTop = story ? 528 : 243;   // frame h864 fixo; centrado no canvas
  const wmTop = frameTop - 127;          // watermark logo acima do frame
  const textTop = frameTop + 168;        // bloco de texto centrado no frame
  const badgeTop = frameTop + 205;
  return (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    {/* watermark "DOMa" full-bleed topo (#F1A625, tom-sobre-tom) */}
    <div style={{position: 'absolute', top: wmTop, left: '-8%', width: '116%', aspectRatio: '1767 / 322',
      backgroundColor: '#F1A625', WebkitMaskImage: maskUrl, maskImage: maskUrl,
      WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
      zIndex: 0}} />

    {/* frame outline grafite (cantos arredondados) — px fixo */}
    <div style={{position: 'absolute', left: 247, top: frameTop, width: 585, height: 864,
      border: `2px solid ${C.grafite}`, borderRadius: 44, zIndex: 1}} />

    {/* badge gráfico branco (canto sup-dir do frame) */}
    <div style={{position: 'absolute', left: 805, top: badgeTop, width: 138, aspectRatio: '1 / 1',
      background: C.branco, borderRadius: '50% 50% 50% 8%', zIndex: 3,
      display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <svg viewBox="0 0 48 48" width="58%" height="58%">
        <rect x="6" y="30" width="6" height="10" rx="1.5" fill={C.grafite} />
        <rect x="16" y="24" width="6" height="16" rx="1.5" fill={C.grafite} />
        <rect x="26" y="27" width="6" height="13" rx="1.5" fill={C.grafite} />
        <path d="M8 22 L20 14 L28 18 L42 7" stroke={C.manga} strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34 7 L42 7 L42 15" stroke={C.manga} strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>

    {/* texto (left-align dentro do frame, ~x297) */}
    <div style={{position: 'absolute', left: 297, top: textTop, width: 560, zIndex: 2}}>
      <TextoRico boldWeight={600} style={{color: C.grafite, fontSize: 96, fontWeight: 400, lineHeight: 1.22, display: 'block'}}>
        {'O **nosso**\n**negócio** é\nver o seu'}
      </TextoRico>
      <span style={{color: C.grafite, fontSize: 112, fontWeight: 600, lineHeight: 1.0, display: 'block', marginTop: 12}}>
        prosperar.
      </span>
    </div>
  </AbsoluteFill>
  );
};

/* ── POST 271 — tipográfico "Tem uma coisa ESTRANHA..." + card lista ── */
// seta ↘ = SetaDoma oficial (padrão transversal Patrick 2026-07-17), tingida grafite
const seta = <SetaDoma cor={C.grafite} size={96} />;
export const Doma271: React.FC<{story?: boolean}> = ({story}) => {
  const dy = story ? 240 : 0;   // story: bloco desce; card/círculo mantêm px
  const cardTop = 640 + dy;
  return (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    {/* título (esq) — ESTRANHA em highlight soft; 'com quem usa Doma.' sublinhado */}
    <div style={{position: 'absolute', left: '13%', top: 202 + dy, width: '78%', zIndex: 2,
      color: C.grafite, fontSize: 64, lineHeight: 1.16}}>
      <div style={{fontWeight: 400}}>Tem uma coisa</div>
      <div style={{display: 'inline-block', background: C.soft, color: C.grafite, fontWeight: 600,
        padding: '2px 18px', borderRadius: 12, margin: '6px 0'}}>ESTRANHA</div>
      <div style={{fontWeight: 400}}>acontecendo</div>
      <div style={{fontWeight: 400, textDecoration: 'underline', textUnderlineOffset: 8}}>com quem usa</div>
      <div style={{fontWeight: 400, textDecoration: 'underline', textUnderlineOffset: 8}}>Doma.</div>
    </div>

    {/* card branco (dir-inf) com a lista — px fixo */}
    <div style={{position: 'absolute', left: 428, top: cardTop, width: 605, height: 524,
      background: C.branco, borderRadius: 30, zIndex: 1,
      padding: '44px 48px 44px 70px', boxSizing: 'border-box'}}>
      <div style={{color: C.grafite, fontSize: 40, fontWeight: 600, marginBottom: 24}}>Eles começam a:</div>
      {['Vender mais', 'Ver dinheiro sobrando\nno caixa', 'Tomar decisões muito\nmelhores'].map((t, i) => (
        <div key={i} style={{display: 'flex', gap: 14, marginBottom: 18}}>
          <span style={{color: C.grafite, fontSize: 34, lineHeight: 1.2}}>•</span>
          <span style={{color: C.grafite, fontSize: 34, fontWeight: 400, lineHeight: 1.2, whiteSpace: 'pre-line'}}>{t}</span>
        </div>
      ))}
    </div>

    {/* círculo soft + seta ↘ (borda esq do card) — px fixo */}
    <div style={{position: 'absolute', left: 288, top: cardTop + 178, width: 167, height: 167,
      background: C.soft, borderRadius: '50%', zIndex: 2,
      display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {seta}
    </div>

    {/* logo rodapé */}
    <div style={{position: 'absolute', bottom: story ? '7%' : '5%', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 3}}>
      <LogoDoma cor={C.grafite} tamanho={64} wordmark />
    </div>
  </AbsoluteFill>
  );
};

/* ── POST 115 — phone+menu + card + badge + pílulas ──
   MEDIDO (2026-07-22): celular y24.6-97.6% (começa BAIXO — usa a base TRANSPARENTE p/ ter
   watermark atrás e não colidir com overlays). Card branco x7.9-49.1% y18.5-78.6% (ALTO, era
   38% baixo). Logo em box soft topo-dir x~54-90% y~20-33%. Badge "12 anos" x10.4-22.2% y58-65%.
   3 pílulas soft (controle/vendas/lucro) na borda card/celular. Watermark DOMa tom-sobre-tom. */
const Pilula115: React.FC<{top: number; label: string}> = ({top, label}) => (
  <div style={{position: 'absolute', left: 280, top, width: 372, height: 92,
    background: C.soft, borderRadius: 999, zIndex: 3, display: 'flex', alignItems: 'center', gap: 18, paddingLeft: 16}}>
    <div style={{width: 44, height: 44, minWidth: 44, borderRadius: '50%', background: C.grafite,
      display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <span style={{color: C.soft, fontSize: 34, fontWeight: 600, lineHeight: 1, marginTop: -2}}>+</span>
    </div>
    <span style={{color: C.grafite, fontSize: 40, fontWeight: 600}}>{label}</span>
  </div>
);
export const Doma115: React.FC<{story?: boolean}> = ({story}) => {
  const dy = story ? 200 : 0;   // story: bloco desce p/ zona segura
  return (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    {/* watermark "DOMa" tom-sobre-tom (atrás de tudo) */}
    <div style={{position: 'absolute', top: 40 + dy, left: '-6%', width: '112%', aspectRatio: '1767 / 322',
      backgroundColor: C.wm, WebkitMaskImage: maskUrl, maskImage: maskUrl,
      WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
      zIndex: 0}} />

    {/* celular (base TRANSPARENTE) — posicionado baixo-direita (phone bbox y24.6-97.6%) */}
    <Img src={staticFile('oficial/_doma115-base-transp.png')}
      style={{position: 'absolute', left: 164, top: 252 + dy, width: 924, height: 'auto', zIndex: 1}} />

    {/* box soft com logo DOMa (topo-dir, acima do celular) */}
    <div style={{position: 'absolute', left: 590, top: 268 + dy, width: 388, height: 132,
      background: C.soft, borderRadius: 22, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <LogoDoma cor={C.grafite} tamanho={54} wordmark />
    </div>

    {/* white card (esq) — ALTO */}
    <div style={{position: 'absolute', left: 85, top: 250 + dy, width: 445, height: 560,
      background: C.branco, borderRadius: 26, zIndex: 2, display: 'flex', alignItems: 'flex-start',
      padding: '54px 44px', boxSizing: 'border-box'}}>
      <TextoRico boldWeight={600} style={{color: C.grafite, fontSize: 60, fontWeight: 400, lineHeight: 1.14, display: 'block'}}>
        {'Domine seu\n**negócio** em\num único\nlugar.'}
      </TextoRico>
    </div>

    {/* badge "12 anos" grafite */}
    <div style={{position: 'absolute', left: 112, top: 783 + dy, width: 130, height: 99,
      background: C.grafite, borderRadius: 16, zIndex: 3, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', lineHeight: 1}}>
      <span style={{color: C.branco, fontSize: 52, fontWeight: 600}}>12</span>
      <span style={{color: C.branco, fontSize: 20, fontWeight: 400, letterSpacing: 2}}>anos</span>
    </div>

    <Pilula115 top={690 + dy} label="controle" />
    <Pilula115 top={880 + dy} label="vendas" />
    <Pilula115 top={1050 + dy} label="lucro" />
  </AbsoluteFill>
  );
};

/* ── POST 257 — notas R$ (base nanobanana) + card + DOMa vertical ──
   MEDIDO (2026-07-22): card soft x[160,841] y[389,960] (w681 h571, era 49%×26% pequeno demais).
   Texto fontSize ~70 (era 46; cap 51 / x-height 38 no modelo), centrado vertical, padLeft ~120.
   DOMa vertical (rotate -90) tamanho ~160 (era 92), centro x~74.5%. Base = money top-dir +
   base-esq (objectFit cover, emoldura o card). Story mantém px, card recentrado. */
export const Doma257: React.FC<{story?: boolean}> = ({story}) => {
  const cardTop = story ? 674 : 389;   // card h571 fixo; centrado no canvas
  const logoCy = cardTop + 285;        // logo vertical centrado na altura do card
  return (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    <Img src={staticFile('oficial/_doma257-base.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0}} />

    {/* card soft (centro-esq) — px medido */}
    <div style={{position: 'absolute', left: 160, top: cardTop, width: 681, height: 571,
      background: C.soft, borderRadius: 26, zIndex: 1, display: 'flex', alignItems: 'center',
      padding: '0 40px 0 124px', boxSizing: 'border-box'}}>
      <TextoRico boldWeight={600} style={{color: C.grafite, fontSize: 70, fontWeight: 400, lineHeight: 1.28, display: 'block'}}>
        {'Tá vendendo\nbem, **mas não**\n**vê a cor do**\n**dinheiro?**'}
      </TextoRico>
    </div>

    {/* DOMa vertical (borda dir, lê de baixo p/ cima) — sobre a direita do card */}
    <div style={{position: 'absolute', left: 805, top: logoCy, transform: 'translate(-50%,-50%) rotate(-90deg)',
      transformOrigin: 'center', zIndex: 2}}>
      <LogoDoma cor={C.grafite} tamanho={160} wordmark />
    </div>
  </AbsoluteFill>
  );
};
