# Padrão de Post — "Dicas Carrossel / Trento" (Doma)

> ✅ **POST 193 RECRIADO (8 slides)** — `remotion-doma/src/v2/categorias/dicas-trento/Trento.tsx`.
> Modelo: `tipos-de-posts/.../Dicas Carrossel/Trento/POST 193 *.png`.
> Fidelidade: 87-94% (todos os slides). Storytelling Peccin/Trento.

Carrossel narrativo (8 slides **bespoke**, não parametrizado — cada slide é um componente próprio
`Trento1`..`Trento8`). Fotos históricas sépia + produtos (Trento/Hershey = terceiros) = **recortes
do modelo** (`_193-*.jpg`), NUNCA recriadas. Cores: manga `#F4BB35` · soft `#F8DD6B` · grafite `#1F1F1F`.

## Elementos compartilhados
- **`Bg`**: watermark "DOMa" tom-sobre-tom full-bleed (`_193-bg.png`, **extraído de um slide puro-texto**:
  pintar texto grafite→amber por threshold + preencher o meio flat de amber p/ matar ghosts). Reusado em TODOS os slides.
- **`Footer`**: "ARRASTA PRO LADO →" (grafite, centralizado, base ~5.5%).
- **`Foto`**: `{src,l,t,w,h,rad?}` — `rad:false` p/ produtos cutout (sem borderRadius, cola no amber).
- **`Txt`**: TextoRico grafite, posicionado por `{l,t,w,size,align}`.
- **`ChartDown`**: ícone SVG "gráfico caindo" (barras + seta ↘) em soft.

## Slides
- **1/6/8 = puro-Doma** (sem foto): capa (banda soft inclinada `rotate(-7deg)` = embrulho de bala + 2 "?" + selo grafite),
  pandemia (card soft), fecho (logo DOMa + "$" decorativos + highlights `==R$ 700 milhões==`).
- **2/3/4/5/7 = fotos extraídas**: histórias sépia, produtos Trento, produtos Hershey.
  - s4: card soft + título + **produto recortado** `L11% T23% W88% H38% rad:false` (placement = rect do recorte;
    erro corrigido: antes esticado offset = 67.9% → 87.3%). ⚠️ Pintar título/corpo baked do modelo com soft
    ANTES de recortar o produto (senão duplica com o re-tipado).

## Reaproveitável
- **Watermark de fundo tom-sobre-tom**: extrair de slide puro-texto (não recriar). Vira `_NNN-bg.png` global.
- **Produto cutout em amber**: o recorte traz amber ao redor → cola sem emenda no bg amber (`objectFit fill`, sem raio).
- **Pintar baked antes de recortar** quando texto/título do modelo cai dentro do recorte da foto.
- Ver [[carrosseis-foto-terceiros]] na memória.
