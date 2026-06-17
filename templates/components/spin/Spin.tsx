import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico} from '../../../components';

/**
 * PADRÃO "SPIN" (v2) — recriação medida dos carrosséis POST 243 / 251.
 * Carrossel de perguntas SPIN. 3 templates de slide (todos 1080×1350):
 *   - SpinCapa  : split topo (manga título | soft texto) + foto full-bleed + faixa "Arrasta pro lado." + botão seta.
 *   - SpinMiolo : fundo soft + card manga central (L13.6% W72.8%) c/ lista de perguntas "→" + faixa + botão seta.
 *   - SpinCTA   : fundo manga + card soft (L9.3% T7% W81.4% H86%) + selo grafite (sup-dir) + texto + sub-card destaque manga.
 * Cores medidas: manga #F4BB35 · soft #F8DD6B · grafite #1F1F1F. Card miolo pode ser manga OU soft (slide 5).
 */
const C = {manga: '#F4BB35', soft: '#F8DD6B', grafite: '#1F1F1F', branco: '#FFFFFF', preto: '#212121'};
const F = brand.fontes.titulo;

const baseFill = {
  fontFamily: F, overflow: 'hidden' as const,
  WebkitFontSmoothing: 'antialiased' as const, MozOsxFontSmoothing: 'grayscale' as const,
  textRendering: 'geometricPrecision' as const,
};

/* ── Marca d'água: logo OFICIAL "DOMa" tom-sobre-tom (RULES §9, padrão Frase em Pílulas) ──
 * Forma = logo oficial recortada por CSS mask (logotipo BRANCO = alpha) + backgroundColor
 * na cor-tinta. NUNCA logo `-cor` (some), nem opacity (sai cinza), nem maskRepeat (mosaico).
 * Cor = só ~5% mais escura que o fundo (quase imperceptível). manga#F4BB35→#F2B12F.
 * Layout = "DOMa" DEITADO ocupando a largura toda (aspectRatio 1767/322), em FAIXAS
 * horizontais empilhadas com gap medido. Opt-in via prop `marca` (não altera 243/251). */
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

/* botão circular branco (canto inf-dir) com seta — comum a capa e miolo */
const BotaoSeta: React.FC = () => (
  <div style={{position: 'absolute', right: '5.5%', bottom: '4.5%', width: 150, height: 150,
    borderRadius: '50%', background: C.branco, zIndex: 4,
    display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <SetaReta />
  </div>
);

/* ─────────────────────────  CAPA (slide 1)  ───────────────────────── */
export type SpinCapaProps = {titulo: string; texto: string; foto: string; marca?: boolean};
export const SpinCapa: React.FC<SpinCapaProps> = ({titulo, texto, foto, marca = false}) => (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.soft}}>
    {marca && <MarcaPadrao fundo="soft" />}
    {/* foto full-bleed na metade inferior (de ~35% até ~88%) */}
    <Img src={staticFile(foto)} style={{position: 'absolute', left: 0, right: 0, top: '34%', height: '54%',
      width: '100%', objectFit: 'cover', zIndex: 0}} />

    {/* bloco TÍTULO manga (sup-esq) — cantos arredondados inf-dir */}
    <div style={{position: 'absolute', left: 0, top: 0, width: '50%', height: '40%',
      background: C.manga, borderBottomRightRadius: 40, zIndex: 2,
      display: 'flex', alignItems: 'center', padding: '0 56px 0 56px', boxSizing: 'border-box'}}>
      <TextoRico style={{color: C.grafite, fontSize: 52, fontWeight: 400, lineHeight: 1.12, display: 'block'}}>
        {titulo}
      </TextoRico>
    </div>

    {/* bloco TEXTO soft (sup-dir) */}
    <div style={{position: 'absolute', right: 0, top: 0, width: '50%', height: '40%',
      background: C.soft, borderBottomLeftRadius: 40, zIndex: 1,
      display: 'flex', alignItems: 'flex-start', padding: '54px 48px 0 40px', boxSizing: 'border-box'}}>
      <TextoRico style={{color: C.grafite, fontSize: 30, fontWeight: 400, lineHeight: 1.25, display: 'block'}}>
        {texto}
      </TextoRico>
    </div>

    {/* faixa inferior manga + "Arrasta pro lado." */}
    <div style={{position: 'absolute', left: 0, bottom: 0, width: '100%', height: '13%',
      background: C.manga, borderTopRightRadius: 40, zIndex: 1,
      display: 'flex', alignItems: 'center', paddingLeft: '26%'}}>
      <span style={{color: C.grafite, fontSize: 28, fontWeight: 400}}>Arrasta pro lado.</span>
    </div>
    <BotaoSeta />
  </AbsoluteFill>
);

