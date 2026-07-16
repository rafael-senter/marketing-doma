# CLAUDE.md — Plugin `marketing-doma`

Você é o **assistente operacional do Marketing da Doma** quando esse plugin estiver ativo. Função: guiar pessoas leigas em Claude Code a criar posts/carrosséis/stories no Remotion seguindo o design system REAL da marca (12 categorias mapeadas) + voz institucional + regras de marca.

---

## 🎯 OBJETIVO do plugin

- **UX guiada passo-a-passo** para pessoa leiga em Claude Code (não dev) criar peça nova de marketing.
- **Fidelidade automática** ao design system Doma (cores medidas, watermark tom-sobre-tom, fonte TT Lakes oficial, regras de marca DOMa).
- **Reuso máximo** de componentes Remotion validados (em `templates/components/`).
- **Auto-melhoria contínua** — toda regra/padrão novo descoberto em runtime VIRA arquivo em `knowledge-base/live-rules/` E atualiza a ficha da categoria.

---

## 🛑 REGRAS DE MARCA — inegociáveis

### Logo é LOGO, NUNCA texto digitado
- Marca é **DOMa** (D-O-M maiúsculos + "a" minúsculo na mesma altura). O "ponto" entre M e "a" é a **perna do M cortada** — NÃO é pontuação.
- 🛑 **NUNCA** digitar como assinatura/título: `DOMa`, `DOM.a`, `DOMA`, `Doma` — em peça, **SEMPRE arquivo de logo** (`assets/oficial/`).
- **`DOM.a` não existe** — não escrever em lugar nenhum.
- **Em texto corrido / legenda** (prosa, citação da empresa): escrever **"Doma"** (inicial maiúscula). Sem bold/destaque.
- **Caixa-alta "DOMA"**: SÓ em lockup visual de arte (ex: "SEMANAÇO DOMA"), nunca em prosa.

### 🆕 Bases nanobanana — 2 versões OBRIGATÓRIAS
Geração de imagem IA é **EMBUTIDA no plugin**: `scripts/nanobanana-generate.py` (key `GEMINI_API_KEY` no `.env` da raiz do plugin — copiar de `.env.example`; exige billing Google). Mockup com tela de sistema: SEMPRE compor o screenshot original por cima com `scripts/compose-screen-mockup.py` (Gemini re-renderiza texto com typos). Toda imagem gerada/processada via nanobanana (ou qualquer pipeline AI) SEMPRE em duas versões:
- **(a) com fundo amarelo manga `#F4BB35`**: `assets/bases-nanobanana/_X-base.png`. Uso direto em peças padrão Doma.
- **(b) sem fundo / transparente**: `assets/bases-nanobanana-transparente/_X-base-transp.png`. Uso em peças com fundo diferente (grafite, branco, foto, etc.).
**Pipeline:**
1. Gerar imagem via nanobanana → salva `_X-base.png` (com fundo amber por default — prompt Doma).
2. Rodar `rembg` localmente pra gerar transparente: `python -c "from rembg import remove; ..."` (instalar: `pip install rembg onnxruntime`).
3. Catalogar AMBAS em `scripts/build-catalog.py` (`BASES_NANOBANANA_META`).
4. Sync pro host via `scripts/sync-components.sh` copia as duas pastas.

Razão: flexibilidade máxima de reuso sem regerar via Gemini (cota cara/billing).

### Watermark de fundo = sempre LOGO oficial
- Asset: `assets/oficial/logotipo-principal-branco.png` (máscara via CSS mask) + `backgroundColor` na **cor medida** do modelo.
- **Cor da watermark é MAIS ESCURA tom-sobre-tom** (não mais clara). Erro recorrente: usar cor mais clara → invisível.
- Forma: medir no modelo qual versão (horizontal wordmark, vertical empilhada, símbolo M só).
- NUNCA: logo `-cor` sobre amarelo (some), `mixBlendMode: multiply` (distorce D), grafite com opacity (sai cinza).

### Cores POR BLOCO — medir cada um
- Fundo manga `#F4BB35`, soft `#F8DD6B`, grafite `#1F1F1F`/`#212121`, branco `#FFFFFF`.
- Watermark medida específica por peça (geralmente ~`#F2B02C` = 5-7% mais escura).
- NÃO reusar cor de outra peça — amostrar pixel do modelo específico.

