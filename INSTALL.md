# Instalação — equipe de marketing

> Só a seção **"Você faz manualmente"** precisa de atenção. O resto roda com `marketing-doma install`.

**Repositório:** https://github.com/rafael-senter/marketing-doma *(privado até liberação)*

---

## Resumo

| Etapa | Quem faz |
|---|---|
| Node.js, VS Code/Cursor, conta Anthropic | **Você** (1×) |
| `npm install -g marketing-doma-cli` | **Você** (1×) |
| Plugin + Remotion + hooks Claude + Cursor | **`marketing-doma install`** |
| Python (audit/recreate) | **Opcional** (`marketing-doma install-advanced`) |
| Criar posts | **`/marketing-doma`** ou Cursor chat |

---

## Você faz manualmente (1× por computador)

### 1. Node.js LTS

https://nodejs.org — instalador padrão. Verificar:

```bash
node --version   # v18+
npm --version
```

### 2. Conta Anthropic

Plano **Claude Pro/Max/Team** com Claude Code, ou API key configurada.

### 3. VS Code ou Cursor

https://code.visualstudio.com — ou Cursor com Third-party skills ON.

### 4. Extensão Claude Code (se usar VS Code)

VS Code → Extensões → **Claude Code** (Anthropic).

### 5. Abrir pasta de trabalho

**Arquivo → Abrir pasta…** — ex.: `Desktop/marketing-doma`

⚠️ **Sem espaços** no caminho.

### 6. Terminal integrado

**`Ctrl + '`** (Windows/Linux) ou **`Cmd + '`** (macOS)

### 7. CLI global

```bash
npm install -g marketing-doma-cli
```

---

## Automático — 1 comando por pasta

```bash
marketing-doma install
```

Na pasta do projeto. Faz:

1. Download do plugin → `.claude/plugins/marketing-doma/`
2. `remotion-doma/` + npm install (~2 min 1ª vez)
3. Sync componentes/assets
4. `.claude/settings.json` — plugin + hook studio :3010
5. `.cursor/hooks.json` + rules + `CURSOR.md`

Conferir:

```bash
marketing-doma status
```

---

## Claude Code + Cursor

| IDE | Config | Uso |
|---|---|---|
| **Claude Code** | `.claude/settings.json` | `/marketing-doma` |
| **Cursor** | `.cursor/hooks.json` + rules | *"cria post Doma"* · `CURSOR.md` |

```
minha-pasta/
├── .claude/plugins/marketing-doma/
├── .claude/settings.json
├── .cursor/hooks.json
├── .cursor/rules/marketing-doma.mdc
├── CURSOR.md
└── remotion-doma/
```

**Cursor:** Settings → Features → **Third-party skills** ON.

---

## Uso do dia a dia

VS Code/Cursor → pasta aberta → terminal:

```bash
claude
```

```
/marketing-doma
```

Cursor: chat *"cria post Doma"* na mesma pasta.

---

## Reparar setup

Se Remotion ou hooks falharem:

```
/marketing-doma-setup
```

Mesmo script do `install` — idempotente.

---

## Atualizar

```bash
marketing-doma update
```

Preserva **live-rules** e **planos** locais.

---

## Export pro dev

```bash
cd ~/Desktop
marketing-doma export
```

---

## Problemas comuns

| Erro | O que fazer |
|---|---|
| `/marketing-doma` não reconhecido | `marketing-doma status` → reiniciar Claude Code na pasta. **Não** copiar commands pra `~/.claude/commands/`. |
| Legacy `~/.local/share/marketing-doma` | `marketing-doma cleanup-legacy` → `marketing-doma install` |
| `marketing-doma` não encontrado | `npm install -g marketing-doma-cli` + reiniciar terminal |
| `Cannot find module 'remotion'` | `/marketing-doma-setup` ou `marketing-doma install` de novo |
| Studio em branco (:3010) | Pasta com espaço — renomear |
| Clone falha | Repo privado — pedir acesso ao dev |

---

## Modo dev

```bash
git clone https://github.com/rafael-senter/marketing-doma.git
cd marketing-doma
# symlink ou copiar pra .claude/plugins/ do projeto host
```
