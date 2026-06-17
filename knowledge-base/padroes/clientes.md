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
