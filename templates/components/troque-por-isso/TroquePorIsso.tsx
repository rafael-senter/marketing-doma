import {AbsoluteFill, Img, staticFile} from 'remotion';
import {brand} from '../../../theme';
import {LogoDoma, TextoRico} from '../../../components';

/**
 * CATEGORIA "TROQUE ISSO / POR ISSO" (carrossel) — modelo POST 186.
 * Ficha: knowledge-base/padroes/troque-por-isso.md (medições pixel a pixel dos slides 1,2,7,8,9).
 *
 * Assinatura visual: card com UM canto reto (raio 110 nos outros 3), do lado da tab.
 * Todo card tem borda branca 2px acompanhando os mesmos raios.
 * Grafite desta categoria é #212121 (MEDIDO), não #1F1F1F.
 */
const C = {
  manga: '#F4BB35',
  soft: '#F8DD6B',
  grafite: '#212121',
  branco: '#FFFFFF',
  wm: '#F3B530',
  check: '#7CB342',
};
const F = brand.fontes.titulo;
const maskVertical = `url(${staticFile('oficial/logotipo-vertical-branco.png')})`;

const base = {
  fontFamily: F,
  overflow: 'hidden' as const,
  WebkitFontSmoothing: 'antialiased' as const,
  MozOsxFontSmoothing: 'grayscale' as const,
  textRendering: 'geometricPrecision' as const,
};

/* ─────────────────────────────────────────────────────────────
   SLIDE 1 — CAPA
   título (esq) + foto do segmento + badge grafite + logo rodapé
   ───────────────────────────────────────────────────────────── */
