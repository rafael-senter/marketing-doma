# Inimigo em Comum — template v2 (DO/Ma vertical + cards menores)

**Data:** 2026-07-16
**Descoberto em:** POST inimigo-crescimento
**Sintoma:** wordmark horizontal sangrada mostrava "DON" cortado; cards grandes tapavam a watermark; bold 800 grosso; secundário 42px pequeno.
**Regra:** watermark = logo VERTICAL (DO/Ma) width 100% nas paredes (feed E story); prop `story` desce blocos no 9:16 (branco T28%, soft T59.5% W58% H17.5% menor, badge T58.5%) mantendo fontes; bold fecho 700; secundário 56px. Ficha da categoria tem a tabela completa = fonte da verdade junto com `InimigoComum.tsx`.
**Aplicar em:** inimigo-em-comum (feed + story).
