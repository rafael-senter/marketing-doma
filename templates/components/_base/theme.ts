/**
 * TOKENS DE MARCA DOMA — OFICIAIS
 * -------------------------------------------------------------
 * Extraídos do MANUAL_IDENTIDADE_DOMA.pdf + DOMA_discurso-e-tom-de-voz.pdf
 * + design-system-sigadoma.md (peças reais).
 * Todo template lê deste arquivo. Mudar a marca = mudar só aqui.
 */
import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// TT Lakes — tipografia INSTITUCIONAL oficial da Doma (TypeType, licença digital).
// Pesos embarcados em public/fontes/. Família registrada como "TT Lakes".
const FAMILIA = 'TT Lakes';
const pesos: [string, string][] = [
  ['400', 'TTLakes-Regular.ttf'],
  ['500', 'TTLakes-Medium.ttf'],
  ['600', 'TTLakes-DemiBold.ttf'],
  ['700', 'TTLakes-Bold.ttf'],
  ['800', 'TTLakes-ExtraBold.ttf'],
  ['900', 'TTLakes-Black.ttf'],
];
pesos.forEach(([weight, arquivo]) => {
  loadFont({
    family: FAMILIA,
    url: staticFile(`fontes/${arquivo}`),
    weight,
  });
});
const ttLakes = FAMILIA;

export const brand = {
  cores: {
    // Institucionais (sempre priorizar)
    amarelo: '#F4BB35',      // Amarelo Manga — protagonista (FUNDO no modo conteúdo)
    grafite: '#212121',      // Grafite — texto/logo (e FUNDO no modo promoção)
    // Secundárias / níveis de card
    amareloSoft: '#F8DD6B',  // card secundário, marca d'água, highlight de texto
    amareloMed: '#F0C84A',   // card intermediário (nível entre amarelo e soft)
    branco: '#FFFFFF',
    cinzaBg: '#E5E5E3',      // fundo claro alternativo (ex: peça de preço)
  },
  // Os 2 modos de fundo (regra do design system real)
  modo: {
    conteudo: {fundo: '#F4BB35', texto: '#212121', destaque: '#212121'}, // amarelo
    promo: {fundo: '#212121', texto: '#FFFFFF', destaque: '#F4BB35'},    // grafite
  },
  // Tokens de layout extraídos das peças reais
  ui: {
    radiusCard: 48,          // cantos arredondados dos cards
    radiusPilula: 32,
    bullet: '›',             // chevron, não "•"
  },
  fontes: {
    // TT Lakes — tipografia institucional OFICIAL (carregada acima).
    titulo: ttLakes,
    corpo: ttLakes,
  },
  // Convenção de pesos (TT Lakes) — não regredir corpo p/ 400 (perde coesão):
  // título/ênfase = 800 (ExtraBold), corpo = 500 (Medium), label = 700 (Bold).
  peso: {titulo: 800, corpo: 500, label: 700, hero: 900},
  // Tagline e complemento oficiais
  voz: {
    tagline: '#DomineAGestãoDoSeuNegócio',
    complemento: 'Software para gestão.',
    bordao: 'Quem domina a gestão, alcança mais resultados.',
    site: 'DOMAGESTAO.COM.BR',
  },
  formato: {
    vertical: {largura: 1080, altura: 1350}, // 4:5 — padrão da Doma no feed
    quadrado: {largura: 1080, altura: 1080},
    story: {largura: 1080, altura: 1920},
  },
  espaco: {
    margem: 80,
  },
} as const;
