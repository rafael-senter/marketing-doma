# Padrão de Post — "SPIN" (Doma)

> ✅ **RECRIADO v2 — POST 243 (6 slides) + POST 251 (6 slides) = 12 slides.**
> Fidelidade: capas ~91-92% · miolos ~92% · CTA ~86% (selo+texto). Componente único:
> `../../templates/components/spin/Spin.tsx` (3 sub-componentes parametrizados).

Carrossel de perguntas no método SPIN. Canvas 1080×1350. Os DOIS posts (243/251) usam
EXATAMENTE o mesmo sistema de templates — só muda o conteúdo (texto) e a foto da capa.

## Cores medidas (numpy)
- **manga** `#F4BB35` (= cor principal/foto)
- **soft** `#F8DD6B` (amarelo claro)
- **grafite** `#1F1F1F` (texto) · **preto** `#212121` (seta) · **branco** `#FFFFFF`

## 3 templates de slide

### 1) `SpinCapa` (slide 1)
- Split no topo (40% da altura), 50/50: **bloco título manga** (esq, cantos inf-dir arred.) +
  **bloco texto soft** (dir, cantos inf-esq arred.).
- **Foto full-bleed** na faixa central (top 34% → height 54%).
- **Faixa inferior manga** (height 13%, canto sup-dir arred.) com "Arrasta pro lado." +
  **botão circular branco** (Ø150, canto inf-dir) com seta reta →.
- Props: `titulo`, `texto`, `foto`.

### 2) `SpinMiolo` (slides 2-5)
- **Card central** `L13.6% W72.8%` do topo até 82% (cantos inf arredondados) + lista de
  perguntas com "→ " + **faixa inferior** + **botão seta branco**.
- **Modo normal (2-4):** fundo soft, card manga, fonte 44.
- **Modo `cardClaro` (slide 5, mais itens):** INVERTE — fundo manga, card soft, fonte 37.
  Cabeçalho "**E se você pudesse:**" e pergunta-fecho em **bold**.
- Props: `perguntas`, `cardClaro?`, `fontSize?`.

### 3) `SpinCta` (slide 6)
- Fundo manga + **card claro grande** `L9.3% T7% W81.4% H86%` (raio 36) +
  **selo grafite** (`selo-grafite.png`, L80.3% T12.7% Ø176) +
  texto corrido (fontSize 41) — assinatura da marca = o **selo/logo** (asset), e se o nome aparecer na frase, escrever "Doma" sem destaque +
  **sub-card destaque manga** `L18.5% T62% W63.1% H15.3%` (raio 22) com o CTA final.
- Props: `texto`, `destaque`.

## Regras aplicadas
- Marca: assinatura = **LOGO/selo** (asset oficial), NUNCA o nome digitado. No texto corrido, citar como **"Doma"** (sem destaque/bold), igual ao modelo. NUNCA digitar "DOMa"/"DOM.a". Ver `doma-brand/CATALOGO-logos.md` + regra de marca no `CLAUDE.md`.
- Seta reta `→` (SVG strokeWidth 5.5) — distinta da seta diagonal ↘ do Inimigo em Comum.
- Foto de teste = recorte do próprio modelo (`_teste-spin-foto.jpg` / `_teste-spin251-foto.jpg`);
  em produção, foto real do nicho.

## Como reproduzir um novo carrossel SPIN
1. Capa: `SpinCapa` com título (trechos-chave em **bold**), texto-provocação e foto.
2. Miolos: `SpinMiolo` por slide, cada bloco de pergunta separado por `\n\n`, prefixo `→ `.
3. Pré-CTA: `SpinMiolo cardClaro` (lista de soluções + pergunta-fecho bold).
4. CTA: `SpinCta` (texto + destaque), selo automático.
