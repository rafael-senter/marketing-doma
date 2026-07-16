import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico} from '../../../components';

/**
 * PADRÃO "DICAS CARROSSEL" (v2) — carrosséis numerados de erros/dicas.
 * Modelos: POST 246 (margem de lucro), 133 (ótica), 193 (Trento). Sistema comum:
 *   - DicasCapa  : fundo manga + watermark DOMa gigante + ícones line-art (PNG do modelo) +
 *                  título com highlight soft + subtítulo (trecho bold) + faixa inf "ARRASTA PRO LADO →".
 *   - DicasMiolo : card soft topo (número grande grafite + título bold) + card branco (corpo).
 *   - DicasCta   : fundo manga + card claro + selo grafite + texto corrido (bold em trecho) + logo DOMa rodapé.
 * Cores: manga #F4BB35 · soft #F8DD6B · watermark #F2B02C (medida no modelo — MAIS ESCURA que fundo) · branco #FFF · grafite #1F1F1F.
 */
const C = {manga: '#F4BB35', soft: '#F8DD6B', watermark: '#F2B02C', branco: '#FFFFFF', grafite: '#1F1F1F'};
const F = brand.fontes.titulo;
const maskUrl = `url(${staticFile('oficial/logotipo-principal-branco.png')})`;

const baseFill = {
  fontFamily: F, overflow: 'hidden' as const,
  WebkitFontSmoothing: 'antialiased' as const, MozOsxFontSmoothing: 'grayscale' as const,
  textRendering: 'geometricPrecision' as const,
};

