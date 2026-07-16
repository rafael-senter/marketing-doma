# Pacote de regras visuais do Patrick (2026-07-16) — TRANSVERSAL, todas as criações

> Consolidação das correções validadas peça a peça com o Patrick (POST rede-lojas + prejuizo-industria).
> Repasse do plugin: quem criar QUALQUER peça nova segue isto. Detalhes por categoria nas fichas; método de medição nas RULES §0/§19/§20.

## 1. Negrito = 600 (MEDIDO)
- `TextoRico` default `boldWeight 600`. Stroke do bold no modelo @fs78 = 9px (regular 5px); 700 dava 11px, 800 dava 12px+.
- Validação: medir stroke no render (runs de pixels escuros) vs modelo — nunca confiar no número do fontWeight.

## 2. Raios de canto = MEDIDOS e GENEROSOS (RULES §20)
- Padrão Doma tende a 40-60 px, não 28. Tabela completa por categoria nas RULES §20.
- Novo bloco arredondado → medir a curva no modelo (varredura dy no canto).

## 3. Cantos RETOS intencionais (assimetria da marca)
- Foto central Produtividade: sup-esq RETO ('0 48 48 48').
- Bloco preto do fecho: sup-esq RETO ('0 28 28 28') — espelha a foto.
- SPIN rodapé: faixa só com sup-dir arredondado; bloco branco com inf-esq RETO.
- Regra: blocos Doma costumam ter UM canto reto — identificar QUAL no modelo antes de codar.

## 4. Bloco de fecho = FLUTUANTE
- Sobrepõe a imagem saindo pela borda inferior (~metade) E pela lateral direita (~4%). Nunca embutido/alinhado dentro da foto.

## 5. Borda branca fina em foto central
- 3px branco (#FFF) ao redor da imagem de centro de tela (medido 2px @1080 no modelo), acompanhando o raio.

## 6. Watermark de fundo = DOMa GIGANTE
- Logo VERTICAL (DO / M.a em 2 linhas) estourando o canvas, extremidades das letras cortadas nas bordas, posicionada meio-baixo (Produtividade: top 9%, left -17.5%, width 135%), cor tom-sobre-tom MEDIDA (#F2B32E sobre manga — nunca imperceptível, nunca gritante).
- SPIN/Pílulas usam o padrão 4 faixas horizontais (RULES §9) — cada categoria tem seu padrão de watermark: OLHAR O MODELO.

## 7. Story (1080×1920) = conteúdo mais pra BAIXO
- Nunca amontoar no topo: título ~14%, selo ~11%, imagem central ~30→80%, logo ~93%.
- Carrossel story: card flutuante centrado com densidade do feed (altura px ≈ do feed).
- Render SEMPRE `render-still.sh <id>-story 1080 1920`.

## 8. Modos de cor alternantes (carrosséis)
- SPIN: miolos alternam modo 1 (soft+card manga) / modo 2 (manga+card soft) a cada slide.

## 9. Fontes = medidas do modelo, nunca menores
- Regra §19: conteúdo maior → re-quebrar/densificar, NUNCA reduzir fonte fora do documentado.

## 10. Toda peça = feed + story
- 2 Stills desde o nascimento; ajustes replicados nos dois.
