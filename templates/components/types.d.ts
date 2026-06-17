/**
 * types.d.ts — tipos TypeScript dos props de cada componente do plugin marketing-doma.
 * Centraliza pra autocompletar Stills no Root.tsx do host.
 *
 * Uso (no host remotion-doma):
 *   import type { DicasCapaProps, DicasMioloProps, DicasCtaProps, ... } from './v2/categorias/types';
 */

// ─── COMUNS ─────────────────────────────────────────────────────────────────

/** Box posicional em % do canvas (1080×1350) */
export type BBox = {
  left: string;   // ex: '12.4%'
  top: string;
  width: string;
  height: string;
};

export type Canto = 'sup-esq' | 'sup-dir' | 'inf-esq' | 'inf-dir';
export type Posicao = 'topo' | 'base';
export type CorCard = 'soft' | 'grafite' | 'branco' | 'claro';

// ─── DICAS CARROSSEL (POST 246, 133, 193) ──────────────────────────────────

export type DicasCapaProps = {
  /** Título 2 linhas, cada uma em caixa highlight soft. Ex: 'ERROS\nCOMUNS' */
  titulo: string;
  /** Subtítulo dir-inf — 1 string por linha. Prefixo '**' = linha bold. */
  subtitulo: string[];
  /** PNG line-art transparente do modelo. Ex: 'oficial/_dicas246-icones.png' */
  icones: string;
};

export type DicasMioloProps = {
  /** '01', '02', ... — número grande esquerda. */
  numero: string;
  /** Título bold direita — 3-4 linhas DENSAS (preenche header). */
  titulo: string;
  /** Corpo do card branco. Suporta **bold**, ==highlight==, //italic//, \n. */
  corpo: string;
  /** Altura % do card soft topo (default 36.5 — padrão POST 246). */
  headerHeight?: number;
  /** Font size do número grande (default 200). */
  numeroSize?: number;
  /** Font size do título (default 50). */
  tituloSize?: number;
};

export type DicasCtaProps = {
  /** Texto principal. Suporta markup TextoRico. INCLUIR BORDÃO DOMA. */
  texto: string;
};

// ─── INIMIGO EM COMUM (POST 244, 252) ──────────────────────────────────────

export type InimigoComumProps = {
  /** Frase principal — aspas curvas + bold no remate. Quebras \n hardcoded (3+3 linhas). */
  principal: string;
  /** Texto secundário centralizado no card soft. 3 linhas regular. */
  secundario: string;
};

// ─── CERTO E ERRADO (POST 247, 256) ────────────────────────────────────────

export type CertoErradoProps = {
  /** Frase do card errado (X). Markdown ** suportado. */
  errado: string;
  /** Frase do card certo (✓). */
  certo: string;
};

// ─── CLIENTE NOVO (LAYOUT CLIENTE NOVO) ────────────────────────────────────

export type ClientesProps = {
  /** Path da foto da loja. Ex: 'oficial/_<slug>-loja.jpg' */
  foto: string;
  /** Nome do cliente (vai em bold no texto). */
  nome: string;
  /** Cidade/UF. Ex: 'Teixeira de Freitas/BA' */
  cidade: string;
};

// ─── DOMA MOTIVA (POST 242, 250) ───────────────────────────────────────────

export type DomaMotivaProps = {
  foto: string;
  /** Cada string = 1 frase motivacional com **bold** seletivo. */
  blocos: string[];
  /** Posição do card soft. */
  card: BBox;
  /** Canto onde aparece o selo grafite. */
  seloCanto: Canto;
  /** Posição da watermark. */
  watermark: Posicao;
};

// ─── NARRATIVA (POST 265 modo card) ────────────────────────────────────────

export type NarrativaProps = {
  foto: string;
  /** Frase forte contraintuitiva. Ex: 'Estoque cheio\n**e caixa vazio?**' */
  principal: string;
};

// ─── SPIN (POST 243, 251) ──────────────────────────────────────────────────

export type SpinCapaProps = {
  titulo: string;
  texto: string;
  foto: string;
};

export type SpinMioloProps = {
  /** Perguntas com `→ ` cada. */
  perguntas: string;
  /** Usar card claro em vez de soft (default false). */
  cardClaro?: boolean;
};

export type SpinCtaProps = {
  texto: string;
  destaque: string;
};

// ─── DOMA CARROSSEL CLIENTES (POST 205) ────────────────────────────────────

export type ClientesMioloProps = {
  /** Card colorido completo (logo + cor + cantos baked) recortado do modelo. */
  card: string;
  /** Texto descritivo embaixo. ** suportado pro nome do cliente + DOMa. */
  texto: string;
};

// ─── DICAS / ÓTICA (POST 133) ──────────────────────────────────────────────

export type Box = {src: string; l: number; t: number; w: number; h: number; rad?: boolean};

export type AntesDepoisProps = {
  fotoA: Box;
  fotoB: Box;
  pilA: {l: number; t: number};
  pilB: {l: number; t: number};
  compara: {texto: string; l: number; t: number; w: number};
  nota?: {texto: string; l: number; t: number; w: number};
};

export type FullFotoProps = {
  foto: string;
  card: {l: number; t: number; w: number; h: number; cor: 'soft' | 'grafite'};
  titulo: string;
  corpo?: string;
};

// ─── FUNÇÕES DO SISTEMA (POST 127, 201, 207, 248, 266, 273) ────────────────

export type FuncoesSistemaProps = {
  /** Base fotorrealista nanobanana. Ex: 'oficial/_func<NNN>-base.png' */
  base: string;
  /** "DOMa" branca topo (CSS mask). */
  watermark?: boolean;
  /** LogoDoma grafite centralizado no topo. */
  logoTopo?: boolean;
  /** LogoDoma grafite centralizado no rodapé. */
  logoRodape?: boolean;
  /** Estatística gigante. */
  bigNumero?: {
    texto: string;
    left: string;
    top: string;
    fontSize?: number;
  };
  /** Frase de feature no topo. */
  tituloTopo?: {
    texto: string;
    left?: string;
    top: string;
    width: string;
    fontSize?: number;
    align?: 'left' | 'center';
  };
};
