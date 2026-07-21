# Índice das fichas de recriação — `doma-brand/PADROES/`

Método e regras: **`RULES-recriacao.md`** (medir→codar→validar, render por `render-still.sh`).
Plano/status das 12 categorias: **`PLANO-recriacao.md`** · **`STATUS-recriacao.md`**.
Recursos do Remotion: **`REFERENCIA-remotion.md`**.

## Fichas por categoria (13 categorias)

### Cards únicos
- [frase-pilulas.md](frase-pilulas.md) — **PADRÃO-OURO** do método (todas as técnicas medidas).
- [mapa-clientes.md](mapa-clientes.md) — mapa do Brasil + rótulos por estado (via layout-mapper).
- [certo-e-errado.md](certo-e-errado.md) — ícones X/✓ SVG, watermark vertical DO/MA.
- [clientes.md](clientes.md) ([+ layout-mapper](clientes1.layout-mapper.md)) — foto + pílula local + nome + logo.
- [doma-motiva.md](doma-motiva.md) — foto + card + selo (motivacional).
- [inimigo-em-comum.md](inimigo-em-comum.md) — card branco + badge seta ↘ + card soft (quebras hardcoded).
- [narrativa.md](narrativa.md) — foto + card (+ moedas 3D no 272).
- [produtividade.md](produtividade.md) — foto-card + sub-card escuro baked.
- [funcoes-sistema.md](funcoes-sistema.md) — base nanobanana (device+ERP) + overlays Remotion (slots opcionais).
- [doma-institucional.md](doma-institucional.md) — tipográficos code-only + bases nanobanana.

### Carrosséis
- [dicas.md](dicas.md) — Dicas/margem de lucro (POST 246, sistema numerado ERROS COMUNS).
- [dicas-otica.md](dicas-otica.md) — POST 133 (antes/depois de vitrine, fotos extraídas + pílulas soft).
- [dicas-trento.md](dicas-trento.md) — POST 193 (storytelling, 8 slides bespoke, watermark bg extraído).
- [doma-carrossel-clientes.md](doma-carrossel-clientes.md) — POST 205 (logos de cliente recortados + grafismos).
- [spin.md](spin.md) — POST 243 + 251 (3 templates parametrizados).
- [troque-por-isso.md](troque-por-isso.md) — **POST 186** (pares Troque/Por isso; card de 1 canto
  reto + bordinha branca; lineHeight em px; itálico por skew). 🆕 2026-07-21.

## Princípios transversais (detalhe nas RULES)
- **Medir por pixel antes de codar** (bbox→%, cores hex por bloco, z-order, ângulos).
- **Render sempre por `render-still.sh`** (scale2→Lanczos, sem franja).
- **Asset de terceiro = extrair do modelo, nunca recriar** (recorte = colocação). Logo Doma = PNG oficial.
- **Watermark = logo oficial tingida** (CSS mask + backgroundColor medido).
- [Segmentos](segmentos.md) — post de segmento (POST 234): foto trocável + card manga topo-colado + wordmark soft. Regra foto = visão do dono.
- [Diversas](diversas.md) — tipográfico frame outline + fecho gigante (POST 178 re-medido).