/* ─────────────────────────  MIOLO (slides 2-5)  ─────────────────────
 * Modo normal (2-4): fundo soft + card manga.
 * Modo cardClaro (slide 5, mais conteúdo): fundo manga + card soft + fonte menor. */
export type SpinMioloProps = {perguntas: string; cardClaro?: boolean; fontSize?: number; marca?: boolean};
export const SpinMiolo: React.FC<SpinMioloProps> = ({perguntas, cardClaro = false, fontSize, marca = false}) => {
  const fundo = cardClaro ? C.manga : C.soft;
  const card = cardClaro ? C.soft : C.manga;
  const faixa = cardClaro ? C.soft : C.manga;
  const fs = fontSize ?? (cardClaro ? 37 : 44);
  return (
    <AbsoluteFill style={{...baseFill, backgroundColor: fundo}}>
      {marca && <MarcaPadrao fundo={cardClaro ? 'manga' : 'soft'} />}
      {/* card central — L13.6% W72.8%, do topo até ~82%, cantos arredondados no rodapé */}
      <div style={{position: 'absolute', left: '13.6%', top: 0, width: '72.8%', height: '82%',
        background: card, borderBottomLeftRadius: 60, borderBottomRightRadius: 60,
        zIndex: 1, display: 'flex', alignItems: 'center', padding: '0 86px', boxSizing: 'border-box'}}>
        <TextoRico style={{color: C.grafite, fontSize: fs, fontWeight: 400, lineHeight: 1.26, display: 'block'}}>
          {perguntas}
        </TextoRico>
      </div>
      {/* faixa inferior (rodapé) */}
      <div style={{position: 'absolute', left: 0, bottom: 0, width: '100%', height: '13%',
        background: faixa, borderTopRightRadius: 40, zIndex: 0}} />
      <BotaoSeta />
    </AbsoluteFill>
  );
};

/* ─────────────────────────  CTA (slide 6)  ─────────────────────────── */
export type SpinCtaProps = {texto: string; destaque: string; marca?: boolean};
export const SpinCta: React.FC<SpinCtaProps> = ({texto, destaque, marca = false}) => (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    {marca && <MarcaPadrao fundo="manga" />}
    {/* card claro grande */}
    <div style={{position: 'absolute', left: '9.3%', top: '7%', width: '81.4%', height: '86%',
      background: C.soft, borderRadius: 36, zIndex: 1}} />

    {/* selo grafite (sup-dir do card) */}
    <Img src={staticFile('oficial/selo-grafite.png')} alt="DOMa"
      style={{position: 'absolute', left: '80.3%', top: '12.7%', width: 176, height: 176, zIndex: 3}} />

    {/* texto corrido */}
    <div style={{position: 'absolute', left: '18.5%', top: '24%', width: '63%', zIndex: 2}}>
      <TextoRico style={{color: C.grafite, fontSize: 41, fontWeight: 400, lineHeight: 1.3, display: 'block'}}>
        {texto}
      </TextoRico>
    </div>

    {/* sub-card destaque manga (CTA final) — L18.5% W63.1% T62% H15.3% (medido) */}
    <div style={{position: 'absolute', left: '18.5%', top: '62%', width: '63.1%', height: '15.3%',
      background: C.manga, borderRadius: 22, zIndex: 2,
      display: 'flex', alignItems: 'center', padding: '0 38px', boxSizing: 'border-box'}}>
      <TextoRico style={{color: C.grafite, fontSize: 38, fontWeight: 400, lineHeight: 1.26, display: 'block'}}>
        {destaque}
      </TextoRico>
    </div>
  </AbsoluteFill>
);
