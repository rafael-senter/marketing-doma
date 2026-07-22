import {AbsoluteFill} from 'remotion';
import {brand} from '../../../theme';
import {BR_VIEWBOX, BR_ESTADOS} from './mapaBrasil';

/**
 * PADRÃO "MAPA DE CLIENTES" — recriação medida do MODELO em
 * "doma-brand/tipos-de-posts/tipos de posts/Mapa de Clientes/MODELO - mapa de clientes.jpg"
 * (cópia de sigadoma_DSdIG_FkuI4_2.jpg).
 * Medições em doma-brand/PADROES/mapa-clientes.md. Renderizar com render-still.sh.
 *
 * Camadas: fundo amarelo chapado → card branco (cantos retos) → mapa choropleth
 * (estados presentes amarelo / ausentes cinza, bordas brancas, rótulos pretos) →
 * selo pill "+93% DE CLIENTES" → legenda preta centralizada abaixo do card.
 *
 * Mapa = SVG vetorial real (@svg-maps/brazil), pintado em 2 cores. NÃO é imagem
 * aproximada — são os contornos reais dos 27 estados.
 */
const C = {
  fundo: '#F3BA35',
  presente: '#F4BC34',   // estado "presente"
  ausente: '#D3D3D3',    // estado sem presença (cinza medido no modelo)
  bordaEstado: '#FFFFFF',
  card: '#FFFFFF',
  bordaSelo: '#F0B830',
  texto: '#131313',       // letras quase pretas (medido ~#0A0A0A no modelo)
  subtitulo: '#8A8A8A',
};
const F = brand.fontes.titulo;

// 16 estados "presentes" (amarelos), medidos por cor no modelo. DF é CINZA (quadradinho
// em Goiás — confirmado #C8D5CB). TO e MA também cinza. A legenda diz "17 estados" (texto
// fixo do post original; reproduzido fielmente mesmo com 16 pintados).
const PRESENTES = new Set(['pa', 'mt', 'ms', 'go', 'ba', 'pi', 'ce', 'pe', 'al', 'mg', 'es', 'sp', 'rj', 'pr', 'sc', 'rs']);

// rótulos só nos estados presentes (posições aprox. no viewBox 613×639, ajustadas ao centroide visível)
// usamos <text> sobre o próprio SVG, alinhado ao centro de cada estado.
// Para fidelidade, deixamos o SVG calcular: rótulo = nome curto no centro do path.
const NOMES: Record<string, string> = {
  pa: 'Pará', mt: 'Mato Grosso', ms: 'Mato Grosso\ndo Sul', go: 'Goiás', ba: 'Bahia',
  pi: 'Piauí', ce: 'Ceará', pe: 'Pernambuco', al: 'Alagoas', mg: 'Minas Gerais',
  es: 'Espírito\nSanto', sp: 'São Paulo', rj: 'Rio de\nJaneiro', pr: 'Paraná',
  sc: 'Santa\nCatarina', rs: 'Rio Grande\ndo Sul',
};

// POSIÇÃO MEDIDA de cada rótulo no modelo (centro do texto, px canvas → viewBox via
// vx=(px-77)/1.4552, vy=(py-109)/1.4552, a transformação exata do SVG abaixo).
// IMPORTANTE: PE/AL/ES/RJ ficam À DIREITA, FORA do estado (litoral estreito) — exatamente
// como no modelo. Os demais ficam sobre o estado. Tamanho uniforme (cap ~10px no modelo).
// MEDIDO via skill layout-mapper + refinado com centróide PIXEL-A-PIXEL (numpy)
// dos pixels escuros do texto no MODELO. translate(5 6) aplicado no render.
const CENTROIDE: Record<string, [number, number]> = {
  pa: [313, 149], ce: [516, 150], pi: [463, 200], pe: [567, 206], al: [581, 227],
  ba: [479, 265], mt: [269, 282], go: [358, 335], mg: [445, 362], es: [514, 387],
  ms: [286, 395], sp: [367, 416], rj: [487, 431], pr: [333, 462],
  sc: [373, 504], rs: [308, 542],
};

