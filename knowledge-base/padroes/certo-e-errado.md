# Padrão de Post — "Certo e Errado" (Doma)

> ✅ **RECRIADO na v2 (~96-97%)** — `../../templates/components/certo-e-errado/CertoErrado.tsx`. Refeito com as técnicas
> da Frase em Pílulas. Validação: cards ±1px, badges (496/928, cy434) exatos, logo cx50%, wm contraste 2.72 vs 2.67.
>
> **Detalhes-chave da recriação (cada um foi um erro corrigido):**
> - **Cores (ajuste final do Patrick — INVERTIDAS vs medição):** FUNDO = `#F3BA35` (manga mais escura) · WATERMARK = `#F6C655` (manga mais clara). O Patrick preferiu as letras claras sobre fundo mais escuro.
> - **Watermark = logo VERTICAL** (`oficial/logotipo-vertical-branco.png`) — empilhada "DO" em cima / "Ma" ao centro. Via CSS mask + cor `#F6C655`. `width:108%` (sangra as bordas laterais), `aspectRatio:1681/1328`, `top:6%` — "DO" toca topo/laterais, "Ma" ao centro-baixo. NÃO usar a logo horizontal (mostra "DOMa" deitado).
> - **Ícones X / ✓ = SVG desenhado** (não caractere unicode): traços GROSSOS (strokeWidth 9) com `strokeLinecap:round` + **sombra projetada interna** (clipPath escuro p/ baixo-direita) + `boxShadow` no círculo. Cores `#EF4639` (X) / `#32BA7C` (✓).
> - **Raio dos cards = 45px** (medido: recuo ~48px no canto). Cantos BEM redondos, não 30.
> - **Badge cy434** = topo do card (`top:0` no card). cx 496/928 (`left:323` interno).
> - Render por `render-still.sh` (sem franja). TT Lakes; corpo regular + keyword bold.

Análise pixel-perfect de 2 modelos da MESMA categoria: `POST 247.png` e `POST 256.png`.
Meta: recriação 98-100% em React/Remotion. Todas as medidas em px sobre canvas 1080×1350.

Modelos analisados (pasta `doma-brand/tipos-de-posts/tipos de posts/Certo e Errado/`):
- `POST 247.png` — 1080×1350, sRGB 8-bit
- `POST 256.png` — 1080×1350, sRGB 8-bit

---

## REGRA DO PADRÃO (o template FIXO entre os 2)

Tudo abaixo é **idêntico** nos dois posts. Só o texto muda.

### Canvas
- Dimensão: **1080 × 1350** (proporção 4:5, feed vertical Instagram).
- Fundo base: **Amarelo Manga `#F4BB35`** (cor de marca), com uma leve lavagem mais clara `#F6C655` no topo.

### Marca d'água de fundo
- É a **palavra/logo gigante "DOMA"** em `#F6C655` (manga levemente mais claro que a base — contraste baixíssimo, ~tom sobre tom).
- Ocupa os ~75% superiores do canvas (de y=0 até ~y=1015), letras enormes sangrando por todas as bordas (cortadas pelo enquadramento). Vê-se "DO" na faixa superior e a continuação "MA" abaixo.
- Posição e escala **idênticas** nos dois posts.

### Layout-regra: DOIS CARDS lado a lado
A categoria "Certo e Errado" é construída como **2 blocos paralelos**:
- **Card ESQUERDO = ERRADO** (badge X vermelho)
- **Card DIREITO = CERTO** (badge check verde)

Ambos os cards:
- Cor de preenchimento: **Amarelo Soft `#F8DD6B`**.
- Tamanho sólido: **largura ≈ 370 px, altura ≈ 512 px** (y de ~391 a ~903).
- Cantos arredondados: **raio ≈ 28-32 px**.
- Sombra/glow suave amarelada ao redor (halo de ~10-15 px, mesma família de cor, baixa opacidade).
- **Card esquerdo:** x ≈ **140 → 510**.
- **Card direito:** x ≈ **568 → 940**.
- **Gap entre os cards:** ≈ **58 px**.
- Topo de ambos alinhado em **y ≈ 391**; base em **y ≈ 903**.

