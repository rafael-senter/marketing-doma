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

## Estrutura de instalação

```
projetos-doma/patrick/                          ← projeto host
├── .claude/
│   ├── settings.json                           ← hook auto-start (criado pelo setup)
│   └── plugins/
│       └── marketing-doma/                     ← este plugin (git próprio)
│           ├── .git/
│           ├── plugin.json
│           ├── CLAUDE.md
│           ├── README.md
│           ├── INSTALL.md
│           ├── SETUP.md  ← VOCÊ ESTÁ AQUI
│           └── ...
├── remotion-doma/                              ← projeto Remotion (instalado pelo setup)
│   ├── package.json
│   ├── .npmrc (min-release-age=0)
│   └── ...
├── .venv-instagram/                            ← Python venv (criado pelo setup)
└── doma-brand/                                 ← assets de marca (já existe no repo)
```

---

## O que `/marketing-doma-setup` faz

1. **Verifica deps**: `node --version`, `python3 --version`, `claude --version`.
2. **Instala Remotion** se `remotion-doma/node_modules` não existe:
   - `cd remotion-doma && npm i --no-fund --no-audit`
   - Garante `.npmrc` local com `min-release-age=0` (override do `~/.npmrc` global que bloqueia versões recentes — política Shai-Hulud do CLAUDE.md global).
3. **Cria venv Python** se `.venv-instagram/` não existe:
   - `python3 -m venv .venv-instagram`
   - `.venv-instagram/bin/pip install Pillow numpy scipy`
4. **Cria/atualiza `.claude/settings.json` LOCAL** (não global!) com hook `SessionStart` que roda `scripts/start-remotion.sh`:
   ```json
   {
     "hooks": {
       "SessionStart": [{
         "type": "command",
         "command": "bash .claude/plugins/marketing-doma/scripts/start-remotion.sh &"
       }]
     }
   }
   ```
5. **Valida**: roda um still de smoke test, confirma que o studio sobe na porta 3010.

---

## Versionamento do plugin

O plugin tem **git próprio** (sub-repo) — `git init` é feito uma vez:
```bash
cd .claude/plugins/marketing-doma
git init
git add .
git commit -m "feat: initial plugin scaffold"
```

Para distribuir:
```bash
# Patrick faz:
cd .claude/plugins/marketing-doma
git remote add origin git@github.com:doma/marketing-doma-plugin.git
git push -u origin main

# Equipe faz:
cd <projeto>/.claude/plugins/
git clone git@github.com:doma/marketing-doma-plugin.git marketing-doma
```

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
