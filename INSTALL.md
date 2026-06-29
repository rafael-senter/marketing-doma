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

⚠️ **Sem espaços** no caminho — ex.: `Desktop/marketing-doma`

### 4. Instalar (3 comandos)

```bash
npm init -y
npm install marketing-doma-cli
npm run doma:install
```

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

## Lixo antigo (instalação global legacy)

```bash
npm run doma:status
npx marketing-doma cleanup-legacy
npm run doma:install
```

---

## Problemas comuns

| Erro | Solução |
|---|---|
| `marketing-doma` não encontrado | Rodar na pasta do projeto: `npm install marketing-doma-cli` |
| Remotion ausente | `npm run doma:setup` |
| Repo GitHub privado | Pedir acesso ao dev |

---

## Advanced (opcional)

Audit/recreate com Python:

```bash
npx marketing-doma install-advanced
```
