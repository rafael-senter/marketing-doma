# Padrão de Post — "Troque Isso / Por Isso" (carrossel) — Doma

> 🆕 **CATEGORIA NOVA** (2026-07-21). Modelo medido: `POST 186` (loja de produtos naturais, 9 slides —
> prints disponíveis dos slides 1, 2, 7, 8, 9).
> Componente: `../../templates/components/troque-por-isso/TroquePorIsso.tsx`
> (`TrocaCapa` · `TrocaMiolo` · `TrocaFecho` · `TrocaCta`).
> Primeira peça produzida: `POST-ferragens-troca` (9 slides, aprovada por Patrick 2026-07-21).
>
> ⚠️ Não confundir com [dicas-otica.md](dicas-otica.md) (usa pílulas TROQUE/POR ISSO **sobre fotos**,
> layout totalmente diferente) nem com [certo-e-errado.md](certo-e-errado.md) (card único X/✓).

Carrossel de dicas em pares antes→depois. Canvas 1080×1350.
**Os números abaixo são os IMPLEMENTADOS e aprovados** — é essa a fonte da verdade, não o que
estiver em anotação antiga. Onde o valor implementado difere do bruto medido, está anotado.

---

## 1. Paleta MEDIDA

| Token | Hex | Uso |
|---|---|---|
| manga | `#F4BB35` | fundo de TODOS os slides |
| soft | `#F8DD6B` | cards (miolo + fecho), ícones do CTA |
| grafite | `#212121` | ⚠️ **NÃO** `#1F1F1F` — medido `#212121` em todos os textos/badge |
| branco | `#FFFFFF` | tabs, borda dos cards, texto do badge |
| watermark | `#F3B530` | só no slide CTA (mais ESCURA que o fundo — regra §9 normal) |
| check verde | `#7CB342` | quadrado do ✅ da lista |

## 2. Tipografia — as 3 regras que mais deram erro

**2.1 Peso (RULES §23).** Regular **400** · negrito **500** (TT Lakes Medium).
Traço medido: bold 6px vs regular 4px → ratio **1.5×**. ❌ Nunca 700 (dava 2.5×, virava black).
Vale para tabs, títulos, `TextoRico boldWeight` e todo `**markup**`.

**2.2 `lineHeight` é FIXO em px, NÃO relativo (RULES §24).**
No modelo o spacing é 66/65/67px com o fontSize variando entre 58, 55 e 54 — o espaçamento
**não acompanha** o corpo. `lineHeight: 1.25` desalinha todos os blocos de uma vez.

**2.3 Itálico = `skewX(-8.5deg)`, nunca `fontStyle: italic` (RULES §25).**
TT Lakes não tem arquivo itálico; o oblique sintético do Chromium deita **12.5°** e o modelo
usa **8-9°** ("muito deitado"). `font-style: oblique <angle>` é IGNORADO em fonte sem eixo `slnt`
(testado: 0°). Só o skew controla. Render final mede **7°**.

---

## 3. Assinatura visual: **card de 1 canto reto + bordinha branca**

Todo card tem raio **110px** em 3 cantos e **0** no canto onde encosta a tab:

| Bloco | borderRadius | canto reto |
|---|---|---|
| Card **TROQUE ISSO** (topo) | `0 110px 110px 110px` | sup-esquerdo |
| Card **POR ISSO** (base) | `110px 0 110px 110px` | sup-direito |
| Card do **fecho** (slide 8) | `110px 0 110px 110px` | sup-direito |
| **Foto** da capa | `8px 45px 45px 45px` | sup-esquerdo (raio 45 nos outros) |

**TUDO leva borda branca 2px** (`border: 2px solid #FFF` + `boxSizing: border-box`) acompanhando
os mesmos raios — cards do miolo, card do fecho **E a foto da capa**. Medida no modelo: contorno
branco no perímetro exato da foto (px `x134` / `y480` / `y1086`). Sem ela a foto "solta" do fundo.

---

## 4. `TrocaCapa` (slide 1)

- Fundo manga liso — **SEM watermark**.
- **Título** esq `12.8%`, top `11%`, **fontSize 64**, `lineHeight 1.05`, regular + palavras-chave
  **bold**. Quebras de linha HARDCODED (`\n`).
  (Modelo tinha 3 linhas em fs 82; a copy real costuma ser maior — fs 64 em 4 linhas é o que cabe
  sem invadir a foto. Se passar de 4 linhas, ver RULES §22.)
- **Foto** `L12.4% T35.6% W75.3% H45.0%` (px `134,480 → 946,1087`), `objectFit: cover`.
- **Badge grafite** canto inf-dir, **transbordando à direita da foto** (`right: 5.7%`, `top: 65.8%`),
  raio 18, **HUG CONTENT** (largura acompanha o texto — RULES §22.3), padding `20px 24px`,
  texto branco **fontSize 32** centralizado, 2 linhas.
- **Logo DOMa** wordmark grafite, `top 93.6%`, centrado, tamanho 66.

