import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {TextoRico} from '../../../components';

/**
 * PADRÃO "PRODUTIVIDADE" — variante POST 277 (pergunta + LEIA A LEGENDA).
 * Foto full-bleed + logo DOMa branco (sup-esq) + selo "14 anos" (sup-dir) +
 * card SOFT amarelo (pergunta, trecho central em **bold**) + faixa preta "LEIA A LEGENDA ↓".
 * Medido: card L32% T24.5% W61% H39%. Foto de teste = modelo (em produção, foto real).
 */
const C = {soft: '#F8DD6B', grafite: '#1F1F1F', branco: '#FFFFFF'};
const F = brand.fontes.titulo;

export const Produtividade277: React.FC = () => (
  <AbsoluteFill style={{
    fontFamily: F, overflow: 'hidden',
    WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision',
  }}>
    <Img src={staticFile('oficial/_teste-prod-277.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />

    {/* logo DOMa branco (sup-esq) */}
    <Img src={staticFile('oficial/logotipo-principal-branco.png')} alt="DOMa"
      style={{position: 'absolute', top: '5.2%', left: '6%', width: 168, height: 'auto', zIndex: 3}} />
    {/* selo 14 anos (sup-dir) */}
    <Img src={staticFile('oficial/selo-14anos-4.png')} alt="14 anos"
      style={{position: 'absolute', top: '4%', right: '7%', width: 92, height: 92, zIndex: 3}} />

    {/* card SOFT amarelo (pergunta) */}
    <div style={{position: 'absolute', left: '32%', top: '24.5%', width: '61%', height: '39%',
      background: C.soft, borderRadius: 30, zIndex: 2,
      display: 'flex', alignItems: 'center', padding: '0 48px', boxSizing: 'border-box'}}>
      <TextoRico style={{color: C.grafite, fontSize: 50, fontWeight: 400, lineHeight: 1.22, display: 'block'}}>
        {'Quais são\nos **principais**\n**motivos da**\n**improdutividade**\nna sua fábrica?'}
      </TextoRico>
    </div>

    {/* faixa preta CTA "LEIA A LEGENDA ↓" — sob o card, alinhada à esquerda do card */}
    <div style={{position: 'absolute', left: '40%', top: '64.5%', zIndex: 3,
      background: C.grafite, borderRadius: 999, padding: '12px 28px',
      display: 'flex', alignItems: 'center', gap: 10}}>
      <span style={{color: C.branco, fontSize: 22, fontWeight: 500, letterSpacing: 1.5}}>LEIA A LEGENDA</span>
      <span style={{color: C.branco, fontSize: 22, fontWeight: 500}}>↓</span>
    </div>
  </AbsoluteFill>
);
