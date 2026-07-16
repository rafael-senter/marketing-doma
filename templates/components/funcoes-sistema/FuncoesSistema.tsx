import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico} from '../../../components';

/**
 * PADRÃO "FUNÇÕES DO SISTEMA" (v2) — POST 127, 201, 207, 248, 266, 273.
 * Base fotorrealista (mão+iPhone OU laptop + tela do ERP) gerada via nanobanana (RULES §6),
 * salva em public/oficial/_func<NNN>-base.png. Overlays crispos no Remotion via slots opcionais.
 * Cores medidas: manga #F4BB35 · soft #F7DC6B · grafite #202020 · branco #FFF.
 * Cada post acende só os slots que usa (título-topo, big-número, corpo, balões, badge, logo, watermark).
 */
const C = {manga: '#F4BB35', soft: '#F7DC6B', grafite: '#202020', branco: '#FFFFFF'};
const F = brand.fontes.titulo;
const maskUrl = `url(${staticFile('oficial/logotipo-principal-branco.png')})`;

const baseFill = {
  fontFamily: F, overflow: 'hidden' as const,
  WebkitFontSmoothing: 'antialiased' as const, MozOsxFontSmoothing: 'grayscale' as const,
  textRendering: 'geometricPrecision' as const,
};

type Caixa = {texto: string; left: string; top: string; width: string; fontSize?: number};

export type FuncoesSistemaProps = {
  base?: string;                       // base full-bleed (nanobanana). Opcional: peças com mockupBrowser não usam.
  mockupBrowser?: {src: string; left: string; top: string; width: string; rotate?: number};
                                       // frame de browser em código (RULES §6 alternativa sem nanobanana):
                                       // barra com 3 dots + cantos arredondados + sombra, tela = print real do ERP
  selo?: {src: string; left: string; top: string; width: string};  // selo PNG oficial (ex: selo-14anos-1)
  imagem?: {src: string; left: string; top: string; width: string; rotate?: number; sombra?: boolean};
                                       // imagem posicionada SEM chrome (ex: base nanobanana transp de notebook/phone)
  watermark?: boolean;                 // "DOMa" topo (full-width)
  watermarkCor?: string;               // cor da watermark. Padrão do projeto = TOM DE BRANCO fraco tom-sobre-tom
                                       // (~18% branco sobre manga = #F6C554), nunca escura (correção Patrick 2026-07-16 ×2)
  logoTopo?: boolean;                  // logo DOMa grafite centralizado no topo
  logoRodape?: boolean;                // logo DOMa grafite centralizado no rodapé
  bigNumero?: {texto: string; left: string; top: string; fontSize?: number};
  tituloTopo?: {texto: string; left?: string; top: string; width: string; fontSize?: number; align?: 'left' | 'center'};
  corpo?: Caixa;                       // texto corrido grafite
  balaoEscuro?: Caixa;                 // bolha grafite, texto branco
  balaoSoft?: Caixa;                   // bolha soft, texto grafite
  badge?: {numero: string; left: string; top: string; size?: string};
};

