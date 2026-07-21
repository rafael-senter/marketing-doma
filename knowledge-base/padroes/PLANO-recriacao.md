# PLANO COMPLETO de recriação — categorias "tipos de posts"

Recriar TODOS os posts-modelo de `doma-brand/tipos-de-posts/tipos de posts/`, um por um,
detalhe por detalhe (estrutura, ângulos, tamanho, fundo, cores), com máxima precisão.
Método obrigatório: `doma-brand/PADROES/RULES-recriacao.md` (medir→codar→validar, render
por `render-still.sh`). Cada peça pronta vira ficha em `PADROES/<categoria>.md` + componente
em `../../templates/components/`.

**Fluxo por peça:** (1) medir o modelo por pixel; (2) codar com os números; (3) renderizar
(scale2+Lanczos); (4) comparar lado a lado; (5) iterar até ~95%+; (6) documentar a ficha.
Cada peça é validada com o Patrick antes de seguir.

---

## INVENTÁRIO (12 categorias)

### Organização v1 / v2 (definida com o Patrick)
- **v1** (`remotion-doma/src/v1/`) = tentativas AUTOMÁTICAS antigas (lotes 1-3, modelos, etc.) — NÃO ficaram boas. ARQUIVADAS (não renderizam; Root antigo preservado em `v1/RootV1.tsx`).
- **v2** (`../../templates/components/`) = peças MANUAIS, feitas uma por uma com medição (RULES). É o que vale. `Root.tsx` registra SÓ a v2.
- **Infra** (raiz `src/`): `theme.ts`, `components.tsx`, `Root.tsx`.

### ✅ Na v2 (prontos, validados)
- **Frase em Pílulas** (DWO5_TLDG1w) → `templates/components/frase-em-pilulas/FrasePilulas.tsx` (~94%) — **PADRÃO-OURO do método** (todas as técnicas novas).
- **Mapa de Clientes** (DSdIG_FkuI4_2) → `templates/components/mapa-de-clientes/MapaClientes.tsx` (~95-96%, REVISADO: mapa 892×932 medido, DF cinza, rótulos em posição medida c/ PE/AL/ES/RJ à direita, fonte+letterSpacing).
- **Certo e Errado** (POST 247 / 256) → `templates/components/certo-e-errado/CertoErrado.tsx` (~96%) — refeito com método novo: ícones X/✓ em SVG, raio 45, watermark vertical DO/MA via CSS mask, cores por população. Ficha: `certo-e-errado.md`.

### ⬜ A recriar (ordem sugerida: simples → complexo)

**Cards únicos (1 imagem cada) — mais rápidos:**
1. **Clientes** — `LAYOUT CLIENTE NOVO - FEED.png` + variante (1) [2 imgs, mesmo layout]
2. **Doma Motiva** — POST 242, POST 250 [2 cards motivacionais]
3. **Inimigo em Comum** — POST 244, POST 252 [2 cards]
4. **Narrativa** — POST 265, POST 272 [2 cards]
5. **Produtividade** — POST 254, POST 270, POST 277 [3 cards]
6. **Funções do Sistema** — POST 127, 201, 207, 248, 266, 273 [6 cards, provável mockup do ERP]
7. **Doma (institucional)** — POST 115, 178, 257, 271 [4 cards]

**Carrosséis (vários slides) — mais trabalhosos:**
8. **Dicas Carrossel / margem de lucro** — POST 246 (9 slides)
9. **Dicas Carrossel / ótica** — POST 133 (9 slides)
10. **Dicas Carrossel / Trento** — POST 193 (8 slides)
11. **Doma / Carrossel clientes** — POST 205 (8 slides)
12. **SPIN** — POST 243 (6 slides) + POST 251 (6 slides)
13. **Troque Isso / Por Isso** — POST 186 (9 slides) 🆕 categoria nova, 2026-07-21

---

## STATUS (atualizar conforme avança)