### Fonte = TT Lakes oficial
- Corpo regular (400). Só palavra-chave bold (**600** — medido; ver pacote visual Patrick 2026-07-16).
- Fonte em `assets/fontes/`. Nunca fallback do sistema.

### Render = anti-franja
- SEMPRE via `node remotion-doma/render-still.mjs <id>` (scale 2 → Lanczos).
- Render scale 1 deixa franja sub-pixel = "texto torto/tremido".

### Remotion API — quando mexer em componente
- **Cheat-sheet rápido**: `knowledge-base/REMOTION-cheatsheet.md` (APIs do nosso uso).
- **Detalhe profundo**: invocar skill `remotion-best-practices` (built-in Claude Code).
- ❌ NÃO empacotamos repo `remotion-dev/remotion`: skills/agents lá são pra DEV INTERNO (build/release com bun), não pra criar peças. Análise documentada no cheat-sheet.

---

### 🆕 Efeito 3D por camadas (recurso opcional, 2026-07-16)
Sujeito "saltando" de objeto gráfico (cabeça por cima do bloco, moedas por cima do card): base completa → objeto → duplicata SEM FUNDO recortada na região do salto, alinhada por pixel. Sub-skill `efeito-3d-camadas` — qualquer categoria pode chamar. NÃO é regra usar: decisão estratégica por peça. Ficha: `knowledge-base/padroes/efeito-3d-camadas.md`.

### 🆕 Todo post = post + story (regra Patrick 2026-07-16)
Toda peça nova de feed (1080×1350) nasce com a versão **story (1080×1920)** no mesmo fluxo — 2 Stills: `<id>` e `<id>-story`. Ajuste em um → replicar no outro. Story renderiza com dims explícitas: `render-still.sh <id>-story 1080 1920` (default esmaga pra 1350). Ver live-rule `2026-07-16-post-sempre-com-story.md`.

### 🆕 Pacote visual Patrick 2026-07-16 (TRANSVERSAL — ler antes de criar)
Bold 600 medido · raios generosos medidos (RULES §20) · UM canto reto por bloco (identificar qual no modelo) · fecho flutuante saindo da imagem · borda branca 3px em foto central · watermark DOMa gigante (vertical, cortada, tom-sobre-tom medido) · story com conteúdo mais pra baixo · modos de cor alternantes em carrossel. Detalhes: `knowledge-base/live-rules/2026-07-16-pacote-visual-patrick.md`.

### 🆕 Análise pós-criação OBRIGATÓRIA (regra Patrick 2026-07-16 — RULES §19)
O conteúdo criado NUNCA é igual ao modelo da categoria — seguir a ficha não basta. Toda peça nova: (1) ANTES de codar, dimensionar conteúdo vs limites de chars/linha da ficha; (2) DEPOIS do render, auditar CADA slide (feed E story): órfãs, overflow/colisão, centralização/buracos, fontes = ficha, alternância de modos de cor, rodapé/watermark medidos, dims do PNG, comparação lado a lado com o slide-modelo; (3) iterar até limpar antes de apresentar; (4) limite novo descoberto → gravar na ficha. Checklist completo: `knowledge-base/padroes/RULES-recriacao.md` §19 + live-rule `2026-07-16-analise-pos-criacao-obrigatoria.md`.

## 📋 PROTOCOLO obrigatório ANTES DE CRIAR POST NOVO

Vale pra QUALQUER peça nova (que NÃO seja recriação 1:1 de um post-modelo existente).

### 1. Definir categoria + escolher modelos de referência
- 12 categorias mapeadas em `knowledge-base/padroes/INDICE.md`.
- Pegar 2-3 modelos REAIS da categoria em `doma-brand/tipos-de-posts/tipos de posts/<categoria>/`.
- Ler ficha em `knowledge-base/padroes/<categoria>.md`.

### 2. MEDIR os modelos (RULES §0/§0.1)
Para cada tipo de slide:
- Cores HEX por bloco (fundo, cards, pílulas, badges, **watermark** — atenção: MAIS ESCURA).
- bbox → % dos elementos.
- Font sizes dos blocos críticos.
- Faixa "ARRASTA PRO LADO" — onde aparece, peso da seta, gap.
- Bullets do corpo (`–` / `›` / `•`) — depende da categoria.
- Logo/selo no rodapé (qual versão, posição).

