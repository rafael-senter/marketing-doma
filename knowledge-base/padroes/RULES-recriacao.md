# RULES de recriação pixel-perfect (Doma) — meta 98-100%

Regras OBRIGATÓRIAS, aprendidas com erros. Ler antes de recriar qualquer peça.

## 0. Método (não adivinhar — MEDIR)
1. Antes de codar, um subagente MEDE o modelo por pixel (numpy): bbox de cada bloco, cores (hex), centros/diâmetros, densidade de texto (regular vs bold), cap-height da fonte, luminância da marca d'água vs fundo.
2. Codar usando os NÚMEROS medidos convertidos para % do canvas 1080×1350.
3. Validar por MEDIÇÃO COMPARATIVA (subagente mede a recriação e compara número a número com o modelo), não por impressão.
4. Iterar até cada métrica bater (≤2px / cor exata / luminância da watermark dentro de ~8%).

> 🛠️ **Ferramenta padrão de medição: skill `layout-mapper`** (`.claude/skills/layout-mapper/`). Automatiza este protocolo: `extract.py --file MODELO` mede bbox→%, cor por bloco, z-order, ângulos, cap-height e reconstrói texto fragmentado, gerando um `scene.json` (SceneIR) + scaffold `.tsx`. `measure.py MODELO` faz a medição avulsa de blocos/cores. `compare.py --modelo X --render Y` mede a fidelidade (SSIM + % pixels) e gera o composto lado a lado para o loop. Usar a skill em vez de scripts numpy ad-hoc; o `scene.json` medido é a fonte da verdade (o scaffold é só ponto de partida — refinar e validar com `render-still.sh`).

## 0.1 MEDIÇÃO DE POSIÇÃO E ESPAÇAMENTO (regra reforçada — erro recorrente: elemento no lugar errado)

**Sintoma comum:** elementos "muito pra cima/baixo/esquerda/direita", ou vários desalinhados. Sempre que isso acontece, é porque a posição foi CHUTADA, não medida.

**Protocolo obrigatório por elemento (antes de codar):**
1. Abrir o modelo (sempre 1080×1350) e, com numpy, achar a **bbox real de cada elemento** detectando-o pela COR característica:
   - Card soft (`#F8DD8B`): `(R>240)&(G in 205..235)&(B in 110..160)`.
   - Foto/mockup: região NÃO-amarela e NÃO-soft (tons neutros).
   - Texto grafite: `luminância < 90`.
   - Badge/selo colorido: saturação alta.
2. Converter cada bbox para **% do canvas**: `x% = x_px/1080*100`, `y% = y_px/1350*100`. Largura/altura idem. Usar SEMPRE % no CSS (não px fixos), assim escala com o render.
3. Quando há 2+ blocos da mesma cor (ex: selo em cima + card embaixo), **separar por faixas de y** (histograma de linhas com a cor) — não medir tudo junto.
4. Para elemento circular (selo, badge): medir **centro (cx,cy)** e **diâmetro Ø** (em %), não só a bbox.
5. **Espaçamentos** (gap entre blocos, padding interno): medir a distância em px entre as bbox e converter pra %. Não inventar "32px de padding".

**Tolerância:** cada bbox ≤ 2px (≈0.15-0.2%) do modelo. Validar re-medindo a recriação e comparando número a número.

**⚠️ Os docs antigos (`RECRIAR-lote*.md`) têm ERROS de medição** (ex: o card de título do L1Post3 estava documentado em y39.5% mas o real é y54.5%). **Re-medir do zero a cada peça** — não confiar cegamente em medição anterior. Ao corrigir, atualizar o doc com o valor re-medido e marcar "(RE-MEDIDO)".

**Snippet padrão de medição de bbox por cor:**
```python
import numpy as np; from PIL import Image
im=np.asarray(Image.open(MODELO).convert('RGB')).astype(int); H,W=im.shape[:2]
R,G,B=im[...,0],im[...,1],im[...,2]
soft=(R>240)&(G>205)&(G<235)&(B>110)&(B<160)   # ajustar à cor do alvo
ys,xs=np.where(soft)
print(f"x[{xs.min()/W*100:.1f}%,{xs.max()/W*100:.1f}%] y[{ys.min()/H*100:.1f}%,{ys.max()/H*100:.1f}%]")
# 2+ blocos: separar por faixas de y via histograma de linhas (np.bincount(ys))
```

