# Ficha medida — Post "Mapa do Brasil + 93% DE CLIENTES"

> ✅ **FINALIZADO ~85% (SSIM 0.839) — teto técnico aceito (Patrick).** Cores/rótulos/selo/legenda batendo.
> Rótulos posicionados via skill `layout-mapper` (docling OCR + centróide pixel). Legenda: fontSize 52,
> letterSpacing 0.8. O gap restante (~15%) é 100% a diferença de CONTORNO: `@svg-maps/brazil` (geográfico
> real, com Ilha de Marajó) vs o desenho simplificado do modelo — inatingível sem o vetor original.
> Testado e descartado: simplificar SVG (RDP não fecha a foz), alinhar geometria por bbox (piora — Marajó
> distorce o centro de massa), borda mais grossa (piora). `strokeWidth 1.2`, mapa `w892 h932 left12 top43`.

Fonte: `doma-brand/tipos-de-posts/tipos de posts/Mapa de Clientes/MODELO - mapa de clientes.jpg`
(cópia do original `instagram-sigadoma/images/sigadoma_DSdIG_FkuI4_2.jpg`)
Método: medição por pixel (PIL/numpy), amostragem direta. Nenhuma interpretação visual de cor.

> ✅ **REVISADO na v2 (~95-96%)** — `remotion-doma/src/v2/MapaClientes.tsx`. Correções da revisão (cada uma foi medida):
> - **MAPA estava pequeno**: SVG renderizava ~816×851 (o `meet` encolhia). Medido no modelo o mapa é **892×932px** (bbox canvas x[77,969] y[108,1040]). Fix: `width=892 height=932 left=12 top=43` dentro do card. Centro bate (cx≈523, cy≈583).
> - **DF é CINZA**, não amarelo (quadradinho em Goiás, #C8D5CB medido). Removido de PRESENTES → **16 estados amarelos** (a legenda diz "17 estados" mas só 16 são pintados — texto fixo do post, reproduzido fiel).
> - **Rótulos = posição MEDIDA** de cada um (centro do texto no modelo → viewBox via `vx=(px-77)/1.4552, vy=(py-109)/1.4552`). PE/AL/ES/RJ ficam **À DIREITA, FORA do estado** (litoral estreito) — exatamente como no modelo. Tamanho uniforme (cap ~10px, fontSize 11 no viewBox). NÃO seguir "sempre sobre o estado" aqui — o modelo desloca os 4 pequenos.
> - **Fonte é mais larga que altura**: mesma cap-height, ~7% mais larga → resolver com **letterSpacing** (não aumentar fontSize, senão estica a altura). Legenda: fontSize 47, letterSpacing 1.8, lineHeight 1.36 (cap 33, larg 871, gap topos 74). Selo: letterSpacing 1–1.5 (larg 348).
> - **Selo idêntico** (borda 498×109, texto 348px ✓). Subtítulo fontSize 15 (era 21).
> - Cinza dos ausentes = **#D3D3D3** (medido). Amarelo presente #F4BC34 (≈ fundo).

---

## 1. Dimensão

- **1080 × 1350 px** (formato feed vertical 4:5), modo RGB.

## 2. Fundo

- Cor sólida **#F3BA35** (amarelo Doma). Amostrado nos 4 cantos + 4 bordas — todos idênticos.
- **Sem gradiente.** Fundo chapado.

## 3. Card branco (contém o mapa)

- **bbox:** x 65 → 1014, y 65 → 1079 → **(x=65, y=65, larg≈949, alt≈1014)**.
- Margem amarela: ~65px topo, ~65px laterais; embaixo o card vai até y≈1079 (deixando ~270px de zona amarela para a legenda).
- **Cor do card:** #FFFFFF (interior puro; bordas com leve antialias ~#FBFBFB).
- **Cantos:** retos / quadrados (sem raio perceptível — a primeira coluna branca permanece em x≈65 já a partir de y=66).

### Mapa do Brasil (dentro do card)
- **bbox do conteúdo do mapa (medido):** x **77 → 969**, y **108 → 1040** → **larg≈892, alt≈932**. Centro cx≈523, cy≈583. Ocupa quase toda a área do card (vai mais baixo do que se media antes).
- **Estados YELLOW (pintados / "presentes"):** #F4BC34 (≈ igual ao fundo da marca). **16 estados** (PA, MT, MS, GO, BA, PI, CE, PE, AL, MG, ES, SP, RJ, PR, SC, RS).
- **Estados GRAY (não pintados):** **#D3D3D3** (medido). Incluem TO, MA, SE, RN, PB e todo o noroeste/norte (AC, AM, AP, RO, RR).
- **DF (Distrito Federal):** quadradinho **CINZA** (#C8D5CB, ≈ #D3D3D3) recortado dentro de Goiás (~x648, y585) — **NÃO é amarelo** (não é cliente em Brasília).
- **Bordas dos estados:** linha branca fina entre as áreas.

#### Estados YELLOW (com rótulo visível na arte) — 17 estados declarados na legenda
- Pará, Mato Grosso, Mato Grosso do Sul, Goiás, Bahia, Piauí, Ceará, Pernambuco, Alagoas, Minas Gerais, Espírito Santo, Rio de Janeiro, São Paulo, Paraná, Santa Catarina, Rio Grande do Sul (+ DF como quadrado em Goiás).
- (Rótulos amarelos visíveis: "Pará", "Mato Grosso", "Mato Grosso do Sul", "Goiás", "Bahia", "Piauí", "Ceará", "Pernambuco", "Alagoas", "Minas Gerais", "Espírito Santo", "Rio de Janeiro", "São Paulo", "Paraná", "Santa Catarina", "Rio Grande do Sul".)

#### Estados GRAY (não pintados, sem rótulo)
- Norte/NW cinza: Amazonas, Roraima, Acre, Rondônia, Amapá; e no Nordeste/Norte: Maranhão, Tocantins, Sergipe, Rio Grande do Norte, Paraíba (regiões cinza sem rótulo).
- Rótulos dos rótulos das áreas cinza: **nenhum nome escrito** sobre os estados cinza.

> **O mapa é ILUSTRAÇÃO COMPLEXA** (geometria vetorial dos contornos do Brasil + rótulos posicionados). Não dá pra reproduzir em código de layout — precisa ser **gerado como imagem/SVG** (mapa choropleth do Brasil com 2 cores: presente=#F4BC34, ausente=#D0D0D0, bordas brancas, rótulos pretos nos amarelos).

#### Cores dos rótulos de estado
- Texto dos nomes de estado: cinza-escuro/preto (~#1F1F1F), sobre os estados amarelos.

## 4. Selo "+ 93% DE CLIENTES"

- **Posição:** canto inferior-esquerdo, DENTRO do card branco.
- **bbox:** x ≈ 68 → 544, y ≈ 960 → 1057 → **larg≈476, alt≈97**.
- **Formato:** retângulo arredondado (pill com cantos suaves). **Raio ≈ 18-20px**.
- **Fundo do selo:** branco (#FFFFFF) — mesmo do card.
- **Borda:** stroke fino **dourado/amarelo** (≈ #F0B830 / tom da marca), ~2px, antialias.
- **Texto linha 1 (título):** `+  93% DE CLIENTES`
  - cor ≈ **#1F1F1F** (quase preto).
  - **Pesos diferentes:** o `+` é mais leve/fino; `93%` e `DE CLIENTES` em **bold/black** (Kanit-like, caixa alta). Há espaço extra entre o `+` e o `93%`.
  - rows de glifo y≈982 → 1006 (cap height ~24px).
- **Texto linha 2 (subtítulo):** `Satisfeitos com o suporte e produto`
  - cor ≈ **#808080** (cinza médio).
  - peso regular, caixa baixa.
  - rows de glifo y≈1021 → 1045.

## 5. Legenda (texto abaixo do card, na zona amarela)

- **Texto exato (2 linhas):**
  - Linha 1: `Estamos presentes em 17 estados…`
  - Linha 2: `e crescendo cada vez mais!`
- **Cor:** preto (~#100000 / #1A1A1A).
- **Peso:** semibold/bold, fonte Kanit-like (mesma família display do título).
- **Alinhamento:** **centralizado** (linha 1 center x≈541, linha 2 center x≈538; centro da imagem = 540).
- **Posição vertical:** linha 1 glifos y≈1117 → 1185; linha 2 y≈1191 → 1227.
- Linha 1 extent x 106 → 977 (larg≈871); linha 2 x 207 → 870 (larg≈663).

## 6. Logo / marca d'água

- **Nenhum logo DOMa** na peça.
- **Nenhuma marca d'água.** Áreas brancas do card são #FFFFFF puro (std 0), sem texto faint. Faixa superior-direita do card = 0 pixels não-brancos.

## 7. Outros elementos

- Sem título no topo, sem ícones extras além do mapa e do selo.

## 8. Camadas (fundo → frente)

1. Fundo amarelo chapado #F3BA35 (1080×1350).
2. Card branco #FFFFFF (x65,y65 → x1014,y1079), cantos retos.
3. Mapa do Brasil ilustrado (choropleth amarelo/cinza + rótulos pretos), dentro do card.
4. Selo pill branco com borda dourada + textos (sobre o canto inferior-esquerdo do card / parte sobre o mapa).
5. Legenda preta centralizada de 2 linhas, na zona amarela abaixo do card.

---

## Plano de recriação — o que é código vs imagem

| Elemento | Como recriar |
|----------|--------------|
| Fundo amarelo #F3BA35 | **Código** (fill sólido). |
| Card branco 949×1014, cantos retos | **Código** (div/retângulo). |
| Selo pill (borda dourada, 2 textos, pesos diferentes) | **Código** (rounded-rect + texto Kanit). |
| Legenda 2 linhas centralizada preta | **Código** (texto Kanit bold). |
| **Mapa do Brasil (estados amarelo/cinza + rótulos)** | **SVG vetorial real** — RESOLVIDO com `@svg-maps/brazil` (27 paths por sigla, viewBox 613×639). Pintado choropleth em código: presente=#F4BC34, ausente=#D0D0D0, borda branca, rótulo #1F1F1F. Paths em `remotion-doma/src/padroes/mapaBrasil.ts`. |

## STATUS DA RECRIAÇÃO — ~93% (validado por medição visual)
Componente: `remotion-doma/src/padroes/MapaClientes.tsx`. Render: `./render-still.sh padrao-mapa-clientes`.
- ✅ Mapa choropleth com os 17 estados certos (PA,MT,MS,GO,DF,BA,PI,CE,PE,AL,MG,ES,SP,RJ,PR,SC,RS), bordas brancas.
- ✅ Card branco, selo pill "+93% DE CLIENTES", legenda 2 linhas centralizada.
- ✅ Centroides REAIS dos rótulos (calculados via svgpathtools — bbox de cada path).
- 🔧 Ajuste fino pendente: rótulos de estados pequenos (PE/AL/ES/RJ) ficam apertados; no modelo têm rótulo deslocado p/ fora à direita. Mapa pode reduzir ~3% e centralizar melhor.

### Paleta exata
- Fundo / amarelo presente: **#F3BA35** (fundo) / **#F4BC34** (estados) — praticamente o mesmo amarelo.
- Card / selo fundo: **#FFFFFF**
- Estados ausentes: **#D0D0D0**
- Borda do selo: **#F0B830** (dourado)
- Título selo + rótulos mapa + legenda: **#1F1F1F** (quase preto)
- Subtítulo selo: **#808080** (cinza médio)
