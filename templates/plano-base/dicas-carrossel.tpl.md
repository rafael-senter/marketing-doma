# Plano — POST {{NOME}}

> Categoria: dicas-carrossel (família POST 246/133/193)
> Criado: {{DATA}}
> Componente: `templates/components/dicas/Dicas.tsx` (DicasCapa + N× DicasMiolo + DicasCta)

## 1. Tema central
**Tema:** <preencher — ex: 7 erros na gestão financeira de pequenas lojas>
**Vertical:** varejo / indústria / moda / pdv / atacado
**Público-alvo:** empresário PME

## 2. Cores (DICAS — fixas, já medidas)
- Fundo: `#F4BB35` (manga)
- Soft (highlight título + faixa ARRASTA + header miolos + card CTA): `#F8DD6B`
- **Watermark "DOMa" topo capa: `#F2B02C`** (⚠️ MAIS ESCURA tom-sobre-tom)
- Card branco corpo: `#FFFFFF`
- Grafite texto/logo: `#1F1F1F`

## 3. Faixa "ARRASTA PRO LADO"
- SÓ na capa (slide 1).
- Faixa soft (8.8% altura, cantos sup arredondados 40).
- Texto + seta: peso REGULAR 400, gap 12px. Letterspacing 4.

## 4. Bullets do corpo
- `–` (traço) — padrão da família Dicas.

## 5. Estrutura slide-a-slide

### Slide 1 — DicasCapa
- **Título** (esq, fontSize 78 bold, highlight soft, cada linha em uma caixa):
  ```
  N ERROS
  NA <TEMA>
  ```
- **Subtítulo** (dir-inf, string[], `**` prefix = bold):
  ```
  ["que", "<verbo>", "**<termo-chave>", "**da sua loja"]
  ```
- **Ícones**: PNG line-art transparente — extrair do modelo de referência OU reusar `_dicas246-icones.png` se tema combinar (cifrão + gráfico).

### Slides 2-N — DicasMiolo (cada erro)
- **Header padrão 36.5%** (NÃO usar Compact 28%).
- **Número** GIGANTE (200px, letterSpacing -6) esquerda.
- **Título** bold direita — **3-4 linhas DENSAS** (densificar conteúdo, NÃO encolher header).
- **Corpo** branco fontSize 40 regular — bullets `–`, bold seletivo na palavra-chave.

| # | Número | Título (3-4 linhas) | Corpo |
|---|---|---|---|
| 01 | "01" | "Linha 1\nLinha 2\nLinha 3" | "**Frase de abertura.**\n\nExplicação 4-6 linhas..." |
| 02 | "02" | ... | ... |
| ... | | | |

### Slide N+1 — DicasCta
- Card soft alto (L9.3% T18.8% W81.4% H62.3% raio 36).
- Selo grafite sup-dir (asset oficial).
- Texto fontSize 44 regular + bold em 1-2 termos.
- **Bordão Doma obrigatório** — escolher:
  - "Domine seu negócio em um único lugar."
  - "Domine o seu negócio antes que ele domine você."
  - "Assuma as rédeas do seu negócio."
- Logo DOMa wordmark rodapé centralizado.

## 6. Voz
- Provocativa (capa hook) + explicativa (miolos) + bordão Doma (CTA).
- ❌ Sem julgar leitor. Sem coloquial pesado. Sem anglicismo.

## 7. Validação
- [ ] `validador-marca` no plano.
- [ ] Patrick/marketing aprova plano.
- [ ] Snippet colado em Root.tsx.

## 8. Render
```bash
for i in 1 2 3 4 5 6 7 8 9; do
  node remotion-doma/render-still.mjs {{NOME}}-$i
done
```

## 9. Audit (se há modelo)
Comparar com POST 246 / 133 / 193 mais próximo do tema:
```bash
.venv-instagram/bin/python .claude/skills/layout-mapper/scripts/compare.py \
  --modelo "<modelo>.png" --render remotion-doma/out/{{NOME}}-1.png
```

## 10. Live-rules / docs
- Se descobrir cor/voz/padrão novo: `knowledge-base/live-rules/{{DATA}}-<topic>.md`.
- Atualizar ficha `knowledge-base/padroes/dicas.md` se aplicável.
