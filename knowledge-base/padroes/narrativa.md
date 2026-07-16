# Padrão de Post — "Narrativa" (Doma)

> ✅ **RECRIADO v2 — 265: 95% · 272: 86.6%**. Componentes em `../../templates/components/narrativa/`.
> A categoria tem 2 MODOS bem diferentes (não é "mesmo layout, só texto"):

## Modo CARD (POST 265) — `Narrativa.tsx`
- Foto full-bleed + **card BRANCO** (L17% T39.1% W65.8% H21.7%, raio 24) com pergunta centralizada (fim em **bold**) + **selo DOMa circular** (`selo-cor.png`) no canto sup-dir + watermark.
- Props: `foto`, `principal`.

## Modo TEXTO-LIVRE (POST 272) — `Narrativa272.tsx`
- Fundo manga `#F4BB35` + watermark "DOMa" topo + **elemento 3D (moedas) EXTRAÍDO do modelo via rembg** → PNG transparente full-canvas (`_narr272-fg.png`, já na posição) + título grande (esq, L13% T18%) + subtítulo (dir, L49% T40.5%) + logo rodapé.

## Regra REAPROVEITÁVEL (→ RULES §6) — ELEMENTO 3D via rembg
- Quando o modelo tem um elemento 3D (moedas, objetos), **extrair com rembg** (`from rembg import remove`) gera um PNG transparente FIEL e reutilizável. Salvar full-canvas → usar como `<Img inset:0>` no Remotion (posição preservada). Funcionou perfeitamente nas moedas do 272.
- Alternativa p/ criar 3D do zero (sem modelo): **nanobanana** (Gemini, billing ativo).

## Limites pra criação nova (§19 — calculados do componente, 2026-07-16)
| Bloco | fs | Máx chars/linha | Máx linhas | Risco |
|---|---|---|---|---|
| Frase principal (card sobre foto) | 52 lh1.2 | ~23 | ~4 | card fixo 65.8%×21.7% centrado — frase longa transborda |
- Foto full-bleed cover: conferir que o card não tapa o elemento-chave da foto.
- Objetos 3D (modo 272): nanobanana/extração, nunca CSS pobre (RULES §6).
- **Story: SEM prop `story`** — implementar ao usar.
