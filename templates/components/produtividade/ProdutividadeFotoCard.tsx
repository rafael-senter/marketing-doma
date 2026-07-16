import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico} from '../../../components';

/**
 * PADRÃO "PRODUTIVIDADE" — modo FOTO-CARD PARAMÉTRICO (base POST 270, re-medido 2026-07-16).
 * Diferente do Produtividade270 (hardcoded, fecho baked na foto): aqui título, foto, fecho e selo
 * são props — para PEÇAS NOVAS da categoria.
 *
 * MEDIDAS REAIS (numpy no POST 270, 1080×1350):
 *   título topo: fs≈78 lh1.13 (cap ~59, passo 86), x = 12.5% (alinha com a foto) — o 270 antigo
 *     usava fs 58 (mesma patologia de fonte menor do SPIN).
 *   foto card: L12.4% T27.5% W78.2% H51.7%, raio 28.
 *   sub-card grafite: canto INFERIOR-DIREITO da foto, W 54.4%/78.2%≈69.5% da foto,
 *     H 13.5%/51.7%≈26.1% da foto; texto branco fs≈60 lh1.12, bold no trecho-chave.
 *   selo 14 anos (pedido Patrick): selo-14anos-4.png sup-dir (como no POST 277).
 *
 * STORY (9:16): título T8%, selo T5%, foto T22%→76% (54%), logo 93% — densidade preservada.
 *
 * Limites (§19): título fs78 → máx ~15 chars/linha, 3 linhas; fecho fs60 → máx ~16 chars/linha, 2 linhas.
 */
const C = {fundo: '#F4BB35', watermark: '#F2B32E', grafite: '#1F1F1F', branco: '#FFFFFF'};  // wm medida no POST 270
const F = brand.fontes.titulo;
const maskVertUrl = `url(${staticFile('oficial/logotipo-vertical-branco.png')})`;

export type ProdutividadeFotoCardProps = {
  titulo: string;          // topo, até a reticência — ex.: 'O que você **não**\n**acompanha** na\nsua indústria…'
  fecho: string;           // sub-card grafite — ex.: 'está virando\n**prejuízo.**'
  foto: string;            // staticFile path
  selo14?: boolean;        // selo oficial 14 anos no sup-dir
  story?: boolean;         // 1080×1920
};
export const ProdutividadeFotoCard: React.FC<ProdutividadeFotoCardProps> = ({
  titulo, fecho, foto, selo14 = true, story = false,
}) => {
  // feed: título 3 linhas fs78 ocupa ~19.6% → T8.5% termina 28.1%; foto começa 30% (sem colisão)
  // e mantém o bottom original 79.2% (H 49.2%). Com título de 2 linhas sobra respiro extra — ok.
  // MEDIDO POST 270: foto T27.5→bottom 72.5 (H45). Bloco preto FLUTUANTE: sobrepõe a foto
  // (~metade dentro, ~metade fora), alinhado à direita da foto, 4 cantos raio 28.
  // story: conteúdo MAIS PRA BAIXO (regra Patrick 2026-07-16 — estava tudo no topo)
  const g = story
    ? {tituloTop: '14%', fotoTop: '30%', fotoH: '50%', blocoTop: '75.3%', blocoH: '9.5%', logoTop: '93%', seloTop: '11%'}
    : {tituloTop: '8.5%', fotoTop: '30%', fotoH: '45%', blocoTop: '68.2%', blocoH: '13.5%', logoTop: '90%', seloTop: '6.5%'};
  return (
    <AbsoluteFill style={{
      backgroundColor: C.fundo, fontFamily: F, overflow: 'hidden',
      WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision',
    }}>
      {/* watermark "DOMa" VERTICAL GIGANTE de fundo (medido no POST 270: #F2B32E, logo estourando
          o canvas — "O" no topo-dir, "M" na esq-baixo). Asset vertical 1681×1328. */}
      <div style={{position: 'absolute', top: '9%', left: '-17.5%',
        width: '135%', aspectRatio: '1681 / 1328', backgroundColor: C.watermark,
        WebkitMaskImage: maskVertUrl, maskImage: maskVertUrl, WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', zIndex: 0}} />

      {/* título topo — fs 78 medido */}
      <div style={{position: 'absolute', left: '12.5%', top: g.tituloTop, width: '62%', zIndex: 2, color: C.grafite}}>
        <TextoRico style={{fontSize: 78, fontWeight: 400, lineHeight: 1.13, display: 'block'}}>
          {titulo}
        </TextoRico>
      </div>

      {/* selo 14 anos oficial (sup-dir, como POST 277) */}
      {selo14 && (
        <Img src={staticFile('oficial/selo-14anos-4.png')} alt="14 anos"
          style={{position: 'absolute', left: '78.5%', top: g.seloTop, width: '15.3%', zIndex: 3}} />
      )}

      {/* foto card — canto SUP-ESQ reto (regra Patrick), H 45% medida */}
      <div style={{position: 'absolute', left: '12.4%', top: g.fotoTop, width: '78.2%', height: g.fotoH,
        borderRadius: '0 48px 48px 48px', overflow: 'hidden', zIndex: 1, boxShadow: '0 10px 30px #00000026',
        border: '3px solid #FFFFFF', boxSizing: 'border-box'  /* raio 48 + bordinha branca fina medidos (regra Patrick) */}}>
        <Img src={staticFile(foto)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>

      {/* bloco preto FLUTUANTE (medido: x 36.2→90.6% = alinhado à direita da foto; y 65.7→79.2% =
          ~metade sobre a foto, ~metade fora; 4 cantos raio 28) */}
      <div style={{position: 'absolute', left: '40%', top: g.blocoTop, width: '54.4%', height: g.blocoH,
        background: C.grafite, borderRadius: 28, zIndex: 2,  /* right 94.4% → sai da foto tb no lado (regra Patrick) */
        display: 'flex', alignItems: 'center', paddingLeft: 44, boxSizing: 'border-box'}}>
        <TextoRico style={{color: C.branco, fontSize: 60, fontWeight: 400, lineHeight: 1.12, display: 'block'}}>
          {fecho}
        </TextoRico>
      </div>

      {/* logo rodapé */}
      <div style={{position: 'absolute', top: g.logoTop, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 3}}>
        <LogoDoma cor={C.grafite} tamanho={56} wordmark />
      </div>
    </AbsoluteFill>
  );
};
