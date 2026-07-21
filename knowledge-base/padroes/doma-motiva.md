# Padrão de Post — "Doma Motiva" (Doma)

> ✅ **RECRIADO v2 — 242: 93.1% · 250: 95.7%** — `../../templates/components/doma-motiva/DomaMotiva.tsx`.
> Modelos: `tipos-de-posts/.../Doma Motiva/POST 242.png` e `POST 250.png`.
> 🆕 **TEMPLATE v3 (Patrick, 2026-07-16)** — watermark gigante, selo em camadas, card proporcional, 3D opcional. Peça de referência: `motiva-controla` + `motiva-controla-story`.

Medido com `layout-mapper` + numpy. Canvas 1080×1350 (feed) / 1080×1920 (story).

## Template FIXO (parametrizado por props)
- **Foto full-bleed** de fundo (`objectFit:cover`), pré-composta no canvas quando há efeito 3D.
- **Card amarelo manga** `#F4BB35` arredondado (raio 44), sombra suave.
- **Watermark "#DomaMotiva" GIGANTE sangrada** (v3, medida nos POST 242/250):
  - fontSize **162**, weight 700, branco `opacity 0.20`, letterSpacing −2, nowrap;
  - `left: -2.2%`, `top` OU `bottom`: **−1%** → "#" cortado à esquerda E "a" cortado à direita (texto sangra as duas bordas);
  - ❌ NUNCA a versão antiga pequena (fs 88 com padding — rejeitada).
- **Selo DOMa preto-e-branco EM CAMADAS** (v3 — regra transferível a outras categorias):
  - camada 1: **div círculo preto `#1F1F1F`** (`borderRadius 50%`), Ø **170** — o círculo é MAIOR que as escritas e cresce livre;
  - camada 2: **`oficial/selo-branco.png`** (escritas brancas) centrado por cima, `left/top 18%, width/height 64%`;
  - ❌ NUNCA `selo-grafite.png` solto (escritas pretas transparentes — invisíveis/erradas aqui);
  - posição: selo **CRUZA a borda do card** — `sup-dir` = `{top: 12, right: -85}` (metade fora, borda direita); `inf-dir` = `{bottom: -85, right: -10}`;
  - existe asset achatado `oficial/selo-preto-solido.png` (círculo+escritas em 1 png) para usos fora do Remotion, mas NO COMPONENTE usar as 2 camadas (borda ajustável sem mexer nas letras).

## Card proporcional ao texto (v3)
- O card deve ter tamanho **proporcional ao texto** — nunca sobrar campo vazio grande.
- Disposição interna medida (POST 242): `padding top 53 / left 66 / right 80 / bottom 44`, `justifyContent: center`, **gap 40 (~1 linha) entre parágrafos**.
- fontSize por peça (motiva-controla: 44 feed / 46 story). Máx chars/linha ≈ (card.width × 1080 × 0.86) ÷ (fs × 0.516).
- Frase maior que o card → aumentar card mantendo proporção, nunca espremer fonte.

## Efeito 3D — OPCIONAL, avaliar caso a caso (regra da categoria)
- **Antes de criar, AVALIAR**: a composição da foto tem elemento (cabeça/objeto) que invade naturalmente a área do card? → usar 3D. Senão → peça SEM 3D (não forçar).
- Fluxo (ver skill `efeito-3d-camadas`): pré-compor a foto no canvas exato (PIL cover crop) → `rembg` (API python do `.venv-instagram`, CLI quebrada) → crop retangular da região que "salta" → prop `recorte3d {src,left,top,width}` (% do canvas) → camada `zIndex 5` acima do card. Emenda invisível porque o fundo sob o recorte é a própria foto alinhada.
- Card menor (proporcional) pode eliminar o contato do 3D — decidir com Patrick: peça limpa sem contato OU reposicionar card.
- Assets 3D: sempre 2 versões (base composta + alpha/recortes transparentes) em `assets/bases-nanobanana{,-transparente}/`.

## Foto (regra de persona)
- Gerar via `scripts/nanobanana-generate.py` (só roda no `.venv-instagram`): dono de PME brasileiro 30–50 anos no AMBIENTE do negócio, sem texto na imagem; pessoa posicionada deixando área livre para o card; pedir "head reaching upper-middle" quando quiser 3D.

## VARIA (props)
| Prop | 242 | 250 | motiva-controla (v3) |
|------|-----|-----|------|
| `card` (l/t/w/h) | 10.2/17.6/46.8/32.4% | 45.4/26.4/46.8/20.4% | 8/16/44/27% (story 8/17/46/19.5%) |
| `seloCanto` | sup-dir | inf-dir | sup-dir |
| `watermark` | topo | base | topo |
| `fontSize` | 33 | 33 | 44 (story 46) |
| `recorte3d` | — | — | crop rembg (l 55.56% t 25.93% w 32.41%) |

## Notas
- **Story**: prop-based via Stills `<id>-story` (canvas 1080×1920, foto pré-composta story, recorte 3D próprio — coords diferem do feed).
- ⚠️ Remotion Studio aberto pode gravar `translate/scale` espúrios no componente do HOST ao arrastar (aconteceu 2×) — antes de render, conferir `grep translate` e restaurar do plugin se sujo.


---

## Revisão v3 (2026-07-21) — categoria FECHADA

### O defeito de origem: foto com elemento *baked*
As fotos antigas (`oficial/_teste-motiva-*.jpg`) eram **recortes do próprio modelo**, com card,
selo e watermark já impressos na imagem. Funcionava no feed só porque o nosso card caía
exatamente por cima do baked. No story o `cover` corta diferente → **aparecia card e selo em
duplicidade**. Regra: foto de peça é **imagem limpa**; se só existe o modelo, recriar a foto
limpa via nanobanana usando o modelo como `--input` ("remova os gráficos e reconstrua o fundo").

### Medições corrigidas (o componente estava genérico demais)
| | POST 242 | POST 250 |
|---|---|---|
| fontSize | **38** (era 33) | **45** (era 33) |
| selo Ø | **135** (era 170) | **109** (era 170) |
| selo offset | `{top: 146, right: -30}` | `{bottom: -52, right: 70}` |
| card (feed) | `L10.2% T17.6% W46.8% H32.4%` | `L45.4% T26.4% W46.8% H20.4%` |

Props novas no componente: `seloTamanho` e `seloOffset` — o selo NÃO é do mesmo tamanho em toda
peça da categoria, tem que ser medido. Negrito **600** (medido no 250: bold 5px vs regular 3px).
Padding do texto: `top 68` (folga pedida pelo Patrick), `left 62`, `right 45` — com `right 80` o
texto do 250 quebrava em 3 linhas em vez das 2 do modelo.

### Sobreposição 3D — agora padrão da categoria
As 3 peças usam `recorte3d` (pessoa sem fundo por cima do card): o cabelo/ombro passa por cima do
card e do selo. Pipeline: base composta no canvas exato (cover PIL) → `rembg` → asset em
`public/motiva/<peça>-<formato>[-recorte].png`. **Base e recorte são gerados por FORMATO** — o
`cover` de 9:16 corta diferente do 4:5.

### Peças da categoria
| Still | Foto | Story |
|---|---|---|
| `padrao-motiva-242` | mulher do modelo, recriada limpa | ✅ |
| `motiva-242-varB` | dona de loja no escritório (foto nova) | ✅ |
| `padrao-motiva-250` | homem do modelo, recriado limpo | ✅ |
| `motiva-controla` | já estava boa (referência da categoria) | ✅ |
