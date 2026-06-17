# SETUP — técnico (dev/Patrick)

Setup detalhado pra desenvolvedor. Para usuário leigo em Claude Code, ver [`INSTALL.md`](./INSTALL.md).

---

## Dependências

| Stack | Versão | Por quê |
|---|---|---|
| Claude Code | latest | Harness do plugin |
| Node.js | LTS (≥20) | Remotion runtime |
| Remotion | 4.0.479 | Geração PNG/MP4 |
| Python | ≥3.10 | Medição (Pillow, numpy, scipy) |
| Git | qualquer | Versionamento do plugin |

---

## Estrutura de instalação (via CLI npm)

```
~/.local/share/marketing-doma/                  ← clone do GitHub (CLI gerencia)
├── .git/
├── plugin.json
├── CLAUDE.md, README.md, INSTALL.md, SETUP.md
├── cli/                                        ← código do CLI npm
├── commands/, agents/, skills/                 ← Claude Code skills
├── templates/, knowledge-base/, assets/        ← regras + componentes + assets
└── scripts/                                    ← bash helpers

~/.claude/plugins/marketing-doma                ← symlink → ~/.local/share/marketing-doma/

<qualquer-pasta-de-trabalho>/                   ← projeto host onde cria posts
├── .claude/settings.json                       ← hook auto-start (criado pelo /marketing-doma:marketing-doma-setup)
├── remotion-doma/                              ← projeto Remotion (criado pelo setup)
│   ├── package.json
│   ├── .npmrc (min-release-age=0)
│   ├── render-still.sh                         ← anti-franja (scale 2 + Lanczos)
│   ├── src/                                    ← componentes sync do plugin
│   ├── public/                                 ← assets sync (logos/icones/fontes)
│   └── out/<id>.png                            ← renders
├── .venv-instagram/                            ← Python venv (criado pelo setup)
├── CLAUDE.md, README.md, .gitignore            ← criados pelo setup
└── <seu trabalho>                              ← .md, scripts, etc
```

### Estrutura do source (dev — fonte de verdade)

```
/home/rafael/projetos/projetos-doma/patrick/.claude/plugins/marketing-doma/    ← source do dev
└── .git/   → remote origin = github.com/rafael-senter/marketing-doma
```

Dev edita aqui, faz `git push origin main vX.Y.Z`. CLI npm clona do GitHub.

---

## O que `/marketing-doma-setup` faz

1. **Verifica deps**: `node --version`, `python3 --version`, `claude --version`.
2. **Instala Remotion** se `remotion-doma/node_modules` não existe:
   - `cd remotion-doma && npm i --no-fund --no-audit`
   - Garante `.npmrc` local com `min-release-age=0` (override do `~/.npmrc` global que bloqueia versões recentes — política Shai-Hulud do CLAUDE.md global).
3. **Cria venv Python** se `.venv-instagram/` não existe:
   - `python3 -m venv .venv-instagram`
   - `.venv-instagram/bin/pip install Pillow numpy scipy`
4. **Cria/atualiza `.claude/settings.json` LOCAL** (não global!) com hook `SessionStart` que roda `scripts/start-remotion.sh` — formato schema atual do Claude Code (aninhado):
   ```json
   {
     "hooks": {
       "SessionStart": [
         {
           "hooks": [
             {
               "type": "command",
               "command": "bash ~/.claude/plugins/marketing-doma/scripts/start-remotion.sh &",
               "timeout": 5
             }
           ]
         }
       ]
     }
   }
   ```
   ⚠️ Schema antigo (sem o aninhamento `hooks: [...]`) causa erro `"Expected array, but received undefined"`.
5. **Valida**: roda um still de smoke test, confirma que o studio sobe na porta 3010.

---

## Versionamento + distribuição

### Source (dev)

Plugin tem git próprio em `patrick/.claude/plugins/marketing-doma/`:
- Remote: https://github.com/rafael-senter/marketing-doma (público)
- Branch: main

### CLI npm

CLI wrapper publicado em https://www.npmjs.com/package/marketing-doma-cli (`marketing-doma-cli`). Faz `git clone --depth 1` do GitHub em `~/.local/share/marketing-doma/` e cria symlink em `~/.claude/plugins/marketing-doma`.

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
- Hook roda `bash .claude/plugins/marketing-doma/scripts/start-remotion.sh &`
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
