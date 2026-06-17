# Projeto Marketing Doma

Projeto local do marketing pra gerar posts/carrosséis no Remotion seguindo o design system Doma.

**Plugin global**: `~/.claude/plugins/marketing-doma/` (fonte de verdade).

## Como criar post

No Claude Code, dentro deste diretório:

```
/marketing-doma:marketing-doma
```

Wizard pergunta tipo de post, conteúdo, e gera tudo.

## Atalhos

| Comando | Função |
|---|---|
| `/marketing-doma:new-post <cat> <nome>` | Scaffold direto |
| `/marketing-doma:brainstorm <pauta>` | 3 ângulos voz Doma |
| `/marketing-doma:render <id>` | Render anti-franja |
| `/marketing-doma:audit-post <id> <modelo>` | Fidelidade SSIM |
| `/marketing-doma:publish-checklist` | Pré-publicar |

## Estrutura local

```
.
├── CLAUDE.md                ← mapa pro plugin + customizações
├── README.md                ← você está aqui
├── .gitignore
├── .claude/settings.json    ← hook auto-start studio
├── remotion-doma/           ← projeto Remotion
│   ├── src/v2/categorias/   ← componentes (sync do plugin)
│   ├── public/oficial/      ← assets (sync do plugin)
│   ├── render-still.sh
│   └── out/<id>.png         ← renders
└── .venv-instagram/         ← venv Python (medições)
```

## Sincronizar com plugin atualizado

```bash
cd ~/.claude/plugins/marketing-doma && git pull
bash ~/.claude/plugins/marketing-doma/scripts/sync-components.sh
```

## Studio Remotion

Sobe automaticamente ao abrir Claude Code (hook em `.claude/settings.json`).

Manual:
```bash
cd remotion-doma && npx remotion studio --port 3010
```

## Render

```bash
bash remotion-doma/render-still.sh <id-do-still>
```

Saída em `remotion-doma/out/<id>.png` (1080×1350, scale 2 → Lanczos).

## Adicionar cliente novo

```bash
python ~/.claude/plugins/marketing-doma/scripts/wizard-cliente.py
```

Ou via Web UI:
```bash
cd ~/.claude/plugins/marketing-doma/web && npm i && npm run dev
```

Detalhe: `~/.claude/plugins/marketing-doma/docs/TUTORIAL-novo-cliente.md`.

## Documentação técnica

Tudo no plugin. Não duplicar aqui.

| Pra saber | Ler |
|---|---|
| Regras de marca completas | `~/.claude/plugins/marketing-doma/CLAUDE.md` |
| Voz Doma institucional | `~/.claude/plugins/marketing-doma/knowledge-base/identidade/voz-sigadoma.md` |
| Design system real (T1-T11) | `~/.claude/plugins/marketing-doma/knowledge-base/identidade/design-system.md` |
| RULES §0-§18 | `~/.claude/plugins/marketing-doma/knowledge-base/padroes/RULES-recriacao.md` |
| Fichas por categoria | `~/.claude/plugins/marketing-doma/knowledge-base/padroes/<cat>.md` |
| Catálogo de assets | `~/.claude/plugins/marketing-doma/assets/CATALOGO.json` |
| Cheat-sheet Remotion | `~/.claude/plugins/marketing-doma/knowledge-base/REMOTION-cheatsheet.md` |