## 1. Logo / nome
- O nome é **DOMa** (D,O,M maiúsculos + "a" minúsculo com altura de maiúscula). **NUNCA "DOM.a"** — o "ponto" é a perna do M estilizada.
- Logo/selo/símbolo = SEMPRE os PNGs oficiais de `doma-brand/logos-oficiais/`. Nunca recriar em fonte/SVG.
- **Marca d'água "DOMa" NÃO pode quebrar em DO / MA** — manter numa linha só (`whiteSpace: nowrap`), a menos que o modelo realmente quebre.

## 2. Marca d'água de fundo (erro recorrente: forte demais)
- É **MUITO sutil**: tom-sobre-tom, só ~5-8% mais escura/clara que o fundo (medir luminância). No "Certo e Errado": fundo `#F6C655`, watermark `#F4BB35` (a manga normal) = ~5% mais escura. Quase imperceptível.
- NÃO usar opacidade que deixe a palavra nítida/legível. Calibrar pela luminância medida do modelo.
- Conteúdo varia por post (DOMa / símbolo M / palavra-tema / número). MEDIR qual é no modelo específico — subagentes confundem (já vimos "DOMA"/"PONO"/"DONE" pra mesma imagem). Recortar o topo em alta e ler com cuidado.

## 3. Cores (medir, não assumir)
- Amostrar pixel do modelo. Atenção: o fundo "amarelo" varia (#F4BB35 manga padrão, mas #F6C655 mais claro em alguns). Cards soft = #F8DD6B. Badges: vermelho #EF4639, verde #32BA7C (medidos, não os do manual).
- Gradiente de fundo TEM DIREÇÃO — conferir pra onde clareia.

## 4. Tipografia (erro recorrente: pesada/grande demais)
- Corpo = peso REGULAR (400). Só a palavra-chave em bold (800). Se tudo fica "meio bold", o contraste some.
- Medir o cap-height do modelo em px e converter pro fontSize (cap-height ≈ 0.7×fontSize na TT Lakes).
- Respeitar o GAP entre kicker/título e corpo (medir — no Certo e Errado é ~100px, não 33px).
- Ancoragem vertical do texto: conferir se é topo, centro ou meio-baixo do card.

## 5. Geometria (medir bbox e converter)
- Cada bloco: medir x_esq/x_dir/y_topo/y_base no modelo, converter pra %. Tolerância ≤2px.
- Badges/selos que "estouram" canto: medir centro (cx,cy) e diâmetro exatos. Não chutar a posição.
- Logo rodapé: medir bbox (largura/altura/y) — tamanho e posição exatos.

## 6. Elementos complexos (3D, mockups, ilustrações)
- Quando um elemento NÃO dá pra fazer fiel em CSS/SVG (ex: celular 3D realista, mockup de produto, ilustração), **CRIAR o elemento como imagem** via:
  - `nanobanana-skill` (gerar imagem via Gemini) — pra mockups/ilustrações/3D.
  - Extrair do post original (rembg) quando o elemento já existe lá.
  - Pesquisar asset (ex: mockup de celular PNG transparente).
- NÃO entregar aproximação CSS pobre (ex: o celular do l3-post4 ficou "contorno vazio" — inaceitável). Se não dá em código, gerar/buscar imagem.

## 7. Validação final
- Só considerar PRONTO quando a medição comparativa der ≥98% em todas as métricas.
- Registrar no doc da categoria o resultado e o que foi medido.

## 8. Texto "torto" / "tremido" — CAUSA RAIZ e SOLUÇÃO (diagnosticado por medição)

**Sintoma:** palavras (ex: "CERTO", "ERRADO") parecem tortas/tremidas/sujas no render, mesmo o CSS estando correto.

**O que NÃO é (medido e descartado):**
- NÃO é rotação: a baseline medida deu ângulo **0.000°** e spread de altura entre letras = **0px**. O texto está geometricamente RETO. O `<span style="...">CERTO</span>` que aparece no inspetor é só o HTML — não indica torção.
- NÃO é itálico, line-height nem transform.

**O que É (causa raiz, medido):**
1. **Franja cromática de sub-pixel (LCD/ClearType) do Chrome.** Ao renderizar em `scale 1`, o Chrome aplica anti-aliasing sub-pixel que pinta as bordas das letras com franja **verde de um lado e vermelha/laranja do outro**. Medido: `mean|R-G|` nas bordas = **23.6** na recriação vs **13.9** no modelo (~1.7-3x). É isso que o olho lê como "tremido/torto/sujo".
2. **Peso/largura errados** agravam: kicker em Bold (700) ficou +12.5% largo e +22% de tinta vs o modelo (que usa ~SemiBold 600). Corpo grande demais (fontSize 43) forçou quebra de linha errada e +tinta.

**SOLUÇÃO (comprovada por medição — franja caiu de 23.6 → 12.5, abaixo do modelo):**
- **Renderizar SEMPRE com `--scale 2` e depois reduzir para o tamanho final com Lanczos** (PIL `Image.LANCZOS`). O downscale funde os sub-pixels coloridos em cinza neutro → franja some. Usar o script `remotion-doma/render-still.sh <id>` (já faz scale2 + downscale automático).
- No container do componente: `WebkitFontSmoothing: 'antialiased'`, `MozOsxFontSmoothing: 'grayscale'`, `textRendering: 'geometricPrecision'` (ajuda, mas o scale 2 é o que resolve de fato).
- Peso do corpo = **400** (regular) de verdade; só keyword em bold. Kicker = 600 (não 700). Medir cap-height e ajustar fontSize (não chutar "grande").
- Quando a quebra de linha importa (cards estreitos), forçar com `\n` no texto pra casar a contagem de linhas do modelo.

**Regra de ouro:** todo still de recriação sai por `render-still.sh` (scale 2 → Lanczos). Nunca `remotion still` direto em scale 1 para peça final.

## 9. Marca d'água de fundo = LOGO OFICIAL (regra detalhada)

A marca d'água "DOMa" de fundo é **SEMPRE a logo oficial** (`oficial/logotipo-principal-cor.png`), nunca texto digitado (texto vira "JM/UM/PONO" e a fonte não bate). A logo é **ajustada de formas diferentes** conforme o post — medir no modelo qual é o caso:
- **Uma instância gigante** sangrando o topo (ex: Certo e Errado, mapa).
- **Repetida em coluna** com ESPAÇO entre as repetições (ex: Frase em Pílulas — gaps medidos ~3-4.5%, NÃO grudar). Medir o espaçamento e replicar com `gap`.
- **Só o símbolo "M" gigante** (ex: posts tipo DPOp0u) → usar `logos/simbolo-m-amarelo` / o M da logo, não a wordmark.

**Cor da watermark (tom-sobre-tom, erro recorrente) — TÉCNICA DEFINITIVA = CSS mask:**
A watermark é só ~5% mais escura que o fundo (ex: fundo `#F4BB36` → watermark `#F2B12F`). A forma TEM que ser a logo oficial (o "D" fechado, não "U deitado"). Método correto e validado (cor sai EXATA):
- `<div>` com `backgroundColor` na **cor exata medida** da watermark (ex: `#F2B12F`);
- `WebkitMaskImage`/`maskImage = url(oficial/logotipo-principal-branco.png)` (alpha = forma das letras) + `maskSize:'100% 100%'` + `maskRepeat:'no-repeat'` + `aspectRatio` da logo.
⚠️ **NÃO** usar a logo `-cor` (amarela: SOME sobre fundo amarelo) · **NÃO** `mixBlendMode:multiply` (distorce o "D") · **NÃO** logo grafite com opacity (sai CINZA, não a cor certa). Esses 3 erros já aconteceram.
**Posição/quantidade:** medir no modelo quantas repetições e ONDE (muitas vezes só 4, concentradas no MEIO, com topo/base LIMPOS — NÃO encher o post inteiro). Validar amostrando o hex (fundo idêntico + watermark na cor exata).

**Validar** medindo `std/mean` da luminância na faixa onde a watermark aparece (alvo: bater o contraste% do modelo) E o hex da cor (fundo E watermark).

## 10. Cores e fundos POR BLOCO (medir cada um)
- O "amarelo" varia entre peças E entre elementos da mesma peça. SEMPRE amostrar o hex de CADA bloco no modelo: fundo, cada card/pílula, badges, watermark. Não reusar a cor de outra peça.
- **Interior de pílula/card "vazado"** (só contorno): no modelo costuma ser a **cor do fundo** (tapa a watermark atrás), NÃO transparente. Conferir amostrando o interior.
- Fundos podem ser CHAPADOS (sem gradiente) — confirmar medindo os 4 cantos; só adicionar gradiente/lavagem se o modelo tiver.

## 11. Fonte = TT Lakes oficial
- Sempre `brand.fontes.titulo` (TT Lakes, embarcada em `public/fontes/`, pesos 400-900). Corpo regular 400, palavra-chave bold 700-800. Nunca fallback do sistema.

## 12. Sobreposição (z-index) de elementos empilhados — MEDIR a ordem no modelo
- Quando elementos se sobrepõem (pílulas, cards, badges), a ordem de quem fica POR CIMA importa e é visível na "zona de contato" (a borda de um corta o outro). MEDIR no modelo recortando a zona de contato em alta.
- A ordem NEM sempre é linear. Ex. (Frase em Pílulas): a **1ª** pílula fica por cima da 2ª; mas da **2ª em diante** a de baixo vai por cima da de cima (3 sobre 2, 4 sobre 3, 5 sobre 4). → z = [6,2,3,4,5], não crescente simples. Definir z POR elemento, não por loop.

## 13. Tortos/rotações sutis — medir o ângulo, não chutar
- Elementos "tortos" (pílulas, cards jogados) têm rotação medível: ajustar reta à borda e medir o ângulo (`atan(dy/largura)`). Costuma ser sutil (±2-6°) e ALTERNAR de sinal (zigue-zague). Não exagerar nem deixar reto.

## 14. Quando NÃO tem o asset na cor certa → TINGIR, não improvisar
- Se a base não tem a logo/ícone na cor exata que o modelo usa, **tingir** o asset oficial (CSS mask + `backgroundColor` na cor medida) preservando a FORMA oficial. Nunca recriar a forma à mão nem aceitar cor errada. Conferir primeiro se existe variante pronta (`-cor`/`-grafite`/`-branco`); a `-branco` serve de máscara para qualquer cor.

## 15. Watermark: escolher a logo certa (horizontal vs VERTICAL)
- A watermark "DOMa" aparece de jeitos diferentes. MEDIR o perfil vertical de pixels escuros no modelo: se vê **"DO" em cima e "MA" embaixo** (empilhado), usar `oficial/logotipo-vertical-branco.png` (proporção ~1.27:1). Se vê "DOMa" deitado numa faixa, usar `logotipo-principal-branco.png` (~5.5:1). Escalar até as letras baterem a extensão medida (pode usar `width:X% height:100% maskSize:100% 100%` p/ esticar e cobrir o canvas).
- **Medir a cor por POPULAÇÃO de pixels** (não por amostra de 1 ponto): no topo, a cor MAIORITÁRIA = fundo; a MINORITÁRIA (mais escura) = watermark. Evita inverter fundo/watermark.

## 16. Ícones (X, ✓, setas) = SVG desenhado, não caractere unicode
- Badges de check/x e ícones de traço: desenhar em **SVG** com traços GROSSOS (`strokeWidth` ~9 em viewBox 86) e `strokeLinecap:'round'`/`strokeLinejoin:'round'` (pontas arredondadas). Caractere unicode (✕/✓) sai fino e diferente.
- Se o modelo tem **LONG SHADOW** (sombra flat que segue a forma do símbolo na diagonal): NÃO usar clipPath triangular genérico (fica errado). Técnica correta = repetir o símbolo ~80 cópias deslocadas na diagonal 45° (passo ~0.55px), TODAS dentro de um `<g opacity={0.15}>` ÚNICO (opacity no grupo, não por cópia — senão acumula e cria "riscos" de tonalidade desigual). Cor preta. Resultado: silhueta sólida de tonalidade UNIFORME. Símbolo branco por cima. `overflow:hidden` no círculo. (Validado no Certo e Errado.)
- Para ícones TEMÁTICOS (gráfico, alvo, cifrão…) usar os PNGs oficiais (`<Icone>`), nunca desenhar à mão.
- **Seta DIRECIONAL ↘ = componente compartilhado `SetaDoma`** (não desenhar por categoria) — ver §21.

## 17. Texto: medir LARGURA e CAP-HEIGHT separados — fonte larga = letterSpacing, não fontSize
- Ao validar um texto, medir DUAS coisas no modelo: **cap-height** (altura de uma maiúscula isolada, ex. o "E" inicial — janela estreita só nessa letra, sem pegar descendentes de vizinhas) e **largura** da linha inteira (projeção de colunas escuras).
- Se no render a **cap-height bate mas a largura não** (texto mais estreito), a fonte do modelo é proporcionalmente mais larga (mesma altura, mais largura). **NÃO aumente o fontSize** (isso estica a altura também e desbate o cap). Em vez disso adicione **`letterSpacing`** até a largura bater. Ex. (Mapa de Clientes): selo cap 23=23 ✓ mas larg 324 vs 348 → letterSpacing 1–1.5; legenda cap 33, larg 871 → fontSize 47 + letterSpacing 1.8.
- **lineHeight de bloco multi-linha:** medir a distância TOPO-a-TOPO entre as linhas no modelo (não o gap visual). No Chrome do Remotion o espaçamento real ≈ `fontSize × lineHeight × ~1.1` — calcular e validar por medição, iterar.
- **Posição de rótulos sobre um SVG (mapa, diagrama):** medir o centro do texto no modelo em px do canvas e converter para coordenadas do viewBox pela MESMA transformação do `<svg>` (se o svg está em `left/top` L,T com escala S = `width/viewBoxW` no modo meet: `vx=(px−Lcanvas)/S`, `vy=(py−Tcanvas)/S`). Assim o rótulo cai exatamente onde está no modelo — inclusive FORA do elemento quando o modelo desloca (ex. PE/AL/ES/RJ no mapa ficam à direita, fora do estado).
- **SVG com `preserveAspectRatio meet` ENCOLHE** o conteúdo para caber no menor eixo, deixando margem no outro → o desenho fica menor que o esperado. Medir o bbox-alvo no modelo e setar `width`/`height` para que o conteúdo PREENCHA esse bbox (conferir por medição do render, não confiar no número nominal). (Mapa: 893×851 nominal renderizava só 816×851 → setar 892×932.)

## 18. Watermark/texto em OUTLINE (contorno vazado) — técnica de 2 CSS masks

Quando a marca d'água é o **contorno** das letras (outline vazado), não o preenchimento — ex. "Cliente Novo": "DOMa" tom-sobre-tom só com a borda. Não há asset outline e NÃO se recria a logo em fonte (§1). Técnica:
- Dois `<div>` sobrepostos, ambos com **CSS mask** da MESMA logo oficial (`logotipo-principal-branco.png`):
  1. camada de baixo: `backgroundColor` = **cor do contorno** (medida — tom-sobre-tom, ex. `#F6C85D` vs fundo `#F4BB35`).
  2. camada de cima: `backgroundColor` = **cor do FUNDO**, com `inset` de poucos px (ex. `6px 4px`) → encolhe a forma e "come" o interior, deixando exposta só a **borda** da camada de baixo = o outline. `inset` maior = outline mais grosso.
- **Validar por medição:** `y_topo` das letras, largura (sangra?), e **densidade** (% de pixels ≠ fundo na faixa) — ajustar `top`/`width`/`left`/`inset` até bater. A logo horizontal tem margem mínima → para descer as letras use `top` POSITIVO.
- **Custo:** o outline raramente alinha pixel-perfect com o do modelo (posição das letras), então pode custar ~0.3-0.5% de SSIM mesmo correto — é o preço de ter o elemento (mais fiel visualmente). Decidir com o Patrick se mantém.

## 19. CRIAÇÃO NOVA — análise pós-render OBRIGATÓRIA (o conteúdo nunca é o modelo)

Regra do Patrick (2026-07-16, POST rede-lojas). Seguir a ficha da categoria NÃO basta: o conteúdo criado é sempre diferente do modelo (mais texto, linhas maiores, mais itens) e a peça sai quebrada mesmo com componente correto. Vale pra TODAS as categorias, feed E story.

1. **ANTES de codar**: dimensionar conteúdo novo vs modelo (linhas/itens); respeitar limites de chars/linha da ficha; sem limites documentados → medir no 1º render e gravar na ficha. NUNCA reduzir fonte pra caber — re-quebrar, densificar copy, ou usar fontSize documentado da ficha.
2. **DEPOIS de renderizar**: auditar CADA slide (feed e story) com o checklist: órfãs · overflow/colisão · centralização/equilíbrio (buraco >15% inexplicado = defeito; CTA com texto curto = densificar) · fontes = ficha · alternância de modos de cor (ex. SPIN 1-2-1-2) · rodapé/faixas/selo/watermark medidos · dims do PNG (story = `render-still.sh <id>-story 1080 1920`, o default esmaga) · comparação lado a lado com o slide-modelo do mesmo tipo (divergência → numpy, não a olho).
3. **Iterar até limpar**: defeito → corrigir → sync da RAIZ do host (+ grep valida) → re-render → re-auditar. Só apresentar peça 100% auditada.
4. **Limite/regra nova descoberta → gravar** na ficha da categoria + live-rule.

Checklist detalhado: `knowledge-base/live-rules/2026-07-16-analise-pos-criacao-obrigatoria.md`.

## 20. RAIOS de cantos — SEMPRE medidos, nunca chutados

Auditoria 2026-07-16 (pedido Patrick): vários componentes tinham raios chutados (28/30/36/40) — os reais medidos são maiores/diferentes. Método: varrer dy a partir do canto do bloco e achar onde o x-início da cor volta ao nominal (profundidade da curva ≈ raio).

Raios MEDIDOS por categoria (px @ canvas 1080×1350):
| Bloco | Raio real |
|---|---|
| SPIN card miolo (cantos inf) | ~60-63 |
| SPIN CTA card claro | **60** (era 36) |
| SPIN rodapé: faixa sup-dir 60 · bloco branco 80 (3 cantos, inf-esq reto) | ✓ |
| Dicas card soft topo (cantos inf) | **50** (era 40) |
| Dicas card branco corpo | **43** (era 30) |
| Dicas CTA card claro | **54** (era 36) |
| Doma Motiva card | **44** (era 28) |
| Inimigo em Comum: bloco branco **24** · bloco soft **26** | (eram 34/30) |
| Narrativa card | **20** (era 24) |
| Certo e Errado cards | 43-45 ✓ |
| Produtividade foto | **48**, canto sup-esq RETO ('0 48 48 48') |
| Cliente Novo foto/badge | conferir ao usar |

Regra: novo bloco arredondado → medir o raio no modelo (mesma técnica); registrar na ficha. Padrão visual Doma tende a raios GENEROSOS (40-60), não 28.

## 21. Seta DIRECIONAL ↘ = `SetaDoma` (componente ÚNICO, Patrick 2026-07-17)

Toda flecha direcional (↘ em badge) em QUALQUER post Doma usa o componente compartilhado `SetaDoma` (`templates/components/_base/components.tsx`). Nunca redesenhar seta à mão por categoria.

Geometria oficial (iterada com Patrick por print, aprovada):
- viewBox `0 0 100 100`, `strokeWidth 13`, `fill:none`.
- Arestas: `strokeLinecap="butt"` (pontas RETAS) + `strokeLinejoin="miter"` + `strokeMiterlimit="10"` (ponta PONTUDA). ⚠️ Exceção ao §16 (que usa round) — a seta direcional é butt/miter.
- **Ordem de desenho**: haste PRIMEIRO (atrás), riscas laterais DEPOIS (por cima) — cabeça cobre a ponta da haste.
- Haste central: `M22 22 L76 76` (tip 76, encaixa no V). Riscas laterais compridas: `M24 78 Q53 72 78 78 Q72 53 78 24`.
- Props `cor` (default `#fff`) · `size` (default 74).

Uso: `<SetaDoma />` (badge escuro) · `<SetaDoma cor={C.grafite} size={96} />` (badge claro/soft).
Aplicado: inimigo-em-comum, doma-institucional (271). NÃO vale p/ nav horizontal "ARRASTA →" nem ícone de gráfico/crescimento.

## 22. ENCAIXE DE TEXTO — medir ANTES de codar, ajustar COM confirmação (Patrick 2026-07-21)

Regra OBRIGATÓRIA em toda peça nova ou recriação. Antes de escrever qualquer `.tsx`, para CADA
bloco de texto de CADA slide, calcular o encaixe e reportar ao usuário. Nunca descobrir que
"não coube" só depois de renderizar.

### 22.1 Cálculo obrigatório (por bloco)
1. **Largura útil** do bloco em px = largura do card/coluna − paddings (medida no modelo, RULES §0).
2. **Chars por linha** ≈ `larguraÚtil / (fontSize × 0.52)` (TT Lakes, corpo regular; bold ≈ 0.54).
3. **Nº de linhas** = quebrar o texto real por palavra dentro desse limite (não estimar por total/chars).
4. **Altura ocupada** = `nºLinhas × fontSize × lineHeight` + gaps entre parágrafos.
5. **Comparar** com a altura útil do bloco de fundo (altura do card − paddings − altura de tab/badge sobreposto).
6. Reportar: `bloco | fs | linhas | altura ocupada | altura disponível | folga`.

### 22.2 Ordem das saídas quando NÃO cabe
Sempre nesta ordem, e **sempre perguntando ao usuário antes de aplicar**:
1. **Reduzir fontSize** do bloco (mantendo o layout do modelo) — preferível quando a diferença é ≤ 20%.
2. **Aumentar o número de linhas** subindo/descendo o bloco dentro da área livre.
3. **Ajustar o bloco de fundo ao texto** (card/pílula/faixa cresce ou encolhe) — só quando o
   modelo permite bloco de altura variável.
4. **Encurtar a copy** — última opção, e a copy revisada volta pro usuário aprovar.

❌ PROIBIDO (anti-padrões já cometidos):
- Encolher card/header pra "compensar" conteúdo magro em categoria de layout FIXO (isso é o §caso Dicas).
- Deixar `overflow: hidden` cortar texto silenciosamente. Se o bloco corta, é bug, não estilo.
- Aplicar qualquer um dos ajustes acima **sem confirmar** com o usuário.

### 22.3 Blocos de fundo que se ajustam ao texto
Quando o modelo mostra o bloco acompanhando o texto (tab/pílula/badge com largura de conteúdo,
card de altura variável), implementar como **hug content**: `width: fit-content` / `height: auto`
+ padding medido no modelo — em vez de largura/altura fixa em %. Registrar na ficha da categoria
quais blocos são FIXOS e quais são HUG.

### 22.4 Reporte obrigatório ao usuário
Antes de codar, apresentar a tabela de encaixe e a pergunta:
> "Bloco X: o texto dá N linhas (fs F) e ocupa Hpx numa área de Dpx. Proponho <ajuste>. Confirma?"

Só codar após o OK. Depois de renderizar, `analyzer-pos-render` revalida com a mesma conta.

## 23. NEGRITO = peso 500 (Patrick 2026-07-21)

Negrito de texto Doma é **`500` (TT Lakes Medium)**, não 600/700/800. Medido contra o POST 186:
tab fs38 → traço 4px · fecho fs73 → 6px · CTA fs67 → 6px, com regular em 4px.
**Ratio-alvo bold/regular ≈ 1.5×** na espessura do traço. Peso 700 dava 2.5× (virava black).

- `TextoRico boldWeight={500}` · `fontWeight: 500` em títulos/tabs/labels · regular segue `400`.
- Onde havia `800`/`900`, descer para `600` — nunca acima.
- Validar por MEDIÇÃO de traço (mediana dos runs horizontais de tinta numa faixa bold vs uma
  regular do mesmo fontSize, comparadas às mesmas faixas do modelo). Nunca a olho.

Aplicado: `troque-por-isso`. Demais categorias: ver live-rule `2026-07-21-bold-peso-500.md` (pendente).

## 24. lineHeight e HIERARQUIA de texto — copiar do modelo, não improvisar (Patrick 2026-07-21)

Erro real: os cards do miolo ficaram com "cara de bloco único" porque o reforço tinha quase o mesmo
corpo do texto principal e o espaçamento entre blocos era um terço do modelo. Duas regras:

**24.1 — `lineHeight` costuma ser FIXO em px, não relativo.** No POST 186 o spacing medido é
66/65/67px com fontSize variando entre 58, 55 e 54: o espaçamento NÃO acompanha o corpo (é assim
que a ferramenta de design da agência trabalha). Medir o delta entre os tops das linhas do modelo e
aplicar em px (`lineHeight: '66px'`). lineHeight relativo desalinha todos os blocos de uma vez.

**24.2 — Medir a HIERARQUIA, não só o corpo do texto principal.** Para cada card, listar o fontSize
de CADA papel (principal / título / nota-reforço / item de lista) e a razão entre eles. No POST 186
o reforço é **40** contra **58** do principal — 0.69×. Se a recriação usa 50 contra 52, a hierarquia
morre mesmo com as posições certas.

**24.3 — Gap entre blocos é medido, não estimado.** Delta entre o top da última linha de um bloco e
o top da primeira do seguinte, menos o lineHeight. No POST 186 dá ~70px nos cards e ~90px no CTA.

Validação: comparar a LISTA DE TOPS das linhas do render com a do modelo (mesma faixa y). Devem
bater dentro de ~5px. Ver ficha `troque-por-isso.md` para o caso completo.
