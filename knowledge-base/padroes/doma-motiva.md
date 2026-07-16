# Padrão de Post — "Doma Motiva" (Doma)

> ✅ **RECRIADO v2 — 242: 93.1% · 250: 95.7%** — `../../templates/components/doma-motiva/DomaMotiva.tsx`.
> Modelos: `tipos-de-posts/.../Doma Motiva/POST 242.png` e `POST 250.png`.

Medido com `layout-mapper` + numpy. Canvas 1080×1350.

## Template FIXO (parametrizado por props — as variantes mudam bastante)
- **Foto full-bleed** de fundo (`objectFit:cover`).
- **Card amarelo manga** `#F4BB35` arredondado (raio 28), sombra suave, com:
  - **frase motivacional** em 1-2 parágrafos (grafite `#212121`, regular, **último termo em bold**), fontSize ~33, lineHeight 1.28, padding 40;
  - **selo DOMa oficial** (`oficial/selo-grafite.png`, ~74px) no canto.
- **Watermark "DomaMotiva"** sangrado (branco, opacity ~0.16, fontSize ~88).

## VARIA (props)
| Prop | 242 | 250 |
|------|-----|-----|
| `card` (left/top/w/h) | 10.2% / 17.6% / 46.8% / 32.4% | 45.4% / 26.4% / 46.8% / 20.4% |
| `seloCanto` | sup-dir | inf-dir |
| `watermark` | topo ("DomaMotiva") | base ("#DomaMotiva") |
| `blocos` | "Desafios…**pode crescer.**" + "Uma mente…**enxerga oportunidades.**" | "Crescer dói." + "Ficar **parado custa muito mais.**" |

## Notas
- Fotos de teste = os próprios modelos (`public/oficial/_teste-motiva-*.jpg`). Em produção, foto LIMPA do Patrick → o watermark recriado não duplica (no teste duplica porque a foto-modelo já tem o watermark original).
- Selo: 242 usa selo quadrado/escuro, 250 usa selo circular — ambos cobertos por `selo-grafite.png` (ajustar asset se necessário).

## Limites pra criação nova (§19 — 2026-07-16)
- Card de texto é POSICIONAL POR PEÇA (props left/top/width/height medidos no modelo escolhido) + fontSize prop.
- Máx chars/linha ≈ (card.width × 1080 × 0.86) ÷ (fs × 0.516). Ex.: card 46.8% fs 40 → ~21 chars.
- Frase maior que o card do modelo → escolher OUTRO modelo com card maior (242 vs 250), nunca espremer fonte.
- Watermark: posição `topo`/`base` conforme modelo; selo canto oposto ao card.
- **Story: SEM prop `story`** — implementar ao usar.
