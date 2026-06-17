---
description: "Atalho para renderizar 1 ou N stills via render-still.sh (scale 2 → Lanczos, anti-franja). Aceita ID único ou range (prefix + N)."
---

# `/render <id...>` ou `/render <prefix> <N>` — render rápido

Atalho para `bash scripts/render-batch.sh` do plugin.

## Uso

### 1 still
```
/render gestao-financeira-1
```

### N stills (lista)
```
/render gestao-financeira-1 gestao-financeira-2 gestao-financeira-3
```

### Range (prefix + N)
```
/render gestao-financeira 9
```
Renderiza `gestao-financeira-1` até `gestao-financeira-9`.

## O que faz
- Chama `bash .claude/plugins/marketing-doma/scripts/render-batch.sh <args>`.
- Que chama `remotion-doma/render-still.sh` (scale 2 → Lanczos automático).
- Output: PNGs em `remotion-doma/out/<id>.png`.

## Erros comuns
- **ID não registrado em Root.tsx** → adicionar Still com defaultProps.
- **Componente não existe** → rodar `sync-components.sh`.
- **Studio precisa estar rodando?** → não, render-still.sh usa CLI direta.

## Próximos passos sugeridos
- `/audit-post <id> <modelo>` — comparar com modelo.
- `/publish-checklist` — checklist final pré-publicar.
