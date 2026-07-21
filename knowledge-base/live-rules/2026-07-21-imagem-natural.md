# Imagem gerada tem que parecer REAL, não renderizada

**Data:** 2026-07-21
**Descoberto em:** capa do POST ferragens-troca (categoria troque-por-isso)
**Sintoma:** Patrick sobre a v1 da capa: "parece uma artificial... precisa criar algo mais natural".
A foto tinha persona/composição corretas, mas o look era de catálogo — close arrumado, luz bonita
demais, produtos alinhados. Público Doma é dono de PME real; cena renderizada quebra a identificação.

**Regra:** todo prompt de cena/ambiente pede enquadramento ABERTO (mostra o espaço, não um detalhe)
+ imperfeições explícitas (etiqueta manuscrita, chão gasto, pilha torta, poeira, placa desbotada)
+ luz disponível de verdade (fluorescente misturada com luz da rua) + vocabulário documental
(candid, unstaged, 28mm, slight grain) + negativas (not glossy, not an advertisement, not CGI).
PROIBIDO: perfect/pristine/luxury, cinematic|studio lighting, 4k/8k/hyperrealistic/octane/unreal.

**Validação:** "dá pra acreditar que alguém tirou essa foto com o celular na loja do cliente?"
Precisa de ≥2 imperfeições visíveis. Reprovou → regerar, não aproveitar "porque tá bonita".

**Referência A/B:** `_ferragens-loja-base.png` (v1, artificial) vs `_ferragens-loja-v2-base.png`
(v2, natural). Stills `ferragens-troca-1` e `ferragens-troca-1-v2`.

**Aplicar em:** sub-skill `image-sourcer` (seção "NATURALIDADE OBRIGATÓRIA") — vale para nanobanana
E para seleção de foto de banco de imagem, em qualquer categoria.
