# Padrão de Post — "Segmentos" (categoria nova, 2026-07-16)

> ✅ **CRIADO do modelo POST 234** (loja de material de construção) — `../../templates/components/segmentos/Segmentos.tsx`.
> Peças de referência: `segmento-naturais` (v1) / `segmento-naturais-v2` + stories.

Post de segmento: fala direto com UM tipo de negócio ("Sua loja de X merece uma GESTÃO TÃO … quanto o Y que você vende."). Foto de fundo TROCÁVEL via prop — mesma copy pode ganhar novas fotos/versões.

## Estrutura medida (feed 1080×1350)
| Elemento | Medida |
|---|---|
| Foto do segmento | full-bleed `objectFit: cover`, **prop `foto`** (trocável) |
| Card manga `#F4BB35` | `L11.5% T0 W77% H71%` — **topo COLADO no canvas**, radius **100 SÓ embaixo** (`0 0 100px 100px`) |
| Wordmark DOMa soft `#F8DD6B` | CSS mask `logotipo-principal-branco.png`, `top 0, left 0, width 100%` (aspect 1767/322 → h197 EXATO — bate com o modelo). Fora do card aparece sobre a FOTO (sangrada) |
| Texto grafite `#212121` | centralizado, começa `top 24.8%` |

## Story (prop `story: true`, 1080×1920)
- Card `H62%`; texto começa `top 17%` (y~330 — dentro da zona segura >250px, ver [[instagram-zonas-seguras]]).
- Fontes: regular 70 / bold 92.

## Tipografia (medida no POST 234)
- Regular **64px** (story 70), lineHeight 1.16.
- Bold **84px** (story 92) — weight 700, linhas do "nome do negócio". (76 medido no modelo; 84 aprovado pelo Patrick.)
- Markup por linha (array `linhas`): `**bold**` e `__SUBLINHADO__` (caps escritas direto no texto; sublinhado `textDecorationThickness 3`, `textUnderlineOffset 0.14em`).
- Padrão de copy: "Sua" → **nome do negócio (bold, 2 linhas)** → "merece uma __GESTÃO__" → "__TÃO <ADJETIVO>__" → fecho regular 2 linhas.
- SEM logo no rodapé — a wordmark DOMa do topo é a marca.

## 📷 REGRA — foto de segmento = "VISÃO DO DONO"
Retratar o ambiente TÍPICO do negócio com elementos que o dono reconhece como a própria loja:
- granéis/produtos com **plaquinhas de preço em português (R$/kg)**, PDV/caixa registradora, balança, sacos kraft, gôndolas cheias de uso real;
- ❌ NUNCA showroom genérico/gringo bonito demais. Objetivo: identificação instantânea ("essa é a MINHA loja").
- **SEM pessoas** na foto (o protagonista é o ambiente).
- v1 pode ser mais "clean" e v2 mais "real" — manter as duas como opções (fotos trocáveis).
- Gerar via `scripts/nanobanana-generate.py --size 832x1248 --resolution 2K` (rodar com `.venv-instagram/bin/python`).
- Salvar em `assets/fotos-segmentos/<segmento>.png` + `remotion-doma/public/segmentos/`.

## Fotos existentes
- `loja-produtos-naturais.png` (v1 — clean, placa "PRODUTOS NATURAIS - ORGÂNICOS")
- `loja-produtos-naturais-v2.png` (v2 — visão do dono: granéis com preços, PDV, balança, "Promoção do Dia")
