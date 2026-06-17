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
