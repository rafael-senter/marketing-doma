# Padrão de Post — "Produtividade" (Doma)

> 🟡 **270: 89.4% · 277: 91% feitos · 254 PENDENTE (logo SENAI).**
> As 3 variantes têm layouts DIFERENTES (categoria de estilo livre). Componentes em
> `remotion-doma/src/v2/categorias/produtividade/`.

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
