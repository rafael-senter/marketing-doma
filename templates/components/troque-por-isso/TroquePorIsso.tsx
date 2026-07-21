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
}> = ({titulo, foto, badge, fontSizeTitulo = 64, topTitulo = '11%'}) => (
  <AbsoluteFill style={{...base, backgroundColor: C.manga}}>
    {/* título — esq 12.8%, quebras hardcoded */}
    <div style={{position: 'absolute', left: '12.8%', top: topTitulo, width: '80%', zIndex: 2}}>
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
      position: 'absolute', left: '12.4%', top: '35.6%', width: '75.3%', height: '45.0%',
      borderRadius: '8px 45px 45px 45px', overflow: 'hidden', zIndex: 1,
      border: `2px solid ${C.branco}`, boxSizing: 'border-box',
    }}>
      <Img src={staticFile(foto)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </div>

    {/* badge grafite — canto inf-dir, TRANSBORDA a foto pela direita.
        HUG CONTENT (RULES §22.3): largura acompanha o texto. */}
    <div style={{
      position: 'absolute', right: '5.7%', top: '65.8%',
      background: C.grafite, borderRadius: 18, zIndex: 3,
      padding: '20px 24px', display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 6,
    }}>
      {badge.map((l, i) => (
        <span key={i} style={{color: C.branco, fontSize: 32, fontWeight: 400, lineHeight: 1.18}}>{l}</span>
      ))}
    </div>

    {/* logo rodapé */}
    <div style={{position: 'absolute', top: '93.6%', left: 0, right: 0,
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

/* lista com ✅ — asset EXTRAÍDO do modelo (POST 186 s7), não redesenhado.
   É o emoji ✅ do sistema: tem brilho no canto sup-esq e sombra na borda inf-dir; qualquer
   SVG feito à mão perde isso e sai chapado. MEDIDO: 59×59px, gap 16 até o texto, spacing 66.
   Ver RULES §27 (elemento de terceiro = extrair do modelo). */
const Check: React.FC<{size?: number}> = ({size = 55}) => (
  <Img src={staticFile('oficial/_troca-check.png')}
    style={{width: size, height: size, minWidth: size, display: 'block'}} />
);

export const TrocaMiolo: React.FC<{
  troque: Bloco[];
  porIsso: Bloco[];
  lista?: string[];      // itens ✅ no card de baixo
}> = ({troque, porIsso, lista}) => (
  <AbsoluteFill style={{...base, backgroundColor: C.manga}}>
    {/* card TROQUE ISSO — canto reto SUP-ESQ */}
    <CardMiolo top={113} radius="0 110px 110px 110px" blocos={troque} />
    <Tab label="TROQUE ISSO" lado="esq" top={140} />

    {/* card POR ISSO — canto reto SUP-DIR */}
    <CardMiolo top={693} radius="110px 0 110px 110px" blocos={porIsso}>
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
    <Tab label="POR ISSO" lado="dir" top={717} />
  </AbsoluteFill>
);

/* ─────────────────────────────────────────────────────────────
   SLIDE N-1 — FECHO (card único, sem tab)
   ───────────────────────────────────────────────────────────── */
export const TrocaFecho: React.FC<{
  paragrafos: string[];      // markup TextoRico; \n = quebra HARDCODED
  fontSize?: number;
}> = ({paragrafos, fontSize = 73}) => (
  <AbsoluteFill style={{...base, backgroundColor: C.manga}}>
    <div style={{
      position: 'absolute', left: 112, top: 158, width: 856, height: 1035,
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
/* Ícones do CTA — assets EXTRAÍDOS do modelo (POST 186 s9), não redesenhados.
   As formas não são as óbvias: o do meio NÃO é um triângulo simples (tem o lado esquerdo
   dobrado, é um cursor/enviar) e o balão tem o rabinho no canto inf-DIREITO — desenhar "de
   cabeça" errou os dois. Tamanhos = os medidos no modelo. Ver RULES §27. */
const ICONES_CTA: {src: string; w: number; h: number}[] = [
  {src: 'oficial/_troca-icone-salvar.png', w: 68, h: 86},        // bookmark (salvar)
  {src: 'oficial/_troca-icone-compartilhar.png', w: 103, h: 86}, // cursor/enviar (compartilhar)
  {src: 'oficial/_troca-icone-comentar.png', w: 84, h: 84},      // balão, rabinho à DIREITA
];

export const TrocaCta: React.FC<{blocos: string[]}> = ({blocos}) => (
  <AbsoluteFill style={{...base, backgroundColor: C.manga}}>
    {/* watermark DOMa gigante (logo VERTICAL empilhada), tom-sobre-tom MAIS ESCURO */}
    <div style={{
      position: 'absolute', top: '20%', left: '-13.5%', width: '127%', aspectRatio: '1681 / 1328',
      backgroundColor: C.wm,
      WebkitMaskImage: maskVertical, maskImage: maskVertical,
      WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
      zIndex: 0, pointerEvents: 'none',
    }} />

    <div style={{
      position: 'absolute', left: '15.1%', top: '22%', width: '78%', zIndex: 2,
      display: 'flex', flexDirection: 'column', gap: 90,
    }}>
      {blocos.map((b, i) => (
        <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: 32}}>
          <div style={{width: 102, minWidth: 102, display: 'flex', justifyContent: 'center', paddingTop: 6}}>
            <Img src={staticFile(ICONES_CTA[i % 3].src)}
              style={{width: ICONES_CTA[i % 3].w, height: ICONES_CTA[i % 3].h, display: 'block'}} />
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
