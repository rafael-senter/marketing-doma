# Instalação — equipe de marketing

> **100% local na pasta do projeto.** Sem `npm -g`, sem clone em `~/.local/share/`, sem symlinks globais.

---

## Resumo

| Etapa | Comando |
|---|---|
| Criar pasta | `mkdir marketing-doma && cd marketing-doma` |
| CLI **local** | `npm init -y && npm install marketing-doma-cli` |
| Plugin + Remotion + IDE | `npm run doma:install` |
| Criar posts | `/marketing-doma` ou Cursor chat |

---

## Passo a passo

### 1. Node.js LTS

https://nodejs.org — verificar: `node --version` (v18+)

### 2. Conta Anthropic + Claude Code CLI

Conta **Pro/Max/Team/Enterprise/Console**.

O `npm run doma:install` tenta instalar o CLI automaticamente:

| OS | Ordem |
|---|---|
| **Windows** | PowerShell `install.ps1` → WinGet `Anthropic.ClaudeCode` |
| **macOS** | `install.sh` → Homebrew `claude-code` |
| **Linux/WSL** | `install.sh` |

Falhou um → tenta o próximo. Já instalado → pula.

Alternativa: extensão Claude Code no VS Code.

### 3. Abrir pasta no editor

Abra **a pasta onde você quer trabalhar** — a instalação acontece nela mesma, sem criar subpasta. ✅ Espaços e acentos no caminho são suportados.

### 4. Instalar (2 comandos — na pasta aberta)

```bash
npm install marketing-doma-cli
npx marketing-doma install
```

| # | Comando | O que faz |
|---|---|---|
| 1 | `npm install marketing-doma-cli` | Instala o CLI local (sem `-g`) |
| 2 | `npx marketing-doma install` | Cria `package.json` + baixa plugin + Remotion + configura IDEs |

> **Por que `npx` e não `npm init` + `npm run`?** O npm 11+ bloqueia scripts de `postinstall`, então `npm install` sozinho não adiciona os comandos `doma:*`. O `npx marketing-doma install` faz tudo direto e **cria o `package.json` automaticamente** com nome válido — resolve acentos e espaços na pasta sem você precisar editar nada.

Depois disso, os atalhos `npm run doma:*` já funcionam normalmente.

O `doma:install` faz **tudo nesta pasta**:

- Download tarball GitHub → `.claude/plugins/marketing-doma/` (direto, sem `git clone`)
- `remotion-doma/` + npm install
- `.claude/settings.json` — plugin + hook studio
- `.cursor/hooks.json` + rules
- `CURSOR.md` · `CLAUDE.md`

### 5. Usar

**Claude Code:** `claude` → `/marketing-doma`  
**Cursor:** chat *"cria post Doma"* · ler `CURSOR.md`

---

## Comandos locais (npm run)

| Script | O que faz |
|---|---|
| `npm run doma:install` | Plugin + Remotion + IDE |
| `npm run doma:update` | Atualiza plugin (preserva live-rules) |
| `npm run doma:status` | Saúde da instalação |
| `npm run doma:setup` | Reparar/re-sync |
| `npm run doma:export` | Tarball pro dev |

Equivalente: `npx marketing-doma install` (mesma pasta).

---

## Estrutura do projeto

```
minha-pasta/
├── package.json
├── node_modules/marketing-doma-cli/   ← CLI local
├── .claude/
│   ├── plugins/marketing-doma/        ← plugin (GitHub tarball)
│   └── settings.json
├── .cursor/hooks.json + rules/
├── remotion-doma/
└── CURSOR.md
```

**Nada** em `~/.claude/` · `~/.cursor/` · `~/.local/share/`

---

## CLI global antigo (legacy)

Se você instalou `marketing-doma-cli` globalmente no passado (`npm install -g`), remova — ele causa conflitos:

```bash
npm uninstall -g marketing-doma-cli
```

A instalação atual é **100% local**: nada em `~/.local/share/`, nenhum symlink global, nenhum comando global.

---

## Problemas comuns

| Erro | Solução |
|---|---|
| `marketing-doma: command not recognized` | **Esperado.** Use `npm run doma:install` ou `npx marketing-doma install` (o CLI não é global) |
| `npm init -y` → `Invalid name` | Pasta com acento/espaço. Crie `package.json` manual com nome simples |
| `EALLOWSCRIPTS` / postinstall bloqueado | Adicione `"allowScripts": true` no `package.json` |
| `npm.cmd EINVAL` (Windows) | Atualize: `npm install marketing-doma-cli@latest` (corrigido na 0.1.47) |
| `Falha ao buscar GitHub` | Atualize CLI; HTTP puro não precisa de GitHub CLI (corrigido na 0.1.47) |
| Remotion ausente | `npm run doma:setup` |
| Repo GitHub privado | Pedir acesso ao dev |

---

## Advanced (opcional)

Audit/recreate com Python:

```bash
npx marketing-doma install-advanced
```
