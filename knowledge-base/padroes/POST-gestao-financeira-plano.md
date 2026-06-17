# Plano — POST `gestao-financeira` (carrossel novo, 9 slides)

> Carrossel "7 erros na gestão financeira em pequenas lojas". Tema = ERROS COMUNS / GESTÃO FINANCEIRA.
> Categoria base = **Dicas Carrossel** (família POST 246/133/193). Componente: `v2/categorias/dicas/Dicas.tsx`.

## Modelos de referência
- POST 246 (margem de lucro, 9 slides) — fonte primária do template (capa/miolo/CTA).
- POST 193 (Trento, slide 2) — referência da faixa "ARRASTA PRO LADO" SEM card soft (alternativa).
- POST 133 (ótica) — confirmou que internos podem NÃO ter "ARRASTA" (foto full-bleed).

## Cores medidas (HEX, fonte: pixel exato do modelo 246-1)
| Bloco | Cor | Observação |
|---|---|---|
| Fundo manga | `#F4BB35` | dominante |
| Soft (highlight título + faixa ARRASTA) | `#F8DD6B` | |
| **Watermark "DOMa" topo** | **`#F2B02C`** | ⚠️ **mais ESCURA que fundo** (não mais clara!) |
| Card branco corpo | `#FFFFFF` | |
| Grafite (texto/logo) | `#1F1F1F` | |
| Sub-soft (header miolos) | `#F8DD6B` | mesma do highlight da capa |

## Faixa "ARRASTA PRO LADO →"
- **Onde**: SÓ na capa (slide 1). Miolos e CTA não têm.
- **Layout**: faixa soft `#F8DD6B` ocupando os 8.8% inferiores do canvas, com `borderTopLeftRadius/borderTopRightRadius: 40` e base tocando a borda.
- **Texto**: "ARRASTA PRO LADO →" em **caixa alta**, `fontSize 38`, `fontWeight 400` (regular), `letterSpacing 4`, cor grafite.
- **Seta `→`**: mesmo peso do texto (regular 400), **gap ~12px** entre "LADO" e "→". ⚠️ Erro anterior: seta em bold + gap 18.

## Estrutura slide-a-slide

### Slide 1 — `DicasCapa` (capa)
- **Título** (esq): `"7 ERROS\nNA GRANA"` — 2 linhas, cada uma em caixa highlight soft (`#F8DD6B`), fontSize 78 bold grafite.
- **Subtítulo** (dir-inf): `["que", "travam o", "**caixa", "**da sua loja"]` — fontSize 50, bold só nas linhas com `**` prefix.
- **Ícones** (centro): `_dicas246-icones.png` (cifrão + gráfico cadente — reusados do POST 246; tema bate).
- **Watermark topo**: "DOMa" em `#F2B02C` (mais escura).
- **Faixa inferior**: "ARRASTA PRO LADO →" (regular).

### Slides 2-8 — `DicasMiolo` (7 erros) — **header padrão 36.5% / número 200 / título 50**
Padrão: card soft topo (full-width, 36.5% altura, cantos inf 40) com número GIGANTE esquerda + título bold (3-4 linhas) à direita; card branco abaixo (L11.7% T36.6% W76.6% H52.5%) com corpo (fontSize 40 regular).

| # | Erro (3-4 linhas) | Corpo |
|---|---|---|
| 01 | Misturar conta\nda loja com\na conta pessoal | clássico: caixa da loja paga mercado de casa → ninguém sabe quanto a empresa lucra de verdade |
| 02 | Não saber a\nmargem real\nde cada\nvenda | vender muito não é lucrar muito; sem CMV + imposto + cartão + frete = aposta |
| 03 | Vender no\nfiado sem\nnenhum\ncontrole | fiado não é venda — é empréstimo sem juros; sem controle vira problema de caixa |
| 04 | Estoque\nparado\nvirando\nprejuízo | mercadoria parada = dinheiro travado; encalhado custa espaço + validade + custo de oportunidade |
| 05 | Comprar\nsem orçamento\nfechado pra\nestoque | promoção do fornecedor tenta — mas só faz sentido se cabe no caixa; impulso vira juros |
| 06 | Ignorar o\nfluxo de\ncaixa do\nmês | lucro não é dinheiro em caixa; lucrar no papel e quebrar na sexta sem grana acontece |
| 07 | Decidir tudo\nsem olhar\nnenhum\nnúmero | "acho que vende bem" / "acho que sobrou" → quem tem número decide rápido e erra menos *(sem julgar)* |

### Slide 9 — `DicasCta` (fechamento + bordão Doma)
- **Texto**: "Loja pequena **não quebra** por faturar pouco. Quebra por **não saber pra onde o dinheiro foi.**\n\nCom o ERP da **Doma**, cada venda, cada compra e cada recebimento aparece em tempo real.\n\n**Domine seu negócio em um único lugar.**" *(bordão oficial)*
- **Selo grafite** no canto sup-dir (asset oficial).
- **Logo DOMa** wordmark rodapé centralizado.

## Bullets do corpo
- "–" (traço) — bate com POST 246-3 (medido).

## Voz (vs `voz-sigadoma.md`)
- Tom dominante: **explicativo** + **provocativo**.
- Bordão fechamento: **"Domine seu negócio em um único lugar."**
- Vocabulário usado: dominar, controle, lucro, vendas, decidir, números.
- ❌ Removido: "achismo é luxo de quem não liga pro próprio dinheiro" (julgador); "crédito barato do bairro inteiro" (coloquial demais).

## Render
- Todos via `render-still.sh gestao-financeira-N` (scale2→Lanczos, sem franja).
- IDs registrados em `remotion-doma/src/Root.tsx`.

## Estado/erros corrigidos vs primeira versão
| Erro v1 | Fix |
|---|---|
| Watermark `#F5C24A` (mais clara) | `#F2B02C` (medido, mais escura) |
| Header compacto 28% / 150 / 44 | Padrão 36.5% / 200 / 50 (densificar título) |
| "ARRASTA": seta bold + gap 18 | seta regular 400 + gap 12 |
| "DOMa" em prosa (slide 9) | "Doma" (regra de marca) |
| Voz julgadora no 07 | reescrito sem julgar |
| CTA sem bordão | "Domine seu negócio em um único lugar." |