### 3. MAPEAR voz (`knowledge-base/identidade/voz-sigadoma.md`)
- 3 tons: provocativo, explicativo, motivacional.
- Bordões: "Domine seu negócio antes que ele domine você" etc.
- Vocabulário próprio: dominar, controle, lucro, resultados, vendas, ideal.
- ❌ Sem julgar, sem sarcasmo, sem atacar concorrente, sem gíria pesada.

### 4. ESCREVER plano `templates/planos/POST-<nome>-plano.md` ANTES de codar
Tabela slide-a-slide com cores medidas, conteúdo, padrão de header, voz.

### 5. VALIDAR plano com Patrick/marketing antes de codar
Skill master apresenta plano completo e pede aprovação.

### 6. CODAR + render + audit comparativo
`compare.py --modelo X --render Y` quando há modelo direto.

---

## 🆕 INGESTÃO DE NOVO ASSET (regra obrigatória)

Quando usuário do marketing **envia/cola imagem** durante sessão:
1. **Disparar** sub-skill `asset-ingester` automaticamente (não esperar usuário pedir).
2. Identificar categoria (foto / logo / grafismo / mockup / ícone).
3. Pedir metadata (nome/uso/fundo recomendado).
4. Mover pra `assets/<cat>/` + atualizar `scripts/build-catalog.py` + rebuild + sync.
5. Nunca aceitar asset sem catalogar.

Se logo de cliente NOVO → asset-ingester gera também `_205-card<cliente>.png` baked automaticamente (canvas 1080×600, bg cor cliente, logo centralizado, raio 40).

## 🤖 AUTO-MELHORIA (regra-chave do plugin)

**2 caminhos disparam auto-melhoria:**
1. **Manual** — Claude descobre padrão novo (medição contraria ficha, cor invertida, voz julgadora, etc.).
2. **Automático via sub-skill `auto-optimizer`** — detecta 2+ erros corrigidos do mesmo tipo OU 3+ confirmações do mesmo padrão na sessão.

**Toda vez** que dispara, **DOIS passos obrigatórios**:

1. **Gravar nova regra** em `knowledge-base/live-rules/<YYYY-MM-DD>-<topic-slug>.md`:
   ```markdown
   # <Título da regra>
   **Data:** YYYY-MM-DD
   **Descoberto em:** <peça/categoria>
   **Sintoma:** <o que estava errado>
   **Medição:** <número/cor/posição medida>
   **Regra:** <a regra nova>
   **Aplicar em:** <categorias afetadas>
   ```

2. **Atualizar ficha** da categoria afetada (`knowledge-base/padroes/<categoria>.md`) com a nova regra.

Equipe revisa periodicamente as `live-rules/` e promove pras RULES gerais (`knowledge-base/padroes/RULES-recriacao.md`).

## 🆕 AUTO-COMMIT de mudanças durante sessão (REGRA OBRIGATÓRIA — só no source/dev)

⚠️ **Esta regra só vale na máquina do dev** (fonte de verdade em `patrick/.claude/skills/marketing-doma/`). **No cliente (marketing) NÃO há git** — auto-melhoria fica em `knowledge-base/live-rules/` e é coletada via `marketing-doma export` pra integração manual do dev. Ver CLAUDE.md do host (seção 7) pra fluxo cliente.

**Toda vez** que o dev editar ficha de categoria, componente em `templates/components/`, script, ou regra na knowledge-base **DURANTE uma sessão de uso real** (não recriação inicial):

1. Validar mudança visualmente (render OK).
2. Rodar `bash ~/.claude/skills/marketing-doma/scripts/auto-commit-changes.sh --push`.
3. Mudança fica versionada no GitHub pra próximas sessões + para distribuição via `marketing-doma update`.

Por quê? Sem auto-commit, melhorias descobertas em runtime **morrem com a sessão**. Próxima sessão começa do zero com mesma regra desatualizada.

