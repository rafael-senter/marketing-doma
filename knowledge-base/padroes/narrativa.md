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


---

## Revisão v3 (2026-07-21) — categoria FECHADA

### POST 265 (card sobre foto)
O card já estava certo (`x184-895, y528-821`); o **texto** é que estava errado — centralizado e pequeno.
| | modelo | estava |
|---|---|---|
| fontSize | **72** | 52 |
| alinhamento | **esquerda**, padding-left 73 | centralizado |
| lineHeight | **99px fixo** (tops 590→689) | 1.2 |
| negrito | **700** (traço 10px vs 5px = 2.0×) | default 500 (1.4×) |
| raio do card | **34** | 20 |
| selo | Ø150 **sobre o canto sup-dir do card** (73.1%/35.6%) | Ø104 no canto da peça |

Foto recriada limpa (a antiga era recorte do modelo, com selo e watermark *baked* — RULES §28.1).
Watermark "DOMa" da base agora é desenhada pelo componente (CSS mask, branco 13%).

### POST 272 (moedas 3D)
| | modelo | estava |
|---|---|---|
| título | fs **96**, lineHeight **118px** | 66, lh 1.15 |
| subtítulo | fs **42**, lineHeight **66px** | 41, lh 1.25 |
| negrito | **700** | default 500 |
| moedas | recorte limpo | **halo cinza** (retângulo do PNG aparecia) |

**Re-extração das moedas** (RULES §27): alpha pela distância ao FUNDO + máscara restrita às 3
zonas das moedas + **exclusão do texto grafite dilatada**. Duas armadilhas pagas no caminho:
1. máscara larga demais trouxe o texto *baked* junto → texto duplicado na peça;
2. `MaxFilter` com limiar 175 comeu o cifrão laranja. O texto é grafite (<120) e o cifrão ~200 —
   o limiar tem que separar os dois: **<120 com dilatação 7**.

### STORY — prop `story` nos dois componentes
`Narrativa`: card top 39.1%→**34%**, altura 21.7%→**15.3%** (mesma em px), selo 35.6%→**30.7%**.
`Narrativa272`: moedas em **px fixos** (1080×1350) deslocadas +400; título 17.5%→**22%**;
watermark 4%→**9%**; logo 91.5%→**85%**.

Stills: `padrao-narrativa-265` / `-272` e os pares `-story`.
