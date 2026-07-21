---
name: image-sourcer
description: Obtém imagem de pessoa/contexto pra peça Doma seguindo pipeline catálogo → busca internet (licença livre) → geração via nanobanana. Aplica regras de persona obrigatórias (30-50 anos, executivo bem cuidado, coerente com o setor do cliente Doma, EPIs corretos em cena industrial, ação com propósito). Produz sempre 2 versões (fundo amber #F4BB35 + transparente) e cataloga. Use quando a peça precisa de foto de pessoa, dono de negócio, funcionário, ou cenário de setor cliente e não há asset adequado no catálogo.
---

# image-sourcer — obtenção de imagens com persona correta

Sub-skill que resolve "preciso de uma imagem de X pra essa peça" sem quebrar a identidade Doma.

## Leitura obrigatória antes de rodar

1. `../../../../knowledge-base/identidade/persona-imagens.md` — regras de persona (vinculantes).
2. `../../../../knowledge-base/identidade/setores-atendidos.md` — setores oficiais Doma (a pessoa deve parecer do setor).

## Fluxo (3 camadas, na ordem — não pular)

### 1. CATÁLOGO primeiro (0 custo)
```bash
python3 -c "
import json
cat = json.load(open('$(dirname $0)/../../../../assets/CATALOGO.json'))
# filtrar por setor/tema pedido
"
```
Ou grep no `CATALOGO.json` por slug/uso. Checar `assets/fotos/`, `assets/bases-nanobanana/`, `assets/bases-nanobanana-transparente/`. Se existe base adequada → reusar, fim.

### 2. BUSCA NA INTERNET (licença livre)
- Fontes permitidas: **Unsplash, Pexels, Pixabay** (licença livre comercial). Buscar via WebSearch/WebFetch.
- Query em inglês descreve setor + persona: ex. `"clothing store owner 40s checking inventory"`, `"metalworker cutting steel full PPE safety gear"`.
- **Checklist de aprovação da imagem encontrada** (todas obrigatórias):
  - [ ] Idade aparente 30-50
  - [ ] Aparência executiva/profissional bem cuidada (camisa social ou vestimenta do setor)
  - [ ] Parece dono/funcionário DO setor retratado (não genérico)
  - [ ] Ação com propósito (não pose de stock sorrindo pro nada)
  - [ ] Cena industrial → EPIs completos e corretos
  - [ ] Licença livre confirmada na página da fonte
- Reprovou qualquer item → descartar e ir pra camada 3.

### 3. FALLBACK: gerar via nanobanana (Gemini)
Usar o script EMBUTIDO no plugin (não depende de skill do host):
```bash
python3 scripts/nanobanana-generate.py --prompt "..." --output out.png [--input ref.png] [--size 1152x896] [--resolution 2K]
```
Key: `GEMINI_API_KEY` no `.env` da raiz do plugin (copiar de `.env.example` e preencher — exige billing Google). Prompt DEVE conter:
- Setor + papel ("owner of a Brazilian clothing store", "metallurgical worker").
- Persona: "well-groomed professional, 35-45 years old, business shirt" (adaptar vestimenta ao setor).
- Ação com propósito: "adjusting garments on a rack", "cutting metal with angle grinder".
- Industrial: "wearing complete correct PPE: safety glasses, gloves, ear protection, apron".
- Fundo: pedir **fundo amarelo sólido `#F4BB35`** OU **sem fundo/isolado** conforme necessidade — nanobanana consegue gerar pessoa isolada.
- Fotorrealista, iluminação natural.

⚠️ Cota Gemini exige billing — avisar usuário antes de gerar se não confirmado.

### 3b. MOCKUP DE TELA DE SISTEMA (ERP/browser/app em device) — pipeline especial

⚠️ **Gemini re-renderiza o texto da tela com typos/alucinações** (nomes, datas, valores errados). Em peça B2B isso reprova. NUNCA usar a tela crua do render. Regra completa: `knowledge-base/live-rules/2026-07-16-nanobanana-tela-composta.md`.

Fluxo (o usuário só fornece o screenshot — o resto é automático):
1. Gerar a MOLDURA via nanobanana: prompt pede device fotorrealista exibindo o screenshot, fundo `#F4BB35`, sombra suave. O render serve só como moldura.
2. Compor o screenshot ORIGINAL por cima com o script pronto:
   ```bash
   python3 scripts/compose-screen-mockup.py \
     --mockup <render-nanobanana.png> \
     --screenshot <screenshot-original.png> \
     --output assets/bases-nanobanana/_<slug>-base.png \
     --transparent assets/bases-nanobanana-transparente/_<slug>-base-transp.png
   ```
   O script detecta a área de tela sozinho (âncora: barra do browser), cola o screenshot fit-na-largura, preenche gap com linha limpa do fundo e recoloca o footer. Se a detecção falhar, passar `--bbox L,T,R,B` medido via numpy.
3. Seguir "Pós-obtenção" abaixo (catalogar + sync).

## 🆕 NATURALIDADE OBRIGATÓRIA (regra Patrick 2026-07-21)

Imagem que "parece artificial" reprova, mesmo com persona e composição corretas. O público Doma é
dono de PME real — se a cena parece renderizada/de catálogo, quebra a identificação e a peça perde
credibilidade. Vale para geração via nanobanana E para seleção de foto de banco de imagem.

### Todo prompt de cena/ambiente DEVE conter
1. **Enquadramento aberto** que mostre o lugar de verdade (corredor, profundidade da loja, vista do
   salão) — não um close arrumadinho de prateleira.
2. **Imperfeições reais**, explicitamente pedidas: `handwritten price tags`, `slightly crowded and
   imperfect merchandising`, `worn/scuffed floor`, `uneven stacking`, `faded old signage`, `a bit of dust`.
3. **Luz disponível de verdade**: `mixed fluorescent ceiling light with daylight from the storefront`,
   `natural available light` — nunca luz de estúdio ou "cinematic lighting".
4. **Vocabulário documental**: `candid documentary photography`, `unstaged`, `shot on a 28mm lens`,
   `slight grain`, `realistic colour`.
5. **Negativas explícitas**: `not glossy`, `not an advertisement`, `not CGI`, `no readable brand logos`.

### Proibido no prompt (produz o look artificial)
❌ `perfect`, `pristine`, `spotless`, `beautifully organized`, `luxury`, `modern showroom`
❌ `cinematic lighting`, `studio lighting`, `dramatic lighting`, `golden hour glow`
❌ `4k`, `8k`, `hyperrealistic`, `ultra detailed`, `octane render`, `unreal engine`
❌ Simetria perfeita e produtos alinhados milimetricamente.

### Checklist de aprovação (antes de catalogar)
- [ ] Dá pra acreditar que alguém tirou essa foto com o celular na loja do cliente?
- [ ] Tem pelo menos 2 imperfeições visíveis (etiqueta manuscrita, chão gasto, pilha torta, poeira)?
- [ ] A luz é a do lugar, não de estúdio?
- [ ] O enquadramento mostra o ESPAÇO, não só um detalhe?
- Reprovou → regerar com o prompt corrigido, não aproveitar "porque tá bonita".

> Caso de referência: `_ferragens-loja-base.png` (v1, close de balcão — aprovada mas Patrick apontou
> "parece artificial") vs `_ferragens-loja-v2-base.png` (v2, corredor aberto com etiquetas manuscritas,
> piso gasto e luz fluorescente mista — natural). Comparar as duas antes de escrever prompt novo.

## Pós-obtenção (SEMPRE, qualquer camada 2 ou 3)

1. **2 versões obrigatórias**:
   - `assets/bases-nanobanana/_<slug>-base.png` — fundo `#F4BB35`.
   - `assets/bases-nanobanana-transparente/_<slug>-base-transp.png` — transparente (gerar com `rembg`: `pip install rembg onnxruntime`).
2. **Catalogar**: entrada em `scripts/build-catalog.py` (`BASES_NANOBANANA_META`) com slug, setor, uso, fonte (internet+licença OU nanobanana+prompt).
3. **Rebuild + sync**:
   ```bash
   python3 scripts/build-catalog.py
   bash scripts/sync-components.sh
   ```
4. Se em máquina dev: `bash scripts/auto-commit-changes.sh --push`.

## Anti-padrões

- ❌ Gerar via nanobanana sem checar catálogo e internet antes (cota cara).
- ❌ Aceitar imagem que reprova qualquer item do checklist "porque é parecida".
- ❌ Imagem de internet sem confirmar licença na página da fonte.
- ❌ Salvar só 1 versão.
- ❌ Persona errada pro setor (executivo de banco pra pet shop; metalúrgico sem EPI).