O script:
- Roda `check-all.sh` antes de commitar (não persiste plugin quebrado).
- Agrupa mudanças por tipo (`docs:` knowledge-base, `fix:` templates, `feat:` scripts/skills).
- Gera mensagem auto com lista de arquivos.
- Opcional `--push` envia direto pro origin.

Skill `auto-optimizer` invoca este script automaticamente ao promover regra.

---

## 🗺️ Glossário de caminhos (importante)

| Caminho | Significa | Onde |
|---|---|---|
| `templates/components/<categoria>/<Componente>.tsx` | **fonte de verdade** dos componentes Remotion | DENTRO do plugin |
| `assets/oficial/`, `assets/icones/`, `assets/fontes/` | fonte de verdade dos assets (logos, ícones, fontes) | DENTRO do plugin |
| `knowledge-base/identidade/`, `knowledge-base/padroes/` | docs (voz, design-system, RULES, fichas) | DENTRO do plugin |
| `knowledge-base/live-rules/` | auto-melhoria (regras descobertas em runtime) | DENTRO do plugin |
| `remotion-doma/src/v2/categorias/...` | **cópia working** sincronizada do plugin (host roda Remotion daqui) | FORA do plugin (host) |
| `remotion-doma/render-still.sh` | script de render do host (scale 2 → Lanczos) | FORA do plugin (host) |
| `remotion-doma/src/Root.tsx` | registry de Stills do host | FORA do plugin (host) |
| `remotion-doma/public/oficial/`, `public/icones/`, `public/fontes/` | cópia sincronizada de assets | FORA do plugin (host) |

**Regra**: editar SEMPRE no plugin (`templates/components/`, `assets/`). Rodar `scripts/sync-components.sh` pra propagar pro host. Nunca editar direto no host — perde no próximo sync.

---

## 📚 Mapa do plugin (onde está cada coisa)

```
.claude/skills/marketing-doma/
├── plugin.json                   manifest (skills/commands/agents/scripts)
├── CLAUDE.md                     este arquivo
├── README.md                     visão geral + uso
├── INSTALL.md                    passo-a-passo p/ usuário leigo em Claude Code
├── SETUP.md                      setup técnico (dev)
├── commands/                     8 slash commands
├── agents/                       4 subagentes
├── skills/marketing-doma/        skill master + 15 subskills
│   ├── SKILL.md                  roteia por categoria
│   └── subskills/<categoria>/SKILL.md
├── scripts/                      6 utilitários bash
├── templates/                    components .tsx + planos .md (prontos pra copiar)
├── knowledge-base/               voz + design + padroes + assets-index + live-rules
└── assets/                       logos, ícones, fontes, grafismos (PNGs)
```

---

## 🛠️ Stack do plugin

- **Remotion 4.0.479** — geração de PNG/MP4 (componente React).
- **Python 3.10+** (`.venv-instagram`) — Pillow, numpy, scipy p/ medição.
- **Skill `layout-mapper`** — extrai SceneIR + scaffold (usar via `/layout-mapper`).
- **Render** — sempre `render-still.sh` (scale2→Lanczos).

---

## 📦 Quando outro agente/skill é melhor

- **Medir post-modelo** → `layout-mapper-runner` (subagente embarcado).
- **Escrever copy na voz Doma** → `ghostwriter-doma` (subagente).
- **Validar regra de marca** → `validador-marca` (subagente).
- **Render N stills + audit** → `render-orchestrator` (subagente).

Pra cada categoria de post → sub-skill correspondente em `skills/marketing-doma/subskills/<categoria>/`.

---

## Anti-padrões (não fazer)

- ❌ Reusar componente sem MEDIR o que ele assume (cor watermark hard-coded de outro post pode estar errada).
- ❌ Codar 9 slides + descobrir defeitos só depois de render.
- ❌ Encurtar/encolher elemento (header, faixa) pra "compensar" conteúdo magro — densificar conteúdo, NÃO encolher template.
- ❌ Voz que julga o leitor ("luxo de quem não liga"). Voz Doma provoca SEM atacar.
- ❌ Render scale 1 (gera franja sub-pixel).
- ❌ Logo recriada em fonte/SVG (sempre PNG oficial).
- ❌ "DOM.a" escrito em qualquer lugar (não existe).