export const FuncoesSistema: React.FC<FuncoesSistemaProps> = (p) => (
  <AbsoluteFill style={{...baseFill, backgroundColor: C.manga}}>
    {p.base && (
      <Img src={staticFile(p.base)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', zIndex: 0}} />
    )}

    {p.mockupBrowser && (
      <div style={{position: 'absolute', left: p.mockupBrowser.left, top: p.mockupBrowser.top, width: p.mockupBrowser.width,
        zIndex: 2, borderRadius: 22, overflow: 'hidden', background: C.branco,
        transform: p.mockupBrowser.rotate ? `rotate(${p.mockupBrowser.rotate}deg)` : undefined,
        boxShadow: '0 30px 70px rgba(32,32,32,0.35)'}}>
        <div style={{height: 44, background: '#EDEDED', display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 22}}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
            <div key={c} style={{width: 14, height: 14, borderRadius: '50%', background: c}} />
          ))}
        </div>
        <Img src={staticFile(p.mockupBrowser.src)} style={{display: 'block', width: '100%', height: 'auto'}} />
      </div>
    )}

    {p.imagem && (
      <Img src={staticFile(p.imagem.src)} style={{position: 'absolute', left: p.imagem.left, top: p.imagem.top,
        width: p.imagem.width, height: 'auto', zIndex: 2,
        transform: p.imagem.rotate ? `rotate(${p.imagem.rotate}deg)` : undefined,
        filter: p.imagem.sombra === false ? undefined : 'drop-shadow(0 30px 50px rgba(32,32,32,0.30))'}} />
    )}

    {p.selo && (
      <Img src={staticFile(p.selo.src)} style={{position: 'absolute', left: p.selo.left, top: p.selo.top,
        width: p.selo.width, height: 'auto', zIndex: 3}} />
    )}

    {p.watermark && (
      <div style={{position: 'absolute', top: '4%', left: '0%', width: '100%', aspectRatio: '1767 / 322',
        backgroundColor: p.watermarkCor ?? '#F6C554', WebkitMaskImage: maskUrl, maskImage: maskUrl,
        WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        zIndex: 1}} />
    )}

    {p.logoTopo && (
      <div style={{position: 'absolute', top: '5.5%', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 3}}>
        <LogoDoma cor={C.grafite} tamanho={66} wordmark />
      </div>
    )}

    {p.bigNumero && (
      <span style={{position: 'absolute', left: p.bigNumero.left, top: p.bigNumero.top, zIndex: 2,
        color: C.grafite, fontSize: p.bigNumero.fontSize ?? 230, fontWeight: 800, lineHeight: 0.9, letterSpacing: -8}}>
        {p.bigNumero.texto}
      </span>
    )}

    {p.tituloTopo && (
      <div style={{position: 'absolute', left: p.tituloTopo.left ?? '0', top: p.tituloTopo.top, width: p.tituloTopo.width, zIndex: 2,
        textAlign: p.tituloTopo.align ?? 'center', ...(p.tituloTopo.align === 'center' ? {right: 0, margin: '0 auto'} : {})}}>
        <TextoRico style={{color: C.grafite, fontSize: p.tituloTopo.fontSize ?? 48, fontWeight: 400, lineHeight: 1.2, display: 'block'}}>
          {p.tituloTopo.texto}
        </TextoRico>
      </div>
    )}

    {p.corpo && (
      <div style={{position: 'absolute', left: p.corpo.left, top: p.corpo.top, width: p.corpo.width, zIndex: 2}}>
        <TextoRico style={{color: C.grafite, fontSize: p.corpo.fontSize ?? 44, fontWeight: 400, lineHeight: 1.22, display: 'block'}}>
          {p.corpo.texto}
        </TextoRico>
      </div>
    )}

    {p.balaoEscuro && (
      <div style={{position: 'absolute', left: p.balaoEscuro.left, top: p.balaoEscuro.top, width: p.balaoEscuro.width,
        background: C.grafite, borderRadius: 26, zIndex: 2, padding: '28px 32px', boxSizing: 'border-box'}}>
        <TextoRico style={{color: C.branco, fontSize: p.balaoEscuro.fontSize ?? 36, fontWeight: 400, lineHeight: 1.22, display: 'block'}}>
          {p.balaoEscuro.texto}
        </TextoRico>
      </div>
    )}

    {p.balaoSoft && (
      <div style={{position: 'absolute', left: p.balaoSoft.left, top: p.balaoSoft.top, width: p.balaoSoft.width,
        background: C.soft, borderRadius: 26, zIndex: 2, padding: '26px 30px', boxSizing: 'border-box'}}>
        <TextoRico style={{color: C.grafite, fontSize: p.balaoSoft.fontSize ?? 34, fontWeight: 400, lineHeight: 1.22, display: 'block'}}>
          {p.balaoSoft.texto}
        </TextoRico>
      </div>
    )}

    {p.badge && (
      <div style={{position: 'absolute', left: p.badge.left, top: p.badge.top, width: p.badge.size ?? '16.1%', aspectRatio: '1 / 1',
        background: C.soft, borderRadius: 18, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <span style={{color: C.grafite, fontSize: 80, fontWeight: 800, lineHeight: 1}}>{p.badge.numero}</span>
      </div>
    )}

    {p.logoRodape && (
      <div style={{position: 'absolute', bottom: '5%', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 3}}>
        <LogoDoma cor={C.grafite} tamanho={60} wordmark />
      </div>
    )}
  </AbsoluteFill>
);