/* ─────────────────────────  CAPA (slide 1)  ───────────────────────── */
export type DicasCapaProps = {
  titulo: string;          // ex.: 'ERROS\nCOMUNS' (vira highlight soft)
  subtitulo: string[];     // 1 string por linha; prefixo '**' = linha bold (ex.: '**margem')
  icones: string;          // PNG line-art transparente extraído do modelo
};
export const DicasCapa: React.FC<DicasCapaProps> = ({titulo, subtitulo, icones}) => (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    {/* watermark "DOMa" gigante no topo (tom-sobre-tom) */}
    <div style={{position: 'absolute', top: '4%', left: '0%', width: '100%', aspectRatio: '1767 / 322',
      backgroundColor: C.watermark, WebkitMaskImage: maskUrl, maskImage: maskUrl,
      WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
      zIndex: 0}} />

    {/* ícones line-art (extraídos do modelo) — centro */}
    <Img
      src={staticFile(icones)}
      style={{
        position: 'absolute',
        left: '19.4%',
        top: '27.6%',
        width: '51.3%',
        height: '42.1%',
        objectFit: 'contain',
        zIndex: 1,
        translate: "78.5px 4.3px"
      }} />

    {/* título com highlight soft (esq) */}
    <div style={{position: 'absolute', left: '7%', top: '29%', zIndex: 2}}>
      <TextoRicoHighlight texto={titulo} />
    </div>

    {/* subtítulo (dir-inf): 1 linha por item; '**' no início = bold */}
    <div style={{position: 'absolute', right: '7%', top: '56%', textAlign: 'right', zIndex: 2,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
      {subtitulo.map((linha, i) => {
        const bold = linha.startsWith('**');
        return (
          <span key={i} style={{color: C.grafite, fontSize: 50, fontWeight: bold ? 700 : 400, lineHeight: 1.2}}>
            {bold ? linha.slice(2) : linha}
          </span>
        );
      })}
    </div>

    {/* faixa inferior soft + "ARRASTA PRO LADO →" */}
    <div style={{position: 'absolute', left: 0, bottom: 0, width: '100%', height: '8.8%',
      background: C.soft, borderTopLeftRadius: 40, borderTopRightRadius: 40, zIndex: 1,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12}}>
      <span style={{color: C.grafite, fontSize: 38, fontWeight: 400, letterSpacing: 4}}>ARRASTA PRO LADO</span>
      <span style={{color: C.grafite, fontSize: 38, fontWeight: 400}}>→</span>
    </div>
  </AbsoluteFill>
);

/* título da capa: cada linha em caixa highlight soft (fundo soft, texto grafite bold) */
const TextoRicoHighlight: React.FC<{texto: string}> = ({texto}) => (
  <div style={{display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6}}>
    {texto.split('\n').map((linha, i) => (
      <span key={i} style={{background: C.soft, color: C.grafite, fontSize: 78, fontWeight: 700,
        lineHeight: 1.0, padding: '6px 16px', boxDecorationBreak: 'clone'}}>{linha}</span>
    ))}
  </div>
);

/* ─────────────────────────  MIOLO (slides 2-8)  ───────────────────── */
export type DicasMioloProps = {
  numero: string; titulo: string; corpo: string;
  headerHeight?: number;        // % altura do card soft topo (default 36.5 — POST 246)
  numeroSize?: number;          // px (default 200)
  tituloSize?: number;          // px (default 50)
};
export const DicasMiolo: React.FC<DicasMioloProps> = ({numero, titulo, corpo,
  headerHeight = 36.5, numeroSize = 200, tituloSize = 50}) => {
  const corpoTop = headerHeight + 0.1;
  const corpoH = Math.min(89 - corpoTop, 60);
  return (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    {/* card soft topo (full-width, cantos inf arredondados) */}
    <div style={{position: 'absolute', left: 0, top: 0, width: '100%', height: `${headerHeight}%`,
      background: C.soft, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, zIndex: 1,  /* raio 51 medido */
      display: 'flex', alignItems: 'center', padding: '0 56px', boxSizing: 'border-box'}}>
      {/* número grande */}
      <span style={{color: C.grafite, fontSize: numeroSize, fontWeight: 700, lineHeight: 0.9, letterSpacing: -6}}>{numero}</span>
      {/* título à direita do número */}
      <div style={{marginLeft: 36, flex: 1}}>
        <TextoRico style={{color: C.grafite, fontSize: tituloSize, fontWeight: 700, lineHeight: 1.1, display: 'block'}}>
          {titulo}
        </TextoRico>
      </div>
    </div>

    {/* card branco com o corpo */}
    <div style={{position: 'absolute', left: '11.7%', top: `${corpoTop}%`, width: '76.6%', height: `${corpoH}%`,
      background: C.branco, borderRadius: 43, zIndex: 1,  /* raio 43 medido */
      display: 'flex', alignItems: 'center', padding: '0 64px', boxSizing: 'border-box'}}>
      <TextoRico style={{color: C.grafite, fontSize: 40, fontWeight: 400, lineHeight: 1.37, display: 'block'}}>
        {corpo}
      </TextoRico>
    </div>
  </AbsoluteFill>
);
};

/* variante "compact" do miolo — header menor (28%), número 150, título 44 */
export const DicasMioloCompact: React.FC<Omit<DicasMioloProps, 'headerHeight' | 'numeroSize' | 'tituloSize'>> =
  (props) => <DicasMiolo {...props} headerHeight={28} numeroSize={150} tituloSize={44} />;

/* ─────────────────────────  CTA (slide final)  ─────────────────────── */
export type DicasCtaProps = {texto: string};
export const DicasCta: React.FC<DicasCtaProps> = ({texto}) => (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    <div style={{position: 'absolute', left: '9.3%', top: '18.8%', width: '81.4%', height: '62.3%',
      background: C.soft, borderRadius: 54, zIndex: 1}} />  {/* raio 54 medido */}
    <Img
      src={staticFile('oficial/selo-grafite.png')}
      alt="DOMa"
      style={{position: 'absolute', left: '80.3%', top: '14.2%', width: 176, height: 176, zIndex: 3}} />
    <div style={{position: 'absolute', left: '20.5%', top: '28.5%', width: '64%', zIndex: 2}}>
      <TextoRico style={{color: C.grafite, fontSize: 44, fontWeight: 400, lineHeight: 1.27, display: 'block'}}>
        {texto}
      </TextoRico>
    </div>
    <div style={{position: 'absolute', bottom: '6%', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 3}}>
      <LogoDoma cor={C.grafite} tamanho={70} wordmark />
    </div>
  </AbsoluteFill>
);
