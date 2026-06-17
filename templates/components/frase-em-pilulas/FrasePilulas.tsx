import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico} from '../../../components';

/**
 * PADRÃO "FRASE EM PÍLULAS" — recriação medida de sigadoma_DWO5_TLDG1w_1.jpg.
 * Canvas 1080×1350. Render por render-still.sh (scale2+Lanczos).
 *
 * Medições (modelo):
 *  - Fundo #F4BB36 + watermark "DOMa" gigante repetida (tom-sobre-tom, ~5% mais escura).
 *  - Selo "14 anos" OFICIAL (selo-14anos-4.png) centro (50%, 18.9%), ~13% largura.
 *  - 5 pílulas largura ~50% (x25–75%), centros-y 34/43/54/64/74% (passo ~10%), altura ~7.5%.
 *    4 primeiras = contorno fino grafite (interior transparente); a 5ª = soft sólida #FADD68.
 *    Texto centralizado, palavra-chave em **bold**. Leve escada horizontal.
 *  - Logo "DOMa" grafite no rodapé (y93.3%–96%, cx 50%).
 */
const C = {
  fundo: '#F4BB36',       // medido nos 4 cantos (chapado, sem gradiente)
  watermark: '#F2B12F',   // logo de fundo: só ~5% mais escura (tom-sobre-tom)
  soft: '#FADD68',
  grafite: '#1F1F1F',
};
const F = brand.fontes.titulo;

// MEDIDO por pixel: TODAS as pílulas têm a MESMA largura (~50.6%) e mesmo left (~24.6%).
// O desalinhamento vem da INCLINAÇÃO SUTIL (dy entre ponta esq/dir), não de larguras
// diferentes. Ângulos = atan(dy/largura): controle -3°, liberdade +2°, merece -3.6°,
// gestão 0°, EMPRESA -3.4°.
type Pil = {texto: string; cy: number; ang: number; solida?: boolean; z?: number};
const LEFT = 24.6, WIDTH = 50.7;  // iguais em todas (medido)
// z (sobreposição): a 1ª fica POR CIMA da 2ª; da 2ª em diante a de baixo vai por cima
// da de cima (3>2, 4>3, 5>4). Logo a 2ª tem o MENOR z. z = [6,2,3,4,5].
const PILULAS: Pil[] = [
  {texto: 'Tenha o **controle**', cy: 32.5, ang: -5.0, z: 6},
  {texto: 'e a **liberdade** que', cy: 43.0, ang: 4.0, z: 2},
  {texto: 'você merece na', cy: 53.5, ang: -5.5, z: 3},
  {texto: 'gestão da sua', cy: 64.0, ang: 1.5, z: 4},
  {texto: '**EMPRESA.**', cy: 73.0, ang: -4.5, solida: true, z: 5},
];

// interior = COR DO FUNDO (#F4BB36), nunca transparente — tapa a watermark.
// rotação `ang` SUTIL deixa cada pílula levemente torta. Todas mesma largura/left.
// z crescente: cada inferior cruza por cima da superior (entrelaçamento).
const Pilula: React.FC<Pil> = ({texto, cy, ang, solida, z}) => (
  <div style={{
    position: 'absolute',
    left: `${LEFT}%`, width: `${WIDTH}%`,
    top: `${cy - 4.6}%`, height: '9.2%',
    transform: `rotate(${ang}deg)`,
    borderRadius: 999,
    background: solida ? C.soft : C.fundo,
    border: `2.5px solid ${C.grafite}`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: z, boxSizing: 'border-box',
  }}>
    <TextoRico style={{color: C.grafite, fontSize: 48, fontWeight: 400, lineHeight: 1}}>
      {texto}
    </TextoRico>
  </div>
);

export const FrasePilulas: React.FC = () => (
  <AbsoluteFill style={{
    backgroundColor: C.fundo, fontFamily: F, overflow: 'hidden',
    WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision',
  }}>
    {/* watermark = LOGO OFICIAL "DOMa" repetida em coluna, COM ESPAÇO entre as
        repetições (medido: faixas ~5% alt + gaps ~3-4.5%). Sangra topo/base.
        mix-blend-mode multiply + opacity baixa → escurece o fundo ~5% (#F2B12F),
        sem mudar a cor do fundo (#F4BB36). */}
    <div style={{position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden'}}>
      {/* watermark = forma OFICIAL da logo "DOMa" recortada (CSS mask) e pintada na
          COR EXATA #F2B12F (tom-sobre-tom certo). A logo PNG (alpha=forma) é a máscara;
          o <div> dá a cor. Assim: forma correta do "D"/M + cor certa (não cinza).
          MEDIDO: SÓ 4 repetições no MEIO, letra ~15% alt, sangra bordas. Topo/base LIMPOS. */}
      {[16.3, 33.9, 51.6, 69.2].map((top, i) => {
        const url = `url(${staticFile('oficial/logotipo-principal-branco.png')})`;
        return (
          <div key={i} style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            top: `${top}%`, width: '102%', aspectRatio: '1767 / 322', backgroundColor: C.watermark,
            WebkitMaskImage: url, maskImage: url,
            WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat'}} />
        );
      })}
    </div>

    {/* selo 14 anos OFICIAL — conteúdo visível alvo 13% (PNG tem ~15% de padding → width 15.3%).
        centro (50%, 18.9%). */}
    <Img src={staticFile('oficial/selo-14anos-4.png')}
      style={{position: 'absolute', left: '50%', top: '18.9%', transform: 'translate(-50%,-50%)',
        width: '15.3%', height: 'auto', zIndex: 6}} />

    {/* 5 pílulas — z definido por pílula (ver array): 1ª por cima da 2ª;
        da 2ª em diante a de baixo por cima da de cima. */}
    {PILULAS.map((p, i) => <Pilula key={i} {...p} />)}

    {/* logo rodapé "DOMa" grafite, cx 50%, y~94.5% */}
    <div style={{position: 'absolute', top: '92.5%', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 4}}>
      <LogoDoma cor={C.grafite} tamanho={62} wordmark />
    </div>
  </AbsoluteFill>
);
