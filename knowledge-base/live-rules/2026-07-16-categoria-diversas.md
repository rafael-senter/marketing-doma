# Categoria nova "DIVERSAS" (POST 178) — template re-medido

**Data:** 2026-07-16
**Descoberto em:** POST controla-numero
**Sintoma:** Doma178 antigo tinha fontes muito menores que o modelo real (62/86 vs 98/140 medidos).
**Regra:** categoria "diversas" (`templates/components/diversas/Diversas.tsx`), props `{texto, fecho, story}`. Regras-chave: bloco de texto CENTRADO verticalmente no frame (flex, funciona pra N linhas); fecho vaza SIMÉTRICO (flex center + nowrap — textAlign center vaza só pra direita); linha do frame nunca atrás do texto (span com background manga corta a linha); 1ª linha curta (colisão com badge x>805); watermark #F1A625 sangrada NA FRENTE do frame; fecho weight 700. Ficha: `../padroes/diversas.md`.
**Aplicar em:** toda peça da categoria diversas.