### Badges (ícones X / check) — sobrepostos ao canto superior-direito de cada card
- Formato: **círculo cheio, diâmetro ≈ 86 px**.
- Centro vertical: **cy ≈ 434** (ambos).
- Posicionamento: **centrado sobre o canto superior-direito do respectivo card** (metade dentro, metade para fora — "estourando" a borda do card).
- **Badge ERRADO:** círculo **vermelho `#E2382F`**, com **"X" branco** centralizado. Centro cx ≈ 496 (canto sup-dir do card esquerdo).
- **Badge CERTO:** círculo **verde `#059D6C`**, com **"✓" (check) branco** centralizado. Centro cx ≈ 928 (canto sup-dir do card direito).

### Conteúdo de cada card (estrutura interna fixa)
1. **Rótulo (kicker) no topo:** texto **"ERRADO"** (card esq.) / **"CERTO"** (card dir.).
   - Tudo MAIÚSCULO, peso bold, tamanho pequeno (cap-height ≈ 19 px → ~22-24 px de font).
   - Cor: **Grafite `#212121`**.
   - Posição: y ≈ 469 (topo), x ≈ 178 (padding interno esquerdo ≈ 38 px a partir da borda do card).
   - Alinhado à esquerda.
2. **Texto-corpo:** a frase do erro / da resposta certa.
   - Cor: **Grafite `#212121`**.
   - Fonte: TT Lakes, peso regular como base, cap-height ≈ 30 px (font ≈ 38-40 px), **line-height ≈ 56 px**.
   - Alinhado à esquerda, **bloco verticalmente centralizado** no corpo do card (centro do bloco ≈ y 688; o título fica fixo no topo e o corpo centraliza no espaço restante).
   - Padding interno horizontal ≈ 38 px (igual ao do kicker).
   - **Destaque por NEGRITO:** a(s) palavra(s)-chave da frase ficam em **bold** (peso visivelmente maior — confirmado por densidade de pixel ~50 vs ~28 nas linhas regulares). Sem sublinhado, sem highlight de fundo, sem mudança de cor — só o peso.

### Logo (assinatura)
- **"DOMa"** oficial em **Grafite `#212121`**, centralizado horizontalmente (cx ≈ 540).
- Posição: parte inferior, y ≈ 1107 → 1144 (altura ≈ 37 px, largura ≈ 205 px).
- Forma do logo: "DOM" em maiúsculas + o ponto que é a perna direita do "M" caindo + "a" minúsculo na altura de maiúscula (NÃO escrever "DOM.a").

### O que é FIXO vs o que VARIA
- **FIXO:** canvas, fundo manga, marca d'água "DOMA", os 2 cards soft-yellow (posição/tamanho/raio/sombra), os 2 badges (cor/posição/diâmetro), os rótulos "ERRADO"/"CERTO", cor de texto grafite, logo embaixo, alinhamento esquerdo + centralização vertical do corpo.
- **VARIA:** apenas o **texto-corpo** de cada card e **quais palavras estão em negrito**. O número de linhas muda conforme o texto, mas o bloco continua centralizado verticalmente.

### Paleta resumida
| Elemento | Cor |
|----------|-----|
| Fundo base | `#F4BB35` (Manga) |
| Lavagem topo | `#F6C655` |
| Marca d'água "DOMA" | `#F6C655` |
| Cards | `#F8DD6B` (Soft) |
| Badge ERRADO | `#E2382F` (vermelho) |
| Badge CERTO | `#059D6C` (verde) |
| X / check | Branco `#FFFFFF` |
| Todo o texto + logo | `#212121` (Grafite) |

---

## FICHA — POST 247

**Dimensão:** 1080×1350. Tudo conforme REGRA DO PADRÃO acima. Diferenças = só conteúdo.

**Camadas (fundo → frente):**
1. Fundo manga `#F4BB35` + lavagem `#F6C655` no topo.
2. Marca d'água "DOMA" `#F6C655` (upper ~75%).
3. Card ESQUERDO `#F8DD6B` (x≈140-510, y≈391-903, raio ~30) + sombra suave.
4. Card DIREITO `#F8DD6B` (x≈568-940, y≈391-903, raio ~30) + sombra suave.
5. Badge vermelho `#E2382F` + X branco (cx≈496, cy≈434, Ø86).
6. Badge verde `#059D6C` + check branco (cx≈928, cy≈434, Ø86).
7. Textos grafite `#212121`.
8. Logo "DOMa" grafite (cx≈540, y≈1107-1144).

**Card ERRADO (esquerdo):**
- Kicker: `ERRADO`
- Corpo (4 linhas, alinhado à esq., centralizado vertical, bloco y≈589-786):
  ```
  Cobrar a
  equipe só por
  **volume de**
  **vendas.**
  ```
  - Regular: "Cobrar a equipe só por"
  - **Negrito:** "volume de vendas." (linhas com densidade alta ~48)

