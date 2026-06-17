# Web UI — `marketing-doma`

Interface web mínima (Vite + React) que lê `plugin.json` + knowledge-base e mostra:
- Categorias (15 sub-skills) + ficha de cada.
- Agentes (4) + descrição.
- Commands (8 slash) + uso.
- Scripts (10) + conteúdo.

## Por que existe

UX leigo em Claude Code no terminal funciona, mas algumas pessoas do marketing podem preferir browser. Esta web é **read-only** — apenas navega. Pra criar post, usa o terminal (`/marketing-doma`).

## Como rodar

```bash
cd web
npm i
npm run dev
```

Abre em http://localhost:5174.

## Build estático

```bash
npm run build
# dist/ tem HTML+JS+CSS estático — pode hospedar em GitLab Pages.
```

## O que aparece

- **Header**: nome do plugin + versão + descrição (do plugin.json).
- **Tabs**: categorias / agentes / commands / scripts.
- **Lista lateral**: items da tab atual.
- **Detalhe**: conteúdo markdown do arquivo selecionado.
- **Footer**: contagem (15 categorias, 4 agentes, 8 commands, 10 scripts).

## Stack

- Vite 6 + React 19 (mesmo Remotion — sem conflito de versão).
- Sem CSS framework — paleta Doma (manga `#F4BB35` + grafite `#1F1F1F` + soft `#F8DD6B`) direto via `styles.css`.

## Limitações

- Não cria posts (só visualiza).
- Não roda scripts no browser (precisa terminal).
- Não edita componentes (precisa editor + sync).

Para criação interativa: `/marketing-doma` no Claude Code.

## TODO (futuro)

- Preview dos PNGs renderizados em `remotion-doma/out/`.
- Botão "abrir Claude Code" via deeplink (se possível).
- Form pra preencher plano (gera POST-<nome>-plano.md sem o terminal).
- Live-rules viewer com filtro por categoria/data.