export const TrocaCapa: React.FC<{
  titulo: string;        // markup TextoRico, \n = quebra HARDCODED
  foto: string;          // path em public/ (ex: 'oficial/_ferragens-loja-base.png')
  badge: string[];       // linhas do badge (2)
  fontSizeTitulo?: number;
  topTitulo?: string;
  story?: boolean;       // 1080×1920 — conteúdo desce p/ a zona segura do Instagram
}> = ({titulo, foto, badge, fontSizeTitulo = 64, topTitulo, story}) => (
  <AbsoluteFill style={{...base, backgroundColor: C.manga}}>
    {/* título — esq 12.8%, quebras hardcoded */}
    <div style={{position: 'absolute', left: '12.8%', top: topTitulo ?? (story ? '19%' : '11%'),
      width: '80%', zIndex: 2}}>
      <TextoRico
        boldWeight={500}
        style={{
          color: C.grafite, fontSize: fontSizeTitulo, fontWeight: 400,
          lineHeight: 1.05, display: 'block',
        }}>
        {titulo}
      </TextoRico>
    </div>

    {/* foto — canto sup-esq RETO (assinatura da categoria) + bordinha branca 2px
        (MEDIDA no modelo: contorno branco no perímetro exato da foto, igual aos cards) */}
    <div style={{
      position: 'absolute', left: '12.4%', top: story ? '36%' : '35.6%',
      width: '75.3%', height: story ? '31.7%' : '45.0%',   // MESMA altura em px nos 2 formatos
      borderRadius: '8px 45px 45px 45px', overflow: 'hidden', zIndex: 1,
      border: `2px solid ${C.branco}`, boxSizing: 'border-box',
    }}>
      <Img src={staticFile(foto)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </div>

    {/* badge grafite — canto inf-dir, TRANSBORDA a foto pela direita.
        HUG CONTENT (RULES §22.3): largura acompanha o texto. */}
    <div style={{
      position: 'absolute', right: '5.7%', top: story ? '61.2%' : '65.8%',
      background: C.grafite, borderRadius: 18, zIndex: 3,
      padding: '20px 24px', display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 6,
    }}>
      {badge.map((l, i) => (
        <span key={i} style={{color: C.branco, fontSize: 32, fontWeight: 400, lineHeight: 1.18}}>{l}</span>
      ))}
    </div>

    {/* logo rodapé */}
    <div style={{position: 'absolute', top: story ? '80%' : '93.6%', left: 0, right: 0,
      display: 'flex', justifyContent: 'center', zIndex: 3}}>
      <LogoDoma cor={C.grafite} tamanho={66} wordmark />
    </div>
  </AbsoluteFill>
);

/* ─────────────────────────────────────────────────────────────
   SLIDE 2..N-2 — MIOLO (2 cards + tabs)
   ───────────────────────────────────────────────────────────── */
/**
 * Bloco de texto do card. MEDIDO no POST 186:
 * - `lineHeight` é FIXO em px (~66), INDEPENDENTE do fontSize — é assim no modelo
 *   (spacing 66/65/67 com fs 58, 55 e 54). Usar lineHeight relativo desalinha tudo.
 * - Hierarquia de papel: principal fs 54 (regular) ou 50 (bold itálico) · nota/reforço fs 37.
 *   O reforço é NOTÍCIA MENOR — nunca do mesmo tamanho do principal.
 * - Gap entre blocos = 70px (dá ~135px entre os tops das linhas, como no modelo).
 * - ITÁLICO: `skewX(-8.5deg)`, NÃO o `italic` do navegador. TT Lakes não tem arquivo itálico;
 *   o oblique sintético do Chromium deita 12.5° (MEDIDO) e o modelo usa 8-9°. `font-style:
 *   oblique <angle>` é IGNORADO em fonte sem eixo de inclinação — só o skew controla o ângulo.
 *   Ver RULES §25.
 */
const SKEW_ITALICO = 'skewX(-8.5deg)';
type Bloco = {texto: string; fontSize?: number; lhPx?: number; italico?: boolean; bold?: boolean};

const Tab: React.FC<{label: string; lado: 'esq' | 'dir'; top: number}> = ({label, lado, top}) => (
  <div style={{
    position: 'absolute', top,
    ...(lado === 'esq' ? {left: 38} : {right: 37}),
    background: C.branco, borderRadius: 12, height: 76,
    display: 'flex', alignItems: 'center', padding: '0 44px', zIndex: 3,
  }}>
    <span style={{color: C.grafite, fontSize: 38, fontWeight: 500, letterSpacing: 0.5, lineHeight: 1}}>
      {label}
    </span>
  </div>
);

const CardMiolo: React.FC<{
  top: number; radius: string; blocos: Bloco[]; children?: React.ReactNode;
}> = ({top, radius, blocos, children}) => (
  <div style={{
    position: 'absolute', left: 73, top, width: 934, height: 561,
    background: C.soft, border: `2px solid ${C.branco}`, borderRadius: radius,
    boxSizing: 'border-box', zIndex: 1,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    paddingTop: 102, paddingLeft: 97, paddingRight: 97, paddingBottom: 30, gap: 70,
  }}>
    {blocos.map((b, i) => (
      <TextoRico
        key={i}
        boldWeight={500}
        style={{
          color: C.grafite, fontSize: b.fontSize ?? 54,
          fontWeight: b.bold ? 500 : 400,
          lineHeight: `${b.lhPx ?? 62}px`, textAlign: 'center', display: 'block',
          transform: b.italico ? SKEW_ITALICO : undefined,
        }}>
        {b.texto}
      </TextoRico>
    ))}
    {children}
  </div>
);

/* ✅ da lista — SVG VETORIAL medido pixel a pixel no POST 186 s7 (não é PNG: escala sem pixelar).
   Quadrado 59×59, raio 8. DUAS cores de verde + brilho + check branco:
     face `#7CB342` · borda/sombra `#689F38` (2px no perímetro) · brilho `#FFF` 22% no canto
     sup-esq (arco) · check `#FBF9F9` traço 9 com pontas arredondadas.
   Check medido: ponta esq (11.5, 23) · vértice (18.5, 47.5) · ponta dir (46.5, 9). */
const Check: React.FC<{size?: number}> = ({size = 55}) => (
  <svg width={size} height={size} viewBox="0 0 59 59" style={{minWidth: size, display: 'block'}}>
    {/* sombra: quadrado escuro atrás, face deslocada -1/-3 => borda só à direita e embaixo,
        como no emoji original (o topo/esquerda não têm borda) */}
    <rect x="0" y="0" width="59" height="59" rx="9" fill="#689F38" />
    <rect x="0" y="0" width="57" height="56" rx="9" fill={C.check} />
    {/* brilho do canto sup-esq */}
    <path d="M5 22 A 17 17 0 0 1 22 5 L 22 10 A 12 12 0 0 0 10 22 Z" fill="#FFF" opacity="0.18" />
    {/* check: centros das extremidades MEDIDOS (cap round soma ~sw/2 em cada ponta) */}
    <path d="M11.5 25 L18.5 44 L46 12.5" fill="none" stroke="#FBF9F9" strokeWidth="8"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TrocaMiolo: React.FC<{
  troque: Bloco[];
  porIsso: Bloco[];
  lista?: string[];      // itens ✅ no card de baixo
  story?: boolean;       // 1080×1920 — cards centrados, MESMO tamanho em px do feed
}> = ({troque, porIsso, lista, story}) => {
  // os 2 cards (561 cada) + gap 20 = 1142px; centrados no canvas do story
  const topA = story ? 389 : 113;
  const topB = topA + 580;
  return (
  <AbsoluteFill style={{...base, backgroundColor: C.manga}}>
    {/* card TROQUE ISSO — canto reto SUP-ESQ */}
    <CardMiolo top={topA} radius="0 110px 110px 110px" blocos={troque} />
    <Tab label="TROQUE ISSO" lado="esq" top={topA + 27} />

    {/* card POR ISSO — canto reto SUP-DIR */}
    <CardMiolo top={topB} radius="110px 0 110px 110px" blocos={porIsso}>
      {lista && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          {lista.map((t, i) => (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 16}}>
              <Check />
              <span style={{color: C.grafite, fontSize: 50, fontWeight: 400, lineHeight: '50px'}}>{t}</span>
            </div>
          ))}
        </div>
      )}
    </CardMiolo>
    <Tab label="POR ISSO" lado="dir" top={topB + 24} />
  </AbsoluteFill>
  );
};

