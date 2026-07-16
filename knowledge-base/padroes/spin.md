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
- **Título fs 60 lh1.12** (medido: cap 42-46, passo 66-70) — máx ~13 chars/linha.
- **Texto fs 40 lh1.3 CENTRADO verticalmente** no bloco (medido; nunca colado no topo) — máx ~18 chars/linha.
- **Foto full-bleed** top **40% → 87.1%** (medido; não fica sob os blocos).
- **Rodapé em 2 PEÇAS (medido)**: faixa manga x 0→**82.4%** (arredondada SÓ no canto sup-dir, raio 60) com "Arrasta pro lado." + **bloco BRANCO SEPARADO** x 82.5%→100% × 87%→100% (raios 80 em TL/TR/BR, canto inf-esq RETO) com seta preta ~68px centrada. NUNCA círculo flutuante.
- Props: `titulo`, `texto`, `foto`, `story?`.

### 2) `SpinMiolo` (slides 2-5)
- **Card central** `L13.6% W72.8%` (cantos inf arredondados) + lista de
  perguntas com "→ " + **faixa inferior** + **botão seta branco**. Texto x-left = card + 100px.
- **⚠️ ALTERNÂNCIA DE MODOS (regra Patrick):** os miolos alternam a cada slide — 2 = modo 1 (fundo soft + card manga), 3 = modo 2 (`cardClaro`), 4 = modo 1, 5 = modo 2… `cardClaro` É o modo 2 da alternância, não só "slide denso".
- **Modo 1 (normal):** fundo soft, card manga **0→80.8%** (medido), fonte 44 lh1.3 — máx ~25 chars/linha.
- **Modo 2 (`cardClaro`):** INVERTE — fundo manga, card soft **0→84.4%**.
  ⚠️ Fonte é **44 IGUAL ao miolo** (medido no 243-5 — NUNCA 37). Conteúdo denso (6+ itens) → `fontSize: 40` (máx ~29 chars/linha).
  Cabeçalho "**E se você pudesse:**" e pergunta-fecho em **bold**.
- Props: `perguntas`, `cardClaro?`, `fontSize?`, `story?`.
- **Story 9:16:** card FLUTUANTE centrado (altura px ≈ do feed → mesma densidade), 4 cantos arredondados, faixa 9%, botão bottom 60px.

### 3) `SpinCta` (slide 6)
- Fundo manga + **card claro grande** `L9.3% T7% W81.4% H86%` (raio 36) +
  **selo grafite** (`selo-grafite.png`, L80.3% T12.7% Ø176) +
  texto corrido (**fontSize 44 lh1.3**, top 21.5%, máx ~28 chars/linha) — assinatura da marca = o **selo/logo** (asset), e se o nome aparecer na frase, escrever "Doma" sem destaque +
  **sub-card destaque manga** `L18.5% T61% W63.1% H16.4%` (raio 22, medido) com o CTA final (**fs 44**, 3 linhas).
- Texto ideal = **7 linhas + 2 gaps** (termina ~59%, cola no sub-card 61% como o modelo). Texto curto = buraco feio.
- Props: `texto`, `destaque`, `fontSize?`, `story?`.

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
