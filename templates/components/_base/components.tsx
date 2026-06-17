import {Img, staticFile} from 'remotion';
import {brand} from './theme';

/**
 * COMPONENTES-BASE DOMA
 * -------------------------------------------------------------
 * Building blocks reutilizáveis. Logo e selo usam os arquivos OFICIAIS
 * extraídos do manual (public/logos/), não mais aproximação tipográfica.
 */

// ── Logo DOMa (oficial, do manual) ─────────────────────────────────────────
// Usa o PNG oficial. `cor` decide a versão: tons escuros → grafite, claros → branco.
// proporção do logo principal ≈ 3.7:1 (largura:altura).
// Usa os LOGOS OFICIAIS (doma-brand/logos-oficiais → public/oficial/).
// wordmark=true → "DOMa" puro (logotipo); false → "DOMa + software para gestão" (complemento).
// cor: branco→NEG, grafite→POS, amarelo/cor→COR.
export const LogoDoma: React.FC<{cor?: string; tamanho?: number; wordmark?: boolean}> = ({
  cor = brand.cores.grafite,
  tamanho = 56,
  wordmark = false,
}) => {
  const claro = cor === brand.cores.branco || cor === '#FFFFFF' || cor === '#fff';
  const colorida = cor === brand.cores.amarelo || cor === '#F4BB35' || cor === 'cor';
  const variante = claro ? 'branco' : colorida ? 'cor' : 'grafite';
  const base = wordmark ? 'logotipo-principal' : 'complemento-principal';
  // logotipo (só DOMa) é mais quadrado; complemento tem a tagline embaixo
  const altura = wordmark ? tamanho * 0.62 : tamanho * 0.9;
  return (
    <Img
      src={staticFile(`oficial/${base}-${variante}.png`)}
      style={{height: altura, width: 'auto', display: 'block'}} />
  );
};

// ── Selo circular DOMa (oficial, do manual) ────────────────────────────────
// PNG oficial: círculo grafite + DOMa central + texto curvo. `claro` usa a
// versão branca (pra fundo escuro).
// Selo circular OFICIAL. variante: 'cor' (amarelo+grafite), 'grafite' (POS), 'branco' (NEG).
export const SeloDoma: React.FC<{tamanho?: number; variante?: 'cor' | 'grafite' | 'branco'}> = ({
  tamanho = 180,
  variante = 'cor',
}) => (
  <Img
    src={staticFile(`oficial/selo-${variante}.png`)}
    style={{width: tamanho, height: tamanho, objectFit: 'contain', display: 'block'}}
  />
);

// ── Ícone oficial (biblioteca de 50, do manual) ─────────────────────────────
// `nome` = arquivo sem extensão (ex: "icone-16-documento-cifrao") ou só o tema
// (ex: "documento-cifrao" / "grafico-linha-subindo"). Resolve pelo INDICE.
// Mapa tema → arquivo (os mais usados em conteúdo B2B). Lista completa em
// doma-brand/icones/INDICE.md.
export const ICONES: Record<string, string> = {
  relogio: 'icone-01-relogio',
  calculadora: 'icone-07-calculadora',
  megafone: 'icone-09-megafone',
  trofeu: 'icone-10-podio-trofeu',
  grafico: 'icone-11-grafico-linha',
  crescimento: 'icone-12-grafico-linha-subindo',
  queda: 'icone-13-grafico-linha-caindo',
  barras: 'icone-14-barras-seta-cima',
  lucro: 'icone-16-documento-cifrao',
  financeiro: 'icone-17-prancheta-cifrao',
  preco: 'icone-18-etiqueta-preco',
  chat: 'icone-19-chat',
  busca: 'icone-20-documento-busca',
  alvo: 'icone-21-alvo-flecha',
  cartao: 'icone-22-cartao-credito',
  check: 'icone-23-check-circulo',
  meta: 'icone-24-bandeira-montanha',
  cliente: 'icone-25-pessoa-balao',
};

export const Icone: React.FC<{nome: string; tamanho?: number}> = ({nome, tamanho = 80}) => {
  const arquivo = ICONES[nome] ?? (nome.startsWith('icone-') ? nome : ICONES.check);
  return (
    <Img
      src={staticFile(`icones/${arquivo}.png`)}
      style={{
        width: tamanho,
        height: tamanho,
        minWidth: tamanho,      // não encolhe em itens de 2 linhas
        objectFit: 'contain',
        display: 'block',
      }}
    />
  );
};

