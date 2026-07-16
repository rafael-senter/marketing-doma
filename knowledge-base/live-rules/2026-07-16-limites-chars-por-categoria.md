# Limites de chars/linha documentados em TODAS as 12 fichas (§19)

**Data:** 2026-07-16
**Descoberto em:** auditoria categoria-a-categoria pós rede-lojas
**Sintoma:** criações novas quebravam porque nenhuma ficha documentava quanto texto cabe em cada bloco.
**Regra:** toda ficha de categoria agora tem seção "Limites pra criação nova (§19)" com máx chars/linha e máx linhas por bloco + riscos (altura fixa + overflow hidden = corte silencioso). Fórmula-base: `chars ≈ largura_útil_px ÷ (fs × 0.516)` (regular; bold ×0.55). Calibrada no SPIN (fs44 → 22.7 px/char).
**Uso:** ANTES de escrever quebras manuais, consultar a tabela da categoria. Conteúdo maior que os limites → re-quebrar/densificar/trocar de variante (ex. DicasMioloCompact), NUNCA reduzir fonte fora do documentado.
**Story:** só SPIN e funcoes-sistema têm suporte story hoje. Nas demais categorias, IMPLEMENTAR prop `story` na primeira peça nova (padrão SPIN: cards flutuantes centrados com altura px ≈ do feed; render `render-still.sh <id>-story 1080 1920`).
**Aplicar em:** todas as categorias, toda criação nova.
