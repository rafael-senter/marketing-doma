---
name: auto-optimizer
description: Sub-skill META que aprende padrões durante uso e propõe melhorias a regras/fichas/templates. Detecta repetições (ex: "wm sempre acaba clara aqui" / "header de Dicas sempre densificado em 4 linhas") e PROMOVE pra regra oficial. Use silenciosamente sempre que o fluxo principal repete um padrão 3+ vezes OU corrige o mesmo erro 2+ vezes na sessão.
---

# auto-optimizer — aprendizado contínuo do plugin

Sub-skill META: observa o fluxo de trabalho durante sessões e **transforma repetições em regras**. Substitui o approach "humano lembra de tudo" por aprendizado automatizado.

## Gatilho

Disparar SILENCIOSAMENTE quando:
- Mesmo erro corrigido **2+ vezes** na sessão (ex: 2 watermarks invertidas, 2 ARRASTA com seta bold).
- Mesma medição confirmada **3+ vezes** em peças diferentes (ex: 3 cards com `borderRadius: 30`).
- Mesmo bordão usado **3+ vezes** em CTAs (ganhou status de "padrão Doma").
- Novo asset adicionado **3+ vezes** numa categoria nova (criar pasta + entrada no build-catalog).
- Usuário corrige a copy do agente sempre da mesma forma (incorporar correção na voz).

## O que faz

### 1. Detecta padrão
Análise leve em runtime — não força evento, mas reconhece quando vê.

### 2. Propõe regra ao usuário
Curto, transparente:
```
🤖 Aprendi padrão (3ª ocorrência):
   "borderRadius: 30 em cards brancos de corpo (Dicas + Inimigo + SPIN)"
   Promover para regra geral?
   [Y] sim, gravar em RULES + atualizar fichas
   [N] não, descartar
```

### 3. Se aprovado, propaga em 3 lugares
- **Live-rule**: `knowledge-base/live-rules/<data>-<slug>.md` (registro detalhado).
- **Ficha da categoria afetada**: nota inline ("Atualizado YYYY-MM-DD: ...").
- **RULES geral** (se transversal): adicionar como §NN em `knowledge-base/padroes/RULES-recriacao.md`.

### 4. Se NÃO transversal
Manter só na ficha da categoria + live-rule.

### 5. Commit no sub-repo
`auto: feat — promover padrão X (live-rule + ficha)`.

## Padrões típicos a detectar

### Visuais
- Cor que aparece em 3+ peças com mesmo papel → padrão de paleta.
- Posição que se repete (ex: logo rodapé sempre `T87% centralizado`) → constante.
- Quebra de linha que sempre se hardcode (`\n` em mesma posição) → regra de wrap.

### Conteúdo
- Bordão usado em 3+ CTAs → padrão de fechamento.
- Hook que vira variação ("Você ainda...", "Sabe quanto...") → template de hook.
- Bullet que se repete por categoria → confirmar padrão (`–` Dicas, `›` T6, `•` T8).

### Voz
- Palavra que o usuário sempre troca após geração → trocar default do ghostwriter.
- Tom que sempre é ajustado pra mais provocativo → ajustar tom dominante da categoria.

### Tecnológicos
- Mesma cor de watermark medida em peças da mesma família → atualizar default do componente.
- Mesmo erro de typscript / lint → adicionar ao validador.

## Anti-padrões (a EVITAR)

- ❌ Promover padrão de **1 ocorrência** (precisa 2-3 mínimo).
- ❌ Modificar RULES global por padrão da **1 categoria** (vira específico, não geral).
- ❌ Sobrescrever regra existente sem perguntar.
- ❌ Promover regra sem registrar EVIDÊNCIA das ocorrências (precisa rastreabilidade).

## Output formato

Sempre que promove regra:
```markdown
# Auto-optimizer report — YYYY-MM-DD

## Padrão detectado: <nome>
**Ocorrências:**
- Sessão X — peça A (linha L)
- Sessão X — peça B (linha L)
- Sessão X — peça C (linha L)

**Regra extraída:** ...
**Aplicar em:** [lista de categorias OU "geral"]
**Promovido para:**
- live-rules/<data>-<slug>.md
- knowledge-base/padroes/<categoria>.md (seção "Atualizações")
- (se geral) knowledge-base/padroes/RULES-recriacao.md §NN

**Commit:** `<hash>`
```

## Integração com outras subskills

- **asset-ingester**: se 3 assets do mesmo tipo chegam (ex: 3 fotos cliente novas), auto-optimizer propõe criar pasta nova `assets/fotos-clientes/`.
- **brand-rules**: se nova violação detectada 2+ vezes, propõe atualizar lista de proibidas em `brand-rules`.
- **lint-voz**: nova frase proibida detectada → adicionar nas regras do `scripts/lint-voz.sh`.

## Comandos relacionados

- `bash scripts/auto-rules-learn.sh` — interface manual (usuário força gravar regra).
- Auto-optimizer = automatização do mesmo conceito.

## Filosofia

O plugin marketing-doma é **vivo**. Cada sessão deve deixar ele um pouco MAIS preciso (regra nova) ou MAIS limpo (regra simplificada). Auto-optimizer é o motor desse processo.

⚠️ NÃO substitui revisão humana — toda regra promovida deve passar por confirmação curta (`Y/N`) antes de commit.
