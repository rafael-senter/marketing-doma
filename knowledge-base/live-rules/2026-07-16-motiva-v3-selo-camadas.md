# Doma Motiva v3 — watermark gigante + selo em camadas + 3D caso a caso

**Data:** 2026-07-16
**Descoberto em:** POST motiva-controla (feed+story)
**Regras:**
1. Watermark "#DomaMotiva" GIGANTE sangrada (fs162 w700 opacity .20, left −2.2%, top/bottom −1% — "#" e "a" cortados). Versão pequena fs88 rejeitada.
2. Selo preto-e-branco EM CAMADAS: div círculo preto #1F1F1F Ø170 ATRÁS (cresce livre pra fora) + `selo-branco.png` 64% centrado POR CIMA. Nunca selo-grafite solto. Selo CRUZA a borda do card (sup-dir: top 12/right −85). Técnica transferível: círculo maior que as escritas, ordem = círculo atrás, logo na frente.
3. Card PROPORCIONAL ao texto (padding 53/66, gap 40, justify center) — nunca sobrar campo vazio.
4. EFEITO 3D é OPCIONAL na categoria: avaliar caso a caso ANTES de criar (foto invade card naturalmente → 3D; senão sem 3D). Fluxo: pré-compor foto no canvas → rembg (API python .venv-instagram; CLI quebrada por gradio) → crop região → prop `recorte3d`.
5. Remotion Studio aberto grava translate/scale espúrios no host ao arrastar (2ª ocorrência) — conferir `grep translate` antes de render.
**Ficha:** `../padroes/doma-motiva.md` (TEMPLATE v3).