/* ─────────────────────────────────────────────────────────────
   SLIDE N-1 — FECHO (card único, sem tab)
   ───────────────────────────────────────────────────────────── */
export const TrocaFecho: React.FC<{
  paragrafos: string[];      // markup TextoRico; \n = quebra HARDCODED
  fontSize?: number;
  story?: boolean;           // 1080×1920 — card centrado, MESMO tamanho em px do feed
}> = ({paragrafos, fontSize = 73, story}) => (
  <AbsoluteFill style={{...base, backgroundColor: C.manga}}>
    <div style={{
      position: 'absolute', left: 112, top: story ? 443 : 158, width: 856, height: 1035,
      background: C.soft, border: `2px solid ${C.branco}`,
      borderRadius: '110px 0 110px 110px', boxSizing: 'border-box', zIndex: 1,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '0 107px 0 189px', gap: 70,
    }}>
      {paragrafos.map((p, i) => (
        <TextoRico key={i} boldWeight={500}
          style={{color: C.grafite, fontSize, fontWeight: 400, lineHeight: 1.40, display: 'block'}}>
          {p}
        </TextoRico>
      ))}
    </div>
  </AbsoluteFill>
);

/* ─────────────────────────────────────────────────────────────
   SLIDE N — CTA (3 blocos ícone soft + texto, sobre watermark gigante)
   ───────────────────────────────────────────────────────────── */
/* Ícones do CTA — SVG VETORIAL, vértices medidos pixel a pixel no POST 186 s9.
   Cor única `#F8DD6B` (medido: os 3 são chapados, sem borda — só o ✅ tem 2 cores).
   As formas NÃO são as óbvias — desenhar "de cabeça" errou duas:
     · salvar: retângulo 68×86 com entalhe em V; o vértice do V é alto, em (34, 49).
     · compartilhar: NÃO é triângulo — o lado esquerdo DOBRA em (38, 38) e segue quase reto
       até a ponta (49, 88); é um cursor/enviar.
     · comentar: círculo r42 + rabinho no canto inf-DIREITO (eu tinha posto à esquerda). */
const IconeSalvar: React.FC<{h: number}> = ({h}) => (
  <svg height={h} viewBox="0 0 68 86" style={{display: 'block'}}>
    <path d="M0 0 H68 V86 L34 49 L0 86 Z" fill={C.soft} />
  </svg>
);
const IconeCompartilhar: React.FC<{h: number}> = ({h}) => (
  <svg height={h} viewBox="0 0 103 88" style={{display: 'block'}}>
    <path d="M0 0 L103 0 L49 88 L38 38 Z" fill={C.soft} />
  </svg>
);
const IconeComentar: React.FC<{h: number}> = ({h}) => (
  <svg height={h} viewBox="0 0 84 85" style={{display: 'block'}}>
    <circle cx="42" cy="42" r="42" fill={C.soft} />
    <path d="M72 60 L84 85 L48 79 Z" fill={C.soft} />
  </svg>
);
/* altura medida de cada ícone no modelo */
const ICONES_CTA = [
  {C: IconeSalvar, h: 86},
  {C: IconeCompartilhar, h: 88},
  {C: IconeComentar, h: 85},
];

export const TrocaCta: React.FC<{blocos: string[]; story?: boolean}> = ({blocos, story}) => (
  <AbsoluteFill style={{...base, backgroundColor: C.manga}}>
    {/* watermark DOMa gigante (logo VERTICAL empilhada), tom-sobre-tom MAIS ESCURO */}
    <div style={{
      position: 'absolute', top: story ? '30%' : '20%', left: '-13.5%', width: '127%',
      aspectRatio: '1681 / 1328', backgroundColor: C.wm,
      WebkitMaskImage: maskVertical, maskImage: maskVertical,
      WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
      zIndex: 0, pointerEvents: 'none',
    }} />

    <div style={{
      position: 'absolute', left: '15.1%', top: story ? '33%' : '23.6%', width: '78%', zIndex: 2,
      display: 'flex', flexDirection: 'column', gap: 90,
    }}>
      {blocos.map((b, i) => (
        <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: 32}}>
          {/* ícone CENTRADO na 1ª linha do texto (medido no modelo: centro do ícone = centro
              da 1ª linha, ±2px). A altura da linha é 67×1.38 ≈ 92, ~= a altura do ícone. */}
          <div style={{width: 102, minWidth: 102, height: 92, display: 'flex',
            justifyContent: 'center', alignItems: 'center'}}>
            {(() => {const Ic = ICONES_CTA[i % 3]; return <Ic.C h={Ic.h} />;})()}
          </div>
          <TextoRico boldWeight={500}
            style={{color: C.grafite, fontSize: 67, fontWeight: 400, lineHeight: 1.38, display: 'block'}}>
            {b}
          </TextoRico>
        </div>
      ))}
    </div>
  </AbsoluteFill>
);