// ── Marca d'água gigante (usa o LOGO PRONTO, nunca texto criado) ────────────
// `tipo`: 'doma' = wordmark DOMA gigante; 'm' = símbolo M gigante (ex: DPOp0u).
// Tom-sobre-tom amarelo (logo-*-amarelo), sangrando pelas bordas, baixa presença.
export const MarcaDagua: React.FC<{
  tipo?: 'doma' | 'm';
  largura?: string;      // largura do logo (% do canvas)
  top?: string;
  left?: string;
  opacidade?: number;
}> = ({tipo = 'doma', largura = '120%', top = '-4%', left = '-8%', opacidade = 0.5}) => {
  // logotipo COR oficial (amarelo) como marca d'água tom-sobre-tom; M usa o recorte do símbolo
  const arquivo = tipo === 'm' ? 'logos/simbolo-m-amarelo' : 'oficial/logotipo-principal-cor';
  return (
    <Img
      src={staticFile(`${arquivo}.png`)}
      style={{
        position: 'absolute',
        top, left,
        width: largura,
        opacity: opacidade,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

// ── Card arredondado (níveis de amarelo) ────────────────────────────────────
type Nivel = 'soft' | 'med' | 'branco';
const fundoNivel: Record<Nivel, string> = {
  soft: brand.cores.amareloSoft,
  med: brand.cores.amareloMed,
  branco: brand.cores.branco,
};
export const Card: React.FC<{
  nivel?: Nivel;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({nivel = 'soft', children, style}) => (
  <div
    style={{
      background: fundoNivel[nivel],
      borderRadius: brand.ui.radiusCard,
      padding: 64,
      zIndex: 1,
      ...style,
    }}
  >
    {children}
  </div>
);

// ── Faixa de navegação "ARRASTA →" / círculo com seta ───────────────────────
export const NavArrasta: React.FC<{ultimo?: boolean}> = ({ultimo = false}) => {
  if (ultimo) return null;
  return (
    <div
      style={{
        position: 'absolute',
        bottom: brand.espaco.margem,
        right: brand.espaco.margem,
        width: 110,
        height: 110,
        borderRadius: '50%',
        background: brand.cores.branco,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 56,
        color: brand.cores.grafite,
        fontWeight: 700,
        zIndex: 2,
      }}
    >
      →
    </div>
  );
};

// ── Texto com palavras em destaque (negrito seletivo + highlight) ───────────
// Marca trechos com **bold** e ==highlight== dentro de uma string.
export const TextoRico: React.FC<{
  children: string;
  style?: React.CSSProperties;
  corHighlight?: string;
}> = ({children, style, corHighlight = brand.cores.amareloSoft}) => {
  // divide por **bold**, ==highlight== e //itálico//
  const partes = children.split(/(\*\*[^*]+\*\*|==[^=]+==|\/\/[^/]+\/\/)/g);
  // converte \n em quebra de linha real
  const renderTexto = (txt: string) =>
    txt.split('\n').map((linha, j, arr) => (
      <span key={j}>
        {linha}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  return (
    <span style={{whiteSpace: 'pre-wrap', ...style}}>
      {partes.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**'))
          return (
            <strong key={i} style={{fontWeight: 800}}>
              {renderTexto(p.slice(2, -2))}
            </strong>
          );
        if (p.startsWith('//') && p.endsWith('//'))
          return (
            <span key={i} style={{fontStyle: 'italic'}}>
              {renderTexto(p.slice(2, -2))}
            </span>
          );
        if (p.startsWith('==') && p.endsWith('=='))
          return (
            <span
              key={i}
              style={{
                background: corHighlight,
                fontWeight: 700,
                padding: '0.05em 0.18em',
                lineHeight: 1.45,
                boxDecorationBreak: 'clone',
                WebkitBoxDecorationBreak: 'clone',
              }}
            >
              {p.slice(2, -2)}
            </span>
          );
        return <span key={i}>{renderTexto(p)}</span>;
      })}
    </span>
  );
};
