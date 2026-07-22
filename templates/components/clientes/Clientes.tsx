import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma} from '../../../components';

/**
 * PADRÃO "CLIENTE NOVO" (v3) — recriação medida de
 * "doma-brand/tipos-de-posts/tipos de posts/Clientes/LAYOUT CLIENTE NOVO - FEED.png".
 * Medições (layout-mapper + numpy): fundo #F4BB35; foto card x68 y136 w943 h744 raio40;
 * pílula local centralizada, grafite #212121 (pin+texto branco); texto 3 linhas fs64
 * (nome bold, "DOMa"=logo); watermark "DOMa" OUTLINE tom-sobre-tom #F5C758 (bg #F4BB35).
 * VARIA: foto, nome do cliente, cidade. FIXO: layout, watermark, rodapé.
 *
 * ⚠️ POSIÇÕES EM PX (não %): no story (1080×1920) o % esticaria a foto/pílula.
 * Regra do plugin: story mantém o MESMO tamanho em px, só reposiciona (zona segura do Instagram).
 * Render por render-still.sh (story: `render-still.sh <id>-story 1080 1920`).
 */
const C = {fundo: '#F4BB35', grafite: '#212121', branco: '#FFFFFF', wm: '#F5C758'};
const F = brand.fontes.titulo;

// watermark "DOMa" em OUTLINE (contorno tom-sobre-tom) via 2 CSS masks:
// camada cheia na cor do contorno + camada menor na cor do fundo por cima (come o interior).
const wmUrl = `url(${staticFile('oficial/logotipo-principal-branco.png')})`;
const wmMask = {WebkitMaskImage: wmUrl, maskImage: wmUrl, WebkitMaskSize: '100% 100%',
  maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat'} as const;
const WatermarkOutline: React.FC<{top: number}> = ({top}) => (
  <div style={{position: 'absolute', top, left: '-25%', width: '150%', aspectRatio: '1767 / 322', zIndex: 0}}>
    <div style={{position: 'absolute', inset: 0, backgroundColor: C.wm, ...wmMask}} />
    <div style={{position: 'absolute', inset: '6px 4px', backgroundColor: C.fundo, ...wmMask}} />
  </div>
);

// pin de localização (gota branca + furo grafite) — ícone da pílula
const Pin: React.FC = () => (
  <svg width="26" height="33" viewBox="0 0 26 33" fill="none">
    <path d="M13 1C6.4 1 1 6.2 1 12.6 1 21.5 13 32 13 32s12-10.5 12-19.4C25 6.2 19.6 1 13 1z" fill="#fff" />
    <circle cx="13" cy="12.6" r="4.4" fill="#212121" />
  </svg>
);

export type ClientesProps = {foto: string; nome: string; cidade: string; story?: boolean};

export const Clientes: React.FC<ClientesProps> = ({foto, nome, cidade, story}) => {
  // grupo (wm + foto + pílula + texto) mantém os MESMOS tamanhos px; só o topo da foto muda.
  const photoTop = story ? 470 : 136;          // story: desce o bloco p/ a zona segura do 9:16
  const wmTop = photoTop - 106;                 // watermark sangra logo acima da foto
  const pilulaTop = photoTop + 679;             // pílula sobre a base da foto (offset medido)
  const textoTop = photoTop + 806;              // texto 3 linhas abaixo da pílula
  const rodapeTop = story ? 1770 : 1269;        // rodapé fixo na base de cada formato
  return (
  <AbsoluteFill style={{
    backgroundColor: C.fundo, fontFamily: F, overflow: 'hidden',
    WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision',
  }}>
    {/* watermark "DOMa" outline (tom-sobre-tom #F5C758) */}
    <WatermarkOutline top={wmTop} />

    {/* card foto arredondado — MESMO tamanho px nos 2 formatos */}
    <div style={{position: 'absolute', left: 68, top: photoTop, width: 943, height: 744,
      borderRadius: 40, overflow: 'hidden', zIndex: 1, boxShadow: '0 8px 30px #00000026'}}>
      <Img src={staticFile(foto)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </div>

    {/* pílula de localização (centralizada, sobre a base da foto) */}
    <div style={{position: 'absolute', left: '50%', top: pilulaTop, transform: 'translateX(-50%)',
      height: 88, background: C.grafite, borderRadius: 999, zIndex: 2,
      display: 'flex', alignItems: 'center', gap: 12, padding: '0 34px'}}>
      <Pin />
      <span style={{color: C.branco, fontSize: 34, fontWeight: 600}}>{cidade}</span>
    </div>

    {/* texto principal (3 linhas, nome em bold, "DOMa" = logo oficial) */}
    <div style={{position: 'absolute', left: 196, top: textoTop, right: 65, zIndex: 2,
      color: C.grafite, lineHeight: 1.12}}>
      <div style={{fontSize: 64}}>
        <span style={{fontWeight: 400}}>A </span><span style={{fontWeight: 600}}>{nome}</span>
      </div>
      <div style={{fontSize: 64, fontWeight: 400}}>agora faz parte do time</div>
      <div style={{fontSize: 64, fontWeight: 400, display: 'flex', alignItems: 'center', gap: 16}}>
        de clientes da <LogoDoma cor={C.grafite} tamanho={64} wordmark />
      </div>
    </div>

    {/* rodapé — cap~22, peso medium, letterSpacing 1 */}
    <div style={{position: 'absolute', top: rodapeTop, left: 0, right: 0, textAlign: 'center',
      color: C.grafite, fontSize: 24, fontWeight: 600, letterSpacing: 1, zIndex: 2}}>
      DOMINE A GESTÃO DO SEU NEGÓCIO
    </div>
  </AbsoluteFill>
  );
};
