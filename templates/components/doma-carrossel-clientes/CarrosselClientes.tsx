import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico} from '../../../components';

/**
 * PADRÃO "DOMA / CARROSSEL CLIENTES" (v2) — POST 205 (8 slides).
 * Sistema: capa institucional → 6 cards de cliente (logo de terceiro + texto) → fecho.
 *   - ClientesCapa  : fundo manga + grafismos soft + logo DOMa (sup-esq) + card claro c/ frase + texto solto inf.
 *   - ClientesMiolo : fundo manga + CARD com logo do cliente (recortado do modelo, p/ não falsear logo
 *                     de terceiro) no topo + texto corrido embaixo (bold no nome do cliente e em DOMa).
 *   - ClientesFecho : fundo manga + grafismos soft + card claro c/ fecho.
 * Logos de terceiros = recortes _205-cardN.png (logo+card+cantos baked) — NUNCA recriados.
 * Cores: manga #F4BB35 · soft #F8DD6B · card-claro #EEEEEE · grafite #1F1F1F.
 */
const C = {manga: '#F4BB35', soft: '#F8DD6B', softLo: '#F6CC52', claro: '#EFEFEE', grafite: '#1F1F1F'};
const F = brand.fontes.titulo;

const baseFill = {
  fontFamily: F, overflow: 'hidden' as const,
  WebkitFontSmoothing: 'antialiased' as const, MozOsxFontSmoothing: 'grayscale' as const,
  textRendering: 'geometricPrecision' as const,
};

/* grafismos soft amber-on-amber — camada REAL extraída do modelo (content pintado de amber) */
const Grafismos: React.FC<{src: string}> = ({src}) => (
  <Img src={staticFile(src)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%',
    objectFit: 'cover', zIndex: 0}} />
);

/* ─────────────────────────  CAPA (slide 1)  ─────────────────────────
   ⚠️ MARCA: em texto corrido a empresa é "Doma" (não "DOMa"). O logo (sup-esq) usa LogoDoma (asset). */
export const ClientesCapa: React.FC<{story?: boolean}> = ({story}) => {
  const cardTop = story ? 540 : 358;   // card h575 px (não estica no story)
  return (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    <Grafismos src="oficial/_205-graf1.png" />
    {/* logo DOMa (sup-esq) */}
    <div style={{position: 'absolute', left: '16.4%', top: cardTop - 165, zIndex: 2}}>
      <LogoDoma cor={C.grafite} tamanho={70} wordmark />
    </div>
    {/* card claro com a frase */}
    <div style={{position: 'absolute', left: '9.4%', top: cardTop, width: '81.1%', height: 575,
      background: C.claro, borderRadius: 40, zIndex: 1, display: 'flex', alignItems: 'center',
      padding: '0 60px', boxSizing: 'border-box'}}>
      <TextoRico style={{color: C.grafite, fontSize: 58, fontWeight: 400, lineHeight: 1.2, display: 'block'}}>
        {'**Temos orgulho de\napoiar** redes com dezenas de lojas, indústrias com centenas de colaboradores e franquias //que não param de crescer.//'}
      </TextoRico>
    </div>
    {/* texto solto inferior */}
    <div style={{position: 'absolute', left: '22.1%', top: cardTop + 685, width: '38.3%', zIndex: 2}}>
      <TextoRico style={{color: C.grafite, fontSize: 44, fontWeight: 400, lineHeight: 1.22, display: 'block'}}>
        {'Porque grandes negócios precisam de uma **gestão à altura.**'}
      </TextoRico>
    </div>
  </AbsoluteFill>
  );
};

/* ─────────────────────────  MIOLO (slides 2-7)  ───────────────────── */
export type ClientesMioloProps = {card: string; texto: string; story?: boolean};
export const ClientesMiolo: React.FC<ClientesMioloProps> = ({card, texto, story}) => {
  const cardTop = story ? 300 : 135;   // card h575 px
  return (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    {/* card do cliente (logo+card+cantos recortado do modelo) */}
    <Img src={staticFile(card)} style={{position: 'absolute', left: '9.4%', top: cardTop,
      width: '81.1%', height: 575, objectFit: 'fill', zIndex: 1}} />
    {/* texto corrido embaixo */}
    <div style={{position: 'absolute', left: '16.7%', top: cardTop + 637, width: '72%', zIndex: 2}}>
      <TextoRico style={{color: C.grafite, fontSize: 46, fontWeight: 400, lineHeight: 1.42, display: 'block'}}>
        {texto}
      </TextoRico>
    </div>
  </AbsoluteFill>
  );
};

/* ─────────────────────────  FECHO (slide 8)  ───────────────────────── */
export const ClientesFecho: React.FC<{story?: boolean}> = ({story}) => {
  const cardTop = story ? 560 : 387;   // card h575 px
  return (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    <Grafismos src="oficial/_205-graf8.png" />
    <div style={{position: 'absolute', left: '9.4%', top: cardTop, width: '81.1%', height: 575,
      background: C.claro, borderRadius: 40, zIndex: 1, display: 'flex', alignItems: 'center',
      padding: '0 64px', boxSizing: 'border-box'}}>
      <TextoRico style={{color: C.grafite, fontSize: 50, fontWeight: 400, lineHeight: 1.3, display: 'block'}}>
        {'Da indústria ao varejo: a **Doma** está presente em negócios que não param de crescer.\n\nPorque grandes empresas precisam de uma gestão à altura.'}
      </TextoRico>
    </div>
  </AbsoluteFill>
  );
};
