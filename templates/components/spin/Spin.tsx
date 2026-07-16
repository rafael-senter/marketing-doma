import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico} from '../../../components';

/**
 * PADRÃO "SPIN" (v2) — recriação medida dos carrosséis POST 243 / 251.
 * Carrossel de perguntas SPIN. 3 templates de slide (feed 1080×1350; story 1080×1920 via prop `story`):
 *   - SpinCapa  : split topo (manga título | soft texto) + foto full-bleed + faixa "Arrasta pro lado." + botão seta.
 *   - SpinMiolo : fundo soft + card manga central (L13.6% W72.8%) c/ lista de perguntas "→" + faixa + botão seta.
 *   - SpinCTA   : fundo manga + card soft + selo grafite (sup-dir) + texto + sub-card destaque manga.
 * Cores medidas: manga #F4BB35 · soft #F8DD6B · grafite #1F1F1F. Card miolo pode ser manga OU soft (slide 5).
 *
 * MEDIDAS REAIS (numpy, POST 243 — re-medido 2026-07-16):
 *   capa: título fs≈60 lh1.12 centrado no bloco; texto fs≈40 lh1.3 CENTRADO no bloco (não colado no topo);
 *         blocos topo 0→40% split 50/50; foto 40%→87.1%; faixa 87.1%→100%.
 *   miolo: fs 44 lh1.3 (passo 57px) NOS DOIS MODOS (cardClaro NÃO reduz fonte!); gap entre perguntas = \n\n (2 passos);
 *          card normal 0→80.8%; card cardClaro 0→84.4%; texto x-left = card + ~100px.
 *   cta:  texto fs 44 lh1.3 top≈22%; destaque fs 44; sub-card T61% H16.4%.
 *
 * STORY (9:16): card/miolo flutuante com altura em px ≈ à do feed (mesma densidade visual),
 * centrado verticalmente; capa mantém frações (blocos 0→30%, foto 30→87%, faixa 87→100).
 */
const C = {manga: '#F4BB35', soft: '#F8DD6B', grafite: '#1F1F1F', branco: '#FFFFFF', preto: '#212121'};
const F = brand.fontes.titulo;

const baseFill = {
  fontFamily: F, overflow: 'hidden' as const,
  WebkitFontSmoothing: 'antialiased' as const, MozOsxFontSmoothing: 'grayscale' as const,
  textRendering: 'geometricPrecision' as const,
};

