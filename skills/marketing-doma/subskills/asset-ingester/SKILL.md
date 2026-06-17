---
name: asset-ingester
description: Detecta quando o usuário cola/envia uma imagem nova (foto de cliente, logo, mockup, grafismo, ícone) e GUIA o processo de catalogar no plugin marketing-doma. Identifica categoria automaticamente (foto/logo/grafismo/base nanobanana/ícone), pergunta dados (nome, uso, contexto), move pra pasta correta, atualiza scripts/build-catalog.py com metadata, rebuilds catalog, sync pro host. Use SEMPRE que o usuário enviar imagem nova durante sessão (especialmente novos clientes, novos assets).
---

# asset-ingester — captura de assets novos

Sub-skill especialista em **interpretar** imagens novas durante a sessão e **catalogar** no plugin. Crítica pro fluxo "marketing trouxe asset novo".

## Quando disparar

- Usuário cola/envia uma imagem (PNG/JPG/SVG).
- Usuário menciona "tem uma nova logo", "novo cliente entrou", "esse asset", "novo grafismo".
- Detector silencioso: se a sessão receber `<image>` ou anexo, considerar invocar.

## Fluxo

### 1. Identificar a CATEGORIA do asset
Pergunta direta ao usuário (com sugestão baseada no que vê):
- **Logo de cliente** (loja, marca terceiro) → `assets/cards-clientes/` (precisa virar card baked) OU `assets/oficial/_<cliente>-logo.png` se transparente.
- **Foto** (loja, equipe, produto, fábrica) → `assets/fotos/`.
- **Mockup/produto** (3D, device, embalagem) → `assets/bases-nanobanana/` (se gerado IA) ou `assets/grafismos/`.
- **Grafismo** (decoração, padrão, ícone temático) → `assets/grafismos/`.
- **Ícone bicolor** (set oficial Doma) → `assets/icones/icone-NN-<nome>.png`.
- **Fonte** → `assets/fontes/`.

### 2. Perguntar METADATA
- **Nome (slug)**: kebab-case sem espaço. Ex `loja-rentauto-curitiba`.
- **Tipo**: foto-cliente / foto-fabrica / logo / mockup / grafismo / ícone.
- **Cor predominante** (se grafismo): #HEX ou nome.
- **Uso recomendado**: 1 frase ("Foto da fachada da Rentauto — usar em peça cliente novo").
- **Fundo recomendado** (`usar_sobre`): manga / soft / grafite / branco / qualquer.
- **Fundo proibido** (`evitar_sobre`): se aplicável.

### 3. Renomear + mover
Renomear seguindo convenção:
- Foto cliente: `_<slug>-loja.jpg`
- Grafismo: `_<slug>.png`
- Logo: `<slug>-cor.png` / `-grafite.png` / `-branco.png`

Mover para a pasta correta dentro de `assets/`.

### 4. Adicionar entrada em `scripts/build-catalog.py`
Editar o dict apropriado:
- `OFICIAL_META` → logos/selos/sub-marcas/complementos/taglines.
- `BASES_NANOBANANA_META` → bases fotorrealistas.
- `ICONES_META` → ícones temáticos.
- `fotos_meta` / `graf_meta` (inline em `build()`) → fotos/grafismos.

Adicionar entrada com slug + metadata. Manter ordem alfabética.

### 5. Rebuild catalog
```bash
python scripts/build-catalog.py
```
Atualiza `CATALOGO.json` + READMEs.

### 6. Sync pro host
```bash
bash scripts/sync-components.sh
```
Copia asset novo pra `remotion-doma/public/oficial/`.

### 7. Confirmar ao usuário
Mostrar resumo:
- Arquivo: `<path>`
- Categoria: `<cat>`
- Disponível como: `staticFile('oficial/<arquivo>')` em componentes Remotion.

### 8. Se for LOGO DE CLIENTE — automatizar card baked
Se asset = logo de cliente novo (Patrick/marketing avisa "novo cliente"):
1. Perguntar cor de fundo do card.
2. Gerar `assets/cards-clientes/_205-card<slug>.png` automaticamente:
   - Canvas 1080×600 (proporção do card original).
   - Background cor do cliente.
   - Logo centralizado.
   - Cantos arredondados raio 40 baked.
3. Catalogar nova entrada.
4. Patrick pode adicionar em qualquer carrossel-clientes.

## Anti-padrões

- ❌ Aceitar imagem sem catalogar (vira "lixo" no projeto).
- ❌ Catalogar sem pedir metadata (não saber pra que serve depois).
- ❌ Nomear com espaço/acento (kebab-case só).
- ❌ Esquecer de sync pro host (asset não acessível em runtime).

## Auto-melhoria

Se ao catalogar descobrir que precisa de campo metadata NOVO (ex: "estilo: vintage", "ano: 2024"):
1. Gravar live-rule em `knowledge-base/live-rules/<data>-asset-meta-novo.md`.
2. Sugerir adicionar campo no build-catalog.py.

## Comandos relacionados
- `bash scripts/extract-from-pdf.sh` — extrair de PDF (manual Doma).
- `bash scripts/build-catalog.py` — rebuild catalog.
- `bash scripts/sync-components.sh` — sync host.
- Web UI tab "assets" — visualizar resultado.
