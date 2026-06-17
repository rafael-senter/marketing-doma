---
name: novo-post-from-scratch
description: Protocolo para criar TIPO DE POST NOVO (categoria que não bate com nenhuma das 12 mapeadas). Segue as 6 etapas do PROTOCOLO obrigatório (CLAUDE.md). NÃO pula medição. Use quando o usuário pedir algo que não bate com nenhuma sub-skill, ou pedir explicitamente "criar tipo novo de post".
---

# Novo Post From Scratch

Quando o pedido **não bate com nenhuma das 14 categorias** mapeadas (Frase em Pílulas, SPIN, Dicas, etc.), siga este protocolo rigoroso. **NÃO pular etapas** — pular = repetir os erros que essas regras foram criadas pra evitar.

## Quando usar
- Tema/formato que não existe em `knowledge-base/padroes/INDICE.md`.
- Adaptação grande de categoria existente que pode virar nova categoria.

## Protocolo (6 etapas — ver CLAUDE.md §"PROTOCOLO obrigatório ANTES DE CRIAR POST NOVO")

### 1. Definir CATEGORIA + escolher MODELOS DE REFERÊNCIA
- Buscar em `doma-brand/tipos-de-posts/tipos de posts/` se há modelo perto.
- Se nenhum → buscar **referência fora** (outra marca, briefing do Patrick) e validar com ele ANTES.

### 2. MEDIR os modelos (RULES §0/§0.1)
Cada tipo de slide:
- Cores HEX por bloco (incluindo watermark — **mais ESCURA tom-sobre-tom**).
- bbox → %.
- Fonte sizes.
- Faixa de navegação (se carrossel).
- Bullets do corpo.
- Logo/selo no rodapé.

### 3. MAPEAR voz (`knowledge-base/identidade/voz-sigadoma.md`)
- 3 tons + bordão escolhido.
- Banco de perguntas provocativas.
- ❌ Frases proibidas.

### 4. ESCREVER plano `templates/planos/POST-<nome>-plano.md`
Template completo:
```markdown
# Plano — POST <nome>
## Categoria: <nova> | Modelos de referência: <listar>
## Cores medidas (HEX) — TODOS os blocos
## Faixa "ARRASTA PRO LADO" (se carrossel)
## Bullets: – / › / •
## Voz: tom + bordão
## Estrutura slide-a-slide
| Slide | Tipo | Tema | Texto | Notas |
| ...
```

### 5. VALIDAR com Patrick ANTES de codar
- Apresentar plano completo, pedir aprovação.
- Invocar `validador-marca` para checar regras de marca.

### 6. CODAR + render + audit
- Adicionar Stills no Root.tsx.
- Render via `render-still.sh` (scale 2 → Lanczos).
- Audit comparativo + iterar.

## Após validado e renderizado

**OBRIGATÓRIO:**
1. Criar sub-skill nova em `subskills/<categoria-nova>/SKILL.md` (basear nas existentes).
2. Atualizar `skills/marketing-doma/SKILL.md` (tabela de roteamento) — adicionar a nova entrada.
3. Atualizar `plugin.json` (`embedded_subskills`).
4. Criar ficha em `knowledge-base/padroes/<categoria>.md`.
5. Atualizar `knowledge-base/padroes/INDICE.md`.
6. Commit no sub-repo do plugin.

## Anti-padrões
- ❌ Pular medição porque "é parecido com X já existente" — variações pequenas viram bugs.
- ❌ Codar antes de ter plano aprovado.
- ❌ Validar visualmente em vez de medir comparativamente.