### Foto da capa — regras (ver sub-skill `image-sourcer`)
- **Loja real do segmento, visão do dono.** Nunca stock de pessoa sorrindo.
- **Enquadramento ABERTO** (corredor/profundidade da loja), não close de prateleira.
- **Preços em etiqueta IMPRESSA de prateleira** — ❌ nunca papelão manuscrito (fica estranho e
  contradiz o discurso Doma de que a loja tem controle).
- Luz do lugar (fluorescente + luz da rua), piso gasto, foto documental. Nada de estúdio/CGI.
- Asset de referência aprovado: `assets/bases-nanobanana/_ferragens-loja-v2-base.png`.

---

## 5. `TrocaMiolo` (slides 2 … N-2) — o coração da categoria

### Geometria (idêntica em TODOS os miolos)

| Elemento | px | % |
|---|---|---|
| Card TROQUE (topo) | `73,113 → 1006,673` (934×561) | `L6.8% T8.4% W86.5% H41.6%` |
| Card POR ISSO (base) | `73,693 → 1006,1253` (934×561) | `L6.8% T51.3% W86.5% H41.6%` |
| Gap entre os dois cards | 20px | — |
| Tab "TROQUE ISSO" | `38,140 → 387,215` (350×76) | `L3.5% T10.4% H5.6%` |
| Tab "POR ISSO" | `776,717 → 1043,792` (268×76) | `L71.9% T53.1% H5.6%` |
| Padding interno do card | top **102** · lados **97** · base **30** | (o top 102 é a folga da tab) |

**Tabs**: retângulo BRANCO, raio 12, altura 76, `padding: 0 44px`, texto grafite **fs 38 peso 500**
caixa-alta, `letterSpacing 0.5`. **HUG CONTENT** — a largura acompanha o texto.
A do topo alinha pela ESQUERDA e sangra 35px pra fora do card; a de baixo pela DIREITA, sangra 37px.
Ficam `+26px` abaixo do topo do card, sobrepondo a borda (zIndex acima).

### Texto dos cards — hierarquia de papel (NÃO achatar)

Centralizado (cx 540 = centro do canvas e do card), vertical centrado na área abaixo da tab.

| Papel | fs | lh | estilo |
|---|---|---|---|
| Principal (a frase / fala entre aspas) | **54** | 62px | regular |
| Principal quando é a fala do "erro" | **50** | 62px | bold + itálico |
| Título do card com lista | **52** | 62px | bold |
| **Nota / reforço** ("Venda o benefício…") | **37** | 43px | bold + itálico |
| Item da lista ✅ | **50** | 50px | regular · ✅ **55×55px**, gap 16 do texto, spacing 67 entre itens |

❌ **Erro real cometido:** reforço em fs 50 contra principal em 52 — a hierarquia sumiu e o card
virou um bloco único. O reforço é **notícia menor**, ~0.69× do principal.

### O ✅ da lista — asset EXTRAÍDO do modelo (RULES §27)
`assets/oficial/_troca-check.png` — é o **emoji ✅ do sistema**, com brilho no canto sup-esq e
sombra na borda inf-dir. ❌ NÃO redesenhar em SVG: sai chapado e o Patrick pega na hora.
Quadrado verde `#7CB342` de **59×59px** no modelo (px `x197-255`, `y1122-1180`), **gap 16** até o
texto, **spacing 66px** entre itens. Implementado em **55×55** (proporcional aos corpos -7%),
spacing 67 — bate com o modelo.
❌ **Erro real cometido:** ✅ de 33×33 — quase metade do modelo. O componente `Check` desenhava um
`rect` de 42/48 dentro do viewBox, então o `size` NÃO era o lado do quadrado. Corrigido: o `rect`
preenche o viewBox inteiro, logo `size` = lado real do quadrado.
⚠️ Sempre medir o elemento RENDERIZADO, não confiar no número passado como prop — padding interno
de SVG/viewBox faz o valor efetivo ser menor que o declarado.

> Os valores brutos medidos no modelo eram 58/54/55/40/54 com lh 66. O Patrick pediu **-4 no corpo**
> na revisão final — a peça respira melhor. **A razão entre os papéis é o que não pode mudar**;
> o número absoluto foi calibrado a olho e aprovado assim.

- **Gap entre blocos do card = 70px** (dá ~135px entre os tops das linhas).
  Medido no modelo: s2 977→1118 = 141 · s7 353→485 = 132 · s7 868→999 = 131.
- **Aspas tipográficas “ ”** quando é fala/exemplo.
- Quebras de linha **HARDCODED** nos props (texto centralizado depende do wrap exato).

---

## 6. `TrocaFecho` (slide N-1)

