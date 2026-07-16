# Todo post novo = criar story junto (par post + story)

**Data:** 2026-07-16
**Descoberto em:** POST inadimplencia (funcoes-sistema)
**Sintoma:** post criado sem versão story; Patrick definiu regra permanente.
**Regra:** Toda peça nova de feed (1080×1350) DEVE nascer com a versão story (1080×1920) no mesmo fluxo. Ajustes numa versão → replicar/adaptar na outra (mexer nos dois juntos). Registrar 2 Stills: `<id>` e `<id>-story`.
**Layout story:** mesmo componente (posições em % re-distribuídas pro 9:16); título maior (fontSize +~10%), notebook/imagem central, corpo+selo abaixo da imagem, logo rodapé bottom 5%.
**Aplicar em:** TODAS as categorias, peças novas.
**Render:** story SEMPRE com dims explícitas — `render-still.sh <id>-story 1080 1920` (sem elas o script esmaga pra 1350; ver live-rule render-story-dimensoes).
