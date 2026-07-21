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

## Atualização — nível "vivido" (v3, mesma sessão)

A v2 (enquadramento aberto + imperfeições genéricas) ainda foi lida como artificial. O que fechou
foi dar **sinais de que alguém trabalha ali todo dia**:
- reusar a melhor tentativa como `--input` (trava a composição, itera só o realismo);
- `a real casual snapshot the shop owner took with his phone` + `slightly tilted framing`,
  `mild ISO noise`, `soft corners`, `flat contrast`;
- objetos que ninguém põe num render: ventilador de parede, calendário de papel, bilhete colado
  com fita, plaquinha de papelão escrita a marcador, mercadoria em prego, caixas no chão;
- vestígio de trabalho: `an open box someone was restocking left mid-aisle`;
- móvel heterogêneo: `mix of old wooden shelves and mismatched metal ones`;
- trava da bagunça: `still clearly organised and navigable, just lived-in and a little messy —
  not dirty, not abandoned` (sem isso vira loja abandonada).

Escala A/B/C catalogada: v1 reprovada · v2 boa · v3 aprovada.