export const MapaClientes: React.FC<{story?: boolean}> = ({story}) => (
  <AbsoluteFill style={{
    backgroundColor: C.fundo, fontFamily: F, overflow: 'hidden',
    WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision',
  }}>
    {/* CARD BRANCO — x65→1014, y65→1079, cantos retos */}
    <div style={{position: 'absolute', left: 65, top: story ? 378 : 65, width: 949, height: 1014, background: C.card}}>
      {/* MAPA choropleth — medido no modelo: bbox canvas x[77,969] y[108,1040] = 892×932px.
          Dentro do card (origem 65,65): left 12, top 43, width 892, height 932.
          (antes estava 893×851 e o meet encolhia p/ 816×851 → mapa pequeno demais). */}
      {/* MEDIDO v3 (2026-07-22): mapa amarelo 587×816 no modelo. ⚠️ medir com filtro de ruído
          (col/linha com >8px), senão o antialias do card infla a bbox e a conta sai errada. */}
      <svg viewBox={BR_VIEWBOX} width={867} height={906}
        style={{position: 'absolute', left: 8, top: 43, overflow: 'visible'}}   /* PE/AL ficam FORA do estado, além do viewBox — sem isto o SVG corta o texto */
        preserveAspectRatio="xMidYMid meet">
        {BR_ESTADOS.map((uf) => (
          <path key={uf.id} d={uf.path}
            fill={PRESENTES.has(uf.id) ? C.presente : C.ausente}
            stroke={C.bordaEstado} strokeWidth={1.2} strokeLinejoin="round" />
        ))}
        {/* rótulos — tamanho UNIFORME (medido cap ~10px), peso MEDIUM (500 — medido por
            densidade de traço: modelo 15.8%, 600 dava 24% bold demais), cor quase preta.
            OFFSET GLOBAL (Patrick): todos um pouco à direita e abaixo (translate em viewBox;
            ×1.455 → ~+7px direita / +9px baixo no canvas) p/ assentar no lugar certo. */}
        {/* MEDIDO v3 (2026-07-22): os 17 rótulos estavam dx −22px e com escala vertical 2,8% menor
            que o modelo (dy de −6 no topo a −22 embaixo). viewBox 613×639 em 867px → 1u = 1.414px.
            translate corrige o dx; o scale(1,1.029) ancorado em y=130u corrige o dy progressivo. */}
        <g transform="translate(22.2 10.2) translate(0 130) scale(1 1.029) translate(0 -130)">
        {Object.entries(CENTROIDE).map(([id, [x, y]]) => {
          const fs = 10.9;   // MEDIDO v3: tinta dos rótulos = a do modelo (11 dava 1.26×, 9.5 dava 0.81×)
          const lh = fs * 1.18;
          const linhas = NOMES[id]?.split('\n') ?? [];
          return (
            <text key={id} x={x} y={y} fill={C.texto} fontFamily={F}
              fontSize={fs} fontWeight={400} textAnchor="middle" dominantBaseline="middle">
              {linhas.map((linha, i) => (
                <tspan key={i} x={x} dy={i === 0 ? -(linhas.length - 1) * lh / 2 : lh}>{linha}</tspan>
              ))}
            </text>
          );
        })}
        </g>
      </svg>

      {/* SELO pill — MEDIDO: esq x66 → dir x508 (larg 442), base y1058, raio ~13, borda 2px.
          Textos: '+' cap13 (fs24, regular) · '93%' e 'DE CLIENTES' MESMA altura cap24 (fs32, 800) ·
          subtítulo cap15 (fs16). Gaps: '+'→'93%'≈22, '93%'→'DE'≈12. paddingLeft 28 (texto em x96). */}
      <div style={{position: 'absolute', left: 1, top: 895, width: 442, height: 98,
        background: C.card, border: `2px solid ${C.bordaSelo}`, borderRadius: 13,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 28, boxSizing: 'border-box'}}>
        <div style={{display: 'flex', alignItems: 'baseline', color: C.texto}}>
          <span style={{fontSize: 24, fontWeight: 400}}>+</span>
          <span style={{fontSize: 32, fontWeight: 600, marginLeft: 22, letterSpacing: 1}}>93%</span>
          <span style={{fontSize: 32, fontWeight: 600, marginLeft: 12, letterSpacing: 1.5}}>DE CLIENTES</span>
        </div>
        <div style={{fontSize: 16, fontWeight: 400, color: C.subtitulo, marginTop: 2}}>
          Satisfeitos com o suporte e produto
        </div>
      </div>
    </div>

    {/* LEGENDA — 2 linhas centralizadas na zona amarela abaixo do card.
        medido no modelo: cap-height ~27px (→ fontSize ~42), topos linha1 y1127 / linha2 y1201
        (distância 74px → lineHeight ~1.45). centro x≈540. */}
    <div style={{position: 'absolute', top: story ? 1419 : 1106, left: 0, right: 0, textAlign: 'center', color: C.texto}}>
      <div style={{fontSize: 52, fontWeight: 500, lineHeight: 1.30, letterSpacing: 0.8}}>Estamos presentes em 17 estados…</div>
      <div style={{fontSize: 52, fontWeight: 500, lineHeight: 1.30, letterSpacing: 0.8}}>e crescendo cada vez mais!</div>
    </div>
  </AbsoluteFill>
);
