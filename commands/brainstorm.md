---
description: "Brainstorm de copy — invoca o agente ghostwriter-doma com a pauta dada e devolve 3 ângulos (provocativo, explicativo, motivacional) na voz Doma. Use quando o usuário tem pauta mas não tem o conteúdo escrito."
---

# `/brainstorm <pauta>` — 3 ângulos na voz Doma

Atalho que invoca o agente `ghostwriter-doma` com a pauta dada e devolve 3 variantes de copy.

## Uso
```
/brainstorm <pauta>
```

Exemplos:
- `/brainstorm gestão de estoque pra lojista de bairro`
- `/brainstorm carrossel sobre margem real de cada venda`
- `/brainstorm card motivacional sobre virada de mês`

## O que faz

Invoca via `Task`:
```ts
Task({
  subagent_type: "ghostwriter-doma",
  prompt: "Pauta: <pauta>. Gere 3 ângulos (provocativo, explicativo, motivacional)."
})
```

## Saída esperada

```markdown
### Ângulo 1 — Provocativo
Hook: "..."
Corpo: ...
CTA: ...

### Ângulo 2 — Explicativo
...

### Ângulo 3 — Motivacional
...
```

Usuário escolhe um → o copy pode ser passado para `/new-post` ou `/marketing-doma` (passo conteúdo).

## Quando usar
- Tem pauta, falta copy.
- Quer ver 3 ângulos antes de decidir.

## Quando NÃO usar
- Já tem copy escrita → `/marketing-doma` direto.
- Quer só revisar copy existente → usar agente `editor-conteudo` via Task.
