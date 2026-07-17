import {AbsoluteFill, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico, SetaDoma} from '../../../components';

/**
 * PADRÃO "INIMIGO EM COMUM" (v2) — recriação medida dos modelos POST 244 / 252.
 * Layout FIXO (só o texto varia): fundo manga + watermark "DOMa" gigante (CSS mask) +
 * card BRANCO (frase com aspas, centralizada, fim em **bold**) + badge circular preto com
 * seta ↘ + card SOFT amarelo (texto secundário centralizado) + logo DOMa no rodapé.
 * Medições: card branco L9% T22.2% W81.9% H24.2%; badge Ø119 centro (283,714).
 * ⚠️ CORES MEDIDAS DOS MODELOS POST 244 + 252 (pixel exato, re-medido jun/2026):
 *   - fundo: #F4BB35 (manga padrão, mais ESCURO).
 *   - watermark: #F5C24A (mais CLARA que o fundo nesta categoria).
 *   Inimigo em Comum INVERTE o padrão "watermark mais escura": aqui a watermark é
 *   MAIS CLARA que o fundo (medido em ponto limpo nos 2 modelos oficiais — fundo
 *   #F4BB35, watermark #F5C24A). Exceção documentada a RULES §9 só para esta categoria.
 */
const C = {fundo: '#F4BB35', watermark: '#F5C24A', branco: '#FFFFFF', soft: '#F8DD6B', grafite: '#1F1F1F'};
const F = brand.fontes.titulo;
// logo VERTICAL empilhada ("DO" em cima, "Ma" embaixo, com o espaçamento oficial do arquivo)
const maskUrl = `url(${staticFile('oficial/logotipo-vertical-branco.png')})`;

export type InimigoComumProps = {principal: string; secundario: string;
  story?: boolean};  // true = layout 9:16 (blocos descem um pouco — ajuste Patrick 2026-07-16)

export const InimigoComum: React.FC<InimigoComumProps> = ({principal, secundario, story}) => (
  <AbsoluteFill style={{
    backgroundColor: C.fundo, fontFamily: F, overflow: 'hidden',
    WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision',
  }}>
    {/* watermark: logo VERTICAL empilhada — "DO" em cima e "Ma" embaixo com espaçamento oficial,
        batendo nas duas paredes (width 100%; mask sem margens internas — medido). Correção Patrick 2026-07-16 ×2. */}
    <div style={{position: 'absolute', top: '1%', left: '0%',
      width: '100%', aspectRatio: '1681 / 1328', backgroundColor: C.watermark,
      WebkitMaskImage: maskUrl, maskImage: maskUrl, WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', zIndex: 0}} />

    {/* card BRANCO — frase principal centralizada (aspas, fim em bold) */}
    <div style={{position: 'absolute', left: '11.5%', top: story ? '28%' : '23%', width: '77%', height: '22.5%',
      background: C.branco, borderRadius: 24, boxShadow: '0 8px 28px #00000022', zIndex: 2,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 56px', boxSizing: 'border-box'}}>
      {/* boldWeight 700 (não 800): negrito do fecho afinado minimamente — correção Patrick 2026-07-16 */}
      <TextoRico boldWeight={700} style={{color: C.grafite, fontSize: 64, fontWeight: 400, lineHeight: 1.22, textAlign: 'center', display: 'block'}}>
        {principal}
      </TextoRico>
    </div>

    {/* badge circular preto + seta ↘ — centro (283,714) = L26.2% T52.9%, Ø119 */}
    <div style={{position: 'absolute', left: '27.5%', top: story ? '58.5%' : '52.6%', transform: 'translate(-50%,-50%)',
      width: 119, height: 119, borderRadius: '50%', background: C.grafite, zIndex: 3,
      display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <SetaDoma />
    </div>

    {/* card SOFT — texto secundário centralizado de verdade (sem paddingLeft que empurrava texto pra direita) */}
    <div style={{position: 'absolute', left: story ? '21%' : '19%', top: story ? '59.5%' : '53.5%', width: story ? '58%' : '62%', height: story ? '17.5%' : '22%',
      background: C.soft, borderRadius: 26, zIndex: 1,  /* raio 26 medido */
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px', boxSizing: 'border-box'}}>
      {/* fontSize 48 (era 42): aumentado a pedido do Patrick 2026-07-16 */}
      <TextoRico style={{color: C.grafite, fontSize: 56, fontWeight: 400, lineHeight: 1.3, textAlign: 'center', display: 'block'}}>
        {secundario}
      </TextoRico>
    </div>

    {/* logo DOMa rodapé */}
    <div style={{position: 'absolute', top: '87%', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 3}}>
      <LogoDoma cor={C.grafite} tamanho={60} wordmark />
    </div>
  </AbsoluteFill>
);
