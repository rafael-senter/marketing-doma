# Roadmap — extração de assets do manual oficial

Documenta assets que existem nos PDFs/docx da Doma mas ainda **não foram extraídos** pro plugin. Lista o que falta + protocolo de extração.

## Estado atual

### Já no plugin (sincronizado via `sync-components.sh`)

| Categoria | Quantidade | Local |
|---|---|---|
| Logos/wordmark | 3 cores × 2 disposições = 6 | `assets/oficial/logotipo-*` |
| Selos | 3 cores + 4 variantes 14 anos = 7 | `assets/oficial/selo-*` |
| Sub-marcas | 5 × (PNG+SVG) = 10 | `assets/oficial/submarca-*` |
| Complementos/grafismos | 5 | `assets/oficial/complemento-*` |
| Taglines | 3 | `assets/oficial/tagline-*` |
| Ícones bicolores | 50 | `assets/icones/` |
| Fontes | 6 (TT Lakes Regular/Medium/DemiBold/Bold/ExtraBold/Black) | `assets/fontes/` |
| **TOTAL** | **87 arquivos** | — |

### Documentos com possíveis assets adicionais

Em `doma-brand/manual/`:
- `MANUAL_IDENTIDADE_DOMA.pdf` (26 MB) — 51 páginas renderizadas como PNG em `paginas/`.
- `DOMA_discurso-e-tom-de-voz.pdf` (58 MB) — voz institucional.
- `Persona-e-publico-alvo.docx` — personas.

## A extrair (TODO)

### 🔴 Alta prioridade

1. **Logo "M" isolado (app icon / símbolo solo)** — manual menciona "símbolo M" como variante separada da wordmark. Provável uso: favicon, app icon, watermark gigante (POSTs onde só o M aparece, ex DPOp0uaiC7J_1).
   - **Onde:** páginas do manual com construções geométricas do M.
   - **Caminho final:** `assets/oficial/simbolo-m-{cor,grafite,branco,amarelo}.png`

2. **Variantes coloridas dos complementos** — atual tem `complemento-fundo-amarelo` + `complemento-fundo-grafite`. Possível ter variantes mais.
   - **Onde:** páginas "Aplicações em fundos" do manual.

3. **Selos institucionais** (não-14-anos) — possivelmente há selos de "Cliente Doma", "Parceiro", "Software para gestão".
   - **Caminho final:** `assets/oficial/selo-cliente-doma.png`, `assets/oficial/selo-parceiro.png`.

### 🟡 Média prioridade

4. **Grafismos do corte diagonal 45°** isolados (corte derivado do M) — atualmente reproduzido em CSS por slide. Ter PNG/SVG limpos ajuda.
   - **Caminho final:** `assets/grafismos/corte-diagonal-{amarelo,grafite}.svg`

5. **Padrões/textures de fundo** — manual pode ter padrões repetidos (M em loop, geometria).
   - **Caminho final:** `assets/grafismos/padrao-{nome}.png`

6. **Ícones temáticos adicionais** — atual tem 50. Manual pode ter mais (set específico por vertical: Varejo/Indústria/Moda).
   - **Caminho final:** `assets/icones/icone-51-*.png` em diante.

### 🟢 Baixa prioridade

7. **Mockups de produto/ERP** — prints da tela do ERP em diferentes contextos.
   - **Caminho final:** `assets/mockups/erp-{dashboard,pdv,financeiro}.png`

8. **Fotos do banco oficial Doma** (Patrick, equipe, escritório) — quando autorizado.
   - **Caminho final:** `assets/fotos/{tema}.jpg`

## Protocolo de extração

### 1. Identificar o asset no PDF

Abrir `MANUAL_IDENTIDADE_DOMA.pdf` em viewer (ou usar páginas já em `paginas/pag-NN.png`).
Marcar página + região (bbox em px) do asset.

### 2. Extrair (3 opções)

#### Opção A — `pdfimages` (CLI, mais limpo se asset for imagem embarcada no PDF)
```bash
pdfimages -png -j MANUAL_IDENTIDADE_DOMA.pdf /tmp/manual-img
ls /tmp/manual-img*  # ver todos
```

#### Opção B — `convert` (ImageMagick) — recorte de página específica
```bash
convert MANUAL_IDENTIDADE_DOMA.pdf[15] -crop 800x600+100+200 /tmp/asset.png
```

#### Opção C — `rembg` (remove fundo se asset está sobre fundo colorido)
```bash
.venv-instagram/bin/python -m rembg i /tmp/raw.png /tmp/sem-fundo.png
```

### 3. Padronizar nome

`<categoria>-<descricao-kebab>-<variante>.<ext>`

Ex: `simbolo-m-grafite.png`, `padrao-m-loop.png`, `mockup-erp-pdv.png`.

### 4. Mover pra `assets/<subpasta>/`

```bash
mv /tmp/simbolo-m-grafite.png .claude/plugins/marketing-doma/assets/oficial/
```

### 5. Adicionar metadata em `scripts/build-catalog.py`

Editar `OFICIAL_META` dict, adicionar o slug + descrição.

### 6. Re-rodar build-catalog

```bash
.venv-instagram/bin/python scripts/build-catalog.py
```

→ Atualiza `assets/CATALOGO.json` + READMEs.

### 7. Sync pro host

```bash
bash scripts/sync-components.sh
```

→ Asset disponível em `remotion-doma/public/oficial/<arquivo>.png`.

### 8. Commit + push

```bash
git add assets/ scripts/build-catalog.py
git commit -m "feat(assets): adicionar simbolo-m em 4 cores"
```

## Script stub (futuro)

`scripts/extract-from-pdf.sh` — wrapper que automatiza extração de uma página/bbox específica do PDF e padroniza nome.

```bash
# uso futuro:
bash scripts/extract-from-pdf.sh \
  --pdf doma-brand/manual/MANUAL_IDENTIDADE_DOMA.pdf \
  --page 8 \
  --crop 100,200,800,600 \
  --name simbolo-m-grafite \
  --destino assets/oficial/
```

## Quando rodar a extração

Não automatizado — é trabalho de curadoria:
1. Patrick decide quais assets adicionar (não tudo do manual precisa).
2. Identifica páginas/regiões relevantes.
3. Roda o protocolo acima.
4. Atualiza catálogo.

Cron `cron-discover.sh` detecta PNG-modelo (em `doma-brand/tipos-de-posts/`) mas NÃO detecta novos assets do manual — esse fluxo é manual por design.

## Status (atualizar conforme avança)

| Item | Status | Data | Notas |
|---|---|---|---|
| Símbolo M isolado | ⬜ TODO | — | Alta prioridade |
| Selos institucionais (não-14anos) | ⬜ TODO | — | Média |
| Grafismos corte diagonal SVG | ⬜ TODO | — | Média |
| Mockups ERP | ⬜ TODO | — | Baixa — nanobanana cobre |
| Ícones adicionais | ⬜ TODO | — | Baixa |