| # | Categoria | Posts | Tipo | Status |
|---|-----------|-------|------|--------|
| — | Frase em Pílulas | DWO5 | card | ✅ ~94% (padrão-ouro) |
| — | Mapa de Clientes | DSdIG | card | ✅ visual ~95% / SSIM 85% teto (contorno SVG ≠ desenho; rótulos via layout-mapper) |
| — | Certo e Errado | 247, 256 | card | ✅ ~96% (refeito v2: ícones SVG, raio 45, wm vertical DO/MA) |
| 1 | Clientes | LAYOUT CLIENTE NOVO (×2) | card | ✅ ~90% SSIM / visual ~95% (2 variantes; ficha clientes.md; watermark outline §18) |
| 2 | Doma Motiva | 242, 250 | card | ✅ 242 93.1% · 250 95.7% (foto+card+selo; ficha doma-motiva.md) |
| 3 | Inimigo em Comum | 244, 252 | card | ✅ 244 89.7% · 252 90.6% (badge seta ↘; quebras de linha hardcoded p/ bater wrap do modelo; ficha inimigo-em-comum.md) |
| 4 | Narrativa | 265, 272 | card | ✅ 265 95% (foto+card+selo) · 272 86.6% (moedas 3D extraídas via rembg) |
| 5 | Produtividade | 254, 270, 277 | card | ✅ 3/3 (270 89% [card re-extraído W78.2% → pílula "tempo parado." com ponto completo] · 277 91% · 254 foto operário nanobanana + SENAI extraído) |
| 6 | Funções do Sistema | 127, 201, 207, 248, 266, 273 | card | ✅ 6/6 (nanobanana: tela ERP extraída do modelo → mockup phone/laptop fotorrealista + overlays Remotion medidos. Componente flexível `templates/components/funcoes-sistema/FuncoesSistema.tsx`) |
| 7 | Doma | 115, 178, 257, 271 | card | ✅ 4/4 (178/271 code-only tipográficos; 115 phone+menu e 257 notas R$ via nanobanana; `templates/components/doma-institucional/DomaInstitucional.tsx`) |
| 8 | Dicas/margem de lucro | 246 (9 slides) | carrossel | ✅ 9 slides (sistema numerado ERROS COMUNS; capa 89% · miolo 86-91% · CTA 82%; ficha dicas.md) |
| 9 | Dicas/ótica | 133 (9 slides) | carrossel | ✅ 9 slides (s5 95% · s7 98% · miolo 85-91% · capa 83% [fotos re-extraídas no rect do modelo]; fotos vitrine extraídas+pílulas soft re-tipadas; `templates/components/dicas-otica/Otica.tsx`) |
| 10 | Dicas/Trento | 193 (8 slides) | carrossel | ✅ 8 slides (87-94%; watermark bg extraído + fotos históricas/produtos recortadas; slides 1/6/8 puro-Doma; `templates/components/dicas-trento/Trento.tsx`) |
| 11 | Doma/Carrossel clientes | 205 (8 slides) | carrossel | ✅ 8 slides (miolo 93-94% logos extraídos+card recortado · capa 88% [fonte 58 → 6 linhas, texto inf 4 linhas, logo 70] · fecho 93%; `templates/components/doma-carrossel-clientes/CarrosselClientes.tsx`) |
| 12 | SPIN | 243 (6) + 251 (6) | carrossel | ✅ 12 slides (capa ~91% · miolo ~92% · CTA ~86%; ficha spin.md; 3 templates parametrizados) |

**Total:** ~14 peças-modelo (algumas com múltiplos slides) → ~69 imagens.

---

## Como conduzir (combinado com o Patrick)
- Um post por vez, detalhe por detalhe, validando cada um.
- Patrick diz quando iniciar cada peça.
- Padrão-ouro de qualidade = Frase em Pílulas (todos os detalhes medidos).

## 📚 DOCUMENTAÇÃO INCREMENTAL (obrigatória a cada peça)
A cada post montado — parte por parte — documentar as regras NOVAS aprendidas. Toda peça
ensina algo reaproveitável. Ao terminar cada uma, registrar em DOIS níveis:

1. **Regra específica da CATEGORIA** → na ficha `PADROES/<categoria>.md`:
   - o template fixo da categoria (o que se repete entre os posts dela) vs o que varia;
   - medições (bbox→%, cores, ângulos, sobreposição, fonte) de cada elemento;
   - como reproduzir os próximos posts da MESMA categoria reusando o componente.

2. **Regra REAPROVEITÁVEL (cross-categoria)** → nas `RULES-recriacao.md` (§ nova ou existente):
   - se a técnica serve para outras categorias (ex.: a técnica de watermark CSS-mask, o
     método de medir ângulo, tingir asset, ordem de z-index) → vira regra GERAL numerada;
   - registrar o ERRO cometido + a CORREÇÃO, para nunca repetir (como já feito §8-14).

3. **Componentes/utilitários reusáveis** → extrair para `../../templates/components/` ou
   `components.tsx` quando um elemento aparecer em 2+ categorias (ex.: badge SEMANAÇO,
   selo, balão de chat, pílula, watermark-tingida) → componente parametrizado.

Antes de iniciar cada peça nova: reler as fichas das categorias já feitas + RULES, pra
aplicar o que já foi aprendido (não recomeçar do zero). Ao fim, atualizar este PLANO
(status) + INDICE + STATUS-recriacao.md.
