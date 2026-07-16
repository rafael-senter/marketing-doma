# Padrão de Post — "Produtividade" (Doma)

> 🟡 **270: 89.4% · 277: 91% feitos · 254 PENDENTE (logo SENAI).**
> As 3 variantes têm layouts DIFERENTES (categoria de estilo livre). Componentes em
> `../../templates/components/produtividade/`.

Canvas 1080×1350. Medido com `layout-mapper` + numpy. Foto de teste = modelo (em produção, foto real do Patrick → some o efeito de logo/selo duplicados).

## POST 270 — `Produtividade270.tsx`
- Foto full-bleed (card arredondado) + título "O maior **custo** da sua fábrica" (topo, trecho bold) + **card preto** sobre a foto "pode ser o **tempo parado.**" + logo DOMa rodapé + watermark.

## POST 277 — `Produtividade277.tsx`
- Foto full-bleed + **logo DOMa branco** (sup-esq) + **selo "14 anos"** (`selo-14anos-4.png`, sup-dir) + **card SOFT amarelo** (L32% T24.5% W61% H39%) com pergunta (trecho central em **bold**) + **faixa preta pill "LEIA A LEGENDA ↓"**.

## POST 254 — PENDENTE
- Foto + selo "18%" + texto branco + **faixa de parceria com logo SENAI** + watermark número "18" gigante.
- **Bloqueado:** precisa do **logo SENAI** oficial (ou extrair do modelo via rembg).

## Nota geral
- Em testes com foto-modelo, logo/selo recriados aparecem DUPLICADOS (a foto já os tem). Em produção, foto LIMPA resolve.

## Limites pra criação nova (§19 — 2026-07-16)
- 3 layouts distintos (270 foto-card fs58 lh1.12 ~19 chars/linha · 277 · 254 c/ operário nanobanana) — escolher o layout do modelo mais próximo e MEDIR o card dele.
- fs 58: máx ~19 chars/linha; título maior → quebrar, nunca reduzir.
- **Story: SEM prop `story`** — implementar ao usar.

## Peças novas — usar `ProdutividadeFotoCard.tsx` (paramétrico, 2026-07-16)
- Props: `titulo` (topo, fs **78** lh1.13 — RE-MEDIDO no POST 270: o 270 hardcoded usava 58, fonte menor que o modelo), `fecho` (sub-card GRAFITE no canto inf-dir da foto, fs 60 lh1.12, raio sup-esq 28), `foto`, `selo14` (selo-14anos-4.png sup-dir), `story`.
- Sub-card grafite medido: W 69.5% × H 26.1% da foto, canto inferior-direito.
- Limites: título ~15 chars/linha ×3 linhas (3 linhas → foto desce pra T30%, já tratado no componente); fecho ~16 chars ×2 linhas.
- Story ✓ implementado (título T8%, foto 22→82%, logo 93%).
- Peça de referência: POST prejuizo-industria (foto `_prod-industria-foto`).

### Correções Patrick 2026-07-16 (POST prejuizo-industria)
- **Watermark de fundo = "DOMa" VERTICAL GIGANTE** (asset logotipo-vertical-branco 1681×1328 via mask), cor **#F2B32E** (medida no 270 — NÃO usar #F2BD3C imperceptível). Geometria: top 0%, left -22%, width 145% (logo estoura o canvas; "O" topo-dir, "M" esq).
- **Foto: canto SUPERIOR-ESQUERDO RETO** — borderRadius '0 28px 28px 28px'.
- **Bold 700** (global via TextoRico — live-rule bold-700-global).