- Card soft ÚNICO `112,158 → 967,1192` = `L10.4% T11.7% W79.3% H76.6%`, borda branca 2px. **Sem tab.**
- `padding: 0 107px 0 189px` (coluna de texto estreita, ~455px → **~11-14 chars/linha**).
- Texto **alinhado à esquerda**, **fontSize 73**, `lineHeight 1.40`, **gap 70px** entre parágrafos.
- Um parágrafo em **bold** (no modelo: "É estratégia."). Quebras HARDCODED.
- Cabe **~7 linhas + 1 gap**. 9 linhas estouram (foi preciso cortar um parágrafo na peça real).

## 7. `TrocaCta` (slide N)

- Fundo manga + **watermark DOMa GIGANTE** tom-sobre-tom `#F3B530`: logo VERTICAL empilhada via
  CSS mask de `logotipo-vertical-branco.png`, `top 20%`, `left -13.5%`, `width 127%`,
  `aspectRatio 1681/1328` — sangra a base.
- **3 blocos** ícone + texto: bloco em `L15.1% T22% W78%`, **gap 90px** entre blocos
  (medido: bloco1 top 338 → bloco2 top 521), ícone em coluna de 102px, gap 32 do texto.
- Texto **fontSize 67**, `lineHeight 1.38`, primeira palavra em **bold**
  ("Salve", "Compartilhe", "E conta pra gente:").
- **Ícones soft** (`#F8DD6B`) = assets EXTRAÍDOS do modelo (RULES §27), ❌ nunca redesenhados:
  | Ícone | asset | tamanho | detalhe que errei ao desenhar |
  |---|---|---|---|
  | salvar | `_troca-icone-salvar.png` | 68×86 | bookmark com entalhe em V na base |
  | compartilhar | `_troca-icone-compartilhar.png` | 103×86 | **não é triângulo** — cursor com o lado esq dobrado |
  | comentar | `_troca-icone-comentar.png` | 84×84 | balão com rabinho no canto inf-**DIREITO** |
- **Sem logo** no rodapé — a watermark faz o papel de marca.

---

## 8. Regras da categoria

- ❌ NÃO usar a seta oficial `SetaDoma` — esta categoria não tem flecha direcional.
- ❌ NÃO existe faixa "ARRASTA PRO LADO" aqui. Não inventar.
- Bullets = **✅ verde**, só no último miolo (seguindo o modelo). Sem `–` / `›` / `•`.
- ❌ NÃO escrever a marca como texto. Logo da capa = `LogoDoma wordmark`; watermark = CSS mask.
- Grafite é `#212121` (medido), diferente do `#1F1F1F` de outras fichas.
- Quantidade de miolos é livre (modelo tem 6). Estrutura: capa + N miolos + fecho + CTA.
- Último miolo pode citar o Doma + checklist ✅ (fecho comercial do carrossel) — está no modelo.

## 9. Limites de encaixe (RULES §22 — calcular ANTES de codar)

| Bloco | fs | Máx chars/linha | Máx linhas | Área útil |
|---|---|---|---|---|
| Capa título | 64 | ~25 | 4 | 330px (até a foto) |
| Capa badge | 32 | hug | 2 | largura cresce com o texto |
| Card do miolo (cada) | 54 | ~26 | 6 | 419px (561 − 102 tab − 30 base) |
| Nota/reforço | 37 | ~38 | 2 | conta dentro dos 419px |
| Tab | 38 | hug | 1 | — |
| Fecho | 73 | ~13 | 7 | 835px |
| CTA (cada bloco) | 67 | ~19 | 3 | 3 blocos fixos |

## 10. Validação obrigatória do render

1. **Tops das linhas** — comparar a lista de tops do render com a do modelo na mesma faixa y.
   Devem bater dentro de ~5px. (Peça real: modelo `846/912/977` + reforço `1118` ·
   nosso `839/907/971` + reforço `1104` ✅.)
2. **Espessura do traço** — bold ≈ 1.5× o regular (RULES §23).
3. **Ângulo do itálico** — 8-9°; validar o método rodando antes num trecho regular (tem que dar ~0°).
4. Render SEMPRE por `render-still.sh` (scale 2 → Lanczos).

## 11. Histórico de correções (não repetir)

| # | Erro | Correção |
|---|---|---|
| 1 | Foto da capa sem a bordinha branca | borda 2px também na foto (§3) |
| 2 | Negrito 700 — traço 2.5× o regular | peso **500** (§2.1) |
| 3 | `lineHeight` relativo (1.25) | **px fixo** 62/43/50 (§2.2) |
| 4 | Reforço fs 50 vs principal 52 — hierarquia achatada | 37 vs 54 (§5) |
| 5 | Gap entre blocos 30 | **70** (miolo) e **90** (CTA) |
| 6 | `fontStyle: italic` deitando 12.5° | `skewX(-8.5deg)` (§2.3) |
| 7 | Foto de capa "artificial", preço em papelão | enquadramento aberto + etiqueta impressa (§4) |
| 8 | ✅ da lista com 33px (modelo tem 59) | `rect` preenche o viewBox → `size` = lado real; 55px (§5) |
| 9 | ✅ e ícones do CTA desenhados à mão (chapados, formas erradas) | **extraídos do modelo** como PNG transparente (RULES §27) |
