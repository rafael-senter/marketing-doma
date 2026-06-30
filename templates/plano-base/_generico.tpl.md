# Plano — POST {{NOME}}

> Categoria: {{CATEGORIA}}
> Criado: {{DATA}}
> Status: 🟡 RASCUNHO — preencher antes de codar.

## 1. Modelos de referência
- Lista 2-3 modelos REAIS dessa categoria em `doma-brand/tipos-de-posts/tipos de posts/<categoria>/`.
- Se categoria nova: documentar referência externa + validar com Patrick ANTES.

## 2. Cores medidas (HEX) — TODOS os blocos
- Fundo: `#F4BB35` (manga padrão — confirmar pixel exato no modelo).
- Watermark: `#F2B02C` (⚠️ MAIS ESCURA que o fundo — medir).
- Cards: `#F8DD6B` (soft) / `#FFFFFF` (branco) / `#EFEFEE` (claro) — medir cada um.
- Grafite texto: `#1F1F1F` / `#212121` — medir.
- Outros: ...

## 3. Estrutura slide-a-slide

| # | Tipo | Componente | Tema | Conteúdo | Notas |
|---|---|---|---|---|---|
| 1 | capa | XxxCapa | hook | "..." | ... |
| 2 | miolo | XxxMiolo | ... | "..." | ... |
| N | CTA | XxxCta | fecho | "..." + bordão Doma | ... |

## 4. Faixa "ARRASTA PRO LADO" (se carrossel)
- Onde: SÓ capa / todos miolos / nenhum.
- Peso seta: regular (400).
- Gap entre "LADO" e "→": 12px.

## 5. Bullets do corpo
- `–` (família Dicas)
- `›` (T6 lista interna)
- `•` (T8 institucional)
- escolher: ___

## 6. Voz
- Tom dominante: provocativo / explicativo / motivacional.
- Bordão de fechamento escolhido: "..."
- Vocabulário próprio: dominar, controle, lucro, resultados, vendas.

## 7. Validação pré-render
- [ ] `validador-marca` rodou no plano.
- [ ] Plano aprovado pelo Patrick/marketing.
- [ ] Snippet de Still gerado em `/tmp/{{NOME}}-still-snippet.tsx`.
- [ ] Snippet colado em `remotion-doma/src/Root.tsx`.

## 8. Render
- `node remotion-doma/render-still.mjs {{NOME}}-1`
- (etc. pra cada slide)

## 9. Audit (se há modelo)
- `compare.py --modelo X --render Y` → fidelidade ≥ 85% (teto ~95% quando há foto/grafismo).

## 10. Próximos passos pós-aprovação
- Atualizar ficha da categoria.
- Se padrão NOVO descoberto: gravar `knowledge-base/live-rules/{{DATA}}-<topic>.md`.
- Commit no sub-repo do plugin se aprendeu algo reaproveitável.
