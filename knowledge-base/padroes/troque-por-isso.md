# Padrão de Post — "Troque Isso / Por Isso" (carrossel) — Doma

> 🆕 **CATEGORIA NOVA** (2026-07-21). Modelo: `POST 186` (loja de produtos naturais, 9 slides).
> Não confundir com [dicas-otica.md](dicas-otica.md) (usa pílulas TROQUE/POR ISSO **sobre fotos** —
> layout totalmente diferente) nem com [certo-e-errado.md](certo-e-errado.md) (card único X/✓).
> Componente: `../../templates/components/troque-por-isso/TroquePorIsso.tsx`.

Carrossel de dicas em pares antes→depois. Canvas 1080×1350. Slides medidos: 1, 2, 7, 8, 9.

## Paleta MEDIDA (POST 186)
| Token | Hex | Uso |
|---|---|---|
| manga | `#F4BB35` | fundo de TODOS os slides |
| soft | `#F8DD6B` | cards (miolo + fecho), ícones do CTA |
| grafite | `#212121` | ⚠️ **NÃO** `#1F1F1F` — medido `#212121` em todos os textos/badge |
| branco | `#FFFFFF` | tabs, borda dos cards, texto do badge |
| watermark | `#F3B530` | só no slide CTA (mais ESCURA que o fundo — regra §9 normal) |
| check verde | `#7CB342` | emoji ✅ da lista (slide 7) |

## Assinatura visual da categoria: **card de 1 canto reto**
Todo card tem raio **110px** em 3 cantos e **0** no canto onde encosta a tab.
- Card **TROQUE ISSO** (topo) → canto reto **superior-esquerdo** → `borderRadius: '0 110px 110px 110px'`
- Card **POR ISSO** (base) → canto reto **superior-direito** → `borderRadius: '110px 0 110px 110px'`
- Card do **fecho** (slide 8) → canto reto **superior-direito**
- Foto da **capa** → canto reto superior-esquerdo, raio **45** nos outros

**TUDO** nesta categoria leva **borda branca 2px** (`border: 2px solid #FFF` + `boxSizing: border-box`)
acompanhando os mesmos raios — cards do miolo, card do fecho **E a foto da capa**.
A bordinha fina é assinatura da categoria: MEDIDA no modelo (contorno branco no perímetro exato
da foto — px `x134` / `y480` / `y1086`). Sem ela a foto "solta" do fundo manga.

---

## 1) `TrocaCapa` (slide 1)
- Fundo manga liso — **SEM watermark**.
- **Título** 3 linhas, esq `x138` (L12.8%), cap-top `y203` (T15.0%), **fontSize 82**, lineHeight 1.05,
  regular + palavras-chave **bold** (no modelo: "curando" / "complicando?").
- **Foto** (loja do segmento) `L12.4% T35.6% W75.3% H45.0%` — px `134,480 → 946,1087`.
  raio `8px 45px 45px 45px` (canto sup-esq reto), `objectFit: cover`.
- **Badge grafite** sobre a foto, canto inf-dir, **transbordando à direita da foto**:
  px `673,888 → 1018,1015` = `L62.3% T65.8% W32.0% H9.4%`, raio ~18,
  texto branco 2 linhas centralizado, **fontSize ~34 regular**.
- **Logo DOMa** wordmark grafite, rodapé centrado: px `428,1264 → 650,1304` (T93.6%, altura 41).

## 2) `TrocaMiolo` (slides 2–7) — o coração da categoria
Dois cards soft empilhados, medidas IDÊNTICAS em todos os miolos:

| Elemento | px | % |
|---|---|---|
| Card TROQUE (topo) | `73,113 → 1006,673` (934×561) | `L6.8% T8.4% W86.5% H41.6%` |
| Card POR ISSO (base) | `73,693 → 1006,1253` (934×561) | `L6.8% T51.3% W86.5% H41.6%` |
| Gap entre cards | 20px | — |
| Tab "TROQUE ISSO" | `38,140 → 387,215` (350×76) | `L3.5% T10.4% W32.3% H5.6%` |
| Tab "POR ISSO" | `776,717 → 1043,792` (268×76) | `L71.9% T53.1% W24.8% H5.6%` |

