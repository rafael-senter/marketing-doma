# Selo 14 anos padrão + watermark amarelo fraco (funcoes-sistema)

**Data:** 2026-07-16
**Descoberto em:** POST inadimplencia (funcoes-sistema)
**Sintoma:** Claude trocou selo-14anos-1 (badge manga) pelo -2 (badge grafite) por lógica de contraste do catálogo, e usou watermark BRANCA no topo. Patrick corrigiu ambos.
**Medição/decisão:**
- Selo 14 anos: variante PADRÃO do projeto = `selo-14anos-1.png` (= SELO 14 ANOS-12: badge amarelo manga #F7BE35 + glifo grafite), **inclusive sobre fundo amber** — tom-sobre-tom do badge é intencional.
- Watermark de funcoes-sistema em peças novas: **TOM DE BRANCO fraco tom-sobre-tom** (~18% branco sobre manga = `#F6C554`). NUNCA escura (#E8AF2F foi rejeitado — "parece preto"), NUNCA branca 100% sólida (muito forte).
**Regra:** Componente `FuncoesSistema` ganhou prop `watermarkCor` (default `#F6C554`). Selo 14 anos: nunca "corrigir" a escolha do Patrick por lógica de contraste — a 12 é a canônica.
**Aplicar em:** funcoes-sistema; qualquer peça com selo 14 anos.