/* ── Marca d'água: logo OFICIAL "DOMa" tom-sobre-tom (RULES §9, padrão Frase em Pílulas) ── */
const tintaMarca: Record<'soft' | 'manga', string> = {soft: '#EFD261', manga: '#F2B12F'};
const MarcaPadrao: React.FC<{fundo: 'soft' | 'manga'}> = ({fundo}) => {
  const url = `url(${staticFile('oficial/logotipo-principal-branco.png')})`;
  const faixas = [16.3, 33.9, 51.6, 69.2]; // 4 faixas no meio, topo/base limpos (RULES)
  return (
    <div style={{position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none'}}>
      {faixas.map((top, i) => (
        <div key={i} style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          top: `${top}%`, width: '102%', aspectRatio: '1767 / 322',
          backgroundColor: tintaMarca[fundo],
          WebkitMaskImage: url, maskImage: url,
          WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat'}} />
      ))}
    </div>
  );
};

/* seta reta → (preta) para o botão circular branco */
const SetaReta: React.FC<{cor?: string; size?: number}> = ({cor = C.preto, size = 64}) => (
  <svg viewBox="0 0 48 48" width={size} height={size}>
    <path d="M8 24 L38 24" stroke={cor} strokeWidth="5.5" strokeLinecap="round" />
    <path d="M26 13 L39 24 L26 35" stroke={cor} strokeWidth="5.5" fill="none"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* botão circular branco (canto inf-dir) com seta — comum a capa e miolo.
 * story: bottom em px equivalente (60px) pra não afundar no canvas 1920. */
const BotaoSeta: React.FC<{story?: boolean}> = ({story = false}) => (
  <div style={{position: 'absolute', right: '5.5%', bottom: story ? 60 : '4.5%', width: 150, height: 150,
    borderRadius: '50%', background: C.branco, zIndex: 4,
    display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <SetaReta />
  </div>
);

/* ─────────────────────────  CAPA (slide 1)  ───────────────────────── */
export type SpinCapaProps = {titulo: string; texto: string; foto: string; marca?: boolean; story?: boolean};
export const SpinCapa: React.FC<SpinCapaProps> = ({titulo, texto, foto, marca = false, story = false}) => {
  // story 9:16: blocos topo ocupam 30% (≈576px ≈ mesmos 540px do feed), foto ganha altura.
  const blocoH = story ? '30%' : '40%';
  const fotoTop = story ? '30%' : '40%';
  const fotoH = story ? '57.1%' : '47.1%';
  const faixaH = story ? '12.9%' : '13%';
  return (
    <AbsoluteFill style={{...baseFill, backgroundColor: C.soft}}>
      {marca && <MarcaPadrao fundo="soft" />}
      {/* foto full-bleed entre blocos do topo e faixa inferior (medido: 40%→87.1% no feed) */}
      <Img src={staticFile(foto)} style={{position: 'absolute', left: 0, right: 0, top: fotoTop, height: fotoH,
        width: '100%', objectFit: 'cover', zIndex: 0}} />

      {/* bloco TÍTULO manga (sup-esq) — cantos arredondados inf-dir. fs 60 medido (cap 42-46, passo 66-70) */}
      <div style={{position: 'absolute', left: 0, top: 0, width: '50%', height: blocoH,
        background: C.manga, borderBottomRightRadius: 40, zIndex: 2,
        display: 'flex', alignItems: 'center', padding: '0 48px 0 64px', boxSizing: 'border-box'}}>
        <TextoRico style={{color: C.grafite, fontSize: 60, fontWeight: 400, lineHeight: 1.12, display: 'block'}}>
          {titulo}
        </TextoRico>
      </div>

      {/* bloco TEXTO soft (sup-dir) — fs 40 medido, CENTRADO verticalmente (como o modelo) */}
      <div style={{position: 'absolute', right: 0, top: 0, width: '50%', height: blocoH,
        background: C.soft, borderBottomLeftRadius: 40, zIndex: 1,
        display: 'flex', alignItems: 'center', padding: '0 48px 0 84px', boxSizing: 'border-box'}}>
        <TextoRico style={{color: C.grafite, fontSize: 40, fontWeight: 400, lineHeight: 1.3, display: 'block'}}>
          {texto}
        </TextoRico>
      </div>

      {/* faixa inferior manga + "Arrasta pro lado." */}
      <div style={{position: 'absolute', left: 0, bottom: 0, width: '100%', height: faixaH,
        background: C.manga, borderTopRightRadius: 40, zIndex: 1,
        display: 'flex', alignItems: 'center', paddingLeft: '26%'}}>
        <span style={{color: C.grafite, fontSize: 28, fontWeight: 400}}>Arrasta pro lado.</span>
      </div>
      <BotaoSeta story={story} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────  MIOLO (slides 2-5)  ─────────────────────
 * Modo normal (2-4): fundo soft + card manga (0→80.8%).
 * Modo cardClaro (slide 5, mais conteúdo): fundo manga + card soft (0→84.4%).
 * fs 44 lh 1.3 NOS DOIS MODOS (medido no POST 243 5 — cardClaro NÃO reduz fonte). */
export type SpinMioloProps = {perguntas: string; cardClaro?: boolean; fontSize?: number; marca?: boolean; story?: boolean};
export const SpinMiolo: React.FC<SpinMioloProps> = ({perguntas, cardClaro = false, fontSize, marca = false, story = false}) => {
  const fundo = cardClaro ? C.manga : C.soft;
  const card = cardClaro ? C.soft : C.manga;
  const faixa = cardClaro ? C.soft : C.manga;
  const fs = fontSize ?? 44;
  // story: card flutuante centrado com ALTURA EM PX ≈ à do feed (1091/1140px) → mesma densidade;
  // 4 cantos arredondados (não nasce do topo).
  const cardStyle = story
    ? {top: `${((1920 - (cardClaro ? 1140 : 1091)) / 2 / 1920) * 100}%`, height: `${((cardClaro ? 1140 : 1091) / 1920) * 100}%`, borderRadius: 60}
    : {top: 0, height: cardClaro ? '84.4%' : '80.8%', borderBottomLeftRadius: 60, borderBottomRightRadius: 60};
  return (
    <AbsoluteFill style={{...baseFill, backgroundColor: fundo}}>
      {marca && <MarcaPadrao fundo={cardClaro ? 'manga' : 'soft'} />}
      {/* card central — L13.6% W72.8% (medido); texto x-left = card + 100px */}
      <div style={{position: 'absolute', left: '13.6%', width: '72.8%',
        background: card, ...cardStyle,
        zIndex: 1, display: 'flex', alignItems: 'center', padding: '0 100px', boxSizing: 'border-box'}}>
        <TextoRico style={{color: C.grafite, fontSize: fs, fontWeight: 400, lineHeight: 1.3, display: 'block'}}>
          {perguntas}
        </TextoRico>
      </div>
      {/* faixa inferior (rodapé) */}
      <div style={{position: 'absolute', left: 0, bottom: 0, width: '100%', height: story ? '9%' : '13%',
        background: faixa, borderTopRightRadius: 40, zIndex: 0}} />
      <BotaoSeta story={story} />
    </AbsoluteFill>
  );
};

/* ─────────────────────────  CTA (slide 6)  ───────────────────────────
 * fs 44 lh1.3 no texto E no destaque (medido); texto top ≈22%; sub-card T61% H16.4%. */
export type SpinCtaProps = {texto: string; destaque: string; marca?: boolean; fontSize?: number; story?: boolean};
export const SpinCta: React.FC<SpinCtaProps> = ({texto, destaque, marca = false, fontSize = 44, story = false}) => {
  // story: grupo texto+destaque desce pro centro visual do card mais alto
  const g = story
    ? {cardTop: '8%', cardH: '84%', seloTop: '12%', textoTop: '24%', subTop: '56%', subH: '11.6%'}
    : {cardTop: '7%', cardH: '86%', seloTop: '12.7%', textoTop: '21.5%', subTop: '61%', subH: '16.4%'};
  return (
    <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
      {marca && <MarcaPadrao fundo="manga" />}
      {/* card claro grande */}
      <div style={{position: 'absolute', left: '9.3%', top: g.cardTop, width: '81.4%', height: g.cardH,
        background: C.soft, borderRadius: 36, zIndex: 1}} />

      {/* selo grafite (sup-dir do card) */}
      <Img src={staticFile('oficial/selo-grafite.png')} alt="DOMa"
        style={{position: 'absolute', left: '80.3%', top: g.seloTop, width: 176, height: 176, zIndex: 3}} />

      {/* texto corrido */}
      <div style={{position: 'absolute', left: '18.5%', top: g.textoTop, width: '63%', zIndex: 2}}>
        <TextoRico style={{color: C.grafite, fontSize, fontWeight: 400, lineHeight: 1.3, display: 'block'}}>
          {texto}
        </TextoRico>
      </div>

      {/* sub-card destaque manga (CTA final) — T61% H16.4% (medido) */}
      <div style={{position: 'absolute', left: '18.5%', top: g.subTop, width: '63.1%', height: g.subH,
        background: C.manga, borderRadius: 22, zIndex: 2,
        display: 'flex', alignItems: 'center', padding: '0 38px', boxSizing: 'border-box'}}>
        <TextoRico style={{color: C.grafite, fontSize, fontWeight: 400, lineHeight: 1.3, display: 'block'}}>
          {destaque}
        </TextoRico>
      </div>
    </AbsoluteFill>
  );
};
