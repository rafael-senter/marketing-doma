# Padrão de Post — "Dicas Carrossel" (Doma)

> ✅ **POST 246 (margem de lucro, 9 slides) RECRIADO.** 133 (ótica) e 193 (Trento) usam o
> MESMO sistema (só muda texto + ícones da capa). Componente: `../../templates/components/dicas/Dicas.tsx`.
> Fidelidade 246: capa 89% · miolos 86-91% · CTA 82% (SSIM puxado por texto; visual fiel).

Carrossel numerado de "erros comuns / dicas". Canvas 1080×1350. 3 templates:

## 1) `DicasCapa` (slide 1)
- Fundo **manga** `#F4BB35` + **watermark "DOMa" gigante** no topo (CSS mask, cor `#F5C24A` tom-sobre-tom, top 4%, width 100%).
- **Ícones line-art** (grandes, pretos) — **EXTRAÍDOS do modelo** via recorte+transparência
  (numpy: pixels escuros → alpha; resto transparente). Salvos em `public/oficial/_dicas{POST}-icones.png`.
  ⚠️ Recortar SÓ os ícones (limitar x até ~70% p/ NÃO capturar o subtítulo do modelo — senão duplica).
- **Título** com highlight soft (esq, fontSize 78 bold, cada linha numa caixa soft).
- **Subtítulo** (dir-inf, array de linhas; `**` no início = bold). NÃO usar TextoRico aqui
  (o `\n` + `pre-wrap` + textAlign causou duplicação — usar `<span>` por linha em flex column).
- **Faixa inferior soft** (height 8.8%) "ARRASTA PRO LADO →".
- Props: `titulo` (string `\n`), `subtitulo` (string[]), `icones` (path PNG).

## 2) `DicasMiolo` (slides 2-8, numerados)
- Fundo manga + **card soft topo** (full-width, top→36.5%, cantos inf arred.) com
  **número grande** (fontSize 200 bold grafite, letterSpacing -6) + **título bold** à direita.
- **Card branco** `L11.7% T36.6% W76.6% H52.5%` (raio 30) com o corpo (fontSize 40, lista com "– ",
  trechos em **bold** via TextoRico).
- Props: `numero` ('01'...), `titulo` (string `\n`), `corpo` (string com markup).

## 3) `DicasCta` (slide final)
- Fundo manga + **card claro grande** (L9.3% T7% W81.4% H79%) + **selo grafite** (sup-dir) +
  texto corrido (fontSize 45, trecho **bold**) + **logo DOMa** no rodapé (centralizado).
- Props: `texto`.

## Notas
- No modelo o logo parece "DOM.a" (a perna do M lembra um ponto), mas a grafia correta é **DOMa** — "DOM.a" nunca existe. Usar o asset oficial `LogoDoma`/`selo-grafite.png`, que já tem a forma certa.
- Slide 8 do 246 é cópia idêntica do 7 (duplicata no modelo) — recriado igual.
- Aspas: modelo usa curvas (" "); recriação atual usa retas (detalhe tipográfico menor).

## Reproduzir 133 / 193
1. Extrair ícones da capa de cada (recorte numpy, transparência, limitar x).
2. `DicasCapa` (título/subtítulo/ícones) + N× `DicasMiolo` (numero/titulo/corpo) + `DicasCta`.
