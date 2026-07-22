# Ficha medida — Padrão "Cliente Novo" (LAYOUT CLIENTE NOVO)

> ✅ **RECRIADO ~90% (SSIM 0.89) — visualmente ~95%+.** `../../templates/components/clientes/Clientes.tsx`.
> 2 variantes validadas (Flairar/Teixeira de Freitas-BA · Essence Glamour/Jaraguá do Sul-SC).
> Medido via skill `layout-mapper` (docling OCR p/ posições de texto) + numpy (blocos/cores).

Modelos: `doma-brand/tipos-de-posts/tipos de posts/Clientes/LAYOUT CLIENTE NOVO - FEED.png` (+ variante `(1)`).
Canvas 1080×1350. Render por `render-still.sh`.

## Template FIXO (o que se repete)
- **Fundo:** Amarelo Manga `#F4BB35` (chapado).
- **Watermark "DOMa" topo:** OUTLINE (contorno) tom-sobre-tom `#F6C85D`, sangrando topo+laterais
  (x 0–100%, topo das letras y~37). Técnica = 2 CSS masks (ver RULES §18).
- **Card foto:** x **6.3%–93.6%**, y **10.1%–65.2%** (w 87.3%, h 55.1%), **raio ~40**, sombra suave.
  A foto do cliente preenche (objectFit cover).
- **Pílula de localização:** CENTRALIZADA (x 22.7%–77.3%), y **60.4%–66.9%**, fundo grafite `#212121`,
  raio pill (999), **pin branco** (gota) + cidade em branco (fontSize ~34, peso 600). Sobre a base da foto.
- **Texto principal:** alinhado à ESQUERDA (left **18.1%**), y **70.7%–84.8%**, fontSize **62**, lineHeight 1.18,
  cor grafite. 3 linhas: `A **{nome}**` / `agora faz parte do time` / `de clientes da {LOGO DOMa}`.
  - "A " regular (400) + **{nome} bold (800)**; resto regular; **"DOMa" = LogoDoma oficial** inline (tamanho ~46).
- **Rodapé:** `DOMINE A GESTÃO DO SEU NEGÓCIO` — centralizado, y **94.1%**, fontSize 30, peso 700, grafite.

## O que VARIA
- **foto** do cliente · **nome** do cliente · **cidade/UF** (pílula). Só isso. Props: `{foto, nome, cidade}`.

## Como reproduzir um novo
1. `Clientes` recebe `{foto, nome, cidade}`. Foto = `staticFile('...')` (recortar do feed do cliente, ratio ~943×743 ≈ 1.27:1).
2. Registrar `<Still>` no Root com as props. Render por `render-still.sh`.
3. Nome longo (ex.: "Essence Glamour") cabe na linha 1 — validado.

## Paleta
| Elemento | Cor |
|----------|-----|
| Fundo | `#F4BB35` |
| Watermark outline | `#F6C85D` (tom-sobre-tom) |
| Pílula / texto / logo / rodapé | `#212121` |
| Texto da pílula / pin interno | `#FFFFFF` |

## Limites pra criação nova (§19 — calculados do componente, 2026-07-16)
| Bloco | fs | Máx chars | Risco |
|---|---|---|---|
| Nome do cliente (bold, linha 1) | 62-64 | ~24 | nome longo estoura a largura — reduzir NUNCA; quebrar em 2 linhas e auditar colisão com rodapé |
| Badge cidade | 34 | ~28 | pílula grafite cresce com o texto |
| Foto | — | — | 87.3%×55.1% objectFit cover — foto vertical corta topo/base; conferir enquadramento |
- Estrutura de texto fixa: "{nome} agora faz parte do time [logo]" — logo = asset, nunca digitado.

## Revisão v3 (2026-07-22) — story adicionado + posições em PX

> Comparação com o modelo: recriação já estava FIEL (watermark medido = `#F5C758`, npx 7672 vs 8054;
> layout, foto, pílula, texto e rodapé batendo). Patrick escolheu **só adicionar story + corrigir bugs**.

**Conversão % → PX (obrigatória p/ story).** Antes o layout era em `%`; no story (1080×1920) o `%`
esticaria a foto/pílula. Agora tudo em px, com um `photoTop` que muda por formato:
- `photoTop`: feed **136** · story **470**
- foto **68 / photoTop / 943×744** raio 40 (MESMO px nos 2 formatos)
- watermark `top = photoTop − 106` · pílula `top = photoTop + 679` h88 · texto `top = photoTop + 806` fs64
- rodapé fixo por formato: feed **1269** · story **1770**
- watermark cor corrigida `#F6C85D → #F5C758` (medido no núcleo do outline do modelo).

**⚠️ O "artefato" à esquerda da pílula NÃO é bug.** É o canto inf-esq da PRÓPRIA foto (raio 40)
mostrando conteúdo escuro do ambiente (produto/cadeira). Varia por foto; some com foto real bem
enquadrada. Não mexer no componente por causa disso — é enquadramento da foto.

Stills: `padrao-clientes` · `padrao-clientes-2` · `padrao-clientes-story` · `padrao-clientes-2-story`.
