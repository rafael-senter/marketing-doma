---
description: "Compara render vs modelo via layout-mapper compare.py — devolve fidelidade SSIM + % pixels iguais + MAE. Para batch, passar CSV."
---

# `/audit-post <id> <modelo>` ou `/audit-post --csv <arquivo>` — fidelidade comparativa

## Uso

### Comparar 1 par
```
/audit-post gestao-financeira-1 doma-brand/tipos-de-posts/tipos\ de\ posts/Dicas\ Carrossel/margem\ de\ lucro/POST\ 246\ 1.png
```

### Batch via CSV
```
/audit-post --csv /tmp/audit.csv
```
Onde `/tmp/audit.csv`:
```
gestao-financeira-1,doma-brand/.../POST 246 1.png
gestao-financeira-2,doma-brand/.../POST 246 2.png
...
```

## O que faz

### 1 par
Chama:
```bash
.venv-instagram/bin/python .claude/skills/layout-mapper/scripts/compare.py \
  --modelo "<modelo>" --render "remotion-doma/out/<id>.png"
```

Devolve `[fidelidade] X% (SSIM=Y, pixels iguais=Z%, MAE=W)`.

### Batch
Chama `bash scripts/compare-all.sh <csv>` — saída em tabela markdown.

## Interpretação

| Fidelidade | Veredito |
|---|---|
| ≥ 95% | ✅ pixel-perfect (peça pura tipográfica/code) |
| 85-94% | ✅ alto (com foto/grafismo — teto inerente) |
| 75-84% | ⚠️ médio — investigar elementos |
| < 75% | ❌ baixo — refinar antes de publicar |

## Limitações
- Foto/grafismo extraído tem teto ~94% (JPEG recompress).
- Watermark gigante decorativa puxa SSIM pra baixo mesmo correto.

## Próximos passos
- Slides < 85%: invocar `validador-marca` + revisar pixel-by-pixel.
- Slides 85-94%: aceitar e seguir (teto esperado).
