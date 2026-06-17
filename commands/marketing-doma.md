---
name: marketing-doma
description: "Marketing Doma — fluxo guiado de criação de post/carrossel/story. Pergunta tipo de post, conteúdo (ou brainstorm), gera plano medido, renderiza, audita."
---

# `/marketing-doma:marketing-doma` — criar peça nova

**Fluxo direto. Cada passo abaixo é UMA pergunta ao usuário OU UMA ação. Sem desvio.**

## Pré-check (silencioso, 1 comando)

```bash
test -d "$(pwd)/remotion-doma" || { echo "⚠️  Rode primeiro: /marketing-doma:marketing-doma-setup"; exit 0; }
```

Se falhou: avisar e parar.

## Passo 1 — perguntar tipo de post

`AskUserQuestion` com 14 opções:

📌 Cards: 1) Frase em Pílulas · 2) Mapa Clientes · 3) Certo e Errado · 4) Cliente Novo · 5) Doma Motiva · 6) Inimigo em Comum · 7) Narrativa · 8) Produtividade · 9) Funções do Sistema · 10) Doma Institucional

📚 Carrosséis: 11) Dicas (9 slides) · 12) Carrossel Clientes (8 slides) · 13) SPIN (6 slides)

🆕 14) Categoria nova (protocolo from-scratch)

## Passo 2 — perguntar conteúdo

`AskUserQuestion`:
1. Já tenho copy pronta
2. Quero brainstorm (invocar agent `ghostwriter-doma`)

## Passo 3 — gerar plano

Rodar `bash ~/.claude/plugins/marketing-doma/scripts/new-post.sh <categoria> <nome>`.

Resultado: `templates/planos/POST-<nome>-plano.md` + snippet em `/tmp/<nome>-still-snippet.tsx`.

## Passo 4 — preencher plano (interativo)

Editar `templates/planos/POST-<nome>-plano.md` substituindo `<preencher>` com respostas do usuário.

## Passo 5 — validar (silencioso)

Invocar agent `validador-marca` no plano. Se BLOQUEIA: mostrar ao usuário + parar.

## Passo 6 — colar snippet + render

1. Adicionar Still no `remotion-doma/src/Root.tsx` (cat snippet, anexar antes do `</>` final).
2. Rodar `bash ~/.claude/plugins/marketing-doma/scripts/sync-components.sh`.
3. Rodar `bash remotion-doma/render-still.sh <nome>-N` para cada slide.

## Passo 7 — análise + correção automática (OBRIGATÓRIO)

Invocar Task tool com agent `analyzer-pos-render`. Ele:
- Roda validador-marca + compare.py + lint visual + medição de equilíbrio.
- Aplica fixes triviais (fontSize, padding, cores) DIRETO no componente do plugin.
- Sync + re-render.
- Auto-commit das mudanças no plugin global.

Reportar ao usuário:
- ✅ N fixes aplicados.
- ⚠️ Findings não-triviais (decisão humana).
- 📈 Métricas (fidelidade ANTES → DEPOIS).

## Passo 8 — mostrar resultado

Listar PNGs em `remotion-doma/out/<nome>-*.png` + perguntar se aprova.

Se `analyzer-pos-render` fez mudanças no plugin:
- Plugin global agora tem regra/componente atualizado.
- Próxima sessão usa versão melhorada automaticamente.

## Anti-padrões

- ❌ Ler arquivos do plugin antes de cada passo.
- ❌ Inspecionar Root.tsx, components.tsx etc.
- ❌ Validar cores/voz fora do agent `validador-marca`.
- ❌ Pedir ao usuário pra escolher entre componentes Remotion (escolhe categoria, plugin sabe o resto).
