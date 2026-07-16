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
Invocar skill `nanobanana-skill`. Prompt DEVE conter:
- Setor + papel ("owner of a Brazilian clothing store", "metallurgical worker").
- Persona: "well-groomed professional, 35-45 years old, business shirt" (adaptar vestimenta ao setor).
- Ação com propósito: "adjusting garments on a rack", "cutting metal with angle grinder".
- Industrial: "wearing complete correct PPE: safety glasses, gloves, ear protection, apron".
- Fundo: pedir **fundo amarelo sólido `#F4BB35`** OU **sem fundo/isolado** conforme necessidade — nanobanana consegue gerar pessoa isolada.
- Fotorrealista, iluminação natural.

⚠️ Cota Gemini exige billing — avisar usuário antes de gerar se não confirmado.

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
