# Análise pós-criação OBRIGATÓRIA — o conteúdo novo NUNCA é o modelo

**Data:** 2026-07-16
**Descoberto em:** POST rede-lojas (Patrick: "disposição muito ruim" — a peça seguia a ficha, mas o RESULTADO renderizado não tinha sido auditado contra o modelo)
**Sintoma:** seguir a ficha da categoria não basta. O conteúdo criado é sempre DIFERENTE do modelo (mais/menos texto, linhas mais longas, mais itens) → mesmo com componente correto, a peça sai quebrada: fonte que estoura, linha órfã, bloco vazio, texto colado no topo, colisão com sub-card.

**Regra (vale pra TODAS as categorias, feed E story):**

## 1. ANTES de codar — dimensionar o conteúdo novo
- Contar linhas/itens do conteúdo novo vs o modelo. Diferença grande → planejar: re-quebrar, ajustar fontSize documentado (nunca inventar), ou densificar/cortar copy.
- Respeitar limites de chars/linha da ficha (ex. SPIN: título 60→~13 chars; texto capa 40→~18; miolo 44→~25; cardClaro 40→~29; CTA 44→~28). Categoria sem limites documentados → medir no primeiro render e GRAVAR na ficha.

## 2. DEPOIS de renderizar — auditar CADA slide gerado (não só o 1º)
Checklist por slide, feed E story:
- [ ] **Órfãs**: nenhuma linha com 1 palavra sozinha (quebra manual estourou o wrap).
- [ ] **Overflow/colisão**: texto não corta na borda do card nem colide com sub-card/selo/faixa.
- [ ] **Centralização/equilíbrio**: texto centrado onde o modelo centra; span do texto ≈ proporção do modelo (sem buraco >15% inexplicado; texto curto no CTA = buraco feio → densificar copy).
- [ ] **Fontes = ficha** (nunca "diminuí pra caber" sem registrar).
- [ ] **Alternância/sequência de modos de cor** correta (categorias alternantes, ex. SPIN 1-2-1-2).
- [ ] **Rodapé/faixas/selo/watermark** conforme medição da ficha.
- [ ] **Dims do PNG**: feed 1080×1350; story 1080×1920 (`render-still.sh <id>-story 1080 1920` — default esmaga!).
- [ ] **Comparação lado a lado** com o slide-modelo do mesmo tipo (abrir os dois; divergência estrutural → medir com numpy, não a olho).

## 3. Iterar até limpar
Encontrou defeito → corrigir → sync (da RAIZ do host + validar com grep) → re-render → re-auditar o slide. Só apresentar ao usuário peça 100% auditada.

## 4. Aprendeu limite/regra nova → GRAVAR
Ficha da categoria + live-rule. A ficha é viva: cada peça nova refina os limites.

**Aplicar em:** TODAS as categorias, toda criação nova (não-recriação), feed + story. O agente `analyzer-pos-render` executa parte disso, mas a responsabilidade é do fluxo principal — analyzer não substitui a auditoria slide a slide.
