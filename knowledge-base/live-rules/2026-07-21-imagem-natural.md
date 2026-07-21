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

## Correção — preço NUNCA em papelão manuscrito (Patrick, mesma sessão)

Patrick escolheu a **v2** e descartou a v3. Mas apontou: "os preços parecendo que são no papelão
fica estranho". Duas lições que corrigem o que eu tinha gravado antes:

1. **`handwritten cardboard price signs` é ANTI-padrão**, não sinal de naturalidade. Contradiz o
   discurso Doma (a loja que a gente retrata tem controle, não gambiarra de preço).
   Pedir sempre: `small tidy printed shelf-edge price labels sitting flush in the metal label
   holders on the front lip of each shelf`.
2. **Bagunça a mais ≠ mais natural.** A v3 (ventilador, calendário, caixas no chão, prateleiras
   heterogêneas) foi REJEITADA em favor da v2. O que produz naturalidade é enquadramento aberto +
   piso gasto + luz real do lugar — com sinalização limpa.

**Técnica de correção cirúrgica:** imagem boa com um defeito pontual → NÃO regerar do zero.
Reusar como `--input` com "keep the photo exactly as it is, change ONLY <o defeito>". Preservou
loja, corredor, produtos, luz e enquadramento; trocou só as plaquinhas.

Asset final: `_ferragens-loja-v2-base.png` (versão corrigida). v3 apagada.