- **Tabs**: retângulo BRANCO, raio ~12, texto grafite **bold fontSize 38** caixa-alta,
  padding-x ~44. Tab do topo alinha pela ESQUERDA e **sangra 35px pra fora do card**;
  tab de baixo alinha pela DIREITA e sangra 37px. Tab fica `+26px` abaixo do topo do card
  (sobrepõe a borda do card, zIndex acima).
- **Texto dos cards**: centralizado (cx 540 = centro do canvas e do card), vertical centrado
  na área ABAIXO da tab. Tamanhos medidos:
  - Bloco em **bold itálico** (fala do "erro" / frase de reforço): **fontSize 54**, lh ~1.25
  - Bloco **regular** (a frase entre aspas / o texto principal): **fontSize 58**, lh ~1.25
  - Lista com ✅: fontSize 54 regular, lineHeight 1.23 (gap 66px), emoji verde `#7CB342` 38px
- **Aspas tipográficas “ ”** quando é fala/exemplo.

## 3) `TrocaFecho` (slide 8)
- Card soft ÚNICO `112,158 → 967,1192` = `L10.4% T11.7% W79.3% H76.6%`,
  raio `110px 0 110px 110px`, borda branca 2px. **Sem tab.**
- Texto **esquerda** `x≈304` (L28.1%), **fontSize 73**, lineHeight ~1.40,
  3 parágrafos separados por gap extra (~70px). Parágrafo do meio em **bold**
  (no modelo: "É estratégia.").

## 4) `TrocaCta` (slide 9)
- Fundo manga + **watermark DOMa GIGANTE** tom-sobre-tom `#F3B530`
  (logo VERTICAL empilhada via CSS mask, `top ~20%`, `width ~127%`, centrada, sangra a base).
- **3 blocos** ícone-soft + texto, texto começa em `x≈281` (L26%), **fontSize 67**, lh ~1.38.
  Primeira palavra de cada bloco em **bold** ("Salve", "Compartilhe", "E conta pra gente:").
- **Ícones soft** (`#F8DD6B`), à esquerda, tamanho ~86px:
  | Ícone | px | forma |
  |---|---|---|
  | bookmark (salvar) | `181,319 → 248,404` | marcador com "V" invertido na base |
  | seta ↓ (compartilhar) | `163,506 → 265,591` | triângulo apontando pra baixo |
  | balão de fala | `173,770 → 256,853` | círculo com rabinho inf-esq |
- Blocos: topo do texto em `y338`, `y521`, `y796`.
- **Sem logo** no rodapé (a watermark faz o papel de marca).

---

## Regras da categoria
- ❌ NÃO usar a seta oficial `SetaDoma` aqui — esta categoria não tem flecha direcional.
- ❌ NÃO escrever a marca como texto. Logo da capa = `LogoDoma wordmark`; watermark do CTA = CSS mask do logo oficial.
- Grafite desta categoria é `#212121` (medido), diferente do `#1F1F1F` de outras fichas.
- Quantidade de miolos é livre (modelo tem 6). Capa + N miolos + fecho + CTA.
- Foto da capa = **loja real do segmento** (visão do dono), nunca stock genérico de pessoa sorrindo.

## Limites pra criação nova (§19)
| Bloco | fs | Máx chars/linha | Máx linhas | Risco |
|---|---|---|---|---|
| Capa título | 82 bold/regular | ~19 | 3 | 4ª linha invade a foto |
| Capa badge | 34 | ~18 | 2 | badge tem largura fixa |
| Miolo card (cada) | 54–58 | ~30 | 6 | card 934×561 com padding-top 110 (tab) — 7+ linhas transborda |
| Tab | 38 bold | ~13 | 1 | largura da tab acompanha o texto |
| Fecho | 73 | ~16 | 8 | card 856×1035 |
| CTA bloco | 67 | ~17 | 3 por bloco | 3 blocos fixos |
