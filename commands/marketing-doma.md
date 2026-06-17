---
name: marketing-doma
description: "Marketing Doma — fluxo guiado de criação de post/carrossel/story (UX leiga). Pergunta tipo de post, conteúdo (ou brainstorm), gera plano medido, renderiza, audita e ajuda a publicar."
---

# `/marketing-doma` — fluxo principal guiado

Skill MASTER do plugin `marketing-doma`. Conduz pessoa leiga pelo processo completo de criação de uma peça nova de marketing da Doma, **sem precisar saber programar**.

## Fluxo

### Passo 1 — Tipo de post
Apresentar menu (use `AskUserQuestion`):

```
Que tipo de post você quer criar?

📌 Cards únicos (1 imagem):
1. Frase em Pílulas — frase forte em caixas amarelas tortas
2. Mapa de Clientes — mapa do Brasil + selo % de cobertura
3. Certo e Errado — 2 cards X/✓ contrapostos
4. Clientes — foto + nome + cidade + "agora faz parte do time"
5. Doma Motiva — frase motivacional sobre foto
6. Inimigo em Comum — frase entre aspas + reflexão
7. Narrativa — foto + frase forte (estoque cheio / caixa vazio)
8. Produtividade — foto + sub-card escuro com frase
9. Funções do Sistema — mockup ERP + texto + balões
10. Doma Institucional — frame tipográfico ou device + ERP

📚 Carrosséis (múltiplos slides):
11. Dicas (numerado, 9 slides) — erros comuns sobre um tema
12. Doma / Carrossel Clientes — capa + logos de cliente + fecho
13. SPIN — perguntas Provocativas → Implicação → Necessidade
14. Outro tipo — categoria nova (vai criar do zero seguindo protocolo)
```

### Passo 2 — Conteúdo ou brainstorm
Pergunta: **"Você já tem o conteúdo, ou quer brainstorm?"**

- **Já tem** → pergunta cada campo (título, corpo dos miolos, CTA) e vai compondo o plano.
- **Brainstorm** → invocar agent `ghostwriter-doma` com a pauta + 3 ângulos na voz Doma. Volta com sugestões; o usuário escolhe ou pede ajuste.

### Passo 3 — Carregar sub-skill da categoria
Cada categoria tem sub-skill em `skills/marketing-doma/subskills/<categoria>/SKILL.md` com:
- Padrão de cores medido.
- Estrutura slide-a-slide.
- Componente Remotion validado em `templates/components/`.
- Voz/tom adequado.

### Passo 4 — Gerar plano + validar
- Compor `templates/planos/POST-<nome>-plano.md`.
- Mostrar plano completo ao usuário (capa, miolos, CTA com cores, voz, faixa ARRASTA).
- Pedir aprovação.

### Passo 5 — Codar + renderizar
- Adicionar Stills no `remotion-doma/src/Root.tsx` (snippet em `templates/Root.tsx.snippet`).
- Rodar `bash remotion-doma/render-still.sh <id>` para cada slide.
- Mostrar PNGs renderizados.

### Passo 6 — Audit comparativo
- Se há modelo direto (recriação): rodar `layout-mapper compare.py --modelo X --render Y`.
- Mostrar fidelidade (SSIM + pixels iguais) e o que melhorar.

### Passo 7 — Iterar ou aprovar
- Se aprovado: rodar `/publish-checklist`.
- Se ajustar: refazer passo do conteúdo OU do plano.

## Sub-agentes invocáveis (Task tool)
- `ghostwriter-doma` — escreve copy na voz Doma.
- `validador-marca` — checa regras de marca antes de renderizar.
- `editor-conteudo` — revisa copy (bordão Doma, sem julgar, vocabulário).
- `render-orchestrator` — render em batch + audit.

## Princípios
- **Leigo first**: cada pergunta é em português direto. Sem jargão técnico.
- **Auto-melhoria**: ao descobrir padrão novo, gravar em `knowledge-base/live-rules/`.
- **Reuso máximo**: sempre verificar se há template/componente já validado.
- **Validar antes de renderizar**: rodar `validador-marca` em todo plano antes de codar.

## Exemplo de invocação

```
/marketing-doma
```

Ou com tema direto:
```
/marketing-doma quero um carrossel sobre gestão de estoque
```

---

**Referências:**
- `CLAUDE.md` do plugin — regras de marca + auto-melhoria.
- `knowledge-base/identidade/voz-sigadoma.md` — voz institucional.
- `knowledge-base/padroes/INDICE.md` — 12 categorias mapeadas.
