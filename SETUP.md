# SETUP — técnico (dev/Patrick)

Setup detalhado pra desenvolvedor. Para usuário leigo em Claude Code, ver [`INSTALL.md`](./INSTALL.md).

---

## Dependências

| Stack | Versão | Por quê |
|---|---|---|
| Claude Code | latest | Harness do plugin |
| Node.js | LTS (≥18) | Remotion + sharp + CLI + setup |
| Remotion | 4.0.479 | Geração PNG/MP4 |
| sharp | npm | Resize Lanczos pós-render (substitui Python/PIL) |
| Python | opcional | `install-advanced` — layout-mapper, audit, wizard |

---

## Estrutura de instalação (via CLI npm)

```
<projeto-de-trabalho>/
├── .claude/
│   ├── plugins/marketing-doma/     ← clone do GitHub (marketing-doma install)
│   └── settings.json             ← enabledPlugins + hook auto-start
├── remotion-doma/                ← criado pelo marketing-doma install
├── .venv-instagram/              ← opcional (install-advanced)
└── ...
```

### Estrutura do source (dev — fonte de verdade)

```
/home/rafael/projetos/projetos-doma/patrick/.claude/skills/marketing-doma/    ← source do dev
└── .git/   → remote origin = github.com/rafael-senter/marketing-doma
```

Dev edita aqui, faz `git push origin main vX.Y.Z`. CLI npm clona do GitHub.

---

## O que `marketing-doma install` faz

1. **Node** — verifica versão.
2. **Remotion** — cria `remotion-doma/`, `npm i`, sync componentes/assets (sharp p/ resize).
3. **IDE** — `.claude/settings.json` + `.cursor/hooks.json` + rules + `CURSOR.md`.
4. **Python** — **SKIP** no fluxo marketing.

`/marketing-doma-setup` = re-sync idempotente (mesmo script).

## Python (opcional — `marketing-doma install-advanced`)

- Cria `.venv-instagram/` com paths **Windows** (`Scripts/python.exe`, `Scripts/pip.exe`) ou **Unix** (`bin/python`, `bin/pip`).
- Instala Pillow, numpy, scipy, scikit-image + layout-mapper se existir.
- Implementação: `scripts/lib/install-advanced.mjs` (100% Node launcher, sem Git Bash).

Resolver python do venv em scripts:
```bash
node .claude/skills/marketing-doma/scripts/lib/venv-paths.mjs "$(pwd)" python
```

Hook Remotion (schema aninhado):
   ```json
   {
     "hooks": {
       "SessionStart": [
         {
           "hooks": [
             {
               "type": "command",
               "command": "node .claude/skills/marketing-doma/scripts/lib/start-remotion.mjs",
               "timeout": 5
             }
           ]
         }
       ]
     }
   }
   ```
   ⚠️ Schema antigo (sem o aninhamento `hooks: [...]`) causa erro `"Expected array, but received undefined"`.

---

## Versionamento + distribuição

### Source (dev)

Plugin tem git próprio em `patrick/.claude/skills/marketing-doma/`:
- Remote: https://github.com/rafael-senter/marketing-doma (privado na equipe; público na instalação)
- Branch: main

### CLI npm

CLI npm publicado em https://www.npmjs.com/package/marketing-doma-cli. Clona em `<projeto>/.claude/skills/marketing-doma/` e habilita via `enabledPlugins` no settings.json **do projeto**.

### Fluxo de release

| O que mudou | Comando |
|---|---|
| `templates/`, `knowledge-base/`, `agents/`, `commands/`, `skills/`, `assets/`, `scripts/` | bump em 3 manifests + `git push origin main vX.Y.Z` |
| `cli/bin/marketing-doma.js`, `cli/package.json` | bump em 4 manifests + `git push` + `bash scripts/publish-cli.sh` |

Plugin-only: equipe roda `marketing-doma update` e tem versão nova (não toca npm).
CLI: equipe roda `npm install -g marketing-doma-cli@latest`.

Detalhes em `CLAUDE.md` do projeto host (seção 7).

### Estratégia cliente sem git

Cliente final (marketing) **não usa git localmente**. Edita arquivos do plugin direto e gera live-rules em runtime. Dev coleta via `marketing-doma export` → tarball → integra no source GitHub.

Update no cliente é **force-overwrite** (`git fetch + reset --hard origin/main + clean -fd`), preservando `knowledge-base/live-rules/` e `templates/planos/` via stash temporário.

---

## Auto-melhoria (live-rules)

Toda regra nova descoberta em runtime → `knowledge-base/live-rules/<YYYY-MM-DD>-<topic>.md`.

Periodicamente, dev revisa e promove pras RULES principais (`knowledge-base/padroes/RULES-recriacao.md`).

Script `scripts/auto-rules-learn.sh` ajuda a commitar essas regras automaticamente no sub-repo do plugin.

---

## Hook auto-start — comportamento

Toda vez que abrir Claude Code dentro de `projetos-doma/patrick/`:
- Hook roda `bash .claude/skills/marketing-doma/scripts/start-remotion.sh &`
- Script verifica se já tem studio rodando na porta 3010; se não, sobe:
  ```bash
  cd remotion-doma && nohup npx remotion studio --no-open --port 3010 > /tmp/remotion.log 2>&1 &
  ```
- Studio fica disponível em http://localhost:3010 enquanto a sessão durar.
- Fechar terminal NÃO mata o studio (`nohup` + `&`). Pra matar: `pkill -f "remotion studio"`.

---

## Atualizar Remotion no futuro

Por causa do `min-release-age=7` global (segurança Shai-Hulud), versões muito novas (< 7 dias) bloqueiam. Fix local já está aplicado em `remotion-doma/.npmrc`:
```
min-release-age=0
```

Pra atualizar:
```bash
cd remotion-doma
npx remotion upgrade
```

---

## Troubleshooting

### Studio não sobe
```bash
ps aux | grep remotion
tail -50 /tmp/remotion.log
```

### Hook não dispara
Conferir `.claude/settings.json` local existe e tem JSON válido:
```bash
cat .claude/settings.json | jq
```

### Render falha
```bash
cd remotion-doma && npx remotion still <id> out/test.png --log=verbose
```

### Python venv quebrado
```bash
rm -rf .venv-instagram
python3 -m venv .venv-instagram
.venv-instagram/bin/pip install Pillow numpy scipy
```
