# Padrão de Post — "Frase em Pílulas" (Doma)

Recriação medida de `instagram-sigadoma/images/sigadoma_DWO5_TLDG1w_1.jpg`.
Componente: `../../templates/components/frase-em-pilulas/FrasePilulas.tsx`. Render: `node render-still.mjs padrao-frase-pilulas`.
Status: ~90% (validado por medição/visual).

## Conceito
Uma frase quebrada em ~5 **pílulas** (cápsulas) empilhadas em coluna, levemente
entrelaçadas (larguras diferentes criam o zigue-zague). As de cima = contorno fino
grafite com interior transparente; a última = pílula sólida amarelo soft. Selo "14 anos"
no topo, watermark "DOMa" gigante de fundo, logo DOMa no rodapé.

## Medições (canvas 1080×1350)
- **Fundo:** `#F4BB36` CHAPADO (medido nos 4 cantos, sem gradiente).
- **Watermark "DOMa" (TÉCNICA DEFINITIVA — forma oficial + cor exata):**
  - **Forma** = logo OFICIAL recortada via **CSS mask**: `<div>` com `WebkitMaskImage`/`maskImage`
    = `oficial/logotipo-principal-branco.png` (alpha = forma das letras) + `maskSize:'100% 100%'`,
    `maskRepeat:'no-repeat'`. → "D" com perna esquerda fechada/correta (não "U deitado").
  - **Cor** = `backgroundColor` do `<div>` na **COR EXATA medida `#F2B12F`**. Validado: sai
    `#F2B12F` exato. NÃO usar opacity nem blend (sai cinza/distorce).
  - ⚠️ **PROIBIDO:** logo `-cor` (amarela → SOME sobre fundo amarelo); `mixBlendMode:multiply`
    (distorce o "D"); logo grafite com opacity (sai cinza `#E8B234`, não a cor certa).
  - **Quantidade/posição:** EXATAMENTE **4 repetições** no **MEIO** (tops y 16.3/33.9/51.6/69.2%).
    **Topo (0–16.3%) e base (83.6–100%) ficam LIMPOS** — NÃO cobrir o post inteiro.
  - **Tamanho:** `width:102%` + `aspectRatio:'1767/322'` → letras GRANDES sangrando as bordas,
    gap ~3.2%, passo 17.6%. Posição absoluta (`top` por repetição), não flex.
- **Selo "14 anos":** PNG OFICIAL `oficial/selo-14anos-4.png` (variante caixa grafite,
  "14" branco + "anos" branco). Centro (50%, 18.9%). O PNG tem ~15% de padding
  transparente → usar `width:15.3%` p/ o conteúdo visível dar ~13% (140px).
- **5 pílulas** — TODAS com a MESMA largura e left (medido): **left 24.6%, width 50.7%**.
  | # | texto | cy | ângulo |
  |---|-------|----|--------|
  | 1 | Tenha o **controle** | 32.5% | **-5.0°** |
  | 2 | e a **liberdade** que | 43.0% | **+4.0°** |
  | 3 | você merece na | 53.5% | **-5.5°** |
  | 4 | gestão da sua | 64.0% | **+1.5°** |
  | 5 | **EMPRESA.** | 74.5% | **-4.5°** (SÓLIDA soft #FADD68) |
  - Passo entre centros ~10.5%, altura da pílula 9.2% (espaçamento confortável, leve sobreposição).
  - Ângulos alternam sinal (zigue-zague) e são notáveis (±4-5.5°), não sutis demais.
  - ⚠️ ERRO QUE EU COMETI E CORRIGI: pensei que as pílulas tinham **larguras diferentes** (merece/gestão estreitas) e ângulos fortes (±5°). ERRADO. Medindo as extremidades limpas: **todas têm largura igual (~50.7%)**, e o "desalinhamento" vem de **inclinação SUTIL** (±2-3.6°, medida pelo dy entre ponta esq/dir) + **sobreposição** (altura 10.8% > passo 10%). Não exagerar o ângulo nem variar a largura.
  - **z CRESCENTE**: a pílula de BAIXO vai por cima da de cima (2 sobre 1, 3 sobre 2, ...).
    pílula 1 = menor z, EMPRESA (5ª) = maior. Confirmado pela zona de contato no modelo
    (a borda da pílula inferior corta a superior).
  - A última (EMPRESA) sobe um pouco (cy 73% vs passo regular) → sobrepõe mais a penúltima.
  - Borda: 2.5px grafite `#1F1F1F`. **Interior = COR DO FUNDO `#F4BB36` (NUNCA transparente)** — tapa a watermark.
  - Texto: TT Lakes, regular (400), só palavra-chave **bold**, fontSize 48, centralizado.
- **Logo rodapé:** "DOMa" grafite oficial, cx 50%, y~94.5%.

## Cores
| Elemento | Cor |
|----------|-----|
| Fundo | `#F4BB36` |
| Watermark (logo) | `#F2B12F` (CSS mask da logo branca + backgroundColor exato) |
| Pílula sólida (última) | `#FADD68` (soft) |
| Bordas/texto/logo | `#1F1F1F` (grafite) |
| Selo "14 anos" | PNG oficial (grafite + branco) |

## Refino pendente
- Entrelaçamento das pílulas pode ser um pouco mais pronunciado (no modelo a borda
  de uma cruza mais visivelmente a vizinha).

## Limites pra criação nova (§19 — calculados do componente, 2026-07-16)
| Bloco | fs | Máx chars | Risco |
|---|---|---|---|
| Pílula (linha) | 48 lh1.0 | ~20 por pílula | pílula longa estoura a margem; inclinação sutil por linha (dy), não rotation grande |
- 4-6 pílulas máx (modelo usa 5). Selo 14 anos oficial 15.3% width.
- **Story: SEM prop `story`** — implementar ao usar (padrão SPIN).
