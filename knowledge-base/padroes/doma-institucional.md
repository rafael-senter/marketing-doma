# Padrão de Post — "Doma (institucional)" (Doma)

> ✅ **POST 115, 178, 257, 271 RECRIADOS (4/4)** — `../../templates/components/doma-institucional/DomaInstitucional.tsx`.
> Modelos: `tipos-de-posts/.../Doma/POST *.png`.

Cards institucionais da marca. Canvas 1080×1350. Cores: manga `#F4BB35` · soft `#F8DD6B` ·
grafite `#1F1F1F` · branco `#FFF` · watermark `#EAAD32`.

## 2 sub-tipos (4 componentes bespoke)
### Tipográficos (code-only, sem device) — `Doma178`, `Doma271`
- **Frame grafite** (178: x[20-78%] y[18-82%]) + ícone branco em balão (gráfico subindo, SVG) +
  texto. Tudo vetorial, sem imagem externa.
- `IconeGrafico`: balão branco `borderRadius 50% 50% 50% 8%` + barras grafite + seta manga subindo (SVG).

### Com base nanobanana — `Doma115` (phone+menu), `Doma257` (notas R$)
- Base fotorrealista nanobanana (mesmo pipeline de [[funcoes-sistema]]) + overlays Remotion.

## Reaproveitável
- **Code-only quando o post é puramente tipográfico/geométrico** (frame + ícone SVG) — não precisa nanobanana.
- **Ícone "gráfico subindo" em balão** = SVG reaproveitável (barras + seta manga).
- Watermark institucional `#EAAD32` (mais visível que o `#F5C24A`/`#F6C85D` de outras categorias — medir por post).

## Limites pra criação nova (§19 — calculados do componente, 2026-07-16)
| Bloco | fs | Máx chars/linha |
|---|---|---|
| Texto principal (115/257) | 54 lh1.12 | ~26 |
| Texto secundário | 46 lh1.18 | ~30 |
| Labels "+" | 38 bold | ~20 |
- Sub-tipo (a) tipográfico = code-only; (b) com base nanobanana = pipeline funcoes-sistema.
- Selo "12 anos" é ELEMENTO DATADO — confirmar número vigente antes de reusar (hoje selo oficial = 14 anos).

## Revisão v3 (2026-07-22) — recriação medida das 4 peças + story

As 4 peças estavam divergentes (medição pixel a pixel corrigiu). Cada uma agora com prop `story`
(px fixo, só reposiciona). Valores MEDIDOS nos modelos:

**178 (tipográfico)** — frame x[247,832] y[243,1107] w585 h864 raio44 borda2px. Watermark full-bleed
topo cor **#F1A625**. Texto NORMAL **fontSize 96** (cap 71 / x-height 52 — o 62 antigo era pequeno),
"prosperar" bold **112**. Left-align x≈297, centrado vertical no frame. Badge gráfico branco x805 (balão).

**257 (notas R$)** — card soft x[160,841] y[389,960] **w681 h571** (era 49%×26%, pequeno). Texto
**fontSize 70** (cap 51 / x-height 38), centrado, padLeft 124. DOMa vertical (rotate -90) **tamanho 160**
(era 92), centro x805 sobre a direita do card. Base = money top-dir + base-esq (cover, emoldura).

**115 (celular ERP)** — usa a base **TRANSPARENTE** `_doma115-base-transp.png` (celular sem fundo) sobre
manga + watermark, senão o fundo baked tapava a watermark e o celular ficava alto demais. Celular
posicionado left164 top252 w924 (phone bbox modelo y24.6-97.6%, começa BAIXO). Card branco ALTO
x85 top250 w445 **h560** (era h38% baixo). Box logo soft topo-dir x590 top268 w388 (logo tamanho 54).
Badge "12 anos" x112 top783 w130 h99. 3 pílulas soft left280 (controle/vendas/lucro) na borda card/celular.

**271 (lista+seta)** — já estava ~90%; convertido a px (card x428 top640 w605 h524, círculo seta 167×167)
+ story. Título esq, ESTRANHA em highlight soft, "com quem usa Doma." sublinhado.

> ⚠️ Regra geral desta categoria: peças com mockup/foto (115/257) usam base nanobanana. Se a base tiver
> fundo baked que conflita com watermark/posição → usar a versão **transparente** e montar o fundo em código.

Stills: `doma-115/-story` · `doma-178/-story` · `doma-257/-story` · `doma-271/-story`.
