# Padrão de Post — "Doma / Carrossel Clientes" (Doma)

> ✅ **POST 205 RECRIADO (8 slides)** — `../../templates/components/doma-carrossel-clientes/CarrosselClientes.tsx`.
> Modelo: `tipos-de-posts/.../Doma/Carrossel clientes/POST 205 *.png`.
> Fidelidade: miolos 93-94% · capa 88% · fecho 93%.

Carrossel institucional: capa → 6 cards de logo de cliente → fecho. Canvas 1080×1350.
Logos de terceiros = **recortes do modelo** (`_205-cardN.png` = card colorido + logo + cantos baked),
NUNCA recriados. Cores: manga `#F4BB35` · soft `#F8DD6B` · card-claro `#EFEFEE` · grafite `#1F1F1F`.

## 3 templates
### 1) `ClientesCapa` (slide 1)
- **Grafismos** = camada REAL extraída do modelo (`_205-graf1.png`, content pintado de amber → sobra só decoração), full-bleed.
- Logo DOMa grafite sup-esq (`L16.4% T14%`, tamanho 70).
- **Card claro** `L9.4% T26.5% W81.1% H42.6%`, raio 40, frase (fontSize **58** → bate as **6 linhas** do modelo;
  bold em "Temos orgulho de apoiar", italic em "que não param de crescer").
- Texto solto inferior `L22.1% T77.3% W38.3%` (fontSize 44 → 4 linhas; bold em "gestão à altura").

### 2) `ClientesMiolo` (slides 2-7) — props `{card, texto}`
- **Card do cliente recortado** (logo+card+cantos baked) `L9.4% T10% W81.1% H42.6%` (`objectFit fill`).
- Texto corrido embaixo `L16.7% T56% W72%` (fontSize 46, bold no nome do cliente e em DOMa).

### 3) `ClientesFecho` (slide 8)
- Grafismos extraídos (`_205-graf8.png`) + card claro com fecho (bold em DOMa).

## Reaproveitável
- **Logo+card recortados juntos** (não separar logo do fundo): recorta o card colorido inteiro e coloca como Img.
- **Grafismos amber-on-amber**: extrair pintando card/logo/texto de amber → sobra a decoração; usar como bg full-bleed
  (capa 76→84→88%, fecho 83→93%).
- **Ajuste de fonte p/ bater wrap**: subir fontSize até o nº de linhas do modelo coincidir (54→58 = 5→6 linhas).
- Ver [[carrosseis-foto-terceiros]] na memória.
