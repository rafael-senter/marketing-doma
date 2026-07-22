# Linha cortada = "borracha" na cor do fundo entre a linha e o elemento

**Data:** 2026-07-22
**Descoberto em:** doma-institucional (178 + variante principal "Quem controla o número...")
**Sintoma:** Patrick mostrou o modelo com a moldura de LINHA CORTADA — a palavra/badge fica em cima
da linha, com linha dos DOIS lados, sem linha atrás. Nosso 178 tinha moldura fechada (linha inteira
passando atrás do badge, encostando nele).

**Medição:** modelo — moldura direita x832 com GAP exatamente na altura do badge (y451-595, badge
cy516 Ø138). O corte tem folga: borracha Ø166 (~14px maior que o badge de cada lado).

**Regra:** para "elemento por cima da linha, sem linha atrás, cortada dos dois lados":
1. Linha/moldura em `zIndex 1`.
2. **Borracha** = forma na COR DO FUNDO (manga `#F4BB35`), ~14px maior que o elemento, `zIndex 2`.
3. Elemento (badge/palavra) por cima, `zIndex 3`.
A borracha apaga a linha atrás do elemento → corte limpo. NÃO basta pôr o elemento opaco por cima
(a linha reencosta na borda dele, sem gap). A borracha cria o GAP dos dois lados.

**Aplicar em:** qualquer categoria com moldura/linha que um elemento cruze (doma-institucional ✅;
candidatos: qualquer frame tipográfico, faixas, divisórias). Componente de referência: `BadgeGrafico`
em `templates/components/doma-institucional/DomaInstitucional.tsx`.
