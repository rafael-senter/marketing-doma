---
name: new-post
description: "Atalho — cria post novo SEM fluxo guiado. Usa scripts/new-post.sh para gerar plano + Still snippet da categoria escolhida. Para fluxo guiado completo (perguntas), use /marketing-doma."
---

# `/new-post <categoria> <nome>` — atalho

Cria scaffold de post novo direto, sem perguntas. Para usuário que já sabe categoria + nome.

## Uso
```
/new-post <categoria> <nome-do-post>
```

Exemplos:
- `/new-post dicas-carrossel gestao-estoque`
- `/new-post inimigo-em-comum aspas-vendas`
- `/new-post frase-pilulas frase-margem`

## Categorias suportadas
`dicas-carrossel` · `spin` · `frase-pilulas` · `inimigo-em-comum` · `doma-motiva` · `narrativa` · `produtividade` · `certo-e-errado` · `clientes` · `mapa-clientes` · `funcoes-sistema` · `doma-institucional` · `doma-carrossel-clientes`

Categoria desconhecida → usa template genérico + segue protocolo `novo-post-from-scratch`.

## O que faz

1. Roda `bash .claude/plugins/marketing-doma/scripts/new-post.sh <cat> <nome>`.
2. Gera:
   - `templates/planos/POST-<nome>-plano.md` (plano base preenchido)
   - `/tmp/<nome>-still-snippet.tsx` (snippet de Still pra colar em Root.tsx)
3. Mostra próximos passos.

## Quando usar
- Você já sabe qual categoria.
- Quer apenas o scaffold rápido para preencher manualmente.

## Quando NÃO usar
- Não sabe a categoria → use `/marketing-doma` (fluxo guiado pergunta o tipo).
- Quer brainstorm de copy → use `/brainstorm`.