**Card CERTO (direito):**
- Kicker: `CERTO`
- Corpo (3 linhas, bloco y≈588-730):
  ```
  Avaliar
  performance
  por **eficiência.**
  ```
  - Regular: "Avaliar performance por"
  - **Negrito:** "eficiência." (última linha, densidade ~70)

---

## FICHA — POST 256

**Dimensão:** 1080×1350. Layout 100% idêntico ao 247 (mesmos cards, badges, marca d'água, logo). Diferença = só o texto. O card CERTO tem mais texto (6 linhas), então o bloco começa mais alto, mas continua centralizado verticalmente.

**Camadas:** idênticas ao POST 247 (mesmas posições de cards, badges, logo, marca d'água).

**Card ERRADO (esquerdo):**
- Kicker: `ERRADO`
- Corpo (3 linhas, bloco y≈619-761, centralizado vertical):
  ```
  Vendemos
  muito, então
  **estamos bem.**
  ```
  - Regular: "Vendemos muito, então"
  - **Negrito:** "estamos bem." (última linha, densidade ~49)

**Card CERTO (direito):**
- Kicker: `CERTO`
- Corpo (6 linhas, bloco y≈544-832, centralizado vertical):
  ```
  Quais
  produtos
  realmente
  **geram lucro**
  **para o meu**
  **negócio?**
  ```
  - Regular: "Quais produtos realmente"
  - **Negrito:** "geram lucro para o meu negócio?" (3 últimas linhas, densidades 55/64/46)

---

## Notas de reprodução (críticas p/ 98-100%)
1. **Cards = `#F8DD6B` exato** (não inventar opacidade sobre o manga — é cor sólida soft).
2. **Badges centrados NO canto sup-dir do card** (metade para fora), Ø86, cy=434. Cores exatas `#E2382F` / `#059D6C`.
3. **Negrito é o único destaque** — só muda o peso, mesma cor grafite, mesmo tamanho. Sem highlight nem sublinhado.
4. **Marca d'água = palavra "DOMA" gigante** em `#F6C655` (tom sobre tom, contraste ~mínimo), sangrando bordas no topo. NÃO é número 26 nem o logo pequeno.
5. **Corpo do card centralizado verticalmente** (não top-aligned); kicker fica fixo no topo (y≈469); line-height ≈56px; padding interno ≈38px.
6. **Logo "DOMa"** (a-minúsculo cap-height, ponto = perna do M), centralizado, grafite, base do canvas.

## Limites pra criação nova (§19 — calculados do componente, 2026-07-16)
| Bloco | fs | Máx chars/linha | Risco |
|---|---|---|---|
| Card certo/errado | 40 lh1.3 | ~15 | cards 35.74%×37.93% FIXOS → máx ~6-7 linhas; modelos usam 3-6. Texto maior = transborda silencioso |
| Badge (CERTO/ERRADO) | 27 bold | — | fixo |
- **Story: SEM prop `story`** — implementar ao usar (padrão SPIN).


---

## Revisão v3 (2026-07-21) — negrito medido + story

**Negrito = `600`.** MEDIDO: POST 256 tem bold 4px vs regular 2px = **ratio 2.0×**; o default 500
dava 1.5×. Com 600 o 256 bate exato (4/2) e o 247 fica +1 (o modelo 247 usa bold um pouco mais
fino que o 256 — 600 é o melhor compromisso entre os dois). RULES §23: peso é por categoria.

**Card em PX.** `height` do card passou de `37.93%` para `CARD_H = 512` px — em `%`, o story
esticaria o card em 42%.

### STORY (1080×1920) — prop `story`
| Elemento | feed | story |
|---|---|---|
| cards | top 392 (29%) | top **660** (mesma altura em px) |
| watermark | top -5% | top **10%** |
| logo rodapé | top 82% | top **74.5%** |

Stills: `padrao-certoerrado-247` / `-256` e os pares `-story`.

### Fica para depois (decisão do Patrick: só negrito + story nesta rodada)
- **Cantos do card**: no modelo o card ERRADO tem o canto inf-esq e o CERTO o inf-dir bem mais
  arredondados que os outros (assinatura de "1 canto diferente"); hoje usamos raio 45 uniforme.
- **Sombra**: o modelo tem sombra suave sob os cards; a nossa é bem mais fraca.
