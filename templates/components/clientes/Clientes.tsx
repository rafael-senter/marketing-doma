import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma} from '../../../components';

/**
 * PADRÃO "CLIENTE NOVO" (v2) — recriação medida de
 * "doma-brand/tipos-de-posts/tipos de posts/Clientes/LAYOUT CLIENTE NOVO - FEED.png".
 * Medições (layout-mapper + numpy): fundo #F4BB35; foto card x6.3% y10.1% w87.3% h55.1% raio~40;
 * pílula local centralizada x22.7-77.3% y60.4% (grafite #212121, pin+texto branco);
 * texto x18.1% y70.7% fontSize 62 3 linhas (nome bold, "DOMa"=logo); rodapé y94.1% centralizado.
 * VARIA: foto, nome do cliente, cidade. FIXO: layout, watermark, rodapé. Render por render-still.sh.
 */
const C = {fundo: '#F4BB35', grafite: '#212121', branco: '#FFFFFF', wm: '#F6C85D'};
const F = brand.fontes.titulo;

// watermark "DOMa" em OUTLINE (contorno tom-sobre-tom) via 2 CSS masks:
// camada cheia na cor do contorno + camada menor na cor do fundo por cima (come o interior).
const wmUrl = `url(${staticFile('oficial/logotipo-principal-branco.png')})`;
const wmMask = {WebkitMaskImage: wmUrl, maskImage: wmUrl, WebkitMaskSize: '100% 100%',
  maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat'} as const;
const WatermarkOutline: React.FC = () => (
  <div style={{position: 'absolute', top: '2.2%', left: '-25%', width: '150%', aspectRatio: '1767 / 322', zIndex: 0}}>
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

export type ClientesProps = {foto: string; nome: string; cidade: string};

export const Clientes: React.FC<ClientesProps> = ({foto, nome, cidade}) => (
  <AbsoluteFill style={{
    backgroundColor: C.fundo, fontFamily: F, overflow: 'hidden',
    WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision',
  }}>
    {/* watermark "DOMa" outline sangrando o topo (tom-sobre-tom) */}
    <WatermarkOutline />

    {/* card foto arredondado */}
    <div style={{position: 'absolute', left: '6.3%', top: '10.1%', width: '87.3%', height: '55.1%',
      borderRadius: 40, overflow: 'hidden', zIndex: 1, boxShadow: '0 8px 30px #00000026'}}>
      <Img src={staticFile(foto)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </div>

    {/* pílula de localização (centralizada, sobre a base da foto) */}
    <div style={{position: 'absolute', left: '50%', top: '60.4%', transform: 'translateX(-50%)',
      height: '6.5%', background: C.grafite, borderRadius: 999, zIndex: 2,
      display: 'flex', alignItems: 'center', gap: 12, padding: '0 34px'}}>
      <Pin />
      <span style={{color: C.branco, fontSize: 34, fontWeight: 600}}>{cidade}</span>
    </div>

    {/* texto principal (3 linhas, nome em bold, "DOMa" = logo oficial)
        medido: 3 linhas y955/1033/1101, larg linha2≈650, logo da 3ª linha maior */}
    <div style={{position: 'absolute', left: '18.1%', top: '69.8%', right: '6%', zIndex: 2,
      color: C.grafite, lineHeight: 1.12}}>
      <div style={{fontSize: 64}}>
        <span style={{fontWeight: 400}}>A </span><span style={{fontWeight: 800}}>{nome}</span>
      </div>
      <div style={{fontSize: 64, fontWeight: 400}}>agora faz parte do time</div>
      <div style={{fontSize: 64, fontWeight: 400, display: 'flex', alignItems: 'center', gap: 16}}>
        de clientes da <LogoDoma cor={C.grafite} tamanho={64} wordmark />
      </div>
    </div>

    {/* rodapé — medido: cap~22, larg~483, peso medium (densidade 0.27, não bold) */}
    <div style={{position: 'absolute', top: '94%', left: 0, right: 0, textAlign: 'center',
      color: C.grafite, fontSize: 24, fontWeight: 500, letterSpacing: 1, zIndex: 2}}>
      DOMINE A GESTÃO DO SEU NEGÓCIO
    </div>
  </AbsoluteFill>
);
