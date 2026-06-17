---
description: "Checklist final pré-publicar — confere render OK, validador-marca OK, copy revisada, hashtags, dimensões, formato. Útil pra última conferência antes do marketing postar."
---

# `/publish-checklist <id|prefix>` — checklist final pré-publicar

Última conferência antes de subir a peça pro Instagram/redes. Confere render + marca + voz + metadados.

## Uso
```
/publish-checklist <id>
/publish-checklist <prefix>     # cobre todos prefix-1..N do carrossel
```

## Checks

### Arquivo
- [ ] `remotion-doma/out/<id>.png` existe e tem 1080×1350 (vertical Instagram).
- [ ] Tamanho < 8 MB (limite Instagram).
- [ ] Sem franja sub-pixel (renderizado via `render-still.sh` scale 2 → Lanczos).

### Marca
- [ ] `validador-marca` retornou `LIBERA` ou `LIBERA COM AVISO`.
- [ ] Logo é PNG oficial (não fonte/SVG).
- [ ] "Doma" em prosa (não "DOMa" / "DOMA").
- [ ] Watermark mais ESCURA que fundo (tom-sobre-tom).

### Voz
- [ ] CTA com bordão Doma oficial (se carrossel).
- [ ] Sem julgar leitor.
- [ ] Sem anglicismo.
- [ ] Sem ataque a concorrente.

### Conteúdo
- [ ] Sem typo (passar revisão final).
- [ ] Quebras de linha respeitam contagem do modelo.
- [ ] Bullets corretos por categoria (`–` família Dicas, `›` T6, `•` T8).

### Caption + hashtags (para o post)
- [ ] Caption escrita (≤ 2200 chars Instagram).
- [ ] **Hashtags oficiais Doma**:
  ```
  #DomineSeuNegócio #DomineSuaGestão #sigadoma #lucratividade
  #gestaoempresarial #empreendedorismo #gestaofinanceira
  #sistemadegestao #erp #vendas #varejo
  ```
- [ ] CTA da caption alinhado com CTA da arte.
- [ ] Mix de hashtags: 1-3 grandes (>1M) · 3-5 médias (100k-1M) · 3-5 nicho (<100k).

### Carrossel
- [ ] Ordem dos slides correta.
- [ ] Capa = slide 1 (hook).
- [ ] CTA = último slide (Doma nomeada).
- [ ] Slides 1-N-1 com faixa "ARRASTA PRO LADO" se aplicável (geralmente só capa).

### Pós-publicação
- [ ] Salvar `out/<id>.png` em backup (cloud / drive da Doma).
- [ ] Registrar peça publicada em `instagram/data/sigadoma_posts_<ts>.json` (futuramente).
- [ ] Se descobriu padrão novo em runtime: gravar live-rule.

## Veredito

```
✅ LIBERA pra publicar
⚠️ LIBERA COM AVISO (revisar itens marcados)
❌ BLOQUEIA (corrigir antes)
```

## Comandos relacionados
- `/audit-post` — fidelidade vs modelo.
- `validador-marca` (Task) — regras de marca.
- `editor-conteudo` (Task) — refinar copy.
