# SPIN — medidas reais re-medidas (fontes estavam menores que o modelo)

**Data:** 2026-07-16
**Descoberto em:** POST rede-lojas (Patrick reprovou disposição: "muito ruim")
**Sintoma:** peças SPIN novas saíam com fontes menores e blocos com buraco vs modelos POST 243/251.
**Medição (numpy no POST 243, 1080×1350):**
- Capa título: fs≈60 lh1.12 (cap 42-46px, passo 66-70) — componente usava 52.
- Capa texto: fs≈40 lh1.3 (cap 28, passo 50-57), **CENTRADO verticalmente no bloco** — componente usava fs30 colado no topo (padding-top 54). Pior defeito visual.
- Miolo: fs44 lh1.3 (passo 57) ✓; card normal 0→**80.8%**; texto x-left = card + ~100px (padding era 86).
- cardClaro: fs **44 igual ao miolo** (passo 57!) — componente reduzia pra 37. Card 0→**84.4%**.
- CTA: texto E destaque fs **44** lh1.3 (passo 57-58); texto top ≈21.5%; sub-card T**61%** H**16.4%**; card claro 7→93%.
- Capa: foto **40%→87.1%** (não 34/54 — ficava escondida sob os blocos); faixa 87.1→100.
**Regra:**
1. Fontes SPIN = 60 (título capa) / 40 (texto capa) / 44 (miolo, cardClaro, CTA, destaque) — NUNCA reduzir fonte pra caber conteúdo; re-quebrar ou usar prop fontSize com justificativa (cardClaro denso 6+ itens → 40).
2. Texto de bloco = centrado verticalmente (alignItems center), nunca colado no topo com padding fixo.
3. Larguras de linha (fs44, card miolo padding 100): máx ~25 chars; capa título fs60: máx ~13; capa texto fs40: máx ~18; CTA fs44 (width 63%): máx ~28.
4. Story 9:16 SPIN: miolo/CTA = card FLUTUANTE centrado com altura em px ≈ do feed (mesma densidade), 4 cantos arredondados; capa = blocos 0→30%, foto 30→87%, faixa 87→100; botão seta bottom 60px.
**Aplicar em:** spin (componente já corrigido nesta data); conferir mesmas patologias nas outras 11 categorias.
