# Arquitetura — plugin `marketing-doma`

Diagrama do fluxo completo e responsabilidades de cada camada.

## 🗺️ Visão geral

```
┌─────────────────────────────────────────────────────────────────┐
│                  USUÁRIO (marketing — leigo)                     │
│                                                                  │
│   "Quero post sobre gestão de estoque"                          │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
                  ┌──────────────────────┐
                  │  /marketing-doma     │   slash command master (UX guiada)
                  │  (commands/...)      │
                  └──────────┬───────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │  SKILL MASTER                │  skills/marketing-doma/SKILL.md
              │  marketing-doma              │  → roteia por intenção
              └────┬──────────────────┬──────┘
                   │                  │
        roteamento por             se brainstorm
        categoria                  invoca
                   │                  │
                   ▼                  ▼
       ┌──────────────────┐   ┌──────────────────┐
       │  SUB-SKILL       │   │  AGENT           │
       │  <categoria>     │   │  ghostwriter-doma│
       │  (15 categorias) │   │  (Task tool)     │
       └────────┬─────────┘   └──────────────────┘
                │
                │  consulta
                │     │
                ▼     ▼
       ┌──────────────────┐
       │ KNOWLEDGE-BASE   │  voz-sigadoma.md / design-system.md
       │ (identidade +    │  RULES + 15 fichas de categoria
       │  padrões + live) │  live-rules (auto-melhoria)
       └──────────────────┘
                │
                │
                ▼
       ┌──────────────────┐
       │ TEMPLATE BASE    │  templates/plano-base/<cat>.tpl.md
       │ + STILL SNIPPET  │  templates/still-snippets/<cat>.tpl.tsx
       └────────┬─────────┘
                │
                │  scripts/new-post.sh
                ▼
       ┌──────────────────┐
       │ PLANO PREENCHIDO │  templates/planos/POST-<nome>-plano.md
       └────────┬─────────┘
                │
                │  invoca antes de codar
                ▼
       ┌──────────────────┐
       │ AGENT            │  validador-marca (Task)
       │ validador-marca  │  → BLOQUEIA / AVISO / OK
       └────────┬─────────┘
                │ aprovado
                ▼
       ┌──────────────────┐
       │ COMPONENT TSX    │  templates/components/<cat>/<Comp>.tsx
       │ (fonte verdade)  │  ← editar AQUI
       └────────┬─────────┘
                │
                │  scripts/sync-components.sh
                ▼  (idempotente cp -u)
       ┌──────────────────┐
       │ HOST REMOTION    │  remotion-doma/src/v2/categorias/<cat>/
       │ (cópia working)  │  remotion-doma/public/oficial/icones/fontes/
       └────────┬─────────┘
                │
                │  bash remotion-doma/render-still.sh <id>
                ▼  (scale 2 → Lanczos, anti-franja)
       ┌──────────────────┐
       │ PNG renderizado  │  remotion-doma/out/<id>.png
       └────────┬─────────┘
                │
                │  scripts/compare-all.sh (opcional, se há modelo)
                ▼
       ┌──────────────────┐
       │ FIDELIDADE       │  SSIM + % pixels iguais + MAE
       │ (audit)          │  veredito ≥85% / refinar
       └────────┬─────────┘
                │
                │  /publish-checklist
                ▼
       ┌──────────────────┐
       │ PUBLICA          │  Instagram / redes
       └──────────────────┘

         Auto-melhoria
              ↓
       Se descobre padrão novo durante o fluxo:
       → scripts/auto-rules-learn.sh
       → grava live-rules/<data>-<topic>.md + commit no sub-repo.
```

## 📋 Camadas

### 1. UI (CLI)
- `/marketing-doma` — fluxo principal guiado (UX leigo).
- `/marketing-doma-setup` — instalação inicial.
- `/new-post`, `/new-carrossel`, `/brainstorm`, `/render`, `/audit-post`, `/publish-checklist` — atalhos.

### 2. Orquestração (Skill master)
- `skills/marketing-doma/SKILL.md` — roteia por intenção.
- Decide qual sub-skill carregar + quais agentes invocar.

### 3. Especialistas (Sub-skills)
- 15 sub-skills, 1 por tipo de post + `brand-rules` + `novo-post-from-scratch`.
- Cada uma sabe: padrão visual, voz, props do componente, anti-padrões.

### 4. Agentes (LLM como serviço)
- `ghostwriter-doma` — gera copy 3 ângulos.
- `validador-marca` — audita plano.
- `editor-conteudo` — refina copy.
- `render-orchestrator` — render batch + audit.

### 5. Knowledge-base (referência)
- `identidade/` — voz + design-system.
- `padroes/` — RULES + 17 fichas + INDICE + PLANO.
- `assets-index/` — catálogo logos/cores/fontes/ícones/grafismos.
- `live-rules/` — auto-melhoria.

### 6. Templates (parametrizáveis)
- `plano-base/<cat>.tpl.md` — plano modelo por categoria.
- `still-snippets/<cat>.tpl.tsx` — snippet de Still pronto.
- `planos/` — planos preenchidos (resultado de `new-post.sh`).
- `components/` — componentes Remotion (fonte de verdade).

### 7. Assets (binários)
- `assets/oficial/` — 31 logos/selos/sub-marcas.
- `assets/icones/` — 50 ícones bicolores.
- `assets/fontes/` — TT Lakes + Kanit.

### 8. Scripts (utilitários)
- `start-remotion.sh` — hook auto-start (idempotente).
- `sync-components.sh` — plugin → host.
- `install-deps.sh` — instalação completa.
- `new-post.sh` — scaffold por categoria.
- `render-batch.sh` — render N IDs.
- `compare-all.sh` — audit batch CSV.
- `auto-rules-learn.sh` — captura live-rule.
- `validate.sh` — 5 checks E2E.
- `discover-models.sh` — detecta modelos novos.

### 9. CI (qualidade)
- `.git-hooks/pre-commit` — roda validate antes de cada commit.
- `core.hooksPath = .git-hooks` configurado no sub-repo.

## 🔄 Ciclo de auto-melhoria

```
1. Claude detecta padrão novo (ex: cor watermark invertida).
2. scripts/auto-rules-learn.sh:
   - Cria live-rules/<data>-<slug>.md com Sintoma+Medição+Regra.
   - Commit no sub-repo do plugin.
3. Próxima sessão: a regra está disponível na knowledge-base.
4. Periodicamente: dev promove live-rules → RULES principais.
```

## 🛡️ Segurança git

- Hook `~/.claude/hooks/block-dangerous-git.sh` bloqueia operações destrutivas.
- Whitelist por path/repo em `~/.claude/git-push-whitelist` libera push pro plugin.
- `--force main|master` SEMPRE bloqueado (sem bypass).

## 📦 Distribuição

- Sub-repo git próprio em `.claude/plugins/marketing-doma/.git/`.
- Remote GitLab: `git@gitlab.com:valem_grupo/marketing-doma.git`.
- Equipe clona com `git clone <remote> .claude/plugins/marketing-doma`.
- `/marketing-doma-setup` configura tudo no projeto host.
