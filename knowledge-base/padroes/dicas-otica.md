# Padrão de Post — "Dicas Carrossel / Ótica" (Doma)

> ✅ **POST 133 RECRIADO (9 slides)** — `../../templates/components/dicas-otica/Otica.tsx`.
> Modelo: `tipos-de-posts/.../Dicas Carrossel/ótica/POST 133 *.png`.
> Fidelidade: s5 95% · s7 98% · miolos 85-91% · capa 83%. Teto baixo em capa = fotos.

Carrossel "antes/depois" de vitrine de ótica. Canvas 1080×1350. Fotos de terceiros (vitrine, produtos)
= **recortes do modelo** (`public/oficial/_133-*.jpg`), NUNCA recriadas. Cores: manga `#F4BB35` ·
soft `#F8DD6B` · grafite `#1F1F1F` · branco `#FFF`.

## 4 templates
### 1) `OticaCapa` (slide 1)
- Título topo (esq, fontSize 52 bold, "trocas inteligentes" **sublinhado** — modelo usa underline, NÃO highlight-box).
- **2 fotos** (TROQUE ISSO / POR ISSO) lado a lado, **recortadas no rect EXATO do modelo**:
  esq `L3.5% T31.6% W45.4% H48.5%` · dir `L51.1% T31.6% W45.2% H48.3%`. ⚠️ Recortar no rect medido
  (detecção numpy) garante que as pílulas baked fiquem alinhadas com as re-tipadas.
- **Pílulas soft** re-tipadas por cima das baked (mesma posição = cobre): TROQUE `L3.7% T40.3% W21.9%`,
  POR ISSO `L74.2% T40.3% W21.9%`.
- Seta circular grafite (outline) no meio das fotos (`L46.5% T49%`, Ø64).
- Pílula CTA grafite "para chamar mais atenção!" (centralizada, base).
- Logo DOMa grafite (sup-dir-inf).

### 2) `OticaAntesDepois` (slides 2-4)
- 2 fotos emolduradas (props `fotoA`/`fotoB`, cada `{src,l,t,w,h}`) + 2 pílulas soft (TROQUE/POR ISSO,
  posição via `pilA`/`pilB`) + texto comparativo (X) + nota opcional. Tudo posicionado por props.

### 3) `OticaFullFoto` (slides 5-8)
- **Foto full-bleed** (`objectFit cover`) + **card** (`soft` ou `grafite`) com título+corpo.
  Card via props `{l,t,w,h,cor}`; `titulo` bold, `corpo` regular. Estes slides batem 95-98% (foto domina).

### 4) `OticaCta` (slide 9)
- Card soft alto (topo→66%) "Você já faz isso?" (fontSize 96 bold) + corpo + **watermark DOMa**
  via CSS mask de `logotipo-principal-branco.png`, `backgroundColor #EBB231` (tom-sobre-tom), base.

## Reaproveitável
- **Recorte = colocação**: recortar foto no rect % medido e colocar no MESMO rect → fidelidade alta automática.
- **Pílula opaca na posição da baked** cobre a versão do modelo (não precisa pintar antes se a sobreposição é exata).
- Ver [[carrosseis-foto-terceiros]] na memória + RULES §9 (watermark CSS-mask).

## Revisão v3 (2026-07-23) — bugs consertados + story nas 9

**Capa (slide 1):** tinha **SETA DUPLA** — a seta e as badges TROQUE ISSO/POR ISSO já vêm BAKED nas fotos
`_133-s1a/s1b`, e o componente desenhava OUTRA seta no centro (46.5%). Fix: componente NÃO desenha
seta/badges na capa (usa as baked). Título subiu p/ fontSize **64** (era 52) e largura 80% (medido
x9.5-83%). Fotos maiores h**55.7%** (eram 48%). Logo centralizado no rodapé.

**Antes/Depois (2-4):** fotos pequenas (slide 2 fotoA era h27) + texto colidindo. Fix: fotos nas
posições MEDIDAS (A x8.6-51.8% y12.9-57.9%, B x52-93.4% y42.1-87.1%, diagonal), texto comparativo no
quadrante limpo (l52 t24). Badges = **pílula OPACA** do componente (soft + borda manga 4px) cobrindo a
baked. Slide 2 fotoA tinha a badge baked no MEIO (x43-100% y12-40%) → **pintada** copiando a prateleira
de baixo por cima (a pílula do componente sozinha não cobria).

**Story nas 9:** fotos mantêm px (h*0.703 no 1920), diagonal preservada; CTA card px centrado;
capa/texto reposicionados. Render `1080 1920`.

> ⚠️ Badge baked que NÃO fica sob a pílula do componente (posição do crop ≠ posição do modelo) →
> PINTAR a região (copiar conteúdo de foto adjacente) antes. Não basta a pílula opaca.

Stills: `otica-133-1..9` + `otica-133-1..9-story`.
