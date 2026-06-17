---
name: dicas-carrossel
description: Carrossel numerado de "erros comuns / dicas" — 1 capa + N miolos numerados (01-09) + 1 CTA. Família POST 246 (margem), 133 (ótica), 193 (Trento). Use quando o usuário pedir "carrossel de erros", "lista numerada", "dicas em carrossel", "X erros comuns sobre Y".
---

# Dicas Carrossel

**Componente:** `remotion-doma/src/v2/categorias/dicas/Dicas.tsx`
- `DicasCapa` — slide 1
- `DicasMiolo` — slides 2-N (props `headerHeight`, `numeroSize`, `tituloSize` opcionais com defaults 36.5/200/50)
- `DicasMioloCompact` — variante com header 28% (raramente usada — preferir densificar conteúdo)
- `DicasCta` — slide final

**Ficha:** `../../../knowledge-base/padroes/dicas.md` (POST 246), `dicas-otica.md` (133), `dicas-trento.md` (193).

## Padrão visual

### Capa
- Fundo manga + **watermark "DOMa" gigante** topo (`#F2B02C` — mais ESCURA tom-sobre-tom).
- **Ícones line-art** centro (extraídos do modelo, PNG transparente).
- **Título** esquerda em caixas highlight soft (cada linha em uma caixa, fontSize 78 bold).
- **Subtítulo** dir-inf (string[], `**` prefix = bold).
- **Faixa inferior soft** "ARRASTA PRO LADO →" — seta REGULAR (mesmo peso do texto), gap 12px.

### Miolos
- **Card soft topo full-width** (36.5% altura, cantos inf 40) + número GIGANTE (fontSize 200, letterSpacing -6) + título bold direita (fontSize 50, 3-4 linhas DENSAS).
- **Card branco corpo** L11.7% T36.6% W76.6% H52.5% raio 30 — texto regular fontSize 40, bullets `–` (traço).
- ⚠️ Título com poucas linhas → header parece vazio. SEMPRE densificar pra 3-4 linhas; NÃO encolher o header.

### CTA
- Card soft alto (L9.3% T18.8% W81.4% H62.3% raio 36).
- Selo grafite circular sup-dir.
- Texto fontSize 44 regular.
- **Bordão Doma obrigatório** ("Domine seu negócio em um único lugar." ou afim).
- Logo DOMa rodapé centralizado.

## Voz
- Provocativa + explicativa.
- ❌ Julgar ("achismo é o luxo de quem não X").
- ❌ Coloquial demais ("crédito barato do bairro").
- ✅ Bordão Doma no CTA OBRIGATÓRIO.

## Quando usar
- Educativo "X erros sobre Y", "Y dicas pra Z".
- Carrossel mais reutilizável da Doma (formato campeão).

## Anti-padrões
- ❌ Watermark `#F5C24A` clara (errado — deve ser `#F2B02C` escura).
- ❌ Seta `→` em bold com gap grande na faixa ARRASTA (regular + gap 12).
- ❌ DicasMioloCompact pra "compensar título curto" (densificar título!).
- ❌ Bullets `•` ou `›` (família 246 usa `–`).

## Props
```ts
DicasCapa: {titulo: string; subtitulo: string[]; icones: string}
DicasMiolo: {numero: string; titulo: string; corpo: string; headerHeight?: number; numeroSize?: number; tituloSize?: number}
DicasCta: {texto: string}
```

## Próximos passos
1. Variar tema (gestão de estoque, vendas, marketing).
2. Combinar com prova social (último slide = `mapa-clientes`).
3. Gerar versão MP4 (sequência de stills).
