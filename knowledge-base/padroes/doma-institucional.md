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

## Moldura com LINHA CORTADA (técnica principal — Patrick 2026-07-22)

A moldura tipográfica (178 e a variante PRINCIPAL "Quem controla o número, controla o resultado.")
tem a **linha da moldura CORTADA** onde um elemento cruza: o elemento fica POR CIMA, com a linha
dos dois lados dele (acima e abaixo, na vertical), **SEM linha atrás**.

**Como fazer (componente `BadgeGrafico`):** a linha da moldura é desenhada em `zIndex 1`; entre a
linha e o elemento, põe-se uma **"borracha" = círculo/retângulo na COR DO FUNDO (manga #F4BB35)**,
~14px maior que o elemento, em `zIndex 2`; o elemento (badge/palavra) vai em `zIndex 3` por cima.
A borracha apaga a linha atrás → corte limpo dos dois lados. MEDIDO no modelo: linha direita x832
com GAP y451-595 exatamente na altura do badge (cy516, Ø138). Borracha Ø166.

> Regra transversal: **qualquer elemento que cruze uma linha/moldura** e deva ficar "por cima sem
> linha atrás" usa a borracha na cor do fundo entre a linha e o elemento. Não basta pôr o elemento
> opaco por cima (a linha reencostaria nele) — a borracha cria o GAP dos dois lados.

**Peça principal "Quem controla o número, controla o resultado."** (`DomaQuem`, stills `doma-quem/-story`):
frame **x[247,833] y[243,1105] w586 h862** (MEDIDO por diff vs modelo; o 285/773 inicial deixava a
moldura alta e curta). Texto left300, NORMAL **fontSize 98** (Quem w252 medido) / "resultado" bold **130**
com **marginLeft -32** (no modelo o resultado começa ~40px à esquerda das outras linhas — outdent).
lineHeight normal 1.18, resultado marginTop 26. Linhas: Quem(reg) · controla o(bold) · número,(bold) ·
controla o(reg) · resultado.(bold grande). Badge cx874 cy(frameTop+273=516) com borracha (linha cortada).
São **2 modelos** na categoria (178 e Quem) — o **Quem é o principal**. Validado por diff pixel vs modelo.
